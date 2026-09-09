"""Setzt das vaiacon-Zeichen auf den Bauch des Roboters in lernplan-02.

Die Arme bleiben verschraenkt. Das Zeichen sitzt darum nicht dort, wo das alte
Simplaro-Zeichen sass (zu zwei Dritteln verdeckt), sondern im freien Band direkt
unter den Haenden.

Aus dem Bild gemessen:
  Arme enden bei y 579-599 (ueber x 860-1025)
  freier Bauch von y ~605 bis zur Hueftnaht bei y ~690
  Bauchmitte bei x ~940, Helligkeit im Band 160-175
"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

REPO = Path(__file__).resolve().parents[1]
QUELLE = REPO / "academy" / "assets" / "lernplan-02.png"
ZEICHEN = REPO / "assets" / "logo-mark-terra.png"

MITTE_X = 940          # Bauchmitte
OBERKANTE = 610        # knapp unter den Haenden
BREITE = 120           # Zeichenbreite in Pixeln
BAUCH_ORANGE = (221.0, 86.0, 25.0)
STAERKE = 1.8          # wie stark das Zeichen die Woelbung mitnimmt


def bauen(ziel: Path, breite: int = BREITE, oberkante: int = OBERKANTE,
          mitte_x: int = MITTE_X) -> dict:
    a = np.asarray(Image.open(QUELLE).convert("RGB")).astype(np.float64)

    z = Image.open(ZEICHEN).convert("RGBA")
    z = z.crop(z.getchannel("A").getbbox())
    hoehe = max(int(round(breite * z.height / z.width)), 6)
    z = z.resize((breite, hoehe), Image.LANCZOS)
    alpha = np.asarray(z).astype(np.float64)[..., 3] / 255.0

    zx = mitte_x - breite // 2
    zy = oberkante

    stempel = np.zeros(a.shape[:2], np.float64)
    stempel[zy:zy + hoehe, zx:zx + breite] = alpha
    stempel = np.asarray(
        Image.fromarray((stempel * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    ).astype(np.float64) / 255.0

    # Sicherung: nie auf die dunklen Arme oder Beine zeichnen
    helligkeit = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    stempel *= (helligkeit > 120).astype(np.float64)

    bereich = stempel > 0.05
    bezug = float(np.median(helligkeit[bereich]))
    verhaeltnis = np.clip(helligkeit / max(bezug, 1.0), 0.55, 1.55) ** STAERKE

    ergebnis = a.copy()
    for k in range(3):
        farbe = np.clip(BAUCH_ORANGE[k] * verhaeltnis, 0, 255)
        ergebnis[..., k] = a[..., k] * (1 - stempel) + farbe * stempel

    Image.fromarray(np.clip(ergebnis, 0, 255).astype(np.uint8)).save(ziel)
    return {"zeichen": (zx, zy, breite, hoehe), "unterkante": zy + hoehe,
            "gezeichnet": int((stempel > 0.5).sum())}


if __name__ == "__main__":
    # Schreibt nach /tmp, damit ein Lauf nie ungefragt das Bild ersetzt.
    # Uebernommen wurde am 08.09.2026 die Fassung mit breite=120, oberkante=610.
    ziel = Path("/tmp/bauch02")
    ziel.mkdir(parents=True, exist_ok=True)
    print(bauen(ziel / "lernplan-02.png", breite=120, oberkante=610))
    print(f"Ergebnis in {ziel} - das Bild selbst wurde nicht angetastet.")
