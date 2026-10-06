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
    logo.setAttribute('src', logo.getAttribute('src').replace(/logo-lockup-(white|terra)\.\w+$/, isSolid ? 'logo-lockup-terra.svg' : 'logo-lockup-white.svg'));
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
