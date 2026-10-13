/* Startseite, Zweig «blender»: Startbühne mit dem 3D-Logo.
   Beim Laden fliegen V-Pfeil und Buchstaben ein (Vorspann, 132 Bilder, 30 fps, gleiche Kamera wie die Szene);
   das letzte Vorspann-Bild endet genau auf Bild 1 der Scroll-Szene, dann übernimmt das Scrollen.
   Wer schon scrollt, überspringt den Vorspann. Ohne Skript steht Bild 1 als Standbild da.
   Mit dem ersten Scrollen läuft die Bildfolge auf <canvas> (das Bild folgt der Scroll-Position),
   der Einstiegstext blendet aus, die drei Bereiche erscheinen an ihren Stationen.
   Desktop: 90 Bilder 1280x640, alle drei Texte nacheinander.
   Mobil (<= 760 px): 46 Bilder 800x400; erst das ganze Logo, dann folgt der Ausschnitt dem aktiven Teil, ein Text zur Zeit.
   Reduzierte Bewegung / Datensparen / ohne Skript: Logo, Einstieg und alle drei Texte untereinander. */
(function () {
  'use strict';

  var reduziert = false, spar = false;
  try { reduziert = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  try { spar = !!(navigator.connection && navigator.connection.saveData); } catch (e) {}

  /* ───── Scroll-Szene ───── */
  var szene = document.querySelector('[data-bl-szene]');
  if (!szene) return;
  /* Weisse Fassung (?weiss): eigene, durchsichtige Bildsätze; der Terracotta-Grund kommt aus dem CSS */
  var X = document.documentElement.classList.contains('bl-weiss') ? '-weiss' : '';
  if (X) {
    var st = szene.querySelector('.bl-szene__still'), qu = szene.querySelector('picture source');
    if (qu) qu.srcset = 'assets/blender/szene-weiss-mobil/001.webp';
    if (st) st.src = 'assets/blender/szene-weiss/001.webp';
    document.documentElement.classList.add('bl-weiss-bild');
  }
  if (reduziert || spar) return;
  var canvas = szene.querySelector('canvas');
  var texte = Array.prototype.slice.call(szene.querySelectorAll('.bl-text'));
  var intro = szene.querySelector('.bl-intro');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var mq = window.matchMedia('(max-width: 760px)');
  var mobil = mq.matches;
  var N, DIR, BW, BH;
  function festlegen() {
    mobil = mq.matches;
    N = mobil ? 46 : 90;
    DIR = 'assets/blender/szene' + X + (mobil ? '-mobil/' : '/');
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
  var bereit = false;   /* Canvas hat gezeichnet, Standbild darf weg */

  /* Vorspann: 'warten' (Bilder laden), 'laeuft', 'fertig' */
  var VN = 132, VFPS = 30;
  var wurzel = document.documentElement;
  var vorspann = wurzel.classList.contains('bl-vorspann') ? 'warten' : 'fertig';
  var vbilder = [], vgeladen = 0, vt0 = 0, vZeit = 0;

  var SPALTEN = [0.22, 0.5, 0.78]; /* Lage der drei Teile im Endbild */

  function glatt(a, b, x) { x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); }
  function klemm(x, a, b) { return Math.max(a, Math.min(b, x)); }

  function laden() {
    if (start) return;
    start = true;
    szene.classList.add('bl-an');
    texte.forEach(function (t) { t.classList.remove('is-sichtbar'); });
    messen();
    if (vorspann === 'warten' && ziel > 0.003) vorspannEnde();
    /* Reihenfolge: Szenenbild 1 (kommt aus dem Zwischenspeicher), dann der Vorspann, dann der Rest der Szene */
    var liste = [[0, false]], j;
    if (vorspann === 'warten') for (j = 0; j < VN; j++) liste.push([j, true]);
    for (j = 1; j < N; j++) liste.push([j, false]);
    var i = 0, offen = 0, satz = DIR, vsatz = 'assets/blender/vorspann' + X + (mobil ? '-mobil/' : '/');
    function weiter() {
      while (i < liste.length && offen < 4) {
        if (liste[i][1] && vorspann !== 'warten') { i++; continue; }   /* Vorspann übersprungen: nicht mehr laden */
        (function (k, v) {
          var img = new Image();
          img.decoding = 'async';
          offen++;
          img.onload = img.onerror = function () {
            offen--;
            if (satz !== DIR) return;    /* inzwischen auf den anderen Bildsatz gewechselt */
            if (v) { vgeladen++; if (img.naturalWidth) vbilder[k] = img; if (vgeladen === VN) vorspannStart(); }
            else { geladen++; if (img.naturalWidth) bilder[k] = img; zeichnen(true); }
            weiter();
          };
          img.src = (v ? vsatz : DIR) + ('00' + (k + 1)).slice(-3) + '.webp';
        })(liste[i][0], liste[i][1]);
        i++;
      }
    }
    weiter();
    if (vorspann === 'warten') vZeit = setTimeout(function () { if (vorspann === 'warten') vorspannEnde(); }, 5000);
    anfordern();
  }

  /* ───── Vorspann ───── */
  function vorspannStart() {
    if (vorspann !== 'warten') return;
    clearTimeout(vZeit);
    vorspann = 'laeuft'; vt0 = 0;
    requestAnimationFrame(spielen);
  }
  function spielen(jetzt) {
    if (vorspann !== 'laeuft') return;
    if (!vt0) vt0 = jetzt;       /* startet erst, wenn der Tab sichtbar ist */
    var k = Math.floor((jetzt - vt0) / 1000 * VFPS);
    if (k >= VN || ziel > 0.003) { vorspannEnde(); return; }
    for (var d = k; d >= 0; d--) if (vbilder[d]) { malen(vbilder[d], 1, 0.5); break; }
    requestAnimationFrame(spielen);
  }
  function vorspannEnde() {
    if (vorspann === 'fertig') return;
    clearTimeout(vZeit);
    vorspann = 'fertig';
    vbilder = [];
    wurzel.classList.remove('bl-vorspann');
    zuletzt = -1;
    zeichnen(true);
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

  /* Mobil: Anteil der Bildbreite im Ausschnitt; am Anfang das ganze Logo, dann 40 % */
  function anteil(sm) { return 1 - 0.6 * glatt(0, 0.16, sm); }

  function zeichnen(erzwingen) {
    if (vorspann !== 'fertig') return;
    var q = aktuell;
    var s = mobil ? klemm(q / 0.7, 0, 1) : klemm(q / 0.8, 0, 1);
    var img = bildFuer(s);
    if (!img) return;
    var f = mobil ? anteil(s) : 1;
    var schluessel = Math.round(s * (N - 1)) + ':' + Math.round(cx * 1000) + ':' + Math.round(f * 1000) + (mobil ? 'm' : '');
    if (!erzwingen && schluessel === zuletzt) return;
    zuletzt = schluessel;
    malen(img, f, cx);
  }

  function malen(img, f, cx) {
    var W = img.naturalWidth, H = img.naturalHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (mobil) {
      /* Ausschnitt im Seitenverhältnis des Canvas; was über das Bild hinausragt, bleibt leer (Seitenfarbe) */
      var sw = W * f, sh = sw * canvas.height / canvas.width;
      var sx = klemm(cx * W - sw / 2, 0, W - sw), sy = (H - sh) / 2;
      var x0 = Math.max(sx, 0), y0 = Math.max(sy, 0), x1 = Math.min(sx + sw, W), y1 = Math.min(sy + sh, H);
      var k = canvas.width / sw;
      ctx.drawImage(img, x0, y0, x1 - x0, y1 - y0, (x0 - sx) * k, (y0 - sy) * k, (x1 - x0) * k, (y1 - y0) * k);
    } else {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
    if (!bereit) { bereit = true; szene.classList.add('bl-bereit'); }
  }

  function texteSetzen() {
    var q = aktuell;
    var s0 = mobil ? klemm(q / 0.7, 0, 1) : klemm(q / 0.8, 0, 1);
    if (intro) intro.classList.toggle('is-weg', s0 >= (mobil ? 0.18 : 0.22));
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
      vorspannEnde();
      festlegen(); bilder = []; geladen = 0; start = false; zuletzt = -1; bereit = false;
      szene.classList.remove('bl-bereit');
      laden();
    }
    beiScroll();
  });

  /* Die Bühne ist der Seitenanfang: sofort laden. Szenenbild 1 ist dieselbe Datei wie das Standbild und kommt aus dem Zwischenspeicher. */
  laden();
})();
