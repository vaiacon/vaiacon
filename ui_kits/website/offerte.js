/* Offerte-Werkzeug: Beschreibung in Worten (Katalog nur noch im Hintergrund), Kontakt, Offerte vom Dienst anzeigen.

   Ablauf: Katalog laden (daten/preise.json) → Auswahl → Kontakt → POST
   /api/offerte → Offerte als Dokument. Die Zahlen im Ergebnis stammen
   ausschliesslich aus der Antwort des Dienstes; die Summe in der Seitenleiste
   ist nur eine Vorschau aus demselben Katalog.

   Probe: ?probe=1 liefert .bau/proben/offerte-antwort.json statt des Dienstes,
   ?probe=fehler spielt einen Ausfall durch (auch ?probe=429 und ?probe=400).

   Texte aus der Antwort werden nur als Text eingesetzt (textContent). */
(function () {
  'use strict';

  var API = (window.VAIACON_API_BASIS || '') + '/api/offerte';
  var KATALOG = 'daten/preise.json';
  var PROBE_DATEI = '.bau/proben/offerte-antwort.json';
  var SPEICHER = 'vaiacon-offerte-auswahl';
  var MAIL = 'hallo@vaiacon.ch';
  var ZEITLIMIT = 45000;

  var probe = '';
  try { probe = new URLSearchParams(location.search).get('probe') || ''; } catch (e) { /* ohne */ }

  var $ = function (id) { return document.getElementById(id); };
  var ansichten = {};
  [].forEach.call(document.querySelectorAll('[data-ansicht]'), function (a) { ansichten[a.getAttribute('data-ansicht')] = a; });
  if (!ansichten.auswahl) return;

  var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── Zustand ─────────────────────────────────────────────────────────────
  var katalog = null;          // geladener Katalog
  var positionen = {};         // id -> {pos, bereich}
  var auswahl = {};            // id -> {menge, notiz}
  var wunsch = '';
  var kontakt = { name: '', firma: '', mail: '', telefon: '' };
  var laufende = null;         // AbortController der laufenden Anfrage

  // ── Hilfen ──────────────────────────────────────────────────────────────
  function el(tag, attrs, kinder) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'text') e.textContent = attrs[k];
      else if (k === 'class') e.className = attrs[k];
      else if (attrs[k] === true) e.setAttribute(k, '');
      else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    (kinder || []).forEach(function (c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }

  function zahl(n) {
    n = Number(n);
    if (!isFinite(n)) return '0';
    var ganz = Math.abs(n % 1) < 0.005;
    var s = (ganz ? Math.round(Math.abs(n)) : Math.abs(n).toFixed(2)).toString();
    var teile = s.split('.');
    teile[0] = teile[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    return (n < 0 ? '-' : '') + teile.join('.');
  }
  function chf(n) { return 'CHF ' + zahl(n); }
  function prozent(n) { return String(n).replace('.', ','); }

  function preisText(p) {
    return (p.ab ? 'ab ' : '') + chf(p.preis) + ' ' + p.einheit;
  }

  function datum(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
    return m ? m[3] + '.' + m[2] + '.' + m[1] : String(iso || '');
  }

  function begrenzen(menge, pos) {
    var max = pos.menge_waehlbar ? (Number(pos.menge_max) || 1) : 1;
    var m = Math.round(Number(menge));
    if (!isFinite(m) || m < 1) m = 1;
    return Math.min(m, max);
  }

  // ── Ansichten ───────────────────────────────────────────────────────────
  var aktuelle = 'auswahl';
  function zeige(name, fokus) {
    aktuelle = name;
    Object.keys(ansichten).forEach(function (k) { ansichten[k].hidden = (k !== name); });
    document.body.classList.toggle('of-leiste', name === 'auswahl' && !!katalog && !!$('of-katalog'));
    if (fokus === false) return;
    var titel = ansichten[name].querySelector('[tabindex="-1"]');
    var oben = ansichten[name].getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: Math.max(0, oben), behavior: reduziert ? 'auto' : 'smooth' });
    if (titel) titel.focus({ preventScroll: true });
  }

  // ── Speicher (nur Auswahl, nie Kontaktdaten) ────────────────────────────
  function sichern() {
    try { sessionStorage.setItem(SPEICHER, JSON.stringify({ auswahl: auswahl, wunsch: wunsch })); } catch (e) { /* ohne */ }
  }
  function laden() {
    try {
      var roh = sessionStorage.getItem(SPEICHER);
      if (!roh) return;
      var d = JSON.parse(roh);
      if (d && d.auswahl && typeof d.auswahl === 'object' && $('of-katalog')) {
        Object.keys(d.auswahl).forEach(function (id) {
          var p = positionen[id];
          if (!p) return;
          var a = d.auswahl[id] || {};
          auswahl[id] = { menge: begrenzen(a.menge, p.pos), notiz: String(a.notiz || '').slice(0, 500) };
        });
      }
      if (d && typeof d.wunsch === 'string') wunsch = d.wunsch.slice(0, 3000);
    } catch (e) { /* ohne */ }
  }

  // ── Katalog zeichnen ────────────────────────────────────────────────────
  function zeichneKatalog() {
    var platz = $('of-katalog');
    var chips = $('of-chips');
    if (!platz || !chips) return;
    platz.textContent = '';
    chips.textContent = '';

    katalog.bereiche.forEach(function (b) {
      var chip = el('a', { class: 'of-chip', href: '#' + b.id, 'data-chip': b.id }, [b.titel, el('span', { class: 'of-chip__n', 'data-n': b.id, 'aria-hidden': 'true' })]);
      chip.addEventListener('click', function (ev) {
        ev.preventDefault();
        springe(b.id);
      });
      chips.appendChild(chip);

      var abschnitt = el('section', { class: 'of-bereich', id: b.id, 'aria-labelledby': 'of-b-' + b.id });
      abschnitt.appendChild(el('h3', { class: 'of-bereich__titel', id: 'of-b-' + b.id, tabindex: '-1', text: b.titel }));
      if (b.kurz) abschnitt.appendChild(el('p', { class: 'of-bereich__kurz', text: b.kurz }));
      var liste = el('div', { class: 'of-liste' });
      b.positionen.forEach(function (p) { liste.appendChild(positionKarte(p)); });
      abschnitt.appendChild(liste);
      platz.appendChild(abschnitt);
    });
    chips.hidden = false;
    $('of-frei').hidden = false;
    $('of-summary').hidden = false;
    $('of-wunsch').value = wunsch;
    $('of-wunsch-n').textContent = String(wunsch.length);
    $('of-mwst').textContent = katalog.mwst_hinweis || '';
  }

  function positionKarte(p) {
    var id = p.id;
    var kid = 'of-p-' + id;
    var karte = el('div', { class: 'of-pos', 'data-id': id });

    var haken = el('input', { type: 'checkbox', id: kid, class: 'of-pos__haken', 'aria-describedby': kid + '-preis' });
    var kopf = el('label', { class: 'of-pos__kopf', for: kid }, [
      haken,
      el('span', { class: 'of-pos__box', 'aria-hidden': 'true' }),
      el('span', { class: 'of-pos__text' }, [
        el('span', { class: 'of-pos__titel', text: p.titel }),
        el('span', { class: 'of-pos__beschr', text: p.beschreibung }),
        el('span', { class: 'of-pos__preis', id: kid + '-preis', text: preisText(p) }),
        p.hinweis ? el('span', { class: 'of-pos__hinweis', text: p.hinweis }) : null
      ])
    ]);
    karte.appendChild(kopf);

    var extra = el('div', { class: 'of-pos__extra', hidden: true });
    var menge = null;
    if (p.menge_waehlbar) {
      var mid = kid + '-menge';
      var minus = el('button', { type: 'button', class: 'of-menge__knopf', 'aria-label': 'Menge verringern: ' + p.titel, text: '−' });
      var plus = el('button', { type: 'button', class: 'of-menge__knopf', 'aria-label': 'Menge erhöhen: ' + p.titel, text: '+' });
      menge = el('input', { type: 'number', id: mid, class: 'of-menge__feld', min: '1', max: String(p.menge_max), step: '1', inputmode: 'numeric', value: String(p.menge_standard || 1) });
      extra.appendChild(el('div', { class: 'of-menge' }, [
        el('label', { for: mid, class: 'of-menge__label', text: 'Menge' }),
        el('div', { class: 'of-menge__steuer' }, [minus, menge, plus]),
        el('span', { class: 'of-menge__einheit', text: p.einheit })
      ]));
      var setze = function (v) {
        if (!auswahl[id]) return;
        auswahl[id].menge = begrenzen(v, p);
        menge.value = String(auswahl[id].menge);
        aktualisiere();
      };
      minus.addEventListener('click', function () { setze((Number(menge.value) || 1) - 1); });
      plus.addEventListener('click', function () { setze((Number(menge.value) || 0) + 1); });
      menge.addEventListener('change', function () { setze(menge.value); });
      menge.addEventListener('input', function () {
        var v = Math.round(Number(menge.value));
        if (v >= 1 && auswahl[id]) { auswahl[id].menge = begrenzen(v, p); aktualisiere(true); }
      });
    }

    var nid = kid + '-notiz';
    var notiz = el('textarea', { id: nid, class: 'of-notiz__feld', maxlength: '500', rows: '3', 'aria-describedby': nid + '-z' });
    extra.appendChild(el('div', { class: 'of-notiz' }, [
      el('label', { for: nid, class: 'of-notiz__label', text: 'Was sollen wir dazu wissen?' }),
      notiz,
      el('span', { class: 'of-zaehler', id: nid + '-z', text: '0 von 500 Zeichen' })
    ]));
    notiz.addEventListener('input', function () {
      if (auswahl[id]) auswahl[id].notiz = notiz.value;
      $(nid + '-z').textContent = notiz.value.length + ' von 500 Zeichen';
      sichern();
    });
    karte.appendChild(extra);

    haken.addEventListener('change', function () {
      if (haken.checked) {
        auswahl[id] = { menge: begrenzen(p.menge_standard || 1, p), notiz: '' };
        if (menge) menge.value = String(auswahl[id].menge);
      } else {
        delete auswahl[id];
      }
      karteSync(id);
      aktualisiere();
      if (haken.checked && !reduziert) { /* Fokus bleibt am Häkchen */ }
    });
    return karte;
  }

  // Karte an den Zustand anpassen (Häkchen, Menge, Notiz)
  function karteSync(id) {
    var karte = document.querySelector('.of-pos[data-id="' + id + '"]');
    if (!karte) return;
    var a = auswahl[id];
    var haken = karte.querySelector('.of-pos__haken');
    haken.checked = !!a;
    karte.classList.toggle('is-gewaehlt', !!a);
    karte.querySelector('.of-pos__extra').hidden = !a;
    if (a) {
      var m = karte.querySelector('.of-menge__feld');
      if (m) m.value = String(a.menge);
      var n = karte.querySelector('.of-notiz__feld');
      if (n && n.value !== a.notiz) {
        n.value = a.notiz;
        karte.querySelector('.of-zaehler').textContent = a.notiz.length + ' von 500 Zeichen';
      }
    }
  }

  function springe(id) {
    var ziel = document.getElementById(id);
    if (!ziel) return;
    var kopf = ziel.querySelector('[tabindex="-1"]');
    window.scrollTo({ top: ziel.getBoundingClientRect().top + window.pageYOffset - 96, behavior: reduziert ? 'auto' : 'smooth' });
    if (kopf) kopf.focus({ preventScroll: true });
  }

  // ── Zusammenfassung (Vorschau) ──────────────────────────────────────────
  function summen() {
    var s = { einmalig: 0, monatlich: 0, ab: false, anzahl: 0 };
    Object.keys(auswahl).forEach(function (id) {
      var p = positionen[id]; if (!p) return;
      var betrag = p.pos.preis * auswahl[id].menge;
      if (p.pos.art === 'monatlich') s.monatlich += betrag; else s.einmalig += betrag;
      if (p.pos.ab) s.ab = true;
      s.anzahl++;
    });
    return s;
  }

  function aktualisiere(nurSumme) {
    if (!katalog) return;
    var s = summen();
    var inkl = katalog.mwst_inklusive ? ('inkl. ' + (katalog.mwst_satz != null ? prozent(katalog.mwst_satz) + ' % ' : '') + 'MWST') : '';
    [].forEach.call(document.querySelectorAll('[data-inkl]'), function (e) { e.textContent = inkl; });
    $('of-summe-einmalig').textContent = (s.ab && s.einmalig ? 'ab ' : '') + chf(s.einmalig);
    $('of-summe-monat').textContent = (s.ab && s.monatlich && hatAb('monatlich') ? 'ab ' : '') + chf(s.monatlich);
    $('of-summe-ab').hidden = !s.ab;
    $('of-summary-anzahl').textContent = s.anzahl === 0 ? 'Nichts gewählt' : (s.anzahl === 1 ? '1 Position' : s.anzahl + ' Positionen');
    var kurz = chf(s.einmalig) + (s.monatlich ? ' + ' + chf(s.monatlich) + ' / Monat' : '');
    $('of-summary-kurz').textContent = kurz;

    var liste = $('of-summary-liste');
    liste.textContent = '';
    katalog.bereiche.forEach(function (b) {
      b.positionen.forEach(function (p) {
        var a = auswahl[p.id]; if (!a) return;
        var betrag = p.preis * a.menge;
        liste.appendChild(el('li', null, [
          el('span', { class: 'of-summary__name', text: (p.menge_waehlbar ? a.menge + ' × ' : '') + p.titel }),
          el('span', { class: 'of-summary__betrag', text: (p.ab ? 'ab ' : '') + chf(betrag) + (p.art === 'monatlich' ? ' / Monat' : '') })
        ]));
      });
    });
    $('of-summary-leer').hidden = s.anzahl > 0;

    katalog.bereiche.forEach(function (b) {
      var n = b.positionen.filter(function (p) { return auswahl[p.id]; }).length;
      var chip = document.querySelector('[data-n="' + b.id + '"]');
      if (chip) { chip.textContent = n ? String(n) : ''; chip.parentNode.classList.toggle('hat-auswahl', n > 0); }
    });
    if (!nurSumme) $('of-anfordern-meldung').textContent = '';
    sichern();
  }
  function hatAb(art) {
    return Object.keys(auswahl).some(function (id) { return positionen[id] && positionen[id].pos.art === art && positionen[id].pos.ab; });
  }

  // ── Vorwahl über die Adresse ────────────────────────────────────────────
  function vorwahl() {
    var v = '';
    try { v = new URLSearchParams(location.search).get('vorwahl') || ''; } catch (e) { /* ohne */ }
    v.split(',').forEach(function (id) {
      id = id.trim();
      var p = positionen[id];
      if (p && !auswahl[id]) auswahl[id] = { menge: begrenzen(p.pos.menge_standard || 1, p.pos), notiz: '' };
    });
  }
  function zumBereich() {
    var h = (location.hash || '').replace('#', '');
    if (h && $('of-katalog') && document.getElementById(h) && positionen && katalog.bereiche.some(function (b) { return b.id === h; })) {
      setTimeout(function () { springe(h); }, 60);
    }
  }

  // ── Anfordern → Kontakt ─────────────────────────────────────────────────
  function anfordern() {
    wunsch = $('of-wunsch').value;
    var s = summen();
    if (s.anzahl === 0 && wunsch.trim().length < 20) {
      var m = $('of-anfordern-meldung');
      m.textContent = wunsch.trim() ? 'Bitte beschreiben Sie Ihr Vorhaben in ein, zwei ganzen Sätzen.' : 'Bitte beschreiben Sie oben in Ihren Worten, was Sie vorhaben.';
      $('of-wunsch-fehler').textContent = m.textContent;
      $('of-wunsch').focus();
      return;
    }
    var teile = [];
    if (wunsch.trim()) teile.push('Ihre Beschreibung');
    if (s.anzahl) teile.push(s.anzahl === 1 ? '1 gewählte Position' : s.anzahl + ' gewählte Positionen');
    $('of-recap').textContent = 'Grundlage: ' + teile.join(' und ') + '.';
    ['name', 'firma', 'mail', 'telefon'].forEach(function (k) { $('of-' + k).value = kontakt[k]; });
    loescheFehler();
    $('of-form-meldung').textContent = '';
    zeige('kontakt');
  }

  // ── Eingaben prüfen ─────────────────────────────────────────────────────
  var FELDER = ['name', 'firma', 'mail', 'telefon', 'einwilligung'];
  function feldFehler(feld, text) {
    var f = $('of-' + feld + '-fehler');
    var i = $('of-' + feld);
    if (f) f.textContent = text || '';
    if (i) { if (text) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid'); }
  }
  function loescheFehler() { FELDER.forEach(function (f) { feldFehler(f, ''); }); }

  function pruefe() {
    var d = {
      name: $('of-name').value.trim(),
      firma: $('of-firma').value.trim(),
      mail: $('of-mail').value.trim(),
      telefon: $('of-telefon').value.trim()
    };
    var ersterFehler = null;
    function fehler(feld, text) { feldFehler(feld, text); if (!ersterFehler) ersterFehler = feld; }
    loescheFehler();
    if (!d.name) fehler('name', 'Bitte geben Sie Ihren Namen an.');
    else if (d.name.length > 120) fehler('name', 'Der Name ist etwas lang. Bitte kürzen Sie ihn auf 120 Zeichen.');
    if (d.firma.length > 160) fehler('firma', 'Bitte kürzen Sie den Firmennamen auf 160 Zeichen.');
    if (!d.mail) fehler('mail', 'Bitte geben Sie Ihre E-Mail-Adresse an.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.mail)) fehler('mail', 'Diese E-Mail-Adresse sieht nicht vollständig aus. Beispiel: name@firma.ch');
    var ziffern = d.telefon.replace(/\D/g, '');
    if (!d.telefon) fehler('telefon', 'Bitte geben Sie Ihre Telefonnummer an, damit wir Sie anrufen können.');
    else if (!/^[\d\s+()\-./]+$/.test(d.telefon) || ziffern.length < 7 || ziffern.length > 15) fehler('telefon', 'Diese Telefonnummer sieht nicht vollständig aus. Beispiel: 044 123 45 67');
    if (!$('of-einwilligung').checked) fehler('einwilligung', 'Bitte bestätigen Sie, dass wir Ihre Angaben für die Offerte verwenden dürfen.');
    kontakt = d;
    if (ersterFehler) {
      $('of-form-meldung').textContent = 'Bitte prüfen Sie die markierten Felder.';
      $('of-form-meldung').dataset.art = 'fehler';
      var ziel = $('of-' + ersterFehler); if (ziel) ziel.focus();
      return false;
    }
    $('of-form-meldung').textContent = '';
    return true;
  }

  // ── Senden ──────────────────────────────────────────────────────────────
  function nutzlast() {
    var liste = [];
    katalog.bereiche.forEach(function (b) {
      b.positionen.forEach(function (p) {
        var a = auswahl[p.id]; if (!a) return;
        var e = { id: p.id, menge: a.menge };
        if (a.notiz && a.notiz.trim()) e.notiz = a.notiz.trim().slice(0, 500);
        liste.push(e);
      });
    });
    return {
      auswahl: liste,
      wunsch: wunsch.trim().slice(0, 3000),
      kontakt: { name: kontakt.name, firma: kontakt.firma, mail: kontakt.mail, telefon: kontakt.telefon },
      einwilligung: true,
      fangfrage: (document.querySelector('[name="fangfrage"]') || {}).value || ''
    };
  }

  function pause(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function anfrage(daten) {
    if (probe) {
      return pause(1400).then(function () {
        if (probe === 'fehler') throw { art: 'netz' };
        if (probe === '429') throw { art: 'limit' };
        if (probe === '400') throw { art: 'eingabe', feld: 'kontakt.mail' };
        return fetch(PROBE_DATEI, { cache: 'no-store' }).then(function (r) {
          if (!r.ok) throw { art: 'netz' };
          return r.json();
        });
      });
    }
    laufende = typeof AbortController === 'function' ? new AbortController() : null;
    var zeit = setTimeout(function () { if (laufende) laufende.abort(); }, ZEITLIMIT);
    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(daten),
      signal: laufende ? laufende.signal : undefined
    }).then(function (r) {
      clearTimeout(zeit);
      if (r.ok) return r.json();
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (r.status === 400) throw { art: 'eingabe', feld: j && j.feld };
        if (r.status === 429) throw { art: 'limit' };
        throw { art: 'dienst' };
      });
    }, function () {
      clearTimeout(zeit);
      throw { art: 'netz' };
    });
  }

  var sendet = false;
  function senden(ev) {
    if (ev) ev.preventDefault();
    if (sendet) return;
    if (!pruefe()) return;
    sendet = true;
    var daten = nutzlast();
    var knopf = $('of-senden');
    knopf.disabled = true;
    zeige('laden');
    anfrage(daten).then(function (antwort) {
      if (!antwort || !Array.isArray(antwort.positionen)) throw { art: 'dienst' };
      zeigeErgebnis(antwort);
    }).catch(function (f) {
      f = f || { art: 'dienst' };
      if (f.art === 'eingabe') return eingabeFehler(f.feld);
      if (f.art === 'limit') {
        zeige('kontakt');
        var m = $('of-form-meldung');
        m.textContent = 'Kurz verschnaufen … Es sind gerade sehr viele Anfragen eingegangen. Bitte versuchen Sie es in ein bis zwei Minuten noch einmal. Ihre Eingaben bleiben erhalten.';
        m.dataset.art = 'hinweis';
        return;
      }
      zeigeAusfall();
    }).then(function () {
      sendet = false;
      knopf.disabled = false;
    });
  }

  function eingabeFehler(feld) {
    feld = String(feld || '').replace(/^kontakt\./, '');
    if (feld === 'auswahl' || feld === 'wunsch') {
      zeige('auswahl');
      var t = feld === 'wunsch' ? $('of-wunsch-fehler') : $('of-anfordern-meldung');
      t.textContent = feld === 'wunsch' ? 'Bitte beschreiben Sie Ihr Vorhaben in ein, zwei ganzen Sätzen.' : 'Mit dieser Auswahl konnte keine Offerte erstellt werden. Bitte prüfen Sie Ihre Angaben.';
      var z = feld === 'wunsch' ? $('of-wunsch') : null; if (z) z.focus();
      return;
    }
    zeige('kontakt', false);
    var texte = {
      name: 'Bitte prüfen Sie Ihren Namen.',
      firma: 'Bitte prüfen Sie den Firmennamen.',
      mail: 'Diese E-Mail-Adresse hat der Dienst nicht angenommen. Bitte prüfen Sie sie.',
      telefon: 'Diese Telefonnummer hat der Dienst nicht angenommen. Bitte prüfen Sie sie.',
      einwilligung: 'Bitte bestätigen Sie die Einwilligung.'
    };
    if (FELDER.indexOf(feld) >= 0) {
      feldFehler(feld, texte[feld]);
      var m = $('of-form-meldung'); m.textContent = 'Bitte prüfen Sie das markierte Feld.'; m.dataset.art = 'fehler';
      zeige('kontakt');
      setTimeout(function () { var i = $('of-' + feld); if (i) i.focus(); }, 50);
    } else {
      var m2 = $('of-form-meldung'); m2.textContent = 'Eine Angabe wurde nicht angenommen. Bitte prüfen Sie Ihre Eingaben.'; m2.dataset.art = 'fehler';
      zeige('kontakt');
    }
  }

  // ── Ausfall ─────────────────────────────────────────────────────────────
  function mailtoText() {
    var z = ['Guten Tag', '', 'Ich möchte gern eine Offerte für Folgendes:', ''];
    katalog.bereiche.forEach(function (b) {
      b.positionen.forEach(function (p) {
        var a = auswahl[p.id]; if (!a) return;
        z.push('- ' + (p.menge_waehlbar ? a.menge + ' × ' : '') + p.titel + ' (' + preisText(p) + ')' + (a.notiz && a.notiz.trim() ? ': ' + a.notiz.trim() : ''));
      });
    });
    if (wunsch.trim()) { z.push('', 'Mein Anliegen:', wunsch.trim()); }
    z.push('', 'Meine Angaben:', kontakt.name, kontakt.firma, kontakt.mail, kontakt.telefon);
    var t = z.filter(function (x, i) { return x !== '' || z[i - 1] !== ''; }).join('\n');
    return t.length > 1800 ? t.slice(0, 1790) + ' …' : t;
  }
  function zeigeAusfall() {
    $('of-mailto').setAttribute('href', 'mailto:' + MAIL + '?subject=' + encodeURIComponent('Richtpreis-Anfrage über vaiacon.ch') + '&body=' + encodeURIComponent(mailtoText()));
    zeige('fehler');
  }

  // ── Ergebnis ────────────────────────────────────────────────────────────
  function absaetze(text) {
    var t = Array.isArray(text) ? text.join('\n') : String(text || '');
    return t.split(/\n+/).filter(function (x) { return x.trim(); }).map(function (x) { return el('p', { text: x.trim() }); });
  }

  function zeigeErgebnis(a) {
    var platz = $('of-dokument-platz');
    platz.textContent = '';
    var dok = el('article', { class: 'of-dokument', 'aria-label': 'Richtofferte ' + (a.nummer || '') });

    var logo = el('img', { class: 'of-dokument__logo', src: 'assets/logo-lockup-terra.svg', alt: 'Vaiacon', height: '30' });
    logo.addEventListener('error', function () { if (!logo.getAttribute('data-png')) { logo.setAttribute('data-png', '1'); logo.src = 'assets/logo-lockup-terra.png'; } });
    dok.appendChild(el('div', { class: 'of-dokument__marke' }, [
      logo,
      el('span', { class: 'of-dokument__marke-zeile', text: 'Richtofferte · ' + String(a.nummer || '') + ' · ' + datum(a.datum) })
    ]));

    dok.appendChild(el('header', { class: 'of-dokument__kopf' }, [
      el('div', { class: 'of-dokument__absender' }, [
        el('strong', { text: 'Vaiacon GmbH' }),
        el('span', { text: 'Lehenstrasse 74' }),
        el('span', { text: '8037 Zürich' }),
        el('span', { text: 'hallo@vaiacon.ch' })
      ]),
      el('dl', { class: 'of-dokument__meta' }, [
        el('div', null, [el('dt', { text: 'Offertnummer' }), el('dd', { text: String(a.nummer || '') })]),
        el('div', null, [el('dt', { text: 'Datum' }), el('dd', { text: datum(a.datum) })]),
        el('div', null, [el('dt', { text: 'Gültig bis' }), el('dd', { text: datum(a.gueltig_bis) })])
      ])
    ]));

    var empf = el('address', { class: 'of-dokument__empfaenger' });
    [kontakt.firma, kontakt.name, kontakt.mail, kontakt.telefon].forEach(function (z) { if (z) empf.appendChild(el('span', { text: z })); });
    dok.appendChild(empf);

    dok.appendChild(el('p', { class: 'of-dokument__kicker', text: 'Richtofferte' }));
    dok.appendChild(el('h3', { class: 'of-dokument__titel', text: 'Ihr Richtpreis.' }));
    dok.appendChild(el('p', { class: 'of-richtpreis of-dokument__banner' }, [
      el('strong', { text: 'Richtpreis, keine verbindliche Offerte' }),
      document.createTextNode(' \u2013 wir melden uns bei Ihnen.')
    ]));
    var einl = absaetze(a.einleitung);
    if (einl.length) dok.appendChild(el('div', { class: 'of-dokument__text' }, einl));

    if (a.positionen.length) {
      var tabelle = el('table', { class: 'of-tabelle' });
      tabelle.appendChild(el('caption', { class: 'of-nur-leser', text: 'Positionen der Offerte' }));
      tabelle.appendChild(el('thead', null, [el('tr', null, [
        el('th', { scope: 'col', text: 'Position' }),
        el('th', { scope: 'col', class: 'zahl', text: 'Menge' }),
        el('th', { scope: 'col', text: 'Einheit' }),
        el('th', { scope: 'col', class: 'zahl', text: 'Einzelpreis' }),
        el('th', { scope: 'col', class: 'zahl', text: 'Betrag' })
      ])]));
      var tb = el('tbody');
      a.positionen.forEach(function (p) {
        var monatlich = p.art === 'monatlich';
        var pos = el('td', { class: 'of-tabelle__pos', 'data-label': 'Position' }, [
          el('span', { class: 'of-tabelle__bereich', text: String(p.bereich || '') }),
          el('strong', { text: String(p.titel || '') })
        ]);
        if (p.notiz) pos.appendChild(el('span', { class: 'of-tabelle__notiz', text: 'Ihre Notiz: ' + p.notiz }));
        if (p.begruendung) pos.appendChild(el('span', { class: 'of-tabelle__notiz', text: 'Darum: ' + p.begruendung }));
        tb.appendChild(el('tr', null, [
          pos,
          el('td', { class: 'zahl', 'data-label': 'Menge', text: String(p.menge) }),
          el('td', { 'data-label': 'Einheit', text: String(p.einheit || '') }),
          el('td', { class: 'zahl', 'data-label': 'Einzelpreis', text: (p.ab ? 'ab ' : '') + chf(p.einzelpreis) }),
          el('td', { class: 'zahl', 'data-label': monatlich ? 'Betrag pro Monat' : 'Betrag', text: (p.ab ? 'ab ' : '') + chf(p.betrag) + (monatlich ? ' / Monat' : '') })
        ]));
      });
      tabelle.appendChild(tb);
      dok.appendChild(el('div', { class: 'of-tabelle-huelle' }, [tabelle]));
    }

    if (a.positionen.length === 0) {
      dok.appendChild(el('p', { class: 'of-dokument__leer', text: a.ki_zuordnung ? 'Ihre Beschreibung konnten wir noch keiner Leistung sicher zuordnen. Wir melden uns persönlich bei Ihnen.' : 'Es wurden keine Positionen gewählt. Wir melden uns zu Ihrem Anliegen persönlich.' }));
    }
    if (wunsch.trim()) {
      dok.appendChild(el('div', { class: 'of-dokument__wunsch' }, [
        el('strong', { text: a.ki_zuordnung ? 'Ihre Beschreibung' : 'Ihr Anliegen' }),
        el('p', { text: wunsch.trim() })
      ]));
    }
    var unklar = Array.isArray(a.unklar) ? a.unklar.filter(Boolean) : [];
    if (unklar.length) {
      dok.appendChild(el('h4', { class: 'of-dokument__zwischen', text: 'Das klären wir mit Ihnen' }));
      dok.appendChild(el('ul', { class: 'of-dokument__liste' }, unklar.map(function (u) { return el('li', { text: String(u) }); })));
    }

    var inkl = a.mwst_inklusive === true && a.mwst_satz != null;
    var summe = el('div', { class: 'of-dokument__summen' });
    function summenZeile(label, wert, steuer) {
      var z = el('div', { class: 'of-dokument__summe' }, [el('span', { text: label }), el('strong', { text: wert })]);
      summe.appendChild(z);
      if (inkl && steuer != null && isFinite(Number(steuer))) {
        summe.appendChild(el('p', { class: 'of-dokument__mwst', text: 'inkl. ' + prozent(a.mwst_satz) + ' % MWST (darin enthalten ' + chf(steuer) + ')' }));
      }
    }
    var abVor = a.enthaelt_ab_preise ? 'ab ' : '';
    summenZeile('Summe einmalig', abVor + chf(a.summe_einmalig), a.mwst_einmalig);
    summenZeile('Summe monatlich', (a.enthaelt_ab_preise && Number(a.summe_monatlich) && a.positionen.some(function (p) { return p.art === 'monatlich' && p.ab; }) ? 'ab ' : '') + chf(a.summe_monatlich), a.mwst_monatlich);
    dok.appendChild(summe);
    if (a.mwst_hinweis) dok.appendChild(el('p', { class: 'of-dokument__klein', text: String(a.mwst_hinweis) }));

    var hinweise = Array.isArray(a.hinweise) ? a.hinweise.filter(Boolean) : [];
    if (hinweise.length) {
      dok.appendChild(el('h4', { class: 'of-dokument__zwischen', text: 'Hinweise' }));
      dok.appendChild(el('ul', { class: 'of-dokument__liste' }, hinweise.map(function (h) { return el('li', { text: String(h) }); })));
    }
    var schritte = absaetze(a.naechste_schritte);
    if (schritte.length) {
      dok.appendChild(el('h4', { class: 'of-dokument__zwischen', text: 'Nächste Schritte' }));
      dok.appendChild(el('div', { class: 'of-dokument__text' }, schritte));
    }
    dok.appendChild(el('footer', { class: 'of-dokument__fuss' }, [
      el('span', { text: 'Vaiacon GmbH · Lehenstrasse 74 · 8037 Zürich · hallo@vaiacon.ch · vaiacon.ch' }),
      el('span', { text: 'Verbindlich wird erst die schriftliche Offerte nach unserem Gespräch.' + (a.gueltig_bis ? ' Richtpreis gültig bis ' + datum(a.gueltig_bis) + '.' : '') })
    ]));
    platz.appendChild(dok);

    var ms = $('of-mailstatus');
    if (a.mail_gesendet === true) {
      ms.textContent = 'Per Mail unterwegs an ' + kontakt.mail;
      ms.hidden = false;
    } else {
      ms.hidden = true;
    }
    $('of-probe').hidden = !probe;
    document.title = 'Richtpreis ' + (a.nummer || '') + ' · vaiacon';
    zeige('ergebnis');
  }

  // ── Verdrahten ──────────────────────────────────────────────────────────
  function verdrahten() {
    $('of-anfordern').addEventListener('click', anfordern);
    $('of-form').addEventListener('submit', senden);
    $('of-zurueck').addEventListener('click', function () { zeige('auswahl'); });
    $('of-aendern').addEventListener('click', function () { document.title = 'Richtpreis in zwei Minuten · vaiacon, Zürich'; zeige('auswahl'); });
    $('of-fehler-aendern').addEventListener('click', function () { zeige('auswahl'); });
    $('of-nochmals').addEventListener('click', function () { senden(); });
    $('of-drucken').addEventListener('click', function () { window.print(); });
    $('of-wunsch').addEventListener('input', function () {
      wunsch = this.value;
      $('of-wunsch-n').textContent = String(wunsch.length);
      $('of-wunsch-fehler').textContent = '';
      sichern();
    });
    var toggle = $('of-summary-toggle');
    toggle.addEventListener('click', function () {
      var offen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', offen ? 'false' : 'true');
      $('of-summary').classList.toggle('is-offen', !offen);
      document.body.classList.toggle('of-offen', !offen);
    });
    ['name', 'firma', 'mail', 'telefon'].forEach(function (f) {
      $('of-' + f).addEventListener('input', function () { feldFehler(f, ''); });
    });
    $('of-einwilligung').addEventListener('change', function () { feldFehler('einwilligung', ''); });
  }

  function katalogFehler() {
    var platz = $('of-katalog');
    if (platz) platz.textContent = '';
    else platz = $('of-wunsch-fehler') && $('of-wunsch-fehler').parentNode;   // ohne Katalog: Hinweis unter der Beschreibung
    if (!platz) return;
    platz.appendChild(el('div', { class: 'of-hinweis' }, [
      el('h3', { class: 'of-hinweis__titel', text: 'Die Angebote lassen sich gerade nicht laden.' }),
      el('p', null, ['Das tut uns leid. Schreiben Sie uns bitte kurz, was Sie interessiert, über das ', el('a', { href: 'kontakt', text: 'Kontaktformular' }), ' oder per Mail an ', el('a', { href: 'mailto:' + MAIL, text: MAIL }), '. Wir melden uns persönlich.'])
    ]));
  }

  function start() {
    ansichten.auswahl.hidden = false;
    verdrahten();
    fetch(KATALOG, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error('Katalog ' + r.status);
      return r.json();
    }).then(function (k) {
      if (!k || !Array.isArray(k.bereiche) || !k.bereiche.length) throw new Error('Katalog leer');
      katalog = k;
      k.bereiche.forEach(function (b) {
        b.positionen.forEach(function (p) { positionen[p.id] = { pos: p, bereich: b }; });
      });
      laden();
      vorwahl();
      zeichneKatalog();
      Object.keys(auswahl).forEach(karteSync);
      var klapp = $('of-klapp');
      if (klapp && (Object.keys(auswahl).length || (location.hash && k.bereiche.some(function (b) { return '#' + b.id === location.hash; })))) klapp.open = true;
      if ($('of-katalog')) document.body.classList.add('of-leiste');
      aktualisiere();
      zumBereich();
    }).catch(function () {
      katalogFehler();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
