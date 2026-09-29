"""Baut die Vorschaubilder fuers Teilen (og:image) und traegt sie in die Seiten ein.

    python3 scripts/vorschaubilder.py            # Bilder bauen und Seiten nachfuehren
    python3 scripts/vorschaubilder.py --seiten   # nur die Seiten nachfuehren, keine Bilder

Punkt 07f aus Philips Vorschlaegen vom 22.09.2026, Gestaltung von André am
29.09.2026 freigegeben: Wer einen Link teilt (WhatsApp, LinkedIn, iMessage …),
sieht eine Karte mit diesem Bild. Vorher zeigten alle Seiten das alte
Bot-Modell mit eigenem Grund, 1,4 bis 1,9 MB schwer; WhatsApp zeigt bei so
grossen Bildern oft gar keine Vorschau.

Jedes Bild: 1200×630, Terracotta wie im Kopf der Seite, weisses Logo, Kicker,
Titel, «vaiacon.ch» und der freigestellte Bot der Seite. Die Vorlage ist
HTML; WebKit fotografiert sie ab (scripts/webkit_probe.swift), damit Schrift
und Farben genau wie auf der Website sind. Gespeichert als JPG unter 300 KB in
assets/vorschau-<name>.jpg.

Danach stehen in jeder Seite og:image, og:image:width, og:image:height und
og:image:alt. AGB und Datenschutz nehmen das Bild der Startseite, die
Lernplan-Seite das der Academy.

Neuer Bot oder neuer Titel: unten in BILDER anpassen, Skript laufen lassen.
Laeuft nur auf dem Mac (WebKit), braucht Netz fuer die Schrift von Google.
"""
from __future__ import annotations

import functools
import html
import http.server
import re
import shutil
import subprocess
import sys
import tempfile
import threading
from pathlib import Path

from PIL import Image

WURZEL = Path(__file__).resolve().parents[1]
BASIS = "https://vaiacon.ch"

# name → (Kicker, Titel, Bot, Bildbeschreibung des Bots)
BILDER = {
    "startseite": ("KI verständlich einführen", "Digitale Sichtbarkeit und KI-Kompetenz für Schweizer KMU.",
                   "vaiacon-buerobot-startseite.png", "Der vaiacon-Roboter winkt"),
    "faq": ("FAQ", "Häufige Fragen zu KI im KMU.",
            "vaiacon-buerobot-faq-tablet.png", "Der vaiacon-Roboter mit Tablet"),
    "kontakt": ("Kontakt", "Erstgespräch, kostenlos und unverbindlich.",
                "vaiacon-buerobot-kontakt-telefon.png", "Der vaiacon-Roboter am Telefon"),
    "automatisierungen": ("Automatisierungen", "Büroarbeit automatisieren für KMU.",
                          "vaiacon-buerobot-automatisierung-zahnrad.png", "Der vaiacon-Roboter mit Zahnrad"),
    "sichtbarkeit": ("Sichtbarkeit", "SEO und GEO für Schweizer KMU.",
                     "vaiacon-buerobot-sichtbarkeit-lupe.png", "Der vaiacon-Roboter mit Lupe"),
    "schulung": ("Schulung im Betrieb", "KI-Schulung für Schweizer KMU.",
                 "vaiacon-buerobot-schulung-zeigestab.png", "Der vaiacon-Roboter mit Zeigestab"),
    "begleitung": ("Begleitung", "Betreuung für KI und Automationen.",
                   "vaiacon-buerobot-begleitung-kunde.png", "Der vaiacon-Roboter begleitet eine Kundin"),
    "ueber-uns": ("Über uns", "Die Menschen hinter vaiacon.",
                  "vaiacon-buerobot-ueber-uns-willkommen.png", "Der vaiacon-Roboter heisst Sie willkommen"),
    "academy": ("Kurse", "KI-Weiterbildung für Schweizer KMU.",
                "vaiacon-buerobot-academy-schreibtisch.png", "Der vaiacon-Roboter lernt am Schreibtisch"),
}

SEITEN = {
    "index.html": "startseite", "faq.html": "faq", "kontakt.html": "kontakt",
    "bot.html": "automatisierungen", "visibility.html": "sichtbarkeit",
    "learning.html": "schulung", "service.html": "begleitung", "ueber-uns.html": "ueber-uns",
    "academy/index.html": "academy", "academy/lernplan.html": "academy",
    "agb.html": "startseite", "datenschutz.html": "startseite",
}

VORLAGE = """<!DOCTYPE html>
<html lang="de-CH"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap">
<style>
  html, body {{ margin: 0; width: 1200px; height: 630px; overflow: hidden; }}
  body {{ position: relative; font-family: 'Quicksand', sans-serif;
    background: radial-gradient(62% 46% at 50% 104%, rgba(244, 158, 96, 0.5) 0%, rgba(244, 158, 96, 0) 70%),
      radial-gradient(60% 80% at 76% 56%, #FA8C4A 0%, #EB702B 26%, #B24009 62%, #862A03 100%), #862A03; }}
  .text {{ position: absolute; left: 72px; top: 64px; bottom: 60px; width: 560px; display: flex; flex-direction: column; }}
  .logo {{ width: 214px; height: auto; display: block; }}
  .kicker {{ margin: auto 0 22px; font-size: 20px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #FFD9C2; }}
  h1 {{ margin: 0; font-size: 62px; line-height: 1.06; letter-spacing: -0.03em; font-weight: 700; color: #FBF4EE; hyphens: manual; }}
  .adresse {{ margin-top: auto; font-size: 22px; font-weight: 600; color: rgba(255, 240, 230, 0.92); }}
  .bot {{ position: absolute; right: 60px; bottom: 44px; }}
  .bot::before {{ content: ""; position: absolute; inset: -14% -26% -4%; border-radius: 999px;
    background: radial-gradient(60% 50% at 50% 52%, rgba(244, 158, 96, 0.5), transparent 72%); }}
  .bot::after {{ content: ""; position: absolute; left: 12%; right: 12%; bottom: 1%; height: 5%; border-radius: 999px;
    background: rgba(62, 22, 6, 0.5); filter: blur(9px); }}
  .bot img {{ position: relative; z-index: 1; display: block; max-height: 500px; max-width: 500px;
    filter: drop-shadow(0 16px 22px rgba(62, 22, 6, 0.4)); }}
  .ganz {{ white-space: nowrap; }}
</style></head>
<body>
  <div class="text">
    <img class="logo" src="logo-lockup-white.png" alt="">
    <p class="kicker">{kicker}</p>
    <h1>{titel}</h1>
    <p class="adresse">vaiacon.ch</p>
  </div>
  <div class="bot"><img src="{bot}" alt=""></div>
</body></html>
"""


def ganz(text: str) -> str:
    """Woerter mit Bindestrich nie am Bindestrich umbrechen."""
    return re.sub(r"(\S+-\S+)", r'<span class="ganz">\1</span>', html.escape(text))


def bilder_bauen() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        ordner = Path(tmp)
        shutil.copy(WURZEL / "assets/logo-lockup-white.png", ordner)
        for name, (kicker, titel, bot, _) in BILDER.items():
            shutil.copy(WURZEL / "assets" / bot, ordner)
            (ordner / f"{name}.html").write_text(
                VORLAGE.format(kicker=html.escape(kicker), titel=ganz(titel), bot=bot), encoding="utf-8")

        class Leise(http.server.SimpleHTTPRequestHandler):
            def log_message(self, *args):  # kein Protokoll je Abruf
                pass

        bediener = functools.partial(Leise, directory=str(ordner))
        server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), bediener)
        threading.Thread(target=server.serve_forever, daemon=True).start()
        port = server.server_address[1]
        try:
            for name in BILDER:
                roh = ordner / f"{name}-roh.png"
                subprocess.run(["swift", str(WURZEL / "scripts/webkit_probe.swift"),
                                f"http://127.0.0.1:{port}/{name}.html", "1200", "630", str(roh)],
                               check=True, capture_output=True, timeout=120)
                ziel = WURZEL / "assets" / f"vorschau-{name}.jpg"
                Image.open(roh).convert("RGB").resize((1200, 630), Image.LANCZOS).save(
                    ziel, quality=86, optimize=True, progressive=True)
                print(f"{ziel.relative_to(WURZEL)}: {ziel.stat().st_size // 1024} KB")
        finally:
            server.shutdown()


def seiten_nachfuehren() -> None:
    for datei, name in SEITEN.items():
        pfad = WURZEL / datei
        t = pfad.read_text(encoding="utf-8")
        # Zusatzangaben eines frueheren Laufs entfernen, dann neu setzen.
        t = re.sub(r'\n[ \t]*<meta property="og:image:(width|height|alt)"[^>]*>', "", t)
        kicker, titel, _, beschreibung = BILDER[name]
        alt = html.escape(f"{beschreibung}, daneben: {titel}", quote=True)

        def ersetzen(m: re.Match) -> str:
            einzug = m.group(1)
            return (f'{einzug}<meta property="og:image" content="{BASIS}/assets/vorschau-{name}.jpg">\n'
                    f'{einzug}<meta property="og:image:width" content="1200">\n'
                    f'{einzug}<meta property="og:image:height" content="630">\n'
                    f'{einzug}<meta property="og:image:alt" content="{alt}">')

        neu, anzahl = re.subn(r'^([ \t]*)<meta property="og:image" content="[^"]*">', ersetzen, t, flags=re.M)
        if anzahl != 1:
            raise SystemExit(f"{datei}: og:image {anzahl}x gefunden, erwartet 1")
        pfad.write_text(neu, encoding="utf-8")
        print(f"{datei}: vorschau-{name}.jpg")


def main() -> None:
    if "--seiten" not in sys.argv:
        bilder_bauen()
    seiten_nachfuehren()


if __name__ == "__main__":
    main()
