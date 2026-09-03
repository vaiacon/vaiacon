import React from 'react';

const BADGE_TONES = {
  peach:   { color: 'var(--terra-600)', background: 'var(--peach-150)', border: 'none' },
  onTerra: { color: 'var(--peach-100)', background: 'rgba(255, 244, 236, 0.16)', border: '1px solid rgba(255, 255, 255, 0.3)' },
  onDark:  { color: 'var(--orange-300)', background: 'rgba(233, 140, 88, 0.13)', border: '1px solid rgba(233, 140, 88, 0.4)' },
};

/** Gesperrtes UPPERCASE-Mini-Badge: «KOSTENLOS & UNVERBINDLICH», «PAKET 01 · ARBEITSWEISE». */
export function LabelBadge({ tone = 'peach', style, children }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.peach;
  return (
    <span style={{
      display: 'inline-block', alignSelf: 'flex-start',
      fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600,
      letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap',
      borderRadius: 'var(--radius-pill)', padding: '7px 13px', ...t, ...style,
    }}>
      {children}
    </span>
  );
}
