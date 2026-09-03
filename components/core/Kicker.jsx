import React from 'react';

const KICKER_TONES = {
  terra: 'var(--terra-500)',
  onTerra: 'rgba(255, 236, 222, 0.88)',
  onDark: 'var(--orange-500)',
};

/** Nummerierter Kicker über Sektionstiteln: «02 — WAS WIR FÜR SIE TUN». */
export function Kicker({ number, tone = 'terra', style, children }) {
  return (
    <p style={{
      margin: 0, fontFamily: 'var(--font-sans)', fontSize: '13.5px', fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: KICKER_TONES[tone] || KICKER_TONES.terra, ...style,
    }}>
      {number ? `${number} — ` : ''}{children}
    </p>
  );
}
