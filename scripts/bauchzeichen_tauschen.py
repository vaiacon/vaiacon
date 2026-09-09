"""Tauscht das alte Zeichen auf dem Bauch des Bueroboters gegen das
vaiacon-Zeichen. Gebraucht am 08.09.2026 fuer die Lernplan-Bilder der Academy.

    python3 scripts/bauchzeichen_tauschen.py            # alle bekannten Bilder
    python3 scripts/bauchzeichen_tauschen.py --probe    # nur rechnen, nichts ueberschreiben

Braucht Pillow, numpy und scipy:  python3 -m pip install --user Pillow numpy scipy

Die Kaesten stehen unten in BILDER und sind je Bild einmal von Hand nachgemessen.
Fuer ein neues Bild: Kasten des alten Zeichens eintragen und laufen lassen.

Sonderfaelle:
  lernplan-02.png - die verschraenkten Arme verdecken zwei Drittel des Zeichens.
                    Entscheid Andre am 08.09.2026: Bauch bleibt leer, also nur
                    entfernen und nichts einsetzen.
  lernplan-12.png - keine Bauchmarke, sondern die alte Wortmarke gross an
                    der Wand. Nicht mit diesem Werkzeug loesbar, dafuer braucht es
                    ein neu gerendertes Bild. Bleibt vorerst unveraendert.
"""
from __future__ import annotations

import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
from scipy.sparse import lil_matrix
from scipy.sparse.linalg import spsolve


def kanaele(a: np.ndarray):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    hoch = a.max(axis=2)
    tief = a.min(axis=2)
    satt = np.where(hoch > 0, (hoch - tief) / np.maximum(hoch, 1), 0.0)
    return r, g, b, hoch, satt


def otsu(werte: np.ndarray) -> float:
    """Schwelle, die zwei Haufen am besten trennt - hier Bauch gegen Aufdruck."""
    haeufigkeit, kanten = np.histogram(werte, bins=96)
    mitten = (kanten[:-1] + kanten[1:]) / 2.0
    gesamt = haeufigkeit.sum()
    if gesamt == 0:
        return float(werte.mean())
    anteil = haeufigkeit / gesamt
    w0 = np.cumsum(anteil)
    m0 = np.cumsum(anteil * mitten)
    mg = m0[-1]
    with np.errstate(divide="ignore", invalid="ignore"):
        streuung = (mg * w0 - m0) ** 2 / (w0 * (1 - w0))
    streuung[~np.isfinite(streuung)] = -1
    return float(mitten[int(np.argmax(streuung))])


def altes_zeichen(a: np.ndarray, kasten, rand: int = 26,
                  nachlese_an: bool = True, zone_rand: int = 14,
                  nachlese_staerke: float = 0.35, roete_deckel: float | None = None):
    """Maske des alten Zeichens, grosszuegig um den Kasten herum gesucht.

    Feste Farbschwellen taugen nicht: auf warm beleuchteten Bildern ist der Bauch
    selbst schon orange. Die Schwelle wird darum je Bild aus dem Fenster bestimmt.
    """
    x0, y0, x1, y1 = kasten
    h, w = a.shape[:2]
    fx0, fy0 = max(x0 - rand, 0), max(y0 - rand, 0)
    fx1, fy1 = min(x1 + rand, w), min(y1 + rand, h)

    r, g, b, hoch, satt = kanaele(a)
    roete = (r - b).astype(float)

    fenster = np.zeros(a.shape[:2], bool)
    fenster[fy0:fy1, fx0:fx1] = True

    # Dunkles (Arme, Schatten) zuerst aussortieren, sonst trennt die Schwelle
    # hell gegen dunkel statt Bauch gegen Aufdruck.
    mittlere_helle = float(np.median(hoch[fenster]))
    hell_genug = hoch > max(40.0, 0.35 * mittlere_helle)
    grundlage = fenster & hell_genug
    if grundlage.sum() < 200:
        grundlage = fenster

    # Die Saettigung trennt am zuverlaessigsten: der Aufdruck liegt bei 0.9-1.0,
    # der Bauch je nach Licht bei 0.15 (Creme) bis 0.65 (warm angestrahlt).
    s_schwelle = float(np.clip(otsu(satt[grundlage]), 0.55, 0.85))
    r_schwelle = max(otsu(roete[grundlage]), 60.0)
    # Im Schatten wird der Aufdruck dunkel, sein Rot-Blau-Abstand also klein - er
    # faellt dann unter die Schwelle und bleibt als dunkler Fleck stehen. Ein Deckel
    # laesst ihn wieder durch; die Saettigung haelt den Bauch weiterhin draussen.
    if roete_deckel is not None:
        r_schwelle = min(r_schwelle, roete_deckel)

    orange = (satt > s_schwelle) & (roete > r_schwelle) & (r - g > 25)
    maske = orange & fenster

    # nur den Klecks behalten, der den Kasten trifft
    beschriftet, anzahl = ndimage.label(maske)
    if anzahl:
        kern = np.zeros_like(maske)
        kern[y0:y1, x0:x1] = True
        gewollt = set(np.unique(beschriftet[kern & maske])) - {0}
        maske = np.isin(beschriftet, list(gewollt)) if gewollt else maske

    maske = ndimage.binary_closing(maske, np.ones((5, 5)))

    # Nachlese: wo ein Glanzpunkt ueber den Aufdruck laeuft, ist er ausgewaschen und
    # rutscht unter die Schwelle - als blasser Zipfel bleibt er sonst stehen. Darum
    # direkt neben der gefundenen Flaeche noch einmal mit milderer Schwelle suchen.
    if nachlese_an and maske.sum() > 50:
        ring = ndimage.binary_dilation(maske, iterations=16) & ~ndimage.binary_dilation(maske, iterations=5)
        if ring.sum() > 50:
            bauch_satt = float(np.median(satt[ring]))
            bauch_roete = float(np.median(roete[ring]))
            milde_satt = bauch_satt + nachlese_staerke * (s_schwelle - bauch_satt)
            milde_roete = bauch_roete + nachlese_staerke * (r_schwelle - bauch_roete)
            zone = ndimage.binary_dilation(maske, iterations=20)
            nachlese = (satt > milde_satt) & (roete > milde_roete) & zone & fenster
            maske = maske | nachlese
            maske = ndimage.binary_closing(maske, np.ones((5, 5)))

    # weiche Kanten des Aufdrucks mitnehmen
    maske = ndimage.binary_dilation(maske, iterations=3)

    # Letzte Begrenzung: die Maske darf den angegebenen Kasten nur um wenige Pixel
    # ueberschreiten. Ohne das laeuft sie in danebenliegende orange Gegenstaende
    # (Buch, Klemmbrett), die mit dem Aufdruck zusammenhaengen.
    grenze = np.zeros(a.shape[:2], bool)
    grenze[max(y0 - zone_rand, 0):min(y1 + zone_rand, h),
           max(x0 - zone_rand, 0):min(x1 + zone_rand, w)] = True
    maske = maske & grenze
    return maske, (fx0, fy0, fx1, fy1)


def harmonisch_fuellen(kanal: np.ndarray, luecke: np.ndarray,
                       gesperrt: np.ndarray | None = None) -> np.ndarray:
    """Fuellt die Luecke so, dass die Flaeche glatt weiterlaeuft (Laplace-Gleichung).

    `gesperrt` benennt Randpixel, deren Farbe nicht einfliessen darf - etwa die
    schwarzen Arme. Sonst zieht die Fuellung deren Dunkelheit in den Bauch und
    hinterlaesst einen Schleier. Gesperrte Nachbarn werden gespiegelt statt gelesen.
    """
    ys, xs = np.where(luecke)
    if len(ys) == 0:
        return kanal
    nummer = -np.ones(luecke.shape, int)
    nummer[luecke] = np.arange(len(ys))
    n = len(ys)

    A = lil_matrix((n, n))
    b = np.zeros(n)
    hoehe, breite = kanal.shape
    for i, (y, x) in enumerate(zip(ys, xs)):
        A[i, i] = 4.0
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = y + dy, x + dx
            if not (0 <= ny < hoehe and 0 <= nx < breite):
                A[i, i] -= 1.0          # Bildrand: spiegeln
                continue
            if luecke[ny, nx]:
                A[i, nummer[ny, nx]] = -1.0
            elif gesperrt is not None and gesperrt[ny, nx]:
                A[i, i] -= 1.0          # gesperrter Nachbar: ebenfalls spiegeln
            else:
                b[i] += float(kanal[ny, nx])

    loesung = spsolve(A.tocsr(), b)
    ergebnis = kanal.astype(float).copy()
    ergebnis[luecke] = loesung
    return ergebnis


def zeichen_laden(pfad: Path) -> Image.Image:
    zeichen = Image.open(pfad).convert("RGBA")
    # auf sichtbaren Inhalt beschneiden
    return zeichen.crop(zeichen.getchannel("A").getbbox())


# Aus den bereits umgestellten Bildern gemessen (vaiacon-buerobot-learning /
# -visibility): so sieht das Zeichen auf dem Bauch tatsaechlich aus. Die reine
# Dateifarbe von logo-mark-terra.png ist dafuer zu rot.
BAUCH_ORANGE = (221.0, 86.0, 25.0)


def ersetze(bildpfad: Path, kasten, zeichenpfad: Path, zielpfad: Path,
            breite_faktor: float = 1.30, hoch_versatz: float = 0.0,
            staerke: float = 1.8, nachlese_an: bool = True,
            zone_rand: int = 14, nachlese_staerke: float = 0.35,
            nur_entfernen: bool = False, roete_deckel: float | None = None,
            fuell_sperre: float | None = None) -> dict:
    bild = Image.open(bildpfad).convert("RGB")
    a = np.asarray(bild).astype(np.float64)

    maske, fenster = altes_zeichen(a.astype(np.int16), kasten,
                                   nachlese_an=nachlese_an, zone_rand=zone_rand,
                                   nachlese_staerke=nachlese_staerke,
                                   roete_deckel=roete_deckel)
    fx0, fy0, fx1, fy1 = fenster
    if maske.sum() == 0:
        raise RuntimeError(f"{bildpfad.name}: altes Zeichen nicht gefunden")

    # Reissleine: ein Aufdruck fuellt seinen Kasten nie ganz aus. Wer mehr als drei
    # Viertel erwischt, hat den Bauch mitgenommen - dann lieber abbrechen als
    # das halbe Bild uebermalen.
    kasten_flaeche = (kasten[2] - kasten[0]) * (kasten[3] - kasten[1])
    if maske.sum() > 0.75 * kasten_flaeche * 1.6:
        raise RuntimeError(
            f"{bildpfad.name}: Maske unplausibel gross "
            f"({int(maske.sum())}px bei Kasten {kasten_flaeche}px) - Schwelle greift nicht")

    # --- 1. Stelle glatt zuwachsen lassen (nur im Fenster rechnen) ---
    schnitt = (slice(max(fy0 - 12, 0), min(fy1 + 12, a.shape[0])),
               slice(max(fx0 - 12, 0), min(fx1 + 12, a.shape[1])))
    luecke = maske[schnitt]

    # Randpixel sperren, die dunkler sind als der Bauch (Arme, Greifer). Der Anteil
    # bezieht sich auf die Helligkeit rund um das alte Zeichen.
    gesperrt = None
    if fuell_sperre is not None:
        rand_ring = ndimage.binary_dilation(maske, iterations=10) & ~maske
        bezugshelle = float(np.median(a.max(axis=2)[rand_ring])) if rand_ring.sum() > 50 else 200.0
        # Nur wirklich der Arm: dunkel UND nicht kraeftig orange. Der Aufdruck
        # bleibt auch im tiefsten Schatten hoch gesaettigt (0.99) und wird sonst
        # als dunkelroter Splitter stehen gelassen.
        _, _, _, a_hoch, a_satt = kanaele(a.astype(np.int16))
        gesperrt_voll = (a_hoch < fuell_sperre * bezugshelle) & (a_satt < 0.75)
        # Gesperrte Pixel gehoeren dem Arm, nicht dem Aufdruck: sie werden weder
        # gelesen noch uebermalt, sonst frisst die Fuellung Treppchen in die Silhouette.
        maske = maske & ~gesperrt_voll
        luecke = maske[schnitt]
        gesperrt = gesperrt_voll[schnitt]

    sauber = a.copy()
    for k in range(3):
        sauber[schnitt + (k,)] = harmonisch_fuellen(a[schnitt + (k,)], luecke, gesperrt)

    ring = ndimage.binary_dilation(maske, iterations=14) & ~ndimage.binary_dilation(maske, iterations=4)
    # Kuenstliche Koernung wurde geprueft und wieder verworfen: sie faellt als
    # Flecken auf, waehrend die glatte Fuellung auf dem glaenzenden Bauch nicht stoert.

    # Wo vom Zeichen zu wenig zu sehen waere, bleibt der Bauch leer: nur das alte
    # entfernen, nichts einsetzen. So bei lernplan-02, wo die verschraenkten Arme
    # zwei Drittel verdecken und vom V nur ein unkenntlicher Zipfel bliebe.
    if nur_entfernen:
        Image.fromarray(np.clip(sauber, 0, 255).astype(np.uint8)).save(zielpfad)
        return {"alt_flaeche": int(maske.sum()), "neu": None, "gezeichnet": 0}

    # --- 2. wo darf gezeichnet werden? ---
    # Nur auf dem Bauch, damit Arme, Haende und Buecher davor bleiben. Die Schwelle
    # richtet sich nach der Helligkeit rund um das alte Zeichen (manche Roboter stehen
    # im Schatten). Die alte Zeichenflaeche ist immer erlaubt - darunter ist Bauch.
    sr, sg, sb, shoch, ssatt = kanaele(sauber.astype(np.int16))
    if ring.sum() > 50:
        umgebung = float(np.median(shoch[ring]))
        umgebung_satt = float(np.median(ssatt[ring]))
    else:
        umgebung, umgebung_satt = 200.0, 0.25
    schwelle = max(umgebung * 0.62, 90.0)
    # Auch die Saettigungsgrenze richtet sich nach dem Bauch daneben: auf warm
    # angestrahlten Bildern ist er selbst schon satt (0.6), auf Creme nur 0.2.
    satt_grenze = float(np.clip(umgebung_satt + 0.22, 0.45, 0.90))
    bauch = (shoch > schwelle) & (ssatt < satt_grenze)
    bauch = ndimage.binary_opening(bauch, np.ones((3, 3)))
    bauch = bauch | maske

    # --- 3. vaiacon-Zeichen einpassen ---
    zeichen = zeichen_laden(zeichenpfad)
    x0, y0, x1, y1 = kasten
    mitte_x = (x0 + x1) / 2.0
    mitte_y = (y0 + y1) / 2.0 + hoch_versatz * (y1 - y0)
    neue_breite = max(int(round((x1 - x0) * breite_faktor)), 8)
    neue_hoehe = max(int(round(neue_breite * zeichen.height / zeichen.width)), 6)
    zeichen = zeichen.resize((neue_breite, neue_hoehe), Image.LANCZOS)

    zx0 = int(round(mitte_x - neue_breite / 2.0))
    zy0 = int(round(mitte_y - neue_hoehe / 2.0))

    stempel = np.zeros(a.shape[:2], np.float64)
    zdaten = np.asarray(zeichen).astype(np.float64)
    zalpha = zdaten[..., 3] / 255.0
    grundfarbe = np.array(BAUCH_ORANGE)

    ex0, ey0 = max(zx0, 0), max(zy0, 0)
    ex1, ey1 = min(zx0 + neue_breite, a.shape[1]), min(zy0 + neue_hoehe, a.shape[0])
    stempel[ey0:ey1, ex0:ex1] = zalpha[ey0 - zy0:ey1 - zy0, ex0 - zx0:ex1 - zx0]

    # weiche Kante wie ein gedruckter Aufkleber
    stempel = np.asarray(
        Image.fromarray((stempel * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))
    ).astype(np.float64) / 255.0
    stempel *= bauch.astype(np.float64)

    # --- 4. oertliche Helligkeit als Schattierung uebernehmen ---
    helligkeit = 0.299 * sauber[..., 0] + 0.587 * sauber[..., 1] + 0.114 * sauber[..., 2]
    bereich = stempel > 0.05
    if bereich.sum() < 20:
        raise RuntimeError(f"{bildpfad.name}: zu wenig Bauchflaeche zum Zeichnen")
    bezug = float(np.median(helligkeit[bereich]))
    verhaeltnis = np.clip(helligkeit / max(bezug, 1.0), 0.55, 1.55) ** staerke

    ergebnis = sauber.copy()
    for k in range(3):
        farbe = np.clip(grundfarbe[k] * verhaeltnis, 0, 255)
        ergebnis[..., k] = sauber[..., k] * (1 - stempel) + farbe * stempel

    Image.fromarray(np.clip(ergebnis, 0, 255).astype(np.uint8)).save(zielpfad)
    return {
        "alt_flaeche": int(maske.sum()),
        "neu": (zx0, zy0, neue_breite, neue_hoehe),
        "gezeichnet": int((stempel > 0.5).sum()),
    }



# Datei -> (Kasten des alten Zeichens, Sonderwuensche)
BILDER = {
    "lernplan-01.png": ((768, 557, 855, 663), {}),
    # 02: Arme verdecken zwei Drittel - Bauch bleibt leer (Entscheid Andre, 08.09.2026)
    "lernplan-02.png": ((887, 577, 980, 650),
                        {"nur_entfernen": True, "roete_deckel": 80.0, "zone_rand": 22,
                         "fuell_sperre": 0.45}),
    "lernplan-03.png": ((919, 561, 1019, 672), {}),
    "lernplan-04.png": ((855, 568, 949, 678), {}),
    "lernplan-05.png": ((722, 524, 817, 639), {}),
    # bei 06 liegt das orange Buch am Aufdruck an - Nachlese wuerde hinueberlaufen
    "lernplan-06.png": ((878, 378, 948, 458), {"nachlese_an": False, "zone_rand": 10}),
    "lernplan-07.png": ((701, 579, 770, 663), {}),
    "lernplan-09.png": ((333, 620, 405, 705), {}),
    # bei 10 laeuft der Glanzpunkt ueber die Spitze des S - schaerfere Nachlese
    "lernplan-10.png": ((435, 563, 515, 661), {"nachlese_staerke": 0.16}),
    "lernplan-11.png": ((815, 476, 888, 565), {}),
}


def main() -> None:
    probe = "--probe" in sys.argv
    wurzel = Path(__file__).resolve().parents[1]
    quelle = wurzel / "academy" / "assets"
    zeichen = wurzel / "assets" / "logo-mark-terra.png"
    ablage = Path("/tmp/bauchzeichen") if probe else quelle
    ablage.mkdir(parents=True, exist_ok=True)

    for datei, (kasten, sonder) in BILDER.items():
        try:
            info = ersetze(quelle / datei, kasten, zeichen, ablage / datei, **sonder)
            print(f"{datei}: ok  altes Zeichen {info['alt_flaeche']}px  "
                  f"neues {info['neu']}  gezeichnet {info['gezeichnet']}px")
        except Exception as fehler:
            print(f"{datei}: FEHLER {fehler}")
    if probe:
        print(f"\nProbelauf - Ergebnisse liegen in {ablage}, nichts ueberschrieben.")


if __name__ == "__main__":
    main()
