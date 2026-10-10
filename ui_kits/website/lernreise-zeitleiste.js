/* Lernreise als Zeitleiste (10.10.2026)
   Zeigt die Tafeln aus learning.html (#lernreise-zeitleiste) als Leiste links
   und eine wechselnde Karte rechts. Bildschirm (ab 900px, ohne reduzierte
   Bewegung): die Bühne klebt, Scrollen wechselt die Station. Sonst: tippen.
   Die Tafeln selbst baut lernreise.js (Formular); dieses Skript hört auf
   'lernreise:gebaut' und baut Leiste und Zustand neu. Ohne JavaScript bleibt
   die Liste aus dem HTML stehen. */
(function (root) {
  'use strict';
  var doc = root.document;
  var lz = doc.getElementById('lernreise-zeitleiste');
  if (!lz) return;

  var leiste = lz.querySelector('.lz-leiste');
  var ol = null;
  var stand = lz.querySelector('.lz-stand');
  var zurueck = lz.querySelector('[data-lz-zurueck]');
  var weiter = lz.querySelector('[data-lz-weiter]');
  var tafeln = [], punkte = [];
  var aktiv = 0;
  var scrollModus = false;
  var SCHRITT = 100;
  var oben = 82;   /* Höhe der Kopfzeile, bei der die Bühne klebt (Rückfall wie im CSS) */

  var mqBreit = root.matchMedia ? root.matchMedia('(min-width: 900px)') : null;
  var mqRuhig = root.matchMedia ? root.matchMedia('(prefers-reduced-motion: reduce)') : null;

  function sauber(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim(); }

  /* ── Leiste aus den Tafeln ─────────────────────────────────────────── */
  function leisteBauen() {
    tafeln = Array.prototype.slice.call(lz.querySelectorAll('.lz-tafel'));
    leiste.innerHTML = '';
    ol = doc.createElement('ol');
    var spur = doc.createElement('span'); spur.className = 'lz-leiste__spur';
    var fuell = doc.createElement('span'); fuell.className = 'lz-leiste__fuellung';
    ol.appendChild(spur); ol.appendChild(fuell);
    punkte = tafeln.map(function (t, i) {
      var ziel = t.classList.contains('lz-tafel--ziel');
      var li = doc.createElement('li');
      var b = doc.createElement('button');
      b.type = 'button';
      b.className = 'lz-punkt';
      var nr = doc.createElement('span'); nr.className = 'lz-punkt__nr';
      var text = doc.createElement('span'); text.className = 'lz-punkt__text';
      var zeit = doc.createElement('span'); zeit.className = 'lz-punkt__zeit';
      var titel = doc.createElement('span'); titel.className = 'lz-punkt__titel';
      if (ziel) {
        var f = doc.createElement('span'); f.className = 'lz-fahne'; f.setAttribute('aria-hidden', 'true');
        nr.appendChild(f);
        var w = t.querySelector('[data-lz-woche]');
        zeit.textContent = (t.getAttribute('data-punkt-zeit') || 'Ab Woche ') + (w ? sauber(w) : '');
        titel.textContent = t.getAttribute('data-punkt-titel') || sauber(t.querySelector('h3'));
      } else {
        nr.textContent = String(i + 1);
        var z = t.querySelector('.lz-zeit');
        var zn = z && z.querySelector('.lz-zeit__nr');
        var zt = z ? sauber(z) : '';
        if (zn) zt = zt.slice(sauber(zn).length).trim();
        zeit.textContent = zt;
        titel.textContent = sauber(t.querySelector('h3'));
      }
      text.appendChild(zeit); text.appendChild(titel);
      b.appendChild(nr); b.appendChild(text);
      if (t.querySelector('.lz-mess')) {
        var fa = doc.createElement('span'); fa.className = 'lz-fahne'; fa.setAttribute('aria-hidden', 'true');
        b.appendChild(fa);
      }
      b.addEventListener('click', function () { gehZu(i); });
      li.appendChild(b); ol.appendChild(li);
      return b;
    });
    leiste.appendChild(ol);
    lz.style.setProperty('--lz-n', String(tafeln.length));
  }

  /* ── Zustand ───────────────────────────────────────────────────────── */
  function setzen(i, ausScroll) {
    var n = tafeln.length;
    i = Math.max(0, Math.min(n - 1, i));
    aktiv = i;
    tafeln.forEach(function (t, k) {
      t.classList.toggle('ist-aktiv', k === i);
      t.classList.toggle('ist-vorbei', k < i);
      if (k === i) t.removeAttribute('aria-hidden'); else t.setAttribute('aria-hidden', 'true');
      if ('inert' in t) t.inert = k !== i;
    });
    punkte.forEach(function (b, k) {
      b.classList.toggle('ist-erreicht', k <= i);
      if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    leiste.style.setProperty('--lz-fortschritt', String(i));
    if (stand) stand.textContent = 'Station ' + (i + 1) + ' von ' + n;
    if (zurueck) zurueck.hidden = i === 0;
    if (weiter) weiter.hidden = i === n - 1;
    if (!scrollModus && punkte[i] && ol && ol.scrollWidth > ol.clientWidth) {
      /* waagrechte Leiste (Handy): aktiven Punkt in die Sicht rücken, ohne die Seite zu bewegen */
      var p = punkte[i], l = p.offsetLeft, r = l + p.offsetWidth;
      if (l < ol.scrollLeft) ol.scrollLeft = l - 4;
      else if (r > ol.scrollLeft + ol.clientWidth) ol.scrollLeft = r - ol.clientWidth + 4;
    }
  }

  function lzTop() { return lz.getBoundingClientRect().top + root.pageYOffset - oben; }

  function gehZu(i) {
    i = Math.max(0, Math.min(tafeln.length - 1, i));
    if (scrollModus) {
      var ruhig = mqRuhig && mqRuhig.matches;
      root.scrollTo({ top: lzTop() + i * SCHRITT, behavior: ruhig ? 'instant' : 'smooth' });
      setzen(i);
    } else {
      setzen(i);
    }
  }

  function ausScroll() {
    if (!scrollModus) return;
    var i = Math.round((root.pageYOffset - lzTop()) / SCHRITT);
    i = Math.max(0, Math.min(tafeln.length - 1, i));
    if (i !== aktiv) setzen(i, true);
  }

  var wartet = false;
  root.addEventListener('scroll', function () {
    if (wartet) return;
    wartet = true;
    root.requestAnimationFrame(function () { wartet = false; ausScroll(); });
  }, { passive: true });

  /* ── Modus und Kopfzeile ───────────────────────────────────────────── */
  function kopfzeile() {
    var h = doc.querySelector('.sv-header, .mock-header');
    var hoehe = h ? h.offsetHeight : 0;
    if (hoehe > 0) { oben = hoehe; lz.style.setProperty('--lz-oben', hoehe + 'px'); }
  }

  function modus() {
    var neu = !!(mqBreit && mqBreit.matches && !(mqRuhig && mqRuhig.matches));
    lz.classList.toggle('lz--scroll', neu);
    var war = scrollModus;
    scrollModus = neu;
    kopfzeile();
    if (neu && !war) ausScroll();
  }
  [mqBreit, mqRuhig].forEach(function (m) {
    if (!m) return;
    if (m.addEventListener) m.addEventListener('change', modus); else if (m.addListener) m.addListener(modus);
  });
  root.addEventListener('resize', kopfzeile);

  /* ── Bedienung ─────────────────────────────────────────────────────── */
  if (zurueck) zurueck.addEventListener('click', function () { gehZu(aktiv - 1); });
  if (weiter) weiter.addEventListener('click', function () { gehZu(aktiv + 1); });
  lz.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target && e.target.closest && e.target.closest('dialog')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      gehZu(aktiv + (e.key === 'ArrowRight' ? 1 : -1));
      if (punkte[aktiv] && e.target.classList && e.target.classList.contains('lz-punkt')) punkte[aktiv].focus({ preventScroll: true });
    }
  });

  /* ── Dialog Zielcheck ──────────────────────────────────────────────── */
  function dialogBinden() {
    Array.prototype.forEach.call(lz.querySelectorAll('[data-lz-dialog]'), function (knopf) {
      var dlg = doc.getElementById(knopf.getAttribute('data-lz-dialog'));
      if (!dlg || typeof dlg.showModal !== 'function') return;
      knopf.addEventListener('click', function () { dlg.showModal(); });
      dlg.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('[data-lz-schliessen]')) { dlg.close(); return; }
        if (e.target === dlg) {   /* Klick auf den Hintergrund, nicht auf die Fläche des Dialogs */
          var r = dlg.getBoundingClientRect();
          if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
        }
      });
      dlg.addEventListener('close', function () { try { knopf.focus({ preventScroll: true }); } catch (e) { /* egal */ } });
    });
  }

  /* ── Start und Neuaufbau ───────────────────────────────────────────── */
  function neu(zurStation1) {
    leisteBauen();
    setzen(0);
    if (zurStation1 && scrollModus) {
      var top = lzTop();
      if (root.pageYOffset > top) root.scrollTo({ top: top, behavior: 'instant' });
    }
  }

  function ausUrl() {
    var m = /[?&]station=(\d+)/.exec(root.location.search || '');
    if (!m) return;
    var n = parseInt(m[1], 10);
    if (!(n >= 1 && n <= tafeln.length)) return;
    var i = n - 1;
    var los = function () {
      if (scrollModus) {
        root.scrollTo({ top: lzTop() + i * SCHRITT, behavior: 'instant' });
      } else {
        root.scrollTo({ top: lzTop() - 8, behavior: 'instant' });
      }
      setzen(i);
    };
    los();
    /* Bilder und Schriften verschieben das Layout noch kurz */
    root.addEventListener('load', los);
  }

  lz.classList.add('lz--an');
  modus();
  dialogBinden();
  leisteBauen();
  setzen(0);
  ausUrl();

  /* Formularwechsel: lernreise.js baut die Tafeln neu und feuert das Ereignis */
  doc.addEventListener('lernreise:gebaut', function () { neu(true); });
})(window);
