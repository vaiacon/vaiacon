import React from 'react';

/** Chat-Nachricht: Bot links (Creme), Nutzer rechts (Terracotta). */
export function ChatMessage({ role = 'bot', comic, style, children }) {
  const user = role === 'user';
  const base = comic
    ? {
        background: user ? 'var(--terra-500)' : 'var(--cream-100)',
        border: '1.5px solid var(--border-ink)',
        color: user ? 'var(--cream-50)' : 'var(--text-strong)',
        borderRadius: user ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
        padding: '8px 12px', fontSize: '13.5px', fontWeight: 500, lineHeight: 1.45,
      }
    : {
        background: user ? 'var(--terra-700)' : 'var(--surface-card)',
        border: user ? 'none' : '1px solid rgba(28, 22, 19, 0.18)',
        color: user ? 'var(--cream-50)' : 'var(--text-strong)',
        borderRadius: user ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        padding: '10px 14px', fontSize: '14.5px', lineHeight: 1.55,
      };
  return (
    <div style={{
      alignSelf: user ? 'flex-end' : 'flex-start', maxWidth: '86%', boxSizing: 'border-box',
      fontFamily: 'var(--font-sans)', whiteSpace: 'pre-wrap', ...base, ...style,
    }}>
      {children}
    </div>
  );
}
