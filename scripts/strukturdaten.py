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

Firmendaten und Preise stehen nur hier. Aendert sich ein Preis, hier anpassen
und das Skript laufen lassen: dann stimmen Seiten und `llms.txt` zusammen.

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
        "vaiacon führt Schweizer KMU an KI heran: Sichtbarkeit in Suchmaschinen "
        "und KI-Antworten, Weiterbildung, Automatisierung von Büroarbeit und "
        "laufende Begleitung. Ohne Fachchinesisch, nach revDSG, auf Schweizer "
        "Infrastruktur."
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


def angebot(name: str, art: str, text: str, pfad: str, preis: dict | None = None) -> dict:
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
    if preis:
        block["offers"] = {"@type": "Offer", "priceCurrency": "CHF", **preis}
    return block


ANGEBOTE = {
    "visibility.html": angebot(
        "Sichtbarkeit (vaiaconVisibility)", "SEO und GEO",
        "Von Google gefunden werden und in KI-Antworten vorkommen: SEO und GEO für Schweizer KMU. Preis nach Erstgespräch.",
        "visibility"),
    "learning.html": angebot(
        "Schulung im Betrieb (vaiaconLearning)", "KI-Schulung",
        "Trainings, Coachings und Workshops bei Ihnen im Betrieb: Ihr Team wendet KI sicher an, zugeschnitten auf Ihre Abläufe. Preis nach Erstgespräch.",
        "learning"),
    "academy/index.html": angebot(
        "Kurse (vaiaconAcademy)", "KI-Weiterbildung",
        "11 Lernpfade mit 58 kurzen Lektionen zu KI im KMU-Alltag. Kostenlos und ohne Konto.",
        "academy/", {"price": 0, "description": "kostenlos"}),
    "bot.html": angebot(
        "Automatisierungen (vaiaconBot)", "Automatisierung von Büroarbeit",
        "Belege, Offerten, Korrespondenz und Anfragen automatisieren. Fixpreis, genannt nach der Erstanalyse.",
        "bot", {"priceSpecification": {
            "@type": "PriceSpecification", "minPrice": 600, "priceCurrency": "CHF",
            "description": "ab CHF 600 pro Automation, Fixpreis"}}),
    "service.html": angebot(
        "Begleitung (vaiaconService)", "Betreuung von Automatisierungen",
        "Pflege, Updates, Kontrolle und Weiterentwicklung bestehender Automatisierungen. Drei Pakete: Basic ab CHF 90, Standard ab CHF 190, Premium ab CHF 390 im Monat, monatlich kündbar.",
        "service", {"priceSpecification": {
            "@type": "UnitPriceSpecification", "minPrice": 90, "priceCurrency": "CHF",
            "unitCode": "MON", "unitText": "Monat",
            "description": "ab CHF 90 pro Monat, monatlich kündbar"}}),
}

SEITEN = [
    "index.html", "visibility.html", "learning.html", "bot.html", "service.html",
    "ueber-uns.html", "faq.html", "kontakt.html", "agb.html", "datenschutz.html",
    "academy/index.html", "academy/lernplan.html",
]

LLMS = """# vaiacon

> vaiacon GmbH, Zürich, führt Schweizer KMU an KI heran: Sichtbarkeit in
> Suchmaschinen und KI-Antworten, Weiterbildung, Automatisierung von Büroarbeit
> und laufende Begleitung. Ohne Fachchinesisch, nach revDSG, auf Schweizer
> Infrastruktur. Gegründet 2026 von André Ulrich und Philip Krieger.

Kontakt: hallo@vaiacon.ch · Lehenstrasse 74, 8037 Zürich
Erster Schritt: kostenloses Erstgespräch (eine halbe Stunde) oder kostenlose
Erstanalyse (rund zehn Minuten). Rückruf innerhalb von höchstens 12 Stunden.

## Angebote

- [Sichtbarkeit (vaiaconVisibility)](https://vaiacon.ch/visibility): Von Google
  gefunden werden und in KI-Antworten vorkommen: SEO und GEO für Schweizer KMU.
  Preis nach Erstgespräch.
- [Kurse (vaiaconAcademy)](https://vaiacon.ch/academy/): 11 Lernpfade mit
  58 kurzen Lektionen zu KI im KMU-Alltag. Kostenlos und ohne Konto.
- [Schulung im Betrieb (vaiaconLearning)](https://vaiacon.ch/learning):
  Trainings, Coachings und Workshops bei Ihnen im Betrieb. Preis nach
  Erstgespräch.
- [Automatisierungen (vaiaconBot)](https://vaiacon.ch/bot): Belege, Offerten,
  Korrespondenz und Anfragen automatisieren. Ab CHF 600 pro Automation,
  Fixpreis.
- [Begleitung (vaiaconService)](https://vaiacon.ch/service): Pflege, Updates,
  Kontrolle und Weiterentwicklung bestehender Automatisierungen. Drei Pakete ab
  CHF 90, 190 und 390 im Monat, monatlich kündbar.

## Über uns und Fragen

- [Über uns](https://vaiacon.ch/ueber-uns): Die zwei Gründer, wie wir arbeiten
  und wofür wir stehen.
- [Häufige Fragen](https://vaiacon.ch/faq): Kosten, Datenschutz, Vorwissen,
  Ablauf einer Zusammenarbeit.
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


def faq_block(seite: str) -> dict:
    fragen = []
    for frage, antwort in re.findall(
            r'<details class="sv-faq-item">\s*<summary><span>(.*?)</span>.*?</summary>(.*?)</details>',
            seite, re.S):
        fragen.append({
            "@type": "Question",
            "name": text_aus(frage),
            "acceptedAnswer": {"@type": "Answer", "text": text_aus(antwort)},
        })
    if not fragen:
        raise SystemExit("faq.html: keine Fragen gefunden. Hat sich der Aufbau geaendert?")
    return {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": fragen}


def als_skript(block: dict) -> str:
    inhalt = json.dumps(block, ensure_ascii=False, indent=2).replace("</", "<\\/")
    return f'<script type="application/ld+json">\n{inhalt}\n</script>'


def main() -> None:
    probe = "--probe" in sys.argv
    geaendert = []
    for name in SEITEN:
        pfad = WURZEL / name
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

    llms = WURZEL / "llms.txt"
    if not llms.exists() or llms.read_text(encoding="utf-8") != LLMS:
        geaendert.append("llms.txt")
        if not probe:
            llms.write_text(LLMS, encoding="utf-8")

    wort = "Wuerde aendern" if probe else "Geschrieben"
    print(f"{wort}: " + (", ".join(geaendert) if geaendert else "nichts, alles aktuell."))


if __name__ == "__main__":
    main()
