// Domainfeld im Kopf der Startseite (seit 04.10.2026).
//
// Prüft nur, ob die Eingabe wie eine Webadresse aussieht, und springt dann
// nach visibility?domain=<domain>#check. Dort startet visibility-check.js den
// Check von selbst. Hier geht nichts an den Server.
//
// Muster und Säuberung sind dieselben wie in visibility-check.js — wer eins
// ändert, ändert beide.
(function () {
  var form = document.getElementById('sv-start-form');
  if (!form) return;

  var feld = document.getElementById('sv-start-domain');
  var fehler = document.getElementById('sv-start-fehler');

  var DOMAIN_MUSTER = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i;

  function saeubern(eingabe) {
    return eingabe.trim().replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/.*$/, '');
  }

  function fehlerZeigen(text) {
    fehler.textContent = text;
    fehler.hidden = false;
    feld.setAttribute('aria-invalid', 'true');
    feld.setAttribute('aria-describedby', 'sv-start-fehler');
  }

  function fehlerWeg() {
    fehler.hidden = true;
    feld.removeAttribute('aria-invalid');
    feld.removeAttribute('aria-describedby');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var domain = saeubern(feld.value).toLowerCase();
    if (!domain) {
      fehlerZeigen('Bitte Ihre Domain eingeben, z. B. ihre-firma.ch');
      feld.focus();
      return;
    }
    if (!DOMAIN_MUSTER.test(domain)) {
      fehlerZeigen('Bitte eine vollständige Webadresse eingeben, z. B. ihre-firma.ch');
      feld.focus();
      return;
    }
    fehlerWeg();
    window.location.href = 'visibility?domain=' + encodeURIComponent(domain) + '#check';
  });

  feld.addEventListener('input', function () {
    if (!fehler.hidden) fehlerWeg();
  });
})();
