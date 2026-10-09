/* «Ihr Fall in zwei Sätzen» (bot.html): Beschreibung + Kontakt an den Offerten-Dienst.
 * Die Einordnung (Sprosse, Richtpreis) kommt seit 10.10.2026 NUR per E-Mail an die
 * Kundschaft, die Seite zeigt nur die Bestätigung (Philip: «wir wollen den Kontakt»).
 *
 * POST /api/offerte/einordnen { wunsch, kontakt:{mail, telefon} } →
 *   { gemeldet, gesendet, kennung }; zu kurz/ungültig 400 { error:'eingabe', feld }.
 *
 * Die Beschreibung wird nirgends gespeichert.
 * Probe: ?probe=1 liest .bau/proben/einordnen-antwort.json, sendet nichts; ?probe=fehler zeigt den Fehlerfall. */
(function () {
  'use strict';
  var form = document.getElementById('if-form');
  if (!form) return;
  var API = (window.VAIACON_API_BASIS || '') + '/api/offerte/einordnen';
  var PROBE_DATEI = '.bau/proben/einordnen-antwort.json';
  var MINDESTENS = 20;
  var ZEITLIMIT = 45000;
  var FEHLER_TEXT = 'Gerade nicht erreichbar, die Erstanalyse geht immer.';

  var $ = function (id) { return document.getElementById(id); };
  var text = $('if-text'), n = $('if-n'), knopf = $('if-knopf'), fehler = $('if-fehler');
  var danke = $('if-danke'), dankeMail = $('if-danke-mail');
  var kontakt = $('if-kontakt'), mailFeld = $('if-mail'), telFeld = $('if-telefon');
  var RE_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var probe = '';
  try { probe = new URLSearchParams(location.search).get('probe') || ''; } catch (e) { /* ohne */ }

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
    knopf.textContent = z === 'laedt' ? 'Wird gesendet …' : (kontakt && !kontakt.hidden ? 'Einordnung per E-Mail senden' : 'Einordnung anfordern');
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
      if (!a || !a.gemeldet) {
        zustand('fehler');
        zeigeFehler(FEHLER_TEXT);
        return;
      }
      zustand('fertig');
      if (dankeMail) dankeMail.textContent = mail;
      form.hidden = true;
      danke.hidden = false;
      if (danke.scrollIntoView) danke.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }).catch(function (err) {
      zustand('fehler');
      zeigeFehler(err && err.message === 'eingabe'
        ? 'Bitte prüfen Sie Beschreibung, E-Mail und Telefon.'
        : FEHLER_TEXT);
    });
  });
})();
