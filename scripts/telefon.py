"""Setzt die 044-Nummer überall ein, sobald sie gebucht ist.

    python3 scripts/telefon.py "044 123 45 67"            # schreiben
    python3 scripts/telefon.py "044 123 45 67" --probe    # nur zeigen, was sich ändern würde

Bis dahin steht auf jeder Seite ein sichtbarer Platzhalter «044 … folgt bald»
(Elemente mit `data-telefon-platzhalter`), daneben die fertige Stelle als
Kommentar `<!-- TELEFON: einkommentieren … -->`. Das Skript
- entfernt alle Platzhalter-Elemente,
- nimmt die TELEFON-Kommentare heraus und setzt die echte Nummer ein
  (Kopfzeile, Fusszeile, Kontakt-Karte, Impressum, News-Vorlage),
- trägt `telephone` in `scripts/strukturdaten.py` ein und lässt es laufen.

Danach von Hand: Nummer in `scripts/bot_wissen.py`-Lauf übernehmen (Vaia) und
pushen. Veröffentlicht selbst nichts.
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
PLATZHALTER = re.compile(r'<(span|p|article)\b[^>]*\bdata-telefon-platzhalter\b[^>]*>.*?</\1>\n?[ \t]*', re.S)
KOMMENTAR = re.compile(r"<!-- TELEFON: einkommentieren, sobald die 044-Nummer gebucht ist\s*(.*?)\s*-->", re.S)
HINWEIS_KOPF = re.compile(r'<!-- TELEFON: in den Strukturdaten unten .*?-->\n')


def nummer(roh: str) -> tuple[str, str, str]:
    """«044 123 45 67» -> Anzeige, tel:-Ziel, international."""
    ziffern = re.sub(r"\D", "", roh)
    if ziffern.startswith("41"):
        ziffern = "0" + ziffern[2:]
    if not re.fullmatch(r"044\d{7}", ziffern):
        raise SystemExit(f"Keine 044-Nummer: {roh}")
    z = ziffern
    anzeige = f"{z[:3]} {z[3:6]} {z[6:8]} {z[8:]}"
    return anzeige, "+41" + z[1:], f"+41 {z[1:3]} {z[3:6]} {z[6:8]} {z[8:]}"


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    probe = "--probe" in sys.argv
    if len(args) != 1:
        raise SystemExit(__doc__)
    anzeige, tel, intl = nummer(args[0])

    dateien = sorted(set(WURZEL.glob("*.html")) | set(WURZEL.glob("ki-kmu-news/*.html"))
                     | {WURZEL / "scripts/news_vorlagen/rahmen.html"})
    geaendert = []
    for p in dateien:
        alt = p.read_text(encoding="utf-8")
        neu = PLATZHALTER.sub("", alt)
        neu = KOMMENTAR.sub(lambda m: m.group(1), neu)
        neu = HINWEIS_KOPF.sub("", neu)
        neu = neu.replace("+41440000000", tel).replace("044 000 00 00", anzeige)
        if neu != alt:
            geaendert.append(str(p.relative_to(WURZEL)))
            if not probe:
                p.write_text(neu, encoding="utf-8")

    sd = WURZEL / "scripts/strukturdaten.py"
    t = sd.read_text(encoding="utf-8")
    t2 = re.sub(r'    # TELEFON:.*\n    # "telephone": "[^"]*",', f'    "telephone": "{intl}",', t)
    if t2 != t:
        geaendert.append("scripts/strukturdaten.py")
        if not probe:
            sd.write_text(t2, encoding="utf-8")

    print(("Würde ändern: " if probe else "Geschrieben: ") + (", ".join(geaendert) or "nichts"))
    if not probe:
        subprocess.run([sys.executable, str(sd)], check=True)


if __name__ == "__main__":
    main()
