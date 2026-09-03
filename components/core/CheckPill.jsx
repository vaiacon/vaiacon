import React from 'react';

/** Check-Chip: Pill mit ✓ für kurze Vertrauensargumente («DSG-konformes Arbeiten»). */
export function CheckPill({ style, children }) {
  return (
    <li style={{
      display: 'flex', alignItems: 'center', gap: '9px', listStyle: 'none',
      fontFamily: 'var(--font-sans)', fontSize: '14.5px', fontWeight: 600, color: 'var(--text-strong)',
      background: 'var(--cream-100)', border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-pill)', padding: '10px 18px', ...style,
    }}>
      <span aria-hidden="true" style={{ color: 'var(--terra-500)' }}>✓</span>
      {children}
    </li>
  );
}
