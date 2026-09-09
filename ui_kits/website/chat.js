/* Chat-Widget für die statischen Seiten — ohne React, damit die Seiten leicht bleiben.
   Der Vertrag mit dem Server ist derselbe wie beim React-Widget:
   POST /api/chat mit {messages:[{role,content}]}, Antwort als Strom in
   «data: {...}»-Blöcken. Der Schlüssel liegt auf dem Server, nie hier.
   Das Widget wird ans Ende des Body gehängt: auf dem Handy steht es damit im
   Fluss hinter der Fusszeile, statt den untersten Inhalt zu überdecken. */
(function () {
  var BEGRUESSUNG = 'Grüezi, ich bin Vaia! Die digitale Mitarbeiterin von vaiacon. Ich beantworte gerne Ihre Fragen zu vaiacon, unseren Paketen und den ersten Schritten.';
  var AUSWEICHTEXT = 'Das hat gerade nicht geklappt. Schreiben Sie uns bitte an hallo@vaiacon.ch — wir antworten selbst.';

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
  }

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

    fetch('/api/chat', {
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
