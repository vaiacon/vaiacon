/* «Ihr Fall in zwei Sätzen» (bot.html): Beschreibung an den Offerten-Dienst,
 * Antwort mit Sprosse, Satz, Positionen und Richtpreis anzeigen.
 *
 * POST /api/offerte/einordnen { wunsch } →
 *   { sprosse, satz, positionen:[{id,titel,menge,einheit,betrag,ab}],
 *     summe_einmalig, summe_monatlich, enthaelt_ab_preise, unklar }
 *   bei KI-Ausfall { sprosse:null, positionen:[], hinweis }, zu kurz 400 { error:'eingabe' }.
 *
 * Die Beschreibung wird nirgends gespeichert; nur für den Weg zum Dokument
 * (offerte.html) liegt sie kurz im sessionStorage und wird dort gleich gelöscht.
 * Probe: ?probe=1 liest .bau/proben/einordnen-antwort.json, sendet nichts.
 * Texte aus der Antwort werden nur als Text eingesetzt (textContent). */
(function () {
  'use strict';
  var form = document.getElementById('if-form');
  if (!form) return;
  var API = (window.VAIACON_API_BASIS || '') + '/api/offerte/einordnen';
  var PROBE_DATEI = '.bau/proben/einordnen-antwort.json';
  var UEBERGABE = 'vaiacon_wunsch';
  var MINDESTENS = 20;
  var ZEITLIMIT = 45000;
  var FEHLER_TEXT = 'Gerade nicht erreichbar, die Erstanalyse geht immer.';

  var $ = function (id) { return document.getElementById(id); };
  var text = $('if-text'), n = $('if-n'), knopf = $('if-knopf'), fehler = $('if-fehler');
  var ergebnis = $('if-ergebnis');
  var kontakt = $('if-kontakt'), mailFeld = $('if-mail'), telFeld = $('if-telefon');
  var RE_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var probe = '';
  try { probe = new URLSearchParams(location.search).get('probe') || ''; } catch (e) { /* ohne */ }

  var SPROSSEN = {
    einfach: ['Einfache Automation', 'bsp-tag--e'],
    verbunden: ['Mittelgrosse Automation', 'bsp-tag--v'],
    ganzer_ablauf: ['Komplette Automation', 'bsp-tag--g']
  };
  function sprosseKey(s) {
    return String(s || '').toLowerCase().replace(/[\s-]+/g, '_');
  }
  function format(x) {
    return String(Math.round(Number(x) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  }
  function chf(x, ab) { return (ab ? 'ab ' : '') + 'CHF ' + format(x); }

  function zaehle() {
    var len = text.value.trim().length;
    if (n) n.textContent = String(len);
    form.classList.toggle('ist-bereit', len >= MINDESTENS);
  }
  text.addEventListener('input', zaehle);
  zaehle();

  function zeigeFehler(t) {
    fehler.textContent = t;
    fehler.hidden = false;
  }
  function zustand(z) {
    form.setAttribute('data-zustand', z);
    knopf.disabled = z === 'laedt';
    knopf.textContent = z === 'laedt' ? 'Wird eingeordnet …' : (kontakt && !kontakt.hidden ? 'Einordnung anzeigen' : 'Einordnung anfordern');
  }

  function anfrage(wunsch, daten) {
    if (probe) {
      return new Promise(function (r) { setTimeout(r, 900); }).then(function () {
        if (probe === 'fehler') throw new Error('netz');
        return fetch(PROBE_DATEI, { cache: 'no-store' }).then(function (r) {
          if (!r.ok) throw new Error('netz');
          return r.json();
        });
      });
    }
    var steuer = typeof AbortController === 'function' ? new AbortController() : null;
    var zeit = setTimeout(function () { if (steuer) steuer.abort(); }, ZEITLIMIT);
    return fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wunsch: wunsch, kontakt: daten }),
      signal: steuer ? steuer.signal : undefined
    }).then(function (r) {
      clearTimeout(zeit);
      if (r.ok) return r.json();
      if (r.status === 400) throw new Error('eingabe');
      throw new Error('netz');
    }, function () { clearTimeout(zeit); throw new Error('netz'); });
  }

  function zeichne(a) {
    var tag = $('if-tag');
    var sp = SPROSSEN[sprosseKey(a.sprosse)];
    tag.className = 'bsp-tag' + (sp ? ' ' + sp[1] : '');
    tag.textContent = sp ? sp[0] : 'Noch offen';
    $('if-satz').textContent = String(a.satz || '');

    var liste = $('if-positionen');
    liste.textContent = '';
    (Array.isArray(a.positionen) ? a.positionen : []).forEach(function (p) {
      var li = document.createElement('li');
      var t = document.createElement('span');
      var menge = Number(p.menge) || 1;
      t.textContent = String(p.titel || p.id || '') + (menge > 1 ? ' × ' + menge : '');
      var b = document.createElement('strong');
      b.textContent = chf(p.betrag, !!p.ab);
      li.appendChild(t); li.appendChild(b);
      liste.appendChild(li);
    });
    liste.hidden = !liste.children.length;

    var summe = $('if-summe');
    summe.textContent = chf(a.summe_einmalig, !!a.enthaelt_ab_preise);
    var monat = $('if-monat');
    if (Number(a.summe_monatlich) > 0) {
      monat.textContent = 'dazu ' + chf(a.summe_monatlich, !!a.enthaelt_ab_preise) + ' pro Monat';
      monat.hidden = false;
    } else { monat.hidden = true; }

    var unklar = $('if-unklar'), ul = $('if-unklar-liste');
    ul.textContent = '';
    (Array.isArray(a.unklar) ? a.unklar : []).forEach(function (u) {
      var li = document.createElement('li');
      li.textContent = String(u);
      ul.appendChild(li);
    });
    unklar.hidden = !ul.children.length;

    ergebnis.hidden = false;
    if (ergebnis.scrollIntoView) ergebnis.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fehler.hidden = true;
    var wunsch = text.value.trim();
    if (wunsch.length < MINDESTENS) {
      zeigeFehler('Bitte beschreiben Sie Ihren Fall mit mindestens ' + MINDESTENS + ' Zeichen.');
      text.focus();
      return;
    }
    /* Erst die Beschreibung, dann die Kontaktangabe, dann die Einordnung (Philip 09.10.). */
    if (kontakt && kontakt.hidden) {
      kontakt.hidden = false;
      zustand('kontakt');
      if (mailFeld) mailFeld.focus();
      return;
    }
    var mail = mailFeld ? mailFeld.value.trim() : '';
    var telefon = telFeld ? telFeld.value.trim() : '';
    if (!RE_MAIL.test(mail)) { zeigeFehler('Bitte geben Sie eine gültige E-Mail-Adresse an.'); if (mailFeld) mailFeld.focus(); return; }
    if (telefon.replace(/\D/g, '').length < 6) { zeigeFehler('Bitte geben Sie Ihre Telefonnummer an.'); if (telFeld) telFeld.focus(); return; }
    zustand('laedt');
    anfrage(wunsch, { mail: mail, telefon: telefon }).then(function (a) {
      zustand('fertig');
      if (!a || !a.sprosse) {
        ergebnis.hidden = true;
        zeigeFehler(String((a && a.hinweis) || FEHLER_TEXT));
        return;
      }
      zeichne(a);
    }).catch(function (err) {
      zustand('fehler');
      ergebnis.hidden = true;
      zeigeFehler(err && err.message === 'eingabe'
        ? 'Bitte prüfen Sie Beschreibung, E-Mail und Telefon.'
        : FEHLER_TEXT);
    });
  });

  /* Weiter zum Dokument: Beschreibung einmalig an offerte.html übergeben. */
  var weiter = $('if-offerte');
  if (weiter) {
    weiter.addEventListener('click', function () {
      try { sessionStorage.setItem(UEBERGABE, text.value.trim().slice(0, 3000)); } catch (e) { /* ohne */ }
    });
  }
})();
