import React from 'react';
import { Button } from '../core/Button.jsx';

function NavLink({ href, active, onClick, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        color: active || hover ? 'var(--terra-500)' : 'var(--text-strong)',
        textDecoration: 'none', transition: 'color 0.3s ease',
      }}
    >
      {children}
    </a>
  );
}

/** Website-Header: vaiacon-Lockup, Nav, oranger Pill-CTA. */
export function SiteHeader({
  logoSrc = 'assets/logo-lockup-terra.png',
  logoHeight = 56,
  links = [],
  active,
  ctaLabel = 'erstgespräch',
  ctaHref = '#kontakt',
  onNavigate,
  style,
}) {
  return (
    <header style={{ background: 'var(--cream-100)', borderBottom: '1px solid var(--border-soft)', ...style }}>
      <div style={{
        maxWidth: 'var(--header-max)', margin: '0 auto', padding: '30px 40px', boxSizing: 'border-box',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px',
      }}>
        <a href="#top" aria-label="vaiacon Startseite" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logoSrc} alt="vaiacon" style={{ height: `${logoHeight}px`, width: 'auto', display: 'block' }} />
        </a>
        <nav aria-label="Hauptnavigation" style={{
          display: 'flex', alignItems: 'center', gap: '40px',
          fontFamily: 'var(--font-sans)', fontSize: '18.5px', fontWeight: 600,
        }}>
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} active={active === l.href.replace('#', '')} onClick={onNavigate ? (e) => onNavigate(e, l.href) : undefined}>
              {l.label}
            </NavLink>
          ))}
          <Button size="lg" arrow href={ctaHref} style={{ padding: '15px 32px' }}>{ctaLabel}</Button>
        </nav>
      </div>
    </header>
  );
}
