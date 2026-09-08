"""Ersetzt das geprägte «+» auf dem Ordner in lernplan-02 durch das vaiacon-Zeichen.

Zwei Varianten zur Auswahl:
  praegung - Ton in Ton in den Ordner gepraegt, wie das + vorher. Aus dem Bild
             gemessen: Plattenflaeche ~178, versenkte Flaeche ~145 (also -33),
             Schattenkante oben ~133 (-45), Lichtkante unten ~191 (+13).
             Licht kommt von oben.
  aufdruck - als oranges Markenzeichen aufgedruckt, wie vorher auf dem Bauch.
"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
from scipy.sparse import lil_matrix
from scipy.sparse.linalg import spsolve

REPO = Path(__file__).resolve().parents[1]
QUELLE = REPO / "academy" / "assets" / "lernplan-02.png"
ZEICHEN = REPO / "assets" / "logo-mark-terra.png"

# Aus dem Bild gemessen
PLATTE = (415, 552, 522, 668)      # Innenflaeche der gepraegten Platte
PLUS = (428, 563, 508, 655)        # das alte + mit etwas Rand
TIEFE = 33.0                        # wie stark die versenkte Flaeche abdunkelt
KANTE = 26.0                        # zusaetzliche Schatten-/Lichtkante
BAUCH_ORANGE = (221.0, 86.0, 25.0)


def harmonisch_fuellen(kanal, luecke):
    ys, xs = np.where(luecke)
    if len(ys) == 0:
        return kanal.astype(float)
    nummer = -np.ones(luecke.shape, int)
    nummer[luecke] = np.arange(len(ys))
    A = lil_matrix((len(ys), len(ys)))
    b = np.zeros(len(ys))
    hoehe, breite = kanal.shape
    for i, (y, x) in enumerate(zip(ys, xs)):
        A[i, i] = 4.0
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = y + dy, x + dx
            if not (0 <= ny < hoehe and 0 <= nx < breite):
                A[i, i] -= 1.0
            elif luecke[ny, nx]:
                A[i, nummer[ny, nx]] = -1.0
            else:
                b[i] += float(kanal[ny, nx])
    ergebnis = kanal.astype(float).copy()
    ergebnis[luecke] = spsolve(A.tocsr(), b)
    return ergebnis


def zeichen_maske(breite_px: int) -> tuple[np.ndarray, int, int]:
    z = Image.open(ZEICHEN).convert("RGBA")
    z = z.crop(z.getchannel("A").getbbox())
    hoehe_px = max(int(round(breite_px * z.height / z.width)), 6)
    z = z.resize((breite_px, hoehe_px), Image.LANCZOS)
    return np.asarray(z).astype(float)[..., 3] / 255.0, breite_px, hoehe_px


def bauen(art: str, ziel: Path, breite_anteil: float = 0.90) -> None:
    a = np.asarray(Image.open(QUELLE).convert("RGB")).astype(float)

    # --- 1. altes + wegnehmen: alles, was innerhalb der Platte von der
    #        Plattenhelligkeit abweicht, glatt zuwachsen lassen ---
    h = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
    px0, py0, px1, py1 = PLUS
    kasten = np.zeros(a.shape[:2], bool)
    kasten[py0:py1, px0:px1] = True
    plattenwert = float(np.median(h[PLATTE[1]:PLATTE[3], PLATTE[0]:PLATTE[2]]))
    abweichung = (h < plattenwert - 12) | (h > plattenwert + 8)
    luecke = ndimage.binary_closing(abweichung & kasten, np.ones((5, 5)))
    luecke = ndimage.binary_dilation(luecke, iterations=3) & kasten

    schnitt = (slice(py0 - 14, py1 + 14), slice(px0 - 14, px1 + 14))
    sauber = a.copy()
    for k in range(3):
        sauber[schnitt + (k,)] = harmonisch_fuellen(a[schnitt + (k,)], luecke[schnitt])

    # --- 2. vaiacon-Zeichen einpassen, mittig auf der Platte ---
    plattenbreite = PLATTE[2] - PLATTE[0]
    breite_px = int(round(plattenbreite * breite_anteil))
    alpha, bw, bh = zeichen_maske(breite_px)
    mx = (PLATTE[0] + PLATTE[2]) // 2
    my = (PLATTE[1] + PLATTE[3]) // 2
    zx, zy = mx - bw // 2, my - bh // 2

    m = np.zeros(a.shape[:2], float)
    m[zy:zy + bh, zx:zx + bw] = alpha
    m = np.asarray(
        Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    ).astype(float) / 255.0

    ergebnis = sauber.copy()
    if art == "praegung":
        # Versenkte Flaeche abdunkeln, dazu Schattenkante oben und Lichtkante unten.
        # Licht von oben: oberhalb der Kante dunkel, unterhalb hell.
        d = 2
        kanten = np.roll(m, d, axis=0) - np.roll(m, -d, axis=0)
        # leichte Neigung nach links, damit das Licht von oben-links kommt
        kanten += 0.35 * (np.roll(m, d, axis=1) - np.roll(m, -d, axis=1))
        schattierung = -TIEFE * m + KANTE * kanten
        for k in range(3):
            # Anteilig zur Kanalhelligkeit, damit der Farbton des Ordners bleibt
            anteil = sauber[..., k] / np.maximum(
                0.299 * sauber[..., 0] + 0.587 * sauber[..., 1] + 0.114 * sauber[..., 2], 1.0)
            ergebnis[..., k] = sauber[..., k] + schattierung * anteil
    else:
        helligkeit = 0.299 * sauber[..., 0] + 0.587 * sauber[..., 1] + 0.114 * sauber[..., 2]
        bezug = float(np.median(helligkeit[m > 0.5])) if (m > 0.5).sum() > 10 else 180.0
        verhaeltnis = np.clip(helligkeit / max(bezug, 1.0), 0.6, 1.5) ** 1.5
        for k in range(3):
            farbe = np.clip(BAUCH_ORANGE[k] * verhaeltnis, 0, 255)
            ergebnis[..., k] = sauber[..., k] * (1 - m) + farbe * m

    Image.fromarray(np.clip(ergebnis, 0, 255).astype(np.uint8)).save(ziel)
    print(f"{art}: geschrieben {ziel.name}  Zeichen {bw}x{bh} bei ({zx},{zy})")


if __name__ == "__main__":
    # Beide Varianten nach /tmp, damit ein Lauf nie ungefragt das Bild ersetzt.
    # Uebernommen wurde am 08.09.2026 der Aufdruck (Entscheid im Team).
    ziel = Path("/tmp/ordnerlogo"); ziel.mkdir(parents=True, exist_ok=True)
    bauen("praegung", ziel / "ordner-praegung.png")
    bauen("aufdruck", ziel / "ordner-aufdruck.png")
    print(f"Beide Varianten liegen in {ziel} - das Bild selbst wurde nicht angetastet.")
