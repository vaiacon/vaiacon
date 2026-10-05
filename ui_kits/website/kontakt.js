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
   eine Bekanntgabe, die niemand entschieden hat.

   Bis 04.10.2026 fuellte das Formular die Nachricht vor, wenn der Besucher
   vom Visibility-Check kam (sessionStorage 'vaiacon-visibility-check').
   Seither bestellt man den Bericht direkt unter dem Ergebnis auf
   visibility.html (POST /api/sichtbarkeit/bestellen), die Uebergabe
   hierher ist weg.

   Seit Oktober 2026 gibt es zwei Formulare: die Nachricht und den Rückruf
   (data-art="rueckruf"). Der Rückruf nimmt denselben Weg. Weil der Dienst
   eine Mailadresse verlangt und kein eigenes Rückruffeld kennt, steht die
   Angabe im Text der Nachricht, im Feld firma steht «RÜCKRUF» (daran sieht
   man es im Betreff) und zusätzlich geht art=rueckruf mit; ein Feld, das der
   Dienst heute noch ignoriert. */
(function () {
  var ZIEL = window.VAIACON_API_BASIS + '/api/kontakt';           // unser Server (Dienst vaiacon-kontakt); leer wäre: direkt ins Mailprogramm
  var MAIL = 'hallo@vaiacon.ch';

  var formulare = document.querySelectorAll('.vc-kontakt');
  Array.prototype.forEach.call(formulare, einrichten);

  function einrichten(formular) {
  var rueckruf = formular.getAttribute('data-art') === 'rueckruf';
  var knopf = formular.querySelector('button[type="submit"]');
  var meldung = formular.querySelector('.vc-kontakt__meldung');

  function wert(name) {
    var feld = formular.querySelector('[name="' + name + '"]');
    if (!feld) return '';
    if (feld.type === 'radio') {
      var gewaehlt = formular.querySelector('[name="' + name + '"]:checked');
      return gewaehlt ? gewaehlt.value : '';
    }
    return feld.value.trim();
  }

  function sagen(text, art) {
    meldung.textContent = text;
    meldung.dataset.art = art || '';
  }

  function alsText(d) {
    if (rueckruf) {
      return [
        'RÜCKRUFWUNSCH',
        'Name: ' + d.name,
        'Telefon: ' + d.telefon,
        'Wunschzeit: ' + d.wunschzeit,
        d.stichwort ? 'Stichwort: ' + d.stichwort : null,
      ].filter(function (z) { return z !== null; }).join('\n');
    }
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
    var betreff = rueckruf
      ? 'Rückrufwunsch über vaiacon.ch · ' + d.wunschzeit
      : 'Anfrage über vaiacon.ch' + (d.firma ? ' · ' + d.firma : '');
    window.location.href = 'mailto:' + MAIL
      + '?subject=' + encodeURIComponent(betreff)
      + '&body=' + encodeURIComponent(alsText(d));
    sagen('Ihr Mailprogramm öffnet sich mit der fertigen Nachricht. Bitte dort noch auf «senden» drücken.', 'hinweis');
  }

  formular.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var d;
    if (rueckruf) {
      d = {
        name: wert('name'),
        telefon: wert('telefon'),
        wunschzeit: wert('wunschzeit') || 'egal',
        stichwort: wert('stichwort'),
        fangfrage: wert('fangfrage'),
      };
      if (!d.name || !d.telefon) {
        sagen('Bitte Name und Telefonnummer ausfüllen.', 'fehler');
        return;
      }
    } else {
      d = {
        name: wert('name'),
        firma: wert('firma'),
        mail: wert('mail'),
        telefon: wert('telefon'),
        nachricht: wert('nachricht'),
        fangfrage: wert('fangfrage'),   // Honigtopf, bleibt bei Menschen leer
      };
      if (!d.name || !d.mail || !d.nachricht) {
        sagen('Bitte Name, E-Mail und Nachricht ausfüllen.', 'fehler');
        return;
      }
    }

    if (!ZIEL) { insMailprogramm(d); return; }

    // Was an den Dienst geht: beim Rückruf in die bekannten Felder verpackt.
    var senden = d;
    if (rueckruf) {
      senden = {
        name: d.name,
        mail: 'keine Angabe',
        firma: 'RÜCKRUF',
        telefon: d.telefon,
        nachricht: alsText(d),
        fangfrage: d.fangfrage,
        art: 'rueckruf',
        wunschzeit: d.wunschzeit,
      };
    }

    knopf.disabled = true;
    sagen('Wird gesendet …', '');

    fetch(ZIEL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(senden),
    }).then(function (antwort) {
      if (!antwort.ok) throw new Error('Dienst antwortet mit ' + antwort.status);
      formular.reset();
      sagen(rueckruf
        ? 'Danke. Wir rufen Sie zurück, zum gewünschten Zeitpunkt.'
        : 'Danke, Ihre Nachricht ist bei uns. Wir antworten in der Regel innert eines Arbeitstages.', 'gut');
    }).catch(function () {
      // Kein Dienst erreichbar: Weg 2. Kein Fehler für den Besucher, nur ein
      // anderer Weg — die Nachricht ist ja fertig geschrieben.
      insMailprogramm(d);
    }).then(function () {
      knopf.disabled = false;
    });
  });
  }
})();
