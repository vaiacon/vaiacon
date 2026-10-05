/* Startseite: Bühne mit den drei Bereichen und die News-Vorschau.
   Reines JS. Die Wahl des Startbereichs trifft das kleine Skript direkt unter der Bühne in
   index.html (damit nichts flackert); hier wird nur der Stand gelesen.
   Ohne dieses Skript bleibt alles lesbar: drei Karten nebeneinander oder untereinander. */
(function () {
  'use strict';

  var stage = document.getElementById('st-stage');
  if (!stage) return;

  var reiter = document.querySelector('.st-reiter');
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.st-reiter__tab'));
  var panels = Array.prototype.slice.call(stage.querySelectorAll('.st-panel'));
  var pauseKnopf = document.getElementById('st-pause');
  var hinweis = document.getElementById('st-lauf-hinweis');
  var steuer = document.getElementById('st-steuer');
  var zurueck = document.getElementById('st-zurueck');
  var vor = document.getElementById('st-vor');
  if (tabs.length !== 3 || panels.length !== 3) return;

  var DAUER = 7000;
  var NAMEN = ['ki-kompetenz', 'sichtbarkeit', 'automationen'];
  var HINWEISE = ['KI-Kompetenz', 'Sichtbarkeit', 'Automationen'];
  var POSITIONEN = ['mitte', 'rechts', 'links'];

  var mqSpalten = window.matchMedia('(min-width: 1024px)');   /* Karussell; darunter wischbar */
  var mqRuhe = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mqHover = window.matchMedia('(hover: hover)');

  var aktiv = parseInt(stage.getAttribute('data-aktiv'), 10);
  if (!(aktiv >= 0 && aktiv < 3)) aktiv = 0;

  var nutzerPause = false;   // Pause-Knopf oder bewusste Wahl
  var halten = {};           // Gründe, die kurz anhalten: hover, fokus, eingabe, sichtbar
  var verstrichen = 0;       // ms im aktuellen Bereich
  var letzter = 0;
  var raf = 0;
  var sichtbar = true;
  var scrollSperre = 0;

  function spalten() { return mqSpalten.matches; }
  function ruhe() { return mqRuhe.matches; }
  function automatisch() { return spalten() && !ruhe(); }

  function sagen(text) { if (hinweis) hinweis.textContent = text; }

  /* ───── Anzeige ───── */

  function spur(i) { return tabs[i].querySelector('.st-reiter__spur > span'); }

  function balken(anteil) {
    for (var i = 0; i < 3; i++) {
      var s = spur(i);
      if (!s) continue;
      if (i !== aktiv) { s.style.transform = ''; continue; }
      s.style.transform = automatisch() ? 'scaleX(' + Math.max(0, Math.min(1, anteil)).toFixed(4) + ')' : 'scaleX(1)';
    }
  }

  function setze(i, optionen) {
    optionen = optionen || {};
    if (i < 0) i = 2;
    if (i > 2) i = 0;
    var gewechselt = i !== aktiv;
    aktiv = i;
    stage.setAttribute('data-aktiv', String(i));
    if (reiter) reiter.setAttribute('data-aktiv', String(i));
    for (var k = 0; k < 3; k++) {
      var an = k === i;
      if (an) panels[k].setAttribute('data-aktiv', ''); else panels[k].removeAttribute('data-aktiv');
      panels[k].setAttribute('data-pos', POSITIONEN[(k - i + 3) % 3]);
      tabs[k].setAttribute('aria-selected', an ? 'true' : 'false');
      tabs[k].setAttribute('tabindex', an ? '0' : '-1');
      var voll = panels[k].querySelector('.st-voll');
      if (voll) {
        /* Im Kartenmodus bleibt der Text der Nachbarn sichtbar, aber nicht bedienbar. */
        if (an) voll.removeAttribute('inert'); else voll.setAttribute('inert', '');
      }
    }
    if (gewechselt || optionen.neuStart) { verstrichen = 0; letzter = 0; }
    balken(0);
    if (optionen.vorlesen) sagen(HINWEISE[i] + ' angezeigt.');
    if (optionen.scrollen && !spalten()) zuKarte(i, optionen.sanft !== false);
    try { sessionStorage.setItem('vaiacon-start-bereich', String(i)); } catch (e) {}
  }

  /* ───── Karten (Handy, Tablet) ───── */

  function zuKarte(i, sanft) {
    var ziel = panels[i];
    var links = ziel.offsetLeft - parseFloat(getComputedStyle(stage).scrollPaddingLeft || 0);
    scrollSperre = Date.now() + 600;
    var verhalten = (sanft && !ruhe()) ? 'smooth' : 'auto';
    try { stage.scrollTo({ left: links, behavior: verhalten }); }
    catch (e) { stage.scrollLeft = links; }
  }

  var scrollTimer = 0;
  stage.addEventListener('scroll', function () {
    if (spalten()) return;
    /* Eigenes Scrollen (Pfeil, Reiter) läuft länger als gedacht: Sperre hält, bis es ruht. */
    if (Date.now() < scrollSperre) { scrollSperre = Date.now() + 150; return; }
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(function () {
      var mitte = stage.scrollLeft + parseFloat(getComputedStyle(stage).scrollPaddingLeft || 0);
      var bester = 0, abstand = Infinity;
      for (var i = 0; i < 3; i++) {
        var d = Math.abs(panels[i].offsetLeft - mitte);
        if (d < abstand) { abstand = d; bester = i; }
      }
      if (bester !== aktiv) { stopp(); setze(bester, { vorlesen: true }); }
    }, 90);
  }, { passive: true });

  /* ───── Wahl durch Nutzer ───── */

  function stopp() {
    /* Wer bewusst wählt, behält die Wahl: kein Weiterschalten mehr. */
    nutzerPause = true;
    knopfZeigen();
  }

  function waehle(i, vorlesen) {
    stopp();
    setze(i, { vorlesen: vorlesen !== false, scrollen: true, neuStart: true });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { waehle(i); });
    tab.addEventListener('keydown', function (e) {
      var ziel = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') ziel = (i + 1) % 3;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ziel = (i + 2) % 3;
      else if (e.key === 'Home') ziel = 0;
      else if (e.key === 'End') ziel = 2;
      if (ziel < 0) return;
      e.preventDefault();
      waehle(ziel);
      tabs[ziel].focus();
    });
  });

  panels.forEach(function (panel, i) {
    panel.addEventListener('click', function (e) {
      if (i === aktiv) return;
      if (e.target.closest('a, button, input')) return;
      waehle(i);
    });
  });

  if (zurueck) zurueck.addEventListener('click', function () { waehle((aktiv + 2) % 3); });
  if (vor) vor.addEventListener('click', function () { waehle((aktiv + 1) % 3); });

  /* ───── Pause ───── */

  function knopfZeigen() {
    if (!pauseKnopf) return;
    var zeigen = automatisch();
    pauseKnopf.hidden = !zeigen;
    pauseKnopf.setAttribute('aria-pressed', nutzerPause ? 'true' : 'false');
    var t = pauseKnopf.querySelector('.st-pause__text');
    if (t) t.textContent = nutzerPause ? 'Weiter' : 'Anhalten';
    pauseKnopf.setAttribute('aria-label', nutzerPause ? 'Automatischen Wechsel fortsetzen' : 'Automatischen Wechsel anhalten');
  }

  if (pauseKnopf) {
    pauseKnopf.addEventListener('click', function () {
      nutzerPause = !nutzerPause;
      if (!nutzerPause) { letzter = 0; }
      knopfZeigen();
      sagen(nutzerPause ? 'Automatischer Wechsel angehalten.' : 'Automatischer Wechsel läuft wieder.');
      anwerfen();
    });
  }

  /* ───── Halten: Maus, Fokus, Eingabe, Berührung, ausserhalb des Bildes ───── */

  function halte(grund, an) {
    var vorher = !!halten[grund];
    if (vorher === an) return;
    halten[grund] = an;
    if (!an) letzter = 0;
  }

  var hoverTimer = 0;
  stage.addEventListener('pointerenter', function (e) {
    if (e.pointerType === 'touch') return;
    clearTimeout(hoverTimer);
    halte('hover', true);
  });
  stage.addEventListener('pointerleave', function () {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(function () { halte('hover', false); }, 250);
  });

  stage.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch') halte('beruehrung', true);
  });
  ['pointerup', 'pointercancel'].forEach(function (n) {
    stage.addEventListener(n, function () {
      /* Nach Berührung bleibt es stehen, bis jemand «Weiter» drückt. */
      if (halten.beruehrung) { halte('beruehrung', false); nutzerPause = true; knopfZeigen(); }
    });
  });

  stage.addEventListener('focusin', function (e) {
    halte('fokus', true);
    if (e.target && e.target.matches && e.target.matches('input')) halte('eingabe', true);
  });
  stage.addEventListener('focusout', function () {
    setTimeout(function () {
      if (!stage.contains(document.activeElement)) { halte('fokus', false); }
    }, 0);
  });
  stage.addEventListener('input', function (e) {
    if (e.target && e.target.matches && e.target.matches('input')) {
      /* Wer tippt, will nicht, dass die Seite sich verändert. */
      if (e.target.value) { nutzerPause = true; knopfZeigen(); }
    }
  });
  if (steuer) {
    steuer.addEventListener('focusin', function () { halte('fokus', true); });
    steuer.addEventListener('focusout', function () {
      setTimeout(function () {
        if (!stage.contains(document.activeElement) && !steuer.contains(document.activeElement)) halte('fokus', false);
      }, 0);
    });
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (eintraege) {
      sichtbar = eintraege[0].isIntersecting;
      if (sichtbar) letzter = 0;
    }, { threshold: 0.35 }).observe(stage);
  }

  document.addEventListener('visibilitychange', function () {
    halte('verdeckt', document.hidden);
  });

  /* ───── Takt ───── */

  function haelt() {
    if (nutzerPause || !sichtbar) return true;
    for (var k in halten) { if (halten[k]) return true; }
    return false;
  }

  function takt(t) {
    raf = 0;
    if (!automatisch()) return;
    if (haelt()) {
      letzter = 0;
    } else {
      if (letzter) verstrichen += t - letzter;
      letzter = t;
      if (verstrichen >= DAUER) {
        setze(aktiv + 1, {});
        sagen('');
      } else {
        balken(verstrichen / DAUER);
      }
    }
    raf = requestAnimationFrame(takt);
  }

  function anwerfen() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    letzter = 0;
    if (automatisch()) raf = requestAnimationFrame(takt);
    else balken(1);
  }

  function modusGeaendert() {
    knopfZeigen();
    if (spalten()) {
      stage.scrollLeft = 0;
    } else {
      zuKarte(aktiv, false);
    }
    setze(aktiv, { neuStart: true });
    anwerfen();
  }

  function hoere(mq, fn) {
    if (mq.addEventListener) mq.addEventListener('change', fn); else if (mq.addListener) mq.addListener(fn);
  }
  hoere(mqSpalten, modusGeaendert);
  hoere(mqRuhe, modusGeaendert);

  /* ───── Adresse mit #ki-kompetenz usw. ───── */

  window.addEventListener('hashchange', function () {
    var i = NAMEN.indexOf((location.hash || '').replace('#', ''));
    if (i >= 0) { waehle(i); }
  });

  /* ───── Start ───── */

  if (steuer) steuer.hidden = false;
  /* Wer über die Adresse kommt, hat den Bereich gewählt: dort bleiben. */
  if (stage.getAttribute('data-quelle') === 'adresse') nutzerPause = true;
  knopfZeigen();
  setze(aktiv, { neuStart: true });
  if (!spalten()) {
    /* ohne Animation an die richtige Stelle; nach dem Layout */
    requestAnimationFrame(function () { zuKarte(aktiv, false); });
  }
  anwerfen();

  /* ───── KI-News für KMU ───── */

  var liste = document.getElementById('st-news-liste');
  var alle = document.getElementById('st-news-alle');
  var RUBRIKEN = { sicherheit: 'Sicherheit', praxis: 'Praxis', recht: 'Recht', tools: 'Werkzeuge', werkzeuge: 'Werkzeuge', markt: 'Markt', forschung: 'Forschung' };

  function rubrikName(s) {
    s = String(s || '').toLowerCase();
    if (RUBRIKEN[s]) return RUBRIKEN[s];
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '';
  }

  function kuerzen(text, max) {
    text = String(text || '').replace(/\s+/g, ' ').trim();
    if (text.length <= max) return text;
    var satz = text.slice(0, max);
    var punkt = Math.max(satz.lastIndexOf('. '), satz.lastIndexOf('! '), satz.lastIndexOf('? '));
    if (punkt > max * 0.45) return satz.slice(0, punkt + 1);
    var blank = satz.lastIndexOf(' ');
    return satz.slice(0, blank > 0 ? blank : max).replace(/[,;:\-–]$/, '') + '…';
  }

  function datumText(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
    if (!m) return '';
    var d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], 12));
    try {
      return new Intl.DateTimeFormat('de-CH', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
    } catch (e) { return m[3] + '.' + m[2] + '.' + m[1]; }
  }

  /* Pfade in der Datei gelten ab der Wurzel der Seite; nur harmlose Adressen zulassen. */
  function sicher(pfad) {
    pfad = String(pfad || '');
    if (!pfad || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(pfad) || pfad.indexOf('..') !== -1) return '';
    return pfad.replace(/^\/+/, '');
  }

  function karte(eintrag) {
    var adr = sicher(eintrag.adresse);
    if (!adr || !eintrag.titel) return null;
    var a = document.createElement('a');
    a.className = 'st-news__karte';
    a.href = adr;

    var bild = sicher(eintrag.bild);
    if (bild) {
      var img = document.createElement('img');
      img.className = 'st-news__bild';
      img.src = bild;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.width = 640;
      img.height = 400;
      a.appendChild(img);
    }

    var text = document.createElement('div');
    text.className = 'st-news__text';

    var meta = document.createElement('p');
    meta.className = 'st-news__meta';
    var rubrik = rubrikName(eintrag.rubrik);
    if (rubrik) {
      var r = document.createElement('span');
      r.textContent = rubrik;
      meta.appendChild(r);
    }
    var dt = datumText(eintrag.datum);
    if (dt) {
      var t = document.createElement('time');
      t.setAttribute('datetime', String(eintrag.datum).slice(0, 10));
      t.textContent = dt;
      meta.appendChild(t);
    }
    if (meta.childNodes.length) text.appendChild(meta);

    var h = document.createElement('h3');
    h.className = 'st-news__titel';
    h.textContent = String(eintrag.titel);
    text.appendChild(h);

    if (eintrag.kurz) {
      var p = document.createElement('p');
      p.className = 'st-news__kurz';
      p.textContent = kuerzen(eintrag.kurz, 170);
      text.appendChild(p);
    }
    a.appendChild(text);
    return a;
  }

  function newsLaden() {
    if (!liste || !window.fetch) return;
    fetch('ki-kmu-news/neueste.json', { credentials: 'same-origin' })
      .then(function (r) { if (!r.ok) throw new Error('news ' + r.status); return r.json(); })
      .then(function (daten) {
        var eintraege = Array.isArray(daten) ? daten : (daten && (daten.eintraege || daten.beitraege || daten.items || daten.neueste)) || [];
        if (!Array.isArray(eintraege)) throw new Error('news form');
        var karten = [];
        for (var i = 0; i < eintraege.length && karten.length < 3; i++) {
          var k = karte(eintraege[i] || {});
          if (k) karten.push(k);
        }
        if (karten.length < 1) throw new Error('news leer');
        while (liste.firstChild) liste.removeChild(liste.firstChild);
        karten.forEach(function (k) { liste.appendChild(k); });
        if (alle) alle.hidden = false;
      })
      .catch(function () { /* Die feste Karte bleibt stehen. */ });
  }
  newsLaden();
})();
