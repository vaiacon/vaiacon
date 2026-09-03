const {
  Kicker,
  SiteFooter,
  TeamCard
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
    href: 'index.html#academy',
    product: 'Academy'
  }, {
    label: 'vaiaconLearning',
    href: 'index.html#learning',
    product: 'Learning'
  }]
}, {
  label: 'Automatisieren',
  links: [{
    label: 'vaiaconBot',
    href: 'index.html#service',
    product: 'Bot'
  }]
}, {
  label: 'Begleitung',
  links: [{
    label: 'vaiaconService',
    href: 'index.html#service-pakete',
    product: 'Service'
  }]
}];
const NAV_AUX_LINKS = [{
  label: 'Über uns',
  href: 'ueber-uns.html'
}, {
  label: 'FAQ',
  href: 'index.html#faq'
}, {
  label: 'Kontakt',
  href: 'index.html#kontakt',
  contact: true
}];
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
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "mock-header is-solid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-header__logo",
    href: "index.html",
    "aria-label": "vaiacon Start"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset('logo-lockup-terra.png'),
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
function UeberUns() {
  return /*#__PURE__*/React.createElement("section", {
    id: "ueber-uns",
    className: "mock-section mock-section--alt mock-subpage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, null, "\xDCber uns"), /*#__PURE__*/React.createElement("h1", {
    className: "mock-title"
  }, "Unternehmerische Praxis, menschliche Werte und moderne Technologie."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 980
    }
  }, "Andr\xE9 Ulrich und Philip Krieger sind zwei Unternehmer aus Z\xFCrich. Sie haben vaiacon gegr\xFCndet, um Schweizer KMU in das Zeitalter von KI zu begleiten und sie zu bef\xE4higen, KI f\xFCr ihr Unternehmen einzusetzen. Wir verbinden unternehmerische Praxis, menschliche Werte und moderne Technologie zu einem ganzheitlichen Ansatz und begleiten KMU pers\xF6nlich, vor Ort und auf Augenh\xF6he.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-team-grid"
  }, /*#__PURE__*/React.createElement(TeamCard, {
    src: asset('andre-ulrich-team.png?v=20260720-andre-bg-clean'),
    alt: "Andr\xE9 Ulrich",
    name: "Andr\xE9 Ulrich",
    role: "Mitgr\xFCnder \xB7 KMU-Experte",
    photoHeight: 340
  }), /*#__PURE__*/React.createElement(TeamCard, {
    src: asset('philip-krieger-team.png'),
    alt: "Philip Krieger",
    name: "Philip Krieger",
    role: "Mitgr\xFCnder \xB7 Coach",
    photoHeight: 340
  }))));
}
function App() {
  const [chatOpen, setChatOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "mock-page"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(UeberUns, null)), /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: asset('logo-lockup-white.png')
  }), /*#__PURE__*/React.createElement(ChatWidget, {
    open: chatOpen,
    onOpen: () => setChatOpen(true),
    onClose: () => setChatOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
