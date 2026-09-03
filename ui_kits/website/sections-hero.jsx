const { Kicker } = window.vaiaconDesignSystem_5f353f;

/* Statischer Hero: Terra-Bühne, Büro-Bot-Standbild (Poster), Headline, Markenzeilen. */
const HERO_DEFAULTS = { headlineTop: 17, robotBottom: -3, robotHeight: 56, robotX: 0, vignette: true, stampStyle: 'glas', stampText: 'Kostenlose Online-Erstanalyse', stampPosX: 69.6, stampPosY: 46, stampWidth: 550, stampRotate: 0, stampFontSize: 16, stampRadius: 999, stampTail: false, stampTailX: 26, stampTailSize: 26 };

function Hero({ tweaks }) {
  const t = { ...HERO_DEFAULTS, ...tweaks };
  const stampButtonStyle = {
    display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center', gap: 9, whiteSpace: 'nowrap',
    background: 'rgba(255,244,236,0.12)', border: '1px solid rgba(255,255,255,0.32)', borderRadius: 999,
    padding: '10px 22px', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
    color: 'var(--cream-50)', textDecoration: 'none', fontSize: t.stampFontSize, fontWeight: 700, lineHeight: 1.2,
    boxSizing: 'border-box',
  };
  return (
    <section id="top" data-screen-label="Hero" style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: 'var(--grad-terra-hero)' }}>
      {/* Licht von unten, Abdunklung oben */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(62% 46% at 55% 102%, rgba(244,158,96,0.5) 0%, rgba(244,158,96,0) 70%), radial-gradient(90% 60% at 50% -8%, rgba(70,26,6,0.35) 0%, rgba(70,26,6,0) 60%)' }}></div>

      {/* Büro-Bot-Bühne — unten verankert; Maske lässt die Antenne frei (solid ab 7 % Bildhöhe).
          Zentrierung über Flex-Wrapper (breathe-Keyframes überschreiben transform!). */}
      <div className="hero-robot" style={{ position: 'absolute', left: 0, right: 0, bottom: `${t.robotBottom}vh`, height: `${t.robotHeight}vh`, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
        <div style={{ position: 'relative', left: `${t.robotX}vw`, height: '100%', aspectRatio: '16 / 9', flex: 'none', animation: 'breathe 6.5s ease-in-out infinite' }}>
          <img
            src="../../assets/vaiacon-buerobot-hero.png"
            alt="Büro-Bot zeigt nach oben"
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,0) 6%, #000 26%, #000 74%, rgba(0,0,0,0) 94%), linear-gradient(180deg, rgba(0,0,0,0) 0.5%, #000 7%, #000 93%, rgba(0,0,0,0) 99.5%)',
              maskImage: 'linear-gradient(90deg, rgba(0,0,0,0) 6%, #000 26%, #000 74%, rgba(0,0,0,0) 94%), linear-gradient(180deg, rgba(0,0,0,0) 0.5%, #000 7%, #000 93%, rgba(0,0,0,0) 99.5%)',
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect',
            }}
          />
        </div>
      </div>

      {/* DSG-Siegel — Desktop/Tablet und mobil im Hero */}
      <DsgvoSiegel className="hero-siegel" style={{ position: 'absolute', zIndex: 36, right: '7vw', bottom: '12vh' }} />

      {/* Headline */}
      <div className="hero-headline" style={{ position: 'absolute', zIndex: 30, left: 0, right: 0, top: `${t.headlineTop}vh`, pointerEvents: 'none', color: 'var(--cream-50)', textAlign: 'center' }}>
        <h1 style={{ margin: '0 auto', maxWidth: 'min(1040px, calc(100vw - 40px))', fontSize: 'clamp(32px, 4vw, 68px)', fontWeight: 600, letterSpacing: 0, lineHeight: 1.06 }}>
          <span style={{ display: 'block' }}>KI für KMU verständlich erklärt,</span>
          <span style={{ display: 'block', color: 'var(--peach-200)' }}>zuverlässig umgesetzt</span>
        </h1>
        <p className="hero-subline" style={{ margin: 'clamp(18px, 2.6vh, 30px) auto 0', maxWidth: 780, padding: '0 20px', fontSize: 18, fontWeight: 600, letterSpacing: 0, lineHeight: 1.55, color: 'rgba(255,253,248,0.9)' }}>Wir analysieren Abläufe, setzen digitale Lösungen um und begleiten Teams, bis sie im Alltag funktionieren.</p>
        <div className="hero-cta" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(10px, 1.4vw, 18px)', flexWrap: 'wrap', marginTop: 'clamp(18px, 2.7vh, 32px)', pointerEvents: 'auto', padding: '0 20px' }}>
          <a className="hero-pill hero-cta-pill" href="#kontakt" style={stampButtonStyle}>
            <span>Erstgespräch</span>
            <span aria-hidden="true" style={{ color: 'var(--peach-200)', fontWeight: 700 }}>→</span>
          </a>
          <a className="hero-pill hero-analysis-pill" href="erstanalyse.html" aria-label="Kostenlose Online-Erstanalyse öffnen" style={stampButtonStyle}>
            <span>{t.stampText || 'Kostenlose Online-Erstanalyse'}</span>
            <span aria-hidden="true" style={{ color: 'var(--peach-200)', fontWeight: 700 }}>→</span>
          </a>
        </div>
        <div className="hero-mobile-values" aria-hidden="true">
          <span>Orientierung</span>
          <span>Entwicklung</span>
          <span>Begleitung</span>
        </div>
      </div>

      {/* Markenzeilen unten */}
      <div className="hero-brand" style={{ position: 'absolute', zIndex: 40, left: '3.5vw', bottom: '4.6vh', fontSize: 11, letterSpacing: '0.16em', color: 'var(--cream-50)' }}>
        ORIENTIERUNG&nbsp;&nbsp;·&nbsp;&nbsp;ENTWICKLUNG&nbsp;&nbsp;·&nbsp;&nbsp;BEGLEITUNG
      </div>
      <a href="#kontakt" className="hero-brand-link" style={{ position: 'absolute', zIndex: 40, right: '3.5vw', bottom: '4.6vh', fontSize: 11, letterSpacing: '0.18em', color: 'var(--cream-50)', textDecoration: 'none' }}>
        VAIACON.CH
      </a>

      {/* Vignette (per Direkt-Edit verschoben) */}
      {t.vignette ? <div className="hero-vignette" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(125% 120% at 50% 42%, rgba(0,0,0,0) 56%, rgba(62,22,6,0.30) 100%)', left: -528, top: 274 }}></div> : null}
    </section>
  );
}

Object.assign(window, { Hero });
