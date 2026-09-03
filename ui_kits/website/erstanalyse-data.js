/* Erstanalyse — Felddefinitionen, Fallback-Formel, Formatierung.
   Feldnamen sind EXAKT die Mail-Labels (identisch mit buero-bot.ch/erstanalyse).
   Gliederung: 8 Blöcke gemäss Konzept — Feldnamen unverändert, nur neu gruppiert. */
window.ErstanalyseData = (function () {
  // External collection stays disabled until vaiacon has its own endpoints.
  const WORKER_URL = '';
  const FORMSPREE_URL = '';
  const PROD_HOSTS = ['philip1658.github.io', 'vaiacon.ch', 'www.vaiacon.ch', 'buero-bot.ch', 'www.buero-bot.ch', 'localhost', '127.0.0.1'];

  const SECTIONS = [
    {
      number: '01',
      kicker: 'Firmenprofil',
      fields: [
        { name: 'Firma und Name', type: 'text', required: true, placeholder: 'Muster AG, Hans Meier', hint: 'Firma, dann Ihr Name — z.B. «Muster AG, Hans Meier»' },
        { name: 'Branche und Tätigkeit', type: 'text', required: true, placeholder: 'z.B. Sanitär, Kleinbetrieb mit Notfalldienst' },
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
        { name: 'Coaching-Interesse', type: 'radio', hint: 'Wünschen Sie sich neben der Technik auch Begleitung für sich und Ihr Team — Führung, Veränderung, Entlastung?', options: ['Ja, das interessiert mich', 'Vielleicht, erzählen Sie mehr', 'Nein, im Moment nur Technik'] },
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
        { name: 'Offerten pro Monat', type: 'radio', options: ['Keine / fast keine', '1–5', '6–15', '16–40', 'Mehr als 40'] },
        { name: 'Dauer pro Offerte', type: 'radio', options: ['Unter 30 Minuten', '30–60 Minuten', '1–2 Stunden', 'Mehr als 2 Stunden'] },
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
        { name: 'Bürostunden pro Woche', type: 'radio', options: ['Weniger als 5', '5–10', '10–20', 'Mehr als 20'] },
        { name: 'Grösster Zeitfresser', type: 'textarea', required: true, placeholder: 'Was frisst in Ihrem Büroalltag am meisten Zeit?', hint: 'Das einzige Feld, das wir nicht zum Ankreuzen anbieten — ein Satz genügt.' },
      ],
    },
    {
      number: '08',
      kicker: 'Kontakt & Erwartungen',
      fields: [
        { name: 'E-Mail', type: 'text', inputType: 'email', required: true, placeholder: 'z.B. peter.muster@muster-gmbh.ch', hint: 'Für Ihre Ersteinschätzung und die Terminvereinbarung.' },
        { name: 'Telefon', type: 'text', inputType: 'tel', placeholder: 'z.B. 079 123 45 67', hint: 'Optional — falls Sie lieber angerufen werden.' },
        { name: 'Zeithorizont', type: 'radio', hint: 'Wann möchten Sie etwas verändern?', options: ['So bald wie möglich', 'In den nächsten 3–6 Monaten', 'Ich möchte mich erst informieren'] },
        { name: 'Erwartungen an den Termin', type: 'textarea', placeholder: 'Optional: Was möchten Sie aus dem Erstgespräch mitnehmen?' },
      ],
    },
  ];

  const ALL_FIELDS = SECTIONS.flatMap((s) => s.fields);

  /* Ein Feld zählt für den Fortschritt, wenn es Pflicht ist oder zum Ankreuzen. */
  const countsForProgress = (f) => Boolean(f.required) || f.type === 'radio' || f.type === 'check';
  const hasValue = (v) => Array.isArray(v) ? v.length > 0 : Boolean((v || '').trim());

  function progressOf(answers) {
    let done = 0, total = 0, blocksDone = 0;
    SECTIONS.forEach((s) => {
      const countable = s.fields.filter(countsForProgress);
      const filled = countable.filter((f) => hasValue(answers[f.name]));
      done += filled.length;
      total += countable.length;
      if (countable.length && filled.length === countable.length) blocksDone += 1;
    });
    return { done, total, blocksDone, blocks: SECTIONS.length, percent: total ? Math.round((done / total) * 100) : 0 };
  }

  function blockComplete(section, answers) {
    const countable = section.fields.filter(countsForProgress);
    return countable.length > 0 && countable.every((f) => hasValue(answers[f.name]));
  }

  /* ---- Formatierung ---- */
  const fmtCHF = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  const fmtHours = (n) => {
    const r = Math.round(n * 10) / 10;
    return Number.isInteger(r) ? String(r) : String(r);
  };

  /* ---- Fallback-Formel (bei Fehler/Timeout des Endpoints) ----
     Bürostunden-Band-Mitte × 15–25 % als Std./Woche, × 46 Wochen × CHF 100 als CHF/Jahr. */
  const BAND_MITTE = { 'Weniger als 5': 2.5, '5–10': 7.5, '10–20': 15, 'Mehr als 20': 25 };
  function fallbackAssessment(answers) {
    const mitte = BAND_MITTE[answers['Bürostunden pro Woche']] || 7.5;
    const hMin = Math.round(mitte * 0.15 * 10) / 10;
    const hMax = Math.round(mitte * 0.25 * 10) / 10;
    const rund100 = (v) => Math.round(v / 100) * 100;
    return {
      stunden_pro_woche_min: hMin,
      stunden_pro_woche_max: hMax,
      chf_pro_jahr_min: rund100(hMin * 46 * 100),
      chf_pro_jahr_max: rund100(hMax * 46 * 100),
      einschaetzung: 'Ihre Angaben zeigen typische Muster kleiner Betriebe: Viel Zeit fliesst in wiederkehrende Büroarbeit, die sich gut automatisieren lässt. Was das für Ihren Betrieb konkret bedeutet, klären wir gerne im kostenlosen Erstgespräch.',
      top_hebel: (answers['Wiederkehrende Aufgaben'] || []).slice(0, 3),
      vorbehalt: null,
    };
  }

  return { WORKER_URL, FORMSPREE_URL, PROD_HOSTS, SECTIONS, ALL_FIELDS, fmtCHF, fmtHours, fallbackAssessment, progressOf, blockComplete };
})();
