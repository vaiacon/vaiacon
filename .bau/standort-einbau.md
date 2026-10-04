# Einbau: KI-Standortbestimmung für Führungskräfte

Eigenständiger Baustein. Dateien: `ui_kits/website/standort.js`, `ui_kits/website/standort.css`. Keine bestehende Datei wurde geändert.

## Snippet (an die Stelle im Seitenkörper)

```html
<section id="standortbestimmung" class="sv-section" aria-labelledby="standort-titel">
  <div class="sv-wrap">
    <div class="sv-center">
      <p class="sv-kicker">Standortbestimmung</p>
      <h2 id="standort-titel">Wo steht Ihr Betrieb mit KI?</h2>
      <p class="sv-lead">Zwölf kurze Fragen, ein ehrliches Ergebnis und eine persönliche Einschätzung, was sich als Nächstes lohnt.</p>
    </div>
    <div id="standort-app">
      <p>Die Standortbestimmung braucht JavaScript. Wenn Sie wissen möchten, wo Ihr Betrieb mit KI steht, schreiben Sie uns kurz über die <a href="kontakt">Kontaktseite</a>. Wir melden uns persönlich.</p>
    </div>
  </div>
</section>
```

Im `<head>` (nach `visibility.css`) und vor `</body>`:

```html
<link rel="stylesheet" href="ui_kits/website/standort.css?v=20261004-umbau">
<script src="ui_kits/website/standort.js?v=20261004-umbau"></script>
```

Voraussetzung: Die Seite lädt bereits `styles.css`, `mockup-entwurf.css` und `visibility.css` (Klassen `sv-section`, `sv-wrap`, `sv-center`, `sv-kicker`, `sv-lead`, `sv-button`, `sv-label`). Das Skript steht nach dem `#standort-app`-Element.

## Empfohlener Ort

Auf der KI-Kompetenz-Seite nach dem Abschnitt, der die Schulungen vorstellt, und vor dem Kontaktabschluss. Wer dort angekommen ist, versteht, worum es geht, und die Standortbestimmung führt natürlich zum Gespräch.

## Vorschlag Text

- Überschrift (H2): «Wo steht Ihr Betrieb mit KI?»
- Einleitung: «Zwölf kurze Fragen, ein ehrliches Ergebnis und eine persönliche Einschätzung, was sich als Nächstes lohnt.»

## Verhalten

- Bilder: `assets/vaiacon-buerobot-standort-kompass.webp/.png`; fehlt die Datei, springt es auf `assets/vaiacon-buerobot-schulung-zeigestab.png`. Der Druckkopf nutzt `assets/logo-lockup-terra.png` (Pfad prüfen, falls das Logo anders heisst).
- Pfade der Bilder leitet das Skript aus seiner eigenen Adresse ab (`../../assets/` relativ zu `ui_kits/website/`).
- Links im Ergebnis: `learning`, `bot`, `visibility`, `kontakt#formular`, `offerte`, `datenschutz`, ohne `.html`. Für lokale Proben lassen sich am `#standort-app` die Attribute `data-link-basis` und `data-link-endung` setzen.
- Schnittstelle: `POST (window.VAIACON_API_BASIS || '') + '/api/standort'`. Ist `VAIACON_API_BASIS` nicht gesetzt: leer auf vaiacon.ch, sonst `https://vaiacon.ch`. Zeitlimit 45 s. Bei Netzfehler, 429, 502, Zeitüberschreitung oder unbrauchbarer Antwort erscheint ein Ersatztext aus Stufe und schwächstem Bereich. Der Besucher sieht nie eine Fehlermeldung.
- `fangfrage` ist ein unsichtbares Fangfeld im Profilschritt (Mensch lässt es leer). Der Dienst sollte bei nicht leerem Wert die Anfrage verwerfen oder neutral behandeln.
- Texte aus der Antwort werden nur als Text eingesetzt.
- Es wird nichts gespeichert (kein Cookie, kein localStorage).

## Probemodi

- `?probe=1`: eingebaute Beispielantwort statt Dienst.
- `?probe=fehler`: spielt den Ausfall durch (Ersatztext).
- Der Probecode steckt in der Produktivdatei und ist harmlos.

## Datenschutz

Die Antworten (ohne Namen oder Kontaktdaten) gehen an unseren KI-Dienst. In der Datenschutzerklärung sollte ein Satz dazu stehen: welche Angaben, an welchen Anbieter, wo verarbeitet, ob gespeichert. Der Auftakt verlinkt auf `datenschutz`.

## Prüfen

`python3 -m http.server 8932` im Repo-Stamm, dann `http://localhost:8932/.bau/proben/standort.html?probe=1`.
