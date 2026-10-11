# Briefing: Büro-Bot je Branche (Entwurf 11.10.2026)

Auf `/bot` (Abschnitt «Welche Beispiele gibt es in Ihrer Branche?») stehen acht Kacheln.
Bisher: gezeichnete Comic-Roboter (`assets/branchen/*.webp`, Philip, 09./11.10.2026).
Im Entwurf: gelieferte Büro-Bot-Renderings (`assets/branchen/bot-*.webp`, 160×192).
Vier Branchen haben noch kein passendes Rendering, der Entwurf nimmt Ersatz.

## Stand im Entwurf (11.10.2026, zweite Fassung)

Vier Kacheln sind mit `scripts/branchen_bots.py` gebaut: gelieferter Bot (Rendering, unverändert)
plus von Hand gezeichnete Requisiten als flache SVG-Formen. Das ist ein Behelf; die Requisiten
haben nicht den Glanz der Renderings.

| Branche | Szene im Entwurf | Wunschmotiv als Rendering |
|---|---|---|
| Malerbetrieb | Bot mit Papiermütze, Walze an der halb gestrichenen Wand, Farbeimer (ohne Fenster) | Bot als Maler mit Walze vor einem Haus |
| Arztpraxis | Bot mit Stirnspiegel, Stethoskop, Klemmbrett mit Kreuz | Bot im Arztkittel mit Stethoskop |
| Restaurant | Bot als Bedienung: Fliege, Tablett mit Servierglocke auf der Hand | Bot als Kellner mit Tablett |
| Immobilien | Bot neben der Haustür eines grossen Hauses, Schlüssel an der Hand | Bot mit Haus und Schlüssel |

Format der Renderings wie `vaiacon-buerobot-*.png`: weisser Körper, schwarzes Gesicht, orangefarbenes
V auf der Brust, freigestellt, 682×820 px, Figur unten bündig, nur ein Requisit, keine Schrift.

Passend und unverändert: Treuhand (Waage), Sanitär und Heizung (Schraubenschlüssel),
Agentur (Flipchart), Für alle Branchen (winkend).

## Ablauf, wenn die Bilder da sind

1. Rendering in `~/Documents/vaiacon/Bilder und Logos` ablegen.
2. Freistellen: `scripts/bot_freistellen.swift`, dann `scripts/bot_einpassen.py`.
3. Auf 160×192 auf Grund `#FBF4EE` verkleinern und als `assets/branchen/bot-<schluessel>.webp`
   ablegen (Schlüssel: malerbetrieb, arztpraxis, restaurant, immobilien).
4. `?v=` in `bot.html` und `ui_kits/website/branchen.js` hochsetzen.
