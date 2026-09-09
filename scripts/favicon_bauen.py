"""Baut die Favicons aus dem vaiacon-Markenzeichen.

    python3 scripts/favicon_bauen.py

Das Zeichen ist breiter als hoch (182x109). Als durchsichtiges Orange auf
weissem Tab-Hintergrund verschwindet es bei 16 Pixeln fast. Darum steht die
gelieferte weisse Fassung auf tiefem Terracotta — bei kleiner Groesse gut erkennbar und
in den Marken-Farben.

Braucht Pillow:  python3 -m pip install --user Pillow
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

WURZEL = Path(__file__).resolve().parents[1]
# Die gelieferte weisse Fassung, nicht selbst eingefaerbt: das Design-System
# verbietet ausdruecklich, das Logo umzufaerben oder zu verzerren.
ZEICHEN = WURZEL / "assets" / "logo-mark-white.png"

TERRA = (168, 58, 8)        # --terra-700, der tiefe Marken-Ton


def kachel(kante: int, randanteil: float = 0.10, rund: bool = False) -> Image.Image:
    """Quadrat in Terracotta mit dem Zeichen in Creme, mittig."""
    bild = Image.new("RGBA", (kante, kante), TERRA + (255,))

    z = Image.open(ZEICHEN).convert("RGBA")
    z = z.crop(z.getchannel("A").getbbox())

    frei = int(kante * (1 - 2 * randanteil))
    faktor = min(frei / z.width, frei / z.height)
    neu = (max(int(z.width * faktor), 1), max(int(z.height * faktor), 1))
    z = z.resize(neu, Image.LANCZOS)

    bild.alpha_composite(z, ((kante - neu[0]) // 2, (kante - neu[1]) // 2))

    if rund:
        from PIL import ImageDraw
        maske = Image.new("L", (kante, kante), 0)
        ImageDraw.Draw(maske).rounded_rectangle([0, 0, kante - 1, kante - 1],
                                                radius=int(kante * 0.22), fill=255)
        bild.putalpha(maske)
    return bild


def main() -> None:
    kachel(180, rund=False).save(WURZEL / "apple-touch-icon.png")
    kachel(192).save(WURZEL / "icon-192.png")
    kachel(512).save(WURZEL / "icon-512.png")
    kachel(32).save(WURZEL / "favicon-32.png")

    # .ico mit mehreren Groessen, damit alte Browser und Windows sauber anzeigen
    kachel(256).save(WURZEL / "favicon.ico", format="ICO",
                     sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("geschrieben: favicon.ico, favicon-32.png, apple-touch-icon.png, icon-192.png, icon-512.png")


if __name__ == "__main__":
    main()
