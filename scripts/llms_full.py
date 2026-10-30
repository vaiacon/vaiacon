"""Schreibt `llms-full.txt`: der sichtbare Klartext aller oeffentlichen Seiten der Sitemap.

    python3 scripts/llms_full.py            # schreibt llms-full.txt
    python3 scripts/llms_full.py --probe    # nur zeigen, ob sich etwas aendern wuerde (Exit 1 bei Abweichung)
    python3 scripts/llms_full.py --ziel /pfad/probe.txt

Zweck: KI-Suchen koennen die ganze Website in einem Zug lesen (Ergaenzung zu
`llms.txt`, das nur auf die Seiten verweist). Quelle ist `sitemap.xml` im Repo;
den Text je Seite liefert `seitentext()` aus `bot_wissen.py` (ohne Kopfzeile,
Menue, Fusszeile, Skripte). Die Ausgabe ist deterministisch, ohne Datum und Uhrzeit,
damit der Workflow nur bei echten Aenderungen zurueckcommittet.

Preise stehen auf der Website bewusst nicht; `scripts/preise_pruefen.py` prueft das.
Nur Standardbibliothek. Veroeffentlicht nichts.
"""
from __future__ import annotations

import html
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

sys.path.insert(0, str(Path(__file__).resolve().parent))
from bot_wissen import seitentext  # noqa: E402

WURZEL = Path(__file__).resolve().parents[1]
BASIS = "https://vaiacon.ch"
ZIEL = WURZEL / "llms-full.txt"


def sitemap_urls() -> list[str]:
    xml = (WURZEL / "sitemap.xml").read_text(encoding="utf-8")
    return re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)


def datei_zu_url(url: str) -> Path | None:
    pfad = urlparse(url).path.strip("/")
    kandidaten = [WURZEL / "index.html"] if not pfad else [
        WURZEL / f"{pfad}.html", WURZEL / pfad / "index.html"]
    return next((k for k in kandidaten if k.is_file()), None)


def titel_von(roh: str) -> str:
    for muster in (r"(?s)<h1\b[^>]*>(.*?)</h1>", r"(?s)<title>(.*?)</title>"):
        m = re.search(muster, roh)
        if m:
            t = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", m.group(1)))).strip()
            if t:
                return t
    return "Seite"


def bauen() -> str:
    teile = [
        "# vaiacon: ganze Website als Klartext", "",
        f"> Vollständiger sichtbarer Text der öffentlichen Seiten von {BASIS} "
        "(Vaiacon GmbH, Zürich). Erzeugt aus sitemap.xml; Kurzfassung und Linkliste in "
        f"{BASIS}/llms.txt. Auf der Website stehen bewusst keine Preise.", ""]
    for url in sitemap_urls():
        datei = datei_zu_url(url)
        if datei is None:
            print(f"uebersprungen (keine Datei): {url}", file=sys.stderr)
            continue
        roh = datei.read_text(encoding="utf-8")
        text = seitentext(datei)
        text = re.sub(r"(?m)^Zum Inhalt springen\n", "", text)
        if re.search(r"CHF\s*\d", text):
            # Betraege gehoeren nicht in den Klartext (z. B. AGB): Absaetze mit CHF-Zahl weglassen
            text = "\n".join(z for z in text.split("\n") if not re.search(r"CHF\s*\d", z))
        titel = titel_von(roh)
        teile += ["---", "", f"## {titel}", "", f"URL: {url}", "", text, ""]
    return "\n".join(teile).rstrip() + "\n"


def main(argv: list[str]) -> int:
    ziel = ZIEL
    if "--ziel" in argv:
        ziel = Path(argv[argv.index("--ziel") + 1])
    neu = bauen()
    alt = ziel.read_text(encoding="utf-8") if ziel.exists() else None
    if "--probe" in argv:
        print("unveraendert" if alt == neu else "wuerde sich aendern")
        return 0 if alt == neu else 1
    if alt != neu:
        ziel.write_text(neu, encoding="utf-8")
        print(f"{ziel.name}: geschrieben ({len(neu)} Zeichen)")
    else:
        print(f"{ziel.name}: unveraendert")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
