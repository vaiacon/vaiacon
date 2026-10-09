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

    setze('pm-d-kicker', zelle.getAttribute('data-komplexitaet'));
    setze('pm-d-titel', zelle.querySelector('.pm-cell__name').textContent.trim());
    setze('pm-d-text', zelle.getAttribute('data-text') || '');
    setze('pm-d-nutzen', zelle.getAttribute('data-nutzen') || '');
    setze('pm-d-beispiel', zelle.getAttribute('data-beispiel') || '');
    setze('pm-d-preis', preisText);
    setze('pm-d-dauer', zelle.getAttribute('data-dauer') || '');
    setze('pm-d-betreuung', 'CHF ' + format(betreuung) + ' pro Monat');
    setze('pm-d-jahr', 'CHF ' + format(preis + betreuung * 12));
    var mehr = document.getElementById('pm-d-mehr');
    if (mehr) {
      var ziel = zelle.getAttribute('data-mehr');
      if (ziel) { mehr.href = ziel; mehr.hidden = false; } else { mehr.hidden = true; }
    }

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

  /* Handy (bis 700 px): Schrittwahl als Leiste, nur eine Spalte sichtbar,
   * Detailkarte klappt direkt unter der angetippten Karte auf. Die neun Zellen
   * bleiben die einzige Datenquelle; Dauer und Satz werden aus ihren
   * data-Attributen in die Karte gespiegelt (Dauer ist nur Information, kein Preistreiber). */
  var mq = window.matchMedia ? window.matchMedia('(max-width: 700px)') : null;
  var detail = document.querySelector('.pm-detail');
  var detailHeim = detail ? detail.parentNode : null;
  var detailDanach = detail ? detail.nextSibling : null;
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

  function legeDetail(zelle) {
    if (!detail) return;
    if (mq && mq.matches) {
      zelle.parentNode.insertBefore(detail, zelle.nextSibling);
    } else if (detail.parentNode !== detailHeim) {
      detailHeim.insertBefore(detail, detailDanach && detailDanach.parentNode === detailHeim ? detailDanach : null);
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
        var erste = matrix.querySelector('.pm-cell[data-komplexitaet="' + name + '"]');
        if (erste) { waehle(erste); legeDetail(erste); }
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

  for (var i = 0; i < zellen.length; i++) {
    zellen[i].addEventListener('click', function (e) {
      var zelle = e.currentTarget;
      waehle(zelle);
      legeDetail(zelle);
      if (mq && mq.matches && zelle.scrollIntoView) {
        zelle.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    });
  }

  var start = matrix.querySelector('.pm-cell.ist-gewaehlt') || zellen[0];
  setzeSpalte(start.getAttribute('data-komplexitaet'));
  waehle(start);
  legeDetail(start);
  if (mq) {
    var neu = function () { legeDetail(matrix.querySelector('.pm-cell.ist-gewaehlt') || zellen[0]); };
    if (mq.addEventListener) mq.addEventListener('change', neu); else if (mq.addListener) mq.addListener(neu);
  }

  /* preise.js setzt die Katalogpreise später ein: dann die Karte neu rechnen. */
  /* Nur Preise der Zellen und Zuschlagstabelle beobachten, nie die Detailkarte (sonst Endlosschleife). */
  if (window.MutationObserver) {
    var beobachter = new MutationObserver(function () {
      var aktiv = matrix.querySelector('.pm-cell.ist-gewaehlt');
      if (aktiv) waehle(aktiv);
    });
    var opt = { subtree: true, characterData: true, childList: true };
    for (var q = 0; q < zellen.length; q++) beobachter.observe(zellen[q].querySelector('.pm-cell__preis'), opt);
    var tabelle = document.querySelector('.pm-tabelle');
    if (tabelle) beobachter.observe(tabelle, opt);
  }
})();
