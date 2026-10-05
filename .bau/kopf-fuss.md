# Kopf und Fuss: verbindlicher Baustein

Stand 04.10.2026 (Umbau «drei Bereiche»). Jede Seite trägt Kopf und Fuss selbst, es gibt keinen Bauschritt.
Den Baustein unverändert kopieren; geändert wird nur die Aktiv-Marke (und `../` bei Seiten eine Ebene tiefer).

## 1. In den `<head>` (Reihenfolge)

Wurzel:
```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="ui_kits/website/mockup-entwurf.css?v=20261004-umbau">
<link rel="stylesheet" href="ui_kits/website/visibility.css?v=20261004-umbau">
<link rel="stylesheet" href="ui_kits/website/chat.css?v=20261004-vaia-fuss">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" type="image/png" href="favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```
Eine Ebene tiefer: jedem Pfad `../` voranstellen. ⛔ Keine Pfade mit führendem `/` (die Vorschau liegt unter `/vaiacon/`).

## 2. Skripte, am Ende des `<body>`, in dieser Reihenfolge

```html
<script src="ui_kits/website/api-basis.js?v=20261004-umbau"></script>   <!-- IMMER zuerst -->
<script src="ui_kits/website/visibility.js?v=20261004-umbau"></script>  <!-- Menü (Burger, Kopf-Wechsel) -->
<!-- seitenspezifisch hier: check-start.js, visibility-check.js, kontakt.js (defer) -->
<script src="ui_kits/website/chat.js?v=20261004-umbau"></script>        <!-- Vaia-Chat -->
```
Eine Ebene tiefer wieder `../ui_kits/website/…`. Dienste immer als `window.VAIACON_API_BASIS + '/api/…'` aufrufen, nie als `'/api/…'`.
Ändert jemand eine CSS/JS-Datei, setzt er die `?v=`-Kennung auf ALLEN Seiten hoch.

## 3. Kopf (Wurzel, hier mit FAQ als aktive Seite)

```html
  <header class="mock-header sv-header">
    <div class="mock-header__inner">
      <a class="mock-header__logo" href="./" aria-label="vaiacon Start">
        <img src="assets/logo-lockup-white.svg" alt="vaiacon">
      </a>
      <button class="mock-menu-toggle" type="button" aria-label="Menü öffnen" aria-controls="mock-mobile-menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="mock-header__nav" aria-label="Hauptnavigation">
        <div class="mock-nav-gruppe mock-nav-gruppe--angebot">
          <a href="learning">KI-Kompetenz</a>
          <a href="visibility">Sichtbarkeit</a>
          <a href="bot">Automationen</a>
        </div>
        <div class="mock-nav-gruppe mock-nav-gruppe--info">
          <a href="ki-kmu-news/">KI-KMU-News</a>
          <a href="faq" aria-current="page">FAQ</a>
          <a href="ueber-uns">Über uns</a>
          <a class="mock-header__contact" href="kontakt">Kontakt</a>
        </div>
      </nav>
    </div>
    <nav id="mock-mobile-menu" class="mock-mobile-nav" aria-label="Mobile Navigation">
      <div class="mock-mobile-nav__bereich" role="group" aria-labelledby="mock-mnav-angebot">
        <span class="mock-mobile-nav__bereich-titel" id="mock-mnav-angebot">Angebot</span>
        <a href="learning">KI-Kompetenz</a>
        <a href="visibility">Sichtbarkeit</a>
        <a href="bot">Automationen</a>
      </div>
      <div class="mock-mobile-nav__bereich" role="group" aria-labelledby="mock-mnav-mehr">
        <span class="mock-mobile-nav__bereich-titel" id="mock-mnav-mehr">Mehr zu vaiacon</span>
        <a href="ki-kmu-news/">KI-KMU-News</a>
        <a href="faq" aria-current="page">FAQ</a>
        <a href="ueber-uns">Über uns</a>
        <a class="mock-header__contact" href="kontakt">Kontakt</a>
      </div>
    </nav>
  </header>
```

## 4. Kopf (eine Ebene tiefer, z. B. `ki-kmu-news/index.html`)

```html
  <header class="mock-header sv-header">
    <div class="mock-header__inner">
      <a class="mock-header__logo" href="../" aria-label="vaiacon Start">
        <img src="../assets/logo-lockup-white.svg" alt="vaiacon">
      </a>
      <button class="mock-menu-toggle" type="button" aria-label="Menü öffnen" aria-controls="mock-mobile-menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="mock-header__nav" aria-label="Hauptnavigation">
        <div class="mock-nav-gruppe mock-nav-gruppe--angebot">
          <a href="../learning">KI-Kompetenz</a>
          <a href="../visibility">Sichtbarkeit</a>
          <a href="../bot">Automationen</a>
        </div>
        <div class="mock-nav-gruppe mock-nav-gruppe--info">
          <a href="../ki-kmu-news/" aria-current="page">KI-KMU-News</a>
          <a href="../faq">FAQ</a>
          <a href="../ueber-uns">Über uns</a>
          <a class="mock-header__contact" href="../kontakt">Kontakt</a>
        </div>
      </nav>
    </div>
    <nav id="mock-mobile-menu" class="mock-mobile-nav" aria-label="Mobile Navigation">
      <div class="mock-mobile-nav__bereich" role="group" aria-labelledby="mock-mnav-angebot">
        <span class="mock-mobile-nav__bereich-titel" id="mock-mnav-angebot">Angebot</span>
        <a href="../learning">KI-Kompetenz</a>
        <a href="../visibility">Sichtbarkeit</a>
        <a href="../bot">Automationen</a>
      </div>
      <div class="mock-mobile-nav__bereich" role="group" aria-labelledby="mock-mnav-mehr">
        <span class="mock-mobile-nav__bereich-titel" id="mock-mnav-mehr">Mehr zu vaiacon</span>
        <a href="../ki-kmu-news/" aria-current="page">KI-KMU-News</a>
        <a href="../faq">FAQ</a>
        <a href="../ueber-uns">Über uns</a>
        <a class="mock-header__contact" href="../kontakt">Kontakt</a>
      </div>
    </nav>
  </header>
```

## 5. Fuss (Wurzel)

```html
  <footer class="sv-footer">
    <div class="sv-footer__inner">
      <a class="sv-footer__logo" href="#top" aria-label="Zurück nach oben">
        <img src="assets/logo-lockup-white.svg" alt="vaiacon">
      </a>
      <nav class="sv-footer__links" aria-label="Weitere Seiten">
        <a href="service">Begleitung</a><a href="offerte">Offerte anfragen</a><a href="ki-kmu-news/">KI-KMU-News</a><a href="datenschutz">Datenschutz und Impressum</a><a href="agb">AGB</a>
      </nav>
      <p class="sv-footer__adresse"><span>vaiacon GmbH</span><span>Lehenstrasse 74, 8037 Zürich</span><span><a href="mailto:hallo@vaiacon.ch">hallo@vaiacon.ch</a></span></p>
      <a class="sv-footer__top" href="#top">↑ Nach oben</a>
      <div class="sv-footer__social">
        <a href="https://www.facebook.com/vaiacon" target="_blank" rel="noopener" aria-label="vaiacon auf Facebook" title="Facebook">
          <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M14.9 8.1h2.4V4.3c-.4-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 6v3.3H4.5v4.3h3.7V24h4.5v-6.3h3.7l.6-4.3h-4.3v-2.9c0-1.3.4-2.4 2.2-2.4Z"/></svg>
        </a>
        <a href="https://www.instagram.com/vaiacon" target="_blank" rel="noopener" aria-label="vaiacon auf Instagram" title="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/vaiacon" target="_blank" rel="noopener" aria-label="vaiacon auf LinkedIn" title="LinkedIn">
          <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M5.4 8.5H2.3V22h3.1V8.5ZM3.9 6.7c1 0 1.8-.7 1.8-1.7S4.9 3.3 3.9 3.3 2.1 4 2.1 5s.8 1.7 1.8 1.7ZM22 22h-3.1v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22h-3.1V8.5h3v1.8h.1c.4-.8 1.5-2.2 4.5-2.2 3.2 0 3.8 2.1 3.8 4.9V22Z"/></svg>
        </a>
      </div>
    </div>
  </footer>
```

## 6. Fuss (eine Ebene tiefer)

```html
  <footer class="sv-footer">
    <div class="sv-footer__inner">
      <a class="sv-footer__logo" href="#top" aria-label="Zurück nach oben">
        <img src="../assets/logo-lockup-white.svg" alt="vaiacon">
      </a>
      <nav class="sv-footer__links" aria-label="Weitere Seiten">
        <a href="../service">Begleitung</a><a href="../offerte">Offerte anfragen</a><a href="../ki-kmu-news/">KI-KMU-News</a><a href="../datenschutz">Datenschutz und Impressum</a><a href="../agb">AGB</a>
      </nav>
      <p class="sv-footer__adresse"><span>vaiacon GmbH</span><span>Lehenstrasse 74, 8037 Zürich</span><span><a href="mailto:hallo@vaiacon.ch">hallo@vaiacon.ch</a></span></p>
      <a class="sv-footer__top" href="#top">↑ Nach oben</a>
      <div class="sv-footer__social">
        <a href="https://www.facebook.com/vaiacon" target="_blank" rel="noopener" aria-label="vaiacon auf Facebook" title="Facebook">
          <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M14.9 8.1h2.4V4.3c-.4-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 6v3.3H4.5v4.3h3.7V24h4.5v-6.3h3.7l.6-4.3h-4.3v-2.9c0-1.3.4-2.4 2.2-2.4Z"/></svg>
        </a>
        <a href="https://www.instagram.com/vaiacon" target="_blank" rel="noopener" aria-label="vaiacon auf Instagram" title="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="https://www.linkedin.com/company/vaiacon" target="_blank" rel="noopener" aria-label="vaiacon auf LinkedIn" title="LinkedIn">
          <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M5.4 8.5H2.3V22h3.1V8.5ZM3.9 6.7c1 0 1.8-.7 1.8-1.7S4.9 3.3 3.9 3.3 2.1 4 2.1 5s.8 1.7 1.8 1.7ZM22 22h-3.1v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22h-3.1V8.5h3v1.8h.1c.4-.8 1.5-2.2 4.5-2.2 3.2 0 3.8 2.1 3.8 4.9V22Z"/></svg>
        </a>
      </div>
    </div>
  </footer>
```

## Aktive Seite markieren

Am Link der eigenen Seite, in Desktop-Leiste UND Mobile-Menü, `aria-current="page"` setzen (Stil kommt von selbst: Strich unter dem Reiter, im Handy-Menü terracotta unterstrichen, Kontakt als gefüllter Knopf).
Seiten ohne eigenen Reiter (Startseite, Begleitung `service`, Offerte, AGB, Datenschutz) setzen nirgends eine Marke.
Unterseiten eines Reiters (z. B. Artikel unter `ki-kmu-news/`): beim Reiter `aria-current="true"` statt `"page"`; nur die Übersicht selbst trägt `"page"`. Der Stil greift bei beiden.
Der Logo-Link zeigt auf `./` bzw. `../`; auf der Startseite auf `#top`.

## Wichtigste Stilklassen (aus `visibility.css` / `mockup-entwurf.css`)

- Abschnitt: `sv-section` (hell), `sv-section sv-section--alt` (Sand) mit Innenbox `sv-wrap`; Kopf eines Abschnitts `sv-center` mit `sv-kicker` (GROSSBUCHSTABEN, ohne Nummer), `sv-title`, `sv-lead`.
- Hero: `sv-hero` > `sv-hero__inner` > `sv-hero__copy` (+ `sv-kicker sv-kicker--on-terra`, `h1`, `sv-hero__lead`) und `sv-hero__visual`; Aktionen in `sv-actions`.
- Karten: `sv-card-grid` (`--four` für vier Spalten), `sv-card`, `sv-detail-card` (`--light` auf hellem Grund).
- Knöpfe: `sv-button` mit `sv-button--light` (auf Terracotta) oder `sv-button--glass`; Text beginnt gross, Pfeil `→`.
- FAQ: `sv-faq-gruppe` > `sv-faq-list` > `details.sv-faq-item`; Schlussabschnitt mit Aufruf: `sv-final`.
- Lies vor dem Bauen `guidelines/` (Ton: Sie-Form, «», ss statt ß, kein Emoji, Kicker ohne Nummern) und `vaia-wissen/LIESMICH.md` (Ordner in der Wurzel nur mit eigener `index.html`, sonst verdeckt er die gleichnamige `.html`: `ki-kmu-news/index.html` ist Pflicht).
