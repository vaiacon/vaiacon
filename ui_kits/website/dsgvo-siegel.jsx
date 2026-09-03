/* DSG-Siegel: zertifikatartiger Sticker im vaiacon-Look.
   Kreis mit Comic-Rand, umlaufender Schrift und ✓/DSG/KONFORM im Zentrum.
   Verlinkt aufs Datenschutzversprechen (#datenschutz). */
function DsgvoSiegel({ size = 132, rotate = -8, href = '#datenschutz', className, style }) {
  const pid = React.useMemo(() => 'siegel-ring-' + Math.random().toString(36).slice(2, 8), []);
  return (
    <a
      href={href}
      aria-label="DSG-konform — zu unserem Datenschutzversprechen"
      className={'dsgvo-siegel' + (className ? ' ' + className : '')}
      style={{ display: 'inline-flex', width: size, height: size, textDecoration: 'none', flex: 'none', alignSelf: 'flex-start', ...style }}
    >
      <svg viewBox="-6 -6 144 144" width="100%" height="100%" role="img" aria-hidden="true" style={{ display: 'block', transform: 'rotate(' + rotate + 'deg)', filter: 'drop-shadow(4px 4px 0 rgba(28,22,19,0.26))' }}>
        <defs>
          <path id={pid} d="M 66 66 m -53.5 0 a 53.5 53.5 0 1 1 107 0 a 53.5 53.5 0 1 1 -107 0"></path>
        </defs>
        <circle cx="66" cy="66" r="63" fill="var(--surface-card)" stroke="var(--border-ink)" strokeWidth="1.5"></circle>
        <circle cx="66" cy="66" r="48" fill="none" stroke="var(--terra-500)" strokeWidth="1" strokeDasharray="3 4" opacity="0.75"></circle>
        <text fill="var(--terra-600)" style={{ fontFamily: 'var(--font-sans)', fontSize: '8.5px', fontWeight: 700, letterSpacing: '1.8px' }}>
          <textPath href={'#' + pid} startOffset="25%" textAnchor="middle">✦ SCHWEIZER DATENSCHUTZ ✦</textPath>
        </text>
        <text x="66" y="54" textAnchor="middle" fill="var(--terra-500)" style={{ fontFamily: 'var(--font-sans)', fontSize: '20px', fontWeight: 700 }}>✓</text>
        <text x="66" y="77" textAnchor="middle" fill="var(--ink-900)" style={{ fontFamily: 'var(--font-sans)', fontSize: '19px', fontWeight: 700, letterSpacing: '0.5px' }}>DSG</text>
        <text x="65" y="92" textAnchor="middle" fill="var(--terra-600)" style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px' }}>KONFORM</text>
        <text x="66" y="113" textAnchor="middle" fill="var(--terra-500)" style={{ fontFamily: 'var(--font-sans)', fontSize: '10px' }}>✦</text>
      </svg>
    </a>
  );
}

Object.assign(window, { DsgvoSiegel });
