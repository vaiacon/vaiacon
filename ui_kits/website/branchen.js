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
      bild.src = 'assets/branchen/' + id + '.webp?v=20261010-ico';
      bild.alt = ''; bild.width = 24; bild.height = 24; bild.loading = 'lazy'; bild.decoding = 'async';
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
    var start = gemerkt();
    if (!daten[start]) start = Object.keys(daten)[0];
    zeige(start);
  }

  fetch('daten/branchen.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (!j || typeof j !== 'object' || !Object.keys(j).length) return;
      daten = j;
      baue();
    })
    .catch(function () { /* Ohne Daten bleibt die erste Branche aus dem HTML stehen. */ });
})();
