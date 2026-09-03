const { SiteHeader, SiteFooter } = window.vaiaconDesignSystem_5f353f;

const NAV_LINKS = [
  { number: '01', label: 'Wofür wir stehen', href: '#orientierung' },
  { number: '02', label: 'Leistungen', href: '#leistungen' },
  { number: '03', label: 'Büro-Bot', href: '#buerobot' },
  { number: '05', label: 'Vertrauen', href: '#datenschutz' },
  { number: '06', label: 'Begleitung', href: '#begleitung' },
  { number: '07', label: 'Über uns', href: '#ueber-uns' },
  { number: '08', label: 'FAQ', href: '#faq' },
  { number: '09', label: 'Kontakt', href: '#kontakt' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineTop": 17,
  "robotBottom": -3,
  "robotHeight": 56,
  "robotX": 0,
  "vignette": true,
  "stampStyle": "glas",
  "stampText": "Kostenlose Online-Erstanalyse",
  "stampPosX": 69.6,
  "stampPosY": 46,
  "stampWidth": 550,
  "stampRotate": 0,
  "stampFontSize": 16,
  "stampRadius": 999,
  "stampTail": false,
  "stampTailX": 26,
  "stampTailSize": 26
}/*EDITMODE-END*/;

function App() {
  const [active, setActive] = React.useState('');
  const [chatOpen, setChatOpen] = React.useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      let a = '';
      ['orientierung', 'leistungen', 'buerobot', 'datenschutz', 'begleitung', 'ueber-uns', 'faq', 'kontakt'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.45 && r.bottom >= vh * 0.45) a = id;
      });
      setActive(a);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener('scroll', onScroll, { passive: true });
    check();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div>
      <div className="site-header-shell">
        <div className="header-desktop">
          <SiteHeader
            logoSrc="../../assets/logo-lockup-terra-symbol-cream.png"
            links={NAV_LINKS}
            active={active}
            ctaLabel={null}
          />
        </div>
        <MobileHeader
          logoSrc="../../assets/logo-lockup-terra-symbol-cream.png"
          links={NAV_LINKS}
          active={active}
          ctaLabel={null}
        />
      </div>
      <div className="site-header-spacer" aria-hidden="true"></div>
      <Hero tweaks={tweaks} />
      <main>
        <Orientierung />
        <Leistungen />
        <Buerobot onOpenChat={() => setChatOpen(true)} />
        <Ablauf />
        <Datenschutz />
        <Versprechen />
        <Begleitung />
        <UeberUns />
        <Faq />
        <Kontakt />
      </main>
      <SiteFooter logoSrc="../../assets/logo-lockup-white.png" />
      <ChatWidget open={chatOpen} onOpen={() => setChatOpen(true)} onClose={() => setChatOpen(false)} />
      <TweaksPanel>
        <TweakSection label="Roboter" />
        <TweakSlider label="Position X (± Mitte)" value={tweaks.robotX} min={-24} max={24} step={1} unit="vw" onChange={(v) => setTweak('robotX', v)} />
        <TweakSlider label="Abstand unten" value={tweaks.robotBottom} min={-8} max={16} step={1} unit="vh" onChange={(v) => setTweak('robotBottom', v)} />
        <TweakSlider label="Grösse" value={tweaks.robotHeight} min={36} max={78} step={1} unit="vh" onChange={(v) => setTweak('robotHeight', v)} />
        <TweakSection label="Hero-Layout" />
        <TweakSlider label="Headline · Abstand oben" value={tweaks.headlineTop} min={12} max={28} step={1} unit="vh" onChange={(v) => setTweak('headlineTop', v)} />
        <TweakSection label="Erstanalyse-Stempel" />
        <TweakText label="Text" value={tweaks.stampText} placeholder="Kostenlose Online-Erstanalyse" onChange={(v) => setTweak('stampText', v)} />
        <TweakRadio label="Stil" value={tweaks.stampStyle} options={['comic', 'glas', 'tinte']} onChange={(v) => setTweak('stampStyle', v)} />
        <TweakSlider label="Position X" value={tweaks.stampPosX} min={20} max={90} step={0.5} unit="%" onChange={(v) => setTweak('stampPosX', v)} />
        <TweakSlider label="Abstand unten" value={tweaks.stampPosY} min={20} max={72} step={1} unit="vh" onChange={(v) => setTweak('stampPosY', v)} />
        <TweakSlider label="Breite (max)" value={tweaks.stampWidth} min={300} max={620} step={10} unit="px" onChange={(v) => setTweak('stampWidth', v)} />
        <TweakSlider label="Drehung" value={tweaks.stampRotate} min={-8} max={8} step={0.5} unit="°" onChange={(v) => setTweak('stampRotate', v)} />
        <TweakSlider label="Textgrösse" value={tweaks.stampFontSize} min={11} max={16} step={0.5} unit="px" onChange={(v) => setTweak('stampFontSize', v)} />
        <TweakSlider label="Eckenradius" value={tweaks.stampRadius} min={8} max={28} step={1} unit="px" onChange={(v) => setTweak('stampRadius', v)} />
        <TweakToggle label="Tail (Zeiger)" value={tweaks.stampTail} onChange={(v) => setTweak('stampTail', v)} />
        <TweakSlider label="Tail · Position" value={tweaks.stampTailX} min={10} max={90} step={1} unit="%" onChange={(v) => setTweak('stampTailX', v)} />
        <TweakSlider label="Tail · Grösse" value={tweaks.stampTailSize} min={12} max={44} step={2} unit="px" onChange={(v) => setTweak('stampTailSize', v)} />
        <TweakSection label="Hero-Extras" />
        <TweakToggle label="Abdunklungs-Vignette" value={tweaks.vignette} onChange={(v) => setTweak('vignette', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
