// Reiter mit Seiten darunter (KI-Kompetenz). Eigener Block, weil der Teil weiter
// unten aussteigt, sobald einer Seite Burger, Kopfzeile oder Logo fehlt.
(function () {
  const gruppen = document.querySelectorAll('.mock-nav-group');
  if (!gruppen.length) return;

  function schliessen(ausser) {
    gruppen.forEach(function (gruppe) {
      if (gruppe === ausser) return;
      gruppe.querySelector('.mock-nav-group__toggle').setAttribute('aria-expanded', 'false');
      gruppe.querySelector('.mock-nav-group__menu').classList.remove('is-open');
    });
  }

  gruppen.forEach(function (gruppe) {
    const knopf = gruppe.querySelector('.mock-nav-group__toggle');
    const menue = gruppe.querySelector('.mock-nav-group__menu');
    knopf.addEventListener('click', function () {
      const offen = knopf.getAttribute('aria-expanded') === 'true';
      schliessen(gruppe);
      knopf.setAttribute('aria-expanded', offen ? 'false' : 'true');
      menue.classList.toggle('is-open', !offen);
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.mock-nav-group')) schliessen();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') schliessen();
  });
}());

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
    logo.src = isSolid ? 'assets/logo-lockup-terra.png' : 'assets/logo-lockup-white.png';
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

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
}());
