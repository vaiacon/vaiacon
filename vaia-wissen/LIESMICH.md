# Das Wissen für den Chat auf vaiacon.ch

`wissen.md` ist der Text, den der Chat bei jeder Frage mitgeschickt bekommt.
Er entscheidet, was Vaia weiss — und was sie erfindet, wenn er veraltet ist.

## Warum die Datei hier liegt

Bis zum 10.09.2026 lag sie **nur** auf dem Server unter `/srv/vaiacon-bot/wissen.md`
und wurde von Hand gepflegt. Zweimal ist sie dabei stillschweigend veraltet:

- Der Chat nannte «die ersten drei Lektionen gratis, danach CHF 39 pro Monat»,
  als die Academy längst vollständig kostenlos war.
- Er sprach von 66 Lektionen, als es 58 waren.

Gemerkt hat es niemand, bis ein Mensch zufällig nachgefragt hat. Das ist der
Fehler, den diese Ablage behebt: Das Wissen liegt jetzt neben dem Seitentext,
aus dem es stammt.

## Warum der Ordner nicht «bot» heisst

Er hiess es kurz — und hat damit `vaiacon.ch/bot` lahmgelegt. Der Server löst
Adressen ohne Endung auf: `/bot` fand den Ordner statt `bot.html`, suchte darin
eine Startseite, fand keine und gab 404 zurück. Die Landingpage war rund zehn
Minuten nicht erreichbar.

Die genaue Regel: **Ein Ordner in der Wurzel verdeckt die gleichnamige
`.html`-Datei — ausser er enthält selbst eine `index.html`.** Darum geht
`/erstanalyse` weiterhin: Dort liegt `erstanalyse/index.html`, die
weiterleitet. `bot/` hatte nichts dergleichen.

Wer künftig einen Ordner in der Wurzel anlegt, prüft vorher:

```bash
comm -12 <(ls -d */ | tr -d /) <(ls *.html | sed 's/.html//') | sort
```

Was dabei herauskommt, muss eine `index.html` haben — sonst ist die
Landingpage weg.

## Die Datei nicht von Hand ändern

Sie wird erzeugt. Änderungen von Hand sind beim nächsten Lauf weg.

```bash
python3 scripts/bot_wissen.py
```

Quellen sind `academy/academy-daten.js` und der sichtbare Text der neun
Landingpages. Wer den Seitentext ändert, lässt das Skript laufen und lädt das
Ergebnis mit hoch — dann kann der Chat gar nicht mehr etwas anderes erzählen
als die Website.

## ⚠️ Was auf dem Server noch fehlt

**Diese Datei wirkt noch nicht.** Der Server holt das Repo alle zwei Minuten
nach `/srv/vaiacon-web`, der Chat liest aber weiterhin `/srv/vaiacon-bot/wissen.md`.
Solange die beiden nichts voneinander wissen, ändert ein Push hier nichts am Chat.

Es braucht einen Handgriff auf dem Server — den kann nur machen, wer Zugang hat:

**Weg 1 — Verweis setzen (klein, sofort machbar).**

```bash
ln -sf /srv/vaiacon-web/vaia-wissen/wissen.md /srv/vaiacon-bot/wissen.md
```

Damit liest der Chat immer die Fassung aus dem Repo. ⚠️ Der Dienst muss
danach trotzdem neu gestartet werden, wenn sich der Text ändert — das Wissen
wird beim Start eingelesen. Am saubersten hängt man den Neustart an den
Abgleich, der ohnehin alle zwei Minuten läuft, und zwar nur dann, wenn sich
die Datei wirklich geändert hat.

**Weg 2 — den Chat die Datei bei jeder Frage lesen lassen (die eigentliche Lösung).**

Eine Änderung im Repo `vaiacon-bot`: Datei nicht beim Start einlesen, sondern
bei Bedarf, und den Inhalt zwischenspeichern, bis sich der Zeitstempel ändert.
Dann entfällt der Neustart ganz.

Weg 1 kostet fünf Minuten, Weg 2 löst es richtig. Vorschlag: zuerst Weg 1,
Weg 2 bei nächster Gelegenheit.

## Was hier nicht hineingehört

Die Datei liegt in einem **öffentlichen** Repo und wird als Ganzes an einen
KI-Dienst geschickt. Es gehört deshalb nur hinein, was ohnehin öffentlich auf
der Website steht:

- ⛔ keine Zugangsdaten, keine Schlüssel
- ⛔ keine Kundennamen, keine Mailadressen von Personen
- ⛔ keine internen Preise, Margen oder Absprachen

Weil die Datei erzeugt wird und ihre Quellen die öffentlichen Seiten sind,
ergibt sich das von selbst — solange niemand von Hand etwas hineinschreibt.

## Die Datenschutzseite

`datenschutz.html` steht in der Seitenliste des Skripts, obwohl es die Datei in
`main` noch nicht gibt — sie liegt im Zweig «datenschutz-und-chat-hinweis».
Fehlt sie, wird sie übersprungen und der Lauf meldet das. Sobald sie in `main`
ist, kommt sie beim nächsten Lauf von selbst dazu, und Vaia kann Fragen zum
Datenschutz aus dem eigenen Text beantworten statt zu raten.

Zur Probe eingesetzt wächst die Datei von rund 35 200 auf 38 800 Zeichen.

## Umfang

Rund 35 000 Zeichen, etwa 8800 Token je Frage. Bei den eingebauten Bremsen
(12 Fragen in 10 Minuten und 60 pro Tag je Besucher, 800 pro Tag insgesamt)
ist das vertretbar, fällt aber ins Gewicht. Wird es zu viel, ist der grösste
Brocken die Lektionsliste je Lernpfad — sie liesse sich auf die Lernpfad-Tabelle
eindampfen und spart rund ein Fünftel.
