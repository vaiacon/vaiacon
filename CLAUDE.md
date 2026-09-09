# CLAUDE.md — Hausordnung für Vaiacon

> Gilt für alle, die hier arbeiten — Menschen wie Claude. Kurzfassung der Regeln,
> die auf intern.vaiacon.ch im Bereich «Claude» ausführlich stehen. Beide Fassungen
> zusammen pflegen.

## Wir arbeiten zu zweit am selben Stand

Philip **und** André haben Schreibrecht. Der Hauptzweig ist nicht geschützt —
es hält uns also nichts auf ausser Absprache.

- **`git pull --rebase`** vor dem Anfangen **und** vor dem Hochladen. Das holt die
  Arbeit des anderen und setzt die eigene sauber obendrauf, statt beides zu verknoten.
- **Kleines direkt auf `main`**, Grösseres in einem eigenen Zweig mit
  Zusammenführungsanfrage. `main` ist der Stand, der live geht.
- ⛔ **Nie `--force`.** Das überschreibt den Stand auf GitHub mit dem eigenen, statt
  ihn zusammenzuführen — es ist der einzige Weg, auf dem hier Arbeit wirklich
  verschwindet.
- **Sagen, woran man ist** — im Chat oder als Aufgabe auf intern.vaiacon.ch.

## Änderungen laufen immer über dieses Repo

⛔ Nie von Hand Dateien auf dem Server ändern. Was dort steht, wird beim nächsten
Ausrollen ersetzt — bei der Website sogar von allein, binnen zwei Minuten und
stillschweigend. Wer direkt auf dem Server bearbeitet, verliert die Arbeit ohne
Fehlermeldung.

## Was hier nichts zu suchen hat

⛔ **Keine Personendaten im Repo** — keine Kundennamen in Beispielen, keine
Zugangscodes, keine Mailadressen, keine Zugangsdaten. Massgebend ist das
Schweizer **revDSG**, nicht die DSGVO. Zugangsdaten gehören in die `.env` auf
dem Server, Kundenakten bleiben lokal.

⛔ Einmal eingecheckt heisst für immer drin: die Historie lässt sich nur mit
`--force` säubern, und das ist verboten. Also vorher schauen.

## Dieses Repo: die Website vaiacon.ch

Statische Seite, Inhalt liegt in der Wurzel. Es hängt **kein** Webhook daran und
trotzdem geht ein Push live: der Server holt sich den Stand alle zwei Minuten
selbst aus `main`. Höchstens zwei Minuten nach dem Push ist die Seite draussen.

⚠️ Weisse Seite nach einer Änderung ist fast immer der Browser-Zwischenspeicher —
einmal hart neu laden (⌘⇧R).
