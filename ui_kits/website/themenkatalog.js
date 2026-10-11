/* Themenkatalog auf learning.html (#themen): Themen und Tiefe wählen,
   die Summe in Stunden und Lerntagen erscheint unten. Die Stunden stehen
   im HTML (data-std am Radioknopf), nicht hier. Ein Lerntag = 6 Std.
   «Mit dieser Auswahl anfragen» legt die Auswahl in den sessionStorage
   (Schlüssel vaiacon-themen); kontakt.js trägt sie ins Formular ein. */
(function () {
  var form = document.getElementById('themenkatalog');
  if (!form) return;
  var STD_PRO_TAG = 6;
  var summe = form.querySelector('.tk-summe');
  var dauerEl = form.querySelector('[data-tk-dauer]');
  var stundenEl = form.querySelector('[data-tk-stunden]');
  var tageEl = form.querySelector('[data-tk-tage]');
  var infoEl = form.querySelector('[data-tk-info]');
  var knopf = form.querySelector('[data-tk-anfragen]');
  var themen = form.querySelectorAll('.tk-thema');

  // Tiefe je Thema: 1 Kennenlernen, 2 Anwenden, 3 Vertiefen
  var VORLAGEN = {
    tag:   { 'ki-verstehen': 1, 'auftraege': 2, 'datenschutz': 1, 'werkzeugwahl': 1 },
    drei:  { 'auftraege': 2, 'datenschutz': 2, 'pruefen': 1, 'copilot': 2, 'perplexity': 2, 'texte': 2, 'zahlen': 2, 'besprechungen': 1 },
    woche: { 'ki-verstehen': 2, 'auftraege': 2, 'datenschutz': 2, 'pruefen': 2, 'werkzeugwahl': 1, 'copilot': 2, 'texte': 2,
             'ablaeufe': 2, 'vorlagen': 2, 'regeln': 2, 'fuehren': 1, 'veraenderung': 1 },
    leer:  {}
  };

  function zahl(h) { return String(h).replace('.5', '½').replace(/^0½$/, '½'); }

  function tageText(tage) {
    if (tage <= 0.5) return 'ein halber Lerntag';
    if (tage === 1) return 'ein Lerntag';
    if (tage === 5) return 'eine Lernwoche';
    var t = zahl(tage) + ' Lerntage';
    return tage > 5 ? t + ', gut über mehrere Wochen verteilt' : t;
  }

  function auswahl() {
    var liste = [];
    Array.prototype.forEach.call(themen, function (li) {
      var r = li.querySelector('input:checked');
      if (!r || r.value === '0') return;
      liste.push({
        titel: li.querySelector('h4').firstChild.textContent.trim(),
        tiefe: r.parentNode.querySelector('b').textContent,
        std: parseFloat(r.getAttribute('data-std')),
        mass: li.getAttribute('data-art') === 'mass'
      });
    });
    return liste;
  }

  // Aufklappbare Gruppen: im Kopf steht, wie viele Themen gewählt sind.
  var gruppen = form.querySelectorAll('.tk-gruppe');
  function gruppenZaehlen(oeffnen) {
    Array.prototype.forEach.call(gruppen, function (g) {
      var alle = g.querySelectorAll('.tk-thema').length;
      var an = g.querySelectorAll('.tk-thema input:checked:not([value="0"])').length;
      var el = g.querySelector('[data-tk-zahl]');
      if (el) el.textContent = alle + ' Themen' + (an ? ' · ' + an + ' gewählt' : '');
      g.classList.toggle('tk-gruppe--an', an > 0);
      if (oeffnen) g.open = an > 0;
    });
  }

  function rechnen() {
    gruppenZaehlen(false);
    var liste = auswahl();
    var std = 0, mass = 0;
    liste.forEach(function (t) { std += t.std; if (t.mass) mass++; });
    Array.prototype.forEach.call(themen, function (li) {
      var r = li.querySelector('input:checked');
      li.classList.toggle('tk-thema--an', !!r && r.value !== '0');
    });
    var tage = Math.ceil(std / STD_PRO_TAG * 2) / 2;
    tageEl.innerHTML = '';
    if (!liste.length) {
      dauerEl.textContent = 'Noch nichts gewählt';
      stundenEl.textContent = '';
      infoEl.textContent = 'Wählen Sie oben Themen und Tiefe.';
      knopf.disabled = true;
      return;
    }
    dauerEl.textContent = 'Ergibt ' + tageText(tage) + '.';
    stundenEl.textContent = liste.length + (liste.length === 1 ? ' Thema' : ' Themen') + ' · ' + zahl(std) + ' Std Lernzeit';
    var felder = Math.max(10, Math.ceil(tage * 2 / 10) * 10);
    for (var i = 0; i < felder; i++) {
      var f = document.createElement('span');
      if (i < tage * 2) f.className = 'an';
      if (i % 2 === 1) f.classList.add('tk-tagende');
      if (i % 10 === 9) f.classList.add('tk-wochenende');
      tageEl.appendChild(f);
    }
    infoEl.textContent = mass
      ? 'Davon ' + (mass === 1 ? 'ein Thema' : mass + ' Themen') + ' nach Mass: mehr Vorbereitung, darum teurer als Standardthemen.'
      : 'Nur Standardthemen: erprobt und darum die günstigste Variante.';
    knopf.disabled = false;
  }

  form.addEventListener('change', rechnen);

  Array.prototype.forEach.call(document.querySelectorAll('[data-tk-vorlage]'), function (b) {
    b.addEventListener('click', function () {
      var v = VORLAGEN[b.getAttribute('data-tk-vorlage')] || {};
      Array.prototype.forEach.call(themen, function (li) {
        var stufe = v[li.getAttribute('data-thema')] || 0;
        var r = li.querySelector('input[value="' + stufe + '"]');
        if (r) r.checked = true;
      });
      rechnen();
      gruppenZaehlen(true);
    });
  });

  knopf.addEventListener('click', function () {
    var liste = auswahl();
    if (!liste.length) return;
    var std = 0;
    var zeilen = liste.map(function (t) {
      std += t.std;
      return '– ' + t.titel + ': ' + t.tiefe + ' (' + zahl(t.std) + ' Std' + (t.mass ? ', nach Mass' : '') + ')';
    });
    var tage = Math.ceil(std / STD_PRO_TAG * 2) / 2;
    var text = zeilen.join('\n') + '\n\nZusammen ' + zahl(std) + ' Std Lernzeit, ' + tageText(tage) + '.';
    try { window.sessionStorage.setItem('vaiacon-themen', text); } catch (e) { /* ohne Speicher leer */ }
    window.location.href = 'kontakt#formular';
  });

  summe.hidden = false;
  rechnen();
})();
