const { Kicker, CheckPill, ServiceRow, CheckItem, StepCard } = window.vaiaconDesignSystem_5f353f;

const wrap = { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '72px 32px', boxSizing: 'border-box' };

/* 01 · Statement */
function Orientierung() {
  return (
    <section id="orientierung" data-screen-label="Orientierung" style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-strong)' }}>
      <div style={{ ...wrap, display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center', textAlign: 'center' }}>
        <Kicker number="01">Wofür wir stehen</Kicker>
        <h2 style={{ margin: 0, fontSize: 'clamp(38px, 5vw, 66px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.05, color: 'var(--text-strong)', maxWidth: '18ch' }}>Wir geben Orientierung.</h2>
        <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.7, color: 'var(--text-body)', maxWidth: '62ch' }}>Strategie, Prozesse und KI für Schweizer KMU – verständlich erklärt und im Alltag umgesetzt. Damit Sie klarer entscheiden, Ihr Team entlastet wird und Ihr Unternehmen zukunftsfähig bleibt.</p>
        <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, listStyle: 'none', margin: '8px 0 0', padding: 0 }}>
          <CheckPill>Persönlich vor Ort in der ganzen Schweiz</CheckPill>
          <CheckPill>DSG-konformes Arbeiten</CheckPill>
          <CheckPill>Kein technisches Vorwissen nötig</CheckPill>
        </ul>
      </div>
    </section>
  );
}

/* 02 · Leistungen */
function Leistungen() {
  return (
    <section id="leistungen" data-screen-label="Leistungen" style={{ background: 'var(--bg-alt)' }}>
      <div style={wrap}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: '28px 64px', alignItems: 'end', marginBottom: 56 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Kicker number="02">Was wir für Sie tun</Kicker>
            <h2 style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-strong)' }}>Von der Vision zum Resultat.</h2>
          </div>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: '46ch' }}>Wir begleiten nicht nur einen Workshop. Wir verbinden Strategie, Umsetzung im Alltag und Führung zu einer nachhaltigen Transformation.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <ServiceRow number="01" title="KI-Transformation & Strategie">Wir schaffen Orientierung, priorisieren die wirksamsten Hebel und entwickeln eine klare Roadmap für Entscheidungen, Prozesse und Wachstum.</ServiceRow>
          <ServiceRow number="02" title="Implementierung">Wir automatisieren konkrete Abläufe, integrieren passende Lösungen und sorgen dafür, dass KI im Tagesgeschäft messbar entlastet.</ServiceRow>
          <ServiceRow number="03" title="Schulung & Change Management" last>Wir befähigen Unternehmer und Teams, mit KI bessere Entscheidungen zu treffen, Verantwortung zu übernehmen und Veränderung klar zu kommunizieren.</ServiceRow>
        </div>
      </div>
    </section>
  );
}

/* Büro-Bot-Tanzvideo: Server liefert MP4 ohne Range-Support — Datei komplett laden und als Blob füttern (spielt 1×, kein Loop). */
function BuerobotVideo() {
  const ref = React.useRef(null);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    let url = null, cancelled = false;
    fetch('../../assets/buerobot-dance.mp4')
      .then((r) => { if (!r.ok) throw new Error('http ' + r.status); return r.blob(); })
      .then((b) => {
        if (cancelled) return;
        url = URL.createObjectURL(b);
        const v = ref.current;
        if (!v) return;
        v.muted = true;
        v.defaultMuted = true;
        v.volume = 0;
        v.src = url;
        v.play().catch(() => {});
      })
      .catch(() => { if (!cancelled) setFailed(true); });
    return () => { cancelled = true; if (url) URL.revokeObjectURL(url); };
  }, []);
  if (failed) {
    return (
      <img
        data-comment-anchor="tanzender-roboter"
        src="../../assets/vaiacon-buerobot-phone.png"
        alt="Büro-Bot am Telefon"
        style={{ width: '100%', maxWidth: 600, aspectRatio: '16 / 9', objectFit: 'cover', display: 'block', borderRadius: 18 }}
      />
    );
  }
  return (
    <video
      data-comment-anchor="tanzender-roboter"
      ref={ref}
      autoPlay muted loop playsInline
      style={{ width: '100%', maxWidth: 600, aspectRatio: '16 / 9', display: 'block', borderRadius: 18 }}
    ></video>
  );
}

/* 03 · Büro-Bot (Terra) */
function Buerobot({ onOpenChat }) {
  return (
    <section id="buerobot" data-screen-label="Büro-Bot" style={{ position: 'relative', background: 'var(--grad-terra-section)', overflow: 'hidden' }}>
      <div style={{ ...wrap, padding: '80px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: 64, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Kicker tone="onTerra" number="03">Ein konkreter Hebel</Kicker>
          <h2 style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08, color: '#FFFFFF' }}>Büro-Bot: Transformation, die im Alltag ankommt.</h2>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: 'var(--text-on-terra-soft)', maxWidth: '54ch' }}>Büro-Bot ist unser digitaler Mitarbeiter für Schweizer Kleinunternehmen – ein Beispiel dafür, wie wir Strategie in echte Entlastung übersetzen: repetitive Büroarbeit wird automatisiert, Abläufe werden schneller und Ihr Team gewinnt Zeit für wertschöpfende Aufgaben.</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, listStyle: 'none', margin: '2px 0 0', padding: 0 }}>
            <CheckItem boxed tone="onTerra">Administrative Last reduzieren</CheckItem>
            <CheckItem boxed tone="onTerra">Prozesse konsequent automatisieren</CheckItem>
            <CheckItem boxed tone="onTerra">Resultate im Alltag sichtbar machen</CheckItem>
          </ul>
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
          <BuerobotVideo />
          <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: 'rgba(255,236,222,0.9)' }}></p>
        </div>
      </div>
    </section>
  );
}

/* 04 · Ablauf */
function Ablauf() {
  return (
    <section id="ablauf" data-screen-label="Ablauf" style={{ background: 'var(--bg-page)', borderBottom: '1px solid var(--border-strong)' }}>
      <div style={wrap}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 52 }}>
          <Kicker number="04">So starten wir</Kicker>
          <h2 style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-strong)' }}>Unser Vorgehen.</h2>
        </div>
        <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 22, listStyle: 'none', margin: 0, padding: 0 }}>
          <StepCard number="01" badge="Kostenlos & unverbindlich" title="Erstgespräch">Wir hören zu, klären Ziele und Herausforderungen und zeigen den nächsten sinnvollen Schritt – ohne Fachchinesisch und ohne Verkaufsdruck.</StepCard>
          <StepCard number="02" title="Analyse & Roadmap">Wir priorisieren die wirksamsten Hebel in Ihrem Unternehmen und entwickeln eine klare Roadmap für Entscheidungen, Prozesse und Automatisierung.</StepCard>
          <StepCard number="03" title="Umsetzung & Begleitung">Wir setzen um und befähigen Ihr Team im sicheren Umgang mit KI. Erste Resultate zeigen sich schnell im Alltag – und wir bleiben langfristig an Ihrer Seite.</StepCard>
        </ol>
      </div>
    </section>
  );
}

/* Vertrauen (Terra) */
function Datenschutz() {
  return (
    <section id="datenschutz" data-screen-label="Vertrauen" style={{ position: 'relative', background: 'var(--grad-terra-section)', overflow: 'hidden' }}>
      <div style={{ ...wrap, padding: '80px 32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: 64, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Kicker tone="onTerra" number="05">Vertrauen</Kicker>
          <h2 className="datenschutz-heading" style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08, color: '#FFFFFF' }}>
            <span className="datenschutz-heading-main">Ihre Daten <span className="datenschutz-heading-verb">verdienen</span></span><br className="datenschutz-heading-break" /><span className="datenschutz-heading-trust" style={{ color: 'var(--peach-200)' }}>Vertrauen und Schutz.</span>
          </h2>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: 'var(--text-on-terra-soft)', maxWidth: '54ch' }}>Wir verpflichten uns, Personendaten im Einklang mit dem geltenden Schweizer Datenschutzgesetz zu bearbeiten. Datenschutz berücksichtigen wir von der Planung bis zur Umsetzung jeder digitalen Lösung.</p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 13, listStyle: 'none', margin: '2px 0 0', padding: 0 }}>
            <CheckItem boxed tone="onTerra" style={{ alignItems: 'flex-start' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <strong style={{ fontSize: 16.5, fontWeight: 600, color: '#FFFFFF' }}>Transparent &amp; zweckgebunden</strong>
                <span style={{ fontSize: 14.5, lineHeight: 1.6, fontWeight: 500, color: 'var(--text-on-terra-soft)' }}>Wir erklären verständlich, welche Daten wofür benötigt werden.</span>
              </span>
            </CheckItem>
            <CheckItem boxed tone="onTerra" style={{ alignItems: 'flex-start' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <strong style={{ fontSize: 16.5, fontWeight: 600, color: '#FFFFFF' }}>Sparsam &amp; verantwortungsvoll</strong>
                <span style={{ fontSize: 14.5, lineHeight: 1.6, fontWeight: 500, color: 'var(--text-on-terra-soft)' }}>Wir bearbeiten nur Daten, die für die vereinbarte Leistung erforderlich sind.</span>
              </span>
            </CheckItem>
            <CheckItem boxed tone="onTerra" style={{ alignItems: 'flex-start' }}>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <strong style={{ fontSize: 16.5, fontWeight: 600, color: '#FFFFFF' }}>Technisch &amp; organisatorisch geschützt</strong>
                <span style={{ fontSize: 14.5, lineHeight: 1.6, fontWeight: 500, color: 'var(--text-on-terra-soft)' }}>Wir setzen angemessene Schutzmassnahmen ein und wählen eingesetzte Dienstleister sorgfältig aus.</span>
              </span>
            </CheckItem>
          </ul>
        </div>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', justifyContent: 'center', minHeight: 260 }}>
          <DsgvoSiegel size={176} rotate={-6} style={{ alignSelf: 'center' }} />
          <p style={{ margin: 0, fontSize: 14.5, fontWeight: 600, color: 'rgba(255,236,222,0.9)', textAlign: 'center' }}>Schweizer Datenschutzgesetz</p>
        </div>
      </div>
    </section>
  );
}

/* Versprechen (Peach) */
function Versprechen() {
  return (
    <section data-screen-label="Versprechen" style={{ background: 'linear-gradient(180deg, var(--cream-100) 0%, var(--peach-100) 58%, var(--sand-200) 100%)', borderTop: '1px solid var(--border-soft)', borderBottom: '2px solid var(--terra-500)' }}>
      <div style={{ ...wrap, padding: '88px 32px', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.26em', color: 'var(--terra-500)' }}>UNSER VERSPRECHEN</p>
        <h2 style={{ margin: 0, fontSize: 'clamp(38px, 5vw, 68px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.14, color: 'var(--text-strong)' }}>
          Transformation, die man<br /><span style={{ color: 'var(--terra-500)' }}>im Alltag spürt.</span>
        </h2>
      </div>
    </section>
  );
}

Object.assign(window, { Orientierung, Leistungen, Buerobot, Ablauf, Datenschutz, Versprechen });
