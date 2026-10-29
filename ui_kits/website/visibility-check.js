// vaiaconVisibility — der Sichtbarkeits-Check auf visibility.html (seit 04.10.2026).
//
// Ablauf: Domain eingeben → POST /api/sichtbarkeit. Unser Server ruft die
// öffentlich zugänglichen Dateien der Domain ab (Startseite, robots.txt,
// sitemap.xml, llms.txt), prüft sie in sechs Schritten und lässt Claude die
// Befunde auswerten. Er meldet jeden Schritt, sobald er beginnt, als eine
// JSON-Zeile (NDJSON) und zuletzt das Ergebnis oder einen Fehler.
//
// Die Seite zeigt das Ergebnis als Auszug: Gesamtwert, Fazit, «Grösstes
// Potenzial» und je Bereich eine einfache Erklärung, die Punktzahl und drei
// Beispiele mit ihrem Stand (Titel und Status; Befundtexte werden nicht gezeigt).
// Den ganzen Bericht gibt es im Gespräch: Name und Telefonnummer gehen als
// Rückrufwunsch an /api/kontakt (wie das Rückruf-Formular auf kontakt.html,
// ui_kits/website/kontakt.js).
//
// Serverdaten kommen nur über textContent in die Seite, nie über innerHTML.
// Gestartet wird auch von selbst: visibility?domain=ihre-firma.ch#check
// (so springt das Feld auf der Startseite hierher, siehe check-start.js).
(function () {
  var form = document.getElementById('sv-check-form');
  if (!form) return;

  var ZIEL = window.VAIACON_API_BASIS + '/api/sichtbarkeit';
  var ZIEL_KONTAKT = window.VAIACON_API_BASIS + '/api/kontakt';

  // Zufällige Browser-Kennung, damit der Server Kollegen hinter derselben Firmen-Adresse
  // getrennt zählt. Keine Personendaten, nur Zufall; liegt im localStorage.
  function besucherKennung() {
    try {
      var k = localStorage.getItem('vc-besucher');
      if (!k || !/^[A-Za-z0-9_-]{8,64}$/.test(k)) {
        var b = new Uint8Array(16); crypto.getRandomValues(b);
        k = Array.prototype.map.call(b, function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
        localStorage.setItem('vc-besucher', k);
      }
      return k;
    } catch (e) { return ''; }
  }
  var MAIL = 'hallo@vaiacon.ch';
  var ZEITGRENZE = 90000;        // ms, dann gibt der Browser auf
  var MIN_LAUF = 700;            // ms, so lange steht jeder Schritt mindestens auf «läuft»
  var PAUSE_VOR_ERGEBNIS = 350;  // ms zwischen letztem Haken und Ergebnis
  var TAKT_UNTERZEILE = 3200;    // ms je Unterzeile in der Auswertung

  // Verlangt eine echte Webadresse mit Endung (ihre-firma.ch, www.firma.com,
  // shop.firma.co.uk ...). Ein blosses Wort ohne Punkt und Endung faellt durch.
  var DOMAIN_MUSTER = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/i;

  // Die sechs Schritte, in der Reihenfolge, in der der Server sie meldet.
  var SCHRITTE = [
    { schluessel: 'erreichbar', titel: 'Website erreichen', unterzeile: 'Adresse auflösen, Startseite laden, Antwortzeit und HTTPS prüfen' },
    { schluessel: 'technik', titel: 'Technische Grundlagen', unterzeile: 'Seitentitel, Beschreibung, Überschriften, Handy-Darstellung, robots.txt, Sitemap' },
    { schluessel: 'daten', titel: 'Strukturierte Daten', unterzeile: 'Firmendaten, Leistungen und FAQ als maschinenlesbare Angaben' },
    { schluessel: 'geo', titel: 'KI-Sichtbarkeit (GEO)', unterzeile: 'llms.txt und Regeln für KI-Crawler wie GPTBot, ClaudeBot, PerplexityBot' },
    { schluessel: 'inhalt', titel: 'Inhalt & Vertrauen', unterzeile: 'Textumfang, Kontaktangaben, Impressum, Datenschutzerklärung' },
    { schluessel: 'auswertung', titel: 'Auswertung', unterzeile: 'Wir bewerten alle Befunde und suchen Ihr grösstes Potenzial' },
  ];

  // Die Auswertung dauert meist unter einer Minute, kann aber einige Minuten brauchen; damit der Schritt nicht stehen
  // geblieben wirkt, wechselt seine Unterzeile ruhig durch diese Sätze.
  var AUSWERTUNG_ZEILEN = [
    'Wir bewerten alle Befunde und suchen Ihr grösstes Potenzial',
    'Seitentitel und Beschreibung bewerten …',
    'Strukturierte Daten einordnen …',
    'KI-Sichtbarkeit einschätzen …',
    'Grösstes Potenzial bestimmen …',
  ];

  var ZUSTAND_WORT = { wartet: 'wartet', laeuft: 'läuft', fertig: 'fertig', fehler: 'abgebrochen' };
  var STATUS_WORT = { gut: 'Gut', mittel: 'Mittel', schwach: 'Schwach' };
  var STATUS_REIHE = { schwach: 0, mittel: 1, gut: 2 };   // schwächste Beispiele zuerst
  var BEISPIELE = 3;

  // Was ein Bereich bedeutet, so einfach wie möglich. Der Server nennt die
  // Bereiche nur mit Titel; zugeordnet wird über den Schlüssel, sonst über ein
  // Stichwort im Titel. Passt nichts, steht keine Erklärung da (lieber keine als eine falsche).
  var ERKLAERUNG = {
    erreichbar: 'Zeigt, wie schnell und sicher Ihre Website für Besucher und Suchmaschinen aufgeht und erreichbar ist.',
    technik: 'Dies sind die Grundlagen, damit Google Ihre Seiten findet und versteht: Titel, Beschreibung, Aufbau und Darstellung auf dem Handy.',
    daten: 'Angaben im Hintergrund, welche Maschinen direkt lesen können. Diese beschreiben, wer Sie sind, was Sie anbieten und wo Sie zu finden sind.',
    geo: 'Sorgt dafür, dass KI-Assistenten wie ChatGPT Ihre Firma finden, verstehen und richtig wiedergeben können.',
    inhalt: 'Wichtig, damit Besucher genug Informationen finden und Vertrauen aufbauen können: Kontakt, Impressum und Datenschutz.',
  };
  var ERKLAERUNG_STICHWORT = [
    ['erreich', 'erreichbar'], ['technis', 'technik'], ['strukturiert', 'daten'],
    ['ki-', 'geo'], ['geo', 'geo'], ['inhalt', 'inhalt'], ['vertrauen', 'inhalt'],
  ];

  var TEXT = {
    eingabe: 'Bitte eine vollständige Webadresse eingeben, z. B. ihre-firma.ch',
    stoerung: 'Der Check ist gerade nicht verfügbar. Versuchen Sie es in einigen Minuten erneut oder schreiben Sie an hallo@vaiacon.ch.',
    netz: 'Keine Verbindung zu unserem Server. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es noch einmal.',
    zeit: 'Die Prüfung hat zu lange gedauert und wurde abgebrochen. Versuchen Sie es in einigen Minuten erneut oder schreiben Sie an hallo@vaiacon.ch.',
  };

  var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var feldDomain = document.getElementById('sv-check-domain');
  var knopf = document.getElementById('sv-check-knopf');
  var fehlerFeld = document.getElementById('sv-check-fehler');
  var problem = document.getElementById('sv-check-problem');
  var problemText = document.getElementById('sv-check-problem-text');
  var problemKnopf = document.getElementById('sv-check-problem-knopf');
  var ansage = document.getElementById('sv-check-ansage');
  var ladend = document.getElementById('sv-check-ladend');
  var ladendDomain = document.getElementById('sv-check-ladend-domain');
  var schritteListe = document.getElementById('sv-check-schritte');
  var report = document.getElementById('sv-check-report');

  function $(id) { return document.getElementById(id); }

  function saeubern(eingabe) {
    return eingabe.trim().replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/.*$/, '');
  }

  function rollen(element, block) {
    if (!element || !element.scrollIntoView) return;
    element.scrollIntoView({ behavior: reduziert ? 'auto' : 'smooth', block: block || 'start' });
  }

  // Mitscrollen (vor allem auf dem Handy): Läuft der Check, soll man den Fortschritt und am Ende
  // das Ergebnis sehen, ohne zu wischen. Steht das Element schon im Bild, bleibt die Seite stehen.
  // Sobald die Person selbst scrollt oder tippt, folgt die Seite nicht mehr (nutzerScrollt).
  var nutzerScrollt = false;
  ['touchstart', 'wheel', 'keydown', 'mousedown'].forEach(function (name) {
    window.addEventListener(name, function () { nutzerScrollt = true; }, { passive: true });
  });

  function imBild(element) {
    var r = element.getBoundingClientRect();
    return r.top >= 80 && r.bottom <= window.innerHeight - 12;
  }

  function folgen(element, block, sofort) {
    if (!element || element.hidden || nutzerScrollt || imBild(element)) return;
    if (sofort) {
      var wurzel = document.documentElement, vorher = wurzel.style.scrollBehavior;
      wurzel.style.scrollBehavior = 'auto';
      element.scrollIntoView({ block: block || 'center' });
      wurzel.style.scrollBehavior = vorher;
    } else {
      rollen(element, block || 'center');
    }
  }

  function el(tag, klasse, text) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text !== undefined && text !== null) e.textContent = String(text);
    return e;
  }

  function sagen(text) {
    // Leeren und neu setzen, damit Screenreader auch denselben Satz zweimal ansagen.
    ansage.textContent = '';
    window.setTimeout(function () { ansage.textContent = text; }, 60);
  }

  // ── Eingabe und Fehler ───────────────────────────────────────────────────

  function feldFehler(text) {
    fehlerFeld.textContent = text;
    fehlerFeld.hidden = false;
    problem.hidden = true;   // ein alter Fehler vom letzten Versuch gilt nicht mehr
    feldDomain.setAttribute('aria-invalid', 'true');
    feldDomain.setAttribute('aria-describedby', 'sv-check-fehler');
  }

  function feldFehlerWeg() {
    fehlerFeld.hidden = true;
    feldDomain.removeAttribute('aria-invalid');
    feldDomain.removeAttribute('aria-describedby');
  }

  function problemZeigen(text, nochmals) {
    problemText.textContent = text;
    problemKnopf.hidden = !nochmals;
    problem.hidden = false;
  }

  // ── Ladeansicht ──────────────────────────────────────────────────────────

  var zeilen = [];   // je Schritt { li, wort, unter }

  function schritteBauen() {
    schritteListe.textContent = '';
    zeilen = SCHRITTE.map(function (s) {
      var li = el('li', 'sv-check__schritt');
      li.setAttribute('data-zustand', 'wartet');
      var zeichen = el('span', 'sv-check__schritt-zeichen');
      zeichen.setAttribute('aria-hidden', 'true');
      var text = el('div', 'sv-check__schritt-text');
      var titel = el('span', 'sv-check__schritt-titel', s.titel);
      var unter = el('span', 'sv-check__schritt-unter', s.unterzeile);
      text.appendChild(titel);
      text.appendChild(unter);
      var wort = el('span', 'sv-check__schritt-wort', ZUSTAND_WORT.wartet);
      li.appendChild(zeichen);
      li.appendChild(text);
      li.appendChild(wort);
      schritteListe.appendChild(li);
      return { li: li, wort: wort, unter: unter };
    });
  }

  function zustand(i, z) {
    var zeile = zeilen[i];
    if (!zeile) return;
    zeile.li.setAttribute('data-zustand', z);
    zeile.wort.textContent = ZUSTAND_WORT[z];
    if (z === 'laeuft') zeile.li.setAttribute('aria-current', 'step');
    else zeile.li.removeAttribute('aria-current');
  }

  // Wechselnde Unterzeilen im Schritt «Auswertung».
  var unterzeilenTimer = null;

  function unterzeilenStart(zeile) {
    unterzeilenStopp();
    var nr = 0;
    unterzeilenTimer = window.setInterval(function () {
      nr = (nr + 1) % AUSWERTUNG_ZEILEN.length;
      if (reduziert) {
        zeile.unter.textContent = AUSWERTUNG_ZEILEN[nr];
        return;
      }
      zeile.unter.classList.add('ist-weg');
      window.setTimeout(function () {
        zeile.unter.textContent = AUSWERTUNG_ZEILEN[nr];
        zeile.unter.classList.remove('ist-weg');
      }, 260);
    }, TAKT_UNTERZEILE);
  }

  function unterzeilenStopp() {
    if (unterzeilenTimer) window.clearInterval(unterzeilenTimer);
    unterzeilenTimer = null;
  }

  // ── Takt der Schritte ────────────────────────────────────────────────────
  // Der Server meldet, wann ein Schritt beginnt (ziel). Die Anzeige läuft dem
  // in ihrem eigenen Takt nach: Jeder Schritt steht mindestens MIN_LAUF auf
  // «läuft», auch wenn der Server (oder sein Zwischenspeicher) schneller war.
  // So flackert nichts, und am Ende sieht man trotzdem jeden Haken.

  var lauf = null;

  function laufStarten() {
    lauf = { aktuell: 0, seit: Date.now(), ziel: 0, ergebnis: null, timer: null, aus: false };
    zustand(0, 'laeuft');
    sagen('Prüft: ' + SCHRITTE[0].titel);
  }

  function laufStoppen() {
    if (!lauf) return;
    lauf.aus = true;
    window.clearTimeout(lauf.timer);
    unterzeilenStopp();
  }

  function pumpe() {
    if (!lauf || lauf.aus) return;
    window.clearTimeout(lauf.timer);
    var bis = lauf.ergebnis ? SCHRITTE.length : lauf.ziel;
    if (lauf.aktuell >= bis) return;

    var rest = MIN_LAUF - (Date.now() - lauf.seit);
    if (rest > 0) {
      lauf.timer = window.setTimeout(pumpe, rest);
      return;
    }

    zustand(lauf.aktuell, 'fertig');
    if (SCHRITTE[lauf.aktuell].schluessel === 'auswertung') unterzeilenStopp();
    lauf.aktuell += 1;

    if (lauf.aktuell < SCHRITTE.length) {
      zustand(lauf.aktuell, 'laeuft');
      folgen(zeilen[lauf.aktuell].li, 'center');
      lauf.seit = Date.now();
      sagen('Prüft: ' + SCHRITTE[lauf.aktuell].titel);
      if (SCHRITTE[lauf.aktuell].schluessel === 'auswertung') unterzeilenStart(zeilen[lauf.aktuell]);
      lauf.timer = window.setTimeout(pumpe, MIN_LAUF);
      return;
    }

    // Alle sechs fertig: kurz stehen lassen, dann das Ergebnis.
    var ergebnis = lauf.ergebnis;
    lauf.timer = window.setTimeout(function () {
      if (!lauf || lauf.aus) return;
      laufStoppen();
      ergebnisZeigen(ergebnis);
    }, PAUSE_VOR_ERGEBNIS);
  }

  function schrittBeginnt(schluessel) {
    for (var i = 0; i < SCHRITTE.length; i++) {
      if (SCHRITTE[i].schluessel === schluessel) {
        if (i > lauf.ziel) lauf.ziel = i;
        pumpe();
        return;
      }
    }
    // Unbekannte Schlüssel ignorieren.
  }

  function laufAbbrechen() {
    // Server hat beim Schritt «ziel» aufgegeben: alles davor gilt als
    // fertig, dieser Schritt als abgebrochen.
    var bis = Math.max(lauf.ziel, lauf.aktuell);
    laufStoppen();
    for (var i = 0; i < SCHRITTE.length; i++) {
      if (i < bis) zustand(i, 'fertig');
      else if (i === bis) zustand(i, 'fehler');
      else zustand(i, 'wartet');
    }
    zeilen[SCHRITTE.length - 1].unter.textContent = SCHRITTE[SCHRITTE.length - 1].unterzeile;
  }

  // ── Anfrage an den Server ────────────────────────────────────────────────

  var laufNr = 0;
  var steuerung = null;
  var aktuelleDomain = '';

  function besetzt(ja) {
    knopf.disabled = ja;
    ladend.setAttribute('aria-busy', ja ? 'true' : 'false');
  }

  function checkStarten(domain) {
    laufNr += 1;
    var meinLauf = laufNr;
    if (steuerung) { try { steuerung.abort(); } catch (e) { /* egal */ } }
    laufStoppen();

    aktuelleDomain = domain;
    feldFehlerWeg();
    problem.hidden = true;
    report.hidden = true;
    ladendDomain.textContent = domain;
    schritteBauen();
    ladend.hidden = false;
    nutzerScrollt = false;
    folgen(ladend, 'start');
    besetzt(true);
    laufStarten();

    var abgelaufen = false;
    steuerung = window.AbortController ? new AbortController() : null;
    var zeitTimer = window.setTimeout(function () {
      abgelaufen = true;
      if (steuerung) steuerung.abort();
      else ende(function () { scheitern(TEXT.zeit, 'zeit'); });
    }, ZEITGRENZE);

    var erledigt = false;
    function ende(fn) {
      if (erledigt || meinLauf !== laufNr) return;
      erledigt = true;
      window.clearTimeout(zeitTimer);
      besetzt(false);
      fn();
    }

    function zeile(text) {
      if (erledigt || meinLauf !== laufNr) return;
      text = text.trim();
      if (!text) return;
      var d;
      try { d = JSON.parse(text); } catch (e) { return; }
      if (!d || typeof d !== 'object') return;
      if (d.ergebnis && typeof d.ergebnis === 'object') {
        ende(function () {
          lauf.ergebnis = d.ergebnis;
          if (lauf.ziel < SCHRITTE.length - 1) lauf.ziel = SCHRITTE.length - 1;
          pumpe();
        });
      } else if (d.fehler) {
        ende(function () { scheitern(String(d.fehler), d.art); });
      } else if (typeof d.schritt === 'string') {
        schrittBeginnt(d.schritt);
      }
    }

    var optionen = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/x-ndjson, application/json', 'X-Besucher': besucherKennung() },
      body: JSON.stringify({ domain: domain }),
    };
    if (steuerung) optionen.signal = steuerung.signal;

    fetch(ZIEL, optionen).then(function (antwort) {
      if (!antwort.ok) {
        // Vor dem Start abgelehnt (400/422/429/503) — oder ein Fehler ohne
        // JSON, z. B. wenn der Dienst ganz fehlt.
        return antwort.json().catch(function () { return null; }).then(function (d) {
          ende(function () {
            if (d && d.fehler) scheitern(String(d.fehler), d.art || 'stoerung', true);
            else scheitern(TEXT.stoerung, 'stoerung', true);
          });
        });
      }
      return zeilenLesen(antwort, zeile, function () { return erledigt || meinLauf !== laufNr; });
    }).then(function () {
      // Strom zu Ende, aber weder Ergebnis noch Fehler: als Störung werten.
      ende(function () { scheitern(TEXT.stoerung, 'stoerung'); });
    }).catch(function () {
      ende(function () {
        if (abgelaufen) scheitern(TEXT.zeit, 'zeit');
        else scheitern(TEXT.netz, 'netz');
      });
    });
  }

  // Liest die Antwort Zeile für Zeile. Eine Zeile kann über zwei Blöcke
  // gehen, darum bleibt der Rest nach dem letzten \n im Puffer.
  function zeilenLesen(antwort, jeZeile, schluss) {
    if (!antwort.body || !antwort.body.getReader || !window.TextDecoder) {
      return antwort.text().then(function (alles) {
        alles.split('\n').forEach(jeZeile);
      });
    }
    var leser = antwort.body.getReader();
    var decoder = new TextDecoder('utf-8');
    var puffer = '';
    function weiter() {
      return leser.read().then(function (stueck) {
        if (stueck.done) {
          puffer += decoder.decode();
          if (puffer) jeZeile(puffer);
          return;
        }
        puffer += decoder.decode(stueck.value, { stream: true });
        var teile = puffer.split('\n');
        puffer = teile.pop();
        teile.forEach(jeZeile);
        if (schluss()) {
          try { leser.cancel(); } catch (e) { /* egal */ }
          return;
        }
        return weiter();
      });
    }
    return weiter();
  }

  // vorDemStart: der Server hat abgelehnt, bevor er etwas geprüft hat —
  // dann keine Schrittliste mit «abgebrochen» stehen lassen.
  function scheitern(text, art, vorDemStart) {
    if (lauf && !lauf.aus) laufAbbrechen();
    if (vorDemStart) ladend.hidden = true;
    if (art === 'eingabe') {
      ladend.hidden = true;
      feldFehler(text);
      feldDomain.focus();
      return;
    }
    problemZeigen(text, art !== 'bremse');
    folgen(problem, 'center');
    sagen(text);
  }

  // ── Ergebnis ─────────────────────────────────────────────────────────────

  function datumText(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    if (m) return m[3] + '.' + m[2] + '.' + m[1];
    return new Date().toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function zahl(wert) {
    var n = Math.round(Number(wert));
    if (!isFinite(n)) return 0;
    return Math.max(0, Math.min(100, n));
  }

  function statusBauen(status) {
    var bekannt = Object.prototype.hasOwnProperty.call(STATUS_WORT, status);
    var s = el('span', 'sv-check__status');
    s.setAttribute('data-status', bekannt ? status : 'offen');
    var punkt = el('span', 'sv-check__status-punkt');
    punkt.setAttribute('aria-hidden', 'true');
    s.appendChild(punkt);
    s.appendChild(el('span', 'sv-check__status-wort', bekannt ? STATUS_WORT[status] : 'Offen'));
    return s;
  }

  function punkteBauen(wert) {
    var n = zahl(wert);
    var box = el('div', 'sv-check__punkte');
    var zahlEl = el('p', 'sv-check__punkte-zahl');
    zahlEl.appendChild(el('strong', null, n));
    zahlEl.appendChild(el('span', null, ' / 100'));
    box.appendChild(zahlEl);
    var balken = el('span', 'sv-check__balken');
    balken.setAttribute('aria-hidden', 'true');
    var fuellung = el('span');
    fuellung.style.width = n + '%';
    balken.appendChild(fuellung);
    box.appendChild(balken);
    return box;
  }

  function erklaerungFinden(b) {
    var schluessel = String(b.schluessel || b.key || '');
    if (Object.prototype.hasOwnProperty.call(ERKLAERUNG, schluessel)) return ERKLAERUNG[schluessel];
    var titel = String(b.titel || '').toLowerCase();
    for (var i = 0; i < ERKLAERUNG_STICHWORT.length; i++) {
      if (titel.indexOf(ERKLAERUNG_STICHWORT[i][0]) !== -1) return ERKLAERUNG[ERKLAERUNG_STICHWORT[i][1]];
    }
    return '';
  }

  // Die drei schwächsten Befunde eines Bereichs, bei gleichem Stand in der Reihenfolge des Servers.
  function beispieleWaehlen(befunde) {
    return befunde
      .filter(function (f) { return f && typeof f === 'object'; })
      .map(function (f, i) {
        var rang = Object.prototype.hasOwnProperty.call(STATUS_REIHE, f.status) ? STATUS_REIHE[f.status] : 3;
        return { f: f, rang: rang, i: i };
      })
      .sort(function (a, b) { return a.rang - b.rang || a.i - b.i; })
      .slice(0, BEISPIELE)
      .map(function (x) { return x.f; });
  }

  function bereichBauen(b) {
    var karte = el('article', 'sv-card sv-check__bereich');

    var kopf = el('div', 'sv-check__bereich-kopf');
    kopf.appendChild(el('h4', null, b.titel || ''));
    kopf.appendChild(punkteBauen(b.punkte));
    karte.appendChild(kopf);

    var erklaerung = erklaerungFinden(b);
    if (erklaerung) karte.appendChild(el('p', 'sv-check__bereich-erklaerung', erklaerung));

    var beispiele = beispieleWaehlen(Array.isArray(b.befunde) ? b.befunde : []);
    if (beispiele.length) {
      karte.appendChild(el('span', 'sv-label', 'Beispiele, Stand heute'));
      var liste = el('ul', 'sv-check__befunde');
      beispiele.forEach(function (f) {
        var li = el('li', 'sv-check__befund');
        var zeile = el('div', 'sv-check__befund-kopf');
        zeile.appendChild(el('h5', null, f.titel || ''));
        zeile.appendChild(statusBauen(f.status));
        li.appendChild(zeile);
        liste.appendChild(li);
      });
      karte.appendChild(liste);
    }
    return karte;
  }

  var berichtId = '';

  function ergebnisZeigen(e) {
    ladend.hidden = true;
    problem.hidden = true;

    berichtId = String(e.id || '');
    var domain = e.domain || aktuelleDomain;
    var gesamt = zahl(e.gesamt);
    gesamtWert = gesamt;
    berichtDatum = datumText(e.datum);

    $('sv-check-report-domain').textContent = domain;
    $('sv-check-report-datum').textContent = 'Geprüft am ' + datumText(e.datum);
    $('sv-check-fazit').textContent = e.fazit || '';
    $('sv-check-gesamt').textContent = gesamt;
    $('sv-check-ring').setAttribute('aria-label', 'Gesamtwert ' + gesamt + ' von 100');

    var bogen = $('sv-check-ring-wert');
    var umfang = 2 * Math.PI * 52;
    bogen.style.strokeDasharray = umfang.toFixed(2);
    bogen.style.strokeDashoffset = umfang.toFixed(2);

    var pot = e.groesstes_potenzial || {};
    var potKarte = $('sv-check-potenzial');
    potKarte.hidden = !(pot.titel || pot.text);
    $('sv-check-potenzial-bereich').textContent = pot.bereich || '';
    $('sv-check-potenzial-bereich').hidden = !pot.bereich;
    $('sv-check-potenzial-titel').textContent = pot.titel || '';
    $('sv-check-potenzial-text').textContent = pot.text || '';

    var raster = $('sv-check-bereiche');
    raster.textContent = '';
    var bereiche = Array.isArray(e.bereiche) ? e.bereiche.slice() : [];
    bereiche.forEach(function (b) {
      if (b && typeof b === 'object') raster.appendChild(bereichBauen(b));
    });

    gespraechZuruecksetzen(domain);
    report.hidden = false;

    // Ring füllen, nachdem er sichtbar ist (sonst springt er ohne Übergang).
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        bogen.style.strokeDashoffset = (umfang * (1 - gesamt / 100)).toFixed(2);
      });
    });

    sagen('Check abgeschlossen. Gesamtwert ' + gesamt + ' von 100.');
    report.focus({ preventScroll: true });
    rollen(report, 'start');
  }

  // ── Bericht im Gespräch ──────────────────────────────────────────────────

  var gespraechForm = $('sv-check-gespraech-form');
  var gespraechKnopf = $('sv-check-gespraech-knopf');
  var gespraechMeldung = $('sv-check-gespraech-meldung');
  var danke = $('sv-check-danke');
  var gesamtWert = 0;
  var berichtDatum = '';

  function gespraechSagen(text, art) {
    gespraechMeldung.textContent = text || '';
    gespraechMeldung.setAttribute('data-art', art || '');
  }

  function gespraechZuruecksetzen(domain) {
    gespraechForm.reset();
    gespraechForm.hidden = false;
    danke.hidden = true;
    danke.textContent = '';
    gespraechKnopf.disabled = false;
    gespraechSagen('', '');
    $('sv-check-gespraech-domain').textContent = domain;
    Array.prototype.forEach.call(gespraechForm.querySelectorAll('[aria-invalid]'), function (f) {
      f.removeAttribute('aria-invalid');
    });
  }

  function gespraechWert(name) {
    var f = gespraechForm.querySelector('[name="' + name + '"]');
    return f ? f.value.trim() : '';
  }

  // Der Kontaktdienst kennt kein eigenes Feld für den Check: Domain, Wert und
  // Bericht-Nummer stehen im Text, damit man den Bericht zum Anruf findet.
  function gespraechText(d) {
    return [
      'RÜCKRUFWUNSCH · WEBSITE-CHECK',
      'Name: ' + d.name,
      'Telefon: ' + d.telefon,
      'Domain: ' + aktuelleDomain,
      'Gesamtwert: ' + gesamtWert + ' von 100',
      'Geprüft am: ' + berichtDatum,
      'Bericht-Nummer: ' + (berichtId || 'unbekannt'),
      'Wunsch: den detaillierten Bericht persönlich oder per Call besprechen',
    ].join('\n');
  }

  function insMailprogramm(d) {
    window.location.href = 'mailto:' + MAIL
      + '?subject=' + encodeURIComponent('Website-Check besprechen · ' + aktuelleDomain)
      + '&body=' + encodeURIComponent(gespraechText(d));
    gespraechSagen('Ihr Mailprogramm öffnet sich mit der fertigen Nachricht. Bitte dort noch auf «senden» drücken.', 'hinweis');
  }

  gespraechForm.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = {
      name: gespraechWert('name'),
      telefon: gespraechWert('telefon'),
      fangfrage: gespraechWert('fangfrage'),   // Honigtopf, bleibt bei Menschen leer
    };

    var feldName = gespraechForm.querySelector('[name="name"]');
    var feldTelefon = gespraechForm.querySelector('[name="telefon"]');
    var telefonFalsch = d.telefon.replace(/\D/g, '').length < 9;
    feldName.toggleAttribute('aria-invalid', !d.name);
    feldTelefon.toggleAttribute('aria-invalid', telefonFalsch);
    if (!d.name || telefonFalsch) {
      gespraechSagen(!d.name && !d.telefon ? 'Bitte Name und Telefonnummer ausfüllen.'
        : !d.name ? 'Bitte geben Sie Ihren Namen ein.'
        : d.telefon ? 'Bitte prüfen Sie die Telefonnummer, zum Beispiel 044 123 45 67.'
        : 'Bitte geben Sie Ihre Telefonnummer ein.', 'fehler');
      (!d.name ? feldName : feldTelefon).focus();
      return;
    }

    gespraechKnopf.disabled = true;
    gespraechSagen('Wird gesendet …', '');

    var st = window.AbortController ? new AbortController() : null;
    var zeitTimer = window.setTimeout(function () { if (st) st.abort(); }, 30000);
    var optionen = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: d.name,
        mail: 'keine Angabe',
        firma: 'RÜCKRUF',
        telefon: d.telefon,
        nachricht: gespraechText(d),
        fangfrage: d.fangfrage,
        art: 'rueckruf',
        wunschzeit: 'zeitlich flexibel',
      }),
    };
    if (st) optionen.signal = st.signal;

    fetch(ZIEL_KONTAKT, optionen).then(function (antwort) {
      if (!antwort.ok) throw new Error('Dienst antwortet mit ' + antwort.status);
      gespraechForm.hidden = true;
      danke.textContent = 'Danke, dass Sie den vaiacon Website-Check gemacht haben. Wir rufen Sie in der Regel innert eines Arbeitstages an und besprechen den Bericht zu ' + aktuelleDomain + ' mit Ihnen persönlich.';
      danke.hidden = false;
      danke.focus();
    }).catch(function () {
      // Kein Dienst erreichbar: Weg 2, die Nachricht ist ja fertig geschrieben.
      insMailprogramm(d);
    }).then(function () {
      window.clearTimeout(zeitTimer);
      gespraechKnopf.disabled = false;
    });
  });

  // ── Start ────────────────────────────────────────────────────────────────

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (knopf.disabled) return;
    var domain = saeubern(feldDomain.value).toLowerCase();
    if (!DOMAIN_MUSTER.test(domain)) {
      feldFehler(TEXT.eingabe);
      feldDomain.focus();
      return;
    }
    checkStarten(domain);
  });

  feldDomain.addEventListener('input', function () {
    if (!fehlerFeld.hidden) feldFehlerWeg();
  });

  problemKnopf.addEventListener('click', function () {
    var domain = saeubern(feldDomain.value).toLowerCase();
    if (DOMAIN_MUSTER.test(domain)) checkStarten(domain);
    else { feldFehler(TEXT.eingabe); feldDomain.focus(); }
  });

  // Knöpfe «Kostenlosen Website-Check starten →» in Kopf und Schluss der Seite: hinunter zum
  // Formular und gleich ins Feld.
  Array.prototype.forEach.call(document.querySelectorAll('a[href="#check"]'), function (a) {
    a.addEventListener('click', function (ev) {
      ev.preventDefault();
      rollen(document.getElementById('check'), 'start');
      if (window.history && history.replaceState) history.replaceState(null, '', '#check');
      // Am Handy nicht von Hand ins Feld springen (19.10.2026, Android/Chrome): Ein Feld, das ein Skript
      // fokussiert hat, ohne dass die Tastatur aufgeht, ignoriert das Antippen. Dort tippt man selbst.
      if (!window.matchMedia || !window.matchMedia('(pointer: coarse)').matches) feldDomain.focus({ preventScroll: true });
    });
  });

  // Von der Startseite: visibility?domain=ihre-firma.ch#check startet von
  // selbst. Die Domain verschwindet danach aus der Adresszeile, damit ein
  // Neuladen nicht ungefragt einen zweiten Check auslöst.
  var mitgegeben = null;
  try { mitgegeben = new URLSearchParams(window.location.search).get('domain'); } catch (e) { /* alter Browser */ }
  if (mitgegeben) {
    var domain = saeubern(mitgegeben).toLowerCase();
    feldDomain.value = domain;
    if (window.history && history.replaceState) {
      history.replaceState(null, '', window.location.pathname + '#check');
    }
    // Erst nach dem Laden springen: ein weiches Rollen, solange Bilder und
    // Schriften die Seite noch verschieben, bricht der Browser mittendrin ab.
    var hinZumCheck = function () {
      var ziel = document.getElementById('check');
      if (!ziel) return;
      var wurzel = document.documentElement;
      var vorher = wurzel.style.scrollBehavior;
      wurzel.style.scrollBehavior = 'auto';
      ziel.scrollIntoView({ block: 'start' });
      wurzel.style.scrollBehavior = vorher;
      // Läuft der Check schon, soll der Fortschritt im Bild stehen, nicht nur das Formular.
      folgen(ladend, 'start', true);
    };
    if (document.readyState === 'complete') hinZumCheck();
    else window.addEventListener('load', hinZumCheck, { once: true });
    if (DOMAIN_MUSTER.test(domain)) checkStarten(domain);
    else { feldFehler(TEXT.eingabe); feldDomain.focus({ preventScroll: true }); }
  }
})();
