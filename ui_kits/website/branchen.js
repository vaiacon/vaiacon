/* Branchen-Umschalter in der Preisleiter (bot.html): Realistische Use Cases je
 * Branche und Sprosse, dazu «Das nervt». Die Texte stehen in daten/branchen.json; die erste
 * Branche steht auch im HTML, damit die Seite ohne JavaScript lesbar bleibt.
 * Die gewählte Branche merkt sich der Browser (localStorage), sonst gilt die erste.
 * Kein Zusammenhang mit preismatrix.js: Die Leiter rechnet unabhängig weiter. */
(function () {
  'use strict';
  var wurzel = document.getElementById('pm-branchen');
  if (!wurzel) return;
  var chips = wurzel.querySelector('.pm-branchen__chips');
  var listen = wurzel.querySelectorAll('[data-sprosse]');
  var nervt = wurzel.querySelector('.pm-branchen__nervt');
  var mehr = document.getElementById('pm-branchen-mehr');
  if (!chips || !listen.length) return;
  var SPEICHER = 'vaiacon-branche';
  var daten = null, knoepfe = [];

  function gemerkt() {
    try { return localStorage.getItem(SPEICHER) || ''; } catch (e) { return ''; }
  }
  function merken(id) {
    try { localStorage.setItem(SPEICHER, id); } catch (e) { /* ohne Speicher */ }
  }

  function fuellen(ul, eintraege, mitTitel) {
    ul.textContent = '';
    if (!eintraege || !eintraege.length) return;
    for (var i = 0; i < eintraege.length; i++) {
      var e = eintraege[i];
      var li = document.createElement('li');
      if (mitTitel) {
        var t = document.createElement('b');
        t.textContent = e.titel || '';
        var sp = document.createElement('span');
        sp.textContent = e.satz || '';
        li.appendChild(t);
        li.appendChild(document.createTextNode(' '));
        li.appendChild(sp);
      } else {
        li.textContent = e;
      }
      ul.appendChild(li);
    }
  }

  function zeige(id) {
    var b = daten[id];
    if (!b) return;
    for (var i = 0; i < listen.length; i++) {
      var s = listen[i].getAttribute('data-sprosse');
      fuellen(listen[i], b[s], true);
    }
    if (nervt) {
      var n = nervt.querySelector('ul');
      var hat = b.nervt && b.nervt.length;
      nervt.hidden = !hat;
      if (n && hat) fuellen(n, b.nervt, false);
    }
    for (var k = 0; k < knoepfe.length; k++) {
      var an = knoepfe[k].getAttribute('data-branche') === id;
      knoepfe[k].setAttribute('aria-selected', an ? 'true' : 'false');
      knoepfe[k].tabIndex = an ? 0 : -1;
    }
    // Link zur Branchenseite (automationen-<branche>); bei «alle» gibt es keine.
    if (mehr) {
      var hat = id !== 'alle';
      mehr.hidden = !hat;
      if (hat) {
        var a = mehr.querySelector('a');
        a.href = 'automationen-' + id;
        a.textContent = 'Mehr für ' + (b.name || id) + ' →';
      }
    }
    wurzel.setAttribute('data-branche', id);
  }

  function baue() {
    chips.textContent = '';
    knoepfe = [];
    Object.keys(daten).forEach(function (id) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('data-branche', id);
      b.setAttribute('aria-selected', 'false');
      var bild = document.createElement('img');
      bild.className = 'pm-branchen__ico';
      bild.src = 'assets/branchen/bot-' + id + '.webp?v=20261011-bots5';
      bild.alt = ''; bild.width = 80; bild.height = 96; bild.loading = 'lazy'; bild.decoding = 'async';
      b.appendChild(bild);
      b.appendChild(document.createTextNode(daten[id].name || id));
      b.addEventListener('click', function () { zeige(id); merken(id); });
      b.addEventListener('keydown', function (e) {
        var n = knoepfe.indexOf(b);
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          var z = knoepfe[(n + (e.key === 'ArrowRight' ? 1 : knoepfe.length - 1)) % knoepfe.length];
          z.focus(); z.click(); e.preventDefault();
        }
      });
      knoepfe.push(b);
      chips.appendChild(b);
    });
    var start = ausHash() || gemerkt();
    if (!daten[start]) start = Object.keys(daten)[0];
    zeige(start);
    if (ausHash()) wurzel.scrollIntoView();
  }

  // Sprungziel aus der Navigation: bot#branche-<id> wählt die Branche und springt zur Auswahl.
  function ausHash() {
    var m = /^#branche-([a-z-]+)$/.exec(location.hash);
    return m && daten && daten[m[1]] ? m[1] : '';
  }
  function sprung() {
    var id = ausHash();
    if (!id) return;
    zeige(id); merken(id);
    wurzel.scrollIntoView();
  }
  window.addEventListener('hashchange', sprung);
  // Gleicher Hash nochmals angeklickt (Auswahl wurde inzwischen gewechselt): hashchange bleibt aus.
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href*="#branche-"]');
    if (!a || a.hash !== location.hash) return;
    setTimeout(sprung, 0);
  });

  fetch('daten/branchen.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (!j || typeof j !== 'object' || !Object.keys(j).length) return;
      daten = j;
      baue();
    })
    .catch(function () { /* Ohne Daten bleibt die erste Branche aus dem HTML stehen. */ });
})();
