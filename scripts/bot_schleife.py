#!/usr/bin/env python3
"""Macht aus einer Bürobot-Schleife vor Grün zwei durchsichtige Videos für die Website.

    python3 scripts/bot_schleife.py <roh.mp4> <bild.png> assets/video/vaiacon-buerobot-<motiv>

Eingang: ein Video, das aus <bild.png> entstanden ist (Bot mittig auf einem 1080er-Quadrat
in #00FF00, Höhe 86 %, Start- und Endbild = dieses Bild; so gebaut von Hand bzw. in
ElevenLabs mit Kling 3 Pro; die Rohvideos liegen in
~/Vaiacon/Marketing/Video/bot-schleifen/roh/). Ausgabe:

    <ziel>.webm  VP9 mit Alpha     — Chrome, Firefox, Edge
    <ziel>.mp4   HEVC mit Alpha    — Safari und alle Browser auf iPhone/iPad

Der Ausschnitt ist so gewählt, dass das erste Bild deckungsgleich auf <bild.png> liegt;
ragt der Bot in der Bewegung darüber hinaus, wächst der Rand, und das Skript meldet ihn
in Prozent der Bildbreite/-höhe (für `--st-rand-*` in start.css).
"""
import json
import subprocess
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

FF = "/opt/homebrew/bin/ffmpeg"
FP = "/opt/homebrew/bin/ffprobe"
BREITE = 480          # Ausgabebreite des Bot-Kastens (2x der grössten Anzeige)
ROH_QUADRAT = 1080    # so gross war das Startbild auf Grün
HOEHE_ANTEIL = 0.86
BUEHNE = np.array([184.0, 92.0, 40.0])   # Terracotta der Startseiten-Bühne


def lies_video(pfad):
    info = json.loads(subprocess.check_output([FP, "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height", "-of", "json", pfad]))["streams"][0]
    w, h = info["width"], info["height"]
    roh = subprocess.check_output([FF, "-v", "error", "-i", pfad, "-f", "rawvideo",
        "-pix_fmt", "rgb24", "-"])
    return np.frombuffer(roh, np.uint8).reshape(-1, h, w, 3), w, h


def freistellen(bild):
    """Alpha aus dem Grünüberschuss, Rand um ein Pixel enger, Randfarbe aus dem Inneren."""
    f = bild.astype(np.float32)
    r, g, b = f[..., 0], f[..., 1], f[..., 2]
    # Hintergrundfarbe aus den Ecken schätzen
    ecken = np.concatenate([f[:24, :24].reshape(-1, 3), f[:24, -24:].reshape(-1, 3)])
    grund = np.median(ecken, axis=0)
    k = g - np.maximum(r, b)
    k_grund = grund[1] - max(grund[0], grund[2])
    a = 1.0 - np.clip((k - 22.0) / (k_grund * 0.62 - 22.0), 0, 1)
    # Das 4:2:0-Video verschmiert das Grün ein, zwei Pixel in die Figur hinein; diese
    # angegrünten Pixel sind nicht zu retten. Darum den Rand um zwei Pixel einziehen
    # und wieder weich machen, sonst steht ein heller, rosa Saum um den Bot.
    a = ndimage.grey_erosion(a, size=(7, 7))
    a = ndimage.gaussian_filter(a, 0.7)
    a[a < 0.04] = 0
    a[a > 0.96] = 1
    # Flecken am Videorand (Kling lässt dort manchmal einzelne Pixel stehen)
    a[:16], a[-16:], a[:, :16], a[:, -16:] = 0, 0, 0, 0
    # Rest-Grün weg (die Figur hat kein Grün)
    farbe = f.copy()
    farbe[..., 1] = np.minimum(farbe[..., 1], np.maximum(farbe[..., 0], farbe[..., 2]) + 6)
    # Halbdurchsichtige und durchsichtige Pixel bekommen die Farbe des nächsten sicher
    # deckenden Pixels. So trägt kein Randpixel Grün oder Rechenrauschen, und das
    # Farb-Unterabtasten des Encoders zieht keine fremde Farbe in die Kante.
    innen = a >= 0.9
    if innen.any():
        iy, ix = ndimage.distance_transform_edt(~innen, return_distances=False, return_indices=True)
        farbe = farbe[iy, ix]
    # Die Bots stehen immer auf der Terracotta-Bühne: die weiche Kante bekommt die
    # Bühnenfarbe halb beigemischt, dann hebt sie sich in der Bewegung nicht mehr ab.
    rand = (a < 0.9)[..., None]
    farbe = np.where(rand, 0.5 * farbe + 0.5 * BUEHNE, farbe)
    farbe = np.clip(farbe, 0, 255)
    return np.dstack([farbe, a * 255]).astype(np.uint8)


def main(roh, bildpfad, ziel):
    frames, w, h = lies_video(roh)
    frames = frames[:-1]           # letztes Bild = erstes Bild, sonst ruckt die Naht
    s = w / ROH_QUADRAT
    bild = Image.open(bildpfad)
    bh = ROH_QUADRAT * HOEHE_ANTEIL
    bw = bild.width * bh / bild.height
    x0, y0 = (ROH_QUADRAT - bw) / 2 * s, (ROH_QUADRAT - bh) / 2 * s
    x1, y1 = x0 + bw * s, y0 + bh * s

    rgba = [freistellen(fr) for fr in frames]
    sichtbar = np.zeros((h, w), bool)
    for fr in rgba:
        sichtbar |= fr[..., 3] > 8
    ys, xs = np.nonzero(sichtbar)
    # Rand je Seite, auf ganze Prozent der Kastengrösse aufgerundet
    def rand(innen, aussen, groesse):
        return max(0.0, np.ceil((innen - aussen) / groesse * 100 + 0.5))
    rl = rand(x0, xs.min(), x1 - x0)
    rr = rand(xs.max(), x1, x1 - x0)
    ro = rand(y0, ys.min(), y1 - y0)
    ru = rand(ys.max(), y1, y1 - y0)
    cx0 = x0 - rl / 100 * (x1 - x0)
    cx1 = x1 + rr / 100 * (x1 - x0)
    cy0 = y0 - ro / 100 * (y1 - y0)
    cy1 = y1 + ru / 100 * (y1 - y0)
    ow = int(round(BREITE * (cx1 - cx0) / (x1 - x0) / 2) * 2)
    oh = int(round(ow * (cy1 - cy0) / (cx1 - cx0) / 2) * 2)

    P = 200  # durchsichtiger Rand, falls der Ausschnitt über das Video hinausragt
    kasten = (cx0 + P, cy0 + P, cx1 + P, cy1 + P)

    def zuschnitt(fr):
        im = Image.fromarray(np.pad(fr, ((P, P), (P, P), (0, 0))))
        # Pillow skaliert RGBA vormultipliziert, darum keine dunklen Säume
        return im.resize((ow, oh), Image.Resampling.LANCZOS, box=kasten, reducing_gap=3.0)
    aus = b"".join(zuschnitt(fr).tobytes() for fr in rgba)

    eingang = [FF, "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba",
               "-s", f"{ow}x{oh}", "-r", "24", "-i", "-"]
    subprocess.run(eingang + ["-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-b:v", "0",
        "-crf", "34", "-row-mt", "1", "-deadline", "good", "-cpu-used", "1",
        "-an", f"{ziel}.webm"], input=aus, check=True)
    subprocess.run(eingang + ["-vf", "format=bgra", "-c:v", "hevc_videotoolbox",
        "-alpha_quality", "1.0", "-b:v", "700k", "-tag:v", "hvc1", "-allow_sw", "1",
        "-movflags", "+faststart", "-an", f"{ziel}.mp4"], input=aus, check=True)
    zuschnitt(rgba[0]).save(f"{ziel}-pruef.png")
    print(json.dumps({"ziel": ziel, "groesse": [ow, oh], "bilder": len(rgba),
                      "rand_prozent": {"links": rl, "rechts": rr, "oben": ro, "unten": ru}}))


if __name__ == "__main__":
    main(*sys.argv[1:4])
