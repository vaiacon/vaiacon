/* Lernreise als 3D-Fahrt (seit 10.10.2026)
   Eine Strasse in echtem 3D (Three.js, selbst gehostet unter vendor/), die man
   beim Scrollen entlangfährt. Die Etappen stehen auf der Fahrbahn, am Rand
   steht je ein Schild mit dem Text und ein Büro-Bot. Daneben zeigt eine
   HTML-Karte die nächste Station als Text (lesbar, kopierbar, zugänglich).

   Daten und Auswahl kommen aus lernreise.js (window.VaiaconLernreise); nach
   jeder Änderung im Formular feuert es 'lernreise:gebaut', dann wird die
   Szene neu gebaut. Three wird erst geladen, wenn der Abschnitt in die Nähe
   des Bildschirms kommt. Ohne WebGL, bei reduzierter Bewegung, unter 360 px
   Breite, bei einem Fehler oder mit ?ohne3d=1 bleibt die Liste stehen. */

const doc = document;
const win = window;
const app = doc.getElementById('lernreise-app');
const weg = doc.getElementById('lernreise-weg');

/* Farben der Seite (tokens/colors.css) */
const C = {
  card: 0xFFFDF8, creme50: 0xFBF4EE, sand200: 0xEAE0CC, ink: 0x1C1613,
  braun600: 0x5A524B, terra: 0xB25222, peach200: 0xFFD9C2,
  strasse: 0x7A6C5F, rand: 0xEFE6D2, boden: 0xE8DCC4
};
const hex = (n) => '#' + n.toString(16).padStart(6, '0');

let THREE = null;
let Z = null;            // aktueller Zustand der Szene (null = nichts gebaut)
let R = null;            // Renderer, Kamera, Bühne: bleiben über Neubauten bestehen
let ausgefallen = false;
let bauNummer = 0;
const botBilder = {};

if (app && weg) beginnen();

function beginnen() {
  const qs = win.location.search;
  const reduziert = win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (/[?&]ohne3d=1/.test(qs) || reduziert || win.innerWidth < 360 || !webglDa()) return;

  let angefordert = false;
  const los = () => {
    if (angefordert) return;
    angefordert = true;
    doc.addEventListener('lernreise:gebaut', (e) => neuBauen(e.detail));
    laden().then(() => {
      const V = win.VaiaconLernreise;
      if (V && V.letzter) neuBauen(V.letzter);
    }).catch(aufgeben);
  };
  if ('IntersectionObserver' in win) {
    const io = new IntersectionObserver((es) => {
      if (es.some((x) => x.isIntersecting)) { io.disconnect(); los(); }
    }, { rootMargin: '1400px 0px 1400px 0px' });
    io.observe(app);
  } else {
    los();
  }
}

function webglDa() {
  try {
    const c = doc.createElement('canvas');
    return !!(win.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

async function laden() {
  THREE = await import('../../vendor/three-0.160.0.module.min.js');
}

function aufgeben(fehler) {
  ausgefallen = true;
  if (fehler && win.console) console.warn('Lernreise 3D nicht verfügbar, Liste bleibt:', fehler);
  abbauen();
  weg.hidden = false;
}

/* ── Hilfen ─────────────────────────────────────────────────────────── */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const klemme = (v, a, b) => Math.min(b, Math.max(a, v));
const mische = (a, b, t) => a + (b - a) * t;
const glatt = (a, b, v) => { const t = klemme((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

function fondFarbe() {
  /* Hintergrundfarbe der Seite, damit Nebel und Rand nahtlos übergehen */
  let e = app;
  while (e) {
    const f = win.getComputedStyle(e).backgroundColor;
    const m = /rgba?\((\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,/]+([\d.]+))?/.exec(f);
    if (m && (m[4] === undefined || parseFloat(m[4]) > 0.95)) return (+m[1] << 16) | (+m[2] << 8) | +m[3];
    e = e.parentElement;
  }
  return 0xF4EDE1;
}

async function schriftenLaden() {
  if (!doc.fonts || !doc.fonts.load) return;
  const proben = ['700 54px Quicksand', '600 40px Quicksand', '500 40px Quicksand', '500 24px "IBM Plex Mono"', '600 24px "IBM Plex Mono"'];
  await Promise.all(proben.map((f) => doc.fonts.load(f, 'Äöü Woche 0123456789').catch(() => {})));
}

function bildLaden(name) {
  if (botBilder[name]) return botBilder[name];
  botBilder[name] = new Promise((ok) => {
    const im = new Image();
    im.onload = () => ok(im);
    let png = false;
    im.onerror = () => { if (png) ok(null); else { png = true; im.src = new URL('../../assets/vaiacon-buerobot-' + name + '.png', import.meta.url).href; } };
    im.src = new URL('../../assets/vaiacon-buerobot-' + name + '.webp', import.meta.url).href;
  });
  return botBilder[name];
}

/* Zeilen umbrechen, Wort für Wort */
function umbrechen(ctx, text, maxB) {
  const worte = String(text).split(/\s+/);
  const zeilen = [];
  let z = '';
  worte.forEach((w) => {
    const probe = z ? z + ' ' + w : w;
    if (z && ctx.measureText(probe).width > maxB) { zeilen.push(z); z = w; } else { z = probe; }
  });
  if (z) zeilen.push(z);
  return zeilen;
}

function rundRechteck(ctx, x, y, b, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + b, y, x + b, y + h, r);
  ctx.arcTo(x + b, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + b, y, r);
  ctx.closePath();
}

function leinwand(b, h) {
  const c = doc.createElement('canvas');
  c.width = Math.max(2, Math.round(b));
  c.height = Math.max(2, Math.round(h));
  return c;
}

function textur(canvas, aniso) {
  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso || 4;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.magFilter = THREE.LinearFilter;
  return t;
}

/* ── Texturen: Markierung, Schild, Banner ───────────────────────────── */
const PX_M = 120;          // Pixel je Einheit für die Fahrbahnschrift (Desktop)

function markierungTextur(nr, st, zeile, px, aniso) {
  const bE = 5.4, lE = 7.6;               // Einheiten
  const k = px / 100;                     // Entwurf in 100 px je Einheit
  const c = leinwand(bE * px, lE * px);
  const g = c.getContext('2d');
  g.scale(k, k);
  const B = bE * 100;
  g.textAlign = 'center';
  g.textBaseline = 'alphabetic';
  /* Nummer: cremefarbene Scheibe, terrafarbene Ziffer */
  const cy = 128;
  g.fillStyle = hex(C.creme50);
  g.beginPath(); g.arc(B / 2, cy, 92, 0, Math.PI * 2); g.fill();
  g.lineWidth = 7; g.strokeStyle = hex(C.terra);
  g.beginPath(); g.arc(B / 2, cy, 78, 0, Math.PI * 2); g.stroke();
  g.fillStyle = hex(C.terra);
  g.font = '700 ' + (nr > 9 ? 96 : 118) + 'px Quicksand, sans-serif';
  g.fillText(String(nr), B / 2, cy + (nr > 9 ? 33 : 41));
  /* Titel */
  g.fillStyle = hex(C.creme50);
  g.font = '700 54px Quicksand, sans-serif';
  const zl = umbrechen(g, st.titel, B - 36).slice(0, 3);
  let y = 300;
  zl.forEach((t) => { g.fillText(t, B / 2, y); y += 62; });
  /* Zeile: Woche · Rolle */
  y += 12;
  g.fillStyle = hex(C.peach200);
  g.font = '600 27px "IBM Plex Mono", monospace';
  if ('letterSpacing' in g) g.letterSpacing = '2px';
  umbrechen(g, zeile.toUpperCase(), B - 30).slice(0, 2).forEach((t) => { g.fillText(t, B / 2, y); y += 36; });
  return textur(c, aniso);
}

const SCHILD_PX = 140;     // Entwurfsmass: 140 px je Einheit
function schildTextur(st, breiteE, schriftPx, aniso, px) {
  const k = px / SCHILD_PX;
  const B = breiteE * SCHILD_PX;
  const pad = 40, fs = schriftPx, lh = Math.round(fs * 1.32);
  const probe = leinwand(8, 8).getContext('2d');
  probe.font = '500 ' + fs + 'px Quicksand, sans-serif';
  const zeilen = umbrechen(probe, st.text, B - pad * 2);
  let H = pad + 22 + zeilen.length * lh + pad - 8;
  let messZeilen = [];
  const mfs = Math.round(fs * 0.62);
  if (st.mess) {
    probe.font = '600 ' + mfs + 'px "IBM Plex Mono", monospace';
    messZeilen = umbrechen(probe, 'Messpunkt · ' + st.mess.art, B - pad * 2).slice(0, 2);
    H += 30 + messZeilen.length * Math.round(mfs * 1.45);
  }
  const c = leinwand(B * k, H * k);
  const g = c.getContext('2d');
  g.scale(k, k);
  rundRechteck(g, 3, 3, B - 6, H - 6, 34);
  g.fillStyle = hex(C.card); g.fill();
  g.lineWidth = 8; g.strokeStyle = hex(C.sand200); g.stroke();
  /* kleiner terrafarbener Strich als Akzent */
  rundRechteck(g, pad, pad - 6, 64, 8, 4);
  g.fillStyle = hex(C.terra); g.fill();
  g.textAlign = 'left'; g.textBaseline = 'alphabetic';
  g.fillStyle = '#3A322C';
  g.font = '500 ' + fs + 'px Quicksand, sans-serif';
  let y = pad + 22 + fs * 0.9;
  zeilen.forEach((t) => { g.fillText(t, pad, y); y += lh; });
  if (st.mess) {
    y += 2;
    g.strokeStyle = hex(C.sand200); g.lineWidth = 3;
    g.beginPath(); g.moveTo(pad, y - fs * 0.55); g.lineTo(B - pad, y - fs * 0.55); g.stroke();
    y += mfs * 0.55;
    g.fillStyle = hex(C.terra);
    g.font = '600 ' + mfs + 'px "IBM Plex Mono", monospace';
    if ('letterSpacing' in g) g.letterSpacing = '1px';
    messZeilen.forEach((t) => { g.fillText(t.toUpperCase(), pad, y); y += Math.round(mfs * 1.45); });
  }
  return { tex: textur(c, aniso), hoeheE: H / SCHILD_PX };
}

function bannerTextur(gross, klein, ziel, aniso) {
  const c = leinwand(1400, 360);
  const g = c.getContext('2d');
  rundRechteck(g, 0, 0, 1400, 360, 44);
  g.fillStyle = hex(C.terra); g.fill();
  if (ziel) {                                // Zielflagge: Schachbrett an den Enden
    for (let s = 0; s < 2; s++) {
      for (let i = 0; i < 6; i++) for (let j = 0; j < 2; j++) {
        if ((i + j) % 2 === 0) { g.fillStyle = hex(C.creme50); g.fillRect(s ? 1400 - 150 + j * 75 : j * 75, i * 60, 75, 60); }
      }
    }
  }
  g.fillStyle = hex(C.creme50);
  g.textAlign = 'center';
  g.font = '700 150px Quicksand, sans-serif';
  g.fillText(gross, 700, 205);
  g.fillStyle = hex(C.peach200);
  g.font = '600 38px "IBM Plex Mono", monospace';
  if ('letterSpacing' in g) g.letterSpacing = '4px';
  g.fillText(klein.toUpperCase(), 700, 290);
  return textur(c, aniso);
}

function schachTextur() {
  const c = leinwand(256, 64);
  const g = c.getContext('2d');
  for (let i = 0; i < 16; i++) for (let j = 0; j < 4; j++) {
    g.fillStyle = (i + j) % 2 ? hex(C.ink) : hex(C.creme50);
    g.fillRect(i * 16, j * 16, 16, 16);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.magFilter = THREE.NearestFilter;
  return t;
}

function schattenTextur() {
  const c = leinwand(128, 128);
  const g = c.getContext('2d');
  const v = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  v.addColorStop(0, 'rgba(70,42,24,0.34)');
  v.addColorStop(0.6, 'rgba(70,42,24,0.14)');
  v.addColorStop(1, 'rgba(70,42,24,0)');
  g.fillStyle = v; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function strichTextur() {
  const c = leinwand(8, 64);
  const g = c.getContext('2d');
  g.fillStyle = '#fff';
  g.fillRect(0, 0, 8, 32);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapT = THREE.RepeatWrapping;
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  return t;
}

/* ── Gelände ────────────────────────────────────────────────────────── */
function hoeheStrasse(x, z) {
  return 2.4 * Math.sin(z * 0.021 + 0.5) + 1.2 * Math.sin(z * 0.052 + 2.0) + 0.3 * Math.sin(x * 0.05);
}
function huegel(x, z) {
  return 0.9 * Math.sin(x * 0.05 + 1.1) * Math.sin(z * 0.04 + 0.3)
    + 0.6 * Math.sin(x * 0.11 - z * 0.07 + 2.2)
    + 0.3 * Math.sin(z * 0.16 + x * 0.09);
}

/* ── Aufbau der Szene ──────────────────────────────────────────────── */
async function neuBauen(detail) {
  if (ausgefallen || !THREE || !detail) return;
  const nummer = ++bauNummer;
  try {
    await schriftenLaden();
    if (nummer !== bauNummer) return;
    const L = detail.stationen;
    const bilder = await Promise.all(L.map((st) => bildLaden(win.VaiaconLernreise.BILD[st.bild])));
    if (nummer !== bauNummer) return;
    if (!R) bereitstellen();
    szeneBauen(detail, bilder);
  } catch (e) {
    aufgeben(e);
  }
}

function bereitstellen() {
  const fond = fondFarbe();
  const container = doc.createElement('div');
  container.className = 'lr-3d';
  container.setAttribute('role', 'group');
  container.setAttribute('aria-label', 'Lernreise als Fahrt: Scrollen Sie weiter, um die Stationen nacheinander zu erreichen');
  container.innerHTML =
    '<div class="lr-3d__buehne">' +
      '<canvas class="lr-3d__canvas" aria-hidden="true"></canvas>' +
      '<p class="lr-3d__woche" aria-hidden="true"></p>' +
      '<aside class="lr-3d__karte" aria-live="polite"></aside>' +
      '<ol class="lr-3d__leiste"></ol>' +
      '<p class="lr-3d__hinweis" aria-hidden="true">Weiter scrollen</p>' +
    '</div>';
  weg.parentNode.insertBefore(container, weg);
  weg.hidden = true;

  const buehne = container.querySelector('.lr-3d__buehne');
  buehne.style.setProperty('--lr-fond', hex(fond));
  const canvas = container.querySelector('canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setClearColor(fond, 1);
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.setPixelRatio(Math.min(win.devicePixelRatio || 1, 2));
  const kamera = new THREE.PerspectiveCamera(42, 1, 0.5, 420);

  R = {
    container, buehne, canvas, renderer, kamera, fond,
    karte: container.querySelector('.lr-3d__karte'),
    leiste: container.querySelector('.lr-3d__leiste'),
    woche: container.querySelector('.lr-3d__woche'),
    hinweis: container.querySelector('.lr-3d__hinweis'),
    sichtbar: true, raf: 0, zuletzt: 0, breite: 0, hoehe: 0, aktiv: -1, karteTimer: 0
  };

  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); aufgeben(new Error('WebGL-Kontext verloren')); });
  win.addEventListener('scroll', anstossen, { passive: true });
  if (win.ResizeObserver) new ResizeObserver(() => { groesse(); anstossen(); }).observe(buehne);
  else win.addEventListener('resize', () => { groesse(); anstossen(); });
  if ('IntersectionObserver' in win) {
    new IntersectionObserver((es) => { R.sichtbar = es.some((x) => x.isIntersecting); if (R.sichtbar) anstossen(); }, { rootMargin: '200px 0px' }).observe(container);
  }
  R.leiste.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-i]');
    if (b && Z) zuStation(+b.dataset.i);
  });
}

function abbauen() {
  if (R) {
    if (R.raf) cancelAnimationFrame(R.raf);
    szeneLoeschen();
    try { R.renderer.dispose(); } catch (e) { /* egal */ }
    if (R.container.parentNode) R.container.parentNode.removeChild(R.container);
    win.removeEventListener('scroll', anstossen);
    R = null;
  }
}

function szeneLoeschen() {
  if (!Z) return;
  Z.szene.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) {
      const ms = Array.isArray(o.material) ? o.material : [o.material];
      ms.forEach((m) => { if (m.map && !m.map.userData.geteilt) m.map.dispose(); m.dispose(); });
    }
  });
  Z.geteilt.forEach((t) => t.dispose());
  Z = null;
}

function groesse() {
  if (!R) return;
  const b = R.buehne.clientWidth, h = R.buehne.clientHeight;
  if (!b || !h || (b === R.breite && h === R.hoehe)) return;
  R.breite = b; R.hoehe = h;
  R.renderer.setPixelRatio(Math.min(win.devicePixelRatio || 1, 2));
  R.renderer.setSize(b, h, false);
  const schmal = b / h < 0.9;
  R.schmal = schmal;
  R.kamera.aspect = b / h;
  R.kamera.fov = schmal ? 54 : 44;
  /* Auf dem Handy liegt die Karte unten: Bildmitte nach oben schieben */
  if (schmal) R.kamera.setViewOffset(b, h, 0, h * 0.16, b, h); else R.kamera.clearViewOffset();
  R.kamera.updateProjectionMatrix();
}

/* ── Die Szene ─────────────────────────────────────────────────────── */
function szeneBauen(detail, bilder) {
  const V = win.VaiaconLernreise;
  const L = detail.stationen, n = L.length, total = detail.total;
  const handy = win.innerWidth < 760;
  const aniso = Math.min(8, R.renderer.capabilities.getMaxAnisotropy());
  const mpx = handy ? 90 : PX_M;
  const spx = handy ? 100 : 140;

  szeneLoeschen();
  const szene = new THREE.Scene();
  szene.fog = new THREE.Fog(R.fond, 55, handy ? 190 : 230);
  const geteilt = [];
  const zustand = { szene, geteilt };

  szene.add(new THREE.HemisphereLight(0xFFF6EA, 0xD9C7AA, 0.66));
  const sonne = new THREE.DirectionalLight(0xFFEBD2, 0.55);
  sonne.position.set(-70, 110, 40);
  szene.add(sonne);

  /* Kurve: sanfte S-Bögen, Station für Station */
  const SP = 36;
  const kp = [];
  for (let m = 0; m <= n + 3; m++) {
    const k = m - 1;
    const x = 15 * Math.sin(k * 1.0 + 0.4) * ((k < 0 || k > n + 1) ? 0.55 : 1);
    const z = -k * SP;
    kp.push(new THREE.Vector3(x, hoeheStrasse(x, z), z));
  }
  const kurve = new THREE.CatmullRomCurve3(kp, false, 'centripetal');
  kurve.arcLengthDivisions = 1200;
  const laenge = kurve.getLength();
  const laengen = kurve.getLengths(1200);
  const uVon = (t) => { const f = t * 1200, i = Math.min(1199, Math.floor(f)); return mische(laengen[i], laengen[i + 1], f - i) / laenge; };
  const anker = [];                                   // Start, Stationen, Ziel
  for (let m = 1; m <= n + 2; m++) anker.push(uVon(m / (n + 3)));

  const hoch = new THREE.Vector3(0, 1, 0);
  const fl = new THREE.Vector3();
  function rechts(u) {                               // Vektor nach rechts (Fahrtrichtung)
    kurve.getTangentAt(u, fl); fl.y = 0; fl.normalize();
    return new THREE.Vector3(-fl.z, 0, fl.x);
  }

  /* Stützstellen für das Gelände */
  const sN = Math.round(laenge / 1.3);
  const sx = new Float32Array(sN + 1), sy = new Float32Array(sN + 1), sz = new Float32Array(sN + 1);
  const tmp = new THREE.Vector3();
  for (let i = 0; i <= sN; i++) { kurve.getPointAt(i / sN, tmp); sx[i] = tmp.x; sy[i] = tmp.y; sz[i] = tmp.z; }
  function naechste(x, z) {
    let best = 1e12, bi = 0;
    for (let i = 0; i <= sN; i++) {
      const dx = x - sx[i], dz = z - sz[i], d = dx * dx + dz * dz;
      if (d < best) { best = d; bi = i; }
    }
    return { d: Math.sqrt(best), y: sy[bi] };
  }
  function bodenHoehe(x, z) {
    const q = naechste(x, z);
    const tief = q.y - 0.12;
    const hohl = glatt(4.7, 26, q.d);
    const fern = glatt(36, 120, q.d);
    const h = huegel(x, z) * glatt(8, 40, q.d) + fern * (7 + 4.5 * Math.sin(x * 0.021 + z * 0.013 + 1));
    return mische(tief, h, hohl);
  }

  /* Gelände */
  {
    const x0 = -140, x1 = 140, z0 = SP + 70, z1 = -(n + 3) * SP - 150;
    const gx = handy ? 70 : 112, gz = Math.round(Math.abs(z1 - z0) / (handy ? 4.2 : 2.6));
    const pos = new Float32Array((gx + 1) * (gz + 1) * 3), col = new Float32Array((gx + 1) * (gz + 1) * 3);
    const cA = new THREE.Color(C.boden), cB = new THREE.Color(0xDDCBAC), cC = new THREE.Color(0xE9CFB6), cT = new THREE.Color();
    let p = 0;
    for (let j = 0; j <= gz; j++) {
      const z = mische(z0, z1, j / gz);
      for (let i = 0; i <= gx; i++) {
        const x = mische(x0, x1, i / gx);
        const q = naechste(x, z);
        const hohl = glatt(4.7, 26, q.d), fern = glatt(36, 120, q.d);
        const h = mische(q.y - 0.12, huegel(x, z) * glatt(8, 40, q.d) + fern * (7 + 4.5 * Math.sin(x * 0.021 + z * 0.013 + 1)), hohl);
        pos[p] = x; pos[p + 1] = h; pos[p + 2] = z;
        const rausch = 0.5 + 0.5 * Math.sin(x * 0.037 + z * 0.021) * Math.sin(z * 0.043 - x * 0.017 + 1.3);
        const fleck = glatt(0.55, 0.9, 0.5 + 0.5 * Math.sin(x * 0.019 - z * 0.027 + 0.4));
        cT.copy(cA).lerp(cB, rausch * 0.7).lerp(cC, fleck * 0.6 * hohl);
        col[p] = cT.r; col[p + 1] = cT.g; col[p + 2] = cT.b;
        p += 3;
      }
    }
    const idx = [];
    for (let j = 0; j < gz; j++) for (let i = 0; i < gx; i++) {
      const a = j * (gx + 1) + i, b = a + 1, c = a + gx + 1, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    szene.add(new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ vertexColors: true })));
  }

  /* Band entlang der Kurve; profil: [Abstand, Farbe, Höhe] */
  function band(u0, u1, profil, optionen) {
    const o = optionen || {};
    const len = (u1 - u0) * laenge;
    const segs = Math.max(2, Math.round(len / (o.schritt || 1.2)));
    const np = profil.length;
    const pos = new Float32Array((segs + 1) * np * 3), col = new Float32Array((segs + 1) * np * 3), uv = new Float32Array((segs + 1) * np * 2);
    const P = new THREE.Vector3(), c = new THREE.Color();
    const xmin = profil[0][0], xmax = profil[np - 1][0];
    let a = 0, b = 0;
    for (let i = 0; i <= segs; i++) {
      const f = i / segs, u = mische(u0, u1, f);
      kurve.getPointAt(u, P);
      const r = rechts(u);
      const licht = o.licht ? 1 + 0.045 * Math.sin(u * laenge * 0.043) + 0.03 * Math.sin(u * laenge * 0.17 + 1) : 1;
      for (let j = 0; j < np; j++) {
        const pr = profil[j];
        pos[a] = P.x + r.x * pr[0]; pos[a + 1] = P.y + pr[2]; pos[a + 2] = P.z + r.z * pr[0];
        if (pr[1] !== null) { c.set(pr[1]); col[a] = c.r * licht; col[a + 1] = c.g * licht; col[a + 2] = c.b * licht; }
        uv[b] = (pr[0] - xmin) / (xmax - xmin); uv[b + 1] = f * (o.vWdh || 1);
        a += 3; b += 2;
      }
    }
    const idx = [];
    for (let i = 0; i < segs; i++) for (let j = 0; j < np - 1; j++) {
      const p0 = i * np + j, p1 = p0 + 1, p2 = p0 + np, p3 = p2 + 1;
      idx.push(p0, p1, p2, p1, p3, p2);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  }

  /* Strasse: Randauslauf, sandfarbener Seitenstreifen, Randlinie, Fahrbahn */
  {
    const S = C.strasse, Rd = C.rand, Ln = 0xF3EBDA, Bd = C.boden;
    const profil = [
      [-4.7, Bd, -0.10], [-3.9, Rd, -0.01], [-3.1, Rd, 0], [-3.04, S, 0],
      [-2.96, S, 0], [-2.92, Ln, 0.004], [-2.76, Ln, 0.004], [-2.72, S, 0],
      [0, S, 0],
      [2.72, S, 0], [2.76, Ln, 0.004], [2.92, Ln, 0.004], [2.96, S, 0],
      [3.04, S, 0], [3.1, Rd, 0], [3.9, Rd, -0.01], [4.7, Bd, -0.10]
    ];
    const geo = band(0.0, 1.0, profil, { licht: true, schritt: handy ? 2 : 1.3 });
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
    szene.add(new THREE.Mesh(geo, mat));
  }

  /* Mittellinie, gestrichelt; um die Stationen herum offen */
  const striche = strichTextur();
  geteilt.push(striche);
  {
    const luecke = 4.6 / laenge;
    const stat = anker.slice(1, n + 1);
    let von = 0.0;
    const stuecke = [];
    stat.forEach((u) => { stuecke.push([von, u - luecke]); von = u + luecke; });
    stuecke.push([von, 1.0]);
    const mat = new THREE.MeshBasicMaterial({ map: striche, transparent: true, color: C.creme50, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    stuecke.forEach((s) => {
      if (s[1] - s[0] < 4 / laenge) return;
      const wdh = (s[1] - s[0]) * laenge / 4;
      const geo = band(s[0], s[1], [[-0.085, null, 0.03], [0.085, null, 0.03]], { vWdh: wdh, schritt: 1.0 });
      const m = new THREE.Mesh(geo, mat);
      m.renderOrder = 2;
      szene.add(m);
    });
  }

  /* Hilfen zum Setzen von Dingen neben der Strasse */
  function ort(u, seitlich, laengs) {
    kurve.getPointAt(klemme(u + (laengs || 0) / laenge, 0, 1), tmp);
    const r = rechts(u);
    const x = tmp.x + r.x * seitlich, z = tmp.z + r.z * seitlich;
    return new THREE.Vector3(x, bodenHoehe(x, z), z);
  }
  const schattenTex = schattenTextur();
  geteilt.push(schattenTex);
  const schattenMat = new THREE.MeshBasicMaterial({ map: schattenTex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 });
  function schatten(p, breite, tiefe) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(breite, tiefe), schattenMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(p.x, p.y + 0.05, p.z);
    m.renderOrder = 1;
    szene.add(m);
  }
  const holz = new THREE.MeshLambertMaterial({ color: C.braun600 });

  /* Etappen */
  const schilder = [];
  const bots = [];
  const stationenU = [];
  const schildB = handy ? 4.4 : 6.4;
  const schildFs = handy ? 40 : 40;
  L.forEach((st, i) => {
    const u = anker[i + 1];
    stationenU.push(u);
    const seite = i % 2 === 0 ? -1 : 1;                // links, rechts, abwechselnd
    const zeile = V.wochenLabel(i, n, total) + ' · ' + st.rolle;

    /* (a) auf die Fahrbahn gemalt */
    const mt = markierungTextur(i + 1, st, zeile, mpx, aniso);
    const mg = band(u - 3.8 / laenge, u + 3.8 / laenge, [[-2.7, null, 0.045], [2.7, null, 0.045]], { schritt: 0.8 });
    const mm = new THREE.Mesh(mg, new THREE.MeshBasicMaterial({ map: mt, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
    mm.renderOrder = 3;
    szene.add(mm);

    /* (b) Schild am Strassenrand */
    const sch = schildTextur(st, schildB, schildFs, aniso, spx);
    const sH = sch.hoeheE;
    const sp = ort(u, seite * (5.1 + schildB / 2), -1.0);
    const pfosten = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.9, 0.2), holz);
    pfosten.position.set(sp.x, sp.y + 0.95, sp.z);
    szene.add(pfosten);
    schatten(sp, schildB * 0.85, 1.9);
    const karte = new THREE.Mesh(new THREE.PlaneGeometry(schildB, sH), new THREE.MeshBasicMaterial({ map: sch.tex, transparent: true, side: THREE.DoubleSide, toneMapped: false }));
    karte.position.set(sp.x, sp.y + 1.55 + sH / 2, sp.z);
    karte.userData.mitte = karte.position.clone();
    szene.add(karte);
    pfosten.scale.y = (1.7 + sH * 0.0) / 1.9;
    schilder.push(karte);

    /* (c) Bürobot daneben */
    const bild = bilder[i];
    if (bild) {
      const t = new THREE.Texture(bild);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = aniso;
      t.needsUpdate = true;
      const bh = handy ? 3.0 : 4.0, bw = bh * bild.naturalWidth / bild.naturalHeight;
      const bp = ort(u, seite * (handy ? 6.4 : 6.6 + bw / 2), handy ? 4.6 : 5.4);
      const geo = new THREE.PlaneGeometry(bw, bh);
      geo.translate(0, bh / 2, 0);                   // Füsse am Boden
      const bm = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: t, transparent: true, alphaTest: 0.04, side: THREE.DoubleSide, toneMapped: false }));
      bm.position.copy(bp);
      szene.add(bm);
      schatten(bp, bw * 0.8, 1.5);
      bots.push(bm);
    }
  });

  /* Start und Ziel: Bogen mit Banner und Fähnchen */
  function bogen(u, gross, klein, ziel) {
    const g = new THREE.Group();
    const r = rechts(u);
    kurve.getPointAt(u, tmp);
    const rueck = new THREE.Vector3(); kurve.getTangentAt(u, rueck); rueck.y = 0; rueck.normalize().multiplyScalar(-1);
    const m4 = new THREE.Matrix4().makeBasis(r, hoch, rueck);
    g.quaternion.setFromRotationMatrix(m4);
    g.position.copy(tmp);
    const bt = bannerTextur(gross, klein, ziel, aniso);
    const ban = new THREE.Mesh(new THREE.PlaneGeometry(7.8, 7.8 * 360 / 1400 * 1.0), new THREE.MeshBasicMaterial({ map: bt, transparent: true, side: THREE.DoubleSide, toneMapped: false }));
    ban.position.set(0, 5.6, 0.0);
    g.add(ban);
    [-1, 1].forEach((s) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6.6, 0.3), holz);
      p.position.set(s * 4.35, 3.1, 0);
      g.add(p);
      const flag = new THREE.Shape();
      flag.moveTo(0, 0); flag.lineTo(1.7, 0.45); flag.lineTo(0, 0.9); flag.closePath();
      const f = new THREE.Mesh(new THREE.ShapeGeometry(flag), new THREE.MeshBasicMaterial({ color: ziel ? C.ink : C.terra, side: THREE.DoubleSide }));
      f.position.set(s * 4.35 + (s > 0 ? 0.15 : -0.15), 6.0, 0);
      if (s < 0) f.scale.x = -1;
      g.add(f);
    });
    szene.add(g);
    return g;
  }
  bogen(anker[0], 'START', 'Ihre Lernreise · etwa ' + total + ' Wochen', false);
  bogen(anker[n + 1], 'ZIEL', 'Wirkung messen · Ziele prüfen', true);
  {                                                   // Zielstrich quer über die Fahrbahn
    const st = schachTextur();
    geteilt.push(st);
    const u = anker[n + 1];
    const geo = band(u + 0.1 / laenge, u + 1.3 / laenge, [[-3.0, null, 0.05], [3.0, null, 0.05]], { schritt: 0.6 });
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: st, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
    m.renderOrder = 3;
    szene.add(m);
    const geo2 = band(anker[0] - 0.3 / laenge, anker[0] + 0.3 / laenge, [[-3.0, null, 0.05], [3.0, null, 0.05]], { schritt: 0.6 });
    const m2 = new THREE.Mesh(geo2, new THREE.MeshBasicMaterial({ color: C.creme50, polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4 }));
    m2.renderOrder = 3;
    szene.add(m2);
  }

  Object.assign(zustand, {
    kurve, laenge, anker, n, L, total, schilder, bots, handy,
    seiten: L.map((_, i) => (i % 2 === 0 ? -1 : 1)),
    rechts, bodenHoehe,
    p: 0, g: 0, gZiel: 0, s: 0, seite: 0
  });
  Z = zustand;

  /* Oberfläche: Höhe des Laufwegs, Leiste, Karte */
  const vh = handy ? 0.9 : 1;
  R.container.style.setProperty('--lr-n', String(n + 1));
  R.container.style.setProperty('--lr-vh', String(vh));
  R.leiste.innerHTML = L.map((st, i) =>
    '<li><button type="button" data-i="' + i + '" aria-label="Station ' + (i + 1) + ': ' + esc(st.titel) + '"><span></span></button></li>').join('');
  R.aktiv = -1;

  /* Neu gebaut: zurück an den Anfang (nur wenn man schon mitten drin steht) */
  const rect = R.container.getBoundingClientRect();
  if (rect.top < 0) win.scrollTo({ top: win.scrollY + rect.top, behavior: 'instant' });

  groesse();
  R.breite = 0; groesse();
  messen(true);
  Z.g = Z.gZiel;
  zeichnen(true);
}

/* ── Fahrt ─────────────────────────────────────────────────────────── */
function messen(hart) {
  if (!Z || !R) return;
  const rect = R.container.getBoundingClientRect();
  const lauf = Math.max(1, R.container.offsetHeight - R.buehne.clientHeight);
  Z.p = klemme(-rect.top / lauf, 0, 1);
  Z.gZiel = Z.p * (Z.n + 1);
}

function zuStation(i) {
  if (!Z || !R) return;
  const rect = R.container.getBoundingClientRect();
  const lauf = Math.max(1, R.container.offsetHeight - R.buehne.clientHeight);
  const ziel = win.scrollY + rect.top + ((i + 1) / (Z.n + 1)) * lauf;
  win.scrollTo({ top: ziel, behavior: 'smooth' });
}

function anstossen() {
  if (!Z || !R || !R.sichtbar) return;
  messen();
  if (!R.raf) R.raf = requestAnimationFrame(bild);
}

const _a = () => new THREE.Vector3();
let vF, vT, vR, vK, vZ;

function fokusU(g) {
  const j = klemme(Math.floor(g), 0, Z.n);
  const f = klemme(g - j, 0, 1);
  const fe = f - Math.sin(2 * Math.PI * f) / (2 * Math.PI);   // langsam an den Halten
  return mische(Z.anker[j], Z.anker[j + 1], fe);
}

function nah(g) {
  const a = klemme(Math.round(g), 0, Z.n + 1);
  const s = 1 - glatt(0.14, 0.5, Math.abs(g - a));
  return (a === 0 || a === Z.n + 1) ? s * 0.6 : s;
}

function kameraSetzen(weich) {
  if (!vF) { vF = _a(); vT = _a(); vR = _a(); vK = _a(); vZ = _a(); }
  const s = Z.s;
  const schmal = R.schmal;
  const u = fokusU(Z.g);
  const Ltot = Z.laenge;
  const zurueck = mische(18, 13, s) * (schmal ? 1.1 : 1);
  const hoehe = mische(8.5, schmal ? 21 : 16, s);
  const voraus = mische(26, 2.5, s);
  Z.kurve.getPointAt(u, vF);
  Z.kurve.getTangentAt(u, vT); vT.y *= 0.5; vT.normalize();
  /* Kamera auf der Kurve hinter dem Fokus, nicht nur auf der Tangente */
  const uk = u - zurueck / Ltot;
  if (uk >= 0) Z.kurve.getPointAt(uk, vK); else { vK.copy(vF).addScaledVector(vT, -zurueck); }
  const ziel = Z.kurve.getPointAt(klemme(u + voraus / Ltot, 0, 1), vZ);
  /* seitlicher Versatz zur Seite des nächsten Schilds */
  const r = Z.rechts(u);
  const versatz = Z.seite * s * (schmal ? 4.2 : 3.4);
  vK.addScaledVector(r, versatz);
  vZ.addScaledVector(r, versatz);
  vK.y = Math.max(vK.y, vF.y) + hoehe;
  vZ.y = vF.y - 0.3;
  R.kamera.position.copy(vK);
  R.kamera.lookAt(vZ);
}

function ausrichten() {
  const cp = R.kamera.position;
  Z.schilder.forEach((m) => {
    const mi = m.userData.mitte;
    m.position.copy(mi);
    m.lookAt(cp.x, mische(mi.y, cp.y, 0.78), cp.z);
  });
  Z.bots.forEach((m) => {
    m.lookAt(cp.x, mische(m.position.y, cp.y, 0.35), cp.z);
  });
}

function info() {
  /* nächste Station: ab der Hälfte zwischen zwei Halten schon die folgende */
  const a = klemme(Math.round(Z.g), 1, Z.n);
  const i = a - 1;
  if (i !== R.aktiv) {
    const erstes = R.aktiv < 0;
    R.aktiv = i;
    Z.seite = Z.seiten[i];
    R.karte.classList.toggle('is-links', Z.seiten[i] > 0);
    if (erstes) { karteFuellen(i); } else {
      R.karte.classList.add('is-aus');
      clearTimeout(R.karteTimer);
      R.karteTimer = setTimeout(() => { karteFuellen(i); R.karte.classList.remove('is-aus'); }, 170);
    }
    Array.prototype.forEach.call(R.leiste.querySelectorAll('button'), (b, k) => b.classList.toggle('is-aktiv', k === i));
  }
  R.hinweis.classList.toggle('is-weg', Z.p > 0.03);
}

function karteFuellen(i) {
  const V = win.VaiaconLernreise;
  const st = Z.L[i];
  const label = V.wochenLabel(i, Z.n, Z.total);
  const chips = st.formate.map((k) => {
    const f = V.FORMATE[k];
    return '<a class="lr-chip" href="' + f.href + '">' + esc(f.name) + '</a>';
  }).join('');
  const mess = st.mess
    ? '<div class="lr-3d__mess"><p class="lr-3d__messart">Messpunkt · ' + esc(st.mess.art) + '</p><p>' + esc(st.mess.text) + '</p></div>' : '';
  R.karte.innerHTML =
    '<p class="lr-3d__zeit"><span class="lr-3d__nr">' + (i + 1) + '</span>' + esc(label) + ' · ' + esc(st.rolle) + '</p>' +
    '<h3>' + esc(st.titel) + '</h3>' +
    '<p class="lr-3d__text">' + esc(st.text) + '</p>' + mess +
    '<p class="lr-3d__formate">' + chips + '</p>';
  const m = /(\d+)/.exec(label);
  R.woche.textContent = 'Woche ' + (m ? m[1] : 0) + ' von ' + Z.total;
}

function zeichnen(hart) {
  if (!Z || !R) return false;
  const k = hart ? 1 : 1 - Math.pow(0.92, Math.min(4, (performance.now() - (R.zuletzt || performance.now() - 16)) / 16.7));
  Z.g += (Z.gZiel - Z.g) * k;
  if (Math.abs(Z.gZiel - Z.g) < 0.0004) Z.g = Z.gZiel;
  const sZiel = nah(Z.g);
  Z.s += (sZiel - Z.s) * (hart ? 1 : Math.min(1, k * 0.9));
  if (Math.abs(sZiel - Z.s) < 0.002) Z.s = sZiel;
  /* Seite sanft umschalten: Zahl blendet von -1 nach 1 */
  const a = klemme(Math.round(Z.g), 1, Z.n);
  Z.seite += (Z.seiten[a - 1] - Z.seite) * (hart ? 1 : 0.06);
  if (Math.abs(Z.seiten[a - 1] - Z.seite) < 0.003) Z.seite = Z.seiten[a - 1];
  kameraSetzen();
  ausrichten();
  info();
  R.renderer.render(Z.szene, R.kamera);
  R.zuletzt = performance.now();
  return Z.g !== Z.gZiel || Z.s !== sZiel || Math.abs(Z.seiten[a - 1] - Z.seite) > 0.003;
}

function bild() {
  R.raf = 0;
  if (!Z || !R || !R.sichtbar) return;
  messen();
  if (zeichnen(false)) R.raf = requestAnimationFrame(bild);
}
