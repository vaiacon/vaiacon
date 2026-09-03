import React from 'react';

/** Comic-Sprechblase mit Tail — so «spricht» der Büro-Bot. */
export function SpeechBubble({ tail = 'bottom-left', comic, onClick, style, children }) {
  const [hover, setHover] = React.useState(false);
  const border = comic ? '2px solid var(--border-ink)' : '1.5px solid rgba(28, 22, 19, 0.55)';
  const clickable = !!onClick;

  const tails = {
    right: (
      <span aria-hidden="true" style={{
        position: 'absolute', right: '-12px', top: '44px', width: '22px', height: '22px',
        background: 'var(--surface-card)', borderTop: border, borderRight: border,
        transform: 'rotate(45deg)', zIndex: 2,
      }} />
    ),
    left: (
      <span aria-hidden="true" style={{
        position: 'absolute', left: '-12px', top: '44px', width: '22px', height: '22px',
        background: 'var(--surface-card)', borderBottom: border, borderLeft: border,
        transform: 'rotate(45deg)', zIndex: 2,
      }} />
    ),
    'bottom-left': (
      <span aria-hidden="true" style={{
        position: 'absolute', left: '-2px', bottom: '-11px', width: '18px', height: '18px',
        background: 'var(--surface-card)', borderLeft: border, borderBottom: border,
        transform: 'skewX(38deg) rotate(-14deg)', borderRadius: '0 0 0 6px',
      }} />
    ),
  };

  const Tag = clickable ? 'button' : 'div';
  return (
    <Tag
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', display: 'block', textAlign: 'left', boxSizing: 'border-box',
        background: 'var(--surface-card)', color: 'var(--text-strong)', border,
        borderRadius: tail === 'bottom-left' ? '18px 18px 18px 4px' : '20px',
        padding: '14px 18px', fontFamily: 'var(--font-sans)', fontSize: '15.5px', fontWeight: 600, lineHeight: 1.4,
        boxShadow: comic ? 'var(--shadow-comic)' : 'var(--shadow-soft)',
        cursor: clickable ? 'pointer' : 'default',
        transform: clickable && hover ? 'translateY(-4px) rotate(-1deg)' : 'none',
        transition: 'transform 0.35s var(--ease-spring)', ...style,
      }}
    >
      {tails[tail] || null}
      {children}
    </Tag>
  );
}
