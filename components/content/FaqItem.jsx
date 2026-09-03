import React from 'react';

/** FAQ-Zeile als <details>: Frage + rotierendes «+», Hairline-Trenner. */
export function FaqItem({ question, last, defaultOpen, style, children }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <details
      open={open}
      onToggle={(e) => setOpen(e.target.open)}
      style={{
        borderTop: '1px solid var(--border-strong)',
        borderBottom: last ? '1px solid var(--border-strong)' : 'none', ...style,
      }}
    >
      <summary style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
        cursor: 'pointer', padding: '21px 4px', listStyle: 'none', WebkitTapHighlightColor: 'transparent',
        fontSize: '17px', fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--text-strong)',
      }}>
        {question}
        <span aria-hidden="true" style={{
          color: 'var(--terra-500)', fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 400,
          flex: 'none', display: 'inline-block', transition: 'transform 0.35s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </summary>
      <p style={{ margin: 0, padding: '0 4px 24px', fontSize: '15px', lineHeight: 1.7, color: 'var(--text-body)' }}>{children}</p>
    </details>
  );
}
