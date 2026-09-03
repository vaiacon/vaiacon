import React from 'react';

/** Schlanker Footer auf Terra-Glow: weisses Lockup, Adresszeile, Meta. */
export function SiteFooter({
  logoSrc = 'assets/logo-lockup-white.png',
  logoHeight = 24,
  address = 'vaiacon GmbH (in Gründung) · Lehenstrasse 74, 8037 Zürich',
  email = 'hallo@vaiacon.ch',
  copyright = '© 2026 vaiacon GmbH (in Gründung)',
  onTop,
  style,
}) {
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
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.6)' }}>
          {address} · <a href={`mailto:${email}`} style={{ color: '#FFFFFF', fontWeight: 500, textDecoration: 'none' }}>{email}</a>
        </p>
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
