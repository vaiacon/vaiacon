const { Kicker, SiteFooter, TeamCard } = window.vaiaconDesignSystem_5f353f;
const ASSET_BASE = window.VAIACON_ASSET_BASE || '../../assets/';

function asset(path) {
  return ASSET_BASE + path;
}

const NAV_GROUPS = [
  {
    label: 'Gefunden werden',
    links: [
      { label: 'vaiaconVisibility', href: 'visibility.html', product: 'Visibility' },
    ],
  },
  {
    label: 'Lernen',
    links: [
      { label: 'vaiaconAcademy', href: 'index.html#academy', product: 'Academy' },
      { label: 'vaiaconLearning', href: 'index.html#learning', product: 'Learning' },
    ],
  },
  {
    label: 'Automatisieren',
    links: [
      { label: 'vaiaconBot', href: 'index.html#service', product: 'Bot' },
    ],
  },
  {
    label: 'Begleitung',
    links: [
      { label: 'vaiaconService', href: 'index.html#service-pakete', product: 'Service' },
    ],
  },
];

const NAV_AUX_LINKS = [
  { label: 'Über uns', href: 'ueber-uns.html' },
  { label: 'FAQ', href: 'index.html#faq' },
  { label: 'Kontakt', href: 'index.html#kontakt', contact: true },
];

function NavLabel({ link }) {
  if (!link.product) return link.label;
  return (
    <span className="mock-nav-product">
      <span className="mock-nav-brand">vaiacon</span>
      <span className="mock-nav-accent">{link.product}</span>
    </span>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [openGroup, setOpenGroup] = React.useState(null);
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  return (
    <header className="mock-header is-solid">
      <div className="mock-header__inner">
        <a className="mock-header__logo" href="index.html" aria-label="vaiacon Start">
          <img src={asset('logo-lockup-terra.png')} alt="vaiacon" />
        </a>
        <button
          className="mock-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
          aria-controls="mock-mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className="mock-header__nav" aria-label="Hauptnavigation">
          {NAV_GROUPS.map((group) => (
            <div className="mock-nav-group" key={group.label}>
              <button
                className="mock-nav-group__toggle"
                type="button"
                aria-expanded={openGroup === group.label}
                aria-controls={`mock-nav-group-${group.label}`}
                onClick={() => setOpenGroup((open) => open === group.label ? null : group.label)}
              >
                {group.label}<span className="mock-nav-group__indicator" aria-hidden="true"></span>
              </button>
              <div id={`mock-nav-group-${group.label}`} className={`mock-nav-group__menu${openGroup === group.label ? ' is-open' : ''}`}>
                {group.links.map((link) => (
                  <a key={link.label} href={link.href} onClick={() => setOpenGroup(null)}>
                    <NavLabel link={link} />
                  </a>
                ))}
              </div>
            </div>
          ))}
          {NAV_AUX_LINKS.map((link) => (
            <a key={link.label} className={link.contact ? 'mock-header__contact' : ''} href={link.href} aria-label={link.label}>
              <NavLabel link={link} />
            </a>
          ))}
        </nav>
      </div>
      <nav id="mock-mobile-menu" className={`mock-mobile-nav${menuOpen ? ' is-open' : ''}`} aria-label="Mobile Navigation">
        {NAV_GROUPS.map((group) => (
          <div className="mock-mobile-nav__group" key={group.label}>
            <span className="mock-mobile-nav__group-title">{group.label}</span>
            {group.links.map((link) => (
              <a key={link.label} href={link.href} aria-label={link.label} onClick={closeMenu}>
                <NavLabel link={link} />
              </a>
            ))}
          </div>
        ))}
        <div className="mock-mobile-nav__aux">
          {NAV_AUX_LINKS.map((link) => (
            <a key={link.label} className={link.contact ? 'mock-header__contact' : ''} href={link.href} aria-label={link.label} onClick={closeMenu}>
              <NavLabel link={link} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function UeberUns() {
  return (
    <section id="ueber-uns" className="mock-section mock-section--alt mock-subpage">
      <div className="mock-wrap">
        <div className="mock-center">
          <Kicker>Über uns</Kicker>
          <h1 className="mock-title">Unternehmerische Praxis, menschliche Werte und moderne Technologie.</h1>
          <p className="mock-lead" style={{ maxWidth: 980 }}>André Ulrich und Philip Krieger sind zwei Unternehmer aus Zürich. Sie haben vaiacon gegründet, um Schweizer KMU in das Zeitalter von KI zu begleiten und sie zu befähigen, KI für ihr Unternehmen einzusetzen. Wir verbinden unternehmerische Praxis, menschliche Werte und moderne Technologie zu einem ganzheitlichen Ansatz und begleiten KMU persönlich, vor Ort und auf Augenhöhe.</p>
        </div>
        <div className="mock-team-grid">
          <TeamCard src={asset('andre-ulrich-team.png?v=20260720-andre-bg-clean')} alt="André Ulrich" name="André Ulrich" role="Mitgründer · KMU-Experte" photoHeight={340} />
          <TeamCard src={asset('philip-krieger-team.png')} alt="Philip Krieger" name="Philip Krieger" role="Mitgründer · Coach" photoHeight={340} />
        </div>
      </div>
    </section>
  );
}

function App() {
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <div className="mock-page">
      <Header />
      <main>
        <UeberUns />
      </main>
      <SiteFooter logoSrc={asset('logo-lockup-white.png')} />
      <ChatWidget open={chatOpen} onOpen={() => setChatOpen(true)} onClose={() => setChatOpen(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
