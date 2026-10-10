/* Preismatrix Automationen: Handy-Schrittwahl (bis 700 px).
 * Die Matrix steht fertig im HTML (auch ohne JavaScript lesbar). Dieses Skript
 * ergänzt je Zelle Satz und Dauer aus den data-Attributen und baut auf dem Handy
 * eine Leiste, die nur eine Spalte zeigt. Es gibt keine Detailkarte mehr. */
(function () {
  'use strict';
  var matrix = document.getElementById('pm-matrix');
  if (!matrix) return;
  var zellen = matrix.querySelectorAll('.pm-cell');
  if (!zellen.length) return;

  var spalten = matrix.querySelectorAll('.pm-col');
  var leiste = null, hilfe = null, mehrBox = null, knoepfe = [], spaltenNach = {};

  for (var z = 0; z < zellen.length; z++) {
    var dauer = document.createElement('span');
    dauer.className = 'pm-cell__dauer';
    dauer.textContent = zellen[z].getAttribute('data-dauer') || '';
    var satz = document.createElement('span');
    satz.className = 'pm-cell__satz';
    satz.textContent = zellen[z].getAttribute('data-text') || '';
    zellen[z].appendChild(satz);
    zellen[z].appendChild(dauer);
  }

  function setzeSpalte(name) {
    matrix.setAttribute('data-spalte', name);
    for (var k = 0; k < knoepfe.length; k++) {
      var an = knoepfe[k].getAttribute('data-spalte') === name;
      knoepfe[k].setAttribute('aria-pressed', an ? 'true' : 'false');
      knoepfe[k].classList.toggle('ist-an', an);
      if (an && hilfe) hilfe.textContent = knoepfe[k].getAttribute('data-hilfe');
    }
    /* Beispiel und Gewinn der Spalte aus dem ausgeblendeten Spaltenkopf spiegeln (Klone, eine Textquelle). */
    if (mehrBox) {
      mehrBox.innerHTML = '';
      var sp = spaltenNach[name];
      ['.pm-col__bsp', '.pm-col__gewinn'].forEach(function (sel) {
        var q = sp && sp.querySelector(sel);
        if (q) mehrBox.appendChild(q.cloneNode(true));
      });
    }
  }

  if (spalten.length && matrix.parentNode) {
    leiste = document.createElement('div');
    leiste.className = 'pm-schritt';
    var gruppe = document.createElement('div');
    gruppe.className = 'pm-schritt__leiste';
    gruppe.setAttribute('role', 'group');
    gruppe.setAttribute('aria-label', 'Grösse des Schritts');
    Array.prototype.forEach.call(spalten, function (sp) {
      var name = sp.querySelector('.pm-col__kopf b').textContent.trim();
      var klein = sp.querySelector('small');
      spaltenNach[name] = sp;
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = name;
      b.setAttribute('data-spalte', name);
      b.setAttribute('data-hilfe', klein ? klein.textContent.trim() : '');
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        setzeSpalte(name);
      });
      knoepfe.push(b);
      gruppe.appendChild(b);
    });
    hilfe = document.createElement('p');
    hilfe.className = 'pm-schritt__hilfe';
    hilfe.setAttribute('aria-live', 'polite');
    leiste.appendChild(gruppe);
    leiste.appendChild(hilfe);
    mehrBox = document.createElement('div');
    mehrBox.className = 'pm-schritt__mehr';
    leiste.appendChild(mehrBox);
    matrix.parentNode.insertBefore(leiste, matrix);
  }

  /* «Beispiel ansehen»: Ziel liegt in einem <details> weiter unten; erst aufklappen, dann hinrollen.
   * Dasselbe beim Laden mit #anker und bei jedem Wechsel des Ankers, sonst bleibt das Ziel zu. */
  function oeffneBeispiel(hash, sofort) {
    if (!hash || hash.length < 2) return false;
    var ziel = null;
    try { ziel = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (e) { ziel = null; }
    if (!ziel) return false;
    var box = ziel.closest ? ziel.closest('details') : null;
    if (!box) return false;
    box.open = true;
    if (ziel.scrollIntoView) ziel.scrollIntoView({ block: 'start', behavior: sofort ? 'instant' : 'smooth' });
    return true;
  }
  window.addEventListener('hashchange', function () { oeffneBeispiel(location.hash); });
  // Beim Laden ohne Animation: der Browser ist schon gesprungen, bevor die Zeile offen war.
  if (location.hash) {
    setTimeout(function () { oeffneBeispiel(location.hash, true); }, 0);
    // Nach dem vollständigen Laden noch einmal: der Browser springt selbst zum Anker, sobald Bilder und Schriften da sind.
    window.addEventListener('load', function () { setTimeout(function () { oeffneBeispiel(location.hash, true); }, 50); });
  }
  setzeSpalte(zellen[0].getAttribute('data-komplexitaet'));
})();
