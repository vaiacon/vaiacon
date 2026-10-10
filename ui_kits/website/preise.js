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
 * Weitere Formen von data-preis-form (nur mit data-preis):
 *   zahl     nur die Zahl («1'550»)
 *   ab       «ab CHF 1'300» ohne Einheit (ohne «ab», wenn der Preis fest ist)
 *   monat / stunde   wie ohne Angabe («CHF 130 pro Monat», «CHF 170 pro Stunde»)
 *   jahr     Beispiel erstes Jahr: Preis + 12 x Betreuung (betreuung_id),
 *            bei monatlichen Positionen 12 x Preis; «ab CHF x», wenn ab=true
 *   titel | umfang | hinweis | fremdkosten | folgekosten   Textfeld der Position
 *            (leer, wenn das Feld null ist: Element wird ausgeblendet, wenn es
 *            data-preis-leer="verbergen" traegt, sonst bleibt der Ersatztext)
 * data-preis-satz="betreuung|fremdkosten|ab_preis|beispiel_jahr|maengel|abnahme|gueltigkeit"
 *            bekommt den Satz aus dem Block «saetze» des Katalogs
 * data-preis-variante="<Positions-id>:<n>"
 *            Preis der n-ten Variante (0-basiert): «ab CHF 1'400» bzw. «CHF 1'500»
 *            (ab, wenn die Variante ab=true hat, sonst das ab der Position);
 *            mit data-preis-form="titel" der Titel der Variante
 * data-preis-staffel="<Positions-id>"
 *            «290 / 240 / 190 je Lernminute», gebaut aus dem Feld staffel
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

  var FELDER = { titel: 1, umfang: 1, hinweis: 1, fremdkosten: 1, folgekosten: 1 };

  function monate12(pos, index) {
    var b = pos.betreuung_id ? index[pos.betreuung_id] : null;
    if (b) return Number(pos.preis) + 12 * Number(b.preis);
    if (pos.art === 'monatlich') return 12 * Number(pos.preis);
    return Number(pos.preis);
  }

  function sonderform(pos, form, index) {
    if (form === 'zahl') return betrag(pos.preis);
    if (form === 'ab') {
      var b1 = betrag(pos.preis);
      return b1 === null ? null : (pos.ab ? 'ab ' : '') + 'CHF ' + b1;
    }
    if (form === 'jahr') {
      var b2 = betrag(monate12(pos, index));
      return b2 === null ? null : (pos.ab ? 'ab ' : '') + 'CHF ' + b2;
    }
    if (FELDER[form]) {
      var v = pos[form];
      return (typeof v === 'string' && v) ? v : '';
    }
    return undefined;
  }

  function staffelText(pos) {
    var st = pos.staffel;
    if (!st || !st.length) return null;
    var teile = [];
    for (var i = 0; i < st.length; i++) {
      var b = betrag(st[i].preis);
      if (b === null) return null;
      teile.push(b);
    }
    return teile.join(' / ') + ' je Lernminute';
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
      var form = el.getAttribute('data-preis-form');
      var t = sonderform(pos, form, index);
      if (t === undefined) t = text(pos, form);
      if (t === '' && FELDER[form]) {
        if (el.getAttribute('data-preis-leer') === 'verbergen') {
          el.textContent = '';
          el.hidden = true;
        }
        continue;
      }
      if (t !== null && el.textContent !== t) el.textContent = t;
    }

    var vars = document.querySelectorAll('[data-preis-variante]');
    for (var q = 0; q < vars.length; q++) {
      var vt = vars[q].getAttribute('data-preis-variante').split(':');
      var vp = index[vt[0]];
      var vv = vp && vp.varianten && vp.varianten[parseInt(vt[1], 10)];
      if (!vv) continue;
      var vtext;
      if (vars[q].getAttribute('data-preis-form') === 'titel') {
        vtext = vv.titel;
      } else {
        var vb = betrag(vv.preis);
        if (vb === null) continue;
        vtext = ((vv.ab !== undefined ? vv.ab : vp.ab) ? 'ab ' : '') + 'CHF ' + vb;
      }
      if (typeof vtext === 'string' && vtext && vars[q].textContent !== vtext) vars[q].textContent = vtext;
    }

    var staffeln = document.querySelectorAll('[data-preis-staffel]');
    for (var k = 0; k < staffeln.length; k++) {
      var sp = index[staffeln[k].getAttribute('data-preis-staffel')];
      var st = sp ? staffelText(sp) : null;
      if (st !== null && staffeln[k].textContent !== st) staffeln[k].textContent = st;
    }

    if (katalog.saetze) {
      var saetze = document.querySelectorAll('[data-preis-satz]');
      for (var m = 0; m < saetze.length; m++) {
        var satz = katalog.saetze[saetze[m].getAttribute('data-preis-satz')];
        if (typeof satz === 'string' && satz && saetze[m].textContent !== satz) saetze[m].textContent = satz;
      }
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
