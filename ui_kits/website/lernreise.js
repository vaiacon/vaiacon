/* Lernreise (KI-Kompetenz, seit 04.10.2026)
   Baut die Beispielreise aus drei Angaben (Teamgrösse, Ausgangslage, Zeit)
   und lässt den Weg beim Scrollen mitwachsen. Rein im Browser, kein Dienst,
   nichts wird gespeichert. Ohne JavaScript steht die feste Beispielreise im
   HTML (erzeugt mit derselben Funktion `bauen`).

   Bilder: je Rolle ein Büro-Bot. Die Zuordnung steht unten in BILD; wenn
   die journey-Bilder da sind, genügt es, hier die Dateinamen zu tauschen
   (und in den Formatkarten von learning.html). */
(function (root) {
  'use strict';

  var BILD = {
    standort: 'faq-tablet',
    auftakt: 'ueber-uns-willkommen',
    training: 'schulung-zeigestab',
    elearning: 'journey-elearning',
    video: 'journey-video',
    mikro: 'journey-mikro',
    vorort: 'journey-vor-ort',
    coaching: 'journey-coaching',
    wirkung: 'academy-schreibtisch'
  };
  var ALT = {
    standort: 'Der vaiacon-Roboter hält ein Tablet in der Hand',
    auftakt: 'Der vaiacon-Roboter heisst mit offener Hand willkommen',
    training: 'Der vaiacon-Roboter mit Buch und Zeigestab',
    elearning: 'Der vaiacon-Roboter mit Kopfhörern am Laptop',
    video: 'Der vaiacon-Roboter hält eine Filmklappe',
    mikro: 'Der vaiacon-Roboter giesst einen Setzling, daneben ein Kalender',
    vorort: 'Der vaiacon-Roboter mit Koffer und Namensschild unterwegs zum Betrieb',
    coaching: 'Der vaiacon-Roboter sitzt mit einer Tasse auf einem Hocker und erklärt',
    wirkung: 'Der vaiacon-Roboter am Schreibtisch'
  };

  var GROESSE = {
    klein: { label: 'bis 10', satz: 'bis zu 10', gruppen: 1 },
    mittel: { label: '11 bis 20', satz: '11 bis 20', gruppen: 1 },
    gross: { label: '21 bis 50', satz: '21 bis 50', gruppen: 2 },
    sehrgross: { label: 'ab 50', satz: '50 und mehr', gruppen: 'mehrere' }
  };
  var STAND = {
    kaum: { label: 'Noch kaum KI', wochen: 10 },
    einzelne: { label: 'Einzelne probieren', wochen: 8 },
    alltag: { label: 'Schon im Alltag', wochen: 6 }
  };
  var ZEIT = {
    z30: { label: 'rund 30 Minuten', woche: 'rund 30 Minuten pro Person und Woche', taeglich: 'fünf Minuten', extra: 2 },
    z60: { label: 'rund 1 Stunde', woche: 'rund eine Stunde pro Person und Woche', taeglich: 'zehn Minuten', extra: 0 },
    z120: { label: '2 Stunden und mehr', woche: 'zwei Stunden und mehr pro Person und Woche', taeglich: 'zehn Minuten, dazu eine Übungsstunde pro Woche', extra: -1 }
  };

  var STANDARD = { groesse: 'mittel', stand: 'einzelne', zeit: 'z60' };

  var FORMATE = {
    standort: { name: 'Standortbestimmung', href: '#standortbestimmung' },
    'kk-training-halbtag': { name: 'Training, Halbtag', href: '#format-training' },
    'kk-training-tag': { name: 'Training, ganzer Tag', href: '#format-training' },
    'kk-coaching-fuehrung': { name: 'Coaching für Führungskräfte', href: '#format-coaching' },
    'kk-elearning-lernminute': { name: 'E-Learning nach Mass', href: '#format-elearning' },
    'kk-lernvideo': { name: 'Lernvideo', href: '#format-video' },
    'kk-mikro-lerneinheiten': { name: 'Kleine Lerneinheiten', href: '#format-mikro' },
    'kk-change-begleitung': { name: 'Change-Begleitung', href: '#format-change' },
    'kk-begleitung-vor-ort': { name: 'Begleitung vor Ort', href: '#format-vor-ort' }
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Die Stationen für eine Auswahl. Reine Funktion, ohne DOM. */
  function stationen(a) {
    var g = GROESSE[a.groesse], s = a.stand, z = ZEIT[a.zeit];
    var klein = a.groesse === 'klein', sehrgross = a.groesse === 'sehrgross', gross = a.groesse === 'gross' || sehrgross;
    var L = [];

    L.push({
      bild: 'standort', rolle: 'Standort', titel: 'Standortbestimmung',
      text: sehrgross
        ? 'Die Führung und, wo es passt, die Abteilungsleitungen beantworten zwölf kurze Fragen. So wird sichtbar, was in den Abteilungen schon trägt und wo sie auseinanderlaufen.'
        : s === 'kaum'
        ? 'Die Führung beantwortet zwölf kurze Fragen. Sie sehen, wo Ihr Betrieb steht, und wir sehen, wo ein Anfang am meisten bringt.'
        : 'Beantworten Sie einige Fragen zur Standortbestimmung. So wird sichtbar, was schon trägt und wo Handlungsbedarf herrscht.',
      mess: { art: 'Wo stehen wir?', text: 'Machen Sie eine Umfrage im Team: Wer nutzt KI, wofür, wie sicher. Und eine Aufgabe, die oft vorkommt, mit der Zeit, die sie heute braucht.' },
      formate: ['standort'], ids: []
    });

    if (klein) {
      L.push({
        bild: 'auftakt', rolle: 'Auftakt', titel: 'Auftakt mit der Geschäftsleitung',
        text: 'In zwei Stunden klären wir, was Sie erreichen wollen und welche Regeln im Betrieb gelten sollen. In einem kleinen Team genügt dafür ein Gespräch.',
        mess: { art: 'Ziele festlegen', text: 'Zwei bis drei Ziele, welche greifbar sind. Zum Beispiel: ' + (s === 'kaum' ? 'drei von vier im Team nutzen KI jede Woche' : s === 'einzelne' ? 'alle arbeiten mit denselben geprüften Vorlagen' : 'Offerten in der halben Zeit') + '. Zu jedem Ziel: woran wir es messen und bis wann wir es erreicht haben wollen.' },
        formate: ['kk-coaching-fuehrung'], ids: ['kk-coaching-fuehrung']
      });
    } else {
      L.push({
        bild: 'auftakt', rolle: 'Auftakt', titel: 'Gespräch mit der Teamleitung',
        text: 'Die Teamleitung klärt Ziel, Rollen und Spielregeln, bevor das Team startet. Wir begleiten das Gespräch und bringen uns dort mit ein, wo unsere Erfahrung helfen kann.',
        mess: { art: 'Ziele festlegen', text: 'Zwei bis drei Ziele, welche greifbar sind. Zum Beispiel: ' + (s === 'kaum' ? 'drei von vier im Team nutzen KI jede Woche' : s === 'einzelne' ? 'alle arbeiten mit denselben geprüften Vorlagen' : 'Offerten in der halben Zeit') + '. Zu jedem Ziel: woran wir es messen und bis wann wir es erreicht haben wollen.' },
        formate: ['kk-change-begleitung'], ids: ['kk-change-begleitung']
      });
    }

    if (s === 'kaum') {
      L.push({
        bild: 'training', rolle: 'Training', titel: 'Training im Team' + (sehrgross ? ' (mehrere Gruppen)' : gross ? ' (zwei Gruppen)' : ''),
        text: 'Ein ganzer Tag, bei Ihnen im Betrieb, an Ihren eigenen Aufgaben: vom ersten Gespräch mit einem Assistenten bis zu Vorlagen, die danach bleiben.',
        formate: ['kk-training-tag'], ids: ['kk-training-tag']
      });
    } else if (s === 'einzelne') {
      L.push({
        bild: 'training', rolle: 'Training', titel: 'Training im Team' + (sehrgross ? ' (mehrere Gruppen)' : gross ? ' (zwei Gruppen)' : ''),
        text: 'Ein halber Tag, in dem alle auf denselben Stand gebracht werden. Was Einzelne bereits gefunden haben, wird zum gemeinsamen Wissen.',
        formate: ['kk-training-halbtag'], ids: ['kk-training-halbtag']
      });
    } else {
      L.push({
        bild: 'training', rolle: 'Workshop', titel: 'Workshop zu einem Thema',
        text: 'Ein halber Tag, auf eine Aufgabe zugeschnitten, zum Beispiel Offerten, Korrespondenz oder Protokolle. Am Ende läuft es, nicht nur die Erklärung.',
        formate: ['kk-training-halbtag'], ids: ['kk-training-halbtag']
      });
    }

    if (s !== 'kaum') {
      L.push({
        bild: 'video', rolle: 'Video', titel: 'Lernvideo aus Ihrem Alltag',
        text: 'Was Ihre Mitarbeiter bereits beherrschen, wird zu einem kurzen Video. Neue Mitarbeiter können es später jederzeit abholen und aneignen.',
        formate: ['kk-lernvideo'], ids: ['kk-lernvideo']
      });
    }

    L.push({
      bild: 'mikro', rolle: 'Täglich', titel: 'Tägliche kleine Lerneinheiten',
      text: 'Jeden Arbeitstag ' + z.taeglich + ': ein Tipp, eine Übung am eigenen Fall, eine Frage vom Roboter. Vier Wochen lang, direkt am Arbeitsplatz oder auf dem Smartphone.',
      mess: { art: 'Zwischenstand', text: 'Die Antworten auf die tägliche Frage zeigen laufend, was sitzt. Nach zwei Wochen sehen Sie, wo das Team steht, und wir stellen nach, wo es hakt.' },
      formate: ['kk-mikro-lerneinheiten'], ids: ['kk-mikro-lerneinheiten']
    });

    if (gross) {
      L.push({
        bild: 'elearning', rolle: 'E-Learning', titel: 'E-Learning für alle',
        text: 'In einem grösseren Team lernt nicht jeder am selben Tag. Ein kurzer Online-Kurs mit Ihren Beispielen hält alle auf demselben Stand.',
        formate: ['kk-elearning-lernminute'], ids: ['kk-elearning-lernminute']
      });
    }

    L.push({
      bild: 'vorort', rolle: 'Vor Ort', titel: 'Begleitung am Arbeitsplatz',
      text: (sehrgross ? 'Mindestens zwei Tage, an denen' : gross ? 'Zwei Tage, an denen' : 'Ein Tag, an dem') + ' wir Sie im Betrieb besuchen. Wir helfen dort, wo es im Alltag hakt, und beantworten die Fragen, die im Training nicht aufkamen.',
      formate: ['kk-begleitung-vor-ort'], ids: ['kk-begleitung-vor-ort']
    });

    if (sehrgross) {
      L.push({
        bild: 'wirkung', rolle: 'Ansprechpersonen', titel: 'KI-Ansprechpersonen je Abteilung',
        text: 'Pro Abteilung bestimmen wir eine Person, die nach dem Training weiterhilft. Wir bereiten sie darauf vor, Fragen im Alltag aufzufangen. Umfang nach Absprache.',
        formate: [], ids: []
      });
    }

    L.push({
      bild: 'coaching', rolle: 'Coaching', titel: 'Coaching der Führungskräfte',
      text: 'In Einzelgesprächen geht es darum, was Führung jetzt anders macht: Wer entscheidet was, wie sprechen Sie über KI im Team, wo setzen Sie Grenzen.',
      formate: ['kk-coaching-fuehrung'], ids: ['kk-coaching-fuehrung']
    });

    L.push({
      bild: 'wirkung', rolle: 'Wirkung', titel: 'Wirkung messen, Ziele prüfen',
      text: 'Dieselben Fragen wie zu Beginn. An die Führung und an das Team. Wir legen Vorher und Nachher nebeneinander.',
      mess: { art: 'Zielcheck', text: 'Jedes Ziel aus dem Auftakt bekommt ein Ergebnis: erreicht, teilweise oder offen. Was offen ist, wird zur nächsten Etappe.' },
      formate: ['standort'], ids: []
    });

    return L;
  }

  function wochen(a) {
    return Math.max(4, STAND[a.stand].wochen + ZEIT[a.zeit].extra);
  }

  function wochenLabel(i, n, total) {
    if (i === 0) return 'Woche 0';
    if (i === n - 1) return 'ab Woche ' + total;
    var w = Math.max(1, Math.round(total * (i / (n - 1))));
    return 'Woche ' + w;
  }

  function ids(a) {
    var seen = {}, out = [];
    stationen(a).forEach(function (st) {
      st.ids.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
    });
    return out;
  }

  function offerteLink(a, basis) {
    return (basis || '') + 'offerte?vorwahl=' + ids(a).join(',') + '#ki-kompetenz';
  }

  function zusammenfassung(a) {
    var n = stationen(a).length;
    return 'Beispielreise für einen Betrieb mit ' + GROESSE[a.groesse].satz + ' Mitarbeitenden · Ausgangslage: ' +
      STAND[a.stand].label.replace(/^./, function (z) { return z.toLowerCase(); }) + ' · ' + ZEIT[a.zeit].woche + '. Dauer: etwa ' + wochen(a) + ' Wochen, ' + n + ' Stationen.';
  }

  /* HTML der Stationen. Gleiche Ausgabe im JS und im festen Beispiel. */
  function bauen(a, basis) {
    basis = basis || '';
    var L = stationen(a), total = wochen(a), h = '';
    L.forEach(function (st, i) {
      var seite = i % 2 === 0 ? 'links' : 'rechts';
      var chips = st.formate.map(function (k) {
        var f = FORMATE[k];
        return '<a class="lr-chip" href="' + f.href + '">' + esc(f.name) + '</a>';
      }).join('');
      var mess = st.mess
        ? '<div class="lr-mess"><p class="lr-mess__art">Messpunkt · ' + esc(st.mess.art) + '</p><p>' + esc(st.mess.text) + '</p></div>'
        : '';
      h += '<li class="lr-station lr-station--' + seite + (st.mess ? ' lr-station--mess' : '') + '" data-station>' +
        '<div class="lr-station__knoten" aria-hidden="true"><span>' + (i + 1) + '</span></div>' +
        '<article class="lr-station__karte">' +
          '<p class="lr-station__zeit">' + esc(wochenLabel(i, L.length, total)) + ' · ' + esc(st.rolle) + '</p>' +
          '<h3>' + esc(st.titel) + '</h3>' +
          '<p>' + esc(st.text) + '</p>' +
          mess +
          '<p class="lr-station__formate">' + chips + '</p>' +
        '</article>' +
        '<figure class="lr-station__bild"><picture>' +
          '<source srcset="' + basis + 'assets/vaiacon-buerobot-' + BILD[st.bild] + '.webp" type="image/webp">' +
          '<img src="' + basis + 'assets/vaiacon-buerobot-' + BILD[st.bild] + '.png" alt="' + esc(ALT[st.bild]) + '" loading="lazy" decoding="async">' +
        '</picture></figure>' +
      '</li>';
    });
    return h;
  }

  var api = { stationen: stationen, bauen: bauen, ids: ids, offerteLink: offerteLink, zusammenfassung: zusammenfassung, STANDARD: STANDARD };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }

  /* ── Ab hier nur im Browser ─────────────────────────────────────────── */
  var doc = root.document;
  var app = doc.getElementById('lernreise-app');
  if (!app) return;
  doc.documentElement.classList.add('lr-js');

  var liste = doc.getElementById('lernreise-liste');
  var knopf = doc.getElementById('lernreise-offerte');
  var weg = doc.getElementById('lernreise-weg');
  var fuellung = doc.getElementById('lernreise-fuellung');
  var steuerung = doc.getElementById('lernreise-steuerung');
  var wahl = { groesse: STANDARD.groesse, stand: STANDARD.stand, zeit: STANDARD.zeit };
  var reduziert = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Die gewählte Beispielreise geht als Ausgangspunkt ins Kontaktformular
     (kontakt.js liest 'vaiacon-lernreise' und füllt die Nachricht vor). */
  knopf.addEventListener('click', function () {
    try {
      /* Aus Sicht des Betriebs geschrieben, nicht als Beschreibung der Beispielreise. */
      var L = stationen(wahl);
      root.sessionStorage.setItem('vaiacon-lernreise', [
        'Unser Betrieb: ' + GROESSE[wahl.groesse].satz + ' Mitarbeitende',
        'Stand bei KI: ' + STAND[wahl.stand].label.replace(/\u00a0/g, ' '),
        'Zeit zum Lernen: ' + ZEIT[wahl.zeit].woche,
        'Ausgangspunkt: Ihre Beispielreise, etwa ' + wochen(wahl) + ' Wochen mit ' + L.length + ' Stationen (' +
          L.map(function (st) { return st.titel; }).join(', ') + ')'
      ].join('\n'));
    } catch (e) { /* ohne Speicher landet man einfach im leeren Formular */ }
  });

  function neuBauen(sanft) {
    liste.innerHTML = bauen(wahl);
    knopf.setAttribute('href', 'kontakt#formular');
    if (sanft && !reduziert) {
      liste.classList.remove('lr-umgestellt');
      void liste.offsetWidth;
      liste.classList.add('lr-umgestellt');
    }
    messen();
  }

  var wartet = false;
  function messen() {
    if (!weg) return;
    if (reduziert) { fuellung.style.height = ''; wartet = false; return; }
    var items = liste.querySelectorAll('[data-station]');
    var r = weg.getBoundingClientRect();
    var linie = root.innerHeight * 0.6;               /* Marke auf 60 % der Fensterhöhe */
    var hoehe = Math.max(0, Math.min(r.height, linie - r.top));
    fuellung.style.height = hoehe + 'px';
    for (var i = 0; i < items.length; i++) {
      var k = items[i].querySelector('.lr-station__knoten').getBoundingClientRect();
      var mitte = k.top + k.height / 2;
      items[i].classList.toggle('is-erreicht', mitte <= linie);
    }
    wartet = false;
  }
  function beiScroll() { if (!wartet) { wartet = true; root.requestAnimationFrame(messen); } }

  /* Reihenfolge bleibt wie im Dokument: erst die Gruppe markieren, dann bauen */
  function markieren() {
    Array.prototype.forEach.call(steuerung.querySelectorAll('input[type=radio]'), function (r) {
      r.checked = wahl[r.name] === r.value;
    });
  }
  steuerung.addEventListener('change', function (e) {
    var t = e.target;
    if (t && t.type === 'radio' && wahl.hasOwnProperty(t.name)) {
      wahl[t.name] = t.value;
      neuBauen(true);
    }
  });

  steuerung.hidden = false;
  markieren();
  neuBauen(false);
  root.addEventListener('scroll', beiScroll, { passive: true });
  root.addEventListener('resize', beiScroll);
  root.addEventListener('load', messen);
})(typeof window !== 'undefined' ? window : this);
