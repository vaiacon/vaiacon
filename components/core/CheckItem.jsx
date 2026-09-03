import React from 'react';

/** ✓-Listenzeile. plain = nacktes ✓ (baseline) · boxed = ✓ im 22px-Quadrat (auf Terra). */
export function CheckItem({ boxed, tone = 'light', style, children }) {
  const onColor = tone === 'onTerra';
  const check = boxed ? (
    <span aria-hidden="true" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '22px', height: '22px', borderRadius: 'var(--radius-xs)', flex: 'none',
      background: onColor ? 'rgba(255, 244, 236, 0.15)' : 'var(--peach-150)',
      border: onColor ? '1px solid rgba(255, 255, 255, 0.34)' : '1px solid var(--border-strong)',
      color: onColor ? 'var(--peach-200)' : 'var(--terra-500)', fontSize: '11px',
    }}>✓</span>
  ) : (
    <span aria-hidden="true" style={{
      color: onColor ? 'var(--peach-200)' : tone === 'onDark' ? 'var(--orange-300)' : 'var(--terra-500)',
      fontWeight: 700, flex: 'none',
    }}>✓</span>
  );
  return (
    <li style={{
      display: 'flex', alignItems: boxed ? 'center' : 'baseline', gap: '12px', listStyle: 'none',
      fontFamily: 'var(--font-sans)', fontSize: boxed ? '16.5px' : '15px',
      fontWeight: boxed ? 600 : 500, lineHeight: 1.5,
      color: onColor ? 'var(--peach-100)' : tone === 'onDark' ? 'rgba(255, 255, 255, 0.88)' : 'var(--text-strong)',
      ...style,
    }}>
      {check}
      {children}
    </li>
  );
}
