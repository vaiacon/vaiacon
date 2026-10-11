# UI-Kit: vaiacon.ch (Marketing-Website)

Klickbare Recreation der Referenz-Landingpage (`uploads/index.dc.html` = Ground Truth).

- `index.html` — Einstieg; lädt Bundle + Sektionen
- `sections-hero.jsx` — Hero (statisch: Poster-Standbild statt Intro-Video, breathe-Animation)
- `sections-main.jsx` — Orientierung · Leistungen · Büro-Bot · Ablauf · Versprechen
- `sections-lower.jsx` — Begleitung (Pakete) · Über uns + Kompass · FAQ · Kontakt
- `chat-widget.jsx` — fixes Chat-Widget unten rechts (Antworten sind Fake-Demo)

**Interaktiv:** Anker-Navigation mit Scrollspy, FAQ auf/zu, Hover-Zustände, Chat öffnen/schreiben.
**Bewusst weggelassen:** Intro-Video (nicht mitgeliefert), Claude-API-Anbindung, Scroll-Reveals, Team-Fotos (Platzhalter wie im Original), Responsive-Breakpoints unter 980px (Kit ist für Desktop-Preview gebaut).

**Öffentlich genutzte Dateien:** Neben der Werkstatt liegen hier auch Stil- und Programmdateien der echten Seiten (in `robots.txt` einzeln freigegeben). Die Erstanalyse besteht aus `erstanalyse-data.js` (Fragen, Rechnung, einzige Stelle für `WORKER_URL`), `erstanalyse-form.jsx` (Quelle) und `erstanalyse-form.compiled.js` (eingecheckte Babel-Ausgabe, gebaut mit `.bau/bau.mjs`). Die Seite selbst ist `/erstanalyse/index.html`; `erstanalyse.html` hier ist nur eine Weiterleitung.
**Werkstattseiten** (`index.html`, `mockup-entwurf.html`, `mockup-entwurf.jsx`, `ueber-uns.jsx` und die `*.compiled.js`) wurden am 11.10.2026 gelöscht; sie luden React über unpkg.com und nannten die alte Academy. Bei Bedarf in der Git-Geschichte vor Commit «Altlasten» nachsehen.
