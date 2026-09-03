(function () {
  const toggle = document.querySelector('.mock-menu-toggle');
  const menu = document.getElementById('mock-mobile-menu');
  const header = document.querySelector('.sv-header');
  const logo = header && header.querySelector('.mock-header__logo img');

  if (!toggle || !menu || !header || !logo) return;

  function syncHeader() {
    const isSolid = window.scrollY > 24 || toggle.getAttribute('aria-expanded') === 'true';
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
