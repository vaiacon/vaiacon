/* Preismatrix Automationen: Zelle wählen, Detailkarte füllen.
 * Die Matrix steht fertig im HTML (auch ohne JavaScript lesbar). Dieses Skript
 * markiert die gewählte Zelle, kopiert deren Inhalt in die Detailkarte und
 * rechnet das erste Jahr (Einmalpreis + 12 × Betreuung). Die Beträge liest es
 * aus dem Text der Zelle, damit die Werte aus daten/preise.json gelten. */
(function () {
  'use strict';
  var matrix = document.getElementById('pm-matrix');
  if (!matrix) return;
  var zellen = matrix.querySelectorAll('.pm-cell');
  if (!zellen.length) return;

  function zahl(text) {
    var m = String(text || '').replace(/['’’\s]/g, '').match(/\d+/);
    return m ? Number(m[0]) : 0;
  }
  function format(n) {
    return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  }
  function setze(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function waehle(zelle) {
    for (var i = 0; i < zellen.length; i++) {
      zellen[i].classList.toggle('ist-gewaehlt', zellen[i] === zelle);
      zellen[i].setAttribute('aria-pressed', zellen[i] === zelle ? 'true' : 'false');
    }
    var preisText = zelle.querySelector('.pm-cell__preis').textContent.trim();
    var preis = zahl(preisText);
    var betreuungId = zelle.getAttribute('data-betreuung') || 'be-betreuung-klein';
    var betreuungEl = document.querySelector('.pm-tabelle [data-preis="' + betreuungId + '"]');
    var betreuung = betreuungEl ? zahl(betreuungEl.textContent) : 0;

    setze('pm-d-kicker', zelle.getAttribute('data-komplexitaet') + ' · ' + zelle.getAttribute('data-zeit'));
    setze('pm-d-titel', zelle.querySelector('.pm-cell__name').textContent.trim());
    setze('pm-d-text', zelle.getAttribute('data-text') || '');
    setze('pm-d-beispiel', zelle.getAttribute('data-beispiel') || '');
    setze('pm-d-preis', preisText);
    setze('pm-d-dauer', zelle.getAttribute('data-dauer') || '');
    setze('pm-d-betreuung', 'CHF ' + format(betreuung) + ' pro Monat');
    setze('pm-d-jahr', 'CHF ' + format(preis + betreuung * 12));

    var liste = document.getElementById('pm-d-liste');
    if (liste) {
      liste.innerHTML = '';
      (zelle.getAttribute('data-umfang') || '').split('|').forEach(function (t) {
        if (!t.trim()) return;
        var li = document.createElement('li');
        li.textContent = t.trim();
        liste.appendChild(li);
      });
    }
  }

  for (var i = 0; i < zellen.length; i++) {
    zellen[i].addEventListener('click', function (e) { waehle(e.currentTarget); });
  }

  waehle(matrix.querySelector('.pm-cell.ist-gewaehlt') || zellen[0]);

  /* preise.js setzt die Katalogpreise später ein: dann die Karte neu rechnen. */
  /* Nur Matrix und Zuschlagstabelle beobachten, nie die Detailkarte (sonst Endlosschleife). */
  if (window.MutationObserver) {
    var beobachter = new MutationObserver(function () {
      var aktiv = matrix.querySelector('.pm-cell.ist-gewaehlt');
      if (aktiv) waehle(aktiv);
    });
    var opt = { subtree: true, characterData: true, childList: true };
    beobachter.observe(matrix, opt);
    var tabelle = document.querySelector('.pm-tabelle');
    if (tabelle) beobachter.observe(tabelle, opt);
  }
})();
