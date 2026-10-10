"""Schreibt die Strukturdaten (JSON-LD) in die Seiten und erzeugt `llms.txt`.

    python3 scripts/strukturdaten.py            # schreiben
    python3 scripts/strukturdaten.py --probe    # nur zeigen, was sich aendern wuerde

Punkt 07 aus Philips Vorschlaegen vom 22.09.2026: Wer Sichtbarkeit verkauft,
wird selbst geprueft. Suchmaschinen und KI-Dienste lesen zwei Dinge besonders
woertlich: die Strukturdaten im <head> jeder Seite und `llms.txt` im
Wurzelverzeichnis.

Was hineinkommt:
- Auf jeder Seite ein Block «vaiacon GmbH» (ProfessionalService): Adresse aus
  dem Impressum, E-Mail, Gruender, Profile. Telefon und UID fehlen bewusst,
  solange sie nirgends auf der Website stehen.
- Auf den Angebotsseiten ein Block «Service», wo es einen Preis gibt mit Preis.
- Im Firmenblock zusaetzlich die Angebotsbereiche (hasOfferCatalog).
- `sitemap.xml` mit lastmod je Seite (letzter Commit, sonst heute).
- Auf der FAQ-Seite alle Fragen als «FAQPage», gelesen aus der Seite selbst.
  Darum das Skript nach jeder Aenderung an den Fragen laufen lassen, genau wie
  `bot_wissen.py`, sonst sagen die Strukturdaten etwas anderes als die Seite.

Firmendaten stehen nur hier, die Preise nur in `daten/preise.json` (Katalog,
Quelle der Wahrheit, Stand Umbau «drei Bereiche»). Aendert sich ein Preis, im
Katalog anpassen und das Skript laufen lassen: dann stimmen Strukturdaten,
FAQ-Antworten (Preis-Spans mit `data-preis`) und `llms.txt` zusammen.

    python3 scripts/strukturdaten.py --nur bot.html service.html   # nur diese Dateien
    python3 scripts/strukturdaten.py --nur llms.txt                # nur llms.txt
    python3 scripts/strukturdaten.py --ziel /pfad/probe            # alles in ein Probe-Verzeichnis schreiben

Mit `--ziel VERZEICHNIS` (oder der Umgebungsvariable `STRUKTURDATEN_ZIEL`) liest das
Skript weiter aus dem Repo, schreibt aber Seiten, `llms.txt` und `sitemap.xml` mit
denselben Pfaden ins Probe-Verzeichnis. Ohne Angabe bleibt der Standard: das Repo selbst.

Ohne `--nur` laufen alle Seiten aus SEITEN plus `llms.txt`. Seiten, die es
noch nicht gibt (z. B. ki-kmu-news/index.html im Aufbau), werden uebersprungen
und gemeldet.

Der Block steht zwischen zwei Kommentaren und wird bei jedem Lauf ersetzt.
Nichts sonst in den Seiten wird angefasst. Veroeffentlicht nichts.
"""
from __future__ import annotations

import html
import json
import os
import re
import subprocess
import sys
from datetime import date
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
AUSGABE = WURZEL   # Ziel der Dateien; main() setzt es bei --ziel um
BASIS = "https://vaiacon.ch"
ANFANG = "<!-- Strukturdaten: erzeugt von scripts/strukturdaten.py, nicht von Hand aendern -->"
ENDE = "<!-- Strukturdaten Ende -->"

ORGANISATION = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": f"{BASIS}/#organisation",
    "name": "vaiacon GmbH",
    "alternateName": "vaiacon",
    "url": f"{BASIS}/",
    "logo": f"{BASIS}/assets/logo-lockup-terra.png",
    "image": f"{BASIS}/assets/vaiacon-buerobot-startseite.png",
    "description": (
        "vaiacon führt Schweizer KMU an KI heran, in drei Bereichen: "
        "KI-Kompetenz (Trainings, Coaching, E-Learning), Sichtbarkeit in "
        "Suchmaschinen und KI-Antworten und Automationen von Büroarbeit; auf "
        "Wunsch mit laufender Begleitung. Gedacht für Betriebe mit 5 bis 30 "
        "Mitarbeitenden und eigenem Büro. Preise offen und inklusive MWST, "
        "Offerte im Offerten-Tool. Ohne Fachchinesisch, nach revDSG, auf "
        "Schweizer Infrastruktur."
    ),
    "email": "hallo@vaiacon.ch",
    # TELEFON: einkommentieren, sobald die 044-Nummer gebucht ist (auch in allen HTML-Seiten, tel:-Links)
    # "telephone": "+41 44 000 00 00",
    "foundingDate": "2026",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "Lehenstrasse 74",
        "postalCode": "8037",
        "addressLocality": "Zürich",
        "addressCountry": "CH",
    },
    "areaServed": {"@type": "Country", "name": "Schweiz"},
    "knowsLanguage": "de-CH",
    "founder": [
        {"@type": "Person", "name": "André Ulrich", "jobTitle": "Mitgründer, Strategie und Marketing"},
        {"@type": "Person", "name": "Philip Krieger", "jobTitle": "Mitgründer, Technik und Coaching"},
    ],
    "sameAs": [
        "https://www.facebook.com/vaiacon",
        "https://www.instagram.com/vaiacon",
        "https://www.linkedin.com/company/vaiacon",
    ],
}



# Nur auf der Startseite: die Website als Ganzes, verknuepft mit dem Firmenblock (Visibility-Check 07.10.2026).
WEBSITE = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": f"{BASIS}/#website",
    "name": "vaiacon",
    "url": f"{BASIS}/",
    "inLanguage": "de-CH",
    "publisher": {"@id": f"{BASIS}/#organisation"},
}

KATALOG = json.loads((WURZEL / "daten" / "preise.json").read_text(encoding="utf-8"))
BEREICHE = {b["id"]: b for b in KATALOG["bereiche"]}
POSITIONEN = {p["id"]: p for b in KATALOG["bereiche"] for p in b["positionen"]}


def chf(zahl: float) -> str:
    """1550 -> «1'550» (Schweizer Tausendertrenner, wie preise.js)."""
    ganz = abs(zahl - round(zahl)) < 0.005
    text = f"{round(zahl)}" if ganz else f"{zahl:.2f}"
    vor, _, nach = text.partition(".")
    vor = re.sub(r"(?<=\d)(?=(\d{3})+$)", "'", vor)
    return vor + ("." + nach if nach else "")


def preis_text(pos: dict, form: str | None = None) -> str:
    """Wie preise.js: «ab CHF 1'300 pro Ablauf», bei «pauschal» nur der Betrag."""
    text = ("ab " if pos["ab"] else "") + "CHF " + chf(pos["preis"])
    if form != "betrag" and pos["einheit"] != "pauschal":
        text += " " + pos["einheit"]
    return text


def angebot(name: str, art: str, text: str, pfad: str, bereich: str | None = None) -> dict:
    block = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": name,
        "serviceType": art,
        "description": text,
        "url": f"{BASIS}/{pfad}",
        "provider": {"@id": f"{BASIS}/#organisation"},
        "areaServed": {"@type": "Country", "name": "Schweiz"},
    }
    if bereich:
        pos = [p for p in BEREICHE[bereich]["positionen"] if p.get("status") != "pruefen"]
        preise = [p["preis"] for p in pos]
        block["offers"] = {
            "@type": "AggregateOffer",
            "priceCurrency": KATALOG["waehrung"],
            "lowPrice": min(preise),
            "highPrice": max(preise),
            "offerCount": len(pos),
        }
        eintraege = []
        for p in pos:
            spez = {
                "@type": "UnitPriceSpecification",
                "priceCurrency": KATALOG["waehrung"],
                "valueAddedTaxIncluded": bool(KATALOG["mwst_inklusive"]),
                "minPrice" if p["ab"] else "price": p["preis"],
            }
            einheit = p["einheit"].removeprefix("pro ")
            if p["einheit"] != "pauschal":
                spez["unitText"] = einheit
            eintraege.append({
                "@type": "Offer",
                "itemOffered": {"@type": "Service", "name": p["titel"],
                                "description": (p["beschreibung"] + " " + p.get("umfang", "")).strip()},
                "priceSpecification": spez,
            })
        block["hasOfferCatalog"] = {
            "@type": "OfferCatalog",
            "name": BEREICHE[bereich]["titel"],
            "itemListElement": eintraege,
        }
    return block


# Satz und Hinweis stehen im Katalog (mwst_satz, mwst_hinweis), nie von Hand hier.
MWST_PROZENT = f"{KATALOG['mwst_satz']:g}".replace(".", ",")
MWST_SATZ = f"Preise in CHF, inklusive {MWST_PROZENT} % MWST."
SAETZE = KATALOG["saetze"]
ANGEBOTE = {
    "visibility.html": angebot(
        "Sichtbarkeit", "SEO und GEO",
        "Von Google gefunden werden und in KI-Antworten vorkommen (Fachwörter: SEO und GEO). "
        "Kostenloser Google-Check, Check kompakt, Audit vertieft, Seiten überarbeiten und laufende Betreuung, mit offen genannten Preisen. " + MWST_SATZ,
        "visibility", "sichtbarkeit"),
    "learning.html": angebot(
        "KI-Kompetenz", "KI-Schulung und Weiterbildung",
        "Trainings, Workshops, Coaching für Führungskräfte, E-Learning, Lernvideos und tägliche kleine Lerneinheiten, "
        "zugeschnitten auf Ihren Betrieb. Dazu eine kostenlose KI-Standortbestimmung für Führungskräfte. " + MWST_SATZ,
        "learning", "ki-kompetenz"),
    "bot.html": angebot(
        "Automationen", "Automatisierung von Büroarbeit",
        "Belege, Offerten, Korrespondenz und Anfragen automatisieren, dazu Chatbot, Telefonassistent und Anbindung "
        "an Ihre Software. Fixpreis nach der Erstanalyse. " + MWST_SATZ,
        "bot", "automationen"),
    "service.html": angebot(
        "Begleitung", "Betreuung und Support für das gesamte Angebot",
        "Pflege, Updates, Support und Weiterentwicklung für Automationen, Sichtbarkeit und KI-Kompetenz, "
        "monatlich kündbar; dazu Beratung nach Aufwand und die KI-Standortanalyse im Betrieb. " + MWST_SATZ,
        "service", "begleitung"),
}

SEITEN = [
    "index.html", "visibility.html", "learning.html", "bot.html", "service.html",
    "offerte.html",  # ki-kmu-news/* schreibt scripts/news_bauen.py selbst (eigener ItemList-Block)
    "ueber-uns.html", "referenzen.html", "faq.html", "kontakt.html", "agb.html", "datenschutz.html",
    "impressum.html",
]

# Die Angebotsbereiche auch im Firmenblock, damit schon die Startseite sie maschinenlesbar nennt
# (Visibility-Check 05.10.2026: «Leistungen nicht als Service hinterlegt»).
ORGANISATION["hasOfferCatalog"] = {
    "@type": "OfferCatalog",
    "name": "Angebot von vaiacon",
    "itemListElement": [
        {"@type": "Offer", "itemOffered": {
            "@type": "Service", "name": a["name"], "serviceType": a["serviceType"], "url": a["url"],
            "description": a["description"].replace(" " + MWST_SATZ, ""),
        }}
        for a in ANGEBOTE.values()
    ],
}

# Sitemap: Pfad, Datei. lastmod = letzter Commit der Datei, bei ungespeicherten Aenderungen heute.
# Seit 07.10.2026 ohne priority/changefreq: Google wertet beides nicht, nur ein stimmiges lastmod zaehlt.
# Die News-Wochen kommen aus ki-kmu-news/daten/*.json dazu, lastmod = juengste Beitragsaenderung.
SITEMAP = [
    ("", "index.html"),
    ("ueber-uns", "ueber-uns.html"),
    ("visibility", "visibility.html"),
    ("learning", "learning.html"),
    ("bot", "bot.html"),
    ("service", "service.html"),
    ("offerte", "offerte.html"),
    ("referenzen", "referenzen.html"),
    ("faq", "faq.html"),
    ("kontakt", "kontakt.html"),
    ("impressum", "impressum.html"),
    ("datenschutz", "datenschutz.html"),
    ("agb", "agb.html"),
]


def zuletzt_geaendert(datei: str) -> str:
    def git(*a):
        return subprocess.run(["git", "-C", str(WURZEL), *a], capture_output=True, text=True).stdout.strip()
    if git("status", "--porcelain", "--", datei):
        return date.today().isoformat()
    return git("log", "-1", "--format=%cs", "--", datei) or date.today().isoformat()


def news_eintraege() -> list[tuple[str, str]]:
    """(Pfad, lastmod) fuer Uebersicht, Archiv und jede Woche. Datum = juengster Beitrag oder dessen Praezisierung."""
    wochen = []
    for datei in sorted((WURZEL / "ki-kmu-news" / "daten").glob("*.json")):
        try:
            w = json.loads(datei.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            continue
        beitraege = w.get("beitraege") or []
        stand = max([b.get("praezisiert") or b.get("datum") or "" for b in beitraege] + [str(w.get("von", ""))])
        if w.get("jahr") and w.get("kw") and stand:
            wochen.append((f"ki-kmu-news/{w['jahr']}-kw{int(w['kw']):02d}", stand, bool(beitraege)))
    wochen.sort(key=lambda e: e[1], reverse=True)
    if not wochen:
        return []
    neuestes = max(stand for _, stand, _ in wochen)
    eintraege = [("ki-kmu-news/", neuestes), ("ki-kmu-news/archiv", neuestes)]
    eintraege += [(pfad, stand) for pfad, stand, hat_beitraege in wochen if hat_beitraege]
    return eintraege


def sitemap_text() -> str:
    zeilen = ['<?xml version="1.0" encoding="UTF-8"?>',
              '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    eintraege = [(pfad, zuletzt_geaendert(datei)) for pfad, datei in SITEMAP if (WURZEL / datei).exists()]
    eintraege += news_eintraege()
    for pfad, stand in eintraege:
        zeilen.append(f"  <url><loc>{BASIS}/{pfad}</loc><lastmod>{stand}</lastmod></url>")
    zeilen.append("</urlset>")
    return "\n".join(zeilen) + "\n"



def erster_satz(text: str) -> str:
    """Erster Satz eines Textes, ohne Schlusspunkt (fuer die Umfangszeile in llms.txt)."""
    m = re.match(r"(.+?[.!?])(\s|$)", text.strip())
    return (m.group(1) if m else text.strip()).rstrip(".")


def preisliste_llms() -> str:
    zeilen = []
    for b in KATALOG["bereiche"]:
        zeilen.append(f"### {b['titel']}")
        zeilen.append("")
        for p in b["positionen"]:
            if p.get("status") == "pruefen":
                continue   # noch nicht entschieden: nicht nach aussen
            zusatz = f" ({p['hinweis']})" if p["hinweis"] else ""
            umfang = f" Umfang: {erster_satz(p['umfang'])}." if p.get("umfang") else ""
            zeilen.append(f"- {p['titel']}: {preis_text(p)}.{umfang}{zusatz}".replace("..", "."))
            for v in p.get("varianten") or []:
                ab = "ab " if v.get("ab") else ""
                zeilen.append(f"  - {v['titel']}: {ab}CHF {chf(v['preis'])}")
            if p.get("staffel"):
                stufen = " / ".join(chf(s["preis"]) for s in p["staffel"])
                zeilen.append(f"  - Staffel: CHF {stufen} je Lernminute")
        zeilen.append("")
    return "\n".join(zeilen).rstrip()


def llms_text() -> str:
    return f"""# vaiacon

> vaiacon GmbH, Zürich, führt Schweizer KMU an KI heran, in drei Bereichen:
> KI-Kompetenz (Ihr Team lernt, KI sicher einzusetzen), Sichtbarkeit (bei
> Google gefunden und in KI-Antworten richtig genannt werden) und Automationen
> (wiederkehrende Büroarbeit läuft von selbst). Auf Wunsch mit laufender
> Begleitung. Ohne Fachchinesisch, nach revDSG, auf Schweizer Infrastruktur.
> Gegründet 2026 von André Ulrich und Philip Krieger.

Für wen: Betriebe mit 5 bis 30 Mitarbeitenden und eigenem Büro (Handwerk,
Treuhand, Praxen, Verwaltungen).

Kontakt: hallo@vaiacon.ch · Lehenstrasse 74, 8037 Zürich
Erster Schritt: kostenloses Erstgespräch (eine halbe Stunde, am Telefon oder
am Bildschirm), das Offerten-Tool (Richtofferte in zwei Minuten, sofort auf dem
Bildschirm und per Mail, unverbindlich), die kostenlose KI-Standortbestimmung
für Führungskräfte, die kostenlose Erstanalyse zur Zeitersparnis oder der
kostenlose Check der eigenen Website. Rückruf innert eines Arbeitstages.

## Die drei Bereiche

- [KI-Kompetenz](https://vaiacon.ch/learning): Trainings und Workshops im
  Betrieb (Halbtag oder ganzer Tag, pro Gruppe), Coaching für Führungskräfte,
  E-Learning nach Mass, Lernvideos, tägliche kleine Lerneinheiten,
  Change-Begleitung und Begleitung der Mitarbeitenden vor Ort. Dazu die
  kostenlose KI-Standortbestimmung für Führungskräfte (Selbsttest mit zwölf
  Fragen): https://vaiacon.ch/learning#standortbestimmung
- [Sichtbarkeit](https://vaiacon.ch/visibility): Von Google gefunden werden
  und in KI-Antworten vorkommen (SEO und GEO). Kostenloser automatischer Check,
  dazu KI-Sichtbarkeits-Check, Seiten überarbeiten und laufende Betreuung.
- [Automationen](https://vaiacon.ch/bot): Belege, Offerten, Korrespondenz und
  Anfragen automatisieren, Chatbot mit Firmenwissen, Telefonassistent,
  Anbindung an Ihre Software. Fixpreis nach der Erstanalyse.
- [Begleitung](https://vaiacon.ch/service): Betreuung und Support für alles,
  was vaiacon aufgebaut hat, Beratung nach Aufwand, Anpassungen und die
  bezahlte KI-Standortanalyse im Betrieb. Monatlich kündbar.

## Preise

{KATALOG["mwst_hinweis"]} {SAETZE["gueltigkeit"]} Stand: {KATALOG["stand"]}.

- {SAETZE["ab_preis"]}
- {SAETZE["betreuung"]}
- {SAETZE["fremdkosten"]}
- {SAETZE["beispiel_jahr"]}

Quelle: https://vaiacon.ch/daten/preise.json. Eine Richtofferte stellen Sie im
Offerten-Tool zusammen: https://vaiacon.ch/offerte

{preisliste_llms()}

Hinweis: Die KI-Standortanalyse im Betrieb (bezahlt) ist nicht die kostenlose
KI-Standortbestimmung (Selbsttest für Führungskräfte).

## Weitere Seiten

- [Offerte zusammenstellen](https://vaiacon.ch/offerte): Offerten-Tool,
  Richtofferte mit echten Preisen, sofort auf dem Bildschirm und per Mail.
- [KI-News für KMU](https://vaiacon.ch/ki-kmu-news/): Was in der KI für Schweizer
  KMU gerade zählt, die laufende Woche.
  [Archiv](https://vaiacon.ch/ki-kmu-news/archiv) ·
  [Feed](https://vaiacon.ch/ki-kmu-news/feed.xml)
- [Über uns](https://vaiacon.ch/ueber-uns): Die zwei Gründer, wie wir arbeiten
  und wofür wir stehen.
- [Aus der Praxis](https://vaiacon.ch/referenzen): Eine Kundin erzählt, wie ihr
  Beauty Studio heute mit vaiacon arbeitet.
- [Häufige Fragen](https://vaiacon.ch/faq): Kosten und Offerte, Lernformate,
  Datenschutz, Vorwissen, Ablauf einer Zusammenarbeit.
- [Erstanalyse](https://vaiacon.ch/erstanalyse/): Fragebogen mit sofortiger
  Einschätzung, wie viel Zeit in wiederkehrender Büroarbeit steckt.
- [Kontakt](https://vaiacon.ch/kontakt): Erstgespräch vereinbaren.

## Rechtliches

- [Impressum](https://vaiacon.ch/impressum): Firma, Anschrift, Kontakt.
- [Datenschutz](https://vaiacon.ch/datenschutz)
- [AGB](https://vaiacon.ch/agb)
"""


def text_aus(stueck: str) -> str:
    text = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", stueck))).strip()
    return re.sub(r"\s+([,.;:!?])", r"\1", text)   # Leerraum vom Tag-Entfernen vor Satzzeichen


def preise_einsetzen(stueck: str) -> str:
    """Preis-Spans (data-preis) durch den Katalogwert ersetzen, damit die FAQ-Strukturdaten
    den Katalog nennen und nicht den Ersatztext im HTML."""
    def ersatz(m: re.Match) -> str:
        pos = POSITIONEN.get(m.group(1))
        return preis_text(pos, m.group(2)) if pos else m.group(0)
    return re.sub(r'<span data-preis="([^"]+)"(?: data-preis-form="(betrag)")?>.*?</span>', ersatz, stueck, flags=re.S)


def faq_block(seite: str) -> dict:
    fragen = []
    for frage, antwort in re.findall(
            r'<details class="sv-faq-item">\s*<summary><span>(.*?)</span>.*?</summary>(.*?)</details>',
            seite, re.S):
        fragen.append({
            "@type": "Question",
            "name": text_aus(preise_einsetzen(frage)),
            "acceptedAnswer": {"@type": "Answer", "text": text_aus(preise_einsetzen(antwort))},
        })
    if not fragen:
        raise SystemExit("faq.html: keine Fragen gefunden. Hat sich der Aufbau geaendert?")
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": fragen}


def als_skript(block: dict) -> str:
    inhalt = json.dumps(block, ensure_ascii=False, indent=2).replace("</", "<\\/")
    return f'<script type="application/ld+json">\n{inhalt}\n</script>'


def ausgeben(name: str, inhalt: str) -> None:
    ziel = AUSGABE / name
    ziel.parent.mkdir(parents=True, exist_ok=True)
    ziel.write_text(inhalt, encoding="utf-8")


def main() -> None:
    global AUSGABE
    probe = "--probe" in sys.argv
    ziel = os.environ.get("STRUKTURDATEN_ZIEL")
    if "--ziel" in sys.argv:
        ziel = sys.argv[sys.argv.index("--ziel") + 1]
    if ziel:
        AUSGABE = Path(ziel).expanduser().resolve()
    nur = None
    if "--nur" in sys.argv:
        nur = set()
        for a in sys.argv[sys.argv.index("--nur") + 1:]:
            if a.startswith("--"):
                break
            nur.add(a)
        if not nur:
            raise SystemExit("--nur braucht mindestens einen Dateinamen")
    geaendert, fehlt = [], []
    for name in SEITEN:
        if nur is not None and name not in nur:
            continue
        pfad = WURZEL / name
        if not pfad.exists():
            fehlt.append(name)
            continue
        seite = pfad.read_text(encoding="utf-8")
        ohne = re.sub(re.escape(ANFANG) + r".*?" + re.escape(ENDE) + r"\n?", "", seite, flags=re.S)
        bloecke = [ORGANISATION]
        if name in ANGEBOTE:
            bloecke.append(ANGEBOTE[name])
        if name == "index.html":
            bloecke.append(WEBSITE)
        if name in ("faq.html", "index.html"):
            bloecke.append(faq_block(ohne))
        einschub = ANFANG + "\n" + "\n".join(als_skript(b) for b in bloecke) + "\n" + ENDE + "\n"
        if ohne.count("</head>") != 1:
            raise SystemExit(f"{name}: </head> nicht genau einmal gefunden")
        neu = ohne.replace("</head>", einschub + "</head>")
        if neu != seite or AUSGABE != WURZEL:
            geaendert.append(f"{name} ({len(bloecke)} Block/Bloecke)")
            if not probe:
                ausgeben(name, neu)

    if nur is None or "llms.txt" in nur:
        llms = WURZEL / "llms.txt"
        if AUSGABE != WURZEL or not llms.exists() or llms.read_text(encoding="utf-8") != llms_text():
            geaendert.append("llms.txt")
            if not probe:
                ausgeben("llms.txt", llms_text())

    if nur is None or "sitemap.xml" in nur:
        karte = WURZEL / "sitemap.xml"
        if AUSGABE != WURZEL or not karte.exists() or karte.read_text(encoding="utf-8") != sitemap_text():
            geaendert.append("sitemap.xml")
            if not probe:
                ausgeben("sitemap.xml", sitemap_text())

    wort = "Wuerde aendern" if probe else "Geschrieben"
    print(f"{wort}: " + (", ".join(geaendert) if geaendert else "nichts, alles aktuell."))
    if fehlt:
        print("Uebersprungen (Datei fehlt noch): " + ", ".join(fehlt))


if __name__ == "__main__":
    main()
