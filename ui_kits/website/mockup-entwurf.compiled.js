const {
  Kicker,
  FaqItem,
  SiteFooter,
  Button: DsButton,
  ServiceRow,
  LabelBadge
} = window.vaiaconDesignSystem_5f353f;
const ASSET_BASE = window.VAIACON_ASSET_BASE || '../../assets/';
function asset(path) {
  return ASSET_BASE + path;
}
const NAV_GROUPS = [{
  label: 'Gefunden werden',
  links: [{
    label: 'vaiaconVisibility',
    href: 'visibility.html',
    product: 'Visibility'
  }]
}, {
  label: 'Lernen',
  links: [{
    label: 'vaiaconAcademy',
    href: 'academy/',
    product: 'Academy'
  }, {
    label: 'vaiaconLearning',
    href: 'learning.html',
    product: 'Learning'
  }]
}, {
  label: 'Automatisieren',
  links: [{
    label: 'vaiaconBot',
    href: 'bot.html',
    product: 'Bot'
  }]
}, {
  label: 'Begleitung',
  links: [{
    label: 'vaiaconService',
    href: 'service.html',
    product: 'Service'
  }]
}];
const NAV_AUX_LINKS = [{
  label: 'Über uns',
  href: 'ueber-uns.html'
}, {
  label: 'FAQ',
  href: 'faq.html'
}, {
  label: 'Kontakt',
  href: 'kontakt.html',
  contact: true
}];
const FAQS = [['Was macht vaiacon?', 'vaiacon befähigt Schweizer KMU, KI verständlich, persönlich und wirksam im Unternehmen einzusetzen. Wir verbinden Lernen, Automatisierung und langfristige Begleitung.'], ['Ist vaiacon eine klassische KI-Agentur?', 'Nein. KI ist für uns ein Werkzeug. Im Zentrum stehen verständliche Einführung, konkrete Abläufe und eine Umsetzung, die im Alltag funktioniert.'], ['Was ist vaiaconAcademy?', 'Die vaiaconAcademy ist unsere Selbstlern-Plattform: 11 Lernpfade mit 58 kurzen Lektionen zu KI im KMU-Alltag. Alle Lektionen sind kostenlos — kein Abo, keine Verpflichtungen.'], ['Was ist vaiaconLearning?', 'vaiaconLearning bündelt Online-Lernprogramme, Bibliotheken und persönliche Coachings, damit Unternehmer und Teams KI sicher anwenden können.'], ['Was ist vaiaconBot?', 'vaiaconBot ist der Ansatz für wiederkehrende Büro- und Administrationsprozesse: Wir analysieren Abläufe, priorisieren Hebel und setzen passende Automatisierungen um.'], ['Was ist vaiaconService?', 'vaiaconService begleitet bestehende Automatisierungen im Betrieb. Dazu gehören Pflege, Updates, Kontrolle und Weiterentwicklung nach Bedarf.'], ['Brauche ich technisches Vorwissen?', 'Nein. Die Inhalte und die Umsetzung werden so erklärt, dass Unternehmer und Mitarbeitende ohne technisches Vorwissen mitkommen.'], ['Was kostet eine Automation?', 'Eine Automation beginnt bei CHF 600. Den Fixpreis nennen wir nach der Erstanalyse — Sie wissen vor der Umsetzung, woran Sie sind.'], ['Was passiert mit unseren Daten?', 'Wir arbeiten nach dem revDSG. Vor der Umsetzung klären wir mit Ihnen, welche Daten ein Werkzeug überhaupt sehen darf, und halten Kundendaten dort heraus, wo sie nicht hingehören.'], ['Wie beginnt eine Zusammenarbeit?', 'Am Anfang steht ein unverbindliches Gespräch. Danach klären wir, ob Learning, Bot, Service oder eine Kombination davon sinnvoll ist.']];
const SERVICE_PLANS = [{
  number: '01',
  title: 'vaiaconService BASIC',
  text: 'Regelmässige Funktionsprüfung, kleine Anpassungen und E-Mail-Support.',
  price: 'ab CHF 90 / Monat'
}, {
  number: '02',
  title: 'vaiaconService STANDARD',
  text: 'Laufende Pflege und Updates, Optimierung bestehender Abläufe, Support für Ihr Team und ein periodischer Review-Termin.',
  price: 'ab CHF 190 / Monat'
}, {
  number: '03',
  title: 'vaiaconService PREMIUM',
  text: 'Proaktive Weiterentwicklung, priorisierte Betreuung, Erweiterungen und Integrationen.',
  price: 'ab CHF 390 / Monat'
}];
function Arrow() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192");
}
function ProductName({
  name,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, "vaiacon", /*#__PURE__*/React.createElement("span", {
    className: "mock-accent"
  }, name));
}
function NavLabel({
  link
}) {
  if (!link.product) return link.label;
  return /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-product"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-brand"
  }, "vaiacon"), /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-accent"
  }, link.product));
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
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: `mock-header${solid || menuOpen ? ' is-solid' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-header__logo",
    href: "#top",
    "aria-label": "vaiacon Start"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset(solid || menuOpen ? 'logo-lockup-terra.png' : 'logo-lockup-white.png'),
    alt: "vaiacon"
  })), /*#__PURE__*/React.createElement("button", {
    className: "mock-menu-toggle",
    type: "button",
    "aria-label": menuOpen ? 'Menü schliessen' : 'Menü öffnen',
    "aria-controls": "mock-mobile-menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(open => !open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("nav", {
    className: "mock-header__nav",
    "aria-label": "Hauptnavigation"
  }, NAV_GROUPS.map(group => /*#__PURE__*/React.createElement("div", {
    className: "mock-nav-group",
    key: group.label
  }, /*#__PURE__*/React.createElement("button", {
    className: "mock-nav-group__toggle",
    type: "button",
    "aria-expanded": openGroup === group.label,
    "aria-controls": `mock-nav-group-${group.label}`,
    onClick: () => setOpenGroup(open => open === group.label ? null : group.label)
  }, group.label, /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-group__indicator",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("div", {
    id: `mock-nav-group-${group.label}`,
    className: `mock-nav-group__menu${openGroup === group.label ? ' is-open' : ''}`
  }, group.links.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    href: link.href,
    onClick: () => setOpenGroup(null)
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  })))))), NAV_AUX_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  }))))), /*#__PURE__*/React.createElement("nav", {
    id: "mock-mobile-menu",
    className: `mock-mobile-nav${menuOpen ? ' is-open' : ''}`,
    "aria-label": "Mobile Navigation"
  }, NAV_GROUPS.map(group => /*#__PURE__*/React.createElement("div", {
    className: "mock-mobile-nav__group",
    key: group.label
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-mobile-nav__group-title"
  }, group.label), group.links.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    href: link.href,
    "aria-label": link.label,
    onClick: closeMenu
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "mock-mobile-nav__aux"
  }, NAV_AUX_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label,
    onClick: closeMenu
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  }))))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "mock-hero",
    "aria-label": "Start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__text"
  }, /*#__PURE__*/React.createElement("h1", null, "Digitale Sichtbarkeit und ", /*#__PURE__*/React.createElement("span", null, "KI-Kompetenz"), /*#__PURE__*/React.createElement("span", null, "f\xFCr Schweizer KMU."))), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__doors"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "visibility.html"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Visibility"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "Sichtbarkeit f\xFCr Ihren Betrieb ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#academy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "E-Learnings zu KI f\xFCr KMU ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#learning"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Learning"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "Trainings, Coachings, Workshops ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#service"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "Automationen f\xFCr Ihren Betrieb ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192")))), /*#__PURE__*/React.createElement("a", {
    className: "mock-stamp",
    href: "erstanalyse.html"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-stamp__over"
  }, "Kostenlos & unverbindlich"), /*#__PURE__*/React.createElement("span", {
    className: "mock-stamp__label"
  }, "Jetzt Erstanalyse starten \u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__robot",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset('vaiacon-buerobot-hero.png'),
    alt: ""
  })));
}
function Visibility() {
  return /*#__PURE__*/React.createElement("section", {
    id: "visibility",
    className: "mock-section mock-section--alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-copy"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "01"
  }, "Gefunden werden"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Mit ", /*#__PURE__*/React.createElement("span", {
    className: "mock-accent"
  }, "SEO und GEO"), " sichtbar werden."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead"
  }, "Ihre Kundinnen und Kunden sollen Ihr Angebot finden - in Google und in den Antworten von KI-Systemen. vaiaconVisibility verbindet beide Wege in einer klaren, verst\xE4ndlichen Umsetzung."), /*#__PURE__*/React.createElement("div", {
    className: "mock-visibility-points"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "SEO"), " ordnet Ihr Angebot f\xFCr die klassische Google-Suche ein."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "GEO"), " macht Ihre Inhalte f\xFCr generative KI-Suchen und Antworten nachvollziehbar.")), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "md",
    arrow: true,
    href: "visibility.html"
  }, "Zur vaiaconVisibility")), /*#__PURE__*/React.createElement("div", {
    className: "mock-visibility-visual"
  }, /*#__PURE__*/React.createElement("img", {
    className: "mock-visibility-image",
    src: asset('vaiacon-buerobot-visibility.png?v=20260830-mobile-v4'),
    alt: "vaiaconBot mit Lupe f\xFCr digitale Sichtbarkeit"
  }))));
}
function Learning() {
  return /*#__PURE__*/React.createElement("section", {
    id: "learning",
    className: "mock-section mock-section--alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "03"
  }, "Lernen und bef\xE4higen"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-accent"
  }, "Lernen"), " mit vaiacon")), /*#__PURE__*/React.createElement("div", {
    className: "mock-learning-feature"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-learning-feature__copy"
  }, /*#__PURE__*/React.createElement("p", null, "Wir bef\xE4higen Sie und Ihre Mitarbeitenden, KI im Arbeitsalltag sicher anzuwenden. Trainings, Coachings und Workshops bei Ihnen in Ihrem Betrieb - f\xFCr Unternehmer, F\xFChrungskr\xE4fte und Teams. Zugeschnitten auf Ihre Abl\xE4ufe und Fragen."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "md",
    arrow: true,
    href: "#kontakt"
  }, "vaiaconLearning anfragen")), /*#__PURE__*/React.createElement("img", {
    className: "mock-learning-feature__image",
    src: asset('vaiacon-buerobot-learning.png'),
    alt: "vaiaconBot als Lehrer vor einem Whiteboard"
  }))));
}
function Service() {
  return /*#__PURE__*/React.createElement("section", {
    id: "service",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "04"
  }, "Automatisieren"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Wir automatisieren Ihren Betrieb."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 720
    }
  }, "Wir \xFCbernehmen, was regelm\xE4ssig Zeit kostet \u2014 Schritt f\xFCr Schritt, bei Ihnen im Betrieb.")), /*#__PURE__*/React.createElement("article", {
    className: "mock-bot-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__intro"
  }, /*#__PURE__*/React.createElement(LabelBadge, {
    tone: "onTerra"
  }, "Hauptprodukt"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot"
  })), /*#__PURE__*/React.createElement("p", {
    className: "mock-bot-tile__sub"
  }, "Wir richten Ihre Automationen bei Ihnen im Betrieb ein und bef\xE4higen Ihr Team \u2014 pers\xF6nlich und auf Augenh\xF6he.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__offer"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-bot-tile__price-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__amount"
  }, "ab CHF 600"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__unit"
  }, "pro Automation")), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__note"
  }, "Fixpreis nach der Erstanalyse \xB7 meist in wenigen Wochen zur\xFCckverdient"), /*#__PURE__*/React.createElement(DsButton, {
    variant: "light",
    size: "sm",
    arrow: true,
    href: "#kontakt"
  }, "Gespr\xE4ch buchen"))), /*#__PURE__*/React.createElement("ol", {
    className: "mock-bot-tile__steps"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "01"), /*#__PURE__*/React.createElement("strong", null, "Empfehlung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Prozesse mit dem gr\xF6ssten Entlastungspotenzial, mit Offerte")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "02"), /*#__PURE__*/React.createElement("strong", null, "Priorisierung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "gemeinsam festlegen, was zuerst optimiert wird")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "03"), /*#__PURE__*/React.createElement("strong", null, "Planung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Umsetzung Schritt f\xFCr Schritt vorbereitet")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "04"), /*#__PURE__*/React.createElement("strong", null, "Umsetzung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Automationen eingerichtet, Team bef\xE4higt")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "05"), /*#__PURE__*/React.createElement("strong", null, "Kontrolle"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "regelm\xE4ssige Pr\xFCfung mit vaiaconService"))))));
}
function VaiaconService() {
  return /*#__PURE__*/React.createElement("section", {
    id: "service-pakete",
    className: "mock-section mock-section--alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "05"
  }, "Begleiten und weiterentwickeln"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Service"
  }), ": Wir begleiten Ihre digitale Transformation."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 720
    }
  }, "Nach der Umsetzung bleiben wir an Ihrer Seite: mit Pflege, Updates und Weiterentwicklung - passend zu Ihren Abl\xE4ufen und Ihrem Tempo.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-addons"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-addons__note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-addons__label"
  }, "Servicepakete"), /*#__PURE__*/React.createElement("span", null, "Pflege und Weiterentwicklung im Abo - f\xFCr bestehende Automationen und gemeinsam aufgebaute L\xF6sungen.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-service-rows"
  }, SERVICE_PLANS.map((plan, i) => /*#__PURE__*/React.createElement(ServiceRow, {
    key: plan.title,
    number: plan.number,
    title: plan.title,
    last: i === SERVICE_PLANS.length - 1
  }, plan.text, " ", /*#__PURE__*/React.createElement("span", {
    className: "mock-service-price"
  }, plan.price)))))));
}
function Academy() {
  return /*#__PURE__*/React.createElement("section", {
    id: "academy",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "02"
  }, "E-Learnings"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Mehr als ein Chatbot: Lernen Sie, Ihre B\xFCroarbeit mit KI zu automatisieren."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 760
    }
  }, "Die ", /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  }), " ist unsere Selbstlern-Plattform: 58 kurze Lektionen in 11 Lernpfaden. Jeder Plan ist f\xFCr sich abgeschlossen und dauert 20 bis 45 Minuten \u2014 Sie starten dort, wo es bei Ihnen brennt.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-academy-feature"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-academy-feature__copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-learning-track__label"
  }, "Online \xB7 im eigenen Tempo"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  })), /*#__PURE__*/React.createElement("p", null, "58 kurze Lektionen in 11 Lernpfaden: Sie lernen genau das, was in Ihrem KMU gerade weiterhilft - verst\xE4ndlich, praxisnah und in Ihrem Tempo."), /*#__PURE__*/React.createElement("p", {
    className: "mock-academy-feature__note"
  }, "Die Lektionen sind kostenlos. Kein Abo, keine Verpflichtungen und keine versteckten Kosten."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "md",
    arrow: true,
    href: "academy/index.html"
  }, "Zur vaiaconAcademy")), /*#__PURE__*/React.createElement("img", {
    className: "mock-academy-feature__image",
    src: asset('vaiacon-buerobot-academy.png'),
    alt: "vaiaconBot am Schreibtisch beim Erstellen eines Lernmoduls"
  }))));
}
function Faq() {
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-faq-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "06"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Die wichtigsten Fragen und Antworten zu vaiacon."), /*#__PURE__*/React.createElement("img", {
    className: "mock-faq-robot",
    src: asset('vaiacon-buerobot-faq-transparent.png?v=20260903-alpha'),
    alt: "vaiaconBot beantwortet Fragen"
  })), /*#__PURE__*/React.createElement("div", null, FAQS.map(([question, answer], index) => /*#__PURE__*/React.createElement(FaqItem, {
    key: question,
    question: /*#__PURE__*/React.createElement("span", {
      className: "mock-faq-question-text"
    }, question),
    last: index === FAQS.length - 1
  }, answer)))));
}
function Kontakt() {
  return /*#__PURE__*/React.createElement("section", {
    id: "kontakt",
    className: "mock-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onTerra",
    number: "07"
  }, "Kontakt"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title",
    style: {
      color: '#fff',
      maxWidth: 840
    }
  }, "Welche vaiacon-L\xF6sung passt zu Ihrem Unternehmen?"), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 720
    }
  }, "Im unverbindlichen Gespr\xE4ch kl\xE4ren wir, ob f\xFCr Sie Learning, Bot, Service oder eine Kombination der richtige n\xE4chste Schritt ist."), /*#__PURE__*/React.createElement("div", {
    className: "mock-actions"
  }, /*#__PURE__*/React.createElement(DsButton, {
    variant: "light",
    arrow: true,
    href: "../../kontakt.html#formular"
  }, "Gespr\xE4ch vereinbaren"), /*#__PURE__*/React.createElement(DsButton, {
    variant: "glass",
    arrow: true,
    href: "mailto:hallo@vaiacon.ch"
  }, "hallo@vaiacon.ch")), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'rgba(255,236,222,0.9)'
    }
  }, "Simpel \xB7 Klar \xB7 Pers\xF6nlich")));
}
function App() {
  const [chatOpen, setChatOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "mock-page"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Visibility, null), /*#__PURE__*/React.createElement(Academy, null), /*#__PURE__*/React.createElement(Learning, null), /*#__PURE__*/React.createElement(Service, null), /*#__PURE__*/React.createElement(VaiaconService, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Kontakt, null)), /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: asset('logo-lockup-white.png')
  }), /*#__PURE__*/React.createElement(ChatWidget, {
    open: chatOpen,
    onOpen: () => setChatOpen(true),
    onClose: () => setChatOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
