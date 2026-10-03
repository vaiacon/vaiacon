// vaiaconVisibility — Entwurf des Visibility-Checks (03.10.2026).
//
// WICHTIG: Das hier prüft nichts echt. Es gibt noch keinen Dienst, der eine
// fremde Domain vom Server aus abruft und auswertet — das wäre ein neuer
// Baustein wie der Kontakt-Dienst oder vaiaconBot und eine eigene
// Entscheidung (Hausordnung: neue Werkzeuge, die Daten verarbeiten, werden
// vorher besprochen). Der Bildschirm zeigt darum bewusst keine erfundenen
// Befunde zu der eingegebenen Domain, nur das Versprechen, welche vier
// Bereiche wir prüfen und dass ein Bericht per Mail folgt. Das ist ein
// Entwurf zum Ansehen, keine Funktion für echte Kunden.
(function () {
  var form = document.getElementById('sv-check-form');
  if (!form) return;

  var feldDomain = document.getElementById('sv-check-domain');
  var ladend = document.getElementById('sv-check-ladend');
  var ladendDomain = document.getElementById('sv-check-ladend-domain');
  var report = document.getElementById('sv-check-report');
  var reportDomain = document.getElementById('sv-check-report-domain');
  var reportDatum = document.getElementById('sv-check-report-datum');
  var reportKarten = document.getElementById('sv-check-report-karten');
  var SPEICHER_SCHLUESSEL = 'vaiacon-visibility-check';

  // Die vier Bereiche, die wir prüfen — ohne jede Aussage zur eingegebenen
  // Domain, das ist bewusst gleich für alle.
  var BEREICHE = [
    { titel: 'Technisches SEO', text: 'Ladezeit, mobile Darstellung, Seitentitel und technische Grundlagen.' },
    { titel: 'Strukturierte Daten', text: 'Ob Google Ihre Firma, Leistungen und Angebote maschinenlesbar versteht.' },
    { titel: 'KI-Sichtbarkeit (GEO)', text: 'Ob KI-Systeme Ihre Seite als verlässliche Quelle erkennen.' },
    { titel: 'Inhalt & Vertrauen', text: 'Referenzen, Aktualität und Vertrauenssignale Ihrer Website.' },
  ];

  function saeubern(eingabe) {
    var wert = eingabe.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
    return wert || 'ihre-domain.ch';
  }

  function karteBauen(bereich) {
    var artikel = document.createElement('article');
    artikel.className = 'sv-card sv-card--sand sv-check__karte';

    var kicker = document.createElement('span');
    kicker.className = 'sv-label';
    kicker.textContent = bereich.titel.toUpperCase();
    artikel.appendChild(kicker);

    var text = document.createElement('p');
    text.className = 'sv-check__karte-text';
    text.textContent = bereich.text;
    artikel.appendChild(text);

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

      reportKarten.innerHTML = '';
      BEREICHE.forEach(function (bereich) {
        reportKarten.appendChild(karteBauen(bereich));
      });

      report.hidden = false;
      report.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Für den Knopf «Bericht anfordern»: Domain zwischenspeichern, damit
      // kontakt.js auf der naechsten Seite die Nachricht damit vorausfuellt.
      // Laeuft ueber sessionStorage, bleibt also auf diesem Geraet.
      try {
        window.sessionStorage.setItem(SPEICHER_SCHLUESSEL, JSON.stringify({
          domain: domain,
          bereiche: BEREICHE.map(function (b) { return b.titel; }),
        }));
      } catch (e) { /* Privater Modus o.ä.: dann fehlt nur das Vorausfüllen. */ }
    }, 900);
  });
})();
