// KI-Standortbestimmung für Führungskräfte (seit 04.10.2026).
//
// Baut alles in #standort-app auf: Auftakt, Profil (3 Auswahlfragen), zwölf
// Fragen in vier Bereichen, Ergebnis aus den Punkten (sofort, ohne Server) und
// darunter die Einschätzung von Vaia aus POST /api/standort. Fällt der Dienst
// aus, steht an derselben Stelle ein Ersatztext, der nach Stufe und
// schwächstem Bereich zusammengesetzt wird — der Besucher sieht keinen Fehler.
//
// Texte aus der Antwort des Dienstes werden nur per textContent eingesetzt.
// Es wird nichts gespeichert (kein Cookie, kein localStorage).
//
// Zum Ausprobieren: ?probe=1 (eingebaute Beispielantwort statt Dienst),
// ?probe=fehler (der Ausfall wird durchgespielt).
(function () {
  'use strict';

  var app = document.getElementById('standort-app');
  if (!app) return;

  // ── Pfade ───────────────────────────────────────────────────────────────
  var skript = document.currentScript || document.querySelector('script[src*="standort.js"]');
  var assets = 'assets/';
  try {
    if (skript && skript.src) assets = new URL('../../assets/', skript.src).href;
  } catch (e) { /* relative Vorgabe bleibt */ }

  var probe = '';
  try { probe = new URLSearchParams(window.location.search).get('probe') || ''; } catch (e) { /* ohne */ }

  function apiBasis() {
    if (typeof window.VAIACON_API_BASIS === 'string') return window.VAIACON_API_BASIS;
    var h = window.location.hostname;
    return (h === 'vaiacon.ch' || h === 'www.vaiacon.ch') ? '' : 'https://vaiacon.ch';
  }

  // Seiten ohne «.html» in der Adresse: Ziele wie «learning» bleiben so stehen.
  // Zum lokalen Ausprobieren lassen sich Vorsatz und Endung am Element setzen.
  function href(ziel) {
    var basis = app.getAttribute('data-link-basis') || '';
    var endung = app.getAttribute('data-link-endung') || '';
    var teile = ziel.split('#');
    return basis + teile[0] + endung + (teile[1] ? '#' + teile[1] : '');
  }

  // ── Inhalte ─────────────────────────────────────────────────────────────
  var PROFIL = [
    { id: 'rolle', titel: 'Ihre Rolle', optionen: [
      'Inhaber:in oder Geschäftsführung', 'Bereichsleitung', 'Teamleitung', 'Andere Funktion'] },
    { id: 'branche', titel: 'Ihre Branche', optionen: [
      'Handwerk und Bau', 'Treuhand, Beratung und Recht', 'Handel und E-Commerce',
      'Gastgewerbe und Tourismus', 'Gesundheit und Pflege', 'Industrie und Produktion',
      'Immobilien und Verwaltung', 'Büro-, IT- und Marketingdienstleistungen',
      'Bildung und Soziales', 'Andere Branche'] },
    { id: 'groesse', titel: 'Grösse Ihres Betriebs', optionen: [
      '1–4 Mitarbeitende', '5–10 Mitarbeitende', '11–30 Mitarbeitende',
      '31–100 Mitarbeitende', 'Über 100 Mitarbeitende'] }
  ];

  var BEREICHE = [
    { id: 'verstaendnis', titel: 'Verständnis' },
    { id: 'moeglichkeiten', titel: 'Möglichkeiten' },
    { id: 'einsatz', titel: 'Einsatz im Betrieb' },
    { id: 'fuehrung', titel: 'Führung' }
  ];

  // typ: wissen (eine richtige Antwort, wird aufgelöst), einzel (Punkte je Antwort),
  // mehrfach (Wertung über bewerte()).
  var FRAGEN = [
    // ── Verständnis ──
    { bereich: 'verstaendnis', typ: 'wissen',
      text: 'Ein Chat-Assistent und eine Automation können beide KI nutzen. Worin unterscheiden sie sich im Betrieb vor allem?',
      optionen: [
        { text: 'Der Chat-Assistent ist die einfache Version, eine Automation ist dasselbe mit mehr Rechenleistung.' },
        { text: 'Eine Automation beantwortet Fragen genauer, weil sie mit dem Internet verbunden ist.' },
        { text: 'Die Automation läuft nach festen Regeln von selbst los, zum Beispiel wenn eine Mail eintrifft. Beim Chat-Assistenten muss jemand fragen.', richtig: true },
        { text: 'Es gibt keinen Unterschied, beides sind einfach Chatprogramme.' }
      ],
      erklaerung: 'Ein Chat-Assistent antwortet, wenn man ihn etwas fragt. Eine Automation startet durch einen Auslöser und führt eine Kette von Schritten aus, etwa Mail lesen, Daten ablegen, Antwort vorbereiten.' },

    { bereich: 'verstaendnis', typ: 'wissen',
      text: 'Immer öfter ist von «KI-Agenten» die Rede. Was ist damit gemeint?',
      optionen: [
        { text: 'Ein Programm, dem man ein Ziel gibt und das selbst die nötigen Schritte plant und Werkzeuge nutzt, etwa Postfach, Kalender oder Datenbank.', richtig: true },
        { text: 'Eine Fachperson, die im Betrieb für KI zuständig ist.' },
        { text: 'Ein besonders grosses Sprachmodell mit mehr Wissen.' },
        { text: 'Eine Software, die nur vorgegebene Antworten abspielt.' }
      ],
      erklaerung: 'Ein Agent arbeitet auf ein Ziel hin und entscheidet selbst über Zwischenschritte. Gerade deshalb braucht er klare Grenzen, was er darf und was nicht.' },

    { bereich: 'verstaendnis', typ: 'wissen',
      text: 'Eine Mitarbeiterin möchte Kundenlisten in einen frei zugänglichen KI-Chat kopieren, um sie auswerten zu lassen. Was gilt nach dem Schweizer Datenschutzgesetz (revDSG)?',
      optionen: [
        { text: 'Solange die Daten nicht veröffentlicht werden, ist alles erlaubt.' },
        { text: 'Kundendaten sind Personendaten. Sie dürfen nur für den erkennbaren Zweck bearbeitet werden, und bei einem KI-Anbieter müssen Vertrag, Standort und Datenverwendung vorher geklärt sein.', richtig: true },
        { text: 'Das revDSG gilt nur für grosse Konzerne, ein KMU ist davon ausgenommen.' },
        { text: 'Geschützt sind nur Kreditkarten- und Gesundheitsdaten.' }
      ],
      erklaerung: 'Das revDSG gilt für jeden Betrieb, der Personendaten bearbeitet. Bei einem frei zugänglichen Chat ist oft unklar, wo die Daten landen und ob damit weitertrainiert wird. Sicherer sind Angebote mit Vertrag und ohne Training mit Ihren Daten.' },

    // ── Möglichkeiten ──
    { bereich: 'moeglichkeiten', typ: 'mehrfach', leerErlaubt: true,
      text: 'Was davon lässt sich heute zuverlässig automatisieren?',
      hinweis: 'Wählen Sie alles, was Ihrer Meinung nach geht. Mehrfachauswahl möglich.',
      optionen: [
        { text: 'Belege erfassen und für die Buchhaltung vorkontieren', real: true },
        { text: 'Geschäftsentscheide ohne Kontrolle treffen' },
        { text: 'Offerten aus einer Anfrage und Ihren Vorlagen vorbereiten', real: true },
        { text: 'Den Posteingang vorsortieren und Antworten entwerfen', real: true },
        { text: 'Verträge ohne Prüfung rechtsverbindlich abschliessen' },
        { text: 'Telefonische Erstannahme: Anliegen aufnehmen und Rückruf einplanen', real: true },
        { text: 'Terminabsprachen per Mail und Kalender', real: true },
        { text: 'Bewerbungen allein von der KI auswählen und absagen lassen' },
        { text: 'Sitzungen mitschreiben und Aufgaben daraus ableiten', real: true }
      ],
      bewerte: function (sel, opt) {
        var treffer = 0, falsch = 0;
        sel.forEach(function (i) { if (opt[i].real) treffer++; else falsch++; });
        return Math.min(4, Math.round(4 * Math.max(0, treffer - 2 * falsch) / 5));
      } },

    { bereich: 'moeglichkeiten', typ: 'einzel',
      text: 'Jemand fragt ChatGPT, Gemini oder Perplexity nach einem Anbieter Ihrer Branche in Ihrer Region. Was entscheidet am meisten darüber, ob Ihr Betrieb genannt wird?',
      optionen: [
        { text: 'Vor allem Werbung: Wer bei Google Anzeigen schaltet, wird auch von KI genannt.', punkte: 1 },
        { text: 'Reiner Zufall, dazu lässt sich nichts beeinflussen.', punkte: 0 },
        { text: 'Klare, aktuelle Angaben zu Leistungen, Ort und Referenzen auf Ihrer Website und in Verzeichnissen, die eine KI lesen und als Quelle belegen kann.', punkte: 4 },
        { text: 'Das Thema ist mir neu.', punkte: 0 }
      ] },

    { bereich: 'moeglichkeiten', typ: 'einzel',
      text: 'Wenn Sie an Ihren Büroalltag denken: Für wie viele wiederkehrende Abläufe wüssten Sie, dass sie sich heute automatisieren liessen?',
      optionen: [
        { text: 'Für drei oder mehr, und ich könnte den Zeitaufwand grob beziffern.', punkte: 4 },
        { text: 'Für ein bis zwei.', punkte: 3 },
        { text: 'Ich ahne es, aber mir fehlt der Überblick.', punkte: 1 },
        { text: 'Ich glaube nicht, dass das bei uns geht.', punkte: 0 }
      ] },

    // ── Einsatz im Betrieb ──
    { bereich: 'einsatz', typ: 'mehrfach',
      text: 'Was davon ist bei Ihnen im Betrieb schon im Einsatz?',
      hinweis: 'Wählen Sie alles, was zutrifft. Mehrfachauswahl möglich.',
      optionen: [
        { text: 'Ein Chat-Assistent wie ChatGPT, Claude, Gemini oder Copilot' },
        { text: 'KI in Mail, Office oder Kalender, zum Beispiel Copilot oder Gemini' },
        { text: 'Automationen zwischen Programmen, zum Beispiel mit Zapier, Make oder n8n' },
        { text: 'Automatische Protokolle oder Abschriften von Sitzungen und Telefonaten' },
        { text: 'Belegerfassung oder Buchhaltung mit KI-Unterstützung' },
        { text: 'Ein Chatbot oder Assistent auf der Website oder am Telefon' },
        { text: 'KI für Texte und Bilder im Marketing' },
        { text: 'Nichts davon', keine: true }
      ],
      bewerte: function (sel, opt) {
        var n = sel.filter(function (i) { return !opt[i].keine; }).length;
        return Math.min(4, n);
      } },

    { bereich: 'einsatz', typ: 'einzel',
      text: 'Wie oft nutzt Ihr Team KI bei der Arbeit?',
      optionen: [
        { text: 'Gar nicht, soweit ich weiss.', punkte: 0 },
        { text: 'Vereinzelt, eher privat ausprobiert.', punkte: 1 },
        { text: 'Einzelne Personen nutzen sie regelmässig, andere nicht.', punkte: 2 },
        { text: 'Die Mehrheit nutzt sie mehrmals pro Woche.', punkte: 3 },
        { text: 'Täglich, sie gehört zu festen Abläufen.', punkte: 4 }
      ] },

    { bereich: 'einsatz', typ: 'einzel',
      text: 'Gibt es Spielregeln oder Schulung zum Umgang mit KI?',
      optionen: [
        { text: 'Nein, bisher nichts.', punkte: 0 },
        { text: 'Mündliche, ungeschriebene Regeln.', punkte: 1 },
        { text: 'Schriftliche Regeln, was in KI-Programme eingegeben werden darf und was nicht.', punkte: 2 },
        { text: 'Schriftliche Regeln und eine Einführung für das Team.', punkte: 3 },
        { text: 'Regeln, laufende Schulung und eine Ansprechperson für Fragen.', punkte: 4 }
      ] },

    // ── Führung ──
    { bereich: 'fuehrung', typ: 'einzel',
      text: 'Wer kümmert sich bei Ihnen um das Thema KI, und mit welchen Mitteln?',
      optionen: [
        { text: 'Niemand.', punkte: 0 },
        { text: 'Jemand nebenbei, ohne klaren Auftrag, Zeit oder Budget.', punkte: 1 },
        { text: 'Jemand mit Interesse, die Zeit dafür wird informell geduldet.', punkte: 2 },
        { text: 'Eine Person ist ausdrücklich zuständig (auch ich selbst) und hat ein festes Zeitfenster.', punkte: 3 },
        { text: 'Eine Person ist zuständig, hat ein festes Zeitfenster und ein eigenes Budget.', punkte: 4 }
      ] },

    { bereich: 'fuehrung', typ: 'einzel',
      text: 'Im Team gibt es Skepsis oder die Sorge, durch KI ersetzt zu werden. Wie gehen Sie damit um?',
      optionen: [
        { text: 'Das Thema kommt bei uns nicht auf den Tisch.', punkte: 0 },
        { text: 'Ich beruhige im Einzelfall, wenn jemand fragt.', punkte: 1 },
        { text: 'Wir haben darüber gesprochen und erklärt, wo KI entlasten soll.', punkte: 2 },
        { text: 'Das Team darf ausprobieren, und Rückmeldungen fliessen in unsere Entscheide ein.', punkte: 3 },
        { text: 'Das Team wählt Einsätze mit aus, wir tauschen uns regelmässig aus und zeigen konkrete Beispiele.', punkte: 4 }
      ] },

    { bereich: 'fuehrung', typ: 'einzel',
      text: 'Wie stellen Sie fest, ob sich ein KI-Einsatz lohnt?',
      optionen: [
        { text: 'Gar nicht, wir haben es noch nicht gemessen.', punkte: 0 },
        { text: 'Nach Bauchgefühl.', punkte: 1 },
        { text: 'Über Rückmeldungen aus dem Team.', punkte: 2 },
        { text: 'Wir vergleichen bei einzelnen Aufgaben die Zeit vorher und nachher.', punkte: 3 },
        { text: 'Mit Kennzahlen wie Stunden, Fehlern oder Durchlaufzeit, und wir entscheiden danach, ob wir weitermachen.', punkte: 4 }
      ] }
  ];

  var STUFEN = [
    { nr: 1, name: 'Beobachter', text: 'Sie schauen dem Thema bisher zu. Das ist eine gute Ausgangslage: Sie können gezielt einsteigen, statt Umwege zu gehen.' },
    { nr: 2, name: 'Einsteiger', text: 'Erste Berührungspunkte sind da, aber noch eher zufällig. Mit wenig Aufwand wird daraus ein verlässlicher Nutzen.' },
    { nr: 3, name: 'Anwender', text: 'KI ist bei Ihnen im Alltag angekommen. Jetzt entscheidet sich, ob aus einzelnen Hilfen durchdachte Abläufe werden.' },
    { nr: 4, name: 'Gestalter', text: 'Sie setzen KI gezielt ein und steuern sie. Der nächste Schritt ist, den Nutzen zu verbreitern und abzusichern.' },
    { nr: 5, name: 'Vorreiter', text: 'Sie sind weit gekommen. Jetzt geht es um Feinschliff, darum, den Nutzen zu vervielfachen und den Vorsprung zu halten.' }
  ];

  var ZIELE = {
    'ki-kompetenz': { ziel: 'learning', name: 'KI-Kompetenz', knopf: 'Mehr zu KI-Kompetenz →' },
    'automationen': { ziel: 'bot', name: 'Automationen', knopf: 'Mehr zu Automationen →' },
    'sichtbarkeit': { ziel: 'visibility', name: 'Sichtbarkeit', knopf: 'Mehr zur Sichtbarkeit →' }
  };

  // ── Zustand ─────────────────────────────────────────────────────────────
  var st = {
    ansicht: 'auftakt',
    i: 0,
    profil: { rolle: null, branche: null, groesse: null },
    antw: {},          // Fragenummer -> { sel: [Indizes], punkte, richtig }
    lauf: 0,           // zählt Anfragen, damit späte Antworten verworfen werden
    ergebnis: null,
    timer: null
  };

  // ── Helfer ──────────────────────────────────────────────────────────────
  function el(tag, attr, kinder) {
    var e = document.createElement(tag);
    if (attr) {
      Object.keys(attr).forEach(function (k) {
        var v = attr[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') e.className = v;
        else if (k === 'text') e.textContent = v;
        else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : v);
      });
    }
    (kinder || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }

  function kuerzen(s) {
    s = String(s == null ? '' : s);
    return s.length > 300 ? s.slice(0, 299) + '…' : s;
  }

  function roboter(alt) {
    var pic = el('picture', { class: 'st-roboter' });
    var quelle = el('source', { srcset: assets + 'vaiacon-buerobot-standort-kompass.webp', type: 'image/webp' });
    var img = el('img', { src: assets + 'vaiacon-buerobot-standort-kompass.png', alt: alt || '', width: '640', height: '769', decoding: 'async' });
    var stufe = 0;
    img.addEventListener('error', function () {
      stufe++;
      if (stufe === 1) {
        // WebP fehlt: nur noch das PNG versuchen
        if (quelle.parentNode) pic.removeChild(quelle);
        img.removeAttribute('src');
        img.src = assets + 'vaiacon-buerobot-standort-kompass.png';
      } else if (stufe === 2) {
        img.src = assets + 'vaiacon-buerobot-schulung-zeigestab.png';
      }
    });
    pic.appendChild(quelle);
    pic.appendChild(img);
    return pic;
  }

  function reduziert() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Zeigt einen neuen Bildschirm: ersetzt den Inhalt, setzt den Fokus auf die
  // Überschrift und holt den Baustein ins Bild, wenn er weggescrollt ist.
  function zeige(wurzel, fokusZiel, scrollen) {
    app.replaceChildren(wurzel);
    if (scrollen) {
      var r = app.getBoundingClientRect();
      if (r.top < 60 || r.top > window.innerHeight * 0.6) {
        app.scrollIntoView({ block: 'start', behavior: reduziert() ? 'auto' : 'smooth' });
      }
    }
    if (fokusZiel) {
      try { fokusZiel.focus({ preventScroll: true }); } catch (e) { /* ohne */ }
    }
  }

  function fragenInBereich(id) {
    return FRAGEN.map(function (f, i) { return { f: f, i: i }; }).filter(function (x) { return x.f.bereich === id; });
  }

  // ── Auftakt ─────────────────────────────────────────────────────────────
  function zeigeAuftakt(scrollen) {
    st.ansicht = 'auftakt';
    var titel = el('h3', { tabindex: '-1', text: 'In rund vier Minuten wissen Sie, wo Ihr Betrieb mit KI steht.' });
    var knopf = el('button', { class: 'sv-button sv-button--cta', type: 'button', text: 'Standort bestimmen',
      onclick: function () { zeigeProfil(true); } });
    var wurzel = el('div', { class: 'st-bildschirm st-auftakt' }, [
      el('div', { class: 'st-auftakt__text' }, [
        el('p', { class: 'sv-kicker', text: 'Standortbestimmung für Führungskräfte' }),
        titel,
        el('p', { text: 'Wir fragen, was Sie von Automationen verstehen, ob Sie wissen, was heute alles möglich ist, und was bei Ihnen schon im Einsatz ist. Danach schreibt Ihnen Vaia eine ehrliche Einschätzung: wo Sie stehen und was sich als Nächstes lohnt.' }),
        el('ul', { class: 'st-fakten', 'aria-label': 'Eckdaten' }, [
          el('li', { text: 'Rund 4 Minuten' }),
          el('li', { text: '12 Fragen' }),
          el('li', { text: 'Ohne Anmeldung' }),
          el('li', { text: 'Keine Personendaten' })
        ]),
        knopf,
        el('p', { class: 'st-klein' }, [
          'Ihre Antworten gehen nur für diese Auswertung an unseren KI-Dienst. Namen oder Kontaktdaten fragen wir nicht ab. Mehr dazu in der ',
          el('a', { href: href('datenschutz'), text: 'Datenschutzerklärung' }), '.'
        ])
      ]),
      el('div', { class: 'st-auftakt__bild' }, [
        el('p', { class: 'st-blase', text: 'Grüezi! Ich stelle Ihnen zwölf kurze Fragen, ohne Prüfungsstress.' }),
        roboter('Der vaiacon-Roboter hält einen Kompass')
      ])
    ]);
    zeige(wurzel, scrollen ? titel : null, scrollen);
  }

  // ── Profil ──────────────────────────────────────────────────────────────
  function zeigeProfil(scrollen) {
    st.ansicht = 'profil';
    var titel = el('h3', { class: 'st-profil-titel', tabindex: '-1', text: 'Kurz vorab: drei Angaben zu Ihnen' });
    var weiter = el('button', { class: 'sv-button sv-button--cta', type: 'button', text: 'Weiter →' });
    var hinweis = el('p', { class: 'st-klein', id: 'st-profil-hinweis', text: 'Bitte wählen Sie in jeder Zeile eine Antwort.' });

    function pruefen() {
      var fertig = PROFIL.every(function (g) { return st.profil[g.id]; });
      if (fertig) weiter.removeAttribute('disabled'); else weiter.setAttribute('disabled', '');
      hinweis.hidden = fertig;
    }

    var gruppen = PROFIL.map(function (g) {
      var chips = g.optionen.map(function (text) {
        var input = el('input', { type: 'radio', name: 'st-profil-' + g.id, value: text });
        if (st.profil[g.id] === text) input.checked = true;
        input.addEventListener('change', function () { st.profil[g.id] = text; pruefen(); });
        return el('label', { class: 'st-chip' }, [input, el('span', { text: text })]);
      });
      return el('fieldset', { class: 'st-gruppe' }, [
        el('legend', { text: g.titel }),
        el('div', { class: 'st-chips' }, chips)
      ]);
    });

    // Fangfeld: für Menschen unsichtbar, Programme füllen es oft aus
    var fang = el('div', { class: 'st-fang', 'aria-hidden': 'true' }, [
      el('label', {}, ['Bitte leer lassen ', el('input', { type: 'text', name: 'website', id: 'st-fang', tabindex: '-1', autocomplete: 'off' })])
    ]);

    weiter.addEventListener('click', function () { zeigeFrage(0, true); });
    var wurzel = el('section', { class: 'st-bildschirm st-karte', 'aria-labelledby': 'st-profil-t' }, [
      titel,
      el('p', { class: 'st-hinweis', text: 'So können wir die Einschätzung auf Ihren Betrieb zuschneiden. Namen fragen wir nicht ab.' })
    ].concat(gruppen, [
      fang,
      el('div', { class: 'st-nav' }, [
        el('button', { class: 'st-zurueck', type: 'button', text: '← Zurück', onclick: function () { zeigeAuftakt(true); } }),
        weiter
      ]),
      hinweis
    ]));
    titel.id = 'st-profil-t';
    hinweis.style.marginTop = '12px';
    hinweis.style.textAlign = 'right';
    pruefen();
    zeige(wurzel, titel, scrollen);
  }

  // ── Fragen ──────────────────────────────────────────────────────────────
  function zeigeFrage(i, scrollen) {
    st.ansicht = 'frage';
    st.i = i;
    var f = FRAGEN[i];
    var bereich = BEREICHE.filter(function (b) { return b.id === f.bereich; })[0];
    var nameId = 'st-frage-' + i;

    var titel = el('h3', { class: 'st-frage', id: nameId, tabindex: '-1', text: f.text });
    var optListe = el('ul', { class: 'st-optionen', role: f.typ === 'einzel' ? 'radiogroup' : null, 'aria-labelledby': nameId });
    var weiter = el('button', { class: 'sv-button sv-button--cta', type: 'button',
      text: i === FRAGEN.length - 1 ? 'Ergebnis ansehen →' : 'Weiter →', disabled: true });
    var aufl = el('div', { class: 'st-aufloesung', role: 'status' });
    aufl.hidden = true;
    var optEls = [];

    function antwortSetzen(sel) {
      var a = { sel: sel.slice() };
      if (f.typ === 'einzel') a.punkte = f.optionen[sel[0]].punkte;
      else if (f.typ === 'mehrfach') a.punkte = f.bewerte(sel, f.optionen);
      st.antw[i] = a;
      var ok = sel.length > 0 || !!f.leerErlaubt;
      if (ok) weiter.removeAttribute('disabled'); else weiter.setAttribute('disabled', '');
    }

    if (f.typ === 'wissen') {
      f.optionen.forEach(function (o, n) {
        var b = el('button', { class: 'st-opt', type: 'button' }, [
          el('span', { class: 'st-marker', 'data-n': String(n + 1), 'aria-hidden': 'true' }),
          el('span', { text: o.text })
        ]);
        b.addEventListener('click', function () { wissenWaehlen(n); });
        optEls.push(b);
        optListe.appendChild(el('li', {}, [b]));
      });
    } else {
      var checkbox = f.typ === 'mehrfach';
      f.optionen.forEach(function (o, n) {
        var input = el('input', { class: 'st-opt__input', type: checkbox ? 'checkbox' : 'radio', name: 'st-f' + i, value: String(n) });
        optEls.push(input);
        var label = el('label', { class: 'st-opt' + (checkbox ? ' st-opt--mehrfach' : '') }, [
          input,
          el('span', { class: 'st-marker', 'data-n': String(n + 1), 'aria-hidden': 'true' }),
          el('span', { text: o.text })
        ]);
        input.addEventListener('change', function () {
          if (checkbox && input.checked) {
            // «Nichts davon» schliesst die anderen aus und umgekehrt
            f.optionen.forEach(function (p, m) {
              if (m !== n && ((o.keine && !p.keine) || (!o.keine && p.keine))) optEls[m].checked = false;
            });
          }
          var sel = [];
          optEls.forEach(function (x, m) { if (x.checked) sel.push(m); });
          antwortSetzen(sel);
        });
        optListe.appendChild(el('li', {}, [label]));
      });
    }

    function wissenZeigen(gewaehlt) {
      var rn = -1;
      f.optionen.forEach(function (o, n) { if (o.richtig) rn = n; });
      optEls.forEach(function (b, n) {
        b.classList.add('ist-gesperrt');
        b.setAttribute('aria-disabled', 'true');
        if (n === gewaehlt) b.classList.add('ist-gewaehlt');
        if (n === rn) b.classList.add('ist-richtig');
      });
      var gut = gewaehlt === rn;
      aufl.replaceChildren(el('strong', { text: gut ? 'Genau. ' : 'Nicht ganz. ' }), f.erklaerung);
      aufl.hidden = false;
      weiter.removeAttribute('disabled');
    }

    function wissenWaehlen(n) {
      if (st.antw[i]) return;
      var richtig = !!f.optionen[n].richtig;
      st.antw[i] = { sel: [n], punkte: richtig ? 4 : 0, richtig: richtig };
      wissenZeigen(n);
      try { weiter.focus({ preventScroll: true }); } catch (e) { /* ohne */ }
    }

    // Frühere Antwort wiederherstellen (nach «Zurück»)
    var alt = st.antw[i];
    if (alt) {
      if (f.typ === 'wissen') wissenZeigen(alt.sel[0]);
      else {
        alt.sel.forEach(function (n) { optEls[n].checked = true; });
        weiter.removeAttribute('disabled');
      }
    } else if (f.typ === 'mehrfach' && f.leerErlaubt) {
      weiter.removeAttribute('disabled');
    }

    weiter.addEventListener('click', function () {
      if (weiter.hasAttribute('disabled')) return;
      if (f.typ === 'mehrfach' && f.leerErlaubt && !st.antw[i]) antwortSetzen([]);
      if (i < FRAGEN.length - 1) zeigeFrage(i + 1, true);
      else zeigeErgebnis(true);
    });

    var zaehler = el('ol', { class: 'st-fortschritt', role: 'progressbar', 'aria-label': 'Fortschritt',
      'aria-valuemin': '1', 'aria-valuemax': String(FRAGEN.length), 'aria-valuenow': String(i + 1),
      'aria-valuetext': 'Frage ' + (i + 1) + ' von ' + FRAGEN.length });
    FRAGEN.forEach(function (x, n) {
      zaehler.appendChild(el('li', { class: n < i ? 'ist-fertig' : (n === i ? 'ist-jetzt' : '') }));
    });

    var wurzel = el('section', { class: 'st-bildschirm st-karte', 'aria-label': 'Frage ' + (i + 1) + ' von ' + FRAGEN.length }, [
      el('div', { class: 'st-kopfzeile' }, [
        el('span', { class: 'st-kopfzeile__bereich', text: bereich.titel }),
        el('span', { class: 'st-kopfzeile__zaehler', text: 'Frage ' + (i + 1) + ' von ' + FRAGEN.length })
      ]),
      zaehler,
      titel,
      f.hinweis ? el('p', { class: 'st-hinweis', text: f.hinweis }) : null,
      optListe,
      aufl,
      el('div', { class: 'st-nav' }, [
        el('button', { class: 'st-zurueck', type: 'button', text: '← Zurück',
          onclick: function () { if (i === 0) zeigeProfil(true); else zeigeFrage(i - 1, true); } }),
        weiter
      ])
    ]);
    zeige(wurzel, titel, scrollen);
  }

  // Tastatur: Ziffern wählen die Antwort, Enter geht weiter
  app.addEventListener('keydown', function (e) {
    if (st.ansicht !== 'frage' || e.altKey || e.ctrlKey || e.metaKey) return;
    var f = FRAGEN[st.i];
    if (/^[1-9]$/.test(e.key)) {
      var n = parseInt(e.key, 10) - 1;
      if (n >= f.optionen.length) return;
      var ziel = app.querySelectorAll('.st-optionen li')[n];
      if (!ziel) return;
      var knopf = ziel.querySelector('input, button');
      if (!knopf) return;
      e.preventDefault();
      knopf.focus({ preventScroll: true });
      if (f.typ === 'wissen') { if (!st.antw[st.i]) knopf.click(); }
      else knopf.click();
    } else if (e.key === 'Enter' && e.target && e.target.tagName === 'INPUT') {
      var w = app.querySelector('.st-nav .sv-button');
      if (w && !w.hasAttribute('disabled')) { e.preventDefault(); w.click(); }
    }
  });

  // ── Ergebnis ────────────────────────────────────────────────────────────
  function berechne() {
    var bereiche = BEREICHE.map(function (b) {
      var punkte = 0;
      fragenInBereich(b.id).forEach(function (x) { punkte += (st.antw[x.i] && st.antw[x.i].punkte) || 0; });
      return { id: b.id, titel: b.titel, punkte: punkte, max: 12 };
    });
    var gesamt = bereiche.reduce(function (s, b) { return s + b.punkte; }, 0);
    var stufe = gesamt < 10 ? 1 : gesamt < 20 ? 2 : gesamt < 30 ? 3 : gesamt < 40 ? 4 : 5;
    return { bereiche: bereiche, gesamt: gesamt, max: 48, stufe: stufe };
  }

  function zeigeErgebnis(scrollen) {
    st.ansicht = 'ergebnis';
    var erg = berechne();
    st.ergebnis = erg;
    var stufe = STUFEN[erg.stufe - 1];

    var titel = el('h3', { class: 'st-stufe-name', tabindex: '-1' }, [
      el('span', { text: 'Stufe ' + erg.stufe + ' · ' }), stufe.name
    ]);

    var skala = el('ol', { class: 'st-skala', 'aria-label': 'Die fünf Stufen' });
    STUFEN.forEach(function (s) {
      var klasse = s.nr < erg.stufe ? 'ist-erreicht' : (s.nr === erg.stufe ? 'ist-jetzt' : '');
      var li = el('li', { class: klasse, 'aria-current': s.nr === erg.stufe ? 'step' : null }, [
        el('span', { class: 'st-skala__nr', text: String(s.nr) }),
        el('span', { class: 'st-skala__name', text: s.name }),
        s.nr === erg.stufe ? el('span', { class: 'st-sr', text: ' (Ihre Stufe)' }) : null
      ]);
      skala.appendChild(li);
    });

    var balken = [];
    var bereicheEl = el('ul', { class: 'st-bereiche', 'aria-label': 'Punkte je Bereich' });
    erg.bereiche.forEach(function (b) {
      var fuell = el('span');
      balken.push({ el: fuell, proz: Math.round(b.punkte / b.max * 100) });
      bereicheEl.appendChild(el('li', {}, [
        el('div', { class: 'st-bereich__kopf' }, [
          el('span', { class: 'st-bereich__titel', text: b.titel }),
          el('span', { class: 'st-bereich__punkte' }, [el('strong', { text: String(b.punkte) }), ' / ' + b.max])
        ]),
        el('div', { class: 'st-balken', role: 'img', 'aria-label': b.titel + ': ' + b.punkte + ' von ' + b.max + ' Punkten' }, [fuell])
      ]));
    });

    var p = st.profil;
    var datum = new Date().toLocaleDateString('de-CH', { day: 'numeric', month: 'long', year: 'numeric' });
    var druckkopf = el('div', { class: 'st-druckkopf' }, [
      el('img', { src: assets + 'logo-lockup-terra.png', alt: 'vaiacon' }),
      el('div', { style: 'text-align:right' }, [
        el('strong', { text: 'KI-Standortbestimmung für Führungskräfte' }),
        [p.rolle, p.branche, p.groesse].filter(Boolean).join(' · ') + ' · ' + datum
      ])
    ]);

    var ki = el('div', { class: 'st-ki' });
    var ansage = el('p', { class: 'st-sr', role: 'status', 'aria-live': 'polite' });

    var karte = el('section', { class: 'st-karte', 'aria-label': 'Ihr Ergebnis' }, [
      el('div', { class: 'st-ergebnis-kopf' }, [
        el('p', { class: 'sv-kicker', text: 'Ihr Ergebnis · ' + erg.gesamt + ' von ' + erg.max + ' Punkten' }),
        titel,
        el('p', { class: 'st-stufe-text', text: stufe.text })
      ]),
      skala,
      bereicheEl
    ]);

    var wurzel = el('div', { class: 'st-bildschirm' }, [druckkopf, karte, ki, ansage]);
    zeige(wurzel, titel, scrollen);

    // Balken laufen nach dem Einsetzen auf ihren Wert
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        balken.forEach(function (b) { b.el.style.width = b.proz + '%'; });
      });
    });

    holeEinschaetzung(erg, ki, ansage);
  }

  // ── Einschätzung vom Dienst ─────────────────────────────────────────────
  function payload(erg) {
    var antworten = FRAGEN.map(function (f, i) {
      var a = st.antw[i] || { sel: [] };
      var text = a.sel.map(function (n) { return f.optionen[n].text; }).join(', ');
      return {
        bereich: f.bereich,
        frage: kuerzen(f.text),
        antwort: kuerzen(text || '(nichts gewählt)'),
        richtig: f.typ === 'wissen' ? !!a.richtig : null
      };
    });
    var fang = document.getElementById('st-fang');
    return {
      profil: { rolle: kuerzen(st.profil.rolle), branche: kuerzen(st.profil.branche), groesse: kuerzen(st.profil.groesse) },
      stufe: erg.stufe,
      punkte: { gesamt: erg.gesamt, max: erg.max, bereiche: erg.bereiche },
      antworten: antworten,
      fangfrage: fang ? kuerzen(fang.value) : (st.fang || '')
    };
  }

  function normalisiere(d) {
    if (!d || typeof d !== 'object') return null;
    var liste = function (x) {
      return Array.isArray(x) ? x.filter(function (s) { return typeof s === 'string' && s.trim(); }).slice(0, 6) : [];
    };
    var empf = Array.isArray(d.empfehlungen) ? d.empfehlungen.filter(function (e) {
      return e && typeof e.titel === 'string' && typeof e.text === 'string';
    }).slice(0, 4) : [];
    if (typeof d.kurzfazit !== 'string' || !d.kurzfazit.trim()) return null;
    if (typeof d.einschaetzung !== 'string' || !d.einschaetzung.trim()) return null;
    return {
      kurzfazit: d.kurzfazit,
      einschaetzung: d.einschaetzung,
      staerken: liste(d.staerken),
      luecken: liste(d.luecken),
      empfehlungen: empf,
      warum_gespraech: typeof d.warum_gespraech === 'string' ? d.warum_gespraech : ''
    };
  }

  function probeAntwort(erg) {
    var stufe = STUFEN[erg.stufe - 1].name;
    return {
      kurzfazit: 'Sie sind als «' + stufe + '» unterwegs: Sie wissen, was möglich ist, aber bisher fehlt der feste Rahmen.',
      einschaetzung: 'Ihre Antworten zeigen ein ordentliches Grundverständnis. Sie unterscheiden sauber zwischen Chat-Assistent und Automation und haben ein Gespür dafür, was sich heute zuverlässig abgeben lässt.\n\nIm Betrieb selbst ist KI noch eher Sache einzelner Personen. Solange Zuständigkeit, Zeit und Messung offen bleiben, versickert viel von dem, was möglich wäre.\n\nDas ist kein Mangel, sondern die typische Lage vieler Betriebe Ihrer Grösse: Die Grundlage steht, der nächste Schritt ist ein erster Ablauf, der verlässlich läuft.',
      staerken: ['Sie kennen die wichtigen Begriffe und wissen, worauf es beim Datenschutz ankommt.', 'Sie haben einen realistischen Blick darauf, was KI heute kann und was nicht.'],
      luecken: ['Niemand ist ausdrücklich zuständig, deshalb bleibt KI ein Nebenthema.', 'Ob sich ein Einsatz lohnt, wird nicht gemessen. Das macht Entscheide schwer.', 'Wiederkehrende Büroarbeiten werden noch von Hand erledigt.'],
      empfehlungen: [
        { titel: 'Einen ersten Ablauf automatisieren', text: 'Wir suchen mit Ihnen die zwei, drei Arbeiten mit dem grössten Hebel und rechnen den Nutzen vorab durch.', bereich: 'automationen' },
        { titel: 'Team und Spielregeln', text: 'Eine kurze Schulung klärt Begriffe, Datenschutz und Regeln für den Alltag und nimmt dem Team die Scheu.', bereich: 'ki-kompetenz' },
        { titel: 'In KI-Antworten gefunden werden', text: 'Ein kostenloser Check zeigt, ob KI-Systeme Ihre Website als Quelle erkennen.', bereich: 'sichtbarkeit' }
      ],
      warum_gespraech: 'Sie haben die Grundlage, es fehlt der erste feste Schritt. In einem unverbindlichen Erstgespräch klären wir, welche Abläufe sich bei Ihnen zuerst lohnen und was das ungefähr kostet.'
    };
  }

  // Ersatztext, wenn der Dienst nicht antwortet. Aus Stufe und schwächstem
  // Bereich zusammengesetzt; es steht nirgends, dass etwas ausgefallen ist.
  function ersatzText(erg) {
    var stufe = STUFEN[erg.stufe - 1];
    var schwach = erg.bereiche[0], stark = erg.bereiche[0];
    erg.bereiche.forEach(function (b) {
      if (b.punkte < schwach.punkte) schwach = b;
      if (b.punkte > stark.punkte) stark = b;
    });
    var groesse = st.profil.groesse ? ' in einem Betrieb mit ' + st.profil.groesse.replace(' Mitarbeitende', '') + ' Mitarbeitenden' : '';

    var TEXT = {
      verstaendnis: {
        luecke: 'Das Grundwissen zu Begriffen, Möglichkeiten und Datenschutz ist noch lückenhaft. Das macht es schwer, Angebote einzuordnen.',
        staerke: 'Sie kennen die wichtigen Begriffe und wissen, worauf es bei Kundendaten ankommt.',
        satz: 'Beim Verständnis haben Sie am meisten Luft nach oben: Wer die Begriffe und Grenzen kennt, kann Angebote einordnen und entscheidet sicherer.',
        empf: { titel: 'Kurz und praktisch einsteigen', text: 'In einer Schulung klären Sie mit Ihrem Team Begriffe, Möglichkeiten und Datenschutz, anhand Ihres eigenen Alltags.', bereich: 'ki-kompetenz' }
      },
      moeglichkeiten: {
        luecke: 'Welche Abläufe sich heute zuverlässig automatisieren lassen, ist noch nicht klar. Im Büroalltag bleiben Zeit und Geld liegen.',
        staerke: 'Sie haben einen realistischen Blick darauf, was KI heute kann und was nicht.',
        satz: 'Am meisten Luft nach oben haben Sie beim Blick auf die Möglichkeiten: Viele wiederkehrende Büroarbeiten lassen sich heute zuverlässig abgeben, ohne dass man etwas aus der Hand gibt, das Urteil braucht.',
        empf: { titel: 'Abläufe mit dem grössten Hebel finden', text: 'Wir schauen gemeinsam, welche wiederkehrenden Arbeiten sich zuerst lohnen, und rechnen den Nutzen vorab durch.', bereich: 'automationen' }
      },
      einsatz: {
        luecke: 'KI wird im Betrieb noch wenig oder unorganisiert genutzt, und es fehlen Spielregeln und Schulung.',
        staerke: 'KI ist bei Ihnen im Betrieb schon ein Stück Alltag.',
        satz: 'Im Betrieb selbst ist noch am meisten möglich: Wo KI nur vereinzelt oder ohne Regeln genutzt wird, bleibt der Nutzen klein und das Risiko unnötig gross.',
        empf: { titel: 'Von einzelnen Hilfen zu festen Abläufen', text: 'Wir bauen mit Ihnen Automationen, die im Alltag verlässlich laufen, und klären mit dem Team die Spielregeln.', bereich: 'automationen' }
      },
      fuehrung: {
        luecke: 'Zuständigkeit, Zeit und Messung sind noch offen. Ohne sie bleibt KI schnell ein Einzelprojekt.',
        staerke: 'Sie führen das Thema aktiv: Zuständigkeit, Zeit und Nutzen sind bei Ihnen geklärt.',
        satz: 'Bei der Führung liegt am meisten Potenzial: Wo Zuständigkeit, Zeit und Messung klar sind, wird aus einem Versuch ein Ergebnis, und das Team zieht mit.',
        empf: { titel: 'Führung und Team mitnehmen', text: 'Wir begleiten Sie dabei, Zuständigkeit, Zeitfenster und eine einfache Messung festzulegen, und das Team einzubeziehen.', bereich: 'ki-kompetenz' }
      }
    };

    var warum = erg.stufe <= 2
      ? 'Bei der Vielzahl an Angeboten hilft ein unbefangener Blick von aussen. In einem unverbindlichen Erstgespräch klären wir, was für Ihren Betrieb wirklich Sinn macht, ohne Fachchinesisch und ohne Verkaufsdruck.'
      : erg.stufe === 3
        ? 'Sie haben die Grundlage, es fehlt der erste feste Schritt. In einem unverbindlichen Erstgespräch klären wir, welche zwei bis drei Abläufe sich bei Ihnen zuerst lohnen und was das ungefähr kostet.'
        : 'Sie brauchen keine Einführung, sondern ein Gegenüber, das mitdenkt und mitbaut. Im Erstgespräch klären wir, wo sich Ihr bisheriger Nutzen verbreitern und absichern lässt.';

    var einstieg = {
      1: 'Sie stehen am Anfang, und das hat einen Vorteil: Sie können gezielt einsteigen, statt viele Umwege zu gehen.',
      2: 'Sie haben erste Erfahrungen gesammelt, doch noch ist vieles dem Zufall überlassen.',
      3: 'KI ist bei Ihnen im Alltag angekommen, aber noch nicht überall und noch nicht mit festem Rahmen.',
      4: 'Sie setzen KI gezielt ein und steuern sie. Das ist mehr, als die meisten Betriebe von sich sagen können.',
      5: 'Sie sind weit gekommen und haben die wichtigen Grundlagen im Griff.'
    }[erg.stufe];

    var empf = [TEXT[schwach.id].empf];
    if (erg.stufe <= 3) {
      empf.push(schwach.id === 'verstaendnis' || schwach.id === 'fuehrung'
        ? { titel: 'Einen ersten Ablauf automatisieren', text: 'Wir suchen die zwei, drei Arbeiten mit dem grössten Hebel und rechnen den Nutzen vorab durch.', bereich: 'automationen' }
        : { titel: 'Team und Spielregeln', text: 'Eine kurze Schulung klärt Begriffe, Datenschutz und Regeln für den Alltag und nimmt dem Team die Scheu.', bereich: 'ki-kompetenz' });
    } else {
      empf.push({ titel: 'Nutzen verbreitern', text: 'Wir prüfen, welche weiteren Abläufe sich mit dem Erreichten verbinden lassen und wo ein Agent sinnvoll wäre.', bereich: 'automationen' });
    }
    empf.push({ titel: 'In KI-Antworten gefunden werden', text: 'Ein kostenloser Check zeigt, ob Google und KI-Systeme Ihre Website als Quelle erkennen.', bereich: 'sichtbarkeit' });

    return {
      kurzfazit: 'Sie sind auf Stufe ' + erg.stufe + ' («' + stufe.name + '»), am meisten Luft nach oben liegt bei «' + schwach.titel + '».',
      einschaetzung: einstieg + ' Mit ' + erg.gesamt + ' von ' + erg.max + ' Punkten' + groesse + ' sind Sie ' + (erg.stufe >= 4 ? 'klar vorn' : erg.stufe === 3 ? 'solide in der Mitte' : 'am Anfang eines Weges, der sich lohnt') + '.\n\n' + TEXT[schwach.id].satz + '\n\nDas ist eine erste Orientierung aus zwölf Fragen, kein Gutachten. Wie viel Zeit und Geld im Einzelnen liegen bleibt, lässt sich erst im Gespräch über Ihre konkreten Abläufe sagen.',
      staerken: [TEXT[stark.id].staerke].concat(erg.stufe >= 3 ? ['Sie sind bereit, KI als Führungsthema zu betrachten, und haben sich Zeit dafür genommen.'] : ['Sie nehmen sich die Zeit, Ihren Stand ehrlich zu prüfen. Das ist der erste Schritt.']),
      luecken: [TEXT[schwach.id].luecke],
      empfehlungen: empf,
      warum_gespraech: warum
    };
  }

  function holeEinschaetzung(erg, box, ansage) {
    var lauf = ++st.lauf;
    if (st.timer) { window.clearInterval(st.timer); st.timer = null; }

    var schritt = el('p', { class: 'st-ladend__schritt', text: 'Vaia liest Ihre Antworten …' });
    var phrasen = ['Vaia liest Ihre Antworten …', 'Vaia wägt ab, wo der grösste Hebel liegt …', 'Vaia formuliert Empfehlungen …'];
    var n = 0;
    st.timer = window.setInterval(function () {
      n = (n + 1) % phrasen.length;
      schritt.textContent = phrasen[n];
    }, 3500);

    var laden = el('div', { class: 'st-ladend', 'aria-busy': 'true' }, [
      roboter(''),
      el('div', { class: 'st-ladend__text' }, [
        el('p', { class: 'st-blase' }, ['Vaia schreibt Ihre Einschätzung ', el('span', { class: 'st-punkte', 'aria-hidden': 'true' }, [el('i', { text: '.' }), el('i', { text: '.' }), el('i', { text: '.' })])]),
        schritt,
        el('div', { class: 'st-skelett', 'aria-hidden': 'true' }, [el('span'), el('span'), el('span')])
      ])
    ]);
    box.replaceChildren(laden);

    function fertig(daten) {
      if (lauf !== st.lauf) return;            // inzwischen neu gestartet
      window.clearInterval(st.timer); st.timer = null;
      zeigeKi(daten, box);
      ansage.textContent = 'Ihre Einschätzung liegt vor.';
    }

    if (probe === 'fehler') {
      window.setTimeout(function () { fertig(ersatzText(erg)); }, 1500);
      return;
    }
    if (probe) {
      window.setTimeout(function () { fertig(probeAntwort(erg)); }, 2600);
      return;
    }

    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var abbruch = window.setTimeout(function () { if (ctrl) ctrl.abort(); }, 45000);
    var zeitgeber = new Promise(function (_, nein) {
      window.setTimeout(function () { nein(new Error('zeit')); }, 46000);
    });

    var anfrage = fetch(apiBasis() + '/api/standort', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload(erg)),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      if (!res.ok) throw new Error('status ' + res.status);
      return res.json();
    }).then(function (d) {
      var ok = normalisiere(d);
      if (!ok) throw new Error('antwort');
      return ok;
    });

    Promise.race([anfrage, zeitgeber]).then(function (daten) {
      window.clearTimeout(abbruch);
      fertig(daten);
    }, function () {
      window.clearTimeout(abbruch);
      fertig(ersatzText(erg));
    });
  }

  function absaetze(text) {
    return String(text).split(/\n\s*\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  }

  function liste(titel, art, punkte) {
    if (!punkte.length) return null;
    return el('div', { class: 'st-liste-karte st-liste-karte--' + art }, [
      el('h4', { text: titel }),
      el('ul', {}, punkte.map(function (t) { return el('li', { text: t }); }))
    ]);
  }

  function zeigeKi(d, box) {
    var kinder = [];

    var kopf = el('div', { class: 'st-ki-kopf' }, [
      el('span', { class: 'sv-label', text: 'Einschätzung von Vaia' }),
      el('h3', { class: 'st-fazit', tabindex: '-1', text: d.kurzfazit }),
      el('div', { class: 'st-text' }, absaetze(d.einschaetzung).map(function (t) { return el('p', { text: t }); }))
    ]);
    kinder.push(kopf);

    if (d.staerken.length || d.luecken.length) {
      kinder.push(el('div', { class: 'st-zwei' }, [
        liste('Das machen Sie schon gut', 'gut', d.staerken),
        liste('Hier bleibt Zeit oder Geld liegen', 'luecke', d.luecken)
      ]));
    }

    if (d.empfehlungen.length) {
      kinder.push(el('h4', { class: 'st-abschnitt', text: 'Das würden wir als Nächstes anschauen' }));
      kinder.push(el('div', { class: 'st-empf' }, d.empfehlungen.map(function (e) {
        var z = ZIELE[e.bereich];
        return el('article', { class: 'st-empf__karte' }, [
          el('span', { class: 'sv-label', text: z ? z.name : 'Gespräch' }),
          el('h4', { text: e.titel }),
          el('p', { text: e.text }),
          el('a', { class: 'st-link', href: href(z ? z.ziel : 'kontakt'), text: z ? z.knopf : 'Mehr erfahren →' })
        ]);
      })));
    }

    kinder.push(el('div', { class: 'st-gespraech' }, [
      el('h4', { text: 'Warum sich ein Gespräch lohnt' }),
      d.warum_gespraech ? el('p', { text: d.warum_gespraech }) : null,
      el('div', { class: 'st-gespraech__knoepfe' }, [
        el('a', { class: 'sv-button sv-button--light', href: href('kontakt#formular'), text: 'Erstgespräch vereinbaren →' }),
        el('a', { class: 'sv-button sv-button--glass', href: href('offerte'), text: 'Offerte zusammenstellen →' })
      ])
    ]));

    kinder.push(el('div', { class: 'st-aktionen' }, [
      el('button', { class: 'sv-button st-knopf-zweit', type: 'button', text: 'Nochmals starten', onclick: neuStarten }),
      el('button', { class: 'sv-button st-knopf-zweit', type: 'button', text: 'Ergebnis drucken', onclick: function () { window.print(); } })
    ]));

    kinder.push(el('p', { class: 'st-klein st-ki-fuss', text: 'Die Einschätzung ist eine Orientierung auf Grundlage Ihrer zwölf Antworten, kein Gutachten. Sie wurde von einer KI formuliert.' }));

    box.replaceChildren.apply(box, kinder);
  }

  function neuStarten() {
    st.lauf++;
    if (st.timer) { window.clearInterval(st.timer); st.timer = null; }
    st.antw = {};
    st.profil = { rolle: null, branche: null, groesse: null };
    st.ergebnis = null;
    zeigeAuftakt(true);
  }

  // ── Druck: alles ausser dem Ergebnis ausblenden ─────────────────────────
  var ausgeblendet = [];

  function druckVor() {
    if (st.ansicht !== 'ergebnis') return;
    var knoten = app;
    while (knoten && knoten !== document.body) {
      var eltern = knoten.parentNode;
      if (!eltern) break;
      Array.prototype.forEach.call(eltern.children, function (geschwister) {
        if (geschwister !== knoten && !geschwister.classList.contains('st-druck-weg')) {
          geschwister.classList.add('st-druck-weg');
          ausgeblendet.push(geschwister);
        }
      });
      knoten = eltern;
    }
  }

  function druckNach() {
    ausgeblendet.forEach(function (x) { x.classList.remove('st-druck-weg'); });
    ausgeblendet = [];
  }

  window.addEventListener('beforeprint', druckVor);
  window.addEventListener('afterprint', druckNach);

  // ── Start ───────────────────────────────────────────────────────────────
  app.classList.add('st-app');
  app.removeAttribute('data-ohne-js');
  zeigeAuftakt(false);
}());
