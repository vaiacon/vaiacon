import React from 'react';

/** Team-Karte: Foto in weicher Maske auf Sand-Karte, Name + Rolle darunter. */
export function TeamCard({ src, alt = '', name, role, photoHeight = 330, style, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card-sand)', border: '1px solid var(--border-strong)',
        borderRadius: '24px', padding: '18px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: '16px',
        transform: hover ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'transform 0.4s var(--ease-spring)', ...style,
      }}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: `${photoHeight}px`, objectFit: 'cover', borderRadius: '16px', display: 'block' }} />
      ) : (
        <div style={{
          width: '100%', height: `${photoHeight}px`, borderRadius: '16px', boxSizing: 'border-box',
          border: '1px dashed var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)',
        }}>
          {children || `Foto ${name || ''}`}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0 8px 10px' }}>
        <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-strong)' }}>{name}</h3>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '14.5px', fontWeight: 600, color: 'var(--text-muted)' }}>{role}</span>
      </div>
    </article>
  );
}
