import React from 'react';

/** Leistungs-Zeile: Nummer · Titel + Text · Pfeil; Hover tönt Grund und schiebt nach rechts. */
export function ServiceRow({ number, title, last, style, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gridTemplateColumns: 'clamp(30px, 7vw, 84px) minmax(0, 1fr) auto', gap: 'clamp(14px, 3vw, 28px)', alignItems: 'center',
        padding: hover ? 'clamp(22px, 4vw, 32px) 18px clamp(22px, 4vw, 32px) 34px' : 'clamp(22px, 4vw, 32px) 18px',
        borderTop: '1px solid var(--border-strong)',
        borderBottom: last ? '1px solid var(--border-strong)' : 'none',
        background: hover ? 'var(--sand-300)' : 'transparent',
        transition: 'background 0.35s ease, padding-left 0.35s ease', ...style,
      }}
    >
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'var(--terra-500)' }}>{number}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(18px, 4.4vw, 21px)', fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--text-strong)' }}>{title}</h3>
        <p style={{ margin: 0, fontSize: '15.5px', lineHeight: 1.6, color: 'var(--text-body)', maxWidth: '70ch' }}>{children}</p>
      </div>
      <i aria-hidden="true" style={{ fontStyle: 'normal', fontSize: '20px', color: 'var(--brown-300)' }}>→</i>
    </article>
  );
}
