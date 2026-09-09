const { Kicker, FaqItem, SiteFooter, Button: DsButton, ServiceRow, LabelBadge } = window.vaiaconDesignSystem_5f353f;
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
      { label: 'vaiaconAcademy', href: '#academy', product: 'Academy' },
      { label: 'vaiaconLearning', href: '#learning', product: 'Learning' },
    ],
  },
  {
    label: 'Automatisieren',
    links: [
      { label: 'vaiaconBot', href: '#service', product: 'Bot' },
    ],
  },
  {
    label: 'Begleitung',
    links: [
      { label: 'vaiaconService', href: '#service-pakete', product: 'Service' },
    ],
  },
];

const NAV_AUX_LINKS = [
  { label: 'Über uns', href: 'ueber-uns.html' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt', contact: true },
];

const FAQS = [
  ['Was macht vaiacon?', 'vaiacon befähigt Schweizer KMU, KI verständlich, persönlich und wirksam im Unternehmen einzusetzen. Wir verbinden Lernen, Automatisierung und langfristige Begleitung.'],
  ['Ist vaiacon eine klassische KI-Agentur?', 'Nein. KI ist für uns ein Werkzeug. Im Zentrum stehen verständliche Einführung, konkrete Abläufe und eine Umsetzung, die im Alltag funktioniert.'],
  ['Was ist vaiaconAcademy?', 'Die vaiaconAcademy ist unsere Selbstlern-Plattform: zwölf Lernpfade mit 66 kurzen Lektionen zu KI im KMU-Alltag — inklusive Advanced-Pfad für Fortgeschrittene. Alle Lektionen sind kostenlos — kein Abo, keine Verpflichtungen.'],
  ['Was ist vaiaconLearning?', 'vaiaconLearning bündelt Online-Lernprogramme, Bibliotheken und persönliche Coachings, damit Unternehmer und Teams KI sicher anwenden können.'],
  ['Was ist vaiaconBot?', 'vaiaconBot ist der Ansatz für wiederkehrende Büro- und Administrationsprozesse: Wir analysieren Abläufe, priorisieren Hebel und setzen passende Automatisierungen um.'],
  ['Was ist vaiaconService?', 'vaiaconService begleitet bestehende Automatisierungen im Betrieb. Dazu gehören Pflege, Updates, Kontrolle und Weiterentwicklung nach Bedarf.'],
  ['Brauche ich technisches Vorwissen?', 'Nein. Die Inhalte und die Umsetzung werden so erklärt, dass Unternehmer und Mitarbeitende ohne technisches Vorwissen mitkommen.'],
  ['Was kostet eine Automation?', 'Eine Automation beginnt bei CHF 600. Den Fixpreis nennen wir nach der Erstanalyse — Sie wissen vor der Umsetzung, woran Sie sind.'],
  ['Was passiert mit unseren Daten?', 'Wir arbeiten nach dem revDSG. Vor der Umsetzung klären wir mit Ihnen, welche Daten ein Werkzeug überhaupt sehen darf, und halten Kundendaten dort heraus, wo sie nicht hingehören.'],
  ['Wie beginnt eine Zusammenarbeit?', 'Am Anfang steht ein unverbindliches Gespräch. Danach klären wir, ob Learning, Bot, Service oder eine Kombination davon sinnvoll ist.'],
];

const SERVICE_PLANS = [
  { number: '01', title: 'vaiaconService BASIC', text: 'Regelmässige Funktionsprüfung, kleine Anpassungen und E-Mail-Support.', price: 'ab CHF 90 / Monat' },
  { number: '02', title: 'vaiaconService STANDARD', text: 'Laufende Pflege und Updates, Optimierung bestehender Abläufe, Support für Ihr Team und ein periodischer Review-Termin.', price: 'ab CHF 190 / Monat' },
  { number: '03', title: 'vaiaconService PREMIUM', text: 'Proaktive Weiterentwicklung, priorisierte Betreuung, Erweiterungen und Integrationen.', price: 'ab CHF 390 / Monat' },
];


function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function ProductName({ name, className = '' }) {
  return (
    <span className={className}>
      vaiacon<span className="mock-accent">{name}</span>
    </span>
  );
}

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
  const [solid, setSolid] = React.useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`mock-header${solid || menuOpen ? ' is-solid' : ''}`}>
      <div className="mock-header__inner">
        <a className="mock-header__logo" href="#top" aria-label="vaiacon Start">
          <img src={asset(solid || menuOpen ? 'logo-lockup-terra.png' : 'logo-lockup-white.png')} alt="vaiacon" />
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
            <div
              className="mock-nav-group"
              key={group.label}
            >
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

function Hero() {
  return (
    <section id="top" className="mock-hero" aria-label="Start">
      <div className="mock-hero__content">
        <div className="mock-hero__text">
          <h1>Digitale Sichtbarkeit und <span>KI-Kompetenz</span><span>für Schweizer KMU.</span></h1>
        </div>
        <div className="mock-hero__doors">
          <a className="mock-hero__door" href="visibility.html">
            <span className="mock-hero__door-title"><ProductName name="Visibility" /></span>
            <span className="mock-hero__door-text">Sichtbarkeit für Ihren Betrieb <span className="mock-hero__door-arrow" aria-hidden="true">→</span></span>
          </a>
          <a className="mock-hero__door" href="#academy">
            <span className="mock-hero__door-title"><ProductName name="Academy" /></span>
            <span className="mock-hero__door-text">E-Learnings zu KI für KMU <span className="mock-hero__door-arrow" aria-hidden="true">→</span></span>
          </a>
          <a className="mock-hero__door" href="#learning">
            <span className="mock-hero__door-title"><ProductName name="Learning" /></span>
            <span className="mock-hero__door-text">Trainings, Coachings, Workshops <span className="mock-hero__door-arrow" aria-hidden="true">→</span></span>
          </a>
          <a className="mock-hero__door" href="#service">
            <span className="mock-hero__door-title"><ProductName name="Bot" /></span>
            <span className="mock-hero__door-text">Automationen für Ihren Betrieb <span className="mock-hero__door-arrow" aria-hidden="true">→</span></span>
          </a>
        </div>
        <a className="mock-stamp" href="erstanalyse.html">
          <span className="mock-stamp__over">Kostenlos &amp; unverbindlich</span>
          <span className="mock-stamp__label">Jetzt Erstanalyse starten →</span>
        </a>
      </div>
      <div className="mock-hero__robot" aria-hidden="true">
        <img src={asset('vaiacon-buerobot-hero.png')} alt="" />
      </div>
    </section>
  );
}

function Visibility() {
  return (
    <section id="visibility" className="mock-section mock-section--alt">
      <div className="mock-wrap mock-grid">
        <div className="mock-copy">
          <Kicker number="01">Gefunden werden</Kicker>
          <h2 className="mock-title">Mit <span className="mock-accent">SEO und GEO</span> sichtbar werden.</h2>
          <p className="mock-lead">Ihre Kundinnen und Kunden sollen Ihr Angebot finden - in Google und in den Antworten von KI-Systemen. vaiaconVisibility verbindet beide Wege in einer klaren, verständlichen Umsetzung.</p>
          <div className="mock-visibility-points">
            <p><strong>SEO</strong> ordnet Ihr Angebot für die klassische Google-Suche ein.</p>
            <p><strong>GEO</strong> macht Ihre Inhalte für generative KI-Suchen und Antworten nachvollziehbar.</p>
          </div>
          <DsButton variant="cta" size="md" arrow href="visibility.html">Zur vaiaconVisibility</DsButton>
        </div>
        <div className="mock-visibility-visual">
          <img className="mock-visibility-image" src={asset('vaiacon-buerobot-visibility.png?v=20260830-mobile-v4')} alt="vaiaconBot mit Lupe für digitale Sichtbarkeit" />
        </div>
      </div>
    </section>
  );
}

function Learning() {
  return (
    <section id="learning" className="mock-section mock-section--alt">
      <div className="mock-wrap">
        <div className="mock-center">
          <Kicker number="03">Lernen und befähigen</Kicker>
          <h2 className="mock-title"><span className="mock-accent">Lernen</span> mit vaiacon</h2>
        </div>
        <div className="mock-learning-feature">
          <div className="mock-learning-feature__copy">
            <p>Wir befähigen Sie und Ihre Mitarbeitenden, KI im Arbeitsalltag sicher anzuwenden. Trainings, Coachings und Workshops bei Ihnen in Ihrem Betrieb - für Unternehmer, Führungskräfte und Teams. Zugeschnitten auf Ihre Abläufe und Fragen.</p>
            <DsButton variant="cta" size="md" arrow href="#kontakt">vaiaconLearning anfragen</DsButton>
          </div>
          <img className="mock-learning-feature__image" src={asset('vaiacon-buerobot-learning.png')} alt="vaiaconBot als Lehrer vor einem Whiteboard" />
        </div>
      </div>
    </section>
  );
}

function Service() {
  return (
    <section id="service" className="mock-section">
      <div className="mock-wrap">
        <div className="mock-center">
          <Kicker number="04">Automatisieren</Kicker>
          <h2 className="mock-title">Wir automatisieren Ihren Betrieb.</h2>
          <p className="mock-lead" style={{ maxWidth: 720 }}>Wir übernehmen, was regelmässig Zeit kostet — Schritt für Schritt, bei Ihnen im Betrieb.</p>
        </div>
        <article className="mock-bot-tile">
          <div className="mock-bot-tile__head">
            <div className="mock-bot-tile__intro">
              <LabelBadge tone="onTerra">Hauptprodukt</LabelBadge>
              <h3><ProductName name="Bot" /></h3>
              <p className="mock-bot-tile__sub">Wir richten Ihre Automationen bei Ihnen im Betrieb ein und befähigen Ihr Team — persönlich und auf Augenhöhe.</p>
            </div>
            <div className="mock-bot-tile__offer">
              <p className="mock-bot-tile__price-line">
                <span className="mock-bot-tile__amount">ab CHF 600</span>
                <span className="mock-bot-tile__unit">pro Automation</span>
              </p>
              <span className="mock-bot-tile__note">Fixpreis nach der Erstanalyse · meist in wenigen Wochen zurückverdient</span>
              <DsButton variant="light" size="sm" arrow href="#kontakt">Gespräch buchen</DsButton>
            </div>
          </div>
          <ol className="mock-bot-tile__steps">
            <li>
              <span className="mock-bot-tile__step-no">01</span>
              <strong>Empfehlung</strong>
              <span className="mock-bot-tile__step-text">Prozesse mit dem grössten Entlastungspotenzial, mit Offerte</span>
            </li>
            <li>
              <span className="mock-bot-tile__step-no">02</span>
              <strong>Priorisierung</strong>
              <span className="mock-bot-tile__step-text">gemeinsam festlegen, was zuerst optimiert wird</span>
            </li>
            <li>
              <span className="mock-bot-tile__step-no">03</span>
              <strong>Planung</strong>
              <span className="mock-bot-tile__step-text">Umsetzung Schritt für Schritt vorbereitet</span>
            </li>
            <li>
              <span className="mock-bot-tile__step-no">04</span>
              <strong>Umsetzung</strong>
              <span className="mock-bot-tile__step-text">Automationen eingerichtet, Team befähigt</span>
            </li>
            <li>
              <span className="mock-bot-tile__step-no">05</span>
              <strong>Kontrolle</strong>
              <span className="mock-bot-tile__step-text">regelmässige Prüfung mit vaiaconService</span>
            </li>
          </ol>
        </article>
      </div>
    </section>
  );
}

function VaiaconService() {
  return (
    <section id="service-pakete" className="mock-section mock-section--alt">
      <div className="mock-wrap">
        <div className="mock-center">
          <Kicker number="05">Begleiten und weiterentwickeln</Kicker>
          <h2 className="mock-title"><ProductName name="Service" />: Wir begleiten Ihre digitale Transformation.</h2>
          <p className="mock-lead" style={{ maxWidth: 720 }}>Nach der Umsetzung bleiben wir an Ihrer Seite: mit Pflege, Updates und Weiterentwicklung - passend zu Ihren Abläufen und Ihrem Tempo.</p>
        </div>
        <div className="mock-addons">
          <p className="mock-addons__note">
            <span className="mock-addons__label">Servicepakete</span>
            <span>Pflege und Weiterentwicklung im Abo - für bestehende Automationen und gemeinsam aufgebaute Lösungen.</span>
          </p>
          <div className="mock-service-rows">
            {SERVICE_PLANS.map((plan, i) => (
              <ServiceRow key={plan.title} number={plan.number} title={plan.title} last={i === SERVICE_PLANS.length - 1}>
                {plan.text} <span className="mock-service-price">{plan.price}</span>
              </ServiceRow>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Academy() {
  return (
    <section id="academy" className="mock-section">
      <div className="mock-wrap">
        <div className="mock-center">
          <Kicker number="02">E-Learnings</Kicker>
          <h2 className="mock-title">Mehr als ein Chatbot: Lernen Sie, Ihre Büroarbeit mit KI zu automatisieren.</h2>
          <p className="mock-lead" style={{ maxWidth: 760 }}>Die <ProductName name="Academy" /> ist unsere Selbstlern-Plattform: 66 kurze Lektionen in zwölf Lernpfaden. Jeder Plan ist für sich abgeschlossen und dauert rund eine Stunde — Sie starten dort, wo es bei Ihnen brennt.</p>
        </div>
        <div className="mock-academy-feature">
          <div className="mock-academy-feature__copy">
            <span className="mock-learning-track__label">Online · im eigenen Tempo</span>
            <h3><ProductName name="Academy" /></h3>
            <p>66 kurze Lektionen in zwölf Lernpfaden: Sie lernen genau das, was in Ihrem KMU gerade weiterhilft - verständlich, praxisnah und in Ihrem Tempo.</p>
            <p className="mock-academy-feature__note">Die Lektionen sind kostenlos. Kein Abo, keine Verpflichtungen und keine versteckten Kosten.</p>
            <DsButton variant="cta" size="md" arrow href="academy/index.html">Zur vaiaconAcademy</DsButton>
          </div>
          <img className="mock-academy-feature__image" src={asset('vaiacon-buerobot-academy.png')} alt="vaiaconBot am Schreibtisch beim Erstellen eines Lernmoduls" />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="mock-section">
      <div className="mock-wrap mock-faq-layout">
        <div className="mock-center">
          <Kicker number="06">FAQ</Kicker>
          <h2 className="mock-title">Die wichtigsten Fragen und Antworten zu vaiacon.</h2>
          <img className="mock-faq-robot" src={asset('vaiacon-buerobot-faq-transparent.png?v=20260903-alpha')} alt="vaiaconBot beantwortet Fragen" />
        </div>
        <div>
          {FAQS.map(([question, answer], index) => (
            <FaqItem key={question} question={<span className="mock-faq-question-text">{question}</span>} last={index === FAQS.length - 1}>{answer}</FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function Kontakt() {
  return (
    <section id="kontakt" className="mock-contact">
      <div className="mock-wrap mock-center">
          <Kicker tone="onTerra" number="07">Kontakt</Kicker>
        <h2 className="mock-title" style={{ color: '#fff', maxWidth: 840 }}>Welche vaiacon-Lösung passt zu Ihrem Unternehmen?</h2>
        <p className="mock-lead" style={{ maxWidth: 720 }}>Im unverbindlichen Gespräch klären wir, ob für Sie Learning, Bot, Service oder eine Kombination der richtige nächste Schritt ist.</p>
        <div className="mock-actions">
          <DsButton variant="light" arrow href="https://calendly.com/vaiacon" target="_blank">Termin direkt buchen</DsButton>
          <DsButton variant="glass" arrow href="mailto:hallo@vaiacon.ch">hallo@vaiacon.ch</DsButton>
        </div>
        <small style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,236,222,0.9)' }}>Simpel · Klar · Persönlich</small>
      </div>
    </section>
  );
}

function App() {
  const [chatOpen, setChatOpen] = React.useState(false);

  return (
    <div className="mock-page">
      <Header />
      <Hero />
      <main>
        <Visibility />
        <Academy />
        <Learning />
        <Service />
        <VaiaconService />
        <Faq />
        <Kontakt />
      </main>
      <SiteFooter logoSrc={asset('logo-lockup-white.png')} />
      <ChatWidget open={chatOpen} onOpen={() => setChatOpen(true)} onClose={() => setChatOpen(false)} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
