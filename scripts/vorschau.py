"""Lokale Vorschau der Website — liefert Adressen ohne «.html» aus wie der Server.

    python3 scripts/vorschau.py            # http://127.0.0.1:8765/
    python3 scripts/vorschau.py 8766       # anderer Port

Seit dem 26.09.2026 verweisen die Seiten untereinander ohne Endung
(«kontakt» statt «kontakt.html»). Der Server auf vaiacon.ch (Caddy) findet
dazu die passende .html-Datei von selbst; «python3 -m http.server» kann das
nicht und liefert «nicht gefunden». Dieses Skript macht es wie der Server:

- /kontakt            → kontakt.html
- /academy/lernplan   → academy/lernplan.html (Parameter wie ?plan=01 bleiben)
- /erstanalyse        → Umleitung auf /erstanalyse/ (Ordner mit index.html)
- /kontakt.html       → geht weiterhin, wie auf dem Server

Muss im Wurzelverzeichnis der Website laufen (das Skript wechselt selbst
dorthin). Schickt «no-cache», damit jede Änderung sofort sichtbar ist.
Nur lokal (127.0.0.1), veröffentlicht nichts.
"""
from __future__ import annotations

import http.server
import os
import sys
from pathlib import Path
from urllib.parse import urlsplit

WURZEL = Path(__file__).resolve().parents[1]


class Vorschau(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WURZEL), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def translate_path(self, path):
        teile = urlsplit(path)
        ziel = super().translate_path(teile.path)
        # Ohne Endung und keine echte Datei / kein Ordner: die .html daneben nehmen.
        if not os.path.exists(ziel) and os.path.exists(ziel + ".html"):
            return ziel + ".html"
        return ziel

    def log_message(self, format, *args):  # leiser: nur Fehler zeigen
        if args and str(args[1]).startswith(("4", "5")):
            super().log_message(format, *args)


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    os.chdir(WURZEL)
    with http.server.ThreadingHTTPServer(("127.0.0.1", port), Vorschau) as server:
        print(f"Vorschau: http://127.0.0.1:{port}/  (Ende mit Ctrl+C)")
        server.serve_forever()


if __name__ == "__main__":
    main()
