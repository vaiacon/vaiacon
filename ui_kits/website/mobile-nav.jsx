const { Button: MobileNavButton } = window.vaiaconDesignSystem_5f353f;

/* Mobile-Header (≤920px): Logo + CTA + Burger; Overlay-Menü in Markenstimme. */
function MobileHeader({ logoSrc, links = [], active, ctaLabel = 'Erstgespräch', ctaHref = '#kontakt' }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const iconBtn = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--ink-900)' };

  return (
    <header className="header-mobile" style={{ background: 'var(--cream-100)', borderBottom: '1px solid var(--border-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 16px' }}>
        <a href="#top" aria-label="vaiacon Startseite" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logoSrc} alt="vaiacon" style={{ height: 40, width: 'auto', display: 'block' }} />
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {ctaLabel ? <MobileNavButton size="sm" arrow href={ctaHref} style={{ padding: '11px 18px', fontSize: 14 }}>{ctaLabel}</MobileNavButton> : null}
          <button aria-label="Menü öffnen" aria-expanded={open} onClick={() => setOpen(true)} style={iconBtn}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ width: 22, height: 2, borderRadius: 2, background: 'var(--ink-900)', display: 'block' }}></span>
              <span style={{ width: 22, height: 2, borderRadius: 2, background: 'var(--ink-900)', display: 'block' }}></span>
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Navigation" style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'var(--cream-100)', display: 'flex', flexDirection: 'column', animation: 'mobileMenuIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 16px', borderBottom: '1px solid var(--border-soft)', flex: 'none' }}>
            <a href="#top" aria-label="vaiacon Startseite" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={logoSrc} alt="vaiacon" style={{ height: 40, width: 'auto', display: 'block' }} />
            </a>
            <button aria-label="Menü schliessen" onClick={() => setOpen(false)} style={{ ...iconBtn, fontFamily: 'var(--font-sans)', fontSize: 30, lineHeight: 1 }}>×</button>
          </div>

          <nav aria-label="Hauptnavigation" style={{ display: 'flex', flexDirection: 'column', padding: '10px 22px 0', overflowY: 'auto' }}>
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 14, padding: '19px 2px',
                  borderBottom: '1px solid var(--border-strong)', textDecoration: 'none',
                  fontFamily: 'var(--font-sans)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em',
                  color: active === l.href.replace('#', '') ? 'var(--terra-500)' : 'var(--text-strong)',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--terra-500)', letterSpacing: '0.08em', flex: 'none' }}>{l.number || String(i + 1).padStart(2, '0')}</span>
                {l.label}
                <span aria-hidden="true" style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--brown-300)' }}>→</span>
              </a>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', padding: '22px 22px calc(26px + env(safe-area-inset-bottom))', display: 'flex', flexDirection: 'column', gap: 16, flex: 'none' }}>
            {ctaLabel ? <MobileNavButton size="lg" arrow href={ctaHref} onClick={() => setOpen(false)} style={{ width: '100%', padding: '17px 32px' }}>{ctaLabel}</MobileNavButton> : null}
            <p style={{ margin: 0, textAlign: 'center', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: 'var(--text-muted)' }}>VERTRAUEN · ORIENTIERUNG · ENTWICKLUNG</p>
          </div>
        </div>
      )}
    </header>
  );
}

Object.assign(window, { MobileHeader });
