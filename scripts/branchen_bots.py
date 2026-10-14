#!/usr/bin/env python3
"""Branchen-Kacheln auf /bot: Büro-Bot mit Beruf (11.10.2026, Entwurf).

Nimmt die gelieferten Büro-Bot-Renderings und stellt sie in eine kleine Szene:
Requisiten (Mütze, Stethoskop, Walze, Haus) liegen als flache SVG-Formen hinter
oder vor dem Bild. Der Bot selbst bleibt das fertige Rendering, wird nur
skaliert, nie gespiegelt oder nachgezeichnet.

Ablauf: SVG-Szene -> HTML in .bau/branchen-bots/ -> WebKit fotografiert ab
(scripts/webkit_probe.swift) -> auf 160x192 verkleinert -> assets/branchen/bot-<name>.webp
Der Grund ist --cream-50 (#FBF4EE), wie der Kachelgrund auf der Seite.

    python3 scripts/branchen_bots.py            # alle vier
    python3 scripts/branchen_bots.py restaurant # eine

Braucht den Vorschauserver auf Port 8765 (scripts/vorschau.py).
"""
import os
import subprocess
import sys

from PIL import Image

WURZEL = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_DIR = os.path.join(WURZEL, '.bau', 'branchen-bots')
PORT = int(os.environ.get('VORSCHAU_PORT', '8765'))
B, H = 480, 576          # Szene, dreifach der Kachel (160x192)
GRUND = '#FBF4EE'

# Basis-Rendering: Datei, Figurenumriss (aus dem Bild gelesen), Raster x0 auf dem 540er Mass
BASEN = {
    'startseite': 'vaiacon-buerobot-startseite.png',
    'willkommen': 'vaiacon-buerobot-ueber-uns-willkommen.png',
    'klemmbrett': 'vaiacon-buerobot-offerte-klemmbrett.png',
}

DEFS = '''
<defs>
  <linearGradient id="weiss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E4DDD3"/></linearGradient>
  <linearGradient id="silber" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FAFAFA"/><stop offset=".5" stop-color="#B9BCC0"/><stop offset="1" stop-color="#E8E9EB"/></linearGradient>
  <linearGradient id="farbe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EE7436"/><stop offset="1" stop-color="#CF5520"/></linearGradient>
  <linearGradient id="putz" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F3E8D8"/><stop offset="1" stop-color="#E6D8C3"/></linearGradient>
  <linearGradient id="dach" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9602B"/><stop offset="1" stop-color="#974320"/></linearGradient>
  <linearGradient id="glas" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#DDEBF0"/><stop offset="1" stop-color="#A9C3CE"/></linearGradient>
  <linearGradient id="holz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D7B58D"/><stop offset="1" stop-color="#B98F62"/></linearGradient>
  <filter id="schatten" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#3E1606" flood-opacity=".28"/></filter>
</defs>
'''


def szene(bild, figur_h, fig_links, fig_oben, x0, hinten, vorn, szenen_hinten='', szenen_vorn=''):
    """Bot-Bild plus Requisiten. hinten/vorn stehen im 540er Raster des Bots,
    szenen_* in Szenenkoordinaten (480x576)."""
    k = figur_h / 540.0
    t = f'translate({fig_links - x0 * k:.2f},{fig_oben - 46 * k:.2f}) scale({k:.4f})'
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{B}" height="{H}" viewBox="0 0 {B} {H}">
{DEFS}
<rect width="{B}" height="{H}" fill="{GRUND}"/>
{szenen_hinten}
<g transform="{t}">{hinten}</g>
<g transform="{t}"><image href="/assets/{bild}" x="{BBOX[bild][0] + x0:.2f}" y="{BBOX[bild][1]:.2f}" width="{BBOX[bild][2]:.2f}" height="{BBOX[bild][3]:.2f}"/></g>
<g transform="{t}">{vorn}</g>
{szenen_vorn}
</svg>'''


def _bboxen():
    # Bild so setzen, dass die Figur (Alpha-Umriss) im 540er Raster bei (x0, 46) beginnt.
    out = {}
    for f in BASEN.values():
        im = Image.open(os.path.join(WURZEL, 'assets', f)).convert('RGBA')
        bb = im.getchannel('A').point(lambda p: 255 if p > 16 else 0).getbbox()
        s = 540.0 / (bb[3] - bb[1])
        x0 = 0  # relativ zur Figur: Figur-links = 0 im Raster
        out[f] = (-(bb[0]) * s, 46 - bb[1] * s, im.width * s, im.height * s)
    return out


BBOX = _bboxen()

# ───────────────────────── Szenen ─────────────────────────

def maler():
    # Willkommen-Pose: der ausgestreckte Arm hält die Walze an die Wand.
    wand = '''
<rect x="236" y="110" width="244" height="470" rx="6" fill="url(#putz)"/>
<rect x="236" y="560" width="244" height="16" fill="#D9CBB5"/>
<path d="M330 150 H480 V300 Q452 312 424 304 Q392 296 366 306 Q344 312 330 300 Z" fill="url(#farbe)"/>
<path d="M330 150 H480 V162 H330 Z" fill="#fff" opacity=".18"/>
'''
    # Walze: Rahmen und Griff unter der Hand, Walze davor an der Wand
    rahmen = '''
<path d="M326 286 Q356 292 372 300" stroke="#7A7F85" stroke-width="7" fill="none" stroke-linecap="round"/>
<path d="M322 288 L318 308" stroke="#3E3A36" stroke-width="12" stroke-linecap="round"/>
<rect x="354" y="288" width="104" height="38" rx="19" fill="url(#farbe)" filter="url(#schatten)"/>
<rect x="364" y="294" width="84" height="8" rx="4" fill="#fff" opacity=".35"/>
'''
    eimer = '''
<ellipse cx="420" cy="566" rx="46" ry="8" fill="#3E1606" opacity=".18"/>
<path d="M382 506 H458 L450 562 H390 Z" fill="url(#silber)"/>
<ellipse cx="420" cy="506" rx="38" ry="9" fill="#B9BCC0"/>
<ellipse cx="420" cy="506" rx="31" ry="6.5" fill="url(#farbe)"/>
<path d="M384 508 Q420 456 456 508" stroke="#5A5F66" stroke-width="4" fill="none"/>
'''
    muetze = '''
<g filter="url(#schatten)">
<path d="M148 108 L170 16 Q214 6 258 16 L284 110 Z" fill="url(#weiss)" stroke="#CFC5B8" stroke-width="3" stroke-linejoin="round"/>
</g>
<path d="M186 100 L192 30 M228 100 V16 M266 100 L252 28" stroke="#DDD4C8" stroke-width="3" fill="none" stroke-linecap="round"/>
<circle cx="200" cy="52" r="6" fill="#D26336"/><circle cx="244" cy="44" r="4.5" fill="#D26336"/><circle cx="224" cy="72" r="3.5" fill="#D26336"/>
'''
    return szene(BASEN['willkommen'], 470, 6, 104, 38, muetze, '', wand, rahmen + eimer)


def restaurant():
    # Willkommen-Pose: der Bot als Bedienung, Fliege und ein Tablett mit Servierglocke auf der Hand.
    fliege = '''
<g filter="url(#schatten)">
<path d="M192 286 L158 268 Q150 284 158 302 Z" fill="#AD5029"/>
<path d="M192 286 L226 268 Q234 284 226 302 Z" fill="#AD5029"/>
<rect x="182" y="274" width="20" height="24" rx="6" fill="#8E3F16"/>
</g>
<path d="M166 276 Q176 282 186 284 M218 276 Q208 282 198 284" stroke="#fff" stroke-width="2.5" opacity=".35" fill="none" stroke-linecap="round"/>
'''
    tablett = '''
<ellipse cx="352" cy="300" rx="62" ry="8" fill="#3E1606" opacity=".14"/>
<g filter="url(#schatten)">
<ellipse cx="346" cy="270" rx="68" ry="12" fill="url(#silber)" stroke="#8E9298" stroke-width="2.5"/>
<path d="M278 270 Q346 292 414 270 Q414 276 346 286 Q278 276 278 270 Z" fill="#9A9EA4"/>
<path d="M298 264 Q298 198 346 198 Q394 198 394 264 Q346 276 298 264 Z" fill="url(#silber)" stroke="#8E9298" stroke-width="2.5"/>
<circle cx="346" cy="192" r="9" fill="url(#silber)" stroke="#8E9298" stroke-width="2.5"/>
</g>
<path d="M312 252 Q312 218 336 208" stroke="#fff" stroke-width="7" opacity=".7" fill="none" stroke-linecap="round"/>
'''
    return szene(BASEN['willkommen'], 470, 6, 104, 38, '', fliege, tablett, '')


def arzt():
    # Klemmbrett-Pose: Stirnspiegel, Stethoskop, rotes Kreuz auf dem Blatt und am Schild.
    spiegel = '''
<path d="M190 168 Q281 96 372 168" stroke="#4A4A4A" stroke-width="7" fill="none" stroke-linecap="round"/>
<circle cx="281" cy="126" r="27" fill="#2E2E2E"/>
<circle cx="281" cy="126" r="22" fill="url(#silber)"/>
<circle cx="281" cy="126" r="7" fill="#2E2E2E"/>
<path d="M266 112 Q274 106 286 108" stroke="#fff" stroke-width="4" opacity=".9" fill="none" stroke-linecap="round"/>
'''
    stetho = '''
<path d="M226 296 Q198 350 232 396 Q262 428 292 396 Q324 350 298 296" stroke="#262626" stroke-width="9" fill="none" stroke-linecap="round"/>
<path d="M229 306 Q206 350 236 390" stroke="#6A6A6A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<path d="M262 420 V440" stroke="#262626" stroke-width="7" stroke-linecap="round"/>
<circle cx="262" cy="452" r="17" fill="#2E2E2E"/>
<circle cx="262" cy="452" r="12.5" fill="url(#silber)"/>
<path d="M122 368 h16 v14 h14 v16 h-14 v14 h-16 v-14 h-14 v-16 h14 z" fill="#D8392B" transform="rotate(-8 130 390)"/>
'''
    schild = '''
<g filter="url(#schatten)">
<rect x="388" y="150" width="86" height="86" rx="16" fill="#fff"/>
<path d="M419 168 h24 v17 h17 v24 h-17 v17 h-24 v-17 h-17 v-24 h17 z" fill="#D8392B"/>
</g>
'''
    return szene(BASEN['klemmbrett'], 470, 6, 104, 36, '', spiegel + stetho, '', schild)


def immobilien():
    # Willkommen-Pose: der Bot steht neben der Haustür, an der ausgestreckten Hand hängt der Schlüssel.
    # Das Haus ist höher und breiter als der Bot.
    haus = '''
<ellipse cx="300" cy="568" rx="190" ry="10" fill="#3E1606" opacity=".16"/>
<rect x="394" y="84" width="34" height="86" rx="3" fill="#B86A3A"/>
<rect x="388" y="76" width="46" height="14" rx="3" fill="#8E4D26"/>
<g filter="url(#schatten)">
<rect x="150" y="214" width="326" height="354" rx="6" fill="url(#putz)"/>
<path d="M118 228 L303 62 L492 228 Z" fill="url(#dach)"/>
<path d="M118 228 L303 62 L492 228" stroke="#7E3510" stroke-width="4" fill="none" stroke-linejoin="round"/>
</g>
<path d="M150 560 H476" stroke="#CDBB9E" stroke-width="12"/>
<rect x="372" y="244" width="72" height="84" rx="4" fill="#fff"/>
<rect x="379" y="251" width="58" height="70" rx="2" fill="url(#glas)"/>
<path d="M408 251 V321 M379 286 H437" stroke="#fff" stroke-width="5"/>
<rect x="354" y="368" width="102" height="196" rx="4" fill="#fff"/>
<path d="M362 564 V404 Q362 376 405 376 Q448 376 448 404 V564 Z" fill="#8E3F16"/>
<path d="M376 560 V412 Q376 392 405 392" stroke="#fff" stroke-width="3" opacity=".25" fill="none"/>
<circle cx="378" cy="476" r="6.5" fill="#E8C766"/>
<rect x="340" y="560" width="130" height="14" rx="4" fill="#CFC5B8"/>
'''
    schluessel = '''
<g transform="translate(344,268)" filter="url(#schatten)">
<circle cx="0" cy="-14" r="10" fill="none" stroke="#C9CDD2" stroke-width="4"/>
<circle cx="0" cy="8" r="16" fill="none" stroke="#E2B83A" stroke-width="7"/>
<path d="M0 24 V92" stroke="#E2B83A" stroke-width="9" stroke-linecap="round"/>
<path d="M0 66 h17 M0 82 h13" stroke="#E2B83A" stroke-width="8" stroke-linecap="round"/>
<path d="M-4 30 V84" stroke="#FFF1B8" stroke-width="2.5" opacity=".8" stroke-linecap="round"/>
</g>
'''
    return szene(BASEN['willkommen'], 470, 6, 104, 38, '', '', haus, schluessel)


def kosmetik():
    # Willkommen-Pose: in der ausgestreckten Hand ein Nagellackfläschchen, dahinter Handspiegel und Pflegetiegel.
    spiegel = '''
<g filter="url(#schatten)">
<rect x="402" y="300" width="14" height="150" rx="7" fill="url(#holz)" transform="rotate(14 409 300)"/>
<ellipse cx="392" cy="236" rx="62" ry="76" fill="url(#silber)" transform="rotate(14 392 236)"/>
<ellipse cx="392" cy="236" rx="50" ry="64" fill="url(#glas)" transform="rotate(14 392 236)"/>
</g>
<path d="M358 196 Q372 168 394 164" stroke="#fff" stroke-width="7" opacity=".75" fill="none" stroke-linecap="round"/>
<ellipse cx="400" cy="566" rx="56" ry="8" fill="#3E1606" opacity=".16"/>
<g filter="url(#schatten)">
<rect x="360" y="516" width="84" height="46" rx="10" fill="#fff"/>
<rect x="354" y="500" width="96" height="24" rx="9" fill="url(#farbe)"/>
<path d="M372 538 h60" stroke="#D26336" stroke-width="5" stroke-linecap="round" opacity=".6"/>
</g>
<path d="M444 120 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 z" fill="#E2B83A"/>
<path d="M256 96 l3.5 8 l8 3.5 l-8 3.5 l-3.5 8 l-3.5 -8 l-8 -3.5 l8 -3.5 z" fill="#E2B83A"/>
'''
    lack = '''
<g transform="translate(344,262)" filter="url(#schatten)">
<rect x="-17" y="-8" width="34" height="50" rx="9" fill="url(#farbe)"/>
<rect x="-12" y="-2" width="7" height="38" rx="3.5" fill="#fff" opacity=".35"/>
<rect x="-10" y="-44" width="20" height="38" rx="6" fill="#2E2E2E"/>
<rect x="-10" y="-44" width="20" height="9" rx="4" fill="#4A4A4A"/>
</g>
'''
    return szene(BASEN['willkommen'], 470, 6, 104, 38, '', '', spiegel, lack)


SZENEN = {'malerbetrieb': maler, 'restaurant': restaurant, 'arztpraxis': arzt, 'immobilien': immobilien, 'kosmetik': kosmetik}


def main():
    wahl = sys.argv[1:] or list(SZENEN)
    os.makedirs(HTML_DIR, exist_ok=True)
    for name in wahl:
        key = {'restaurant': 'restaurant', 'maler': 'malerbetrieb', 'arzt': 'arztpraxis'}.get(name, name)
        svg = SZENEN[key]()
        pfad = os.path.join(HTML_DIR, key + '.html')
        with open(pfad, 'w') as f:
            f.write('<!doctype html><meta charset="utf-8"><style>html,body{margin:0;background:%s}'
                    'svg{display:block}</style>%s' % (GRUND, svg))
        png = os.path.join(HTML_DIR, key + '.png')
        subprocess.run(['swift', os.path.join(WURZEL, 'scripts', 'webkit_probe.swift'),
                        f'http://127.0.0.1:{PORT}/.bau/branchen-bots/{key}.html?{os.getpid()}',
                        str(B), str(H), png], check=True, capture_output=True)
        im = Image.open(png).convert('RGB').resize((160, 192), Image.LANCZOS)
        out = os.path.join(WURZEL, 'assets', 'branchen', f'bot-{key}.webp')
        im.save(out, 'WEBP', quality=90, method=6)
        print(key, os.path.getsize(out), 'Bytes')


if __name__ == '__main__':
    main()
