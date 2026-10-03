// vaiaconVisibility — Entwurf des Visibility-Checks (03.10.2026).
//
// WICHTIG: Das hier prüft nichts echt. Es gibt noch keinen Dienst, der eine
// fremde Domain vom Server aus abruft und auswertet — das wäre ein neuer
// Baustein wie der Kontakt-Dienst oder vaiaconBot und eine eigene
// Entscheidung (Hausordnung: neue Werkzeuge, die Daten verarbeiten, werden
// vorher besprochen). Bis dahin zeigt dieses Skript für jede eingegebene
// Domain denselben Beispiel-Befund, nur der Name wird übernommen. Das ist
// ein Entwurf zum Ansehen, keine Funktion für echte Kunden.
(function () {
  var form = document.getElementById('sv-check-form');
  if (!form) return;

  var feldDomain = document.getElementById('sv-check-domain');
  var ladend = document.getElementById('sv-check-ladend');
  var ladendDomain = document.getElementById('sv-check-ladend-domain');
  var report = document.getElementById('sv-check-report');
  var reportDomain = document.getElementById('sv-check-report-domain');
  var reportDatum = document.getElementById('sv-check-report-datum');
  var reportFazit = document.getElementById('sv-check-report-fazit');
  var reportKarten = document.getElementById('sv-check-report-karten');
  var SPEICHER_SCHLUESSEL = 'vaiacon-visibility-check';

  // Beispiel-Befund — feste Werte, unabhängig von der eingegebenen Domain.
  var BEFUND = [
    {
      titel: 'Technisches SEO',
      urteil: 'Ausbaufähig',
      punkte: [
        { art: 'gut', text: 'Seite lädt schnell genug für die meisten Besucher.' },
        { art: 'gut', text: 'Darstellung funktioniert auf dem Handy.' },
        { art: 'hebel', text: 'Titel und Beschreibung sind auf mehreren Seiten identisch, Google kann sie kaum unterscheiden.' },
        { art: 'hebel', text: 'Keine Sitemap gefunden, Google muss die Seiten selbst zusammensuchen.' },
      ],
    },
    {
      titel: 'Strukturierte Daten',
      urteil: 'Lückenhaft',
      punkte: [
        { art: 'gut', text: 'Firmenname und Adresse sind als strukturierte Daten hinterlegt.' },
        { art: 'hebel', text: 'Keine Leistungen oder Angebote in den Daten, nur Fliesstext.' },
        { art: 'hebel', text: 'Keine FAQ-Daten gefunden, Google zeigt dadurch keine erweiterten Suchergebnisse.' },
      ],
    },
    {
      titel: 'KI-Sichtbarkeit (GEO)',
      urteil: 'Kaum vorhanden',
      punkte: [
        { art: 'gut', text: 'Kontaktangaben sind klar auffindbar.' },
        { art: 'hebel', text: 'Keine llms.txt gefunden, KI-Systeme lesen die Seite ohne Vorrang für wichtige Fakten.' },
        { art: 'hebel', text: 'Viele Sätze sind Werbeversprechen («massgeschneidert», «ganzheitlich») statt überprüfbarer Aussagen.' },
      ],
    },
    {
      titel: 'Inhalt & Vertrauen',
      urteil: 'Solide Basis',
      punkte: [
        { art: 'gut', text: 'Impressum und Datenschutzerklärung sind vorhanden.' },
        { art: 'gut', text: 'Leistungen sind in eigenen Worten beschrieben, nicht nur stichwortartig.' },
        { art: 'hebel', text: 'Keine Referenzen oder Kundenstimmen sichtbar.' },
      ],
    },
  ];

  function saeubern(eingabe) {
    var wert = eingabe.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
    return wert || 'ihre-domain.ch';
  }

  function karteBauen(abschnitt) {
    var artikel = document.createElement('article');
    artikel.className = 'sv-card sv-card--sand sv-check__karte';

    var kicker = document.createElement('span');
    kicker.className = 'sv-label';
    kicker.textContent = abschnitt.titel.toUpperCase();
    artikel.appendChild(kicker);

    var urteil = document.createElement('p');
    urteil.className = 'sv-check__karte-urteil';
    urteil.textContent = abschnitt.urteil;
    artikel.appendChild(urteil);

    var liste = document.createElement('ul');
    abschnitt.punkte.forEach(function (punkt) {
      var li = document.createElement('li');
      li.setAttribute('data-art', punkt.art);
      var zeichen = document.createElement('span');
      zeichen.setAttribute('aria-hidden', 'true');
      zeichen.textContent = punkt.art === 'hebel' ? '→' : '✓';
      var text = document.createElement('span');
      text.textContent = punkt.text;
      li.appendChild(zeichen);
      li.appendChild(text);
      liste.appendChild(li);
    });
    artikel.appendChild(liste);

    return artikel;
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var domain = saeubern(feldDomain.value);

    report.hidden = true;
    ladendDomain.textContent = domain;
    ladend.hidden = false;

    window.setTimeout(function () {
      ladend.hidden = true;

      reportDomain.textContent = domain;
      reportDatum.textContent = new Date().toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
      reportFazit.textContent = domain + ' wird von Google grundsätzlich gefunden, aber nicht optimal verstanden. Bei KI-Antworten fehlt die Seite heute meistens. 3 von 4 Bereichen zeigen klare Hebel.';

      reportKarten.innerHTML = '';
      BEFUND.forEach(function (abschnitt) {
        reportKarten.appendChild(karteBauen(abschnitt));
      });

      report.hidden = false;
      report.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Für den Knopf «Bericht an uns schicken»: den Befund zwischenspeichern,
      // damit ihn kontakt.js auf der nächsten Seite findet und das Formular
      // vorausfüllt. Läuft über sessionStorage, bleibt also auf diesem Gerät.
      try {
        window.sessionStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify({
          domain: domain,
          fazit: reportFazit.textContent,
          befund: BEFUND,
        }));
      } catch (e) { /* Privater Modus o.ä.: dann fehlt nur das Vorausfüllen. */ }
    }, 1100);
  });
})();
