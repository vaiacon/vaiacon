"""Macht leichte WebP-Fassungen der Bilder, die auf den Seiten stehen.

    python3 scripts/bilder_webp.py            # alle Bilder aus der Liste unten
    python3 scripts/bilder_webp.py --probe    # nur zeigen, was entstehen wuerde

Punkt 07b aus Philips Vorschlaegen vom 22.09.2026: Die Hero-Bots waren
380–650 KB gross, die Portraets auf «Ueber uns» 1,8 und 2 MB. Gezeigt werden
die Bots hoechstens 308px hoch; fuer scharfe Bildschirme reicht die doppelte
Hoehe. Die WebP-Datei liegt neben dem PNG und traegt denselben Namen. Die
Seiten binden sie mit <picture> ein, das PNG bleibt als Rueckfall stehen.

Neues Bild (z.B. nach `bot_einpassen.py`): in die Liste unten eintragen und
das Skript laufen lassen. Braucht Pillow mit WebP (`python3 -c "from PIL
import features; print(features.check('webp'))"`).
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

WURZEL = Path(__file__).resolve().parents[1]

# Datei → (hoechste Hoehe, hoechste Breite) in Pixeln; None = nicht begrenzt.
BILDER = {
    "assets/vaiacon-buerobot-startseite.png": (616, None),
    "assets/vaiacon-buerobot-faq-tablet.png": (616, None),
    "assets/vaiacon-buerobot-kontakt-telefon.png": (616, None),
    "assets/vaiacon-buerobot-automatisierung-zahnrad.png": (616, None),
    "assets/vaiacon-buerobot-sichtbarkeit-lupe.png": (616, None),
    "assets/vaiacon-buerobot-schulung-zeigestab.png": (616, None),
    "assets/vaiacon-buerobot-begleitung-laptop.png": (616, None),
    "assets/vaiacon-buerobot-ueber-uns-willkommen.png": (616, None),
    "assets/vaiacon-buerobot-academy-schreibtisch.png": (616, None),
    "assets/andre-ulrich-team.png": (None, 1200),
    "assets/philip-krieger-team.png": (None, 1200),
}
QUALITAET = 82


def main() -> None:
    probe = "--probe" in sys.argv
    vorher = nachher = 0
    for name, (max_h, max_b) in BILDER.items():
        quelle = WURZEL / name
        ziel = quelle.with_suffix(".webp")
        bild = Image.open(quelle)
        mass = min(1.0,
                   (max_h / bild.height) if max_h else 1.0,
                   (max_b / bild.width) if max_b else 1.0)
        groesse = (round(bild.width * mass), round(bild.height * mass))
        if not probe:
            if mass < 1.0:
                bild = bild.resize(groesse, Image.LANCZOS)
            bild.save(ziel, "WEBP", quality=QUALITAET, method=6)
        a = quelle.stat().st_size // 1024
        b = ziel.stat().st_size // 1024 if ziel.exists() else 0
        vorher += a
        nachher += b
        print(f"{name}: {a} KB → {ziel.name} {groesse[0]}×{groesse[1]}" + ("" if probe else f", {b} KB"))
    if not probe:
        print(f"Zusammen: {vorher} KB → {nachher} KB")


if __name__ == "__main__":
    main()
