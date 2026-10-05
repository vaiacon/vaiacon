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
- Auf der FAQ-Seite alle Fragen als «FAQPage», gelesen aus der Seite selbst.
  Darum das Skript nach jeder Aenderung an den Fragen laufen lassen, genau wie
  `bot_wissen.py`, sonst sagen die Strukturdaten etwas anderes als die Seite.

Firmendaten stehen nur hier, die Preise nur in `daten/preise.json` (Katalog,
Quelle der Wahrheit, Stand Umbau «drei Bereiche»). Aendert sich ein Preis, im
Katalog anpassen und das Skript laufen lassen: dann stimmen Strukturdaten,
FAQ-Antworten (Preis-Spans mit `data-preis`) und `llms.txt` zusammen.

    python3 scripts/strukturdaten.py --nur bot.html service.html   # nur diese Dateien
    python3 scripts/strukturdaten.py --nur llms.txt                # nur llms.txt

Ohne `--nur` laufen alle Seiten aus SEITEN plus `llms.txt`. Seiten, die es
noch nicht gibt (z. B. ki-kmu-news/index.html im Aufbau), werden uebersprungen
und gemeldet.

Der Block steht zwischen zwei Kommentaren und wird bei jedem Lauf ersetzt.
Nichts sonst in den Seiten wird angefasst. Veroeffentlicht nichts.
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
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
        pos = BEREICHE[bereich]["positionen"]
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
                "itemOffered": {"@type": "Service", "name": p["titel"], "description": p["beschreibung"]},
                "priceSpecification": spez,
            })
        block["hasOfferCatalog"] = {
            "@type": "OfferCatalog",
            "name": BEREICHE[bereich]["titel"],
            "itemListElement": eintraege,
        }
    return block


MWST_SATZ = "Preise in CHF, inklusive 8,1 % MWST."
ANGEBOTE = {
    "visibility.html": angebot(
        "Sichtbarkeit", "SEO und GEO",
        "Von Google gefunden werden und in KI-Antworten vorkommen: SEO und GEO für Schweizer KMU. "
        "Google-Check, KI-Sichtbarkeits-Check, Seiten überarbeiten und laufende Betreuung zu festen Preisen. " + MWST_SATZ,
        "visibility", "sichtbarkeit"),
    "learning.html": angebot(
        "KI-Kompetenz", "KI-Schulung und Weiterbildung",
        "Trainings, Workshops, Coaching für Führungskräfte, E-Learning, Lernvideos und tägliche Kleinst-Lerneinheiten, "
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
    "ueber-uns.html", "faq.html", "kontakt.html", "agb.html", "datenschutz.html",
]


def preisliste_llms() -> str:
    zeilen = []
    for b in KATALOG["bereiche"]:
        zeilen.append(f"### {b['titel']}")
        zeilen.append("")
        for p in b["positionen"]:
            zusatz = f" ({p['hinweis']})" if p["hinweis"] else ""
            zeilen.append(f"- {p['titel']}: {preis_text(p)}{zusatz}")
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
  E-Learning nach Mass, Lernvideos, tägliche Kleinst-Lerneinheiten,
  Change-Begleitung und Begleitung der Mitarbeitenden vor Ort. Dazu die
  kostenlose KI-Standortbestimmung für Führungskräfte (Selbsttest mit zwölf
  Fragen): https://vaiacon.ch/learning#standortbestimmung
- [Sichtbarkeit](https://vaiacon.ch/visibility): Von Google gefunden werden
  und in KI-Antworten vorkommen (SEO und GEO). Kostenloser automatischer Check,
  dazu Google-Check, KI-Sichtbarkeits-Check, Seiten überarbeiten, SEO-Workshop
  und laufende Betreuung.
- [Automationen](https://vaiacon.ch/bot): Belege, Offerten, Korrespondenz und
  Anfragen automatisieren, Chatbot mit Firmenwissen, Telefonassistent,
  Anbindung an Ihre Software. Fixpreis nach der Erstanalyse.
- [Begleitung](https://vaiacon.ch/service): Betreuung und Support für alles,
  was vaiacon aufgebaut hat, Beratung nach Aufwand, Anpassungen und die
  bezahlte KI-Standortanalyse im Betrieb. Monatlich kündbar.

## Preise

{KATALOG["mwst_hinweis"]} Die Preise gelten {KATALOG["gueltigkeit_tage"]} Tage. Stand: {KATALOG["stand"]}.
Quelle: https://vaiacon.ch/daten/preise.json. Eine Richtofferte stellen Sie im
Offerten-Tool zusammen: https://vaiacon.ch/offerte

{preisliste_llms()}

Hinweis: Die KI-Standortanalyse im Betrieb (bezahlt) ist nicht die kostenlose
KI-Standortbestimmung (Selbsttest für Führungskräfte).

## Weitere Seiten

- [Offerte zusammenstellen](https://vaiacon.ch/offerte): Offerten-Tool,
  Richtofferte mit echten Preisen, sofort auf dem Bildschirm und per Mail.
- [KI-KMU-News](https://vaiacon.ch/ki-kmu-news/): Was in der KI für Schweizer
  KMU gerade zählt, die laufende Woche.
  [Archiv](https://vaiacon.ch/ki-kmu-news/archiv) ·
  [Feed](https://vaiacon.ch/ki-kmu-news/feed.xml)
- [Über uns](https://vaiacon.ch/ueber-uns): Die zwei Gründer, wie wir arbeiten
  und wofür wir stehen.
- [Häufige Fragen](https://vaiacon.ch/faq): Kosten und Offerte, Lernformate,
  Datenschutz, Vorwissen, Ablauf einer Zusammenarbeit.
- [Erstanalyse](https://vaiacon.ch/erstanalyse): Fragebogen mit sofortiger
  Einschätzung, wie viel Zeit in wiederkehrender Büroarbeit steckt.
- [Kontakt](https://vaiacon.ch/kontakt): Erstgespräch vereinbaren.

## Rechtliches

- [Datenschutz und Impressum](https://vaiacon.ch/datenschutz)
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


def main() -> None:
    probe = "--probe" in sys.argv
    nur = None
    if "--nur" in sys.argv:
        nur = set(a for a in sys.argv[sys.argv.index("--nur") + 1:] if not a.startswith("--"))
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
        if name == "faq.html":
            bloecke.append(faq_block(ohne))
        einschub = ANFANG + "\n" + "\n".join(als_skript(b) for b in bloecke) + "\n" + ENDE + "\n"
        if ohne.count("</head>") != 1:
            raise SystemExit(f"{name}: </head> nicht genau einmal gefunden")
        neu = ohne.replace("</head>", einschub + "</head>")
        if neu != seite:
            geaendert.append(f"{name} ({len(bloecke)} Block/Bloecke)")
            if not probe:
                pfad.write_text(neu, encoding="utf-8")

    if nur is None or "llms.txt" in nur:
        llms = WURZEL / "llms.txt"
        if not llms.exists() or llms.read_text(encoding="utf-8") != llms_text():
            geaendert.append("llms.txt")
            if not probe:
                llms.write_text(llms_text(), encoding="utf-8")

    wort = "Wuerde aendern" if probe else "Geschrieben"
    print(f"{wort}: " + (", ".join(geaendert) if geaendert else "nichts, alles aktuell."))
    if fehlt:
        print("Uebersprungen (Datei fehlt noch): " + ", ".join(fehlt))


if __name__ == "__main__":
    main()
