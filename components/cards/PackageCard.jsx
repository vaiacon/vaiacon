import React from 'react';
import { LabelBadge } from '../core/LabelBadge.jsx';
import { CheckItem } from '../core/CheckItem.jsx';

const PACKAGE_VARIANTS = {
  terra: { background: 'var(--grad-package)', border: '1.5px solid rgba(28, 22, 19, 0.5)', title: '#FFFFFF', subtitle: 'rgba(255, 240, 230, 0.9)', badge: 'onTerra', check: 'onTerra', rule: '1px solid rgba(255, 255, 255, 0.28)', label: 'rgba(255, 240, 230, 0.75)', price: '#FFFFFF' },
  dark: { background: 'var(--ink-950)', border: 'none', title: '#FFFFFF', subtitle: 'rgba(255, 255, 255, 0.7)', badge: 'onDark', check: 'onDark', rule: '1px solid rgba(255, 255, 255, 0.18)', label: 'rgba(255, 255, 255, 0.55)', price: '#FFFFFF' },
  sand: { background: 'var(--surface-card-sand)', border: '1px solid var(--border-strong)', title: 'var(--text-strong)', subtitle: 'var(--text-body)', badge: 'peach', check: 'light', rule: '1px solid var(--border-strong)', label: 'var(--text-muted)', price: 'var(--terra-600)' },
};
PACKAGE_VARIANTS.ink = PACKAGE_VARIANTS.dark;

/** Paket-Karte: Terra-Verlauf, Tinte oder Sand-Hairline, Badge, Feature-Liste, Preiszeile unten. */
export function PackageCard({ variant = 'terra', badge, title, subtitle, features = [], price = 'AUF ANFRAGE', style }) {
  const [hover, setHover] = React.useState(false);
  const v = PACKAGE_VARIANTS[variant] || PACKAGE_VARIANTS.terra;
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: v.background, border: v.border,
        borderRadius: 'var(--radius-xl)', padding: 'clamp(26px, 5vw, 40px) clamp(22px, 4.6vw, 38px)', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: '20px',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.4s var(--ease-spring)', ...style,
      }}
    >
      {badge ? <LabelBadge tone={v.badge}>{badge}</LabelBadge> : null}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(24px, 5.4vw, 30px)', fontWeight: 600, letterSpacing: '-0.02em', color: v.title }}>{title}</h3>
        {subtitle ? <span style={{ fontSize: '15px', lineHeight: 1.55, color: v.subtitle }}>{subtitle}</span> : null}
      </div>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', margin: '4px 0', padding: 0 }}>
        {features.map((f, i) => <CheckItem key={i} tone={v.check}>{f}</CheckItem>)}
      </ul>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: 'auto', paddingTop: '20px',
        borderTop: v.rule, fontFamily: 'var(--font-sans)',
      }}>
        <span style={{ fontSize: '10.5px', letterSpacing: '0.16em', color: v.label }}>PREIS</span>
        <strong style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.14em', color: v.price, textTransform: 'uppercase' }}>{price}</strong>
      </div>
    </article>
  );
}
