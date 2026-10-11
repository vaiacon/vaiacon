/* Erstanalyse — Felddefinitionen, Annahmen der Rechnung, Formatierung.
   Feldnamen sind EXAKT die Mail-Labels (identisch mit buero-bot.ch/erstanalyse).
   Gliederung: 8 Blöcke gemäss Konzept.
   Eine Quelle: WORKER_URL und ANFRAGE_URL stehen nur hier. Die Erstanalyse ist
   bewusst NICHT im Design-System-Bundle (_ds_bundle.js), damit es keine zweite,
   veraltete Kopie der Adressen gibt. */
window.ErstanalyseData = (function () {
  // Beide Dienste laufen auf unserem eigenen Server (vaiacon.ch, Caddy → Container):
  // WORKER_URL = KI-Schätzung des Sparpotenzials, ANFRAGE_URL = Mail an hallo@vaiacon.ch.
  const WORKER_URL = window.VAIACON_API_BASIS + '/api/erstanalyse';
  const ANFRAGE_URL = window.VAIACON_API_BASIS + '/api/kontakt';
  const PROD_HOSTS = ['philip1658.github.io', 'vaiacon.ch', 'www.vaiacon.ch', 'buero-bot.ch', 'www.buero-bot.ch', 'localhost', '127.0.0.1'];

  const KEINE_OFFERTEN = 'Keine / fast keine';

  const SECTIONS = [
    {
      number: '01',
      kicker: 'Firmenprofil',
      fields: [
        { name: 'Firma und Name', type: 'text', required: true, autoComplete: 'organization', placeholder: 'Muster AG, Hans Meier', hint: 'Firma, dann Ihr Name. Zum Beispiel «Muster AG, Hans Meier».', error: 'Bitte geben Sie Ihre Firma und Ihren Namen an.' },
        { name: 'Branche und Tätigkeit', type: 'text', required: true, placeholder: 'z. B. Sanitär, Kleinbetrieb mit Notfalldienst', error: 'Bitte geben Sie Ihre Branche und Tätigkeit an.' },
        { name: 'Mitarbeitende', type: 'radio', options: ['Nur ich', '2–5', '6–15', '16–50', 'Mehr als 50'] },
      ],
    },
    {
      number: '02',
      kicker: 'Team & Rollen',
      fields: [
        { name: 'Büroarbeit erledigt', type: 'check', hint: 'Wer kümmert sich heute darum? Mehrfachauswahl möglich.', options: ['Ich selbst', 'Partner:in / Familie', 'Mitarbeiter:in', 'Extern (z.B. Treuhänder)'] },
        { name: 'Team-Haltung', type: 'radio', hint: 'Wie steht Ihr Team Veränderungen und neuen Tools gegenüber?', options: ['Offen und neugierig', 'Gemischt', 'Eher zurückhaltend', 'Schwer zu sagen'] },
        { name: 'KI-Schulung für', type: 'radio', hint: 'Wer soll bei Ihnen den Umgang mit KI lernen?', options: ['Das ganze Team', 'Einzelne Schlüsselpersonen', 'Erst einmal nur ich', 'Noch unklar'] },
        { name: 'Coaching-Interesse', type: 'radio', hint: 'Wünschen Sie sich neben der Technik auch Begleitung für sich und Ihr Team, etwa bei Führung, Veränderung, Entlastung?', options: ['Ja, das interessiert mich', 'Vielleicht, erzählen Sie mehr', 'Nein, im Moment nur Technik'] },
      ],
    },
    {
      number: '03',
      kicker: 'Administration & Ablage',
      fields: [
        { name: 'Tools Ablage', type: 'check', hint: 'Mehrfachauswahl möglich.', options: ['Papierordner', 'Ordner auf dem PC', 'Firmenserver / NAS', 'Cloud (Dropbox, OneDrive, Google Drive …)'] },
        { name: 'Papier oder digital', type: 'radio', options: ['Fast alles auf Papier', 'Gemischt, eher Papier', 'Gemischt, eher digital', 'Fast alles digital'] },
        { name: 'Tools Termine und Planung', type: 'check', hint: 'Mehrfachauswahl möglich.', options: ['Papieragenda', 'Outlook-/Google-Kalender', 'WhatsApp / Telefon', 'Planungstool / Software'] },
      ],
    },
    {
      number: '04',
      kicker: 'Buchhaltung & Rechnungen',
      fields: [
        { name: 'Tools Offerten und Rechnungen', type: 'check', hint: 'Mehrfachauswahl möglich.', options: ['Word-/Excel-Vorlage', 'Bexio', 'Klara', 'Branchensoftware', 'Von Hand / Papier', 'Macht jemand anderes für mich'] },
        { name: 'Tools Buchhaltung', type: 'check', hint: 'Mehrfachauswahl möglich.', options: ['Treuhänder macht alles', 'Bexio', 'Banana', 'Abacus', 'Excel', 'Belege sammeln, Rest extern'] },
        { name: 'Offerten pro Monat', type: 'radio', options: [KEINE_OFFERTEN, '1–5', '6–15', '16–40', 'Mehr als 40'] },
        // Nur sinnvoll, wenn überhaupt Offerten anfallen. Bei «Keine / fast keine»
        // ausgeblendet; ein früher gewählter Wert wird dann nicht mitgeschickt.
        { name: 'Dauer pro Offerte', type: 'radio', options: ['Unter 30 Minuten', '30–59 Minuten', '1–2 Stunden', 'Mehr als 2 Stunden'], showIf: (a) => a['Offerten pro Monat'] !== KEINE_OFFERTEN },
        { name: 'Rechnungen pro Monat', type: 'radio', options: ['Keine / fast keine', '1–10', '11–30', '31–100', 'Mehr als 100'] },
      ],
    },
    {
      number: '05',
      kicker: 'Kommunikation & Anfragen',
      fields: [
        { name: 'Anfragekanäle', type: 'check', hint: 'Wie kommen Kundenanfragen bei Ihnen an? Mehrfachauswahl möglich.', options: ['Telefon', 'WhatsApp / SMS', 'E-Mail', 'Website-Formular', 'Social Media', 'Empfehlung / Laufkundschaft'] },
        { name: 'Verpasste Anrufe', type: 'radio', hint: 'Gehen Anrufe verloren, wenn Sie unterwegs oder im Termin sind?', options: ['Ja, öfter', 'Manchmal', 'Combox, ich rufe zurück', 'Nein, jemand nimmt ab'] },
        { name: 'Gleiche Kundenfragen', type: 'radio', hint: 'Stellen Kunden oft dieselben Fragen (Preise, Ablauf, Termine …)?', options: ['Ja, ständig', 'Ab und zu', 'Selten'] },
        { name: 'Website-Status', type: 'radio', hint: 'Wie steht es um Ihre Website?', options: ['Keine Website', 'Vorhanden, aber veraltet', 'Aktuell', 'Aktuell mit Online-Funktionen'] },
      ],
    },
    {
      number: '06',
      kicker: 'Tools & Systeme',
      fields: [
        { name: 'Tools E-Mail und Office', type: 'check', hint: 'Mehrfachauswahl möglich.', options: ['Microsoft 365 / Outlook', 'Google (Gmail/Workspace)', 'Bluewin / GMX / Hostpoint o.ä.', 'Word/Excel lokal installiert', 'Weiss nicht genau'] },
        { name: 'Branchensoftware', type: 'text', placeholder: 'Falls vorhanden: Name Ihrer Branchensoftware' },
        { name: 'IT-Betreuung', type: 'radio', options: ['Niemand so richtig', 'Ich selbst', 'Externer IT-Dienstleister', 'Eigene IT-Person intern'] },
        { name: 'KI-Erfahrung', type: 'radio', options: ['Noch nie', 'Privat mal ausprobiert', 'Geschäftlich gelegentlich', 'Regelmässig im Einsatz'] },
      ],
    },
    {
      number: '07',
      kicker: 'Zeitfresser & Engpässe',
      fields: [
        { name: 'Wiederkehrende Aufgaben', type: 'check', hint: 'Was kommt bei Ihnen regelmässig vor? Mehrfachauswahl möglich.', options: ['Offerten schreiben', 'Rechnungen und Mahnungen', 'E-Mails beantworten', 'Terminkoordination', 'Dokumente suchen und ablegen', 'Rapporte und Arbeitszeiten erfassen', 'Belege für die Buchhaltung', 'Social Media und Werbung', 'Lohnadministration', 'Texte und Briefe formulieren'] },
        // Grenzen ohne Überschneidung: 10 Stunden gehören nur zu «10–20».
        { name: 'Bürostunden pro Woche', type: 'radio', hint: 'Grob geschätzt genügt. Ohne diese Angabe nennen wir keine Zahl.', options: ['Weniger als 5', '5–9', '10–20', 'Mehr als 20'] },
        { name: 'Grösster Zeitfresser', type: 'textarea', required: true, placeholder: 'Was frisst in Ihrem Büroalltag am meisten Zeit?', hint: 'Beschreiben Sie Ihren grössten Zeitfresser in einem Satz.', error: 'Bitte beschreiben Sie Ihren grössten Zeitfresser in einem Satz.' },
      ],
    },
    {
      number: '08',
      kicker: 'Kontakt & Erwartungen',
      fields: [
        { name: 'E-Mail', type: 'text', inputType: 'email', required: true, autoComplete: 'email', placeholder: 'z. B. peter.muster@muster-gmbh.ch', hint: 'Für Ihre Ersteinschätzung und die Terminvereinbarung.', error: 'Bitte geben Sie Ihre E-Mail-Adresse an.' },
        { name: 'Telefon', type: 'text', inputType: 'tel', autoComplete: 'tel', placeholder: 'z. B. 079 123 45 67', hint: 'Freiwillig. Für einen Rückruf benötigen wir Ihre Telefonnummer.' },
        { name: 'Zeithorizont', type: 'radio', hint: 'Wann möchten Sie etwas verändern?', options: ['So bald wie möglich', 'In den nächsten 3–6 Monaten', 'Ich möchte mich erst informieren'] },
        { name: 'Erwartungen an den Termin', type: 'textarea', placeholder: 'Freiwillig: Was möchten Sie aus dem Erstgespräch mitnehmen?' },
      ],
    },
  ];

  const ALL_FIELDS = SECTIONS.flatMap((s) => s.fields);
  const REQUIRED_FIELDS = ALL_FIELDS.filter((f) => f.required);

  /* Gültige HTML-ID aus dem Feldnamen (Leerzeichen und Umlaute raus). */
  const fieldId = (name) => 'ea-' + name.toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const isVisible = (f, answers) => !f.showIf || f.showIf(answers || {});
  const hasValue = (v) => Array.isArray(v) ? v.length > 0 : Boolean((v || '').trim());

  const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* Fehlertext je Feld, oder null. */
  function fieldError(f, answers) {
    const v = answers[f.name];
    if (f.required && !hasValue(v)) return f.error || 'Bitte füllen Sie dieses Feld aus.';
    if (f.inputType === 'email' && hasValue(v) && !MAIL_RE.test(v.trim())) return 'Bitte prüfen Sie die E-Mail-Adresse, zum Beispiel name@firma.ch.';
    return null;
  }

  /* Fortschritt: zwei klar benannte Grössen.
     - Pflichtangaben: nur diese vier braucht es zum Absenden.
     - Anteil beantworteter Fragen: alle sichtbaren Fragen, auch freiwillige. */
  function progressOf(answers) {
    const visible = ALL_FIELDS.filter((f) => isVisible(f, answers));
    const answered = visible.filter((f) => hasValue(answers[f.name])).length;
    const reqDone = REQUIRED_FIELDS.filter((f) => !fieldError(f, answers)).length;
    return {
      answered,
      total: visible.length,
      percent: visible.length ? Math.round((answered / visible.length) * 100) : 0,
      requiredDone: reqDone,
      requiredTotal: REQUIRED_FIELDS.length,
    };
  }

  function sectionProgress(section, answers) {
    const visible = section.fields.filter((f) => isVisible(f, answers));
    return { answered: visible.filter((f) => hasValue(answers[f.name])).length, total: visible.length };
  }

  /* Entwurf aus dem Browser bereinigen: Auswahlwerte, die es nicht mehr gibt
     (z. B. das alte Band «5–10»), fallen weg. */
  function cleanDraft(raw) {
    const out = {};
    if (!raw || typeof raw !== 'object') return out;
    ALL_FIELDS.forEach((f) => {
      const v = raw[f.name];
      if (v == null) return;
      if (f.type === 'radio') { if (f.options.includes(v)) out[f.name] = v; }
      else if (f.type === 'check') { if (Array.isArray(v)) { const l = v.filter((x) => f.options.includes(x)); if (l.length) out[f.name] = l; } }
      else if (typeof v === 'string') out[f.name] = v;
    });
    return out;
  }

  /* ---- Formatierung ---- */
  const fmtCHF = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  const fmtHours = (n) => String(Math.round(n * 10) / 10).replace('.', ',');

  /* ---- Annahmen der Rechnung (offen gelegt im Ergebnis) ----
     Wert der frei werdenden Zeit = Stunden pro Woche × Arbeitswochen × Wert
     einer Arbeitsstunde. CHF 100 ist eine Annahme für den Wert Ihrer
     Arbeitsstunde, kein Preis von Vaiacon. Die Besucherin kann ihn ändern. */
  const ANNAHMEN = {
    anteil_min: 0.15,   // Anteil der Bürozeit, der sich automatisieren lässt (untere Grenze)
    anteil_max: 0.25,   // obere Grenze
    wochen: 46,         // Arbeitswochen pro Jahr
    stundenwert: 100,   // CHF pro Arbeitsstunde, Annahme
  };
  // Gerechnet wird mit der Mitte des gewählten Bands. Ohne Angabe: keine Zahl.
  const BAND_MITTE = { 'Weniger als 5': 2.5, '5–9': 7, '10–20': 15, 'Mehr als 20': 25 };

  const rund100 = (v) => Math.round(v / 100) * 100;
  const rundHalb = (v) => Math.round(v * 2) / 2;

  /* Rechnung aus Bürostunden pro Woche; null, wenn keine Basis da ist. */
  function rechne(stundenProWoche, stundenwert) {
    const b = Number(stundenProWoche);
    const w = Number(stundenwert);
    if (!(b > 0) || !(w > 0)) return null;
    const hMin = rundHalb(b * ANNAHMEN.anteil_min) || 0.5;
    const hMax = Math.max(rundHalb(b * ANNAHMEN.anteil_max), hMin);
    return {
      stunden_pro_woche_min: hMin,
      stunden_pro_woche_max: hMax,
      chf_pro_jahr_min: rund100(hMin * ANNAHMEN.wochen * w),
      chf_pro_jahr_max: rund100(hMax * ANNAHMEN.wochen * w),
    };
  }

  /* Franken aus vorhandenen Stunden (z. B. vom KI-Dienst) mit eigenem Stundenwert. */
  function wertAusStunden(hMin, hMax, stundenwert) {
    const w = Number(stundenwert);
    if (!(w > 0)) return null;
    return { chf_pro_jahr_min: rund100(hMin * ANNAHMEN.wochen * w), chf_pro_jahr_max: rund100(hMax * ANNAHMEN.wochen * w) };
  }

  /* ---- Ersatz, wenn der KI-Dienst nicht antwortet ----
     Gekennzeichnet als Standardtext (quelle: 'ersatz'). Ohne Bürostunden
     entsteht KEINE Zahl. */
  function fallbackAssessment(answers) {
    const band = answers['Bürostunden pro Woche'];
    const basis = BAND_MITTE[band] || null;
    const r = basis ? rechne(basis, ANNAHMEN.stundenwert) : null;
    return {
      quelle: 'ersatz',
      stunden_angegeben: Boolean(basis),
      basis_stunden_pro_woche: basis,
      stunden_pro_woche_min: r ? r.stunden_pro_woche_min : null,
      stunden_pro_woche_max: r ? r.stunden_pro_woche_max : null,
      chf_pro_jahr_min: r ? r.chf_pro_jahr_min : null,
      chf_pro_jahr_max: r ? r.chf_pro_jahr_max : null,
      einschaetzung: 'Die persönliche Auswertung ist gerade nicht verfügbar. Was Sie hier sehen, ist ein Standardtext: '
        + (basis
          ? 'Die Orientierung rechnet nur mit Ihrer Angabe zu den Bürostunden und den Annahmen unten.'
          : 'Ohne Angabe zu den Bürostunden nennen wir keine Zahl.')
        + ' Ihre übrigen Antworten schauen wir persönlich an.',
      top_hebel: (answers['Wiederkehrende Aufgaben'] || []).slice(0, 3),
      vorbehalt: null,
    };
  }

  /* Nur sichtbare, ausgefüllte Antworten (ausgeblendete Folgefragen fallen weg). */
  function sichtbareAntworten(answers) {
    const out = {};
    ALL_FIELDS.forEach((f) => {
      if (!isVisible(f, answers)) return;
      const v = answers[f.name];
      if (hasValue(v)) out[f.name] = Array.isArray(v) ? v : v.trim();
    });
    return out;
  }

  /* ---- Zusatz für /api/kontakt ----
     intern legt die Anfrage mit Quelle «erstanalyse» ab und speichert die
     Antworten samt Einschätzung strukturiert (analyse_json). */
  function anfrageZusatz(answers, assessment) {
    return { quelle: 'erstanalyse', analyse: { antworten: sichtbareAntworten(answers), einschaetzung: assessment || null } };
  }

  return {
    WORKER_URL, ANFRAGE_URL, PROD_HOSTS, SECTIONS, ALL_FIELDS, REQUIRED_FIELDS, ANNAHMEN, BAND_MITTE,
    fieldId, isVisible, hasValue, fieldError, progressOf, sectionProgress, cleanDraft, sichtbareAntworten,
    fmtCHF, fmtHours, rechne, wertAusStunden, fallbackAssessment, anfrageZusatz,
  };
})();
