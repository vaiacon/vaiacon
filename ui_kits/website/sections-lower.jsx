const { Kicker, PackageCard, TeamCard, QuoteCard, KompassTile, FaqItem, Button } = window.vaiaconDesignSystem_5f353f;

const wrap2 = { maxWidth: 'var(--content-max)', margin: '0 auto', padding: '72px 32px', boxSizing: 'border-box' };

/* 06 · Begleitung (Pakete) */
function Begleitung() {
  return (
    <section id="begleitung" data-screen-label="Begleitung" style={{ background: 'var(--bg-alt)' }}>
      <div style={{ ...wrap2, display: 'flex', flexDirection: 'column', gap: 52 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: '28px 64px', alignItems: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Kicker number="06">Langfristig gut begleitet</Kicker>
            <h2 style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-strong)' }}>Zwei Pakete. Eine Begleitung.</h2>
          </div>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: '50ch' }}>Transformation ist kein einmaliger Workshop. Unsere Pakete verbinden Arbeitsweise und Mensch – einzeln buchbar oder kombiniert als ganzheitliche Begleitung.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: 24, alignItems: 'stretch' }}>
          <PackageCard
            badge="Paket 01 · Arbeitsweise"
            title="KI im Alltag"
            subtitle="Automatisierung und KI, die Ihr Team im Tagesgeschäft spürbar entlasten."
            features={['Prozesse analysieren & automatisieren', 'Büro-Bot als digitaler Mitarbeiter', 'KI-Schulungen ohne technisches Vorwissen', 'IT-Koordination aus einer Hand']}
            price="ab CHF 600.00"
          />
          <PackageCard
            badge="Paket 02 · Mindchange"
            title="Change & Coaching"
            subtitle="Begleitung für Change, Transformation und Führung – mit dem Menschen im Mittelpunkt."
            features={['Standortbestimmung Mitarbeitende', 'Coaching für Unternehmer & Führungskräfte', 'Teams befähigen & mitnehmen', 'Resultate messen & weiterentwickeln']}
          />
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>Beide Pakete sind kombinierbar. Die konkreten Leistungen stimmen wir passend zu Ihrem Bedarf ab.</p>
      </div>
    </section>
  );
}

/* 07 · Über uns + Kompass */
function UeberUns() {
  return (
    <section id="ueber-uns" data-screen-label="Über uns" style={{ background: 'var(--bg-page)', borderTop: '1px solid var(--border-strong)' }}>
      <div style={{ ...wrap2, display: 'flex', flexDirection: 'column', gap: 52 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 760 }}>
          <Kicker number="07">Wer dahinter steht</Kicker>
          <h2 style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-strong)' }}>Unternehmensentwicklung mit dem Menschen im Mittelpunkt.</h2>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.7, color: 'var(--text-body)' }}>vaiacon ist ein Schweizer Unternehmen aus Zürich. Wir verbinden unternehmerische Praxis, menschliche Werte und moderne Technologie zu einem ganzheitlichen Ansatz – und begleiten KMU persönlich, vor Ort und auf Augenhöhe.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))', gap: 22, alignItems: 'stretch' }}>
          <TeamCard src="../../assets/andre-ulrich-team.png?v=20260720-andre-bg-clean" alt="Porträt von André Ulrich" name="André Ulrich" role="Mitgründer · KMU-Experte" />
          <TeamCard src="../../assets/philip-krieger-team.png" alt="Porträt von Philip Krieger" name="Philip Krieger" role="Mitgründer · Coach" />
          <QuoteCard
            logoSrc="../../assets/logo-mark-terra-symbol-white.png"
            quote="Klarheit schafft bessere Entscheidungen."
            style={{ gridColumn: '1 / -1', minHeight: 200 }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, borderTop: '1px solid var(--border-strong)', paddingTop: 44 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '10px 28px' }}>
            <Kicker>Unser Kompass</Kicker>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)' }}>Vier Fragen leiten jede Entscheidung und jede Begegnung.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(480px, 100%), 1fr))', gap: 14 }}>
            <KompassTile number="01">Ist es richtig für die Menschen, die davon betroffen sind?</KompassTile>
            <KompassTile number="02">Ist es richtig für das Unternehmen und seine Zukunft?</KompassTile>
            <KompassTile number="03">Ist es richtig für unsere Werte und unseren Anspruch?</KompassTile>
            <KompassTile number="04">Ist es richtig für unsere Partner und die langfristige Wirkung?</KompassTile>
          </div>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: 'var(--terra-500)' }}>4 × Ja — dann sind wir auf Kurs.</p>
        </div>
      </div>
    </section>
  );
}

/* 08 · FAQ */
function Faq() {
  return (
    <section id="faq" data-screen-label="FAQ" style={{ background: 'var(--bg-alt)', borderTop: '1px solid var(--border-strong)' }}>
      <div style={{ ...wrap2, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))', gap: 56, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Kicker number="08">Häufige Fragen</Kicker>
          <h2 style={{ margin: 0, fontSize: 'var(--text-h2)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-strong)' }}>Kurz gefragt. Klar beantwortet.</h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: 'var(--text-body)', maxWidth: '42ch' }}>Die wichtigsten Antworten zu vaiacon und dem einfachen Einstieg.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <FaqItem question="Was macht vaiacon?">vaiacon ist Transformationspartner für Schweizer KMU im KI-Zeitalter. Wir verbinden Strategie, Umsetzung und langfristige Begleitung, damit aus KI bessere Entscheidungen, produktivere Teams und messbare Geschäftsergebnisse entstehen.</FaqItem>
          <FaqItem question="Ist vaiacon eine klassische KI-Agentur?">Nein. KI ist für uns nicht das Produkt, sondern das Werkzeug. Im Zentrum stehen Unternehmensentwicklung, Führung und messbare Resultate – nicht möglichst viele Tools oder ein einmaliger Workshop.</FaqItem>
          <FaqItem question="Was ist der vaiacon Kompass?">Unser Kompass sind vier Fragen, die jede Entscheidung und jede Begegnung leiten: Ist es richtig für die Menschen, für das Unternehmen, für unsere Werte und für unsere Partner? 4 × Ja – dann sind wir auf Kurs.</FaqItem>
          <FaqItem question="Was ist Büro-Bot?">Büro-Bot ist der digitale Mitarbeiter für Schweizer Kleinunternehmen. Er vereinfacht wiederkehrende Büroarbeit mit Automatisierung und KI, unterstützt administrative Prozesse, Webseiten, CRM und Chatbots und entlastet dadurch Ihr Team.</FaqItem>
          <FaqItem question="Wie unterstützt vaiacon Schweizer KMU mit KI?">In drei Schritten: Wir schaffen Orientierung und priorisieren die wirksamsten Hebel, wir automatisieren konkrete Abläufe im Tagesgeschäft und wir befähigen Ihr Team im sicheren Umgang mit KI. KI ist dabei Werkzeug, nicht Selbstzweck – im Zentrum steht Ihre Entlastung im Alltag.</FaqItem>
          <FaqItem question="Kann vaiacon die IT-Koordination für KMU ohne interne IT übernehmen?">Ja. Wir übernehmen die IT-Koordination aus einer Hand: Als zentraler Ansprechpartner stimmen wir Dienstleister und Lösungen aufeinander ab und erklären alles verständlich – ohne Fachchinesisch.</FaqItem>
          <FaqItem question="Für welche KMU eignet sich die digitale Beratung?">Für Schweizer Kleinunternehmen und KMU, die klarer entscheiden und ihr Team entlasten möchten – unabhängig von Branche und Vorwissen. Wir begleiten persönlich, vor Ort in der ganzen Schweiz und auf Augenhöhe.</FaqItem>
          <FaqItem question="Brauche ich für die KI-Schulungen technisches Vorwissen?">Nein. Unsere Beratung, Schulungen und Coachings sind praxisnah aufgebaut und werden an den Wissensstand der Teilnehmenden angepasst. Im Mittelpunkt steht die sichere und sinnvolle Anwendung im Alltag.</FaqItem>
          <FaqItem question="Wie schützt vaiacon meine persönlichen Daten?">Wir verpflichten uns zur Einhaltung des geltenden Schweizer Datenschutzgesetzes. Personendaten bearbeiten wir rechtmässig, transparent, zweckgebunden und sparsam – mit angemessenen technischen und organisatorischen Schutzmassnahmen.</FaqItem>
          <FaqItem question="Wie bietet vaiacon seine Dienstleistungen an?">Über zwei kombinierbare Pakete: «KI im Alltag» für Arbeitsweise und Automatisierung, «Change & Coaching» für Transformation und Führung mit dem Menschen im Mittelpunkt. Die konkreten Leistungen stimmen wir passend zu Ihrem Bedarf ab.</FaqItem>
          <FaqItem question="Wie beginnt eine Zusammenarbeit mit vaiacon?" last>Am Anfang steht ein kostenloses und unverbindliches Erstgespräch. Wir klären Ihr Anliegen, zeigen sinnvolle Möglichkeiten auf und empfehlen einen passenden nächsten Schritt – ohne Fachchinesisch und ohne Verkaufsdruck.</FaqItem>
        </div>
      </div>
    </section>
  );
}

/* 09 · Kontakt (Terracotta-Finale) */
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/vaiacon', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vaiacon', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/vaiacon', icon: 'instagram' },
];

function SocialIconLink({ label, href, icon }) {
  const [hover, setHover] = React.useState(false);
  const baseStyle = {
    width: 46,
    height: 46,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    background: hover ? 'rgba(255, 244, 236, 0.24)' : 'rgba(255, 244, 236, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxSizing: 'border-box',
    textDecoration: 'none',
    transform: hover ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'background 0.3s ease, transform 0.3s var(--ease-spring), border-color 0.3s ease',
  };
  return (
    <a
      className="contact-social-link"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      title={label}
      style={baseStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {icon === 'facebook' ? (
        <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M14.9 8.1h2.4V4.3c-.4-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 6v3.3H4.5v4.3h3.7V24h4.5v-6.3h3.7l.6-4.3h-4.3v-2.9c0-1.3.4-2.4 2.2-2.4Z" />
        </svg>
      ) : null}
      {icon === 'linkedin' ? (
        <svg width="21" height="21" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M5.4 8.5H2.3V22h3.1V8.5ZM3.9 6.7c1 0 1.8-.7 1.8-1.7S4.9 3.3 3.9 3.3 2.1 4 2.1 5s.8 1.7 1.8 1.7ZM22 22h-3.1v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22h-3.1V8.5h3v1.8h.1c.4-.8 1.5-2.2 4.5-2.2 3.2 0 3.8 2.1 3.8 4.9V22Z" />
        </svg>
      ) : null}
      {icon === 'instagram' ? (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      ) : null}
    </a>
  );
}

function Kontakt() {
  return (
    <section id="kontakt" data-screen-label="Kontakt" style={{ position: 'relative', background: 'var(--grad-terra-finale)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'var(--glow-peach)' }}></div>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '88px 32px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 26, alignItems: 'center', textAlign: 'center', position: 'relative' }}>
        <Kicker tone="onTerra" number="09">Kostenlos &amp; unverbindlich</Kicker>
        <h2 style={{ margin: 0, fontSize: 'clamp(36px, 4.6vw, 62px)', fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1.08, color: 'var(--cream-50)' }}>Welche Richtung ist für Ihr Unternehmen die richtige?</h2>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: 'var(--text-on-terra-soft)', maxWidth: '56ch' }}>Im Erstgespräch schaffen wir Orientierung: Wir klären Ziele, Herausforderungen und den nächsten sinnvollen Schritt für eine nachhaltige Entwicklung.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
          <Button variant="glass" arrow href="../../kontakt.html#formular">Gespräch vereinbaren</Button>
        </div>
        <small style={{ fontSize: 15, fontWeight: 600, color: 'rgba(255,236,222,0.9)' }}>Klar · Persönlich · Ohne Verkaufsdruck</small>
        <div className="contact-social-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 10 }}>
          {SOCIAL_LINKS.map((item) => (
            <SocialIconLink key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Begleitung, UeberUns, Faq, Kontakt });
