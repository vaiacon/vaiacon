/* Chat-Widget für die statischen Seiten — ohne React, damit die Seiten leicht bleiben.
   Der Vertrag mit dem Server ist derselbe wie beim React-Widget:
   POST /api/chat mit {messages:[{role,content}]}, Antwort als Strom in
   «data: {...}»-Blöcken. Der Schlüssel liegt auf dem Server, nie hier.
   Das Widget schwebt unten rechts und läuft beim Blättern mit. Kommt die
   Fusszeile ins Bild, blendet sich der Knopf aus, damit der unterste Bereich
   frei bleibt. */
(function () {
  // Wurzel der Website, vom Skriptort aus gerechnet: «/datenschutz» bräche unter /vaiacon/.
  var SEITENWURZEL = document.currentScript ? new URL('../../', document.currentScript.src).href : '/';
  var BEGRUESSUNG = 'Grüezi, ich bin Vaia! Die digitale Mitarbeiterin von vaiacon. Ich beantworte gerne Ihre Fragen zu vaiacon, unseren Paketen und den ersten Schritten.';
  var AUSWEICHTEXT = 'Das hat gerade nicht geklappt. Schreiben Sie uns bitte an hallo@vaiacon.ch. Wir antworten selbst.';

  if (document.querySelector('.vc-chat')) return;

  var wurzel = document.createElement('div');
  wurzel.className = 'vc-chat';
  wurzel.setAttribute('data-open', 'false');
  wurzel.innerHTML =
    '<div class="vc-chat__panel" role="dialog" aria-label="Chat mit Vaia">' +
      '<div class="vc-chat__head">' +
        '<div><strong>Vaia</strong><span>Antwortet meist sofort</span></div>' +
        '<button class="vc-chat__close" type="button" aria-label="Chat schliessen">×</button>' +
      '</div>' +
      /* Zugeklappt steht nur die Zeile «Datenschutzerklärung» da — der Text
         erscheint erst auf Klick. Wer den Chat öffnet, will schreiben, nicht
         lesen; wer es wissen will, findet es trotzdem. */
      '<details class="vc-chat__hinweis">' +
        '<summary>Datenschutzerklärung</summary>' +
        '<p>Vaia ist ein KI-Assistent. Eingaben gehen zur Beantwortung an einen KI-Dienst (Anthropic, USA). Bitte keine Personendaten eingeben. <a href="' + SEITENWURZEL + 'datenschutz">Ganze Erklärung →</a></p>' +
      '</details>' +
      '<div class="vc-chat__log" aria-live="polite"></div>' +
      '<form class="vc-chat__form">' +
        '<input type="text" placeholder="Ihre Frage …" aria-label="Ihre Frage" autocomplete="off">' +
        '<button type="submit" aria-label="Frage senden">→</button>' +
      '</form>' +
    '</div>' +
    '<button class="vc-chat__fab" type="button" aria-expanded="false">' +
      '<span class="vc-chat__fab-dot" aria-hidden="true"></span>Fragen Sie Vaia' +
    '</button>';
  document.body.appendChild(wurzel);

  var knopf = wurzel.querySelector('.vc-chat__fab');
  var zu = wurzel.querySelector('.vc-chat__close');
  var protokoll = wurzel.querySelector('.vc-chat__log');
  var formular = wurzel.querySelector('.vc-chat__form');
  var feld = formular.querySelector('input');
  var senden = formular.querySelector('button');
  var verlauf = [];
  var beschaeftigt = false;

  function zeige(rolle, text) {
    var el = document.createElement('div');
    el.className = 'vc-chat__msg vc-chat__msg--' + rolle;
    el.textContent = text;
    protokoll.appendChild(el);
    protokoll.scrollTop = protokoll.scrollHeight;
    return el;
  }

  function umschalten(offen) {
    wurzel.setAttribute('data-open', offen ? 'true' : 'false');
    knopf.setAttribute('aria-expanded', offen ? 'true' : 'false');
    if (offen) {
      if (!verlauf.length) { zeige('bot', BEGRUESSUNG); verlauf.push({ role: 'assistant', text: BEGRUESSUNG }); }
      feld.focus();
    }
    hubBerechnen();   // beim Auf- und Zuklappen neu entscheiden
  }

  /* ── Ausblenden an der Fusszeile (04.10.2026) ────────────────────────────
     Früher hob sich der Knopf um die sichtbare Höhe der Fusszeile an. Auf dem
     Handy blieb er dabei mitten im Bild kleben (Deckel 45 % der Fensterhöhe).
     Jetzt verschwindet er, sobald die Fusszeile ins Bild kommt, und erscheint
     wieder, wenn man zurückblättert. Offen bleibt der Chat sichtbar. */
  var fusszeile = null;
  var angefordert = false;

  /* Nicht einmalig beim Start suchen: In der Academy entsteht die Fusszeile
     erst im Browser aus einem Baustein. Wer sie zu früh sucht, findet nichts
     und hebt nie an. Darum bei jedem Lauf nachsehen, bis sie da ist. */
  function fusszeileFinden() {
    if (fusszeile && fusszeile.isConnected) return fusszeile;
    /* Die letzte, nicht die erste: Im Lernplan trägt schon die Karte «Was Sie
       mitnehmen» ein <footer>, die Fusszeile der Seite kommt danach. */
    var alle = document.querySelectorAll('footer');
    fusszeile = document.querySelector('.sv-footer') || alle[alle.length - 1] || null;
    return fusszeile;
  }

  /* ── Nicht über dem Kopf der Seite (26.09.2026) ────────────────────────
     Reicht der Terracotta-Kopf über den unteren Bildschirmrand hinaus (Handy
     quer, lange Lernpläne, sehr niedrige Fenster), läge der Knopf mitten auf
     Text oder Knöpfen. Dann bleibt er ausgeblendet, bis der Kopf oben
     hinausgescrollt ist. Passt der Kopf auf den Bildschirm, ändert sich nichts:
     Dort ist unten Platz für den Knopf freigehalten. */
  function kopfPruefen() {
    var kopf = document.querySelector('.sv-hero') || document.getElementById('top');
    var verdeckt = false;
    if (kopf && wurzel.getAttribute('data-open') !== 'true') {
      var k = kopf.getBoundingClientRect();
      verdeckt = k.bottom > window.innerHeight + 1 && k.top < window.innerHeight;
    }
    wurzel.setAttribute('data-ueber-kopf', verdeckt ? 'true' : 'false');
  }

  function hubBerechnen() {
    angefordert = false;
    kopfPruefen();
    var fuss = fusszeileFinden();
    var amFuss = false;
    if (fuss && wurzel.getAttribute('data-open') !== 'true') {
      amFuss = fuss.getBoundingClientRect().top < window.innerHeight - 1;
    }
    wurzel.setAttribute('data-am-fuss', amFuss ? 'true' : 'false');
  }

  function hubAnfordern() {
    if (angefordert) return;
    angefordert = true;
    window.requestAnimationFrame(hubBerechnen);
  }

  window.addEventListener('scroll', hubAnfordern, { passive: true });
  window.addEventListener('resize', hubAnfordern);
  hubBerechnen();
  /* In der Academy entsteht der Kopf erst nach dem Laden aus einem Baustein —
     wann genau, hängt vom Browser ab. Darum jedes Mal nachsehen, wenn sich die
     Seite in der Höhe verändert, und zur Sicherheit nach dem Laden. */
  window.addEventListener('load', hubAnfordern);
  if (window.ResizeObserver) {
    new ResizeObserver(hubAnfordern).observe(document.documentElement);
  } else {
    [600, 1500, 3000, 6000].forEach(function (ms) { window.setTimeout(hubAnfordern, ms); });
  }

  /* ── Vaia von aussen öffnen ──────────────────────────────────────────────
     Jedes Element mit data-vaia öffnet den Chat. Steht dort ein Text, wird er
     als Frage vorgelegt. Absichtlich als Delegation am Dokument: So wirkt es
     auch auf Elemente, die erst später entstehen — in der Academy baut sich
     die Seite im Browser auf.
     Die Knöpfe bleiben Verweise auf hallo@vaiacon.ch. Wer kein JavaScript hat,
     landet damit bei der Mail statt bei einem toten Knopf. */
  document.addEventListener('click', function (ev) {
    var ziel = ev.target;
    var ausloeser = ziel && ziel.closest ? ziel.closest('[data-vaia]') : null;
    if (!ausloeser) return;
    ev.preventDefault();
    umschalten(true);
    var vorgabe = ausloeser.getAttribute('data-vaia');
    if (vorgabe) feld.value = vorgabe;
    feld.focus();
  });

  knopf.addEventListener('click', function () {
    umschalten(wurzel.getAttribute('data-open') !== 'true');
  });
  zu.addEventListener('click', function () { umschalten(false); });

  formular.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var frage = feld.value.trim();
    if (!frage || beschaeftigt) return;
    feld.value = '';
    zeige('user', frage);
    verlauf.push({ role: 'user', text: frage });

    beschaeftigt = true;
    senden.disabled = true;
    var blase = zeige('bot', '…');
    var begonnen = false;

    function anhaengen(stueck) {
      if (!begonnen) { blase.textContent = ''; begonnen = true; }
      blase.textContent += stueck;
      protokoll.scrollTop = protokoll.scrollHeight;
    }

    function fertig() {
      beschaeftigt = false;
      senden.disabled = false;
      if (!begonnen) blase.textContent = AUSWEICHTEXT;
      verlauf.push({ role: 'assistant', text: blase.textContent });
    }

    fetch(window.VAIACON_API_BASIS + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: verlauf.map(function (m) {
          return { role: m.role === 'user' ? 'user' : 'assistant', content: m.text };
        })
      })
    }).then(function (antwort) {
      if (!antwort.ok || !antwort.body) {
        return antwort.json().then(function (daten) {
          anhaengen(daten && daten.fehler ? daten.fehler : AUSWEICHTEXT);
        }).catch(function () { anhaengen(AUSWEICHTEXT); }).then(fertig);
      }
      var leser = antwort.body.getReader();
      var dekoder = new TextDecoder();
      var rest = '';
      return (function lesen() {
        return leser.read().then(function (ergebnis) {
          if (ergebnis.done) return fertig();
          rest += dekoder.decode(ergebnis.value, { stream: true });
          var bloecke = rest.split('\n\n');
          rest = bloecke.pop();
          bloecke.forEach(function (block) {
            if (block.indexOf('data: ') !== 0) return;
            var daten;
            try { daten = JSON.parse(block.slice(6)); } catch (e) { return; }
            if (daten.text) anhaengen(daten.text);
            else if (daten.fehler) anhaengen(daten.fehler);
          });
          return lesen();
        });
      })();
    }).catch(function () { fertig(); });
  });
})();
