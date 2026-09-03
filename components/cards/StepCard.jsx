import React from 'react';
import { LabelBadge } from '../core/LabelBadge.jsx';

/** Nummerierte Ablauf-Karte (Sand, radius 22px, federnder Hover-Lift). */
export function StepCard({ number, badge, title, style, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        listStyle: 'none', background: 'var(--surface-card-sand)', border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)', padding: '34px 32px', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: '15px',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.4s var(--ease-spring)', ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', fontWeight: 600, color: 'var(--terra-500)' }}>{number}</span>
        {badge ? <LabelBadge style={{ fontSize: '9.5px', letterSpacing: '0.12em', padding: '6px 11px' }}>{badge}</LabelBadge> : null}
      </div>
      <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--text-strong)' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.65, color: 'var(--text-body)' }}>{children}</p>
    </li>
  );
}
