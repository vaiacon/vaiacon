(function () {
  const toggle = document.querySelector('.mock-menu-toggle');
  const menu = document.getElementById('mock-mobile-menu');
  const header = document.querySelector('.sv-header');
  const logo = header && header.querySelector('.mock-header__logo img');

  if (!toggle || !menu || !header || !logo) return;

  function syncHeader() {
    // Seiten mit hellem Hero (Academy) tragen data-solid="always" und bleiben fest.
    const immer = header.getAttribute('data-solid') === 'always';
    const isSolid = immer || window.scrollY > 24 || toggle.getAttribute('aria-expanded') === 'true';
    header.classList.toggle('is-solid', isSolid);
    // Pfad des Logos bleibt, wie die Seite ihn trägt (Wurzel oder «../»); nur die Farbe wechselt.
    logo.setAttribute('src', logo.getAttribute('src').replace(/logo-lockup-(white|terra)\.\w+$/, isSolid ? 'logo-lockup-terra.svg?v=20261014' : 'logo-lockup-white.svg'));
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menü öffnen');
    menu.classList.remove('is-open');
    syncHeader();
  }

  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    toggle.setAttribute('aria-label', open ? 'Menü öffnen' : 'Menü schliessen');
    menu.classList.toggle('is-open', !open);
    syncHeader();
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      toggle.focus();
    }
  });

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
}());

// Muster-Karte im Check (Ergänzung 2026-10-13): Ring zählt beim Hineinscrollen
// von 0 auf 72, die Balken füllen sich per CSS. Ohne Skript oder bei
// reduzierter Bewegung steht der Endzustand sofort da.
(function () {
  var karte = document.getElementById('sv-cx-muster');
  var zahl = document.getElementById('sv-cx-zahl');
  if (!karte || !zahl || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ziel = 72;
  karte.classList.add('sv-cx--warten');
  zahl.textContent = '0';
  var beob = new IntersectionObserver(function (eintraege) {
    if (!eintraege[0].isIntersecting) return;
    beob.disconnect();
    // ein Bild warten, damit der Startzustand gezeichnet ist und die Übergänge greifen
    requestAnimationFrame(function () {
      karte.classList.remove('sv-cx--warten');
      var start = performance.now(), dauer = 1400;
      (function schritt(jetzt) {
        var t = Math.min(1, (jetzt - start) / dauer);
        zahl.textContent = String(Math.round(ziel * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(schritt);
      })(start);
    });
  }, { threshold: 0.4 });
  beob.observe(karte);
})();
