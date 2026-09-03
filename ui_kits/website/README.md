# UI-Kit: vaiacon.ch (Marketing-Website)

Klickbare Recreation der Referenz-Landingpage (`uploads/index.dc.html` = Ground Truth).

- `index.html` — Einstieg; lädt Bundle + Sektionen
- `sections-hero.jsx` — Hero (statisch: Poster-Standbild statt Intro-Video, breathe-Animation)
- `sections-main.jsx` — Orientierung · Leistungen · Büro-Bot · Ablauf · Versprechen
- `sections-lower.jsx` — Begleitung (Pakete) · Über uns + Kompass · FAQ · Kontakt
- `chat-widget.jsx` — fixes Chat-Widget unten rechts (Antworten sind Fake-Demo)

**Interaktiv:** Anker-Navigation mit Scrollspy, FAQ auf/zu, Hover-Zustände, Chat öffnen/schreiben.
**Bewusst weggelassen:** Intro-Video (nicht mitgeliefert), Claude-API-Anbindung, Scroll-Reveals, Team-Fotos (Platzhalter wie im Original), Responsive-Breakpoints unter 980px (Kit ist für Desktop-Preview gebaut).
