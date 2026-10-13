/* Erstanalyse — Formular und Ergebnis.
   Quelle für die kompilierte Fassung erstanalyse-form.compiled.js:
     cd .bau && node bau.mjs ../ui_kits/website/erstanalyse-form.jsx ../ui_kits/website/erstanalyse-form.compiled.js
   Die Seite liegt unter /erstanalyse/ (erstanalyse/index.html); Links deshalb mit «../». */
const { Button: EaButton, Kicker: EaKicker, CheckPill: EaCheckPill, SiteFooter: EaSiteFooter } = window.vaiaconDesignSystem_5f353f;
const {
  WORKER_URL, ANFRAGE_URL, PROD_HOSTS, SECTIONS, ALL_FIELDS, REQUIRED_FIELDS, ANNAHMEN, BAND_MITTE,
  fieldId, isVisible, hasValue, fieldError, progressOf, sectionProgress, cleanDraft, sichtbareAntworten,
  fmtCHF, fmtHours, rechne, wertAusStunden, fallbackAssessment, anfrageZusatz,
} = window.ErstanalyseData;

const ROOT = '../';
const DRAFT_KEY = 'vaiacon-erstanalyse-draft';
const STUNDEN_FELD = 'Bürostunden pro Woche';

/* ---- Submit-Helfer ---- */
function toAntworten(answers) {
  const out = {};
  const sichtbar = sichtbareAntworten(answers);
  Object.keys(sichtbar).forEach((k) => {
    if (k === 'Firma und Name' || k === 'E-Mail' || k === 'Telefon') return; // Name und Kontaktdaten nur in die Anfrage, nicht zur KI
    const v = sichtbar[k];
    out[k] = Array.isArray(v) ? v.join(', ') : v;
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
    const band = answers[STUNDEN_FELD];
    return {
      quelle: 'ki',
      stunden_angegeben: Boolean(BAND_MITTE[band]),
      basis_stunden_pro_woche: BAND_MITTE[band] || null,
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
  const herkunft = a.quelle === 'ki' ? 'KI-Einschätzung' : 'Standardtext, KI-Dienst nicht erreichbar';
  const zahl = !a.stunden_angegeben
    ? 'Bürostunden nicht angegeben, keine Zahl gezeigt'
    : 'ca. ' + fmtHours(a.stunden_pro_woche_min) + '–' + fmtHours(a.stunden_pro_woche_max) + ' Std./Woche ≈ CHF '
      + fmtCHF(a.chf_pro_jahr_min) + '–' + fmtCHF(a.chf_pro_jahr_max) + ' pro Jahr (Annahme CHF ' + ANNAHMEN.stundenwert + ' pro Stunde, ' + ANNAHMEN.wochen + ' Wochen)';
  return '[' + herkunft + '] ' + zahl + ' | ' + a.einschaetzung
    + ' | Hebel: ' + (a.top_hebel.length ? a.top_hebel.join(', ') : '–')
    + ' | Vorbehalt: ' + (a.vorbehalt || '–');
}

async function sendAnfrage(answers, assessment, gotcha) {
  if (!ANFRAGE_URL || !PROD_HOSTS.includes(location.hostname)) {
    console.info('Erstanalyse: Preview-Umgebung erkannt — Mail-Versand übersprungen.');
    return;
  }
  // Geht an /api/kontakt auf unserem Server (intern.vaiacon.ch nimmt die
  // Anfrage an, legt sie unter «Anfragen» ab und schickt eine Mail an
  // hallo@vaiacon.ch, Reply-To = Adresse des Betriebs). Dieselbe Schnittstelle
  // wie das Kontaktformular (name, mail, firma, telefon, nachricht, fangfrage),
  // dazu quelle:"erstanalyse" und die Antworten samt Einschätzung als
  // «analyse». Ausgeblendete Folgefragen werden nicht mitgeschickt.
  const sichtbar = sichtbareAntworten(answers);
  const zeilen = Object.keys(sichtbar).map((k) => k + ': ' + (Array.isArray(sichtbar[k]) ? sichtbar[k].join(', ') : sichtbar[k]));
  if (!sichtbar[STUNDEN_FELD]) zeilen.push(STUNDEN_FELD + ': nicht angegeben');
  zeilen.push('Ersteinschätzung Sparpotenzial (auto): ' + assessmentSummary(assessment));
  const firmaUndName = (answers['Firma und Name'] || '').trim();
  const r = await fetch(ANFRAGE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: firmaUndName,
      mail: (answers['E-Mail'] || '').trim(),
      firma: 'Erstanalyse: ' + firmaUndName,
      telefon: (answers['Telefon'] || '').trim(),
      nachricht: zeilen.join('\n').slice(0, 5000),
      fangfrage: gotcha || '',
      ...anfrageZusatz(answers, assessment),
    }),
  });
  if (!r.ok) throw new Error('kontakt http ' + r.status);
}

function vornameOf(firmaUndName) {
  const i = (firmaUndName || '').indexOf(',');
  if (i < 0) return '';
  return (firmaUndName.slice(i + 1).trim().split(/\s+/)[0] || '');
}

/* Fokus auf ein Feld (erstes Eingabeelement) und in die Mitte scrollen,
   damit die klebende Fortschrittsleiste es nicht verdeckt. */
function focusField(name) {
  const id = fieldId(name);
  const el = document.getElementById(id) || document.querySelector('[data-field="' + id + '"] input');
  if (!el) return;
  try { el.focus({ preventScroll: true }); } catch { el.focus(); }
  el.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

/* ---- UI-Bausteine ---- */
/* Auswahl-Chip: natives Radio bzw. Checkbox, optisch als Chip.
   Pfeiltasten (Radio) und Leertaste funktionieren wie gewohnt. */
function EaChoice({ type, name, value, checked, onChange }) {
  return (
    <label className={'ea-chip' + (checked ? ' is-selected' : '')}>
      <input className="ea-chip-input" type={type} name={name} value={value} checked={checked} onChange={onChange} />
      <span aria-hidden="true" className="ea-chip-check">{checked ? '✓' : ''}</span>
      <span>{value}</span>
    </label>
  );
}

function EaField({ field, value, error, onChange }) {
  const { name, type, options, hint, placeholder, required } = field;
  const id = fieldId(name);
  const hintId = hint ? id + '-hinweis' : null;
  const errId = error ? id + '-fehler' : null;
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined;
  const pflicht = required ? <span className="ea-required"> · Pflicht</span> : null;
  const hinweis = hint ? <p className="ea-hint" id={hintId}>{hint}</p> : null;
  const fehler = error ? <p className="ea-msg" id={errId}>{error}</p> : null;

  if (type === 'radio' || type === 'check') {
    const list = value || [];
    return (
      <fieldset className={'ea-field ea-fieldset' + (error ? ' has-error' : '')} data-field={id} aria-describedby={describedBy}>
        <legend className="ea-label">{name}{pflicht}</legend>
        {hinweis}
        <div className="ea-chips">
          {options.map((o) => type === 'radio' ? (
            <EaChoice key={o} type="radio" name={id} value={o} checked={value === o} onChange={() => onChange(o)} />
          ) : (
            <EaChoice key={o} type="checkbox" name={id} value={o} checked={list.includes(o)}
              onChange={() => onChange(list.includes(o) ? list.filter((x) => x !== o) : list.concat([o]))} />
          ))}
        </div>
        {type === 'radio' && value ? (
          <button type="button" className="ea-reset" onClick={() => onChange('')}>Auswahl entfernen</button>
        ) : null}
        {fehler}
      </fieldset>
    );
  }

  const common = {
    id,
    className: 'ea-input' + (type === 'textarea' ? ' ea-textarea' : ''),
    value: value || '',
    placeholder: placeholder || '',
    required: required || undefined,
    'aria-required': required ? 'true' : undefined,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    onChange: (e) => onChange(e.target.value),
  };
  return (
    <div className={'ea-field' + (error ? ' has-error' : '')} data-field={id}>
      <label className="ea-label" htmlFor={id}>{name}{pflicht}</label>
      {hinweis}
      {type === 'textarea' ? (
        <textarea rows={3} {...common}></textarea>
      ) : (
        <input type={field.inputType || 'text'} autoComplete={field.autoComplete}
          inputMode={field.inputType === 'tel' ? 'tel' : field.inputType === 'email' ? 'email' : undefined} {...common} />
      )}
      {fehler}
    </div>
  );
}

function EaProgress({ answers }) {
  const p = progressOf(answers);
  const pflichtOk = p.requiredDone === p.requiredTotal;
  return (
    <div className="ea-progress">
      <div className="ea-progress-inner">
        <span className="ea-progress-label">
          {pflichtOk ? 'Pflichtangaben vollständig' : 'Pflichtangaben ' + p.requiredDone + ' von ' + p.requiredTotal}
        </span>
        <div className="ea-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={p.percent}
          aria-valuetext={p.answered + ' von ' + p.total + ' Fragen beantwortet'} aria-label="Anteil beantworteter Fragen">
          <div className="ea-progress-fill" style={{ width: p.percent + '%' }} />
        </div>
        <span className="ea-progress-label">{p.percent} % der Fragen beantwortet</span>
      </div>
    </div>
  );
}

/* ---- Ergebnis: Zahl nur mit Grundlage, Annahmen offen und anpassbar ---- */
function EaRechnung({ result, band }) {
  const startStunden = result.basis_stunden_pro_woche ? String(result.basis_stunden_pro_woche) : '';
  const [stunden, setStunden] = React.useState(startStunden);
  const [satz, setSatz] = React.useState(String(ANNAHMEN.stundenwert));
  const stundenGeaendert = stunden !== startStunden;
  const satzZahl = Number(String(satz).replace(',', '.'));
  const stundenZahl = Number(String(stunden).replace(',', '.'));

  /* KI-Zahlen nur, wenn die Bürostunden angegeben waren und hier nicht geändert wurden. */
  const kiZahlen = result.quelle === 'ki' && result.stunden_angegeben && !stundenGeaendert
    && Number.isFinite(result.stunden_pro_woche_min) && Number.isFinite(result.stunden_pro_woche_max);
  let zahl = null;
  if (kiZahlen) {
    const wert = satzZahl === ANNAHMEN.stundenwert
      ? { chf_pro_jahr_min: result.chf_pro_jahr_min, chf_pro_jahr_max: result.chf_pro_jahr_max }
      : wertAusStunden(result.stunden_pro_woche_min, result.stunden_pro_woche_max, satzZahl);
    zahl = wert ? { stunden_pro_woche_min: result.stunden_pro_woche_min, stunden_pro_woche_max: result.stunden_pro_woche_max, ...wert } : null;
  } else {
    zahl = rechne(stundenZahl, satzZahl);
  }
  const pMin = Math.round(ANNAHMEN.anteil_min * 100);
  const pMax = Math.round(ANNAHMEN.anteil_max * 100);
  const stundenText = (z) => z.stunden_pro_woche_min === z.stunden_pro_woche_max
    ? 'ca. ' + fmtHours(z.stunden_pro_woche_min) + ' Std. pro Woche'
    : 'ca. ' + fmtHours(z.stunden_pro_woche_min) + '–' + fmtHours(z.stunden_pro_woche_max) + ' Std. pro Woche';

  return (
    <React.Fragment>
      {zahl ? (
        <React.Fragment>
          <p className="ea-result-big">{stundenText(zahl)}</p>
          <p className="ea-result-chf">Rechnerischer Wert dieser Zeit: CHF {fmtCHF(zahl.chf_pro_jahr_min)}–{fmtCHF(zahl.chf_pro_jahr_max)} pro Jahr</p>
          <p className="ea-result-vorbehalt">Das ist der Wert der Arbeitszeit, die frei werden kann, keine Kostensenkung. Ob Kosten wegfallen, hängt davon ab, was Sie mit der Zeit machen.</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="ea-result-big">Bürostunden pro Woche: nicht angegeben</p>
          <p className="ea-result-text">Ohne diese Angabe nennen wir keine Zahl. Tragen Sie unten ein, wie viele Stunden pro Woche bei Ihnen ungefähr in Büroarbeit fliessen, dann sehen Sie die Rechnung.</p>
        </React.Fragment>
      )}

      <div className="ea-annahmen" role="group" aria-labelledby="ea-annahmen-titel">
        <p className="ea-annahmen-titel" id="ea-annahmen-titel">Annahmen der Rechnung</p>
        <ul className="ea-annahmen-liste">
          {kiZahlen ? (
            <li>Stunden: geschätzt von einem Sprachmodell aus Ihren Angaben, etwa Offerten pro Monat, Dauer pro Offerte und Bürostunden pro Woche (Ihre Angabe: «{band}»).</li>
          ) : (
            <li>Stunden: Bürostunden pro Woche × {pMin}–{pMax} % Anteil, der sich nach unserer Erfahrung automatisieren lässt (gerundet auf halbe Stunden).{result.stunden_angegeben && !stundenGeaendert ? ' Gerechnet mit der Mitte Ihres Bands.' : ''}</li>
          )}
          <li>Wert: Stunden pro Woche × {ANNAHMEN.wochen} Arbeitswochen × Wert einer Arbeitsstunde (gerundet auf CHF 100).</li>
          <li>Der Wert einer Arbeitsstunde ist eine Annahme für Ihren Betrieb, kein Preis von Vaiacon.</li>
        </ul>
        <p className="ea-annahmen-hinweis">Sie können die Zahlen anpassen:</p>
        <div className="ea-annahmen-felder">
          <label className="ea-annahmen-feld">
            <span>Bürostunden pro Woche</span>
            <input className="ea-input" type="number" inputMode="decimal" min="0" max="80" step="0.5" value={stunden}
              placeholder="z. B. 8" onChange={(e) => setStunden(e.target.value)} />
          </label>
          <label className="ea-annahmen-feld">
            <span>Wert einer Arbeitsstunde in CHF</span>
            <input className="ea-input" type="number" inputMode="decimal" min="1" step="5" value={satz}
              onChange={(e) => setSatz(e.target.value)} />
          </label>
        </div>
        {kiZahlen ? <p className="ea-annahmen-hinweis">Wenn Sie die Bürostunden ändern, rechnen wir mit der Formel oben statt mit der KI-Schätzung.</p> : null}
      </div>
    </React.Fragment>
  );
}

function EaSuccess({ answers, result, zugestellt }) {
  const vorname = vornameOf(answers['Firma und Name']);
  /* Kleinstbetriebe: zuerst auf die KI-Schulungen hinweisen, das Gespräch bleibt offen. */
  const kleinst = ['Nur ich', '2–5'].includes(answers['Mitarbeitende']);
  const ersatz = result.quelle !== 'ki';
  return (
    <div className="ea-success" data-screen-label="Erstanalyse — Erfolg">
      <EaKicker>Kostenlos &amp; unverbindlich</EaKicker>
      <h1 className="ea-h1" tabIndex={-1} id="ea-ergebnis">{vorname ? 'Herzlichen Dank, ' + vorname + '!' : 'Herzlichen Dank!'}</h1>
      {zugestellt ? (
        <p className="ea-lead">Ihre Angaben sind bei uns angekommen. Wir schauen sie persönlich an und melden uns bei Ihnen, ohne Fachchinesisch und ohne Verkaufsdruck.</p>
      ) : (
        <p className="ea-lead">Ihre Ersteinschätzung steht unten. Die Übermittlung an uns hat leider nicht geklappt. Schreiben Sie uns bitte kurz an <a href="mailto:hallo@vaiacon.ch">hallo@vaiacon.ch</a>, dann melden wir uns persönlich bei Ihnen.</p>
      )}
      <div className="ea-result">
        <EaKicker>{ersatz ? 'Orientierung (Standardtext)' : 'Ihre Ersteinschätzung'}</EaKicker>
        {ersatz ? (
          <p className="ea-ersatz" role="note">Die persönliche Auswertung ist gerade nicht verfügbar. Diese Orientierung basiert nur auf den Annahmen unten und ist nicht individuell erstellt.</p>
        ) : null}
        <EaRechnung result={result} band={answers[STUNDEN_FELD] || ''} />
        <p className="ea-result-text">{result.einschaetzung}</p>
        {result.top_hebel.length ? (
          <div className="ea-result-hebel">
            <p className="ea-result-hebel-label">{ersatz ? 'Von Ihnen angekreuzte wiederkehrende Aufgaben:' : 'Ihre grössten Hebel:'}</p>
            <ul className="ea-result-hebel-list">
              {result.top_hebel.map((h) => <EaCheckPill key={h}>{h}</EaCheckPill>)}
            </ul>
          </div>
        ) : null}
        {result.vorbehalt ? <p className="ea-result-vorbehalt">{result.vorbehalt}</p> : null}
        <p className="ea-result-vorbehalt">Eine Schätzung, keine Zusage. Welche Lösungswege dahinter stecken und was sie kosten, besprechen wir im kostenlosen Erstgespräch.</p>
      </div>
      {kleinst ? (
        <p className="ea-lead">Für einen Betrieb Ihrer Grösse ist eine KI-Schulung oft ein guter erster Schritt. Wie das bei Ihnen aussehen könnte, besprechen wir gern im <a href={ROOT + 'kontakt#formular'}>kostenlosen Erstgespräch</a>.</p>
      ) : null}
      <div className="ea-success-ctas">
        {kleinst ? (
          <EaButton variant="cta" arrow="→" href={ROOT + 'learning'}>KI-Schulungen ansehen</EaButton>
        ) : (
          <EaButton variant="cta" arrow="→" href={ROOT + 'kontakt#formular'}>Gespräch vereinbaren</EaButton>
        )}
        {kleinst ? <a className="ea-back" href={ROOT + 'kontakt#formular'}>Gespräch vereinbaren →</a> : null}
        <a className="ea-back" href={ROOT}>Zurück zur Startseite →</a>
      </div>
    </div>
  );
}

/* ---- Seite ---- */
function ErstanalyseApp() {
  const [answers, setAnswers] = React.useState(() => {
    try { return cleanDraft(JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}')); } catch { return {}; }
  });
  const [errors, setErrors] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [gotcha, setGotcha] = React.useState('');
  const [zugestellt, setZugestellt] = React.useState(true);
  const [stundenFrage, setStundenFrage] = React.useState(false);
  const [statusText, setStatusText] = React.useState('');
  const stundenFrageRef = React.useRef(null);

  React.useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(answers)); } catch {}
  }, [answers]);

  React.useEffect(() => {
    if (stundenFrage && stundenFrageRef.current) stundenFrageRef.current.focus();
  }, [stundenFrage]);

  React.useEffect(() => {
    if (!result) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const h = document.getElementById('ea-ergebnis');
    if (h) { try { h.focus({ preventScroll: true }); } catch { h.focus(); } }
  }, [result]);

  const setValue = (name, v) => {
    setAnswers((a) => {
      const next = { ...a, [name]: v };
      // Ausgeblendete Folgefragen nicht mit altem Wert stehen lassen.
      ALL_FIELDS.forEach((f) => { if (!isVisible(f, next) && f.name in next) delete next[f.name]; });
      return next;
    });
    setErrors((e) => {
      if (!e[name]) return e;
      const n = { ...e }; delete n[name]; return n;
    });
    if (name === STUNDEN_FELD && v) setStundenFrage(false);
  };

  const abschicken = async () => {
    setBusy(true);
    setStundenFrage(false);
    setStatusText('Ihre Antworten werden ausgewertet.');
    let assessment;
    try { assessment = await fetchAssessment(answers); } catch { assessment = fallbackAssessment(answers); }
    let angekommen = true;
    try { await sendAnfrage(answers, assessment, gotcha); } catch { angekommen = false; }
    setZugestellt(angekommen);
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setStatusText('');
    setResult(assessment);
    setBusy(false);
  };

  const submit = (e) => {
    if (e) e.preventDefault();
    if (busy) return;
    const neu = {};
    REQUIRED_FIELDS.forEach((f) => { const m = fieldError(f, answers); if (m) neu[f.name] = m; });
    ALL_FIELDS.forEach((f) => { if (!f.required) { const m = fieldError(f, answers); if (m) neu[f.name] = m; } });
    const fehlend = ALL_FIELDS.filter((f) => neu[f.name]).map((f) => f.name);
    if (fehlend.length) {
      setErrors(neu);
      setStatusText(fehlend.length === 1 ? 'Bitte ergänzen Sie ein markiertes Feld.' : 'Bitte ergänzen Sie ' + fehlend.length + ' markierte Felder.');
      setTimeout(() => focusField(fehlend[0]), 0);
      return;
    }
    setErrors({});
    setStatusText('');
    // Fehlen die Bürostunden, einmal nachfragen statt still eine Zahl anzunehmen.
    if (!hasValue(answers[STUNDEN_FELD]) && !stundenFrage) {
      setStundenFrage(true);
      return;
    }
    abschicken();
  };

  return (
    <div data-screen-label="Erstanalyse" id="top">
      {/* Dieselbe Kopfzeile wie auf den übrigen Seiten. is-solid steht fest:
          Die Seite beginnt hell, ohne Terracotta-Hero. Menüpunkte braucht es
          hier keine, nur den Weg zurück. */}
      <header className="mock-header is-solid">
        <div className="mock-header__inner">
          <a className="mock-header__logo" href={ROOT} aria-label="vaiacon Startseite">
            <img src={ROOT + 'assets/logo-lockup-terra.png'} alt="vaiacon" />
          </a>
          <a className="ea-back" href={ROOT}>Zurück zur Startseite →</a>
        </div>
      </header>

      {result ? null : <EaProgress answers={answers} />}

      <main className="ea-wrap" id="inhalt">
        {result ? (
          <EaSuccess answers={answers} result={result} zugestellt={zugestellt} />
        ) : (
          <form className="ea-form" noValidate onSubmit={submit} aria-labelledby="ea-titel">
            <div className="ea-intro">
              <EaKicker>Kostenlos &amp; unverbindlich</EaKicker>
              <h1 className="ea-h1" id="ea-titel">Kostenlose Erstanalyse.</h1>
              <p className="ea-lead">Acht kurze Blöcke, rund zehn Minuten, fast alles zum Ankreuzen. Pflicht sind nur vier Angaben: Firma und Name, Branche, Ihr grösster Zeitfresser und Ihre E-Mail-Adresse.</p>
            </div>

            <div className="ea-note">
              <p className="ea-note-title">Was Sie sofort erhalten</p>
              <p className="ea-note-text">Eine erste Schätzung, wie viele Stunden pro Woche frei werden können, den rechnerischen Wert dieser Zeit und Ihre grössten Hebel. Die Annahmen dahinter sehen Sie im Ergebnis und können sie anpassen. Die konkreten Lösungswege besprechen wir im kostenlosen Erstgespräch.</p>
            </div>

            {SECTIONS.map((s) => {
              const sp = sectionProgress(s, answers);
              return (
                <section key={s.number} className="ea-card" aria-labelledby={'ea-block-' + s.number}>
                  <div className="ea-card-head">
                    <h2 className="ea-card-title" id={'ea-block-' + s.number}>{s.number + ' · ' + s.kicker}</h2>
                    <span className="ea-card-done">{sp.answered} von {sp.total} beantwortet</span>
                  </div>
                  {s.fields.filter((f) => isVisible(f, answers)).map((f) => (
                    <EaField key={f.name} field={f} value={answers[f.name]} error={errors[f.name]} onChange={(v) => setValue(f.name, v)} />
                  ))}
                </section>
              );
            })}

            <input type="text" name="_gotcha" value={gotcha} onChange={(e) => setGotcha(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="ea-gotcha" />

            {stundenFrage ? (
              <div className="ea-nachfrage" tabIndex={-1} ref={stundenFrageRef} role="group" aria-labelledby="ea-nachfrage-titel">
                <p className="ea-note-title" id="ea-nachfrage-titel">Bürostunden pro Woche fehlen noch</p>
                <p className="ea-note-text">Ohne diese Angabe können wir keine Zahl nennen. Eine grobe Schätzung genügt.</p>
                <div className="ea-nachfrage-knoepfe">
                  <button type="button" className="ea-knopf" onClick={() => { setStundenFrage(false); setTimeout(() => focusField(STUNDEN_FELD), 0); }}>Angabe ergänzen</button>
                  <button type="button" className="ea-knopf ea-knopf--leise" onClick={abschicken}>Ohne Zahl absenden</button>
                </div>
              </div>
            ) : null}

            <div className="ea-submit">
              <EaButton variant="cta" size="lg" arrow={busy ? undefined : '→'} disabled={busy}>
                {busy ? 'Ihre Antworten werden ausgewertet …' : 'Auswertung anfordern'}
              </EaButton>
              <p className="ea-status" role="status" aria-live="polite">{statusText}</p>
              {busy ? <p className="ea-busy-note">Einen Moment bitte, das kann bis zu einer halben Minute dauern.</p> : <p className="ea-trust">Klar · Persönlich · Ohne Verkaufsdruck</p>}
              <p className="ea-hint">Ihre Antworten gehen an unseren Server in der Schweiz. Die Schätzung schreibt das Sprachmodell Claude von Anthropic (USA); Firma, Name, E-Mail und Telefon erhält es nicht. Bitte schreiben Sie keine vertraulichen Kundendaten in die Freitextfelder. Mehr dazu in der <a href={ROOT + 'datenschutz#erstanalyse'}>Datenschutzerklärung</a>.</p>
            </div>
          </form>
        )}
      </main>

      <EaSiteFooter logoSrc={ROOT + 'assets/logo-lockup-white.png'}
        legalHref={ROOT + 'datenschutz'} legalLabel="Datenschutz"
        agbHref={ROOT + 'impressum'} agbLabel="Impressum" />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ErstanalyseApp />);
