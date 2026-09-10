const { Button: EaButton, Kicker: EaKicker, CheckPill: EaCheckPill, SiteFooter: EaSiteFooter } = window.vaiaconDesignSystem_5f353f;
const { WORKER_URL, FORMSPREE_URL, PROD_HOSTS, SECTIONS, ALL_FIELDS, fmtCHF, fmtHours, fallbackAssessment, progressOf, blockComplete } = window.ErstanalyseData;

const DRAFT_KEY = 'vaiacon-erstanalyse-draft';
const REQUIRED = ALL_FIELDS.filter((f) => f.required).map((f) => f.name);

/* ---- Submit-Helfer ---- */
function toAntworten(answers) {
  const out = {};
  ALL_FIELDS.forEach((f) => {
    if (f.name === 'E-Mail' || f.name === 'Telefon') return; // Kontaktdaten nur in die Mail, nicht zur KI
    const v = answers[f.name];
    const s = Array.isArray(v) ? v.join(', ') : (v || '').trim();
    if (s) out[f.name] = s;
  });
  return out;
}

async function fetchAssessment(answers) {
  if (!WORKER_URL) return fallbackAssessment(answers);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 35000);
  try {
    const r = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ antworten: toAntworten(answers) }),
      signal: ctrl.signal,
    });
    if (!r.ok) throw new Error('http ' + r.status);
    const j = await r.json();
    const nums = ['stunden_pro_woche_min', 'stunden_pro_woche_max', 'chf_pro_jahr_min', 'chf_pro_jahr_max'];
    if (!nums.every((k) => Number.isFinite(j[k])) || typeof j.einschaetzung !== 'string') throw new Error('bad payload');
    return {
      stunden_pro_woche_min: j.stunden_pro_woche_min,
      stunden_pro_woche_max: j.stunden_pro_woche_max,
      chf_pro_jahr_min: j.chf_pro_jahr_min,
      chf_pro_jahr_max: j.chf_pro_jahr_max,
      einschaetzung: j.einschaetzung,
      top_hebel: Array.isArray(j.top_hebel) ? j.top_hebel.slice(0, 3) : [],
      vorbehalt: typeof j.vorbehalt === 'string' && j.vorbehalt ? j.vorbehalt : null,
    };
  } finally {
    clearTimeout(timer);
  }
}

function assessmentSummary(a) {
  return 'ca. ' + fmtHours(a.stunden_pro_woche_min) + '–' + fmtHours(a.stunden_pro_woche_max) + ' Std./Woche ≈ CHF '
    + fmtCHF(a.chf_pro_jahr_min) + '–' + fmtCHF(a.chf_pro_jahr_max) + ' pro Jahr | ' + a.einschaetzung
    + ' | Hebel: ' + (a.top_hebel.length ? a.top_hebel.join(', ') : '–')
    + ' | Vorbehalt: ' + (a.vorbehalt || '–');
}

async function sendFormspree(answers, assessment, gotcha) {
  if (!FORMSPREE_URL || !PROD_HOSTS.includes(location.hostname)) {
    console.info('Erstanalyse: Preview-Umgebung erkannt — Mail-Versand übersprungen.');
    return;
  }
  const fd = new FormData();
  ALL_FIELDS.forEach((f) => {
    const v = answers[f.name];
    fd.append(f.name, Array.isArray(v) ? v.join(', ') : (v || '').trim());
  });
  fd.append('_gotcha', gotcha || '');
  fd.append('_subject', 'vaiacon Erstanalyse: ' + (answers['Firma und Name'] || '').trim());
  const replyMail = (answers['E-Mail'] || '').trim();
  if (replyMail) fd.append('_replyto', replyMail);
  fd.append('Ersteinschätzung Sparpotenzial (auto)', assessmentSummary(assessment));
  await fetch(FORMSPREE_URL, { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
}

function vornameOf(firmaUndName) {
  const i = (firmaUndName || '').indexOf(',');
  if (i < 0) return '';
  return (firmaUndName.slice(i + 1).trim().split(/\s+/)[0] || '');
}

/* ---- UI-Bausteine ---- */
function EaChip({ selected, onClick, children }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={'ea-chip' + (selected ? ' is-selected' : '')}>
      {selected ? <span aria-hidden="true" className="ea-chip-check">✓</span> : null}
      {children}
    </button>
  );
}

function EaField({ field, value, error, onChange }) {
  const { name, type, options, hint, placeholder, required } = field;
  return (
    <div className={'ea-field' + (error ? ' has-error' : '')} data-field={name}>
      <label className="ea-label" htmlFor={type === 'radio' || type === 'check' ? undefined : 'ea-' + name}>
        {name}
        {required ? <span className="ea-required"> · Pflicht</span> : null}
      </label>
      {hint ? <p className="ea-hint">{hint}</p> : null}
      {type === 'text' ? (
        <input id={'ea-' + name} className="ea-input" type={field.inputType || 'text'} inputMode={field.inputType === 'tel' ? 'tel' : field.inputType === 'email' ? 'email' : undefined} value={value || ''} placeholder={placeholder || ''} onChange={(e) => onChange(e.target.value)} />
      ) : null}
      {type === 'textarea' ? (
        <textarea id={'ea-' + name} className="ea-input ea-textarea" rows={3} value={value || ''} placeholder={placeholder || ''} onChange={(e) => onChange(e.target.value)}></textarea>
      ) : null}
      {type === 'radio' ? (
        <div className="ea-chips" role="radiogroup" aria-label={name}>
          {options.map((o) => (
            <EaChip key={o} selected={value === o} onClick={() => onChange(value === o ? '' : o)}>{o}</EaChip>
          ))}
        </div>
      ) : null}
      {type === 'check' ? (
        <div className="ea-chips" role="group" aria-label={name}>
          {options.map((o) => {
            const list = value || [];
            const sel = list.includes(o);
            return (
              <EaChip key={o} selected={sel} onClick={() => onChange(sel ? list.filter((x) => x !== o) : list.concat([o]))}>{o}</EaChip>
            );
          })}
        </div>
      ) : null}
      {error ? <p className="ea-msg">Bitte füllen Sie dieses Feld aus.</p> : null}
    </div>
  );
}

function EaProgress({ answers }) {
  const p = progressOf(answers);
  return (
    <div className="ea-progress">
      <div className="ea-progress-inner">
        <span className="ea-progress-label">{p.blocksDone} von {p.blocks} Blöcken</span>
        <div className="ea-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={p.percent} aria-label="Fortschritt Erstanalyse">
          <div className="ea-progress-fill" style={{ width: p.percent + '%' }} />
        </div>
        <span className="ea-progress-label">{p.percent} %</span>
      </div>
    </div>
  );
}

/* ---- Erfolgs-Screen ---- */
function EaSuccess({ answers, result }) {
  const vorname = vornameOf(answers['Firma und Name']);
  return (
    <div className="ea-success" data-screen-label="Erstanalyse — Erfolg">
      <EaKicker>Kostenlos &amp; unverbindlich</EaKicker>
      <h1 className="ea-h1">{vorname ? 'Herzlichen Dank, ' + vorname + '!' : 'Herzlichen Dank!'}</h1>
      <p className="ea-lead">Ihre Angaben sind bei uns angekommen. Wir schauen sie persönlich an und melden uns bei Ihnen — ohne Fachchinesisch und ohne Verkaufsdruck.</p>
      <div className="ea-result">
        <EaKicker>Ihre Ersteinschätzung</EaKicker>
        <p className="ea-result-big">ca. {fmtHours(result.stunden_pro_woche_min)}–{fmtHours(result.stunden_pro_woche_max)} Std. pro Woche</p>
        <p className="ea-result-chf">≈ CHF {fmtCHF(result.chf_pro_jahr_min)}–{fmtCHF(result.chf_pro_jahr_max)} pro Jahr</p>
        <p className="ea-result-text">{result.einschaetzung}</p>
        {result.top_hebel.length ? (
          <div className="ea-result-hebel">
            <p className="ea-result-hebel-label">Ihre grössten Hebel:</p>
            <ul className="ea-result-hebel-list">
              {result.top_hebel.map((h) => <EaCheckPill key={h}>{h}</EaCheckPill>)}
            </ul>
          </div>
        ) : null}
        {result.vorbehalt ? <p className="ea-result-vorbehalt">{result.vorbehalt}</p> : null}
        <p className="ea-result-vorbehalt">Bewusst konservativ gerechnet — wir versprechen lieber zu wenig als zu viel. Welche Lösungswege dahinter stecken und was sie kosten, zeigen wir Ihnen im kostenlosen Erstgespräch.</p>
      </div>
      <div className="ea-success-ctas">
        <EaButton variant="cta" arrow="↗" href="https://calendly.com/vaiacon" target="_blank">termin direkt buchen</EaButton>
        <a className="ea-back" href="index.html">zurück zur startseite →</a>
      </div>
    </div>
  );
}

/* ---- Seite ---- */
function ErstanalyseApp() {
  const [answers, setAnswers] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') || {}; } catch { return {}; }
  });
  const [errors, setErrors] = React.useState([]);
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [gotcha, setGotcha] = React.useState('');

  React.useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(answers)); } catch {}
  }, [answers]);

  const setValue = (name, v) => {
    setAnswers((a) => ({ ...a, [name]: v }));
    setErrors((e) => e.filter((x) => x !== name));
  };

  const submit = async () => {
    if (busy) return;
    const missing = REQUIRED.filter((n) => !(answers[n] || '').trim());
    const mail = (answers['E-Mail'] || '').trim();
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) && !missing.includes('E-Mail')) missing.push('E-Mail');
    if (missing.length) {
      setErrors(missing);
      const el = document.querySelector('[data-field="' + missing[0] + '"]');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 110, behavior: 'smooth' });
      return;
    }
    setBusy(true);
    let assessment;
    try { assessment = await fetchAssessment(answers); } catch { assessment = fallbackAssessment(answers); }
    try { await sendFormspree(answers, assessment, gotcha); } catch {}
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setResult(assessment);
    setBusy(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div data-screen-label="Erstanalyse">
      <header className="ea-header">
        <div className="ea-header-inner">
          <a href="index.html" aria-label="vaiacon Startseite" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src="../../assets/logo-lockup-terra-symbol-cream.png" alt="vaiacon" style={{ height: 44, width: 'auto', display: 'block' }} />
          </a>
          <a className="ea-back" href="index.html">zurück zur startseite →</a>
        </div>
      </header>

      {result ? null : <EaProgress answers={answers} />}

      <main className="ea-wrap">
        {result ? (
          <EaSuccess answers={answers} result={result} />
        ) : (
          <React.Fragment>
            <div className="ea-intro">
              <EaKicker>Kostenlos &amp; unverbindlich</EaKicker>
              <h1 className="ea-h1">Kostenlose Erstanalyse.</h1>
              <p className="ea-lead">Acht kurze Blöcke, rund fünf Minuten — fast alles zum Ankreuzen. Direkt nach dem Absenden sehen Sie, wie viel Zeit und Geld in Ihrer Administration steckt.</p>
            </div>

            <div className="ea-note">
              <p className="ea-note-title">Was Sie sofort erhalten</p>
              <p className="ea-note-text">Stunden pro Woche, Franken pro Jahr und Ihre grössten Hebel — konservativ gerechnet. Die konkreten Lösungswege besprechen wir im kostenlosen Erstgespräch, gemeinsam und ohne Verkaufsdruck.</p>
            </div>

            {SECTIONS.map((s) => (
              <section key={s.number} className="ea-card">
                <div className="ea-card-head">
                  <EaKicker number={s.number}>{s.kicker}</EaKicker>
                  {blockComplete(s, answers) ? <span className="ea-card-done">✓ vollständig</span> : null}
                </div>
                {s.fields.map((f) => (
                  <EaField key={f.name} field={f} value={answers[f.name]} error={errors.includes(f.name)} onChange={(v) => setValue(f.name, v)} />
                ))}
              </section>
            ))}

            <input type="text" name="_gotcha" value={gotcha} onChange={(e) => setGotcha(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="ea-gotcha" />

            <div className="ea-submit">
              <EaButton variant="cta" size="lg" arrow={busy ? undefined : '→'} disabled={busy} onClick={submit}>
                {busy ? 'Ihre Antworten werden ausgewertet …' : 'auswertung anfordern'}
              </EaButton>
              {busy ? <p className="ea-busy-note">Einen Moment bitte — das kann bis zu einer halben Minute dauern.</p> : <p className="ea-trust">Klar · Persönlich · Ohne Verkaufsdruck</p>}
            </div>
          </React.Fragment>
        )}
      </main>

      <EaSiteFooter logoSrc="../../assets/logo-lockup-white.png" legalHref="../../datenschutz.html" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ErstanalyseApp />);
