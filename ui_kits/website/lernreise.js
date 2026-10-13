/* Lernreise (KI-Kompetenz, seit 04.10.2026)
   Baut die Beispielreise aus drei Angaben (Teamgrösse, Ausgangslage, Zeit)
   und baut daraus die Tafeln der Zeitleiste (lernreise-zeitleiste.js zeigt sie an,
   hört auf 'lernreise:gebaut'). Rein im Browser, kein Dienst, nichts wird
   gespeichert. Ohne JavaScript steht die feste Beispielreise im HTML (erzeugt
   mit derselben Funktion `bauen`; die Ziel-Tafel steht fest im HTML).

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
  /* Symbol je Rolle (assets/formate/*.webp, Stil der Branchen-Symbole), seit 2026-10-13 statt Roboter. */
  var SYMBOL = {
    standort: 'standort', auftakt: 'change', training: 'training', video: 'video', mikro: 'mikro',
    elearning: 'elearning', vorort: 'vor-ort', coaching: 'coaching', wirkung: 'standort'
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
  /* Die Lerneinheiten dauern immer gleich (Katalog kk-mikro-einrichtung:
     20 Einheiten à drei bis fünf Minuten). Mehr Zeit heisst nur: eine eigene
     Übungsstunde zusätzlich, ausdrücklich ausserhalb der Lerneinheiten. */
  var ZEIT = {
    z30: { label: 'rund 30 Minuten', woche: 'rund 30 Minuten pro Person und Woche', zusatz: '', extra: 2 },
    z60: { label: 'rund 1 Stunde', woche: 'rund eine Stunde pro Person und Woche', zusatz: '', extra: 0 },
    z120: { label: '2 Stunden und mehr', woche: 'zwei Stunden und mehr pro Person und Woche', zusatz: ' Dazu kommt eine eigene Übungsstunde pro Woche, ausserhalb der Lerneinheiten.', extra: -1 }
  };

  var STANDARD = { groesse: 'mittel', stand: 'einzelne', zeit: 'z60' };

  var FORMATE = {
    standort: { name: 'Standortbestimmung', href: '#standortbestimmung' },
    'kk-training-kurz': { name: 'KI-Einstieg, zwei Stunden', href: '#format-training' },
    'kk-training-halbtag': { name: 'Training, Halbtag', href: '#format-training' },
    'kk-training-tag': { name: 'Training, ganzer Tag', href: '#format-training' },
    'kk-coaching-fuehrung': { name: 'Coaching für Führungskräfte', href: '#format-coaching' },
    'kk-elearning-lernminute': { name: 'Online-Kurs nach Mass', href: '#format-elearning' },
    'kk-lernvideo': { name: 'Lernvideo', href: '#format-video' },
    'kk-mikro-lerneinheiten': { name: 'Kleine Lerneinheiten', href: '#format-mikro' },
    'kk-change-begleitung': { name: 'Veränderung begleiten', href: '#format-change' },
    'kk-begleitung-vor-ort': { name: 'Begleitung vor Ort', href: '#format-vor-ort' }
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Messpunkt im Auftakt: Ziel mit Messgrösse, Zielwert und Zeitpunkt. */
  function zieleText(s) {
    return 'Wir legen zwei bis drei messbare Ziele fest. Zum Beispiel: ' +
      (s === 'kaum' ? 'drei von vier im Team nutzen KI jede Woche' : s === 'einzelne' ? 'alle arbeiten mit denselben geprüften Vorlagen' : 'Offerten in der halben Zeit') +
      '. Zu jedem Ziel halten wir fest, woran wir es messen, welcher Wert gelten soll und bis wann.';
  }

  /* Die Stationen für eine Auswahl. Reine Funktion, ohne DOM. */
  function stationen(a) {
    var g = GROESSE[a.groesse], s = a.stand, z = ZEIT[a.zeit];
    var klein = a.groesse === 'klein', sehrgross = a.groesse === 'sehrgross', gross = a.groesse === 'gross' || sehrgross;
    var L = [];

    L.push({
      bild: 'standort', rolle: 'Standort', titel: 'Standortbestimmung',
      text: sehrgross
        ? 'Die Führung und, wo es passt, die Abteilungsleitungen machen drei Angaben zum Betrieb und beantworten zwölf kurze Fragen. So wird sichtbar, wo die Abteilungen stehen.'
        : s === 'kaum'
        ? 'Die Führung macht drei Angaben zum Betrieb und beantwortet zwölf kurze Fragen. Sie sehen, wo Ihr Betrieb steht, und wir sehen, wo ein Anfang am meisten bringt.'
        : 'Drei Angaben zu Ihrem Betrieb und zwölf kurze Fragen. So wird sichtbar, was schon funktioniert und wo es noch Unterstützung braucht.',
      mess: { art: 'Wo stehen wir?', text: 'Fragen Sie im Team: Wer nutzt KI, wofür und wie sicher? Messen Sie ausserdem, wie lange eine häufige Aufgabe heute dauert.' },
      formate: ['standort'], ids: []
    });

    if (klein) {
      L.push({
        bild: 'auftakt', rolle: 'Auftakt', titel: 'Auftakt mit der Geschäftsleitung',
        text: 'In zwei Stunden klären wir, was Sie erreichen wollen und welche Regeln im Betrieb gelten sollen. In einem kleinen Team genügt dafür ein Gespräch.',
        mess: { art: 'Ziele festlegen', text: zieleText(s) },
        formate: ['kk-coaching-fuehrung'], ids: ['kk-coaching-fuehrung']
      });
    } else {
      L.push({
        bild: 'auftakt', rolle: 'Auftakt', titel: 'Gespräch mit der Teamleitung',
        text: 'Die Teamleitung klärt Ziel, Rollen und Spielregeln, bevor das Team startet. Wir begleiten das Gespräch mit unserer Erfahrung.',
        mess: { art: 'Ziele festlegen', text: zieleText(s) },
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
        text: 'Was Ihre Mitarbeitenden bereits beherrschen, wird zu einem kurzen Video. Neue Mitarbeitende können das Video jederzeit ansehen und den Ablauf lernen.',
        formate: ['kk-lernvideo'], ids: ['kk-lernvideo']
      });
    }

    L.push({
      bild: 'mikro', rolle: 'Täglich', titel: 'Tägliche kleine Lerneinheiten',
      text: 'An 20 Arbeitstagen jeweils drei bis fünf Minuten: ein Tipp, eine Übung am eigenen Fall, eine kurze Kontrollfrage. Vier Wochen lang, am Arbeitsplatz oder auf dem Smartphone.' + z.zusatz,
      mess: { art: 'Zwischenstand', text: 'Die Antworten auf die tägliche Frage zeigen laufend, was sitzt. Nach zwei Wochen sehen Sie, wo das Team steht. Wir passen die Übungen dort an, wo noch Unterstützung nötig ist.' },
      formate: ['kk-mikro-lerneinheiten'], ids: ['kk-mikro-lerneinheiten']
    });

    if (gross) {
      L.push({
        bild: 'elearning', rolle: 'Online-Kurs', titel: 'Online-Kurs für alle',
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
      text: 'Nach den vier Wochen Lerneinheiten stellen wir dieselben Fragen wie zu Beginn, an die Führung und an das Team. Wir legen Vorher und Nachher nebeneinander.',
      mess: { art: 'Zielcheck', text: 'Jedes Ziel aus dem Auftakt bekommt ein Ergebnis: erreicht, teilweise oder offen. Was offen ist, wird zur nächsten Etappe.' },
      formate: ['standort'], ids: []
    });

    return L;
  }

  function wochen(a) {
    return Math.max(4, STAND[a.stand].wochen + ZEIT[a.zeit].extra);
  }

  /* Die Lerneinheiten laufen vier Wochen (Woche w bis w+3); gemessen wird
     nach dem Ende dieser Übungsphase («nach Woche …»). */
  function wochenLabel(i, n, total, rolle) {
    if (i === 0) return 'Woche 0';
    if (i === n - 1) return 'nach Woche ' + total;
    var w = Math.max(1, Math.round(total * (i / (n - 1))));
    if (rolle === 'Täglich') return 'Woche ' + w + '–' + Math.min(total, w + 3);
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

  /* HTML der Tafeln (ohne Ziel-Tafel). Gleiche Ausgabe im JS und im festen Beispiel. */
  function bauen(a, basis) {
    basis = basis || '';
    var L = stationen(a), total = wochen(a), h = '';
    L.forEach(function (st, i) {
      var chips = st.formate.map(function (k) {
        var f = FORMATE[k];
        return '<a class="lr-chip" href="' + f.href + '">' + esc(f.name) + '</a>';
      }).join('');
      var mess = st.mess
        ? '<div class="lz-mess"><p class="lz-mess__kopf"><span class="lz-fahne" aria-hidden="true"></span>Messpunkt · ' + esc(st.mess.art) + '</p><p>' + esc(st.mess.text) + '</p></div>'
        : '';
      h += '<article class="lz-tafel' + (st.mess ? ' lz-tafel--mess' : '') + '" data-station>' +
        '<figure class="lz-bild lz-bild--symbol"><span class="lz-bild__woche" aria-hidden="true">' + esc(wochenLabel(i, L.length, total, st.rolle)) + '</span>' +
          '<img src="' + basis + 'assets/formate/' + SYMBOL[st.bild] + '.webp?v=20261013" alt="" width="320" height="320" loading="lazy" decoding="async">' +
        '</figure>' +
        '<div class="lz-text">' +
          '<p class="lz-zeit"><span class="lz-zeit__nr">' + (i + 1) + '</span>' + esc(wochenLabel(i, L.length, total, st.rolle)) + ' · ' + esc(st.rolle) + '</p>' +
          '<h3>' + esc(st.titel) + '</h3>' +
          '<p>' + esc(st.text) + '</p>' +
          mess +
          (chips ? '<p class="lz-formate">' + chips + '</p>' : '') +
        '</div>' +
      '</article>';
    });
    return h;
  }

  var api = { stationen: stationen, bauen: bauen, ids: ids, offerteLink: offerteLink, zusammenfassung: zusammenfassung, STANDARD: STANDARD };
  if (typeof module !== 'undefined' && module.exports) { module.exports = api; return; }

  /* ── Ab hier nur im Browser ─────────────────────────────────────────── */
  var doc = root.document;
  var app = doc.getElementById('lernreise-app');
  if (!app) return;

  var tafeln = doc.getElementById('lernreise-tafeln');
  var knopf = doc.getElementById('lernreise-offerte');
  var wahl = { groesse: STANDARD.groesse, stand: STANDARD.stand, zeit: STANDARD.zeit };

  /* Die gewählte Beispielreise geht als Ausgangspunkt ins Kontaktformular
     (kontakt.js liest 'vaiacon-lernreise' und füllt die Nachricht vor). */
  if (knopf) knopf.addEventListener('click', function () {
    try {
      /* Aus Sicht des Betriebs geschrieben, nicht als Beschreibung der Beispielreise. */
      var L = stationen(wahl);
      root.sessionStorage.setItem('vaiacon-lernreise',
        'Ausgangspunkt: die Beispiel-Lernreise, etwa ' + wochen(wahl) + ' Wochen mit ' + L.length + ' Stationen (' +
          L.map(function (st) { return st.titel; }).join(', ') + ')');
    } catch (e) { /* ohne Speicher landet man einfach im leeren Formular */ }
  });

  /* Die Zeitleiste (lernreise-zeitleiste.js) hört auf 'lernreise:gebaut' und
     liest beim Start 'VaiaconLernreise.letzter' (dieses Skript läuft zuerst). */
  var api3d = {
    stationen: stationen, wochen: wochen, wochenLabel: wochenLabel,
    FORMATE: FORMATE, BILD: BILD, ALT: ALT,
    wahlLesen: function () { return wahl; },
    letzter: null
  };
  root.VaiaconLernreise = api3d;

  function neuBauen() {
    /* nur die Stationen ersetzen; die Ziel-Tafel steht fest im HTML */
    Array.prototype.forEach.call(tafeln.querySelectorAll('.lz-tafel:not(.lz-tafel--ziel)'), function (t) { t.parentNode.removeChild(t); });
    tafeln.insertAdjacentHTML('afterbegin', bauen(wahl));
    Array.prototype.forEach.call(doc.querySelectorAll('[data-lz-woche]'), function (el) { el.textContent = wochen(wahl); });
    if (knopf) knopf.setAttribute('href', 'kontakt#formular');
    var L = stationen(wahl);
    api3d.letzter = { wahl: wahl, stationen: L, total: wochen(wahl) };
    var ev;
    try { ev = new root.CustomEvent('lernreise:gebaut', { detail: api3d.letzter }); }
    catch (e) { ev = doc.createEvent('CustomEvent'); ev.initCustomEvent('lernreise:gebaut', false, false, api3d.letzter); }
    doc.dispatchEvent(ev);
  }

  /* Die Auswahl (Grösse, Stand, Zeit) gibt es seit 10.10.2026 nicht mehr – es gilt STANDARD. */
  neuBauen();
})(typeof window !== 'undefined' ? window : this);
