/* Kontaktformular der statischen Seiten.

   Die Nachricht geht ueber das Mailprogramm des Besuchers: Das Formular
   schreibt sie fertig, setzt den Betreff und uebergibt sie — es fehlt nur
   noch «senden». So verlaesst nichts das Geraet, bis der Besucher selbst
   sendet, und es ist kein Dienst eines Dritten beteiligt. Am 11.09.2026 von
   Andre so entschieden: «Vorerst genuegt der Weg uebers Mailprogramm.»

   Seit 16.09.2026 steht in ZIEL /api/kontakt: unser eigener Schweizer Server
   (Dienst vaiacon-kontakt, /srv/kontakt) macht aus der Anfrage eine Mail an
   hallo@vaiacon.ch, Antworten geht direkt an den Besucher. Nur wenn der
   Dienst nicht antwortet, faellt das Formular aufs Mailprogramm zurueck.
   ZIEL leer heisst: direkt ins Mailprogramm, ohne Umweg.

   Ein Formulardienst eines Dritten kommt bewusst nicht in Frage — das waere
   eine Bekanntgabe, die niemand entschieden hat. */
(function () {
  var ZIEL = '/api/kontakt';           // unser Server (Dienst vaiacon-kontakt); leer = direkt ins Mailprogramm
  var MAIL = 'hallo@vaiacon.ch';

  var formular = document.querySelector('.vc-kontakt');
  if (!formular) return;

  var knopf = formular.querySelector('button[type="submit"]');
  var meldung = formular.querySelector('.vc-kontakt__meldung');
  var herkunftFeld = document.getElementById('vc-kontakt-herkunft');

  // Kommt der Besucher vom Visibility-Check (visibility-check.js legt das vor
  // dem Sprung hierher ab): Nachricht und Betreff vorausfuellen, quelle und
  // befund gehen beim Senden mit — gleiches Muster wie die Erstanalyse
  // (siehe erstanalyse-data.js, anfrageZusatz). Der eigentliche Versand als
  // PDF mit der Ueberschrift «Anfrage Visibility Check» ist Sache des
  // Dienstes vaiacon-kontakt auf dem Server (kein Repo hier, siehe
  // vaiacon-offene-serverpunkte) — dieses Skript liefert quelle und befund
  // nur zu, baut aber kein PDF.
  var herkunft = null;
  try {
    var roh = window.sessionStorage.getItem('vaiacon-visibility-check');
    if (roh) {
      herkunft = JSON.parse(roh);
      window.sessionStorage.removeItem('vaiacon-visibility-check');
    }
  } catch (e) { /* kein sessionStorage (privater Modus o.ä.): einfach ohne Vorausfuellung weiter */ }

  function befundAlsText(h) {
    var zeilen = ['Anfrage Visibility Check · ' + h.domain, '', h.fazit, ''];
    (h.befund || []).forEach(function (abschnitt) {
      zeilen.push(abschnitt.titel + ' (' + abschnitt.urteil + ')');
      abschnitt.punkte.forEach(function (p) {
        zeilen.push((p.art === 'hebel' ? '→ ' : '✓ ') + p.text);
      });
      zeilen.push('');
    });
    return zeilen.join('\n').trim();
  }

  if (herkunft && herkunft.domain) {
    var nachrichtFeld = formular.querySelector('[name="nachricht"]');
    if (nachrichtFeld && !nachrichtFeld.value) nachrichtFeld.value = befundAlsText(herkunft);
    if (herkunftFeld) {
      herkunftFeld.textContent = 'Vom Visibility-Check für ' + herkunft.domain + ': Ihr Bericht steht unten bereits in der Nachricht. Bitte noch Ihre Kontaktdaten ergänzen.';
      herkunftFeld.hidden = false;
    }
  }

  function wert(name) {
    var feld = formular.querySelector('[name="' + name + '"]');
    return feld ? feld.value.trim() : '';
  }

  function sagen(text, art) {
    meldung.textContent = text;
    meldung.dataset.art = art || '';
  }

  function alsText(d) {
    return [
      'Name: ' + d.name,
      d.firma ? 'Firma: ' + d.firma : null,
      'E-Mail: ' + d.mail,
      d.telefon ? 'Telefon: ' + d.telefon : null,
      '',
      d.nachricht,
    ].filter(function (z) { return z !== null; }).join('\n');
  }

  function insMailprogramm(d) {
    var betreff = herkunft && herkunft.domain
      ? 'Anfrage Visibility Check · ' + herkunft.domain
      : 'Anfrage über vaiacon.ch' + (d.firma ? ' · ' + d.firma : '');
    window.location.href = 'mailto:' + MAIL
      + '?subject=' + encodeURIComponent(betreff)
      + '&body=' + encodeURIComponent(alsText(d));
    sagen('Ihr Mailprogramm öffnet sich mit der fertigen Nachricht. Bitte dort noch auf «senden» drücken.', 'hinweis');
  }

  formular.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d = {
      name: wert('name'),
      firma: wert('firma'),
      mail: wert('mail'),
      telefon: wert('telefon'),
      nachricht: wert('nachricht'),
      fangfrage: wert('fangfrage'),   // Honigtopf, bleibt bei Menschen leer
    };
    if (herkunft && herkunft.domain) {
      d.quelle = 'visibility-check';
      d.befund = { domain: herkunft.domain, fazit: herkunft.fazit, bereiche: herkunft.befund };
    }
    if (!d.name || !d.mail || !d.nachricht) {
      sagen('Bitte Name, E-Mail und Nachricht ausfüllen.', 'fehler');
      return;
    }

    if (!ZIEL) { insMailprogramm(d); return; }

    knopf.disabled = true;
    sagen('Wird gesendet …', '');

    fetch(ZIEL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(d),
    }).then(function (antwort) {
      if (!antwort.ok) throw new Error('Dienst antwortet mit ' + antwort.status);
      formular.reset();
      sagen('Danke, Ihre Nachricht ist bei uns. Wir antworten in der Regel innert eines Arbeitstages.', 'gut');
    }).catch(function () {
      // Kein Dienst erreichbar: Weg 2. Kein Fehler für den Besucher, nur ein
      // anderer Weg — die Nachricht ist ja fertig geschrieben.
      insMailprogramm(d);
    }).then(function () {
      knopf.disabled = false;
    });
  });
})();
