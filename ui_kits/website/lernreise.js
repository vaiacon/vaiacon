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
    mikro: 'faq-tablet',
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
    mikro: 'Der vaiacon-Roboter mit Tablet und erhobenem Finger',
    vorort: 'Der vaiacon-Roboter mit Koffer und Namensschild unterwegs zum Betrieb',
    coaching: 'Der vaiacon-Roboter sitzt mit einer Tasse auf einem Hocker und erklärt',
    wirkung: 'Der vaiacon-Roboter am Schreibtisch'
  };

  var GROESSE = {
    klein: { label: 'bis 10', gruppen: 1 },
    mittel: { label: '11 bis 20', gruppen: 1 },
    gross: { label: '21 bis 30', gruppen: 2 }
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
    'kk-mikro-lerneinheiten': { name: 'Kleinst-Lerneinheiten', href: '#format-mikro' },
    'kk-change-begleitung': { name: 'Change-Begleitung', href: '#format-change' },
    'kk-begleitung-vor-ort': { name: 'Begleitung vor Ort', href: '#format-vor-ort' }
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Die Stationen für eine Auswahl. Reine Funktion, ohne DOM. */
  function stationen(a) {
    var g = GROESSE[a.groesse], s = a.stand, z = ZEIT[a.zeit];
    var klein = a.groesse === 'klein', gross = a.groesse === 'gross';
    var L = [];

    L.push({
      bild: 'standort', rolle: 'Standort', titel: 'Standortbestimmung',
      text: s === 'kaum'
        ? 'Die Führung beantwortet zwölf kurze Fragen. Sie sehen, wo Ihr Betrieb steht, und wir sehen, wo ein Anfang am meisten bringt.'
        : 'Die Führung beantwortet zwölf kurze Fragen. So wird sichtbar, was schon trägt und wo das Team auseinanderläuft.',
      formate: ['standort'], ids: []
    });

    if (klein) {
      L.push({
        bild: 'auftakt', rolle: 'Auftakt', titel: 'Auftakt mit der Geschäftsleitung',
        text: 'In zwei Stunden klären wir, was Sie erreichen wollen und welche Regeln im Betrieb gelten sollen. In einem kleinen Team genügt dafür ein Gespräch.',
        formate: ['kk-coaching-fuehrung'], ids: ['kk-coaching-fuehrung']
      });
    } else {
      L.push({
        bild: 'auftakt', rolle: 'Auftakt', titel: 'Auftakt mit der Führung',
        text: 'Die Leitung klärt Ziel, Rollen und Spielregeln, bevor das Team startet. Wir begleiten das Gespräch und sagen, was wir aus anderen Betrieben kennen.',
        formate: ['kk-change-begleitung'], ids: ['kk-change-begleitung']
      });
    }

    if (s === 'kaum') {
      L.push({
        bild: 'training', rolle: 'Training', titel: 'Training im Team' + (gross ? ' (zwei Gruppen)' : ''),
        text: 'Ein ganzer Tag, bei Ihnen im Betrieb, an Ihren eigenen Aufgaben: vom ersten Gespräch mit einem Assistenten bis zu Vorlagen, die danach bleiben.',
        formate: ['kk-training-tag'], ids: ['kk-training-tag']
      });
    } else if (s === 'einzelne') {
      L.push({
        bild: 'training', rolle: 'Training', titel: 'Training im Team' + (gross ? ' (zwei Gruppen)' : ''),
        text: 'Ein halber Tag, in dem alle auf denselben Stand kommen. Was die Einzelnen schon gefunden haben, wird zum gemeinsamen Wissen.',
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
        text: 'Was Ihre Vorreiter schon gut können, wird zu einem kurzen Video. Neue Mitarbeitende holen es später jederzeit ab.',
        formate: ['kk-lernvideo'], ids: ['kk-lernvideo']
      });
    }

    L.push({
      bild: 'mikro', rolle: 'Täglich', titel: 'Tägliche Kleinst-Lerneinheiten',
      text: 'Jeden Arbeitstag ' + z.taeglich + ': ein Tipp, eine Übung am eigenen Fall, eine Frage vom Roboter. Vier Wochen lang, direkt am Arbeitsplatz oder auf dem Smartphone.',
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
      text: (gross ? 'Zwei Tage, ' : 'Ein Tag, ') + 'an dem wir bei Ihnen sitzen. Wir helfen dort, wo es im Alltag hakt, und beantworten die Fragen, die im Training nicht aufkamen.',
      formate: ['kk-begleitung-vor-ort'], ids: ['kk-begleitung-vor-ort']
    });

    L.push({
      bild: 'coaching', rolle: 'Coaching', titel: 'Coaching der Führungskräfte',
      text: 'In Einzelgesprächen geht es um das, was Führung jetzt anders macht: Wer entscheidet was, wie sprechen Sie über KI im Team, wo setzen Sie Grenzen.',
      formate: ['kk-coaching-fuehrung'], ids: ['kk-coaching-fuehrung']
    });

    L.push({
      bild: 'wirkung', rolle: 'Wirkung', titel: 'Wirkung prüfen und nachschärfen',
      text: 'Die Führung beantwortet die Standortbestimmung noch einmal. Wir vergleichen, hören auf das Team und stellen die nächsten Wochen darauf ein.',
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
    return 'Beispielreise für einen Betrieb mit ' + GROESSE[a.groesse].label.replace(/^bis /, 'bis zu ') + ' Mitarbeitenden · Ausgangslage: ' +
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
      h += '<li class="lr-station lr-station--' + seite + '" data-station>' +
        '<div class="lr-station__knoten" aria-hidden="true"><span>' + (i + 1) + '</span></div>' +
        '<article class="lr-station__karte">' +
          '<p class="lr-station__zeit">' + esc(wochenLabel(i, L.length, total)) + ' · ' + esc(st.rolle) + '</p>' +
          '<h3>' + esc(st.titel) + '</h3>' +
          '<p>' + esc(st.text) + '</p>' +
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
  var info = doc.getElementById('lernreise-info');
  var knopf = doc.getElementById('lernreise-offerte');
  var weg = doc.getElementById('lernreise-weg');
  var fuellung = doc.getElementById('lernreise-fuellung');
  var steuerung = doc.getElementById('lernreise-steuerung');
  var wahl = { groesse: STANDARD.groesse, stand: STANDARD.stand, zeit: STANDARD.zeit };
  var reduziert = root.matchMedia && root.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function neuBauen(sanft) {
    liste.innerHTML = bauen(wahl);
    info.textContent = zusammenfassung(wahl);
    knopf.setAttribute('href', offerteLink(wahl));
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
