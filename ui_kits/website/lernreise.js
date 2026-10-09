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
    'kk-training-kurz': { name: 'KI-Einstieg, zwei Stunden', href: '#format-training' },
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

    if (s === 'kaum' && klein) {
      L.push({
        bild: 'training', rolle: 'Einstieg', titel: 'KI-Einstieg, zwei Stunden',
        text: 'Zwei Stunden bei Ihnen im Betrieb: was KI im Büro heute kann, an zwei Aufgaben aus Ihrem Alltag ausprobiert. Für ein kleines Team der günstigste Anfang.',
        formate: ['kk-training-kurz'], ids: ['kk-training-kurz']
      });
    } else if (s === 'kaum') {
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
  if (knopf) knopf.addEventListener('click', function () {
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
    geo = null;
    if (brettAn()) { aktiv = 0; brettBauen(); }
    knopf.setAttribute('href', 'kontakt#formular');
    if (sanft && !reduziert) {
      liste.classList.remove('lr-umgestellt');
      void liste.offsetWidth;
      liste.classList.add('lr-umgestellt');
    }
    messen();
  }

  /* ── Der kurvige Weg ───────────────────────────────────────────────────
     Ein SVG-Band läuft von Knoten zu Knoten (Kubikkurven mit senkrechten
     Tangenten, die Knoten sitzen abwechselnd links und rechts der Mitte).
     Die Bandbreite wächst nach unten (Strassen-Perspektive), darunter liegt
     ein weicher Schatten. Der gefahrene Teil wird beim Scrollen entlang der
     Pfadlänge gezeichnet (Randpunkte aus getPointAtLength, Mittellinie mit
     stroke-dashoffset), der Marker fährt per getPointAtLength mit. */
  var NS = 'http://www.w3.org/2000/svg';
  function el(n, a) { var e = doc.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
  var svg = null, geo = null;
  if (weg && fuellung) {
    svg = el('svg', { 'class': 'lr-pfad', 'aria-hidden': 'true', focusable: 'false' });
    svg.innerHTML =
      '<defs>' +
        '<filter id="lr-schatten" x="-20%" y="-5%" width="140%" height="110%"><feGaussianBlur stdDeviation="7"/></filter>' +
        '<linearGradient id="lr-verlauf" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#B25222"/><stop offset="1" stop-color="#E0803F"/></linearGradient>' +
      '</defs>' +
      '<polygon class="lr-pfad__schatten" filter="url(#lr-schatten)"/>' +
      '<polygon class="lr-pfad__band"/>' +
      '<path class="lr-pfad__mitte"/>' +
      '<polygon class="lr-pfad__gefahren" fill="url(#lr-verlauf)"/>' +
      '<path class="lr-pfad__spitze"/>' +
      '<circle class="lr-pfad__marker" r="7"/>';
    weg.insertBefore(svg, weg.firstChild);
  }

  function pfadBauen() {
    if (!svg) return;
    var items = liste.querySelectorAll('[data-station]');
    var r = weg.getBoundingClientRect();
    var H = r.height, W = r.width;
    if (!items.length || !H) { geo = null; return; }
    var P = [], i;
    for (i = 0; i < items.length; i++) {
      var k = items[i].querySelector('.lr-station__knoten').getBoundingClientRect();
      P.push({ x: k.left + k.width / 2 - r.left, y: k.top + k.height / 2 - r.top });
    }
    var d = 'M' + P[0].x.toFixed(1) + ' ' + Math.max(0, P[0].y - 36).toFixed(1) + ' L' + P[0].x.toFixed(1) + ' ' + P[0].y.toFixed(1);
    for (i = 1; i < P.length; i++) {
      var a = P[i - 1], b = P[i], m = (b.y - a.y) * 0.5;
      d += ' C' + a.x.toFixed(1) + ' ' + (a.y + m).toFixed(1) + ' ' + b.x.toFixed(1) + ' ' + (b.y - m).toFixed(1) + ' ' + b.x.toFixed(1) + ' ' + b.y.toFixed(1);
    }
    var last = P[P.length - 1];
    d += ' L' + last.x.toFixed(1) + ' ' + Math.min(H, last.y + 36).toFixed(1);

    svg.setAttribute('viewBox', '0 0 ' + W.toFixed(1) + ' ' + H.toFixed(1));
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    var mitte = svg.querySelector('.lr-pfad__mitte'), spitze = svg.querySelector('.lr-pfad__spitze');
    mitte.setAttribute('d', d); spitze.setAttribute('d', d);
    var Ltot = mitte.getTotalLength();

    /* Perspektive: Halbbreite wächst von oben (hinten) nach unten (vorne) */
    var schmal = W < 560;
    var wOben = schmal ? 5 : 11, wUnten = schmal ? 13 : 30;
    var n = Math.max(40, Math.round(Ltot / 14)), S = [];
    for (i = 0; i <= n; i++) {
      var L = Ltot * i / n, p = mitte.getPointAtLength(L), q = mitte.getPointAtLength(Math.min(Ltot, L + 1)), o = mitte.getPointAtLength(Math.max(0, L - 1));
      var tx = q.x - o.x, ty = q.y - o.y, tl = Math.sqrt(tx * tx + ty * ty) || 1;
      var nx = -ty / tl, ny = tx / tl, w = wOben + (wUnten - wOben) * (p.y / H);
      S.push({ L: L, x: p.x, y: p.y, lx: p.x + nx * w, ly: p.y + ny * w, rx: p.x - nx * w, ry: p.y - ny * w });
    }
    function rand(upTo) {
      var links = [], rechts = [];
      for (var j = 0; j <= upTo; j++) { links.push(S[j].lx.toFixed(1) + ',' + S[j].ly.toFixed(1)); rechts.unshift(S[j].rx.toFixed(1) + ',' + S[j].ry.toFixed(1)); }
      return links.concat(rechts).join(' ');
    }
    var voll = rand(n);
    svg.querySelector('.lr-pfad__band').setAttribute('points', voll);
    var sch = svg.querySelector('.lr-pfad__schatten');
    sch.setAttribute('points', voll); sch.setAttribute('transform', 'translate(0 9)');
    var vl = svg.querySelector('#lr-verlauf'); vl.setAttribute('y2', H);
    spitze.setAttribute('stroke-dasharray', Ltot);
    geo = { S: S, n: n, rand: rand, Ltot: Ltot, mitte: mitte, spitze: spitze,
            gef: svg.querySelector('.lr-pfad__gefahren'), marker: svg.querySelector('.lr-pfad__marker') };
  }

  /* Pfadlänge, bei der der Weg die Marke (y im Weg) erreicht */
  function laengeBei(y) {
    var S = geo.S, j;
    if (y <= S[0].y) return 0;
    for (j = 1; j < S.length; j++) {
      if (S[j].y >= y) {
        var t = (y - S[j - 1].y) / ((S[j].y - S[j - 1].y) || 1);
        return S[j - 1].L + (S[j].L - S[j - 1].L) * t;
      }
    }
    return geo.Ltot;
  }
  function zeichnen(len) {
    if (!geo) return;
    var S = geo.S, idx = 0;
    while (idx < S.length - 1 && S[idx + 1].L <= len) idx++;
    geo.gef.setAttribute('points', len <= 0 ? '' : geo.rand(idx));
    geo.spitze.setAttribute('stroke-dashoffset', geo.Ltot - len);
    var p = geo.mitte.getPointAtLength(Math.min(len, geo.Ltot));
    geo.marker.setAttribute('cx', p.x); geo.marker.setAttribute('cy', p.y);
    geo.marker.style.opacity = len > 0 && len < geo.Ltot ? 1 : 0;
  }

  var wartet = false;
  function messen() {
    if (!weg || brettAn()) { wartet = false; return; }
    var items = liste.querySelectorAll('[data-station]');
    var r = weg.getBoundingClientRect();
    var linie = root.innerHeight * 0.6;               /* Marke auf 60 % der Fensterhöhe */
    if (!geo || Math.abs(geo.H - r.height) > 1 || geo.W !== r.width) { pfadBauen(); if (geo) { geo.H = r.height; geo.W = r.width; } }
    if (reduziert) {
      if (geo) zeichnen(geo.Ltot);
      wartet = false; return;
    }
    if (geo) zeichnen(laengeBei(Math.max(0, Math.min(r.height, linie - r.top))));
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

  /* ── Das Spielbrett (Desktop) ─────────────────────────────────────────
     Ab 761 px ersetzt eine kompakte Schein-3D-Strasse die lange Liste:
     drei Bahnen von vorn (breit) nach hinten (schmal), Start unten links,
     Ziel oben rechts. Der 3D-Eindruck entsteht nur im SVG (Breite nach
     Tiefe, Seitenfläche, Schatten); die Halte sind scharfe HTML-Buttons.
     Unter 761 px und ohne JS bleibt die senkrechte Liste. */
  var VB_W = 1000, VB_H = 600;
  var STRASSE = 'M170 490 L840 490 C960 490 960 325 840 325 L230 325 C110 325 110 170 230 170 L850 170';
  var mq = root.matchMedia ? root.matchMedia('(min-width: 761px)') : null;
  var brett = null, aktiv = 0, halte = [], laengen = [], bR = null, aktuell = 0, raf = 0;

  function brettAn() { return !!(mq && mq.matches); }
  function halbBreite(y) { return 8 + 28 * (y / VB_H); }          /* nah = breit */
  function f1(v) { return v.toFixed(1); }

  function startSVG() {
    return '<g class="lr-start" transform="translate(100 512) scale(1.05)">' +
      '<ellipse cx="0" cy="2" rx="62" ry="10" class="lr-f-schatten"/>' +
      '<rect x="-34" y="-80" width="8" height="82" rx="4" class="lr-f-holz"/>' +
      '<rect x="26" y="-80" width="8" height="82" rx="4" class="lr-f-holz"/>' +
      '<rect x="-58" y="-112" width="116" height="48" rx="16" class="lr-f-terra lr-s-holz"/>' +
      '<rect x="-52" y="-106" width="104" height="36" rx="12" class="lr-f-orange"/>' +
      '<text x="-14" y="-80" text-anchor="middle" dominant-baseline="central" class="lr-t-schild lr-t-schild--start">START</text>' +
      '<path d="M30 -94 L44 -88 L30 -82 Z" class="lr-f-creme"/>' +
      '<path d="M0 -112 L0 -138" class="lr-s-holz" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M2 -138 L30 -130 L2 -122 Z" class="lr-f-terra"/>' +
      '</g>';
  }
  function zielSVG() {
    var k = '', r, c, x, y;
    for (r = 0; r < 4; r++) for (c = 0; c < 6; c++) {
      x = c * 11; y = r * 11 + Math.sin(c * 0.9) * 3;
      k += '<rect x="' + x + '" y="' + f1(y) + '" width="11" height="11" class="' + ((r + c) % 2 ? 'lr-f-creme' : 'lr-f-holz') + '"/>';
    }
    return '<g class="lr-ziel" transform="translate(905 182) scale(0.92)">' +
      '<ellipse cx="0" cy="2" rx="50" ry="8" class="lr-f-schatten"/>' +
      '<rect x="-4" y="-124" width="8" height="126" rx="4" class="lr-f-holz"/>' +
      '<circle cx="0" cy="-128" r="8" class="lr-f-orange lr-s-holz"/>' +
      '<g transform="translate(4 -122)"><rect x="-2" y="-2" width="70" height="48" rx="6" class="lr-f-holz"/>' + k + '</g>' +
      '<rect x="-44" y="-30" width="88" height="30" rx="12" class="lr-f-terra lr-s-holz" transform="translate(0 0)"/>' +
      '<text x="0" y="-15" text-anchor="middle" dominant-baseline="central" class="lr-t-schild lr-t-schild--klein">ZIEL</text>' +
      '</g>';
  }

  function brettGeruest() {
    brett = doc.createElement('div');
    brett.className = 'lr-brett';
    brett.innerHTML =
      '<div class="lr-brett__buehne" id="lernreise-buehne">' +
        '<svg class="lr-strasse" viewBox="0 0 ' + VB_W + ' ' + VB_H + '" aria-hidden="true" focusable="false">' +
          '<defs>' +
            '<filter id="lr-b-schatten" x="-10%" y="-10%" width="120%" height="130%"><feGaussianBlur stdDeviation="9"/></filter>' +
            '<linearGradient id="lr-b-verlauf" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="' + VB_H + '">' +
              '<stop offset="0" style="stop-color:var(--terra-500)"/><stop offset="1" style="stop-color:var(--orange-500)"/></linearGradient>' +
          '</defs>' +
          '<polygon class="lr-b-schatten" filter="url(#lr-b-schatten)"/>' +
          '<polygon class="lr-b-seite"/>' +
          '<polygon class="lr-b-band"/>' +
          '<path class="lr-b-mitte"/>' +
          '<polygon class="lr-b-gefahren" fill="url(#lr-b-verlauf)"/>' +
          '<ellipse class="lr-b-marker" rx="30" ry="12"/>' +
          zielSVG() + startSVG() +
        '</svg>' +
        '<div class="lr-brett__halte"></div>' +
      '</div>' +
      '<div class="lr-brett__nav">' +
        '<button type="button" class="lr-pfeil lr-pfeil--zurueck" aria-label="Vorherige Station"><span aria-hidden="true">‹</span> Zurück</button>' +
        '<p class="lr-brett__zaehler" aria-hidden="true"></p>' +
        '<button type="button" class="lr-pfeil lr-pfeil--weiter" aria-label="Nächste Station">Weiter <span aria-hidden="true">›</span></button>' +
      '</div>' +
      '<div class="lr-detail" aria-live="polite" aria-atomic="true"></div>';
    weg.appendChild(brett);

    /* Geometrie einmal berechnen (Strasse hängt nicht von der Wahl ab) */
    var mitte = brett.querySelector('.lr-b-mitte');
    mitte.setAttribute('d', STRASSE);
    var Ltot = mitte.getTotalLength(), n = Math.round(Ltot / 8), S = [], i;
    for (i = 0; i <= n; i++) {
      var L = Ltot * i / n, p = mitte.getPointAtLength(L), q = mitte.getPointAtLength(Math.min(Ltot, L + 1)), o = mitte.getPointAtLength(Math.max(0, L - 1));
      var tx = q.x - o.x, ty = q.y - o.y, tl = Math.sqrt(tx * tx + ty * ty) || 1, w = halbBreite(p.y);
      var g = w * 0.62;
      S.push({ L: L, x: p.x, y: p.y, lx: p.x - ty / tl * w, ly: p.y + tx / tl * w, rx: p.x + ty / tl * w, ry: p.y - tx / tl * w,
               glx: p.x - ty / tl * g, gly: p.y + tx / tl * g, grx: p.x + ty / tl * g, gry: p.y - tx / tl * g });
    }
    function rand(bis, schmal) {
      var l = [], r = [], a = schmal ? 'g' : '';
      for (var j = 0; j <= bis; j++) {
        l.push(f1(S[j][a + 'lx']) + ',' + f1(S[j][a + 'ly'])); r.unshift(f1(S[j][a + 'rx']) + ',' + f1(S[j][a + 'ry']));
      }
      return l.concat(r).join(' ');
    }
    var voll = rand(n);
    brett.querySelector('.lr-b-band').setAttribute('points', voll);
    var seite = brett.querySelector('.lr-b-seite'); seite.setAttribute('points', voll); seite.setAttribute('transform', 'translate(0 10)');
    var sch = brett.querySelector('.lr-b-schatten'); sch.setAttribute('points', voll); sch.setAttribute('transform', 'translate(0 20)');
    bR = { S: S, n: n, rand: rand, Ltot: Ltot, mitte: mitte,
           gef: brett.querySelector('.lr-b-gefahren'), marker: brett.querySelector('.lr-b-marker') };

    brett.querySelector('.lr-pfeil--zurueck').addEventListener('click', function () { gehZu(aktiv - 1); });
    brett.querySelector('.lr-pfeil--weiter').addEventListener('click', function () { gehZu(aktiv + 1); });
    brett.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); gehZu(aktiv - 1, true); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); gehZu(aktiv + 1, true); }
    });
    brett.querySelector('.lr-brett__halte').addEventListener('click', function (e) {
      var b = e.target.closest ? e.target.closest('.lr-halt') : null;
      if (b) gehZu(+b.getAttribute('data-nr'));
    });
  }

  function zeichneFahrt(len) {
    var S = bR.S, idx = 0;
    while (idx < S.length - 1 && S[idx + 1].L <= len) idx++;
    bR.gef.setAttribute('points', len <= 0 ? '' : bR.rand(idx, true));
    var p = bR.mitte.getPointAtLength(Math.min(len, bR.Ltot));
    bR.marker.setAttribute('cx', f1(p.x)); bR.marker.setAttribute('cy', f1(p.y + 2));
    var w = halbBreite(p.y);
    bR.marker.setAttribute('rx', f1(w * 1.5)); bR.marker.setAttribute('ry', f1(w * 0.55));
  }
  function fahre(ziel) {
    var von = aktuell;
    if (root.cancelAnimationFrame) root.cancelAnimationFrame(raf);
    if (reduziert || von === ziel || !root.requestAnimationFrame) { aktuell = ziel; zeichneFahrt(ziel); return; }
    var t0 = null;
    function schritt(t) {
      if (t0 === null) t0 = t;
      var k = Math.min(1, (t - t0) / 700); k = 1 - Math.pow(1 - k, 3);
      aktuell = von + (ziel - von) * k; zeichneFahrt(aktuell);
      if (k < 1) raf = root.requestAnimationFrame(schritt);
    }
    raf = root.requestAnimationFrame(schritt);
  }

  function detailHtml(st, i, L) {
    var chips = st.formate.map(function (k) {
      var f = FORMATE[k];
      return '<a class="lr-chip" href="' + f.href + '">' + esc(f.name) + '</a>';
    }).join('');
    var mess = st.mess
      ? '<div class="lr-mess"><p class="lr-mess__art">Messpunkt · ' + esc(st.mess.art) + '</p><p>' + esc(st.mess.text) + '</p></div>'
      : '';
    return '<p class="lr-detail__zeit">' + esc(wochenLabel(i, L.length, wochen(wahl))) + ' · ' + esc(st.rolle) + '</p>' +
      '<h3>' + esc(st.titel) + '</h3><p class="lr-detail__text">' + esc(st.text) + '</p>' + mess +
      (chips ? '<p class="lr-detail__formate">' + chips + '</p>' : '');
  }

  function gehZu(i, fokus) {
    var n = halte.length;
    if (!n) return;
    i = Math.max(0, Math.min(n - 1, i));
    var wechsel = i !== aktiv;
    aktiv = i;
    var L = stationen(wahl);
    halte.forEach(function (h, j) {
      h.classList.toggle('is-aktiv', j === i);
      h.classList.toggle('is-erreicht', j < i);
      if (j === i) h.setAttribute('aria-current', 'step'); else h.removeAttribute('aria-current');
    });
    var d = brett.querySelector('.lr-detail');
    d.innerHTML = detailHtml(L[i], i, L);
    if (wechsel && !reduziert) { d.classList.remove('lr-detail--ein'); void d.offsetWidth; d.classList.add('lr-detail--ein'); }
    brett.querySelector('.lr-brett__zaehler').textContent = 'Station ' + (i + 1) + ' von ' + n;
    brett.querySelector('.lr-pfeil--zurueck').disabled = i === 0;
    brett.querySelector('.lr-pfeil--weiter').disabled = i === n - 1;
    fahre(laengen[i]);
    if (fokus && halte[i]) halte[i].focus({ preventScroll: true });
  }

  function brettBauen() {
    if (!weg || !mq) return;
    weg.classList.add('lr-weg--brett');
    if (!brett) brettGeruest();
    var L = stationen(wahl), n = L.length, hh = brett.querySelector('.lr-brett__halte'), h = '', i;
    laengen = [];
    var pts = [];
    for (i = 0; i < n; i++) {
      var len = bR.Ltot * (0.045 + 0.905 * (n > 1 ? i / (n - 1) : 0));
      var p = bR.mitte.getPointAtLength(len);
      laengen.push(len); pts.push(p);
      var hoehe = 4.6 + 6.4 * (p.y / 490);                      /* in cqw: vorn gross, hinten klein */
      var nm = BILD[L[i].bild];
      h += '<button type="button" class="lr-halt' + (L[i].mess ? ' lr-halt--mess' : '') + '" data-nr="' + i + '"' +
        ' aria-label="Station ' + (i + 1) + ': ' + esc(L[i].titel) + '"' +
        ' style="left:' + f1(p.x / VB_W * 100) + '%;top:' + f1(p.y / VB_H * 100) + '%;z-index:' + Math.round(p.y) + ';--lr-h:' + hoehe.toFixed(2) + '">' +
        '<span class="lr-halt__bild"><picture>' +
          '<source srcset="assets/vaiacon-buerobot-' + nm + '.webp" type="image/webp">' +
          '<img src="assets/vaiacon-buerobot-' + nm + '.png" alt="" decoding="async">' +
        '</picture></span>' +
        '<span class="lr-halt__knoten"><span>' + (i + 1) + '</span></span>' +
      '</button>';
    }
    hh.innerHTML = h;
    halte = Array.prototype.slice.call(hh.querySelectorAll('.lr-halt'));
    aktiv = Math.max(0, Math.min(n - 1, aktiv));
    aktuell = laengen[aktiv];
    gehZu(aktiv);
    aktuell = laengen[aktiv]; zeichneFahrt(aktuell);
  }

  function modus() {
    var an = brettAn();
    if (an && brett && weg.classList.contains('lr-weg--brett')) return;   /* schon gebaut */
    weg.classList.toggle('lr-weg--brett', an);
    if (an) { brettBauen(); } else { geo = null; messen(); }
  }
  if (mq) {
    if (mq.addEventListener) mq.addEventListener('change', modus); else if (mq.addListener) mq.addListener(modus);
  }

  steuerung.hidden = false;
  markieren();
  neuBauen(false);
  modus();
  /* ?sicht=brett (&station=N): springt zur Lernreise, nützlich für Vorschauen */
  try {
    var qs = root.location.search;
    if (/[?&]sicht=brett/.test(qs) && weg) {
      var m = /[?&]station=(\d+)/.exec(qs);
      if (m && brettAn()) { gehZu(+m[1] - 1); if (root.cancelAnimationFrame) root.cancelAnimationFrame(raf); aktuell = laengen[aktiv]; zeichneFahrt(aktuell); }
      weg.scrollIntoView({ block: 'start' });
    }
  } catch (e) { /* nur Komfort */ }
  root.addEventListener('scroll', beiScroll, { passive: true });
  root.addEventListener('resize', beiScroll);
  root.addEventListener('load', messen);
  if (root.ResizeObserver && weg) new root.ResizeObserver(function () { geo = null; beiScroll(); }).observe(liste);
})(typeof window !== 'undefined' ? window : this);
