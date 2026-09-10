// vaiaconAcademy — Lernplan-Katalog. Wird von der Landingpage und der Lernplan-Seite gelesen.
window.ACADEMY_PLANS = [
  {
    n: '01', title: 'Grundlagen: KI einordnen', level: 'EINSTIEG', hours: '41 Min',
    nutzen: 'Ab der ersten Woche erledigen Sie Texte, Zusammenfassungen und Recherchen in der halben Zeit — rund 30 Minuten pro Arbeitstag, ohne dass Sie etwas installieren müssen.',
    tile: 'Der Einstieg ohne Fachchinesisch — was die Werkzeuge können, wie Sie sie ansprechen und woran Sie eine falsche Antwort erkennen.',
    lead: 'Bevor wir automatisieren, klären wir das Handwerk: was diese Werkzeuge heute wirklich leisten, wie man sie anspricht, woran Sie eine erfundene Antwort erkennen und wie Sie eine Routine aufbauen, die eine Woche später noch steht.',
    bild: 'Bild: Inhaber am Laptop im Betrieb',
    img: 'assets/lernplan-01.png',
    takeaways: ['Prompt-Karte A5', 'Startanleitung Schritt für Schritt', '30-Minuten-Wochenplan', 'Vergleich der gängigen Assistenten', 'Prüfliste gegen erfundene Antworten'],
    lessons: [
      ['Was KI heute kann — und was nicht', 'VIDEO', '3 Min'],
      ['Welcher Assistent für welchen Zweck', 'VIDEO', '3 Min'],
      ['Das erste Gespräch mit einem Assistenten', 'WERKSTATT', '5 Min', {
        absaetze: [
          'Ein KI-Assistent ist kein Suchfeld. Sie schreiben ihm wie einem neuen Mitarbeiter am ersten Tag: schnell und belesen, aber ohne jede Kenntnis Ihres Betriebs. Was er wissen muss, muss im Text stehen.',
          'Fangen Sie mit einer echten Aufgabe von heute an, nicht mit einem Testsatz. Eine Kundenantwort, die Sie ohnehin schreiben müssten, zeigt Ihnen mehr als jedes Kursbeispiel.',
        ],
        punkte: [
          'Schreiben Sie in ganzen Sätzen, nicht in Stichworten.',
          'Sagen Sie, für wen der Text ist und wie lang er werden soll.',
          'Antwortet er daneben, schreiben Sie zurück, was fehlt — statt neu anzufangen.',
          'Kundennamen und Adressen lassen Sie vorerst weg. Warum, steht in Lernplan 02.',
        ],
        uebung: 'Nehmen Sie eine E-Mail, die heute ohnehin ansteht, und lassen Sie sich einen Entwurf schreiben. Vergleichen Sie ihn mit dem, was Sie selbst geschrieben hätten.',
      }],
      ['Gute Anweisungen: die 4 Bausteine', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Eine gute Anweisung hat 4 Teile. Fehlt einer, rät das Werkzeug — und raten heisst hier: irgendetwas Plausibles.',
          'Der vierte Baustein wirkt am stärksten. Ein einziges echtes Beispiel aus Ihrem Betrieb bringt mehr als 3 Absätze Erklärung.',
        ],
        punkte: [
          'Rolle: «Sie sind Sachbearbeiterin in einem Schweizer Malerbetrieb.»',
          'Aufgabe: was genau entstehen soll, in einem Satz.',
          'Rahmen: Länge, Ton, Sprache — und was nicht vorkommen darf.',
          'Beispiel: ein Text von Ihnen, an dem sich der Assistent ausrichtet.',
        ],
        uebung: 'Bauen Sie eine Anweisung mit allen 4 Teilen für eine Aufgabe, die bei Ihnen wöchentlich anfällt. Heben Sie sie auf — daraus wird Ihre Prompt-Karte.',
      }],
      ['Wenn der Assistent Unsinn erzählt', 'WERKSTATT', '6 Min', {
        absaetze: [
          'Diese Werkzeuge sagen nie «ich weiss es nicht». Sie erzeugen den wahrscheinlichsten nächsten Satz, und der klingt auch dann souverän, wenn er falsch ist. Das ist keine Panne, sondern die Bauart.',
          'Heikel wird es bei Zahlen, Namen, Paragraphen und Fristen — also genau dort, wo es im Betrieb zählt.',
        ],
        punkte: [
          'Alles, was zitiert wird, prüfen Sie an der Quelle. Nicht beim Assistenten nachfragen.',
          'Je genauer eine Zahl klingt, desto misstrauischer sollten Sie sein.',
          'Fragen Sie dieselbe Sache zweimal in getrennten Gesprächen. Weichen die Antworten ab, ist mindestens eine erfunden.',
          'Fehlt eine Quelle, gilt die Aussage als unbelegt — nicht als richtig.',
        ],
        uebung: 'Lassen Sie sich 3 Angaben zu Ihrer Branche nennen und prüfen Sie jede einzelne nach. Notieren Sie, wie viele gestimmt haben.',
      }],
      ['Eigene Dokumente befragen', 'WERKSTATT', '6 Min', {
        absaetze: [
          'Richtig nützlich wird es, wenn der Assistent mit Ihren Unterlagen arbeitet statt mit Weltwissen: Offerten, Protokolle, Leistungsbeschriebe, Handbücher.',
          'Sie legen ein Dokument bei und stellen Fragen dazu. Die Antworten stützen sich dann auf den Text statt auf Vermutungen — sofern Sie das ausdrücklich verlangen.',
        ],
        punkte: [
          'Sagen Sie: «Antworte nur aus dem beigelegten Dokument. Steht es nicht drin, schreib das.»',
          'Ein Dokument nach dem anderen. 10 auf einmal verwässern die Antwort.',
          'Lassen Sie sich die Stelle nennen, auf die sich die Antwort stützt.',
          'Vor dem Beilegen: Entfernen Sie unbedingt die persönlichen Daten. Was das genau heisst, steht in Lernplan 02.',
        ],
        uebung: 'Nehmen Sie Ihre letzte Offerte und lassen Sie in 5 Sätzen zusammenfassen, was der Kunde bekommt. Prüfen Sie, ob etwas fehlt.',
      }],
      ['Aus einer guten Antwort eine Vorlage machen', 'WERKSTATT', '6 Min', {
        absaetze: [
          'Die meiste Zeit geht verloren, weil jede Woche dieselbe Anweisung neu formuliert wird. Eine gute Antwort ist ein Zwischenergebnis — die Vorlage ist das Ergebnis.',
        ],
        punkte: [
          'Hat eine Anweisung funktioniert, kopieren Sie sie sofort in eine Datei.',
          'Ersetzen Sie das Konkrete durch Platzhalter: [Kunde], [Datum], [Leistung].',
          'Geben Sie ihr einen Namen, unter dem Sie sie in einem Monat wiederfinden.',
          'Eine Vorlage, die zweimal funktioniert hat, gehört ins Team — nicht in Ihren Kopf.',
        ],
        uebung: 'Legen Sie eine Datei «Prompt-Karte» an und tragen Sie die erste Vorlage ein. 3 bis 5 Stück decken den Alltag der meisten Betriebe ab.',
      }],
      ['Ihr Wochenrhythmus: 30 Minuten, die bleiben', 'ÜBUNG', '5 Min', {
        absaetze: [
          'Der häufigste Grund, warum es nach 2 Wochen wieder einschläft: Es gibt keinen festen Platz im Kalender. Gute Vorsätze verlieren gegen den Alltag.',
          '30 Minuten pro Woche reichen für den Anfang. Wichtiger als die Dauer ist, dass der Termin immer am selben Tag steht.',
        ],
        punkte: [
          'Ein fester Termin, 30 Minuten, gleicher Wochentag.',
          'Eine Aufgabe pro Woche — die, die Sie diese Woche ohnehin nervt.',
          'Halten Sie fest, was funktioniert hat. 2 Zeilen genügen.',
          'Nach 4 Wochen schauen Sie zurück: Was ist geblieben, was nicht?',
        ],
        uebung: 'Tragen Sie den Termin jetzt für die nächsten 4 Wochen ein. Nicht später — jetzt.',
      }],
    ],
  },
  {
    n: '02', title: 'Datenschutz & Sicherheit', level: 'GRUNDLAGE', hours: '35 Min',
    nutzen: 'Sie wissen, welche Kundendaten rein dürfen und welche nie. Eine einzige vermiedene Datenschutzpanne ist teurer als jede Weiterbildung.',
    tile: 'Was rein darf und was nie: revDSG, Anonymisieren, Cloud-Standort.',
    lead: 'Die Lektionen, die vor allen anderen kommen sollten: welche Daten Sie nie eingeben, wie Sie Kundenangaben in 2 Minuten anonymisieren und was das revDSG von Ihrem Betrieb verlangt.',
    bild: 'Bild: Aktenordner und Bildschirm',
    img: 'assets/lernplan-02.png',
    takeaways: ['Merkblatt «nie eingeben»', 'Anonymisierungs-Vorlage', 'Sicherheits-Check auf einer Seite'],
    lessons: [
      ['Was Sie nie eingeben dürfen', 'VIDEO + CHECK', '6 Min', {
        absaetze: [
          'Alles, was Sie in ein KI-Werkzeug tippen, verlässt Ihren Betrieb. Bei den meisten Diensten landet es auf Servern im Ausland. Was dort einmal liegt, holen Sie nicht zurück.',
          'Die Regel ist einfacher, als sie klingt: Würden Sie es einem fremden Menschen am Nebentisch vorlesen? Wenn nein, gehört es nicht hinein.',
        ],
        punkte: [
          'Namen, Adressen, Geburtsdaten und AHV-Nummern von Kunden und Mitarbeitenden.',
          'Gesundheitsangaben, Lohndaten, Betreibungen — das wiegt besonders schwer.',
          'Zugangsdaten, Passwörter, Bank- und Kartennummern. Nie, unter keinen Umständen.',
          'Verträge und Offerten fremder Firmen, die Ihnen vertraulich vorliegen.',
        ],
        uebung: 'Gehen Sie die letzten 5 Dinge durch, die Sie einem Assistenten gegeben haben. Was davon hätte draussen bleiben müssen?',
      }],
      ['revDSG — Was es ist und was wir darüber wissen müssen', 'WISSEN', '8 Min', {
        absaetze: [
          'Das revidierte Datenschutzgesetz gilt seit dem 1. September 2023 und löste das Gesetz von 1992 ab. Es betrifft jeden Betrieb, der Daten von Menschen bearbeitet — vom Einmannbetrieb bis zum Konzern. Firmendaten schützt es nicht mehr: Nur natürliche Personen fallen darunter.',
          'Der wichtigste Unterschied zur europäischen DSGVO: Das revDSG ist kein Erlaubnisgesetz. Sie brauchen für die normale Bearbeitung keine Einwilligung. Verlangt sind Transparenz, ein erkennbarer Zweck und Verhältnismässigkeit — man muss sagen, was man tut, und darf nicht mehr erheben als nötig.',
          'Bemerkenswert ist die Strafseite: Bussen bis 250 000 Franken treffen die verantwortliche Person, nicht die Firma. Das ist der Grund, warum Zuständigkeit im Betrieb geklärt sein sollte.',
        ],
        punkte: [
          'Informationspflicht: Wer Daten erhebt, nennt sich selbst, den Zweck, die Empfänger und das Zielland. In der Praxis über die Datenschutzerklärung.',
          'Besonders schützenswert sind Gesundheit, Religion, politische Ansichten, biometrische Daten und Strafverfahren. Dort gelten strengere Regeln.',
          'Ein Bearbeitungsverzeichnis müssen Betriebe unter 250 Mitarbeitenden meist nicht führen — ausser bei heiklen Daten in grossem Umfang.',
          'Datenexport nur in Länder mit angemessenem Schutz. Die Liste führt der Bundesrat; sonst braucht es Standardvertragsklauseln.',
          'Auskunftsrecht: Betroffene dürfen verlangen zu erfahren, was Sie über sie gespeichert haben. In der Regel kostenlos und innert 30 Tagen.',
          'Datenpanne mit hohem Risiko: Meldung an den EDÖB, so rasch als möglich.',
          'Datenschutz durch Technik: sparsame Voreinstellungen von Anfang an, nicht als Nachbesserung.',
          'Wer für die EU anbietet, hat zusätzlich die DSGVO am Hals. Die beiden ersetzen einander nicht.',
        ],
        uebung: 'Prüfen Sie 2 Dinge: Steht auf Ihrer Website eine Datenschutzerklärung, die Zweck und Empfänger nennt? Und wüssten Sie heute, wer im Betrieb für eine Auskunftsanfrage zuständig wäre?',
      }],
      ['Kundendaten anonymisieren — schnell und sauber', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Anonymisieren heisst nicht löschen. Sie ersetzen das Erkennbare durch Platzhalter und behalten alles, was die Aufgabe braucht — der Assistent arbeitet mit der Struktur, nicht mit der Person.',
          'Das dauert nach etwas Übung unter 2 Minuten und ist der Unterschied zwischen zulässig und heikel.',
        ],
        punkte: [
          'Namen werden zu [Kunde], [Mitarbeiterin], [Lieferant].',
          'Adressen werden zu [Ort] — die Postleitzahl brauchen Sie fast nie.',
          'Beträge und Daten dürfen bleiben, solange niemand daraus die Person erkennt.',
          'Prüfen Sie den Text vor dem Absenden noch einmal von oben nach unten.',
        ],
        uebung: 'Nehmen Sie eine echte Kundenmail und anonymisieren Sie sie. Lassen Sie danach jemanden aus dem Team raten, um wen es geht — gelingt es, war es zu wenig.',
      }],
      ['Auftragsbearbeitung und Cloud — wer darf Ihre Daten sehen', 'WISSEN', '7 Min', {
        absaetze: [
          'Sobald ein fremder Dienst Daten für Sie bearbeitet, ist das eine Auftragsbearbeitung: der Mailanbieter, die Buchhaltungssoftware, der Cloud-Speicher, das KI-Werkzeug. Sie geben die Arbeit ab — die Verantwortung nicht. Gegenüber Ihren Kunden bleiben Sie zuständig.',
          'Das revDSG erlaubt das ausdrücklich, knüpft es aber an Bedingungen: Der Dienstleister darf nur das tun, was Sie selbst dürften, die Sache muss vertraglich geregelt sein, und für weitere Unterauftragnehmer braucht er Ihre Zustimmung.',
          'In der Praxis heisst das ein Auftragsbearbeitungsvertrag, kurz AVV. Ernsthafte Anbieter halten einen bereit — man muss ihn nur suchen und abschliessen, statt es zu lassen.',
        ],
        punkte: [
          'Machen Sie zuerst eine Liste: Welcher Dienst sieht welche Personendaten?',
          'Für jeden davon einen AVV abschliessen. Bei den meisten Anbietern 2 Klicks.',
          'Daten dürfen ins Ausland, wenn das Land angemessen schützt. Die Liste führt der Bundesrat; die EU- und EWR-Staaten stehen darauf.',
          'Sonst braucht es Standardvertragsklauseln. Für die USA gibt es seit 2024 ein Rahmenabkommen — es hilft aber nur bei Anbietern, die sich dafür zertifiziert haben.',
          '«Server in der Schweiz» ist nicht dasselbe wie «Daten bleiben in der Schweiz». Prüfen Sie auch, von wo aus der Support zugreift.',
          'Unterauftragnehmer ändern sich. Gute Anbieter führen eine öffentliche Liste und melden Änderungen.',
          'Wo Sie die Wahl haben, wählen Sie den kürzeren Weg: ein Dienst weniger ist ein Vertrag und ein Risiko weniger.',
        ],
        uebung: 'Schreiben Sie Ihre Dienste auf und markieren Sie, für welche Sie einen AVV haben. Die unmarkierten sind Ihre Aufgabenliste für diese Woche.',
      }],
      ['Der Sicherheits-Check für Ihren Betrieb', 'ÜBUNG', '7 Min', {
        absaetze: [
          'Datenschutz scheitert selten am Wissen und fast immer daran, dass niemand zuständig ist. Ein Blatt Papier mit 5 beantworteten Fragen ist mehr wert als ein Ordner Theorie.',
        ],
        punkte: [
          'Welche Werkzeuge sind bei uns im Einsatz — auch die, die jemand privat mitgebracht hat?',
          'Wer darf welches Werkzeug benutzen, und wer hat das entschieden?',
          'Wo stehen die Server der Anbieter, die wir nutzen?',
          'Wer merkt es, wenn etwas schiefläuft, und was passiert dann?',
        ],
        uebung: 'Beantworten Sie die 4 Fragen schriftlich für Ihren Betrieb. Wo Sie keine Antwort haben, steht Ihre nächste Aufgabe.',
      }],
    ],
  },
  {
    n: '03', title: 'Korrespondenz & E-Mail', level: 'PRAXIS', hours: '33 Min',
    nutzen: 'Aus 2 Stunden Postfach am Morgen werden 40 Minuten — mit Antworten, die klingen wie von Ihnen geschrieben.',
    tile: 'Der Posteingang zuerst — Antworten, die nach Ihnen klingen.',
    lead: 'Wo die meisten Stunden verschwinden: im Postfach. Sie bauen Bausteine für Ihre häufigsten Antworten, lernen den Ton treffen und behalten die heiklen Mails selbst in der Hand.',
    bild: 'Bild: Postfach am Morgen',
    img: 'assets/lernplan-03.png',
    takeaways: ['Ton-Profil Ihres Betriebs', 'Baustein-Set für Standardantworten', 'Leitfaden für heikle Mails'],
    lessons: [
      ['Ihre Zeitfresser im Postfach finden', 'ÜBUNG', '6 Min', {
        absaetze: [
          'Bevor Sie etwas beschleunigen, müssen Sie wissen, was Sie überhaupt aufhält. Die meisten Betriebe schätzen falsch — die Zeit geht nicht bei den schwierigen Mails verloren, sondern bei den vielen gleichen.',
        ],
        punkte: [
          'Führen Sie eine Woche lang Strichliste: Welche Art Mail kam wie oft?',
          'Notieren Sie grob, wie lange Sie je Antwort brauchen.',
          'Multiplizieren Sie Anzahl mal Dauer. Die grösste Zahl gewinnt.',
          'Fangen Sie dort an — nicht bei dem, was Sie am meisten nervt.',
        ],
        uebung: 'Zählen Sie eine Woche lang mit. Sie werden überrascht sein, welche Mailart oben steht.',
      }],
      ['Mails, die nach Ihnen klingen', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Der häufigste Vorwurf in Bezug auf KI-generierte Texte: Sie klingen glatt und manchmal holprig. Das liegt nicht am eigentlichen Werkzeug, sondern an der Tatsache, dass ihm niemand gesagt hat, wie es formuliert werden soll.',
          '3 eigene Mails als Beispiel genügen meistens. Der Assistent übernimmt Satzlänge, Anrede und Verabschiedung.',
        ],
        punkte: [
          'Legen Sie 3 Mails bei, die Sie selbst geschrieben haben und gut finden.',
          'Sagen Sie, was Sie nie schreiben würden — «gerne», «zeitnah», Ausrufezeichen.',
          'Bestimmen Sie Anrede und Gruss ein für alle Mal.',
          'Lesen Sie den Entwurf laut. Was Sie so nicht sagen würden, streichen Sie.',
        ],
        uebung: 'Lassen Sie dieselbe Mail zweimal schreiben: einmal ohne Beispiele, einmal mit Ihren 3. Entscheiden Sie selbst, welche Version Ihnen und Ihrem Betrieb besser entspricht.',
      }],
      ['Standardantworten als Bausteine', 'WERKSTATT', '7 Min', {
        absaetze: [
          '80 % Ihrer Antworten sind Varianten zwischen 5 – 10 Grundtexten. Wer einmal sauber baut, braucht danach nur noch zu ergänzen.',
        ],
        punkte: [
          'Suchen Sie im Gesendet-Ordner nach dem, was Sie am häufigsten schreiben.',
          'Bauen Sie je einen Baustein mit Platzhaltern: [Kunde], [Termin], [Betrag].',
          'Ein Baustein ist fertig, wenn er ohne Nachdenken einsetzbar ist.',
          'Legen Sie den Baustein dort ab, wo auch Ihre Stellvertretung ihn findet.',
        ],
        uebung: 'Bauen Sie heute die 3 häufigsten Bausteine. Mehr braucht es für den Anfang nicht.',
      }],
      ['Heikle Mails: Reklamation, Mahnung, Absage', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Bei heiklen Mails hilft KI anders als bei Routine: nicht schneller, sondern kühler. Sie schreiben im ersten Ärger, lassen umformulieren und entscheiden dann in Ruhe, was rausgeht.',
          'Der Assistent nimmt die Schärfe heraus, ohne die Sache weichzuspülen — wenn Sie ihm sagen, dass die Position bleibt.',
        ],
        punkte: [
          'Schreiben Sie zuerst ungefiltert auf, worum es geht. Das schickt niemand ab.',
          'Verlangen Sie: sachlich, freundlich, Position unverändert.',
          'Lassen Sie sich 2 Fassungen geben und wählen Sie.',
          'Bei rechtlich heiklen Fällen entscheidet ein Mensch, nicht der Entwurf.',
        ],
        uebung: 'Nehmen Sie eine Reklamation, die Sie geärgert hat, und lassen Sie eine sachliche Antwort entwerfen. Vergleichen Sie mit dem, was Sie damals geschrieben haben.',
      }],
      ['Mehrsprachig antworten (F · I · E)', 'WERKSTATT', '5 Min', {
        absaetze: [
          'In der Schweiz ist die zweite Landessprache selten weit weg. KI übersetzt heute gut genug für Geschäftskorrespondenz — aber nur, wenn Sie den Zweck mitgeben.',
        ],
        punkte: [
          'Sagen Sie, an wen der Text geht: Kunde, Behörde, Lieferant.',
          'Verlangen Sie die Sie-Form auch dort, wo die Sprache es anders könnte.',
          'Fachbegriffe Ihres Gewerbes geben Sie vor — die rät er sonst.',
          'Bei Verträgen und Rechtstexten lassen Sie gegenlesen. Immer.',
        ],
        uebung: 'Übersetzen Sie eine Standardantwort ins Französische und lassen Sie sie zurückübersetzen. Wo der Sinn kippt, fehlte Zusammenhang.',
      }],
    ],
  },
  {
    n: '04', title: 'Offerten & Aufträge', level: 'PRAXIS', hours: '35 Min',
    nutzen: 'Eine Offerte in 10 Minuten statt in einer Stunde. Wer am selben Tag offeriert, gewinnt mehr Aufträge.',
    tile: 'Aus 5 Stichworten eine Offerte in Ihrer Struktur.',
    lead: 'Vom Stichwort zur fertigen Offerte — mit Ihren Positionen, Ihrer Preislogik und Ihrem Schlusssatz. Danach folgen Nachfassen und Auftragsbestätigung, damit nichts liegen bleibt.',
    bild: 'Bild: Offerte auf dem Bürotisch',
    img: 'assets/lernplan-04.png',
    takeaways: ['Offerten-Gerüst (Word)', 'Preislogik-Beschrieb', 'Nachfass-Sequenz (3 Mails)'],
    lessons: [
      ['Offerten aus Stichworten', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Der Weg vom Baustellentermin zur fertigen Offerte ist der teuerste Handgriff im Betrieb — und der langweiligste. Aus 10 Stichworten wird ein Entwurf, den Sie nur noch prüfen.',
        ],
        punkte: [
          'Diktieren Sie die Stichworte unterwegs, ordnen Sie später.',
          'Legen Sie eine alte, gute Offerte als Muster bei.',
          'Positionen, Mengen und Preise setzen Sie selbst — nie der Assistent.',
          'Der Entwurf ist ein Entwurf. Geprüft wird er von Ihnen.',
        ],
        uebung: 'Nehmen Sie die Stichworte Ihres letzten Termins und lassen Sie eine Offerte entwerfen. Stoppen Sie die Zeit gegenüber sonst.',
      }],
      ['Ihre Preislogik hinterlegen', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Preise entstehen bei Ihnen nicht zufällig: Stundensätze, Zuschläge, Mengenrabatte, Anfahrt. Wenn diese Logik einmal aufgeschrieben ist, rechnet sie der Assistent zuverlässig nach — und Sie sparen sich das Kopfrechnen.',
        ],
        punkte: [
          'Schreiben Sie Ihre Sätze und Zuschläge in einem Dokument zusammen.',
          'Halten Sie fest, wann ein Rabatt gilt und wann nicht.',
          'Legen Sie das Dokument jeder Offerten-Anfrage bei.',
          'Rechnen Sie das Ergebnis stichprobenweise nach. Vertrauen ist gut.',
        ],
        uebung: 'Schreiben Sie Ihre Preislogik auf eine Seite. Falls das schwerfällt, ist das die eigentliche Erkenntnis der Lektion.',
      }],
      ['Leistungsbeschriebe, die überzeugen', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Die meisten Leistungsbeschriebe listen auf, was gemacht wird. Kunden entscheiden aber danach, was sie davon haben. Der Unterschied kostet Aufträge.',
        ],
        punkte: [
          'Zu jeder Position ein Satz: Was hat der Kunde davon?',
          'Fachbegriffe erklären oder weglassen. Nicht stehen lassen.',
          'Was nicht enthalten ist, gehört genauso hinein wie das Enthaltene.',
          'Lassen Sie den Text von jemandem lesen, der Ihr Gewerbe nicht kennt.',
        ],
        uebung: 'Nehmen Sie 3 Positionen Ihrer letzten Offerte und schreiben Sie zu jeder den Nutzen dazu.',
      }],
      ['Nachfassen ohne Verkaufsdruck', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Die meisten Offerten werden nicht abgelehnt, sondern vergessen. Ein freundliches Nachfassen nach einer Woche holt einen Teil davon zurück — vorausgesetzt, es klingt nicht nach Verkauf.',
        ],
        punkte: [
          'Erste Nachfrage nach 7 Tagen, kurz und ohne Vorwurf.',
          'Bieten Sie etwas an: eine Frage klären, einen Termin, eine Variante.',
          'Zweite Nachfrage nach 3 Wochen. Danach ist Schluss.',
          'Ein Nein ist ein Ergebnis. Danken Sie dafür und fragen Sie nach dem Grund.',
        ],
        uebung: 'Bauen Sie eine Nachfass-Sequenz aus 2 Mails und legen Sie sie zu Ihren Bausteinen.',
      }],
      ['Auftragsbestätigung und Übergabe', 'WERKSTATT', '6 Min', {
        absaetze: [
          'Zwischen dem Ja des Kunden und dem Start der Arbeit gehen die meisten Missverständnisse verloren — und tauchen später als Streit wieder auf. Eine Bestätigung, die Umfang, Termin und Ansprechpartner festhält, kostet 5 Minuten.',
        ],
        punkte: [
          'Halten Sie fest, was vereinbart ist — und was ausdrücklich nicht.',
          'Nennen Sie einen Termin oder wenigstens eine Kalenderwoche.',
          'Benennen Sie beidseits eine Person, die entscheidet.',
          'Schicken Sie die Bestätigung, bevor Sie anfangen. Nicht danach.',
        ],
        uebung: 'Bauen Sie eine Vorlage für die Auftragsbestätigung mit Platzhaltern und verwenden Sie sie beim nächsten Auftrag.',
      }],
    ],
  },
  {
    n: '05', title: 'Buchhaltung & Belege', level: 'PRAXIS', hours: '32 Min',
    nutzen: 'Der Belegstapel fürs Treuhandbüro ist in 20 Minuten sortiert — und die Treuhandrechnung sinkt, weil die Rückfragen ausbleiben.',
    tile: 'Belegstapel, Spesen, Mahnwesen — bis zur Übergabe ans Treuhandbüro.',
    lead: 'Der Papierkram, den niemand mag: Belege vorsortieren, Spesen erfassen, Zahlungseingänge prüfen. Am Ende steht ein Monatsabschluss, der eine halbe Stunde dauert statt einen Abend.',
    bild: 'Bild: Belege und Kaffeetasse',
    img: 'assets/lernplan-05.png',
    takeaways: ['Belegübergabe-Checkliste', 'Mahn-Textbausteine', 'Monatsabschluss-Ablauf'],
    lessons: [
      ['Belege vorsortieren fürs Treuhandbüro', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Treuhandbüros rechnen nach Aufwand. Ein sortierter Stapel kostet weniger als ein Schuhkarton — der Unterschied steht am Jahresende auf der Rechnung.',
        ],
        punkte: [
          'Sortieren Sie nach Monat, dann nach Art: Einkauf, Spesen, Fahrzeug.',
          'Fotografieren Sie Belege am selben Tag. Später findet niemand sie.',
          'Unklare Belege markieren Sie sofort mit einer Notiz, was es war.',
          'Was fehlt, notieren Sie in einer Liste statt es zu suchen.',
        ],
        uebung: 'Sortieren Sie den laufenden Monat nach diesem Muster und fragen Sie Ihr Treuhandbüro, ob es so passt.',
      }],
      ['Spesen und Quittungen ohne Zettelchaos', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Spesen gehen nicht verloren, weil sie kompliziert sind, sondern weil der Zettel im Auto liegt. Was am Tag der Ausgabe erfasst ist, ist erfasst.',
        ],
        punkte: [
          'Foto der Quittung, dazu ein Satz: Was, für wen, warum.',
          'Ein fester Ort für alles. Nicht 3.',
          'Einmal pro Woche zusammenfassen lassen und prüfen.',
          'Was steuerlich zählt, klären Sie einmal mit dem Treuhandbüro — nicht mit dem Assistenten.',
        ],
        uebung: 'Erfassen Sie eine Woche lang jede Ausgabe am selben Tag. Wenn das steht, steht das Wichtigste.',
      }],
      ['Zahlungseingänge und Mahnwesen', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Mahnen mag niemand, deshalb wird es aufgeschoben — und mit jedem Monat sinkt die Chance auf Zahlung. Ein fester Rhythmus nimmt die Sache persönlich heraus.',
        ],
        punkte: [
          'Ein fixer Tag im Monat für den Abgleich offener Posten.',
          'Erste Erinnerung freundlich, nach 30 Tagen.',
          'Zweite nach 14 Tagen, mit Frist und Konsequenz.',
          'Vorlagen für alle Stufen bereithalten, damit es nicht am Formulieren scheitert.',
        ],
        uebung: 'Legen Sie die 3 Mahnstufen als Vorlagen an und tragen Sie den monatlichen Termin ein.',
      }],
      ['Monatsabschluss in einer halben Stunde', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Ein Monatsabschluss ist keine Buchhaltung, sondern eine Kontrolle: Stimmen die Zahlen ungefähr, fehlt nichts Grosses, ist etwas Auffälliges passiert?',
          'Wer das monatlich macht, hat am Jahresende keine Überraschungen — und muss nichts rekonstruieren.',
        ],
        punkte: [
          'Belege vollständig? Was fehlt, wird notiert, nicht gesucht.',
          'Offene Rechnungen und Zahlungseingänge gegeneinander halten.',
          'Auffälligkeiten in 2 Sätzen festhalten.',
          'Eine Zahl, die Sie jeden Monat verfolgen. Nur eine.',
        ],
        uebung: 'Machen Sie den Abschluss für den letzten Monat nach diesem Muster und stoppen Sie die Zeit.',
      }],
      ['Was der Treuhänder von Ihnen braucht', 'VIDEO', '3 Min'],
    ],
  },
  {
    n: '06', title: 'Sitzungen & Dokumentation', level: 'PRAXIS', hours: '25 Min',
    nutzen: 'Das Protokoll ist fertig, bevor alle den Sitzungsraum verlassen haben — inklusive Aufgabenliste mit Namen und Termin.',
    tile: 'Aus Notizen werden Protokolle, Aufgaben und Betriebswissen.',
    lead: 'Sitzungen enden meist mit Notizen, die niemand mehr liest. Hier entstehen daraus Protokolle, Aufgabenlisten mit Termin — und ein Betriebshandbuch, das mitwächst.',
    bild: 'Bild: Sitzungstisch mit Notizblock',
    img: 'assets/lernplan-06.png',
    takeaways: ['Protokoll-Vorlage', 'Aufgaben-Extraktion (Prompt)', 'Gerüst fürs Betriebshandbuch'],
    lessons: [
      ['Sitzungsnotizen zu Protokollen', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Notizen aus einer Sitzung sind Stichworte, Pfeile und halbe Sätze. Ein Protokoll ist etwas anderes: Es hält fest, was entschieden wurde und wer was bis wann tut.',
        ],
        punkte: [
          'Diktieren oder tippen Sie während der Sitzung roh mit.',
          'Verlangen Sie die Gliederung: Thema, Entscheid, Aufgabe, Frist.',
          'Was unklar bleibt, markieren Sie als offen — nicht wegformulieren.',
          'Personendaten heraus, bevor der Text in ein Werkzeug geht.',
        ],
        uebung: 'Machen Sie aus den Notizen Ihrer letzten Sitzung ein Protokoll und schicken Sie es den Teilnehmenden.',
      }],
      ['Aufgaben und Termine herausziehen', 'WERKSTATT', '6 Min', {
        absaetze: [
          'In jedem Protokoll stecken Aufgaben, aber sie stehen mitten im Text und werden übersehen. Sie gehören herausgezogen, mit Namen und Datum.',
        ],
        punkte: [
          'Jede Aufgabe braucht eine Person. «Wir» ist niemand.',
          'Jede Aufgabe braucht ein Datum. «Bald» ist kein Datum.',
          'Die Liste kommt an den Anfang des Protokolls, nicht ans Ende.',
          'Beim nächsten Mal ist der erste Punkt: Was ist aus der Liste geworden?',
        ],
        uebung: 'Ziehen Sie aus Ihrem letzten Protokoll alle Aufgaben heraus und ergänzen Sie fehlende Namen und Fristen.',
      }],
      ['Wissen festhalten: das Betriebshandbuch', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Das meiste Wissen eines Betriebs steht nirgends — es steckt in den Köpfen von 2, 3 Leuten. Wenn eine davon ausfällt, merkt man es sofort.',
          'Ein Handbuch entsteht nicht an einem Tag. Es entsteht, indem man jedes Mal aufschreibt, was man ohnehin gerade erklärt.',
        ],
        punkte: [
          'Beim nächsten Erklären mitschreiben lassen und daraus einen Text machen.',
          'Ein Ablauf pro Seite. Kurz, mit Bildern wo nötig.',
          'Datum drauf, damit man Veraltetes erkennt.',
          'An einem Ort, den alle finden — nicht auf einem Rechner.',
        ],
        uebung: 'Schreiben Sie einen Ablauf auf, den heute nur eine Person im Betrieb beherrscht.',
      }],
      ['Ihre Vorlagen-Bibliothek aufbauen', 'ÜBUNG', '5 Min', {
        absaetze: [
          'Nach ein paar Wochen haben Sie Bausteine, Prompt-Karten und Vorlagen — verstreut über Mails, Notizen und Köpfe. Ab hier lohnt sich Ordnung mehr als jede weitere Vorlage.',
        ],
        punkte: [
          'Ein Ort für alles, mit sprechenden Namen auf Deutsch.',
          'Je Vorlage ein Satz: wofür sie ist und wann nicht.',
          'Wer sie zuletzt geändert hat und wann, gehört dazu.',
          'Einmal im Quartal durchgehen und Totes wegwerfen.',
        ],
        uebung: 'Sammeln Sie alles, was Sie bisher gebaut haben, an einem Ort und geben Sie jedem Stück einen verständlichen Namen.',
      }],
    ],
  },
  {
    n: '07', title: 'Kundengewinnung & Sichtbarkeit', level: 'PRAXIS', hours: '39 Min',
    nutzen: 'Website-Texte und Kundenkontakte in einer Stunde pro Monat, in Ihrer Sprache — statt einem Agenturauftrag über einige Tausend Franken.',
    tile: 'Sichtbar bleiben in Ihrer Sprache — ohne Agentur, ohne Verkaufsdruck.',
    lead: 'Website-Texte, Anfragen, Referenzen und ein Rhythmus, den Sie auch im Frühling halten. Alles in Ihrer Sprache — und mit einer klaren Grenze, was Chefsache bleibt.',
    bild: 'Bild: Handwerker mit Kunde vor Ort',
    img: 'assets/lernplan-07.png',
    takeaways: ['Tonalitäts-Profil', 'Textgerüst für Leistungsseiten', 'Referenz-Anfrage (Vorlage)'],
    lessons: [
      ['Ihre Sprache festhalten: das Tonalitäts-Profil', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Jeder Betrieb hat einen Ton — nur steht er nirgends. Solange er nur im Kopf des Inhabers existiert, klingt jeder Text anders, je nachdem wer ihn schreibt.',
          'Ein Tonalitäts-Profil ist eine halbe Seite. Es beantwortet: Wie reden wir mit Kunden, und wie nicht?',
        ],
        punkte: [
          'Duzen oder siezen — einmal entscheiden, überall gleich.',
          '5 Wörter, die zu uns gehören. 5, die wir nie verwenden.',
          '2 eigene Texte als Muster, die es gut treffen.',
          'Ein Satz dazu, was uns von den anderen im Gewerbe unterscheidet.',
        ],
        uebung: 'Schreiben Sie das Profil auf eine halbe Seite und legen Sie es künftig jeder Textaufgabe bei.',
      }],
      ['Website-Texte, die nicht nach KI klingen', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Man erkennt KI-Texte an 3 Dingen: Sie sind zu glatt, zu allgemein und behaupten mehr, als sie belegen. Alle 3 lassen sich abstellen.',
        ],
        punkte: [
          'Ersetzen Sie jede Behauptung durch ein Beispiel aus Ihrem Betrieb.',
          'Streichen Sie Wörter wie «massgeschneidert», «innovativ», «ganzheitlich».',
          'Kurze Sätze. Wo 3 Nebensätze stehen, gehören 2 Punkte hin.',
          'Zahlen, Orte und Jahre machen einen Text sofort glaubwürdig.',
        ],
        uebung: 'Nehmen Sie den Text Ihrer Startseite und streichen Sie jede Aussage, die jeder Mitbewerber genauso schreiben könnte. Was bleibt, ist der Anfang.',
      }],
      ['Anfragen in 3 Minuten qualifizieren', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Nicht jede Anfrage ist ein Auftrag. Die Zeit geht bei denen verloren, aus denen ohnehin nichts wird — und die erkennt man an wenigen Merkmalen.',
        ],
        punkte: [
          '3 Fragen, die Sie jeder Anfrage stellen: Was, bis wann, welcher Rahmen?',
          'Wer auf keine davon antwortet, ist noch nicht so weit.',
          'Lassen Sie eingehende Anfragen zusammenfassen und einordnen.',
          'Eine höfliche Absage kostet 2 Minuten und spart 10 Stunden.',
        ],
        uebung: 'Bauen Sie eine Rückfrage-Vorlage mit Ihren 3 Fragen und setzen Sie sie bei der nächsten unklaren Anfrage ein.',
      }],
      ['Bewertungen und Referenzen einholen', 'ÜBUNG', '6 Min', {
        absaetze: [
          'Die meisten zufriedenen Kunden schreiben nie eine Bewertung — nicht aus Unwillen, sondern weil niemand gefragt hat. Der Zeitpunkt entscheidet: direkt nach dem guten Abschluss, nicht Wochen später.',
        ],
        punkte: [
          'Fragen Sie am Tag der Übergabe, nicht am Monatsende.',
          'Machen Sie es leicht: ein Link, 2 Sätze genügen.',
          'Schlagen Sie vor, worauf sie eingehen könnten. Ein leeres Feld schreckt ab.',
          'Bedanken Sie sich für jede Bewertung, auch für die mittelmässige.',
        ],
        uebung: 'Schreiben Sie eine kurze Anfrage-Vorlage und schicken Sie sie an 3 Kunden der letzten Wochen.',
      }],
      ['Ein Rhythmus, den Sie halten können', 'ÜBUNG', '8 Min', {
        absaetze: [
          'Sichtbarkeit entsteht nicht durch eine grosse Aktion, sondern durch viele kleine über Monate. Die Frage ist deshalb nicht, was möglich wäre, sondern was Sie auch im Frühling noch schaffen.',
        ],
        punkte: [
          'Ein Beitrag pro Monat, den Sie sicher halten, schlägt 4 geplante.',
          'Sammeln Sie das ganze Jahr Fotos von der Arbeit. Ohne Bilder kein Beitrag.',
          'Ein fester Tag im Monat, im Kalender, mit Erinnerung.',
          'Nach einem halben Jahr prüfen: Was hat Anfragen gebracht, was nicht?',
        ],
        uebung: 'Legen Sie Ihren Rhythmus fest und tragen Sie die nächsten 6 Termine gleich ein.',
      }],
      ['Was Chefsache bleibt', 'VIDEO', '3 Min'],
    ],
  },
  {
    n: '08', title: 'Kundenservice & vaiaconBot', level: 'PRAXIS', hours: '33 Min',
    nutzen: 'Der vaiaconBot beantwortet die 20 häufigsten Fragen rund um die Uhr. Ihr Telefon klingelt deutlich seltener für Auskünfte, die längst auf der Website stehen.',
    tile: 'Ein digitaler Mitarbeiter für die 20 häufigsten Fragen.',
    lead: 'Der vaiaconBot beantwortet, was sich täglich wiederholt — und gibt sauber an den Menschen ab, wenn es persönlich wird. Sie bauen ihn in dieser Werkstatt selbst.',
    bild: 'Bild: vaiaconBot am Telefon',
    img: 'assets/vaiacon-buerobot-phone.png',
    takeaways: ['Fragenkatalog (20 Fragen)', 'Übergabe-Regeln an den Menschen', 'Qualitäts-Check zum Mitlesen'],
    lessons: [
      ['Die 20 häufigsten Fragen sammeln', 'ÜBUNG', '6 Min', {
        absaetze: [
          'Ein Bot ist nur so gut wie die Fragen, die er kennt. Die stehen nicht in einem Handbuch, sondern in Ihrem Postfach und im Telefonverlauf.',
        ],
        punkte: [
          'Sammeln Sie 2 Wochen lang jede Frage mit, die hereinkommt.',
          'Schreiben Sie die Frage so auf, wie der Kunde sie stellt — nicht in Ihrer Sprache.',
          'Zählen Sie, wie oft dieselbe Frage kommt, und sortieren Sie danach.',
          '20 genügen. Damit sind die meisten Anfragen abgedeckt.',
        ],
        uebung: 'Führen Sie 2 Wochen lang die Liste und ordnen Sie sie am Ende nach Häufigkeit.',
      }],
      ['Ein vaiaconBot für die häufigen Fragen', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Ein Bot ersetzt nicht das Gespräch, er nimmt Ihnen die Wiederholung ab. Sein Wissen ist Ihr Seitentext, Ihre Preisliste, Ihre Öffnungszeiten — nichts, was er nicht hat, darf er erfinden.',
        ],
        punkte: [
          'Antworten kurz halten: 3 Sätze reichen fast immer.',
          'Sagen Sie ihm ausdrücklich, dass er bei Unsicherheit weiterverweist.',
          'Keine Preise oder Fristen, die sich häufig ändern — sonst veraltet er.',
          'Wissen geändert heisst Bot neu starten. Sonst gilt der alte Stand.',
        ],
        uebung: 'Schreiben Sie das Wissen für die 5 häufigsten Fragen auf und prüfen Sie die Antworten selbst.',
      }],
      ['Übergabe an den Menschen — sauber geregelt', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Der häufigste Ärger mit Bots entsteht nicht durch falsche Antworten, sondern durch Sackgassen: Der Kunde kommt nicht weiter und findet niemanden.',
        ],
        punkte: [
          'Legen Sie fest, wann übergeben wird: nach 2 erfolglosen Versuchen.',
          'Der Weg zum Menschen muss immer sichtbar sein, nicht versteckt.',
          'Bei Beschwerden und Geld wird sofort übergeben, ohne Umweg.',
          'Sagen Sie, wann jemand antwortet — und halten Sie es ein.',
        ],
        uebung: 'Spielen Sie 3 Anfragen durch, bei denen der Bot scheitern muss. Prüfen Sie, ob der Kunde jedes Mal weiterkommt.',
      }],
      ['Telefonnotizen und Rückrufe', 'WERKSTATT', '6 Min', {
        absaetze: [
          'Telefonnotizen auf Zetteln gehen verloren, und Rückrufe werden vergessen — das kostet mehr Kunden als jede schlechte Antwort.',
        ],
        punkte: [
          'Notieren Sie immer dasselbe: wer, wann, worum, bis wann zurück.',
          'Lassen Sie die Rohnotiz in einen sauberen Eintrag umschreiben.',
          'Ein Ort für alle Rückrufe, keine Zettel.',
          'Kein Rückruf ohne Frist. «Melde mich» ist keine.',
        ],
        uebung: 'Bauen Sie eine Notizvorlage mit den 4 Feldern und verwenden Sie sie eine Woche lang.',
      }],
      ['Qualität prüfen: mitlesen und nachschärfen', 'ÜBUNG', '6 Min', {
        absaetze: [
          'Ein Bot, den niemand kontrolliert, wird mit der Zeit schlechter — weil sich Ihr Betrieb ändert und seine Antworten nicht. Mitlesen ist keine Kür.',
        ],
        punkte: [
          'Einmal pro Woche 20 Gespräche durchsehen. Das dauert 10 Minuten.',
          'Achten Sie auf Fragen, die er nicht beantworten konnte. Das ist Ihre Liste.',
          'Falsche Antworten sofort korrigieren, nicht sammeln.',
          'Halten Sie fest, was Sie geändert haben und wann.',
        ],
        uebung: 'Lesen Sie die Gespräche einer Woche durch und notieren Sie die 3 häufigsten Lücken.',
      }],
    ],
  },
  {
    n: '09', title: 'Abläufe automatisieren', level: 'FORTGESCHRITTEN', hours: '45 Min',
    nutzen: 'Ein Ablauf, den Sie einmal bauen, arbeitet jede Woche weiter — typisch ein halber Arbeitstag pro Monat, den Sie zurückbekommen.',
    tile: 'Vom einzelnen Handgriff zum verlässlichen Ablauf.',
    lead: 'Für Betriebe, die den ersten Nutzen gesehen haben und jetzt Struktur wollen: beschreiben, bauen, verbinden, prüfen — inklusive Rückfallplan, wenn etwas nicht läuft.',
    bild: 'Bild: Werkstatt-Whiteboard mit Ablauf',
    img: 'assets/lernplan-09.png',
    takeaways: ['Prozess-Steckbrief', 'Ablauf-Bauplan', 'Rückfallplan (eine Seite)'],
    lessons: [
      ['Vom Handgriff zum Prozess: sauber beschreiben', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Bevor irgendetwas automatisiert wird, muss der Ablauf aufgeschrieben sein. Wer das überspringt, automatisiert das Chaos und wundert sich.',
          'Ein guter Steckbrief passt auf eine Seite und ist auch für jemanden verständlich, der den Ablauf nicht kennt.',
        ],
        punkte: [
          'Auslöser: Was passiert, damit es losgeht?',
          'Schritte: Was geschieht, in welcher Reihenfolge, durch wen?',
          'Ergebnis: Woran erkennt man, dass es fertig ist?',
          'Ausnahmen: Was läuft anders, und wie oft kommt das vor?',
        ],
        uebung: 'Beschreiben Sie einen Ablauf, den Sie wöchentlich machen, nach diesen 4 Punkten.',
      }],
      ['Der erste automatische Ablauf', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Fangen Sie klein an — mit etwas, das oft passiert, wenig Schaden anrichtet und dessen Ergebnis Sie sofort sehen. Nicht mit der Rechnungsstellung.',
        ],
        punkte: [
          'Ein Auslöser, 3 Schritte, ein Ergebnis. Mehr nicht.',
          'Lassen Sie ihn 2 Wochen neben dem alten Weg laufen.',
          'Vergleichen Sie die Ergebnisse, bevor Sie den alten Weg abschalten.',
          'Was der Ablauf tut, muss nachvollziehbar sein — sonst sucht später niemand den Fehler.',
        ],
        uebung: 'Wählen Sie den einfachsten Ablauf aus Ihrer Liste und bauen Sie ihn. Klein anfangen ist keine Schwäche.',
      }],
      ['Verbindungen ohne Programmieren', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Die meisten Werkzeuge lassen sich heute ohne Code verbinden. Was Sie brauchen, ist kein Programmierwissen, sondern Klarheit darüber, welche Angabe von wo nach wo soll.',
        ],
        punkte: [
          'Zeichnen Sie auf, welche Daten wohin fliessen. Papier genügt.',
          'Eine Verbindung nach der anderen einrichten und prüfen.',
          'Zugänge und Schlüssel gehören nie in ein Dokument, das herumliegt.',
          'Notieren Sie, wer den Zugang eingerichtet hat — für den Tag, an dem es klemmt.',
        ],
        uebung: 'Zeichnen Sie den Datenfluss Ihres ersten Ablaufs auf und markieren Sie jede Stelle, an der etwas schiefgehen kann.',
      }],
      ['Daten sauber halten', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Automatisierung macht keine Fehler weg, sie beschleunigt sie. Eine doppelte Kundenadresse ist von Hand ein Ärgernis und automatisch ein Serienbrief an dieselbe Person.',
        ],
        punkte: [
          'Eine Quelle je Angabe. Wo 2 Listen dasselbe führen, gibt es Streit.',
          'Doppelte Einträge suchen, bevor Sie automatisieren, nicht danach.',
          'Schreibweisen festlegen: Datum, Telefonnummer, Anrede.',
          'Löschfristen mitdenken — was weg muss, muss auch automatisch weg.',
        ],
        uebung: 'Nehmen Sie Ihre Kundenliste und suchen Sie nach Doppeleinträgen und uneinheitlichen Schreibweisen.',
      }],
      ['Wenn es schiefgeht: der Rückfallplan', 'WERKSTATT', '6 Min', {
        absaetze: [
          'Jeder Ablauf fällt irgendwann aus — der Dienst ist gestört, die Verbindung bricht, jemand ändert etwas. Die Frage ist nicht ob, sondern wer es merkt.',
        ],
        punkte: [
          'Wer wird benachrichtigt, wenn es klemmt? Eine Person, namentlich.',
          'Wie geht es von Hand weiter, bis es wieder läuft?',
          'Wie sehen Sie, ob während des Ausfalls etwas verloren ging?',
          'Der Plan gehört auf eine Seite, nicht in einen Kopf.',
        ],
        uebung: 'Schreiben Sie für Ihren ersten Ablauf auf, was bei Ausfall passiert. Eine Seite genügt.',
      }],
      ['Aus einem Ablauf 10 machen', 'ÜBUNG', '8 Min', {
        absaetze: [
          'Der erste Ablauf ist der teuerste. Danach wiederholen sich die Muster — und was Sie einmal gelernt haben, gilt für die nächsten 9.',
        ],
        punkte: [
          'Suchen Sie Abläufe, die demselben Muster folgen wie der erste.',
          'Bauen Sie einen nach dem anderen, nicht 3 gleichzeitig.',
          'Nach jedem Ablauf festhalten, was länger dauerte als gedacht.',
          'Was zweimal gebaut wurde, gehört als Vorlage festgehalten.',
        ],
        uebung: 'Listen Sie 5 weitere Abläufe auf und ordnen Sie sie nach Aufwand und Nutzen.',
      }],
    ],
  },
  {
    n: '10', title: 'Zahlen & Entscheide', level: 'FÜHRUNG', hours: '21 Min',
    nutzen: 'Sie rechnen vor dem Kauf, ob sich ein Werkzeug lohnt — und stoppen Abos, die nichts bringen. Das sind schnell einige Hundert Franken im Jahr.',
    tile: 'Rechnen statt hoffen: Kosten, Nutzen, Quartals-Entscheid.',
    lead: 'Was bringt es wirklich? Sie rechnen Ihren eigenen Fall durch, vergleichen Lizenzen und entscheiden pro Quartal, was bleibt und was wieder verschwindet.',
    bild: 'Bild: Notizblock mit Zahlen',
    img: 'assets/lernplan-10.png',
    takeaways: ['Business-Case-Rechner', 'Lizenz-Vergleichsblatt', 'Quartals-Entscheid (Vorlage)'],
    lessons: [
      ['Kosten und Nutzen rechnen', 'ÜBUNG', '8 Min', {
        absaetze: [
          '«Es spart Zeit» ist kein Argument, mit dem man entscheidet. Rechnen Sie mit Ihren Zahlen: eingesparte Stunden mal Ihrem Stundensatz, gegen Lizenz und Einrichtungsaufwand.',
          'Die Rechnung muss nicht genau sein. Sie muss ehrlich sein — auch dann, wenn sie gegen das Vorhaben spricht.',
        ],
        punkte: [
          'Wie viele Stunden pro Monat gehen heute dafür drauf?',
          'Wie viele bleiben realistisch übrig — nicht null, meistens die Hälfte.',
          'Was kostet es: Lizenz, Einrichtung, Schulung, laufende Pflege?',
          'Ab wann ist es bezahlt? Über 12 Monate lohnt es selten.',
        ],
        uebung: 'Rechnen Sie einen Ihrer geplanten Abläufe durch. Wenn er sich nicht rechnet, ist auch das ein Ergebnis.',
      }],
      ['Angebote und Lizenzen vergleichen', 'VIDEO', '3 Min'],
      ['Wann sich Eigenbau lohnt — und wann nicht', 'VIDEO', '3 Min'],
      ['Der Quartals-Entscheid: was bleibt, was fliegt', 'ÜBUNG', '7 Min', {
        absaetze: [
          'Werkzeuge sammeln sich an, und niemand schaltet je etwas ab. 4 Termine im Jahr genügen, um den Bestand ehrlich zu prüfen.',
        ],
        punkte: [
          'Was haben wir im Einsatz, und was kostet es zusammen?',
          'Was davon hat im letzten Quartal wirklich geholfen?',
          'Was benutzt niemand mehr? Abschalten, nicht «für später» behalten.',
          'Was fehlt uns — und ist das ein Werkzeug oder eine Absprache?',
        ],
        uebung: 'Machen Sie den Entscheid für das laufende Quartal und tragen Sie den nächsten Termin ein.',
      }],
    ],
  },
  {
    n: '11', title: 'Team & Verantwortung', level: 'FÜHRUNG', hours: '27 Min',
    nutzen: 'Ihre Mitarbeitenden nutzen KI nach klaren Regeln statt heimlich am eigenen Konto. Sie behalten die Kontrolle über Daten und Qualität.',
    tile: 'Regeln, Rollen und der Umgang mit Skepsis im Team.',
    lead: 'KI im Betrieb ist Führungsarbeit. Sie schreiben eine Richtlinie auf einer Seite, klären Rollen und Freigaben und nehmen die Mitarbeitenden mit, statt sie zu überfahren.',
    bild: 'Bild: Team im Pausenraum',
    img: 'assets/lernplan-11.png',
    takeaways: ['KI-Richtlinie auf einer Seite', 'Rollen- und Freigabe-Matrix', 'Schulungsplan fürs Team'],
    lessons: [
      ['Eine KI-Richtlinie auf einer Seite', 'WERKSTATT', '8 Min', {
        absaetze: [
          'Eine Richtlinie, die niemand liest, schützt niemanden. Eine Seite, die jede und jeder im Betrieb kennt, tut es.',
          'Sie beantwortet 4 Fragen — mehr braucht es für den Anfang nicht.',
        ],
        punkte: [
          'Welche Werkzeuge sind erlaubt, welche ausdrücklich nicht?',
          'Was darf nie eingegeben werden? Verweis auf Lernplan 02 genügt.',
          'Wer entscheidet über neue Werkzeuge, und wie fragt man an?',
          'Was passiert, wenn etwas schiefgeht — und an wen meldet man es?',
        ],
        uebung: 'Schreiben Sie die 4 Antworten für Ihren Betrieb auf und legen Sie die Seite dem Team vor.',
      }],
      ['Mitarbeitende mitnehmen statt überfahren', 'VIDEO', '3 Min'],
      ['Wer darf was? Rollen und Freigaben', 'WERKSTATT', '7 Min', {
        absaetze: [
          'Nicht alle brauchen alles. Wer Zugriff auf Kundendaten hat, sollte das begründen können — und wer keinen braucht, ist damit auch nicht in der Verantwortung.',
        ],
        punkte: [
          'Halten Sie fest, wer welches Werkzeug benutzt und wozu.',
          'Zugänge gehören zu Rollen, nicht zu Personen. Sonst räumt beim Austritt niemand auf.',
          'Beim Austritt werden Zugänge am selben Tag entzogen.',
          'Einmal im Halbjahr durchgehen: Stimmt die Liste noch?',
        ],
        uebung: 'Erstellen Sie die Zugriffsliste für Ihren Betrieb und markieren Sie jeden Zugang, der nicht mehr gebraucht wird.',
      }],
      ['Umgang mit Skepsis im Team', 'VIDEO', '3 Min'],
      ['KI-Kompetenz messen: der kleine Check', 'ÜBUNG', '6 Min', {
        absaetze: [
          'Ob es im Betrieb angekommen ist, merkt man nicht an Schulungsstunden, sondern daran, was Leute tatsächlich tun. 5 Fragen genügen für ein ehrliches Bild.',
        ],
        punkte: [
          'Wer hat im letzten Monat ein KI-Werkzeug für die Arbeit benutzt?',
          'Wer kann sagen, was nie eingegeben werden darf?',
          'Wer hat eine eigene Vorlage gebaut und weitergegeben?',
          'Wo hat jemand bewusst darauf verzichtet — und warum?',
        ],
        uebung: 'Stellen Sie die Fragen im Team und wiederholen Sie den Check in einem halben Jahr.',
      }],
    ],
  },
  // Modul 12 «Advanced: Wie KI wirklich funktioniert» wurde am 08.09.2026
  // entfernt — es diente nur internen Zwecken. Die Kursseiten liegen weiterhin
  // unter academy/kurs/, sind aus der Academy aber nicht mehr verlinkt.
];
