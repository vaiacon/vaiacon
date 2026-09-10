# vaiacon Design System

**VAIACON** — Schweizer KI-Beratung & Automatisierung für KMU · [vaiacon.ch](https://vaiacon.ch)
vaiacon GmbH · Lehenstrasse 74, 8037 Zürich · hallo@vaiacon.ch
Gründer: André Ulrich (Mitgründer, KMU-Experte) und Philip Krieger (Mitgründer, Coach).

## Produkte & Oberflächen

1. **Marketing-Website vaiacon.ch** — die massgebliche Referenz ist die mitgelieferte Landingpage `uploads/index.dc.html` (One-Pager: Hero mit Büro-Bot-Video, Leistungen, Büro-Bot, Ablauf, Versprechen, Pakete, Über uns + Kompass, FAQ, Kontakt-Finale, Chatbot-Widget).
2. **«Büro-Bot»** — KI-Assistent für Büroarbeit (Buchhaltung, Administration, KI-Support). Als Produkt bisher nur über die Website und das Maskottchen repräsentiert; es gibt kein eigenes App-UI in den Quellen.

**Zielgruppe:** Schweizer Kleinunternehmen (KMU). **Sprache:** Deutsch (Schweiz) — immer «ss» statt «ß». **Tonalität:** freundlich, nahbar, kompetent — verspielt, aber professionell.

## Quellen

- `uploads/index.dc.html` — Referenz-Landingpage (Code = Ground Truth für alle Werte in diesem System)
- `uploads/logo-*.png` — Logo-Mark & Wortmarke, je in Terra und Weiss
- `uploads/buerobot-*.{png,jpg}` — Maskottchen-Renderings (3D-Clay-Look)
- Briefing-Notizen des Kunden (Palette, Typografie, Stil) — deckungsgleich mit dem Code

Kein Figma, kein weiteres Repo. Es wurden keine Font-Binaries geliefert; Quicksand und IBM Plex Mono werden — exakt wie auf der Referenzseite — von Google Fonts geladen (`tokens/fonts.css`).

---

## CONTENT FUNDAMENTALS

**Sprache & Anrede.** Deutsch (Schweiz), konsequent «ss» statt «ß» («grosszügig», «Massnahmen»). Kunden werden **per Sie** angesprochen; vaiacon spricht als **«wir»** («Wir geben Orientierung.», «Wir hören zu»). Schweizer Grussformeln gehören zur Marke: **«Grüezi!»** als Chat-Begrüssung.

**Ton.** Freundlich, nahbar, kompetent; verspielt aber professionell. Kein Fachjargon — die Marke verspricht es wörtlich: «ohne Fachchinesisch und ohne Verkaufsdruck». Nutzen statt Technik: «damit Ihr Team entlastet wird», «Resultate im Alltag sichtbar». KI wird als Werkzeug positioniert, nie als Selbstzweck («KI ist für uns nicht das Produkt, sondern das Werkzeug»).

**Satzbau.** Kurze, deklarative Headlines mit Punkt am Ende: «Wir geben Orientierung.» · «Von der Vision zum Resultat.» · «Drei Schritte zur klaren Richtung.» · «Kurz gefragt. Klar beantwortet.» Body-Copy in 1–3 Sätzen, oft als Dreiklang («Klar · Persönlich · Ohne Verkaufsdruck»).

**Casing-System (wichtig, sehr charakteristisch):**
- Headlines: normaler Satz-Case mit Schlusspunkt.
- Kicker/Eyebrows: UPPERCASE mit Nummerierung und Gedankenstrich — «01 — WOFÜR WIR STEHEN», «03 — EIN KONKRETER HEBEL».
- Nav-Links und CTAs: **lowercase** («leistungen», «erstgespräch →», «termin direkt buchen ↗»).
- Badges/Overlines: UPPERCASE mit weiter Laufweite («KOSTENLOS & UNVERBINDLICH», «BUCHHALTUNG · ADMINISTRATION · KI-SUPPORT»).

**Interpunktion & Zeichen.** Guillemets «…» für Zitate und Produktnamen-Betonung (nie "…"). Mittepunkt · als Trenner. Pfeile als Text-Glyphen: → (weiter/senden), ↗ (extern), ↑ (nach oben), ✓ (Checks), + (FAQ auf/zu). Kein Emoji.

**Zahlen & Nummerierung.** Zweistellige Ordnungszahlen «01», «02», «03» strukturieren alles (Sektionen, Leistungen, Schritte, Kompass). Mono-Details wie Timecodes («00:07.3», «BUERO-BOT.MP4») in IBM Plex Mono.

**Wiederkehrende Begriffe.** «Transformationspartner», «Orientierung», «Hebel», «Roadmap», «Begleitung», «entlasten», «im Alltag», «auf Augenhöhe», «digitaler Mitarbeiter» (= Büro-Bot). Der Kompass: vier «Ist es richtig für …?»-Fragen, Abschluss «4 × Ja — dann sind wir auf Kurs.»

**Beispiele in Markenstimme.**
- CTA: «erstgespräch →» / «termin direkt buchen ↗» / «oder per e-mail →»
- Chat: «Grüezi! Haben Sie Fragen? Chatten Sie direkt mit mir →»
- Vertrauen: «Transparent & zweckgebunden · Sparsam — nur was nötig ist · Geschützt nach geltendem Schweizer Datenschutzgesetz»
- Bildunterschrift (verspielt): «Büro-Bot — immer am Apparat»

---

## VISUAL FOUNDATIONS

**Grundstimmung.** Warme, erdige Palette auf Creme — ein sonniges, spielzeughaftes Terracotta-Universum. Alles ist weich: stark gerundete Ecken, sanfte Animationen, grosszügiger Weissraum. Kontrast entsteht durch dunkle Tinte (#1C1613) und satte Terracotta-Flächen, nie durch harte Schwarz/Weiss-Kanten.

**Farben.** Seiten wechseln zwischen Creme #F4EDE1 und Sand #EAE0CC als alternierende Sektionsflächen; Karten sind #FFFDF8 oder Sand mit Hairline. Dunkle Statement-Sektionen in #171210. Terracotta-Sektionen als Verlauf `#A83A08 → #CA5019` (Finale mit 5 Stops bis #D75A20) plus Peach-Glow (`radial-gradient rgba(244,158,96,0.5)`). Akzent ist Terracotta #B25222 (Links, Kicker, Ziffern), heller CTA-Akzent #E2652C (Hover #F4793E), auf dunklem Grund #E98C58/#FFD9C2. Max. 2 helle Hintergrundfarben pro Seite; dunkle und Terracotta-Sektionen sind bewusste Rhythmus-Akzente.

**Typografie.** Quicksand für alles — Headlines w600 mit negativer Laufweite (−0.02…−0.035em) und enger Zeilenhöhe (1.05–1.08), Body w500 mit lockerer Zeilenhöhe (1.65–1.7), UI-Elemente w600/700. IBM Plex Mono nur für Zahlen-Details, Timecodes, technische Zeilen. Kein Serif, nirgends. Krumme, exakte Grössen sind Absicht (13.5px, 16.5px, 17.5px, 18.5px) — nicht auf Raster runden.

**Hintergründe.** Flächige Farben oder sanfte Verläufe; Peach-Glows als radiale Lichtquellen von unten. Keine Muster, keine Texturen, kein Grain, keine Deko-Sterne.

**Ränder & Linien.** Zwei Systeme: (1) Hairlines `rgba(28,22,19,0.32)` für Karten, Trenner, Listenzeilen — Sektionen werden oft durch 1px-Linien getrennt statt durch Schatten. (2) Comic-Ränder `1.5–2px solid #1C1613` für Sprechblasen, Chat-Bubbles und Inputs im Hero — zusammen mit dem Offset-Schatten `6px 6px 0 rgba(28,22,19,0.85)` ergibt das den verspielten Sticker-Look.

**Schatten.** Sparsam. Karten auf Creme haben standardmässig **keinen** Schatten (Hairline genügt). Schwebende Elemente (Sprechblasen, Sticker) bekommen `0 10px 26px rgba(62,22,6,0.28)`; helle CTAs auf Terracotta `0 18px 40px -12px rgba(60,20,5,0.45)`. Schatten sind immer warm getönt (Braun, nie Grau/Blau).

**Radien.** Stark gerundet: Pills 999px (alle Buttons, Chips, Badges), grosse Karten 22–26px, Sprechblasen 18–20px (mit einer «Ecke» 3–4px als Tail-Seite), Tiles 14px, Inputs 12px oder Pill, Mini-Quadrate 6px.

**Animation.** Sanft und federnd. Hover-Lifts `translateY(-4…-6px)` mit `cubic-bezier(0.22,1,0.36,1)` (0.4s); Listenzeilen schieben sich bei Hover nach rechts (`padding-left` wächst) und tönen den Grund auf #E2D5BC; Farb-Hover 0.3s ease. Scroll-Reveals: `opacity 0 → 1` + `translateY(14px → 0)` mit `cubic-bezier(0.3,0.72,0.06,1)`, gestaffelt in 80–120ms-Schritten. Dauer-Animation: `breathe` (scale 1→1.011, 6.5s). Nichts blinkt, nichts dreht schnell.

**Hover-Zustände.** Links: Farbe → Terracotta. Buttons: hellere Füllung (#E2652C → #F4793E) oder Lift + stärkerer Schatten. Karten: Lift ohne Schattenzuwachs. Sticker: Lift + leichte Rotation (−1deg).

**Layout.** Inhalt max 1160px, Header max 1280px, Sektionspadding 72–88px vertikal / 32px horizontal (mobil 20px). Grids mit `repeat(auto-fit, minmax(min(280–420px,100%),1fr))`. Header schwebt sticky über dem Hero. Chatbot fix unten rechts. Grosszügige Gaps (22–64px).

**Transparenz & Blur.** Nur auf Terracotta/Dunkel: Glas-Buttons `rgba(255,244,236,0.12)` mit `backdrop-filter: blur(12px)` und weissem Hairline-Rand. Nie auf hellen Flächen.

**Bildwelt.** 3D-Clay-Look: weiche, spielzeughafte Objekte in Terracotta + Creme auf warmem Grund (siehe `assets/buerobot-*`). Fotos (Team) in weich gerundeten Masken (16px) innerhalb von Sand-Karten. Bildstimmung immer warm; kein S/W, kein kühles Blau.

**Selection.** `rgba(178,82,34,0.22)` — auch Textauswahl ist Terracotta.

---

## ICONOGRAPHY

**Kein Icon-Font, kein SVG-Icon-Set.** Die Marke nutzt bewusst **Text-Glyphen als Icons** — das ist Teil des verspielten, typografischen Looks:

- → weiter / senden / Listenpfeil (dezent in #C9BFB5) · ↗ externer Link · ↑ nach oben
- ✓ Checks: auf hell direkt in Terracotta; auf Terra-Flächen in #FFD9C2, optional in 22px-Quadrat (radius 6px, `rgba(255,244,236,0.15)` + Hairline)
- + FAQ-Indikator (rotiert 45° zu ×) · ▶ Video-Marker · × schliessen
- Punkt-Indikator: 9px-Kreis in #E2652C (Chat-Button «online»)

**Kein Emoji.** Ein einzelnes ✎ (Redesign-Notizen, intern) ist die Ausnahme, kein Muster.
**Illustration statt Icons:** Wo andere Marken Icon-Grids setzen, nutzt vaiacon das Maskottchen und 3D-Clay-Renderings (`assets/vaiacon-buerobot-hero.png`, `vaiacon-buerobot-phone.png`, `vaiacon-buerobot-hero.png`). Neue Icon-Bedürfnisse: zuerst Glyphen prüfen; falls zwingend ein Set nötig wird, ist das eine bewusste Erweiterung (mit dem Kunden klären) — nichts nachzeichnen.

**Logo.** vaiacon-Symbol mit Bewegungslinien und Aufwärtspfeil; Wortmarke «vaiacon» lowercase. **Massgeblich ist das Lockup** (Mark + Wortmarke in fixer Anordnung): `assets/logo-lockup-terra.png` (auf hell) und `logo-lockup-white.png` (auf Terra/Dunkel). Das vaiacon-Symbol solo (`logo-mark-terra.png`, `logo-mark-white.png`) für kleine Flächen (Favicon, Avatar, Zitat-Karten); Einzel-Wortmarken (`logo-wordmark-*.png`) nur noch als Reserve. Nie einfärben, nie verzerren, nie nachbauen.

**Maskottchen «Büro-Bot».** Cremeweisser Roboter, dunkles freundliches Gesicht, Terracotta-Details, vaiacon-Symbol auf der Brust. Immer als geliefertes Rendering einsetzen, nie als Vektor nachzeichnen. Er darf «sprechen» (Sprechblasen mit Comic-Rand) und bekommt verspielte Captions («Büro-Bot — immer am Apparat»).

---

## INDEX

**Tokens** (`styles.css` importiert alle):
- `tokens/colors.css` — Palette + semantische Aliase
- `tokens/typography.css` — Fonts, Grössen, Gewichte, Laufweiten
- `tokens/spacing.css` — Layout, Abstände, Radien
- `tokens/effects.css` — Schatten, Easing, Keyframes (breathe)
- `tokens/fonts.css` — Google-Fonts-Import (Quicksand, IBM Plex Mono)
- `tokens/base.css` — Body/Link/Selection-Grundregeln

**Assets** (`assets/`): Logo-Lockups (`logo-lockup-terra.png`/`logo-lockup-white.png`, massgeblich), vaiacon-Symbol & Wortmarke einzeln (× Terra/Weiss), Büro-Bot-Renderings (terra/poster/phone), Büro-Bot-Video (`buerobot-dance.mp4` — tanzender Büro-Bot, 1080p; immer muted + playsinline, spielt 1× ohne Loop. Achtung: der Projekt-Server liefert MP4 ohne Range-Support — Video per `fetch → blob → URL.createObjectURL` füttern, siehe `BuerobotVideo` in `ui_kits/website/sections-main.jsx`).

**Komponenten** (`components/`, Bundle-Namespace via `_ds_bundle.js`):
- `core/` — Button, Kicker, CheckPill, LabelBadge, CheckItem
- `cards/` — StepCard, PackageCard, TeamCard, QuoteCard, KompassTile
- `content/` — ServiceRow, FaqItem
- `chat/` — SpeechBubble, ChatMessage
- `navigation/` — SiteHeader, SiteFooter

**UI-Kit** (`ui_kits/website/`): klickbare Recreation der vaiacon.ch-Landingpage (statischer Hero mit Poster-Bild statt Video).

**Guidelines** (`guidelines/`): Specimen-Karten für den Design-System-Tab.

**Intentional additions:** `PackageCard` hat eine dritte Variante `sand` (helle Karte mit Hairline) — für Paket-Grids in hellen Sektionen, wo Terra-Verlauf und Tinte zu schwer wirken.

**Caveats:** Keine Font-Binaries (Google-Fonts-CDN wie im Original). Büro-Bot hat kein eigenes Produkt-UI in den Quellen — bewusst kein UI-Kit dafür erfunden. Das ursprüngliche Hero-Intro-Video (`ich machs_compressed.mp4`) wurde nicht mitgeliefert; dafür liegt ein Büro-Bot-Tanz-Loop unter `assets/buerobot-dance.mp4` (im UI-Kit in der Büro-Bot-Sektion eingebaut).
