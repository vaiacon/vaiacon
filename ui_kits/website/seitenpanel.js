/* Seitenpanel zur Orientierung. */
(function () {
  var BEREICHE = [
    { seite: 'index', titel: 'Start', abschnitte: [
      ['willkommen', 'Wer wir sind'], ['wegweiser', 'Wo anfangen?'], ['haltung', 'Wofür wir stehen'],
      ['ablauf', 'So fängt es an'], ['fragen', 'Häufige Fragen'], ['kontakt', 'Nächster Schritt']] },
    { seite: 'learning', titel: 'KI-Kompetenz', abschnitte: [
      ['top', 'Überblick'], ['lernreise', 'Die Lernreise'], ['formate', 'Die Formate'],
      ['themen', 'Themenkatalog'], ['kleine-schritte', 'Kleine Schritte'],
      ['standortbestimmung', 'Standortbestimmung'], ['kontakt', 'Nächster Schritt']] },
    { seite: 'visibility', titel: 'Sichtbarkeit', abschnitte: [
      ['top', 'Überblick'], ['check', 'Kostenloser Website-Check'], ['einfach-erklaert', 'Einfach erklärt'],
      ['seo', 'SEO: für Google'], ['geo', 'GEO: für KI-Assistenten'], ['ablauf', 'Ablauf'],
      ['kontakt', 'Nächster Schritt']] },
    { seite: 'bot', titel: 'Automationen', abschnitte: [
      ['top', 'Überblick'], ['bausteine', 'Bausteine'], ['preise', 'Beispiele nach Branche'],
      ['beispiele', 'So sieht es im Alltag aus'], ['ihr-fall', 'Ihr Fall']] }
  ];
  var WEITERE = [['ki-kmu-news/', 'KI-News für KMU'], ['faq', 'FAQ'], ['ueber-uns', 'Über uns'], ['kontakt', 'Kontakt']];

  var tiefe = location.pathname.indexOf('/ki-kmu-news/') > -1 ? '../' : '';
  var name = (location.pathname.split('/').pop() || 'index').replace(/\.html$/, '') || 'index';
  if (tiefe) name = 'news';

  var panel = document.createElement('aside');
  panel.className = 'sp-panel';
  panel.id = 'sp-panel';
  panel.setAttribute('aria-label', 'Inhalt der Website');
  var html = '<p class="sp-kopf">Übersicht</p><nav class="sp-baum">';
  BEREICHE.forEach(function (b) {
    var aktiv = b.seite === name;
    var ziel = b.seite === 'index' ? './' : b.seite;
    html += '<details class="sp-bereich' + (aktiv ? ' sp-bereich--aktiv' : '') + '"' + (aktiv ? ' open' : '') + '>' +
      '<summary><a href="' + tiefe + ziel + '">' + b.titel + '</a></summary><ul>';
    b.abschnitte.forEach(function (a) {
      html += '<li><a data-sp-ziel="' + a[0] + '" href="' + (aktiv ? '' : tiefe + ziel) + '#' + a[0] + '">' + a[1] + '</a></li>';
    });
    html += '</ul></details>';
  });
  html += '</nav><ul class="sp-weitere">';
  WEITERE.forEach(function (w) {
    var an = (w[0] === 'ki-kmu-news/' && name === 'news') || w[0] === name;
    html += '<li><a' + (an ? ' class="an"' : '') + ' href="' + tiefe + w[0] + '">' + w[1] + '</a></li>';
  });
  html += '</ul>';
  panel.innerHTML = html;
  document.body.appendChild(panel);
  document.documentElement.classList.add('mit-seitenpanel');

  var knopf = document.createElement('button');
  knopf.type = 'button';
  knopf.className = 'sp-knopf';
  knopf.setAttribute('aria-controls', 'sp-panel');
  knopf.setAttribute('aria-expanded', 'false');
  knopf.innerHTML = '<span aria-hidden="true">☰</span> Inhalt';
  document.body.appendChild(knopf);
  var schleier = document.createElement('div');
  schleier.className = 'sp-schleier';
  document.body.appendChild(schleier);
  var burger = document.querySelector('.mock-menu-toggle');
  function zu() {
    document.documentElement.classList.remove('sp-offen');
    knopf.setAttribute('aria-expanded', 'false');
    if (burger) burger.setAttribute('aria-expanded', 'false');
  }
  // Das ☰ der Kopfzeile öffnet das Panel statt des alten Mobilmenüs.
  if (burger) {
    burger.setAttribute('aria-controls', 'sp-panel');
    document.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.mock-menu-toggle')) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      var offen = document.documentElement.classList.toggle('sp-offen');
      burger.setAttribute('aria-expanded', String(offen));
    }, true);
  }
  knopf.addEventListener('click', function () {
    var offen = document.documentElement.classList.toggle('sp-offen');
    knopf.setAttribute('aria-expanded', String(offen));
  });
  schleier.addEventListener('click', zu);
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) zu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') zu(); });

  /* Der aktuelle Abschnitt wird beim Scrollen hervorgehoben. */
  var links = [].slice.call(panel.querySelectorAll('.sp-bereich--aktiv [data-sp-ziel]'));
  var ziele = links.map(function (l) { return document.getElementById(l.dataset.spZiel); }).filter(Boolean);
  function markieren() {
    var linie = window.innerHeight * 0.3, aktuell = ziele[0];
    ziele.forEach(function (z) { if (z.getBoundingClientRect().top <= linie) aktuell = z; });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) aktuell = ziele[ziele.length - 1];
    links.forEach(function (l) { l.classList.toggle('an', aktuell && l.dataset.spZiel === aktuell.id); });
  }
  if (ziele.length) {
    window.addEventListener('scroll', markieren, { passive: true });
    window.addEventListener('resize', markieren);
    markieren();
  }
})();
