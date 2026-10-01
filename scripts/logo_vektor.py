"""Baut alle Logo-Dateien aus einem sauberen Vektor-Master.

    python3 scripts/logo_vektor.py                        # alle PNG und SVG neu bauen
    python3 scripts/logo_vektor.py --ziel /tmp/probe      # nur in einen Probe-Ordner schreiben
    python3 scripts/logo_vektor.py --nachzeichnen quelle.png   # Master neu aus einem Bild ableiten

Warum (01.10.2026, André: «Das Logo auf der gesamten Seite ist stark verpixelt»):
Die Logo-PNG waren 595×109 Pixel gross und hatten gar keine weichen Kanten
(Durchsicht nur 0 oder fast 1). Sie entstanden am 03.09.2026 aus einem JPEG
durch scripts/rebrand_logo_assets.py. Eine blosse Nachzeichnung mit Kurven
uebernimmt die Wellen der Vorlage. Darum baut --nachzeichnen den Master in drei Teilen:

  Symbol (V und Pfeil)  Umriss aus der Vorlage, entlang der Kontur geglaettet, Ecken
                        festgehalten, mit wenigen Kurven neu angepasst (Schneider).
  Drei Linien + Punkt   saubere Formen: gleich dick, Enden voll rund, Lage wie in der Vorlage.
  Schriftzug            Die Buchstaben bestehen aus einer einheitlichen Strichstaerke.
                        Gezeichnet wird die Mittellinie jedes Buchstabens (Skelett), geglaettet,
                        mit der gemessenen Strichstaerke und runden Enden.

Der Master liegt in assets/logo-vektor/vaiacon-lockup.svg, aus ihm entstehen alle Dateien
in beliebiger Aufloesung. Form, Lage und Strichstaerke stammen aus der gelieferten Datei;
frei hinzugefuegt wurde nichts.

Je Datei entstehen PNG und SVG nebeneinander. Die Seiten zeigen das SVG (in jeder
Groesse und auf jedem Bildschirm scharf); das PNG bleibt fuer Strukturdaten,
Vorschaubilder und alles, was kein SVG kann.

Dateien und Farben wie bisher:
  lockup  = Symbol und Schriftzug, 595×109  (PNG jetzt 4× so gross)
  mark    = nur das Symbol, links 182×109 des Lockups
  wordmark= nur der Schriftzug, Ausschnitt 369×73 ab x=226, y=19
Terracotta (230, 78, 42) oder Weiss. Die Namen «terra-symbol-white» und
«terra-symbol-cream» sind aelter als die Farben: Sie haben im Bestand dieselbe
Farbe wie «white» beziehungsweise «terra» und behalten sie.

Bessere Quelle (echtes Vektor-Original oder mindestens 2000 Pixel breit) hat
Vorrang: dann den Master ersetzen und dieses Skript laufen lassen.
`--nachzeichnen` braucht zusaetzlich `pip install scipy scikit-image`, der normale
Lauf nur numpy, scipy und Pillow.
"""
from __future__ import annotations

import math
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import distance_transform_edt

WURZEL = Path(__file__).resolve().parents[1]
MASTER = WURZEL / "assets" / "logo-vektor" / "vaiacon-lockup.svg"
ZIELE = [WURZEL / "assets", WURZEL / "academy" / "assets", WURZEL / "uploads"]

BREITE, HOEHE = 595, 109          # Lockup in Ursprungs-Pixeln
MASSSTAB = 4                       # Ausgabe: 4 Pixel je Ursprungs-Pixel
UEBERABTASTUNG = 4                 # innen noch einmal 4×4 fuer weiche Kanten
TERRA, WEISS = (230, 78, 42), (255, 255, 255)
SCHRIFTZUG_AB_X = 215              # rechts davon liegt der Schriftzug, links das Symbol
SYMBOL_GLAETTEN = 1.5              # Pixel entlang der Kontur (hoeher = ruhiger, Feinheiten gehen verloren)
SYMBOL_TOLERANZ = 0.9              # groesster Abstand der Kurven zur Kontur in Pixeln

# Ausschnitt (x, y, Breite, Hoehe) im Lockup und welcher Teil
TEILE = {"lockup": (0, 0, 595, 109, ("symbol", "wortmarke")),
         "mark": (0, 0, 182, 109, ("symbol",)),
         "wordmark": (226, 19, 369, 73, ("wortmarke",))}

DATEIEN = {
    "logo-lockup-academy": ("lockup", TERRA), "logo-lockup-terra": ("lockup", TERRA),
    "logo-lockup-terra-symbol-cream": ("lockup", TERRA), "logo-lockup-white": ("lockup", WEISS),
    "logo-lockup-terra-symbol-white": ("lockup", WEISS),
    "logo-mark-terra": ("mark", TERRA), "logo-mark-terra-symbol-white": ("mark", TERRA),
    "logo-mark-white": ("mark", WEISS),
    "logo-wordmark-terra": ("wordmark", TERRA), "logo-wordmark-white": ("wordmark", WEISS),
}


def hex_(farbe: tuple[int, int, int]) -> str:
    return "#%02x%02x%02x" % farbe


# ---------------------------------------------------------------- Master lesen

def flach(d: str) -> list[list[tuple[float, float]]]:
    """Pfad (M, L, C, Z) in Linienzuege zerlegen, Kurven in feine Stuecke."""
    zuege, aktuell, pos = [], [], (0.0, 0.0)
    for befehl, zahlen in re.findall(r"([MLCZ])([^MLCZ]*)", d):
        w = [float(z) for z in re.findall(r"-?\d+\.?\d*", zahlen)]
        if befehl == "M":
            if aktuell:
                zuege.append(aktuell)
            pos = (w[0], w[1])
            aktuell = [pos]
        elif befehl == "L":
            for i in range(0, len(w), 2):
                pos = (w[i], w[i + 1])
                aktuell.append(pos)
        elif befehl == "C":
            for i in range(0, len(w), 6):
                p0, p1, p2, p3 = pos, (w[i], w[i + 1]), (w[i + 2], w[i + 3]), (w[i + 4], w[i + 5])
                for k in range(1, 25):
                    s = k / 24
                    u = 1 - s
                    aktuell.append((u**3 * p0[0] + 3 * u * u * s * p1[0] + 3 * u * s * s * p2[0] + s**3 * p3[0],
                                    u**3 * p0[1] + 3 * u * u * s * p1[1] + 3 * u * s * s * p2[1] + s**3 * p3[1]))
                pos = p3
        elif befehl == "Z" and aktuell:
            zuege.append(aktuell)
            aktuell = []
    if aktuell:
        zuege.append(aktuell)
    return zuege


def master_lesen() -> dict:
    text = MASTER.read_text(encoding="utf-8")
    symbol = re.search(r'<path id="symbol"[^>]* d="([^"]+)"', text).group(1)
    gruppe = re.search(r'<g id="wortmarke" stroke-width="([\d.]+)">(.*?)</g>', text, re.S)
    return {
        "symbol_d": symbol,
        "strich": float(gruppe.group(1)),
        "linien_d": re.findall(r'<path d="([^"]+)"/>', gruppe.group(2)),
        "punkte": [tuple(float(v) for v in m) for m in
                   re.findall(r'<circle cx="([\d.-]+)" cy="([\d.-]+)" r="([\d.]+)"/>', gruppe.group(2))],
    }


# -------------------------------------------------------------------- Rendern

def rendern(master: dict, ausschnitt: str, farbe: tuple[int, int, int]) -> Image.Image:
    x0, y0, b, h, namen = TEILE[ausschnitt]
    ss = MASSSTAB * UEBERABTASTUNG
    gesamt = np.zeros((h * ss, b * ss), dtype=bool)
    if "symbol" in namen:
        for zug in flach(master["symbol_d"]):
            maske = Image.new("1", (b * ss, h * ss), 0)
            ImageDraw.Draw(maske).polygon([((x - x0) * ss, (y - y0) * ss) for x, y in zug], fill=1)
            gesamt ^= np.asarray(maske, dtype=bool)  # gerade-ungerade: Loecher bleiben Loecher
    if "wortmarke" in namen:
        spur = Image.new("1", (b * ss, h * ss), 0)
        zeichner = ImageDraw.Draw(spur)
        for d in master["linien_d"]:
            for zug in flach(d):
                for (xa, ya), (xb, yb) in zip(zug, zug[1:]):
                    n = max(1, int(math.hypot(xb - xa, yb - ya) * ss / 0.5))
                    for k in range(n + 1):
                        px = (xa + (xb - xa) * k / n - x0) * ss
                        py = (ya + (yb - ya) * k / n - y0) * ss
                        zeichner.point((int(round(px)), int(round(py))), fill=1)
        abstand = distance_transform_edt(~np.asarray(spur, dtype=bool))
        gesamt |= abstand <= master["strich"] / 2 * ss
        punkte = Image.new("1", (b * ss, h * ss), 0)
        for cx, cy, r in master["punkte"]:
            ImageDraw.Draw(punkte).ellipse(((cx - r - x0) * ss, (cy - r - y0) * ss,
                                            (cx + r - x0) * ss, (cy + r - y0) * ss), fill=1)
        gesamt |= np.asarray(punkte, dtype=bool)
    # Flaechenmittel auf die Ausgabegroesse
    alpha = gesamt.reshape(h * MASSSTAB, UEBERABTASTUNG, b * MASSSTAB, UEBERABTASTUNG).mean(axis=(1, 3))
    rgba = np.zeros((h * MASSSTAB, b * MASSSTAB, 4), dtype=np.uint8)
    rgba[..., :3] = farbe
    rgba[..., 3] = np.round(alpha * 255).astype(np.uint8)
    return Image.fromarray(rgba)


def svg_bauen(master: dict, ausschnitt: str, farbe: tuple[int, int, int]) -> str:
    x0, y0, b, h, namen = TEILE[ausschnitt]
    f = hex_(farbe)
    teile = []
    if "symbol" in namen:
        teile.append(f'<path fill="{f}" fill-rule="evenodd" d="{master["symbol_d"]}"/>')
    if "wortmarke" in namen:
        linien = "".join(f'<path d="{d}"/>' for d in master["linien_d"])
        teile.append(f'<g fill="none" stroke="{f}" stroke-width="{master["strich"]}" '
                     f'stroke-linecap="round" stroke-linejoin="round">{linien}</g>')
        teile += [f'<circle fill="{f}" cx="{cx}" cy="{cy}" r="{r}"/>' for cx, cy, r in master["punkte"]]
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0} {y0} {b} {h}" width="{b}" height="{h}" '
            f'role="img" aria-label="vaiacon">{"".join(teile)}</svg>\n')


def bauen(ziel: Path | None) -> None:
    master = master_lesen()
    ordner = [ziel] if ziel else ZIELE
    for o in ordner:
        o.mkdir(parents=True, exist_ok=True)
    bilder: dict[tuple, Image.Image] = {}
    for name, (ausschnitt, farbe) in DATEIEN.items():
        if (ausschnitt, farbe) not in bilder:
            bilder[(ausschnitt, farbe)] = rendern(master, ausschnitt, farbe)
        bild = bilder[(ausschnitt, farbe)]
        svg = svg_bauen(master, ausschnitt, farbe)
        for o in ordner:
            bild.save(o / f"{name}.png", optimize=True)
            (o / f"{name}.svg").write_text(svg, encoding="utf-8")
        print(f"{name}: {bild.size[0]}×{bild.size[1]}")


# --------------------------------------------------------- Nachzeichnen (selten)

def _kurven_anpassen(p, tol, t1, t2):
    """Schneider: Kurvenanpassung mit wenigen kubischen Kurven (Fehler unter tol Pixeln)."""
    def bez(c, t):
        u = 1 - t
        return (u**3)[:, None] * c[0] + (3 * u * u * t)[:, None] * c[1] + (3 * u * t * t)[:, None] * c[2] + (t**3)[:, None] * c[3]

    def ab1(c, t):
        u = 1 - t
        return (3 * u * u)[:, None] * (c[1] - c[0]) + (6 * u * t)[:, None] * (c[2] - c[1]) + (3 * t * t)[:, None] * (c[3] - c[2])

    def ab2(c, t):
        return (6 * (1 - t))[:, None] * (c[2] - 2 * c[1] + c[0]) + (6 * t)[:, None] * (c[3] - 2 * c[2] + c[1])

    def sehne(q):
        d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(q, axis=0), axis=1))]
        return d / d[-1]

    def erzeugen(q, u, a, b):
        q0, q3 = q[0], q[-1]
        A1, A2 = (3 * (1 - u)**2 * u)[:, None] * a, (3 * (1 - u) * u * u)[:, None] * b
        C = np.array([[(A1 * A1).sum(), (A1 * A2).sum()], [(A1 * A2).sum(), (A2 * A2).sum()]])
        rest = q - ((((1 - u)**3 + 3 * (1 - u)**2 * u)[:, None]) * q0 + ((3 * (1 - u) * u * u + u**3)[:, None]) * q3)
        X = np.array([(A1 * rest).sum(), (A2 * rest).sum()])
        det = C[0, 0] * C[1, 1] - C[0, 1] * C[1, 0]
        laenge = np.linalg.norm(q3 - q0)
        if abs(det) > 1e-12:
            a1, a2 = (X[0] * C[1, 1] - X[1] * C[0, 1]) / det, (C[0, 0] * X[1] - C[1, 0] * X[0]) / det
        else:
            a1 = a2 = 0
        if a1 < 1e-6 * laenge or a2 < 1e-6 * laenge:
            a1 = a2 = laenge / 3
        return np.array([q0, q0 + a * a1, q3 + b * a2, q3])

    if len(p) == 2:
        dist = np.linalg.norm(p[1] - p[0]) / 3
        return [np.array([p[0], p[0] + t1 * dist, p[1] + t2 * dist, p[1]])]
    u = sehne(p)
    c = erzeugen(p, u, t1, t2)
    for _ in range(5):
        if np.linalg.norm(bez(c, u) - p, axis=1).max() < tol:
            return [c]
        dd, q1, q2 = bez(c, u) - p, ab1(c, u), ab2(c, u)
        nenner = (q1 * q1).sum(1) + (dd * q2).sum(1)
        u = np.clip(u - np.where(np.abs(nenner) > 1e-12, (dd * q1).sum(1) / np.where(nenner == 0, 1, nenner), 0), 0, 1)
        c = erzeugen(p, u, t1, t2)
    fehler = np.linalg.norm(bez(c, u) - p, axis=1)
    if fehler.max() < tol:
        return [c]
    s = min(max(int(np.argmax(fehler)), 1), len(p) - 2)
    tc = p[s - 1] - p[s + 1]
    tc = tc / np.linalg.norm(tc)
    return _kurven_anpassen(p[:s + 1], tol, t1, tc) + _kurven_anpassen(p[s:], tol, -tc, t2)


def _pfad(kurven) -> str:
    d = f"M{kurven[0][0][0]:.2f},{kurven[0][0][1]:.2f}"
    for k in kurven:
        d += f"C{k[1][0]:.2f},{k[1][1]:.2f} {k[2][0]:.2f},{k[2][1]:.2f} {k[3][0]:.2f},{k[3][1]:.2f}"
    return d


def nachzeichnen(quelle: Path) -> None:
    from scipy.ndimage import convolve, gaussian_filter, gaussian_filter1d, label
    from skimage import measure
    from skimage.morphology import skeletonize

    bild = Image.open(quelle).convert("RGBA")
    if bild.size != (BREITE, HOEHE):
        raise SystemExit(f"Quelle muss {BREITE}×{HOEHE} sein (Seitenverhaeltnis und Ausschnitte haengen daran), ist {bild.size}")
    alpha = bild.getchannel("A")
    F = 8
    binaer = (np.asarray(alpha) > 127).astype(np.uint8) * 255
    gross = np.asarray(Image.fromarray(binaer).resize((BREITE * F, HOEHE * F), Image.BICUBIC), dtype=np.float32) / 255
    gross = gaussian_filter(gross, F * 0.8)
    DS = 0.2

    # ---------------- Symbol: Umriss glaetten und mit Kurven anpassen
    rand = 4
    konturen = [c[:, ::-1] / F - rand for c in measure.find_contours(np.pad(gross, rand * F), 0.5)]

    def gleichmaessig(c):
        if np.linalg.norm(c[0] - c[-1]) > 1e-6:
            c = np.vstack([c, c[:1]])
        d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(c, axis=0), axis=1))]
        n = max(8, int(d[-1] / DS))
        s = np.linspace(0, d[-1], n, endpoint=False)
        return np.c_[np.interp(s, d, c[:, 0]), np.interp(s, d, c[:, 1])]

    def ecken(c, k=7, grenze=52):
        n = len(c)
        idx = np.arange(n)
        v1, v2 = c[idx] - c[(idx - k) % n], c[(idx + k) % n] - c[idx]
        w = np.degrees(np.abs(np.arctan2(v1[:, 0] * v2[:, 1] - v1[:, 1] * v2[:, 0], (v1 * v2).sum(1))))
        return [i for i in range(n) if w[i] > grenze and w[i] == w[np.arange(i - k, i + k + 1) % n].max()]

    def glaetten(c, sig, ec):
        s, n = sig / DS, len(c)
        if not ec:
            return np.c_[gaussian_filter1d(c[:, 0], s, mode="wrap"), gaussian_filter1d(c[:, 1], s, mode="wrap")]
        aus = c.copy()
        for a_, b_ in zip(ec, ec[1:] + [ec[0] + n]):
            seg = np.array([c[i % n] for i in range(a_, b_ + 1)])
            if len(seg) < 5:
                continue
            sm = np.c_[gaussian_filter1d(seg[:, 0], s, mode="nearest"), gaussian_filter1d(seg[:, 1], s, mode="nearest")]
            w = np.linspace(0, 1, len(seg))[:, None]
            sm = sm + (seg[0] - sm[0]) * (1 - w)**3 + (seg[-1] - sm[-1]) * w**3
            for j, i in enumerate(range(a_, b_)):
                aus[i % n] = sm[j]
        return aus

    def kontur_pfad(c):
        ec = ecken(c)
        sm = glaetten(c, SYMBOL_GLAETTEN, ec)
        n, k = len(sm), 5

        def teil(pts):
            t1 = pts[min(k, len(pts) - 1)] - pts[0]
            t2 = pts[max(len(pts) - 1 - k, 0)] - pts[-1]
            return _kurven_anpassen(pts, SYMBOL_TOLERANZ, t1 / np.linalg.norm(t1), t2 / np.linalg.norm(t2))
        if ec:
            kurven = []
            for a_, b_ in zip(ec, ec[1:] + [ec[0] + n]):
                kurven += teil(np.array([sm[i % n] for i in range(a_, b_ + 1)]))
        else:
            h = n // 2
            kurven = teil(np.array([sm[i % n] for i in range(h + 1)])) + teil(np.array([sm[i % n] for i in range(h, n + 1)]))
        return _pfad(kurven) + "Z"

    def pille(x0, x1, y0, y1):
        r = (y1 - y0) / 2
        pts = [(x1 - r + r * math.cos(math.pi * (-0.5 + k / 24)), y0 + r + r * math.sin(math.pi * (-0.5 + k / 24))) for k in range(25)]
        pts += [(x0 + r + r * math.cos(math.pi * (0.5 + k / 24)), y0 + r + r * math.sin(math.pi * (0.5 + k / 24))) for k in range(25)]
        return "M" + "L".join(f"{x:.2f},{y:.2f}" for x, y in pts) + "Z"

    symbol, linien, punkt = [], [], None
    for c in konturen:
        c = gleichmaessig(c)
        bb = (c[:, 0].min(), c[:, 0].max(), c[:, 1].min(), c[:, 1].max())
        w, h = bb[1] - bb[0], bb[3] - bb[2]
        if (bb[0] + bb[1]) / 2 >= SCHRIFTZUG_AB_X - 11:
            continue                         # Schriftzug kommt unten aus dem Skelett
        if h < 12 and w / h > 3:
            linien.append(bb)
        elif w < 10 and h < 10:
            punkt = bb
        else:
            symbol.append(kontur_pfad(c))
    hoehe = float(np.median([b[3] - b[2] for b in linien]))
    for x0, x1, y0, y1 in linien:
        cy = (y0 + y1) / 2
        symbol.append(pille(x0, x1, cy - hoehe / 2, cy + hoehe / 2))
    if punkt:
        px, py = (punkt[0] + punkt[1]) / 2, (punkt[2] + punkt[3]) / 2
        r = ((punkt[1] - punkt[0]) + (punkt[3] - punkt[2])) / 4
        symbol.append(pille(px - r, px + r, py - r, py + r))

    # ---------------- Schriftzug: Mittellinien mit einheitlicher Strichstaerke
    maske = gross > 0.5
    maske[:, :SCHRIFTZUG_AB_X * F] = False
    beschriftung, anzahl = label(maske, structure=np.ones((3, 3)))
    abstand = distance_transform_edt(maske)
    nachbarn = np.ones((3, 3))
    nachbarn[1, 1] = 0
    strichbreiten, wege, kreise = [], [], []

    def wege_verfolgen(skel):
        n = convolve(skel.astype(int), nachbarn, mode="constant") * skel
        enden = np.argwhere((n == 1) & skel)
        kreuz = (n >= 3) & skel
        besucht = np.zeros_like(skel, bool)
        hoch, breit = skel.shape

        def nach(p):
            y, x = p
            return [(y + dy, x + dx) for dy in (-1, 0, 1) for dx in (-1, 0, 1)
                    if (dy or dx) and 0 <= y + dy < hoch and 0 <= x + dx < breit and skel[y + dy, x + dx]]
        aus = []
        for s in [tuple(e) for e in enden] + [tuple(j) for j in np.argwhere(kreuz)]:
            for q in nach(s):
                if besucht[q] and not kreuz[q]:
                    continue
                weg, cur, vor = [s, q], q, s
                besucht[q] = True
                while not kreuz[cur] and n[cur] != 1:
                    folgt = [r for r in nach(cur) if r != vor and not (besucht[r] and not kreuz[r])]
                    if not folgt:
                        break
                    vor, cur = cur, folgt[0]
                    weg.append(cur)
                    besucht[cur] = True
                aus.append(weg)
        if not aus:                           # geschlossene Schleife (o)
            p0 = tuple(np.argwhere(skel)[0])
            weg, cur = [p0], p0
            besucht[p0] = True
            while True:
                folgt = [r for r in nach(cur) if not besucht[r]]
                if not folgt:
                    break
                cur = folgt[0]
                besucht[cur] = True
                weg.append(cur)
            weg.append(p0)
            aus = [weg]
        return aus

    for k in range(1, anzahl + 1):
        teil = beschriftung == k
        ys, xs = np.nonzero(teil)
        bw, bh = (xs.max() - xs.min()) / F, (ys.max() - ys.min()) / F
        if bw < 11 and bh < 11:               # Punkt auf dem i
            kreise.append(((xs.min() + xs.max()) / 2 / F, (ys.min() + ys.max()) / 2 / F, (bw + bh) / 4))
            continue
        skel = skeletonize(teil)
        strichbreiten += list(2 * abstand[skel & teil] / F)
        for weg in wege_verfolgen(skel):
            p = np.array([(x / F, y / F) for y, x in weg], float)
            if len(p) >= 4 * F:
                wege.append(p)
    strich = round(float(np.median(strichbreiten)), 2)

    def ellipse_anpassen(p):
        """Achsenparallele Ellipse nach kleinsten Quadraten: A x² + B y² + C x + D y = 1."""
        mx, my = p[:, 0].mean(), p[:, 1].mean()   # Ursprung in die Naehe der Ellipse legen
        x, y = p[:, 0] - mx, p[:, 1] - my
        koef, *_ = np.linalg.lstsq(np.c_[x * x, y * y, x, y], np.ones(len(p)), rcond=None)
        A, B, C, D = koef
        if A <= 0 or B <= 0:
            return None
        cx, cy = -C / (2 * A), -D / (2 * B)
        z = 1 + A * cx * cx + B * cy * cy
        if z <= 0:
            return None
        return cx + mx, cy + my, math.sqrt(z / A), math.sqrt(z / B)

    def ellipsen_punkte(e, w0, w1, n):
        cx, cy, rx, ry = e
        return np.array([(cx + rx * math.cos(w), cy + ry * math.sin(w)) for w in np.linspace(w0, w1, n)])

    def weg_formen(p):
        """Gibt (Punkte, geschlossen) zurueck: Ellipse, gerade Linie, Ellipsenbogen oder geglaettete Kurve."""
        d = np.r_[0, np.cumsum(np.linalg.norm(np.diff(p, axis=0), axis=1))]
        n = max(8, int(d[-1] / DS))
        s = np.linspace(0, d[-1], n)
        q = np.c_[np.interp(s, d, p[:, 0]), np.interp(s, d, p[:, 1])]
        geschlossen = np.linalg.norm(q[0] - q[-1]) < 0.6
        if geschlossen:
            e = ellipse_anpassen(q)
            if e:
                rest = np.abs(np.hypot((q[:, 0] - e[0]) / e[2], (q[:, 1] - e[1]) / e[3]) - 1) * min(e[2], e[3])
                if rest.max() < 2.4:
                    return ellipsen_punkte(e, 0, 2 * math.pi, 120), True
        else:
            ab = q[-1] - q[0]
            abst = np.abs(ab[0] * (q[:, 1] - q[0, 1]) - ab[1] * (q[:, 0] - q[0, 0])) / np.linalg.norm(ab)
            if abst.max() < 0.7:
                a0, a1 = q[0].copy(), q[-1].copy()               # gerade Linie, fast senkrecht oder waagrecht wird exakt
                if abs(a1[0] - a0[0]) < 0.12 * abs(a1[1] - a0[1]):
                    a0[0] = a1[0] = (a0[0] + a1[0]) / 2
                elif abs(a1[1] - a0[1]) < 0.12 * abs(a1[0] - a0[0]):
                    a0[1] = a1[1] = (a0[1] + a1[1]) / 2
                return np.array([a0, a1]), False
            e = ellipse_anpassen(q)
            if e:
                rest = np.abs(np.hypot((q[:, 0] - e[0]) / e[2], (q[:, 1] - e[1]) / e[3]) - 1) * min(e[2], e[3])
                if rest.max() < 0.6 and e[2] < 40 and e[3] < 40:   # Bogen, zum Beispiel das c
                    w = np.unwrap(np.arctan2((q[:, 1] - e[1]) / e[3], (q[:, 0] - e[0]) / e[2]))
                    return ellipsen_punkte(e, w[0], w[-1], 120), False
        z = 3.2 / DS
        qs = np.c_[gaussian_filter1d(q[:, 0], z, mode="wrap" if geschlossen else "nearest"),
                   gaussian_filter1d(q[:, 1], z, mode="wrap" if geschlossen else "nearest")]
        if geschlossen:
            return np.vstack([qs, qs[:1]]), True
        w = np.linspace(0, 1, len(q))[:, None]
        return qs + (q[0] - qs[0]) * (1 - w)**3 + (q[-1] - qs[-1]) * w**3, False

    def weg_pfad(q, geschlossen):
        def tang(pts, k=5):
            t1 = pts[min(k, len(pts) - 1)] - pts[0]
            t2 = pts[max(len(pts) - 1 - k, 0)] - pts[-1]
            return t1 / np.linalg.norm(t1), t2 / np.linalg.norm(t2)
        if len(q) == 2:
            return f"M{q[0][0]:.2f},{q[0][1]:.2f}L{q[1][0]:.2f},{q[1][1]:.2f}"
        if geschlossen:
            n = len(q) - 1
            h = n // 2
            a = q[:h + 1]
            b = np.vstack([q[h:n], q[:1]])
            return _pfad(_kurven_anpassen(a, 0.05, *tang(a)) + _kurven_anpassen(b, 0.05, *tang(b))) + "Z"
        return _pfad(_kurven_anpassen(q, 0.05, *tang(q)))

    linien_d = [weg_pfad(*weg_formen(p)) for p in wege]
    MASTER.parent.mkdir(parents=True, exist_ok=True)
    kreise_svg = "".join(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{max(r, strich / 2 * 1.05):.2f}"/>' for cx, cy, r in kreise)
    MASTER.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BREITE} {HOEHE}" width="{BREITE}" height="{HOEHE}">\n'
        f'<!-- Master, abgeleitet aus {quelle.name} (scripts/logo_vektor.py --nachzeichnen), Beschreibung dort -->\n'
        f'<path id="symbol" fill-rule="evenodd" d="{"".join(symbol)}"/>\n'
        f'<g id="wortmarke" stroke-width="{strich}">\n'
        + "".join(f'<path d="{d}"/>\n' for d in linien_d) + kreise_svg + "\n</g>\n</svg>\n", encoding="utf-8")
    print(f"Master geschrieben: Symbol {len(symbol)} Formen, Schriftzug {len(linien_d)} Linien, Strichstaerke {strich} px")


def main() -> None:
    if "--nachzeichnen" in sys.argv:
        nachzeichnen(Path(sys.argv[sys.argv.index("--nachzeichnen") + 1]))
        return
    ziel = Path(sys.argv[sys.argv.index("--ziel") + 1]) if "--ziel" in sys.argv else None
    bauen(ziel)


if __name__ == "__main__":
    main()
