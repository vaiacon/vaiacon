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
- **Fertiges gleich hochladen**, spätestens am Ende des Tages. Ein `pull` holt nur,
  was auch schon oben liegt — was tagelang auf dem eigenen Rechner bleibt, sieht der
  andere nicht, und dann bauen beide am selben Ding.
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

## Preise: eine Quelle, vier Sätze

Alle Preise stehen an **einer** Stelle: `daten/preise.json` (live: https://vaiacon.ch/daten/preise.json). Seiten, Chat (Vaia), Offerten-Dienst, PDF, Mails, Skills und Unterlagen lesen dort. ⛔ **Keine Zahl von Hand** in eine Seite, Mail, Vorlage oder einen Skill schreiben: auf der Website per `data-preis`, anderswo als Verweis auf den Katalog.

Vier Sätze gelten überall wortgleich und stehen im Katalog unter `saetze`:

1. **Ab-Preis:** Ab-Preise sind Fixpreise nach der Erstanalyse, nie offen nach oben.
2. **Betreuung:** Betreuung ist optional und kündbar auf Ende Folgemonat. Sie umfasst Überwachung, Fehlerbehebung und ein festes Anpassungsbudget im Monat.
3. **Fremdkosten:** Lizenzen, Hosting, KI-Nutzung und Telefonie rechnen wir nach Verbrauch separat ab. Sie laufen auch ohne Betreuung.
4. **Beispiel erstes Jahr:** Einrichtung plus zwölf Monate Betreuung, zuzüglich der genannten Fremdkosten.

Dazu im Katalog: `maengel` (90 Tage nach Übergabe ohne Rechnung), `abnahme`, `gueltigkeit` (30 Tage).

**Wörter:** Betreuung (nicht Service, Retainer, Wartung, Abo) · Chatbot mit Firmenwissen (nie «Agent») · Anbindung / Standard-Connector / individuell (nicht Integration, Schnittstelle) · Einfache / Mittelgrosse / Komplette Automation. Nie: «typisch», «garantiert», Platzierungen, Umsatzwirkung, «Geld zurück». **Nur intern, nie nach aussen:** Listenstunden, Produkttest, Marge, Status.

**Nach jeder Preisänderung, erst nach dem Merge, in dieser Reihenfolge:**
1. Abgleich abwarten (zwei Minuten).
2. Offerten-Dienst neu bauen, mit `--force-recreate`, Image-ID prüfen.
3. Bot neu starten: `cd /srv/vaiacon-bot && docker compose restart` (er liest sein Wissen nur beim Start; vorher `scripts/bot_wissen.py`).
4. intern neu bauen.

Nie vor dem Merge, sonst nennt der Bot neue und die Seite alte Preise.

**Prüfskript:** `scripts/preise_pruefen.py` findet jede CHF-Zahl ausserhalb von `data-preis`, vergleicht Seiten, llms.txt, Bot-Wissen und Offerten-Dienst mit dem Katalog. Rot heisst nicht fertig.

Preise ändern: `git branch --show-current` prüfen, Änderung im eigenen Zweig mit Zusammenführungsanfrage, nie `--force`. `preise.json`, die Angebotsseiten (bot, learning, visibility, service) und den Offerten-Dienst nicht parallel von zwei Personen anfassen; vorher im Chat sagen.
