# Vorschlag für AGB und Datenschutz (nicht eingebaut)

Stand 04.10.2026. `agb.html` und `datenschutz.html` sind unverändert. Das hier sind Vorschläge zur Prüfung durch Philip und André. Rechtliche Fragen (Widerruf, Fernabsatz, Preisangabeverordnung, Auftragsbearbeitung bei Offerten) bitte vor dem Einbau juristisch gegenlesen lassen; ich bin keine Rechtsberatung.

## AGB

Ausgangslage: Die AGB kennen Beratung, Automatisierung, Schulungen, Support. Sie sagen in Ziffer 5, dass «nach Aufwand» abgerechnet wird, sofern nichts anderes vereinbart ist. Neu gibt es Festpreise aus dem Katalog.

1. **Ziffer 3 Leistungsumfang**: Aufzählung auf die drei Bereiche abstimmen (KI-Kompetenz mit Trainings, Coaching, E-Learning, Lernvideos, Kleinst-Lerneinheiten; Sichtbarkeit mit SEO und GEO; Automationen inklusive Chatbot, Telefonassistent, Integration) plus Begleitung. Ein Satz genügt: «Der konkrete Leistungsumfang ergibt sich aus Offerte oder Vertrag» steht schon da und passt.
2. **Ziffer 5 Vergütung**, Vorschlag:
   - «Es gelten die Preise der Offerte. Alle Preise sind in Schweizer Franken und enthalten die Mehrwertsteuer von 8,1 %. Eine Offerte gilt 30 Tage.»
   - «Richtofferten aus dem Offerten-Tool auf vaiacon.ch sind unverbindlich. Verbindlich wird eine Offerte erst, wenn die Anbieterin sie bestätigt.»
   - «Festpreise (Automationen nach Erstanalyse, Pakete) gelten für den vereinbarten Umfang; Mehraufwand wird vorab angekündigt und nach den Stundensätzen der Offerte verrechnet.»
   - Die Zeile «Abrechnung nach Aufwand» als Rückfall behalten.
3. **Laufende Betreuung und Betreuung Sichtbarkeit (monatlich)**: neue Ziffer «Laufende Leistungen»: monatlich kündbar, Kündigungsfrist (Katalog sagt «monatlich kündbar»; Frist festlegen, z. B. auf Ende des Folgemonats), Abrechnung monatlich im Voraus oder nachträglich (Philip und André entscheiden). Betrifft `si-betreuung-*` und `be-*` mit Einheit «pro Monat».
4. **Schulungen (Trainings, Workshops)**: Preis gilt pro Gruppe, nicht pro Person; Regel für Absagen und Verschiebungen fehlt (Vorschlag: bis 14 Tage vor Termin kostenlos, danach 50 %, bis 3 Tage 100 %). Teilnehmerzahl und Ort in der Offerte festhalten.
5. **E-Learning nach Mass (CHF 380 pro Lernminute)**: Abnahme und Nutzungsrecht regeln. Ziffer 11 (Urheberrechte) lässt Inhalte bei der Anbieterin; für E-Learning nach Mass braucht es eine Nutzungsklausel (Kunde darf intern nutzen, nicht weitergeben).
6. **KI-Standortanalyse im Betrieb (CHF 2'150 pauschal)**: Ergebnis ist ein Bericht, keine Erfolgszusage. Ein Satz in Ziffer 12 oder bei den Leistungen.
7. **Sichtbarkeit**: Die Ziffer 12 (Haftung) sollte ausdrücklich sagen, dass Platzierungen in Suchmaschinen und Nennungen in KI-Antworten nicht zugesichert werden. Die Seite sagt es schon («Ein Platz auf Platz 1 kann niemand versprechen»), die AGB nicht.
8. **Gratis-Angebote**: Der Abschnitt «keine Gebühr» fehlt. Ein Satz: «Erstgespräch, KI-Standortbestimmung (Selbsttest), Erstanalyse und der automatische Check sind kostenlos und unverbindlich; es entsteht kein Vertrag.»
9. **Academy**: Die AGB erwähnen sie nicht, nichts zu streichen.

## Datenschutz

Ausgangslage: Der Text sagt «keine Besucherstatistik», «kein Konto», Chat und Check gehen über den Schweizer Server an Anthropic (USA), Gesprächsverlauf wird nicht gespeichert. Neu dazugekommen, was der Text noch nicht abdeckt:

1. **Offerten-Tool (`/api/offerte`)**: Eingaben (Auswahl, Wunsch, Kontakt: Name, Mail, ggf. Firma, Telefon) gehen per POST an den Server. Fehlt im Text: was gespeichert wird, wie lange, ob es zu Anthropic geht, wohin die Offerte per Mail geht. Auswahl wird zusätzlich in `sessionStorage` des Browsers gehalten (nur im Tab, verschwindet beim Schliessen). Neuer Abschnitt «Offerten-Tool» nach dem Muster von «Visibility-Check» (Zweck, Daten, Weitergabe, Aufbewahrung). Bei den Fristen im Abschnitt «Aufbewahrung und Löschung» eine Zeile ergänzen. Das genaue Verhalten des Dienstes bitte mit dem Server-Code abgleichen (die Seite kenne ich nur vom Browser-Skript, nicht von der Serverseite).
2. **KI-Standortbestimmung (`/api/standort`)**: Das Ergebnis (Punkte) entsteht im Browser; die Einschätzung von Vaia kommt vom Server (Antworten und Profilangaben gehen dorthin, vermutlich weiter an Anthropic). Browser-Skript sagt «nichts gespeichert, kein Cookie». Neuer Abschnitt analog zum Chat. Ausdrücklich nennen: Profil (drei Auswahlfragen) und Antworten, keine Namen. Aufbewahrung serverseitig klären.
3. **Anthropic-Liste**: In der Aufzählung der Empfänger (Zeile mit «Chat mit Vaia, Visibility-Check») «Offerten-Tool» und «KI-Standortbestimmung» ergänzen, falls diese Anthropic nutzen. Im Abschnitt «Bekanntgabe ins Ausland» dasselbe.
4. **«Kurz gesagt» und «Hosting»**: Die Aufzählung «Ausnahmen gibt es drei: Chat, Kontaktformular, Visibility-Check» wird zu fünf (plus Offerten-Tool, Standortbestimmung). Der Satz «Einiges geht ins Ausland: … Chat mit Vaia und die Auswertung im Visibility-Check» ebenfalls.
5. **KI-KMU-News**: Nach den Dateien zu urteilen (statische Seiten, Feed, `neueste.json`) braucht es keine Personendaten. Falls später ein Newsletter oder eine Mail-Anmeldung kommt, braucht es einen eigenen Abschnitt (Einwilligung, Abmeldung, Versanddienst).
6. **Rate-Limit per IP** (Offerte, Standortbestimmung): sofern wie beim Chat im Arbeitsspeicher, im Abschnitt «Aufbewahrung» mit derselben Formel nennen.
7. **Generierte Strukturdaten**: Der Block `Organization` im `<head>` beider Seiten enthält noch die alte Beschreibung («für Kleinstbetriebe gibt es kostenlose Kurse»). Das ist kein Rechtstext; `python3 scripts/strukturdaten.py --nur agb.html datenschutz.html` ersetzt nur diesen Block und lässt den Rest unberührt. Ich habe es nicht ausgeführt, weil beide Dateien gesperrt waren.
8. **Impressum**: keine Änderung nötig.

## Reihenfolge (Empfehlung)

Erst Datenschutz Punkt 1 und 2 (Offerten-Tool und Standortbestimmung sind live oder gehen live und verarbeiten Personendaten), dann AGB Ziffer 5, dann der Rest.
