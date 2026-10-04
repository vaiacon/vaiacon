/* KI-KMU-News: Rubrik-Filter, «heute» im Tagesstreifen. Ohne dieses Skript ist die Seite voll lesbar. */
(function () {
  'use strict';

  // Heute markieren (Datum des Besuchers, Ortszeit)
  try {
    var jetzt = new Date();
    var heute = jetzt.getFullYear() + '-' + String(jetzt.getMonth() + 1).padStart(2, '0') + '-' + String(jetzt.getDate()).padStart(2, '0');
    var tag = document.querySelector('.nw-tag[data-datum="' + heute + '"]');
    if (tag) { tag.classList.add('is-heute'); tag.setAttribute('aria-label', tag.textContent + ', heute'); }
  } catch (e) { /* ohne Markierung weiter */ }

  var leiste = document.querySelector('.nw-filter');
  if (!leiste) return;
  var knoepfe = leiste.querySelectorAll('.nw-filter__knopf');
  var karten = document.querySelectorAll('.nw-karte');
  var bloecke = document.querySelectorAll('.nw-tagesblock');
  var status = leiste.querySelector('.nw-filter__status');
  leiste.hidden = false;

  function anwenden(rubrik) {
    var sichtbar = 0;
    karten.forEach(function (k) {
      var zeigen = rubrik === 'alle' || k.getAttribute('data-rubrik') === rubrik;
      k.hidden = !zeigen;
      if (zeigen) sichtbar++;
    });
    bloecke.forEach(function (b) {
      b.hidden = !b.querySelector('.nw-karte:not([hidden])');
    });
    knoepfe.forEach(function (k) {
      k.setAttribute('aria-pressed', String(k.getAttribute('data-filter') === rubrik));
    });
    if (status) {
      status.textContent = rubrik === 'alle' ? '' : sichtbar + (sichtbar === 1 ? ' Beitrag' : ' Beiträge') + ' in dieser Rubrik';
    }
  }

  knoepfe.forEach(function (k) {
    k.addEventListener('click', function () { anwenden(k.getAttribute('data-filter')); });
  });

  // Sprung auf einen Beitrag, den der Filter gerade versteckt: Filter zurücksetzen
  function pruefeAnker() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var ziel = document.getElementById(id);
    if (ziel && ziel.hidden) { anwenden('alle'); ziel.scrollIntoView(); }
  }
  window.addEventListener('hashchange', pruefeAnker);
  pruefeAnker();
})();
