/* Preise aus dem Katalog (daten/preise.json) in die Seite setzen.
 *
 * Quelle der Wahrheit ist daten/preise.json. Jedes Element mit
 *   data-preis="<Positions-id>"
 * bekommt den Preis aus dem Katalog als Text, zum Beispiel
 *   «CHF 1'550 pro Halbtag», «ab CHF 1'300 pro Ablauf», «CHF 400 pro Monat».
 * Einheit «pauschal» nennt nur den Betrag («CHF 850», «ab CHF 2'450»).
 *   data-preis-form="betrag"  nur Betrag («CHF 1'550», «ab CHF 1'300»)
 *   data-preis-mwst           bekommt den mwst_hinweis des Katalogs
 *
 * Der Text im HTML ist der Ersatz ohne JavaScript: Er bleibt stehen, wenn die
 * Position unbekannt ist oder der Katalog nicht geladen werden kann. Darum gibt
 * es kein Flackern, solange der Ersatztext dem Katalog entspricht.
 * Der Pfad zum Katalog wird relativ zu diesem Skript ermittelt, so geht es auch
 * von Seiten in Unterordnern (ki-kmu-news/). Das Skript ist nur einmal geladen
 * wirksam und braucht keine Abhaengigkeiten.
 */
(function () {
  'use strict';
  if (window.VAIACON_PREISE_GELADEN) return;
  window.VAIACON_PREISE_GELADEN = true;

  var skript = document.currentScript;
  var basis;
  try {
    basis = new URL('../../daten/preise.json', skript ? skript.src : document.baseURI).href;
  } catch (e) {
    return;
  }

  function betrag(zahl) {
    var n = Number(zahl);
    if (!isFinite(n)) return null;
    var ganz = Math.abs(n - Math.round(n)) < 0.005;
    var s = ganz ? String(Math.round(n)) : n.toFixed(2);
    var teile = s.split('.');
    teile[0] = teile[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    return teile.join('.');
  }

  function text(pos, form) {
    var b = betrag(pos.preis);
    if (b === null) return null;
    var t = (pos.ab ? 'ab ' : '') + 'CHF ' + b;
    if (form !== 'betrag' && pos.einheit && pos.einheit !== 'pauschal') {
      t += ' ' + pos.einheit;
    }
    return t;
  }

  function einsetzen(katalog) {
    var index = {};
    (katalog.bereiche || []).forEach(function (bereich) {
      (bereich.positionen || []).forEach(function (pos) {
        if (pos && pos.id) index[pos.id] = pos;
      });
    });

    var felder = document.querySelectorAll('[data-preis]');
    for (var i = 0; i < felder.length; i++) {
      var el = felder[i];
      var pos = index[el.getAttribute('data-preis')];
      if (!pos) continue;
      var t = text(pos, el.getAttribute('data-preis-form'));
      if (t !== null && el.textContent !== t) el.textContent = t;
    }

    if (katalog.mwst_hinweis) {
      var hinweise = document.querySelectorAll('[data-preis-mwst]');
      for (var j = 0; j < hinweise.length; j++) {
        hinweise[j].textContent = katalog.mwst_hinweis;
      }
    }
  }

  function laden() {
    if (!window.fetch) return;
    fetch(basis, { credentials: 'same-origin' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (katalog) {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', function () { einsetzen(katalog); });
        } else {
          einsetzen(katalog);
        }
      })
      .catch(function () { /* Ersatztext im HTML bleibt stehen */ });
  }

  laden();
})();
