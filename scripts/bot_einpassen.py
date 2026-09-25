"""Macht einen freigestellten Buero-Bot fertig fuer den Hero einer Seite.

    python3 scripts/bot_einpassen.py <freigestellt.png> assets/vaiacon-buerobot-<seite>-<motiv>.png

Drei Schritte, so wie sie am 25./26.09.2026 fuer alle acht Seiten gemacht wurden:

1. Saum weg. Nach `bot_freistellen.swift` ist die Maske am Rand rund 6 Pixel
   breiter als die Figur; diese Pixel sind hell vom weissen Grund und stehen auf
   Terracotta als Rand da. Deckkraft unter 200 faellt weg, 200–245 wird zum
   neuen, schmalen Uebergang. Mit `--ohne-saum` wird das uebersprungen — fuer
   Bilder, die schon sauber freigestellt geliefert wurden (PNG mit Alpha).
2. Figur voll deckend. Gelieferte PNGs sind oft nur zu 99 % deckend; dann
   schimmert Terracotta durch den Roboter. Ab 241 wird auf 255 gesetzt, fast
   unsichtbare Streupixel (bis 40) fallen weg.
3. Gemeinsames Format. Auf die Figur zuschneiden, in 682×820 einpassen, unten
   buendig — dann steht jeder Bot mit `sv-hero__robot--frei` gleich hoch
   (256×308 px auf der Seite) und die Fuesse auf dem Bodenschatten. Mit
   `--breit` bleibt das Bild so breit wie das Motiv; dann braucht die Figur
   `sv-hero__robot--breit` und die Breite dort im Verhaeltnis angepasst.

Eingeschlossene Reste des Grundes (zwischen Kabelwindungen, unter einer
Sprechblase) behebt das Skript NICHT — vorher auf Terracotta ansehen.

Braucht Pillow (`python3 -c "import PIL"`).
"""
from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image

BREITE, HOEHE = 682, 820   # Format aller Hero-Bots
RAND = 12                  # Luft um die Figur vor dem Einpassen


def saum_weg(deckung: int) -> int:
    if deckung < 200:
        return 0
    return min(255, int((deckung - 200) * 255 / 45))


def voll_deckend(deckung: int) -> int:
    if deckung <= 40:
        return 0
    return 255 if deckung >= 241 else deckung


def main() -> None:
    teile = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    teile.add_argument("eingabe", type=Path)
    teile.add_argument("ausgabe", type=Path)
    teile.add_argument("--ohne-saum", action="store_true", help="Schritt 1 auslassen")
    teile.add_argument("--breit", action="store_true", help="Breite nach Motiv statt 682")
    args = teile.parse_args()

    bild = Image.open(args.eingabe).convert("RGBA")
    r, g, b, a = bild.split()
    if not args.ohne_saum:
        a = a.point(saum_weg)
    a = a.point(voll_deckend)
    bild = Image.merge("RGBA", (r, g, b, a))

    kasten = a.getbbox()
    if not kasten:
        raise SystemExit("Keine Figur gefunden — ist das Bild freigestellt?")
    x0, y0, x1, y1 = kasten
    bild = bild.crop((max(0, x0 - RAND), max(0, y0 - RAND),
                      min(bild.width, x1 + RAND), min(bild.height, y1 + RAND)))

    if args.breit:
        breite = round(bild.width * HOEHE / bild.height)
        fertig = bild.resize((breite, HOEHE), Image.LANCZOS)
    else:
        mass = min(BREITE / bild.width, HOEHE / bild.height)
        w, h = round(bild.width * mass), round(bild.height * mass)
        figur = bild.resize((w, h), Image.LANCZOS)
        fertig = Image.new("RGBA", (BREITE, HOEHE), (0, 0, 0, 0))
        fertig.paste(figur, ((BREITE - w) // 2, HOEHE - h), figur)

    args.ausgabe.parent.mkdir(parents=True, exist_ok=True)
    fertig.save(args.ausgabe, optimize=True)
    groesse = args.ausgabe.stat().st_size // 1024
    print(f"Geschrieben: {args.ausgabe} ({fertig.width}×{fertig.height}, {groesse} KB)")
    if args.breit:
        faktor = (fertig.width / HOEHE) / (BREITE / HOEHE)
        print(f"  Breite fuer sv-hero__robot--breit: min({60 * faktor:.1f}vw, {16 * faktor:.2f}rem)")


if __name__ == "__main__":
    main()
