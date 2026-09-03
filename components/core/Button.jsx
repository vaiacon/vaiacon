import React from 'react';

const BUTTON_VARIANTS = {
  cta:   { base: { background: 'var(--cta-bg)', color: '#FFFFFF' }, hover: { background: 'var(--cta-bg-hover)' } },
  light: { base: { background: 'var(--cream-100)', color: 'var(--terra-600)', boxShadow: 'var(--shadow-cta)' }, hover: { transform: 'translateY(-3px)', boxShadow: 'var(--shadow-cta-hover)' } },
  glass: { base: { background: 'rgba(255, 244, 236, 0.12)', border: '1px solid rgba(255, 255, 255, 0.35)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', color: '#FFFFFF' }, hover: { background: 'rgba(255, 244, 236, 0.24)' } },
  dark:  { base: { background: 'var(--ink-950)', color: 'var(--cream-100)' }, hover: { background: 'var(--terra-700)' } },
};

const BUTTON_SIZES = {
  sm: { fontSize: '14.5px', padding: '10px 20px' },
  md: { fontSize: '17px', padding: '15px 28px' },
  lg: { fontSize: '18px', padding: '16px 32px' },
};

/** Pill-Button der Marke — Beschriftung lowercase, Pfeil-Glyph als Suffix. */
export function Button({ variant = 'cta', size = 'md', arrow, href, target, onClick, disabled, style, children }) {
  const [hover, setHover] = React.useState(false);
  const v = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.cta;
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  const css = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '11px',
    fontFamily: 'var(--font-sans)', fontWeight: 700, lineHeight: 1.2, textDecoration: 'none',
    border: '1px solid transparent', borderRadius: 'var(--radius-pill)', cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.55 : 1, whiteSpace: 'nowrap', boxSizing: 'border-box',
    transition: 'background 0.3s ease, color 0.3s ease, transform 0.3s var(--ease-spring), box-shadow 0.3s ease',
    ...s, ...v.base, ...(hover && !disabled ? v.hover : null), ...style,
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener' : undefined}
      onClick={onClick}
      disabled={href ? undefined : disabled}
      style={css}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      {arrow ? <span aria-hidden="true">{arrow === true ? '→' : arrow}</span> : null}
    </Tag>
  );
}
