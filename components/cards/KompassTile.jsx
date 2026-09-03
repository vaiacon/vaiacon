import React from 'react';

/** Kompass-Tile: nummerierte Wertefrage auf Sand (radius 14px). */
export function KompassTile({ number, style, children }) {
  return (
    <div style={{
      display: 'flex', gap: '14px', alignItems: 'baseline',
      background: 'var(--surface-card-sand)', border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-sm)', padding: '20px 22px', boxSizing: 'border-box',
      fontSize: '15.5px', lineHeight: 1.5, fontWeight: 500, color: 'var(--text-strong)', ...style,
    }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontWeight: 600, color: 'var(--terra-500)', flex: 'none' }}>{number}</span>
      {children}
    </div>
  );
}
