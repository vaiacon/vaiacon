/* Startseite, Zweig «blender»:
   1. Logo-Intro (einmal) blendet über das Poster, danach folgt nahtlos die Schleife.
   2. Scroll-Szene: Bildfolge auf <canvas>, das Bild folgt der Scroll-Position.
      Desktop: 90 Bilder 1280x640, alle drei Texte erscheinen nacheinander.
      Mobil (<= 760 px): 46 Bilder 800x400, der Ausschnitt folgt dem aktiven Teil, ein Text zur Zeit.
      Reduzierte Bewegung / Datensparen / ohne Skript: ein Standbild und alle drei Texte untereinander. */
(function () {
  'use strict';

  var reduziert = false, spar = false;
  try { reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  try { spar = !!(navigator.connection && navigator.connection.saveData); } catch (e) {}

  /* ───── Logo-Bühne: Intro einmal, danach nahtlos die Schleife ───── */
  var buehne = document.querySelector('.bl-logo');
  var vIntro = buehne && buehne.querySelector('[data-b="intro"]');
  var vLoop = buehne && buehne.querySelector('[data-b="loop"]');
  if (vIntro && vLoop && !reduziert && !spar) {
    var hoch = window.matchMedia('(max-width: 760px)').matches;
    var webm = !!(vIntro.canPlayType && vIntro.canPlayType('video/webm; codecs="vp9"'));
    var quelle = function (n) { return 'assets/blender/logo-' + n + '-' + (hoch ? 'hoch' : 'breit') + (webm ? '.webm' : '.mp4'); };
    vLoop.preload = 'auto'; vLoop.src = quelle('loop'); vLoop.load();
    vIntro.preload = 'auto'; vIntro.src = quelle('intro');
    var zurSchleife = function () {
      var q = vLoop.play();
      var an = function () { buehne.classList.add('is-loop'); };
      vLoop.addEventListener('playing', an, { once: true });
      if (q && q.catch) q.catch(function () { /* letztes Intro-Bild bleibt stehen */ });
    };
    vIntro.addEventListener('playing', function () { buehne.classList.add('is-intro'); }, { once: true });
    vIntro.addEventListener('ended', zurSchleife, { once: true });
    var p = vIntro.play();
    if (p && p.catch) p.catch(function () { /* Poster (fertiges Logo) bleibt */ });
    /* Tab im Hintergrund: Schleife anhalten, spart Strom */
    document.addEventListener('visibilitychange', function () {
      if (!buehne.classList.contains('is-loop')) return;
      if (document.hidden) vLoop.pause(); else { var r = vLoop.play(); if (r && r.catch) r.catch(function () {}); }
    });
  }

  /* ───── Scroll-Szene ───── */
  var szene = document.querySelector('[data-bl-szene]');
  if (!szene || reduziert || spar) return;
  var canvas = szene.querySelector('canvas');
  var texte = Array.prototype.slice.call(szene.querySelectorAll('.bl-text'));
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var mq = window.matchMedia('(max-width: 760px)');
  var mobil = mq.matches;
  var N, DIR, BW, BH;
  function festlegen() {
    mobil = mq.matches;
    N = mobil ? 46 : 90;
    DIR = mobil ? 'assets/blender/szene-mobil/' : 'assets/blender/szene/';
    BW = mobil ? 800 : 1280;
    BH = mobil ? 400 : 640;
    /* Mobil: Ausschnitt 40 % der Bildbreite */
    canvas.width = mobil ? Math.round(BW * 0.4) : BW;
    canvas.height = mobil ? Math.round(BH * 0.875) : BH;
  }
  festlegen();

  var bilder = [];      /* geladene Bilder, Index 0..N-1 */
  var geladen = 0;
  var start = false;
  var ziel = 0;         /* Scroll-Fortschritt 0..1 */
  var aktuell = 0;      /* geglättet */
  var cx = 0.5;         /* Mobil: Mitte des Ausschnitts (Anteil der Bildbreite) */
  var zuletzt = -1;
  var laeuft = false;

  var SPALTEN = [0.22, 0.5, 0.78]; /* Lage der drei Teile im Endbild */

  function glatt(a, b, x) { x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); }
  function klemm(x, a, b) { return Math.max(a, Math.min(b, x)); }

  function laden() {
    if (start) return;
    start = true;
    szene.classList.add('bl-an');
    texte.forEach(function (t) { t.classList.remove('is-sichtbar'); });
    var i = 0;
    function weiter() {
      /* in Reihenfolge, zwei gleichzeitig; erst das erste Bild, dann der Rest */
      while (i < N && (i - geladen) < 3) {
        (function (k) {
          var img = new Image();
          img.decoding = 'async';
          img.onload = img.onerror = function () { geladen++; if (img.naturalWidth) bilder[k] = img; zeichnen(true); weiter(); };
          img.src = DIR + ('00' + (k + 1)).slice(-3) + '.webp';
        })(i);
        i++;
      }
    }
    weiter();
    messen();
    anfordern();
  }

  function messen() {
    var r = szene.getBoundingClientRect();
    var weg = szene.offsetHeight - window.innerHeight;
    ziel = weg > 0 ? klemm(-r.top / weg, 0, 1) : 0;
  }

  function bildFuer(s) {
    var k = Math.round(s * (N - 1));
    /* nächstes geladenes Bild, zuerst abwärts, dann aufwärts */
    for (var d = 0; d < N; d++) {
      if (bilder[k - d]) return bilder[k - d];
      if (bilder[k + d]) return bilder[k + d];
    }
    return null;
  }

  function zeichnen(erzwingen) {
    var q = aktuell;
    var s = mobil ? klemm(q / 0.7, 0, 1) : klemm(q / 0.8, 0, 1);
    var img = bildFuer(s);
    if (!img) return;
    var schluessel = Math.round(s * (N - 1)) * 1000 + Math.round(cx * 1000) + (mobil ? 1e7 : 0);
    if (!erzwingen && schluessel === zuletzt) return;
    zuletzt = schluessel;
    var W = img.naturalWidth, H = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mobil) {
      var sw = W * 0.4, sh = H * 0.875;
      var sx = klemm(cx * W - sw / 2, 0, W - sw);
      ctx.drawImage(img, sx, (H - sh) / 2, sw, sh, 0, 0, canvas.width, canvas.height);
    } else {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
  }

  function texteSetzen() {
    var q = aktuell;
    for (var k = 0; k < texte.length; k++) {
      var an;
      if (mobil) {
        var sm = klemm(q / 0.7, 0, 1), TS = [0.40, 0.70, 0.94]; an = sm >= TS[k] && (k === 2 || sm < TS[k + 1]);
      } else {
        an = klemm(q / 0.8, 0, 1) >= [0.40, 0.70, 0.94][k];
      }
      texte[k].classList.toggle('is-sichtbar', an);
    }
  }

  function cxZiel() {
    var q = klemm(ziel / 0.7, 0, 1);
    var a = SPALTEN.map(function (x) { return klemm(x, 0.2, 0.8); });
    var v = 0.5;
    v += (a[0] - 0.5) * glatt(0.16, 0.30, q);
    v += (a[1] - a[0]) * glatt(0.48, 0.60, q);
    v += (a[2] - a[1]) * glatt(0.76, 0.88, q);
    return v;
  }

  function takt() {
    laeuft = false;
    var d = ziel - aktuell;
    if (Math.abs(d) < 0.0004) aktuell = ziel; else aktuell += d * 0.16;
    var cz = mobil ? cxZiel() : 0.5;
    if (Math.abs(cz - cx) < 0.0005) cx = cz; else cx += (cz - cx) * 0.18;
    zeichnen(false);
    texteSetzen();
    if (aktuell !== ziel || cx !== cz) anfordern();
  }
  function anfordern() { if (!laeuft) { laeuft = true; requestAnimationFrame(takt); } }

  function beiScroll() { messen(); anfordern(); }
  window.addEventListener('scroll', beiScroll, { passive: true });
  window.addEventListener('resize', function () {
    var war = mobil;
    if (mq.matches !== war) {
      festlegen(); bilder = []; geladen = 0; start = false; zuletzt = -1;
      laden();
    }
    beiScroll();
  });

  /* nach dem ersten Bild der Seite: Ruhe abwarten, dann laden */
  function nachErstemBild() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(laden, { timeout: 2500 });
    else setTimeout(laden, 800);
  }
  if (document.readyState === 'complete') nachErstemBild();
  else window.addEventListener('load', nachErstemBild);
})();
