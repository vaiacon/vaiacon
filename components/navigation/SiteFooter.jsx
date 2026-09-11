import React from 'react';

/* Netzwerk-Zeichen: die bewusste Ausnahme vom Symbolverbot (10.09.2026).
   Nur diese drei, nur in der Fusszeile, nur als schlichter Verweis — nie als
   fertiger Baustein des Netzwerks, der bei jedem Aufruf lädt und mitzählt. */
const NETZ_ZEICHEN = {
  facebook: <path d="M14.9 8.1h2.4V4.3c-.4-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 6v3.3H4.5v4.3h3.7V24h4.5v-6.3h3.7l.6-4.3h-4.3v-2.9c0-1.3.4-2.4 2.2-2.4Z" />,
  linkedin: <path d="M5.4 8.5H2.3V22h3.1V8.5ZM3.9 6.7c1 0 1.8-.7 1.8-1.7S4.9 3.3 3.9 3.3 2.1 4 2.1 5s.8 1.7 1.8 1.7ZM22 22h-3.1v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22h-3.1V8.5h3v1.8h.1c.4-.8 1.5-2.2 4.5-2.2 3.2 0 3.8 2.1 3.8 4.9V22Z" />,
};

function NetzVerweis({ art, href, label }) {
  const [hover, setHover] = React.useState(false);
  const umriss = art === 'instagram';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={`vaiacon auf ${label}`}
      title={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 40, height: 40, borderRadius: 'var(--radius-pill)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: '#FFFFFF', boxSizing: 'border-box', textDecoration: 'none',
        background: hover ? 'rgba(255, 244, 236, 0.24)' : 'rgba(255, 244, 236, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'background 0.3s ease, transform 0.3s var(--ease-spring)',
      }}
    >
      <svg
        width={umriss ? 19 : 18} height={umriss ? 19 : 18} viewBox="0 0 24 24" aria-hidden="true"
        fill={umriss ? 'none' : 'currentColor'}
        stroke={umriss ? 'currentColor' : undefined}
        strokeWidth={umriss ? 2 : undefined}
        style={{ display: 'block' }}
      >
        {umriss ? (
          <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
          </>
        ) : NETZ_ZEICHEN[art]}
      </svg>
    </a>
  );
}

/** Schlanker Footer auf Terra-Glow: weisses Lockup, Adresszeile, Meta. */
export function SiteFooter({
  logoSrc = 'assets/logo-lockup-white.png',
  logoHeight = 24,
  address = 'vaiacon GmbH · Lehenstrasse 74, 8037 Zürich',
  email = 'hallo@vaiacon.ch',
  copyright = '© 2026 vaiacon GmbH',
  legalHref,
  legalLabel = 'Datenschutz und Impressum',
  facebookHref,
  instagramHref,
  linkedinHref,
  onTop,
  style,
}) {
  const netze = [
    { art: 'facebook', label: 'Facebook', href: facebookHref },
    { art: 'instagram', label: 'Instagram', href: instagramHref },
    { art: 'linkedin', label: 'LinkedIn', href: linkedinHref },
  ].filter((n) => n.href);
  const [hover, setHover] = React.useState(false);
  return (
    <footer style={{ background: 'var(--grad-terra-footer)', ...style }}>
      <div style={{
        maxWidth: 'var(--content-max)', margin: '0 auto', padding: '34px 32px', boxSizing: 'border-box',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '18px 36px',
      }}>
        <a href="#top" onClick={onTop} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logoSrc} alt="vaiacon" style={{ height: `${logoHeight}px`, width: 'auto', display: 'block', opacity: 0.95 }} />
        </a>
        {/* Dieselbe Gliederung wie auf den statischen Seiten: Am Bildschirm eine
            Zeile, auf dem Handy drei — Firma, Adresse, Mail und Datenschutz.
            Das Umbrechen erledigt .sv-footer__adresse in visibility.css, die
            auch hier geladen wird. */}
        <p className="sv-footer__adresse" style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.6)' }}>
          {address.split(' · ').map((teil, i) => <span key={i}>{teil}</span>)}
          <span>
            <a href={`mailto:${email}`} style={{ color: '#FFFFFF', fontWeight: 500, textDecoration: 'none' }}>{email}</a>
            {legalHref ? (
              <> · <a href={legalHref} style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none' }}>{legalLabel}</a></>
            ) : null}
          </span>
        </p>
        {netze.length ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {netze.map((n) => <NetzVerweis key={n.art} {...n} />)}
          </div>
        ) : null}
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: '28px',
          fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.5)',
        }}>
          <span>{copyright}</span>
          <a
            href="#top"
            onClick={onTop}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ color: hover ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)', textDecoration: 'none', transition: 'color 0.3s ease' }}
          >
            ↑ nach oben
          </a>
        </div>
      </div>
    </footer>
  );
}
