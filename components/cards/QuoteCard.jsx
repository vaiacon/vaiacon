import React from 'react';

/** Dunkle Zitat-Karte: weisses vaiacon-Symbol, «Zitat», Attribution in Orange. */
export function QuoteCard({ logoSrc, quote, attribution, style }) {
  return (
    <article style={{
      background: 'var(--ink-950)', borderRadius: '24px', padding: '40px 36px', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', ...style,
    }}>
      {logoSrc ? <img src={logoSrc} alt="" style={{ height: '32px', width: 'auto', display: 'block', alignSelf: 'flex-start', opacity: 0.95 }} /> : null}
      <blockquote style={{ margin: 0, fontSize: '21px', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.5, color: '#FFFFFF' }}>
        «{quote}»
      </blockquote>
      {attribution ? (
        <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'rgba(233, 140, 88, 0.9)' }}>{attribution}</p>
      ) : null}
    </article>
  );
}
