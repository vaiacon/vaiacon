/* Navigation der Website: Kopfzeile (wird beim Scrollen zur Pille), Ausklapp-Fläche am
 * Computer, Menü über die ganze Fläche auf Handy und Tablet, vollständige Fusszeile und
 * «Auf dieser Seite». Die Menüstruktur steht einmal hier (MENUE, MEHR, FUSS, SEITEN).
 * Die alte Kopfzeile (.mock-header) bleibt im HTML und wird per CSS ausgeblendet. */
(function () {
  'use strict';

  /* ---------- Wo liegt die Website? ---------- */
  var skript = document.currentScript;
  var wurzel = '/';
  try {
    wurzel = new URL(skript.src, location.href).pathname.replace(/ui_kits\/website\/navigation\.js$/, '');
  } catch (e) { /* Wurzel bleibt '/' */ }

  var rel = location.pathname.slice(wurzel.length).replace(/\.html$/, '').replace(/\/index$/, '/');
  var seite = rel === '' ? 'start'
    : rel.indexOf('ki-kmu-news') === 0 ? 'news'
    : rel.indexOf('automationen-') === 0 ? 'bot'
    : rel.indexOf('erstanalyse') === 0 ? 'erstanalyse'
    : rel.replace(/\/$/, '');

  /* ---------- Inhalte ---------- */
  var BRANCHEN = [
    ['malerbetrieb', 'Malerbetrieb', 'Mehrfach abtippen: Aufmass, Rapport, Offerte'],
    ['treuhand', 'Treuhand', 'Belege kommen spät, unvollständig, durcheinander'],
    ['arztpraxis', 'Arztpraxis', 'Leere Stühle durch nicht abgesagte Termine'],
    ['sanitaer-heizung', 'Sanitär und Heizung', 'Regierapport täglich erfassen und unterschreiben'],
    ['agentur', 'Agentur', 'Monatsberichte zusammentragen frisst Stunden'],
    ['restaurant', 'Restaurant', 'Reservierte Tische bleiben leer'],
    ['immobilien', 'Immobilien', 'Gleiche Interessentenfragen, jeden Tag neu'],
    ['alle', 'Für alle Branchen', 'Aufgaben, die in jedem Betrieb vorkommen']
  ];

  /* Jeder Punkt: [Ziel, Titel, Zeile]. Ziel = Seite oder Seite#anker. */
  var MENUE = [
    { id: 'bot', seite: 'bot', titel: 'Automationen',
      text: 'Viele wiederkehrende Aufgaben lassen sich automatisieren.',
      spalten: [
        { titel: 'Aufbau', punkte: [
          ['bot#bausteine', 'Bausteine', 'Immer dieselben fünf Teile, für Ihren Betrieb zusammengesetzt.'],
          ['bot#beispiele', 'Beispiele im Alltag', 'Belege, Offerten und Freigaben laufen von selbst.'],
          ['bot#ihr-fall', 'Ihr Fall', 'Beschreiben Sie in zwei Sätzen, was jede Woche Zeit frisst.']
        ] },
        { titel: 'Nach Branche', breit: true, punkte: BRANCHEN.map(function (b) {
          return ['bot#branche-' + b[0], b[1], b[2]];
        }) }
      ] },
    { id: 'learning', seite: 'learning', titel: 'KI-Kompetenz',
      text: 'Formate, die über Wochen ineinandergreifen.',
      spalten: [
        { titel: 'Lernen im Betrieb', breit: true, punkte: [
          ['learning#lernreise', 'Die Lernreise', 'Stationen, die über Wochen ineinandergreifen.'],
          ['learning#formate', 'Die Formate', 'Sieben Formate, die sich kombinieren lassen.'],
          ['learning#themen', 'Themenkatalog', 'Ihr Training aus Bausteinen.'],
          ['learning#kleine-schritte', 'Kleine Schritte', 'Kurze Übungen, damit das Gelernte im Alltag bleibt.'],
          ['learning#standortbestimmung', 'Standortbestimmung', 'Zwölf kurze Fragen: Wo steht Ihr Betrieb mit KI?']
        ] }
      ] },
    { id: 'visibility', seite: 'visibility', titel: 'Sichtbarkeit',
      text: 'Damit Google und KI-Assistenten Ihr Angebot verstehen.',
      spalten: [
        { titel: 'Gefunden werden', breit: true, punkte: [
          ['visibility#check', 'Website-Check', 'Wie gut ist Ihre Website für Google und KI-Assistenten vorbereitet?'],
          ['visibility#einfach-erklaert', 'Einfach erklärt', 'Sichtbarkeit beginnt damit, dass Ihr Angebot verstanden wird.'],
          ['visibility#seo', 'SEO', 'Damit Google Ihr Angebot einordnen kann.'],
          ['visibility#geo', 'GEO', 'Damit KI-Assistenten Ihre Firma verstehen.'],
          ['visibility#ablauf', 'Ablauf', 'So wird aus Sichtbarkeit ein System.']
        ] }
      ] },
    { id: 'service', seite: 'service', titel: 'Betreuung',
      text: 'Was läuft, braucht jemanden, der hinschaut.',
      spalten: [
        { titel: 'Betreuung und Begleitung', breit: true, punkte: [
          ['service#warum', 'Warum Betreuung', 'Was heute gut läuft, braucht Pflege.'],
          ['service#angebot', 'Das Angebot', 'Eine Anlaufstelle für unser ganzes Angebot.'],
          ['service#betreuung', 'Betreuung', 'Für alle Automationen und Chatbots, die wir gebaut haben.'],
          ['service#zeit', 'Begleitung', 'Regelmässige Beratung oder zuerst eine Standortanalyse.'],
          ['erstanalyse/', 'Kostenlose Erstanalyse', 'Der Fragebogen für den ersten Überblick.']
        ] }
      ] }
  ];

  var MEHR = [
    ['ueber-uns', 'Über uns', 'Zwei Unternehmer, die den Geschäftsalltag kennen.', 'ueber-uns'],
    ['referenzen', 'Aus der Praxis', 'Eine Kundin erzählt.', 'referenzen'],
    ['faq', 'Häufige Fragen', 'Antworten, nach Bereich geordnet.', 'faq'],
    ['ki-kmu-news/', 'KI-News für KMU', 'Was sich in der KI-Welt tut, für Schweizer KMU eingeordnet.', 'news']
  ];

  var FUSS = [
    { titel: 'Angebot', links: [
      ['bot', 'Automationen'], ['visibility', 'Sichtbarkeit'], ['learning', 'KI-Kompetenz'],
      ['service', 'Betreuung und Begleitung'], ['erstanalyse/', 'Kostenlose Erstanalyse']] },
    { titel: 'Lernen', links: [
      ['learning#lernreise', 'Die Lernreise'], ['learning#formate', 'Die Formate'],
      ['learning#themen', 'Themenkatalog'], ['learning#standortbestimmung', 'Standortbestimmung']] },
    { titel: 'Firma', links: [
      ['ueber-uns', 'Über uns'], ['referenzen', 'Aus der Praxis'], ['faq', 'FAQ'],
      ['ki-kmu-news/', 'KI-News für KMU'], ['kontakt', 'Kontakt']] }
  ];
  var RECHT = [['datenschutz', 'Datenschutz'], ['impressum', 'Impressum'], ['agb', 'AGB']];

  /* «Auf dieser Seite»: [Anker, Beschriftung] */
  var SEITEN = {
    bot: [['bausteine', 'Bausteine'], ['preise', 'Branchen'], ['beispiele', 'Im Alltag'], ['ihr-fall', 'Ihr Fall']],
    learning: [['lernreise', 'Lernreise'], ['formate', 'Formate'], ['themen', 'Themenkatalog'],
      ['kleine-schritte', 'Kleine Schritte'], ['standortbestimmung', 'Standortbestimmung']],
    faq: [['faq-allgemein', 'Allgemein'], ['faq-learning', 'KI-Kompetenz'], ['faq-bot', 'Automationen'],
      ['faq-visibility', 'Sichtbarkeit'], ['faq-service', 'Betreuung']]
  };

  /* ---------- Helfer ---------- */
  function esc(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  /* Ziel «bot#bausteine» → Verweis. Auf der eigenen Seite nur '#bausteine'. */
  function href(ziel) {
    var t = ziel.split('#'), s = t[0], a = t[1] ? '#' + t[1] : '';
    if (s && s === seite && a) return a;
    if (s === '' ) return wurzel;
    return wurzel + s + a;
  }
  function el(tag, klasse, html) {
    var e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (html != null) e.innerHTML = html;
    return e;
  }
  var PFEIL = '<svg class="vn-pfeil" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var weniger = window.matchMedia('(prefers-reduced-motion: reduce)');
  var schmal = window.matchMedia('(max-width: 999px)');
  var hover = window.matchMedia('(hover: hover)');

  function istAktuell(s) { return s === seite; }

  /* ---------- Kopfzeile ---------- */
  var kopf = el('header', 'vn');
  kopf.id = 'vn';
  var hell = !!document.querySelector('.ea-wrap, #root .ea-wrap') || /erstanalyse/.test(rel);
  if (hell) kopf.className += ' vn--hell';

  var h = '<div class="vn-leiste">' +
    '<a class="vn-logo" href="' + wurzel + '" aria-label="vaiacon Start">' +
    '<img class="vn-logo__hell" src="' + wurzel + 'assets/logo-lockup-white.svg" alt="" width="214" height="39">' +
    '<img class="vn-logo__dunkel" src="' + wurzel + 'assets/logo-lockup-terra.svg" alt="vaiacon" width="214" height="39"></a>' +
    '<nav class="vn-haupt" aria-label="Hauptnavigation"><ul class="vn-liste">';
  MENUE.forEach(function (g) {
    var aktuell = istAktuell(g.seite);
    h += '<li class="vn-eintrag" data-id="' + g.id + '">' +
      '<a class="vn-punkt" href="' + wurzel + g.seite + '"' + (aktuell ? ' aria-current="page"' : '') + '>' + esc(g.titel) + '</a>' +
      '<button class="vn-auf" type="button" aria-expanded="false" aria-controls="vn-f-' + g.id + '" aria-label="' + esc(g.titel) + ': Unterpunkte">' + PFEIL + '</button>' +
      '<div class="vn-flaeche" id="vn-f-' + g.id + '"><div class="vn-karte">' +
      '<div class="vn-intro"><p class="vn-kicker">' + esc(g.titel) + '</p><p class="vn-lead">' + esc(g.text) + '</p>' +
      '<a class="vn-zur" href="' + wurzel + g.seite + '">Zur Seite ' + esc(g.titel) + ' <span aria-hidden="true">→</span></a></div>' +
      '<div class="vn-spalten">';
    g.spalten.forEach(function (sp) {
      h += '<div class="vn-spalte' + (sp.breit ? ' vn-spalte--breit' : '') + '"><p class="vn-spalte__titel">' + esc(sp.titel) + '</p><ul>';
      sp.punkte.forEach(function (p) {
        h += '<li><a href="' + href(p[0]) + '"><span class="vn-t">' + esc(p[1]) + '</span><span class="vn-z">' + esc(p[2]) + '</span></a></li>';
      });
      h += '</ul></div>';
    });
    h += '</div><div class="vn-mehr"><p class="vn-spalte__titel">Mehr</p><ul>';
    MEHR.forEach(function (m) {
      h += '<li><a href="' + wurzel + m[0] + '"' + (istAktuell(m[3]) ? ' aria-current="page"' : '') + '><span class="vn-t">' + esc(m[1]) + '</span><span class="vn-z">' + esc(m[2]) + '</span></a></li>';
    });
    h += '</ul></div></div></div></li>';
  });
  h += '</ul></nav>' +
    '<a class="vn-kontakt" href="' + wurzel + 'kontakt"' + (seite === 'kontakt' ? ' aria-current="page"' : '') + '>Kontakt</a>' +
    '<button class="vn-menue" type="button" aria-expanded="false" aria-controls="vn-voll" aria-label="Menü öffnen">' +
    '<span class="vn-menue__text">Menü</span><span class="vn-menue__balken" aria-hidden="true"><i></i><i></i></span></button>' +
    '</div>';
  kopf.innerHTML = h;

  /* ---------- Menü über die ganze Fläche ---------- */
  var voll = el('div', 'vn-voll');
  voll.id = 'vn-voll';
  voll.setAttribute('role', 'dialog');
  voll.setAttribute('aria-modal', 'true');
  voll.setAttribute('aria-label', 'Menü');
  var v = '<div class="vn-voll__kopf">' +
    '<a class="vn-voll__logo" href="' + wurzel + '" aria-label="vaiacon Start"><img src="' + wurzel + 'assets/logo-lockup-terra.svg" alt="vaiacon" width="214" height="39"></a>' +
    '<button class="vn-voll__zu" type="button">Schliessen <span aria-hidden="true">×</span></button></div>' +
    '<div class="vn-voll__inhalt"><ul class="vn-v-liste">';
  MENUE.forEach(function (g) {
    var offen = istAktuell(g.seite);
    v += '<li class="vn-v-gruppe"><div class="vn-v-kopf">' +
      '<a class="vn-v-haupt" href="' + wurzel + g.seite + '"' + (offen ? ' aria-current="page"' : '') + '><span class="vn-v-titel">' + esc(g.titel) + '</span><span class="vn-v-zeile">' + esc(g.text) + '</span></a>' +
      '<button class="vn-v-auf" type="button" aria-expanded="' + offen + '" aria-controls="vn-v-' + g.id + '" aria-label="' + esc(g.titel) + ': Unterpunkte">' + PFEIL + '</button></div>' +
      '<ul class="vn-v-unter" id="vn-v-' + g.id + '"' + (offen ? '' : ' hidden') + '>';
    g.spalten.forEach(function (sp) {
      sp.punkte.forEach(function (p) {
        v += '<li><a href="' + href(p[0]) + '">' + esc(p[1]) + '</a></li>';
      });
    });
    v += '</ul></li>';
  });
  v += '</ul><p class="vn-v-mehr">Mehr</p><ul class="vn-v-liste vn-v-liste--mehr">';
  MEHR.forEach(function (m) {
    v += '<li class="vn-v-gruppe"><a class="vn-v-haupt vn-v-haupt--klein" href="' + wurzel + m[0] + '"' + (istAktuell(m[3]) ? ' aria-current="page"' : '') + '><span class="vn-v-titel">' + esc(m[1]) + '</span><span class="vn-v-zeile">' + esc(m[2]) + '</span></a></li>';
  });
  v += '</ul><a class="vn-v-kontakt" href="' + wurzel + 'kontakt">Kontakt aufnehmen</a></div>';
  voll.innerHTML = v;

  document.body.insertBefore(kopf, document.body.firstChild);
  document.body.appendChild(voll);
  document.documentElement.classList.add('vn-an');

  /* ---------- Ausklapp-Fläche (Computer) ---------- */
  var eintraege = [].slice.call(kopf.querySelectorAll('.vn-eintrag'));
  var offenId = null, fest = false, zuTimer = null;

  function setze(id, istFest) {
    eintraege.forEach(function (li) {
      var an = li.getAttribute('data-id') === id;
      li.classList.toggle('ist-offen', an);
      li.querySelector('.vn-auf').setAttribute('aria-expanded', String(an));
    });
    offenId = id;
    fest = id ? !!istFest : false;
    kopf.classList.toggle('hat-offen', !!id);
    if (id) zeigen();
  }
  function schliessen(fokus) {
    var vorher = offenId;
    clearTimeout(zuTimer);
    setze(null);
    if (fokus && vorher) {
      var b = kopf.querySelector('.vn-eintrag[data-id="' + vorher + '"] .vn-auf');
      if (b) b.focus();
    }
  }
  eintraege.forEach(function (li) {
    var id = li.getAttribute('data-id');
    li.addEventListener('mouseenter', function () {
      if (schmal.matches || !hover.matches) return;
      clearTimeout(zuTimer);
      if (offenId !== id) setze(id, false);
    });
    li.addEventListener('mouseleave', function () {
      if (schmal.matches || !hover.matches || fest) return;
      clearTimeout(zuTimer);
      zuTimer = setTimeout(function () { if (!fest) setze(null); }, 150);
    });
    li.querySelector('.vn-auf').addEventListener('click', function () {
      if (offenId === id && (fest || !hover.matches)) setze(null);
      else setze(id, true);
    });
  });
  kopf.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && offenId) { e.preventDefault(); schliessen(true); }
  });
  kopf.addEventListener('click', function (e) {
    if (e.target.closest('.vn-flaeche a')) { clearTimeout(zuTimer); setze(null); }
  });
  kopf.addEventListener('focusout', function () {
    setTimeout(function () { if (offenId && !kopf.contains(document.activeElement) && fest) setze(null); }, 0);
  });
  document.addEventListener('click', function (e) {
    if (offenId && !e.target.closest('.vn-eintrag')) setze(null);
  });

  /* ---------- Menü über die ganze Fläche (Handy, Tablet) ---------- */
  var menueKnopf = kopf.querySelector('.vn-menue');
  var zuKnopf = voll.querySelector('.vn-voll__zu');
  var vOffen = false;
  function fokussierbar() {
    return [].slice.call(voll.querySelectorAll('a[href], button')).filter(function (n) {
      return n.offsetParent !== null || n === document.activeElement;
    });
  }
  function vauf() {
    if (vOffen) return;
    vOffen = true;
    setze(null);
    voll.classList.add('ist-offen');
    document.documentElement.classList.add('vn-sperre');
    menueKnopf.setAttribute('aria-expanded', 'true');
    menueKnopf.setAttribute('aria-label', 'Menü schliessen');
    voll.scrollTop = 0;
    zuKnopf.focus();
  }
  function vzu(fokus) {
    if (!vOffen) return;
    vOffen = false;
    voll.classList.remove('ist-offen');
    document.documentElement.classList.remove('vn-sperre');
    menueKnopf.setAttribute('aria-expanded', 'false');
    menueKnopf.setAttribute('aria-label', 'Menü öffnen');
    if (fokus) menueKnopf.focus();
  }
  menueKnopf.addEventListener('click', function () { vOffen ? vzu(true) : vauf(); });
  zuKnopf.addEventListener('click', function () { vzu(true); });
  voll.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (a) vzu(false);
  });
  voll.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.preventDefault(); vzu(true); return; }
    if (e.key !== 'Tab') return;
    var f = fokussierbar();
    if (!f.length) return;
    var erst = f[0], letzt = f[f.length - 1];
    if (e.shiftKey && document.activeElement === erst) { e.preventDefault(); letzt.focus(); }
    else if (!e.shiftKey && document.activeElement === letzt) { e.preventDefault(); erst.focus(); }
    else if (!voll.contains(document.activeElement)) { e.preventDefault(); erst.focus(); }
  });
  [].forEach.call(voll.querySelectorAll('.vn-v-auf'), function (b) {
    b.addEventListener('click', function () {
      var an = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(an));
      document.getElementById(b.getAttribute('aria-controls')).hidden = !an;
    });
  });
  function breiteWechsel() { if (!schmal.matches) vzu(false); else setze(null); }
  if (schmal.addEventListener) schmal.addEventListener('change', breiteWechsel);
  else if (schmal.addListener) schmal.addListener(breiteWechsel);

  /* ---------- Pille und Wegsgleiten ---------- */
  var letzteY = Math.max(0, window.pageYOffset || 0), pille = false, weg = false, wartet = false;
  function zeigen() { weg = false; kopf.classList.remove('vn--weg'); }
  function beiScroll() {
    wartet = false;
    var y = Math.max(0, window.pageYOffset || 0);
    if (!pille && y > 40) pille = true;
    else if (pille && y < 20) pille = false;
    kopf.classList.toggle('vn--pille', pille);
    var gehalten = vOffen || offenId || kopf.contains(document.activeElement) && kopf.matches(':focus-within');
    if (gehalten || y <= 200) weg = false;
    else if (y > letzteY) weg = true;
    else if (y < letzteY) weg = false;
    kopf.classList.toggle('vn--weg', weg);
    if (offenId && y > letzteY + 4 && !fest) setze(null);
    letzteY = y;
  }
  window.addEventListener('scroll', function () {
    if (!wartet) { wartet = true; requestAnimationFrame(beiScroll); }
  }, { passive: true });
  kopf.addEventListener('focusin', zeigen);
  beiScroll();

  /* ---------- Fusszeile ---------- */
  function spaltenHtml(klasse, titelKlasse) {
    return FUSS.map(function (s) {
      return '<nav class="' + klasse + '" aria-label="' + esc(s.titel) + '"><p class="' + titelKlasse + '">' + esc(s.titel) + '</p>' +
        s.links.map(function (l) { return '<a href="' + href(l[0]) + '">' + esc(l[1]) + '</a>'; }).join('') + '</nav>';
    }).join('');
  }
  var fuss = document.querySelector('footer.vb-fuss');
  if (fuss) {
    var alt = [].slice.call(fuss.querySelectorAll('nav.vb-fuss__spalte'));
    if (alt.length) {
      var neu = document.createElement('div');
      neu.innerHTML = spaltenHtml('vb-fuss__spalte', 'vb-fuss__titel');
      var ref = alt[0];
      while (neu.firstChild) ref.parentNode.insertBefore(neu.firstChild, ref);
      alt.forEach(function (n) { n.parentNode.removeChild(n); });
    }
    var recht = fuss.querySelector('.vb-fuss__basis nav');
    if (recht && !fuss.querySelector('.vn-rechtspalte')) {
      var rs = document.createElement('nav');
      rs.className = 'vb-fuss__spalte vn-rechtspalte';
      rs.setAttribute('aria-label', 'Rechtliches');
      rs.innerHTML = '<p class="vb-fuss__titel">Rechtliches</p>' +
        RECHT.map(function (l) { return '<a href="' + wurzel + l[0] + '">' + esc(l[1]) + '</a>'; }).join('');
      var kd = fuss.querySelector('div.vb-fuss__spalte');
      if (kd) kd.parentNode.insertBefore(rs, kd);
      recht.parentNode.removeChild(recht);
    }
  } else {
    var links = document.querySelector('footer.sv-footer .sv-footer__links');
    if (links) {
      var bl = el('div', 'vn-fuss');
      bl.innerHTML = spaltenHtml('vn-fuss__spalte', 'vn-fuss__titel') +
        '<nav class="vn-fuss__spalte" aria-label="Rechtliches"><p class="vn-fuss__titel">Rechtliches</p>' +
        RECHT.map(function (l) { return '<a href="' + wurzel + l[0] + '">' + esc(l[1]) + '</a>'; }).join('') + '</nav>';
      links.parentNode.replaceChild(bl, links);
    }
  }

  /* ---------- Randliste links (Seiten) und «Auf dieser Seite» ---------- */
  var liste = SEITEN[seite];
  var imBand = {}, alle = [];
  var hero = document.getElementById('top');
  var ziele = (liste && seite === rel.replace(/\/$/, '') ? liste : [])
    .map(function (z) { return [document.getElementById(z[0]), z[1], z[0]]; })
    .filter(function (z) { return z[0]; });
  if (ziele.length < 2) ziele = [];

  /* Knopfreihe unter dem Titel für schmale Fenster */
  var reihe = null;
  if (ziele.length) {
    reihe = el('nav', 'vn-reihe');
    reihe.setAttribute('aria-label', 'Auf dieser Seite');
    reihe.innerHTML = '<div class="vn-reihe__innen">' +
      ziele.map(function (z) { return '<a href="#' + z[2] + '">' + esc(z[1]) + '</a>'; }).join('') + '</div>';
    if (hero && hero.parentNode) hero.parentNode.insertBefore(reihe, hero.nextSibling);
    else if (ziele[0][0].parentNode) ziele[0][0].parentNode.insertBefore(reihe, ziele[0][0]);
    alle = alle.concat([].slice.call(reihe.querySelectorAll('a')));
  }

  /* Randliste: dieselben Hauptpunkte wie die Kopfzeile, die aktuelle Seite aufgeklappt */
  var haupt = MENUE.map(function (g) { return [g.seite, g.titel, g.seite]; })
    .concat(MEHR.map(function (m) { return [m[0], m[1], m[3]]; }));
  if (seite !== '404') {
    var seitlich = el('nav', 'vn-seite');
    seitlich.setAttribute('aria-label', 'Seitenübersicht');
    var sh = '<ul class="vn-seite__haupt">';
    haupt.forEach(function (h) {
      var aktuell = h[2] === seite;
      sh += '<li' + (aktuell ? ' class="ist-aktuell"' : '') + '><a href="' + wurzel + h[0] + '"' + (aktuell ? ' aria-current="page"' : '') + '>' + esc(h[1]) + '</a>';
      if (aktuell && ziele.length) {
        sh += '<ul class="vn-seite__unter" aria-label="Auf dieser Seite">' +
          ziele.map(function (z) { return '<li><a href="#' + z[2] + '">' + esc(z[1]) + '</a></li>'; }).join('') + '</ul>';
      }
      sh += '</li>';
    });
    seitlich.innerHTML = sh + '</ul>';
    document.body.appendChild(seitlich);
    alle = alle.concat([].slice.call(seitlich.querySelectorAll('.vn-seite__unter a')));

    var fussEl = document.querySelector('footer');
    var seitlichSteuern = function () {
      var y = window.pageYOffset || 0, vh = window.innerHeight;
      var zeigt = y > (hero ? hero.offsetHeight * 0.6 : 200);
      if (fussEl && fussEl.getBoundingClientRect().top < vh * 0.85) zeigt = false;
      seitlich.classList.toggle('ist-sichtbar', zeigt);
    };
    window.addEventListener('scroll', seitlichSteuern, { passive: true });
    window.addEventListener('resize', seitlichSteuern);
    seitlichSteuern();
  }

  if (ziele.length) {
    var markieren = function () {
      var aktuell = null;
      ziele.forEach(function (z) { if (imBand[z[2]]) aktuell = z[2]; });
      if (!aktuell) return;
      alle.forEach(function (a) {
        if (a.getAttribute('href') === '#' + aktuell) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
      var chip = reihe.querySelector('a[aria-current]');
      var innen = reihe.firstChild;
      if (chip && innen && innen.scrollWidth > innen.clientWidth) {
        innen.scrollLeft = chip.offsetLeft - (innen.clientWidth - chip.offsetWidth) / 2;
      }
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (eintr) {
        eintr.forEach(function (e) { imBand[e.target.id] = e.isIntersecting; });
        markieren();
      }, { rootMargin: '0px 0px -65% 0px', threshold: 0 });
      ziele.forEach(function (z) { io.observe(z[0]); });
    }
  }
})();
