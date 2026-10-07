/* Bürobots der Startseite in Bewegung.
   Die Standbilder bleiben das, was zuerst erscheint (und was Suchmaschinen sehen). Erst wenn
   die Seite fertig geladen ist und der Browser Luft hat, holt dieses Skript zu jedem sichtbaren
   Bot eine kurze, durchsichtige Schleife (5 s, ca. 300 KB) und blendet sie deckungsgleich über
   das Bild. Nichts davon passiert bei «Bewegung reduzieren», im Datensparmodus oder wenn der
   Browser kein durchsichtiges Video kann — dann bleibt einfach das Bild stehen.

   Safari und alles auf iPhone/iPad können Durchsicht nur in HEVC (.mp4), die übrigen nur in
   VP9 (.webm). Jeder bekommt genau eine Datei. Erzeugt mit scripts/bot_schleife.py. */
(function () {
  var bilder = document.querySelectorAll('.st-bild[data-schleife]');
  if (!bilder.length || !('IntersectionObserver' in window)) return;

  var ruhig = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var netz = navigator.connection;
  if (netz && (netz.saveData || /(^|-)2g$/.test(netz.effectiveType || ''))) return;

  var ua = navigator.userAgent;
  var webkit = /iPhone|iPad|iPod/.test(ua) ||
    (/Safari\//.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/.test(ua));
  var probe = document.createElement('video');
  var typ = webkit ? 'video/mp4; codecs="hvc1"' : 'video/webm; codecs="vp9"';
  if (!probe.canPlayType || !probe.canPlayType(typ)) return;
  var endung = webkit ? '.mp4' : '.webm';

  var videos = [];

  function bauen(bild) {
    var v = document.createElement('video');
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('aria-hidden', 'true');
    v.setAttribute('tabindex', '-1');
    v.disablePictureInPicture = true;
    // Rand in Prozent (oben rechts unten links), falls der Bot in der Bewegung übers Bild hinausragt
    var r = (bild.getAttribute('data-rand') || '0 0 0 0').split(' ').map(Number);
    v.style.top = -r[0] + '%';
    v.style.left = -r[3] + '%';
    v.style.width = (100 + r[1] + r[3]) + '%';
    v.style.height = (100 + r[0] + r[2]) + '%';
    v.addEventListener('playing', function () { bild.classList.add('st-bild--lebt'); });
    v.src = bild.getAttribute('data-schleife') + endung;
    bild.appendChild(v);
    videos.push(v);
    return v;
  }

  function abspielen(v) {
    if (document.hidden || (ruhig && ruhig.matches)) return;
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  var sicht = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      var bild = e.target;
      var v = bild.querySelector('video') || (e.isIntersecting ? bauen(bild) : null);
      if (!v) return;
      v._sichtbar = e.isIntersecting;
      if (e.isIntersecting) abspielen(v); else v.pause();
    });
  }, { rootMargin: '100px' });

  function los() {
    if (ruhig && ruhig.matches) return;
    for (var i = 0; i < bilder.length; i++) sicht.observe(bilder[i]);
  }

  document.addEventListener('visibilitychange', function () {
    videos.forEach(function (v) { if (document.hidden) v.pause(); else if (v._sichtbar) abspielen(v); });
  });

  if (ruhig && ruhig.addEventListener) {
    ruhig.addEventListener('change', function () {
      if (ruhig.matches) {
        videos.forEach(function (v) { v.pause(); v.currentTime = 0; });
        for (var i = 0; i < bilder.length; i++) bilder[i].classList.remove('st-bild--lebt');
      } else if (videos.length) {
        videos.forEach(function (v) { if (v._sichtbar) abspielen(v); });
      } else {
        los();
      }
    });
  }

  function spaeter() {
    if ('requestIdleCallback' in window) window.requestIdleCallback(los, { timeout: 2500 });
    else setTimeout(los, 800);
  }
  if (document.readyState === 'complete') spaeter();
  else window.addEventListener('load', spaeter, { once: true });
})();
