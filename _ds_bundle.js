/* @ds-bundle: {"format":4,"namespace":"vaiaconDesignSystem_5f353f","components":[{"name":"KompassTile","sourcePath":"components/cards/KompassTile.jsx"},{"name":"PackageCard","sourcePath":"components/cards/PackageCard.jsx"},{"name":"QuoteCard","sourcePath":"components/cards/QuoteCard.jsx"},{"name":"StepCard","sourcePath":"components/cards/StepCard.jsx"},{"name":"TeamCard","sourcePath":"components/cards/TeamCard.jsx"},{"name":"ChatMessage","sourcePath":"components/chat/ChatMessage.jsx"},{"name":"SpeechBubble","sourcePath":"components/chat/SpeechBubble.jsx"},{"name":"FaqItem","sourcePath":"components/content/FaqItem.jsx"},{"name":"ServiceRow","sourcePath":"components/content/ServiceRow.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"CheckItem","sourcePath":"components/core/CheckItem.jsx"},{"name":"CheckPill","sourcePath":"components/core/CheckPill.jsx"},{"name":"Kicker","sourcePath":"components/core/Kicker.jsx"},{"name":"LabelBadge","sourcePath":"components/core/LabelBadge.jsx"},{"name":"Twinkle","sourcePath":"components/decor/Twinkle.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"academy/academy-daten.js":"d97ad5c9116e","academy/image-slot.js":"fff26d081c8d","components/cards/KompassTile.jsx":"0fd3220aa230","components/cards/PackageCard.jsx":"e1162a121c5e","components/cards/QuoteCard.jsx":"57548ce878e7","components/cards/StepCard.jsx":"34ac4f6c40e9","components/cards/TeamCard.jsx":"08fe9efd46d6","components/chat/ChatMessage.jsx":"e4dc0218b354","components/chat/SpeechBubble.jsx":"f57442f41128","components/content/FaqItem.jsx":"d8d3b60ff194","components/content/ServiceRow.jsx":"8059686f8675","components/core/Button.jsx":"7f5483ee367b","components/core/CheckItem.jsx":"b1d88f836958","components/core/CheckPill.jsx":"8cc629b0f422","components/core/Kicker.jsx":"43e3dbe43110","components/core/LabelBadge.jsx":"297d58bdcc0b","components/decor/Twinkle.jsx":"ec16ad70b850","components/navigation/SiteFooter.jsx":"d2c1e0960b1c","components/navigation/SiteHeader.jsx":"cc49fddda76a","ui_kits/website/app.jsx":"b64df59c9260","ui_kits/website/chat-widget.compiled.js":"16ac1fe7dcb2","ui_kits/website/chat-widget.jsx":"93adfb971219","ui_kits/website/dsgvo-siegel.jsx":"e72e9d3b6dd4","ui_kits/website/erstanalyse-data.js":"8a7d8a56b327","ui_kits/website/erstanalyse-form.jsx":"3300251c1a26","ui_kits/website/mobile-nav.jsx":"fdb011220144","ui_kits/website/mockup-entwurf.compiled.js":"5f5857010064","ui_kits/website/mockup-entwurf.jsx":"3dfa4a1dcff7","ui_kits/website/sections-hero.jsx":"0b31bff8a10a","ui_kits/website/sections-lower.jsx":"98dfc89ce4ec","ui_kits/website/sections-main.jsx":"624c8183ac57","ui_kits/website/tweaks-panel.jsx":"d259e3a86f73","ui_kits/website/ueber-uns.compiled.js":"42c076f6f283","ui_kits/website/ueber-uns.jsx":"f4ed0869d99e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.vaiaconDesignSystem_5f353f = window.vaiaconDesignSystem_5f353f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// academy/academy-daten.js
try { (() => {
// vaiaconAcademy — Lernplan-Katalog. Wird von der Landingpage und der Lernplan-Seite gelesen.
window.ACADEMY_PLANS = [{
  n: '01',
  title: 'Grundlagen: KI einordnen',
  level: 'EINSTIEG',
  hours: '1 Std 05',
  nutzen: 'Ab der ersten Woche erledigen Sie Texte, Zusammenfassungen und Recherchen in der halben Zeit — rund 30 Minuten pro Arbeitstag, ohne dass Sie etwas installieren müssen.',
  tile: 'Der Einstieg ohne Fachchinesisch — was die Werkzeuge können und wie Sie sie ansprechen.',
  lead: 'Bevor wir automatisieren, klären wir das Handwerk: was diese Werkzeuge heute wirklich leisten, wie man sie anspricht und wie Sie eine Routine aufbauen, die eine Woche später noch steht.',
  bild: 'Bild: Inhaber am Laptop im Betrieb',
  img: 'assets/lernplan-01.png',
  takeaways: ['Prompt-Karte A5', 'Startanleitung Schritt für Schritt', '30-Minuten-Wochenplan'],
  lessons: [['Was KI heute kann — und was nicht', 'VIDEO', '8 Min'], ['Das erste Gespräch mit einem Assistenten', 'WERKSTATT', '12 Min'], ['Gute Anweisungen: die vier Bausteine', 'WERKSTATT', '18 Min'], ['Eigene Dokumente befragen', 'WERKSTATT', '15 Min'], ['Ihr Wochenrhythmus: 30 Minuten, die bleiben', 'ÜBUNG', '12 Min']]
}, {
  n: '02',
  title: 'Datenschutz & Sicherheit',
  level: 'GRUNDLAGE',
  hours: '1 Std 15',
  nutzen: 'Sie wissen, welche Kundendaten rein dürfen und welche nie. Eine einzige vermiedene Datenschutzpanne ist teurer als jede Weiterbildung.',
  tile: 'Was rein darf und was nie: revDSG, Anonymisieren, Cloud-Standort.',
  lead: 'Die Lektionen, die vor allen anderen kommen sollten: welche Daten Sie nie eingeben, wie Sie Kundenangaben in zwei Minuten anonymisieren und was das revDSG von Ihrem Betrieb verlangt.',
  bild: 'Bild: Aktenordner und Bildschirm',
  img: 'assets/lernplan-02.png',
  takeaways: ['Merkblatt «nie eingeben»', 'Anonymisierungs-Vorlage', 'Sicherheits-Check auf einer Seite'],
  lessons: [['Was Sie nie eingeben dürfen', 'VIDEO + CHECK', '14 Min'], ['revDSG in vier Sätzen', 'VIDEO', '12 Min'], ['Kundendaten anonymisieren — schnell und sauber', 'WERKSTATT', '16 Min'], ['Auftragsverarbeitung und Cloud-Standort', 'VIDEO', '15 Min'], ['Der Sicherheits-Check für Ihren Betrieb', 'ÜBUNG', '18 Min']]
}, {
  n: '03',
  title: 'Korrespondenz & E-Mail',
  level: 'PRAXIS',
  hours: '1 Std 22',
  nutzen: 'Aus zwei Stunden Postfach am Morgen werden vierzig Minuten — mit Antworten, die klingen wie von Ihnen geschrieben.',
  tile: 'Der Posteingang zuerst — Antworten, die nach Ihnen klingen.',
  lead: 'Wo die meisten Stunden verschwinden: im Postfach. Sie bauen Bausteine für Ihre häufigsten Antworten, lernen den Ton treffen und behalten die heiklen Mails selbst in der Hand.',
  bild: 'Bild: Postfach am Morgen',
  img: 'assets/lernplan-03.png',
  takeaways: ['Ton-Profil Ihres Betriebs', 'Baustein-Set für Standardantworten', 'Leitfaden für heikle Mails'],
  lessons: [['Ihre Zeitfresser im Postfach finden', 'ÜBUNG', '15 Min'], ['Mails, die nach Ihnen klingen', 'WERKSTATT', '20 Min'], ['Standardantworten als Bausteine', 'WERKSTATT', '18 Min'], ['Heikle Mails: Reklamation, Mahnung, Absage', 'WERKSTATT', '17 Min'], ['Mehrsprachig antworten (F · I · E)', 'WERKSTATT', '12 Min']]
}, {
  n: '04',
  title: 'Offerten & Aufträge',
  level: 'PRAXIS',
  hours: '1 Std 28',
  nutzen: 'Eine Offerte in zehn Minuten statt in einer Stunde. Wer am selben Tag offeriert, gewinnt mehr Aufträge.',
  tile: 'Aus fünf Stichworten eine Offerte in Ihrer Struktur.',
  lead: 'Vom Stichwort zur fertigen Offerte — mit Ihren Positionen, Ihrer Preislogik und Ihrem Schlusssatz. Danach folgen Nachfassen und Auftragsbestätigung, damit nichts liegen bleibt.',
  bild: 'Bild: Offerte auf dem Bürotisch',
  img: 'assets/lernplan-04.png',
  takeaways: ['Offerten-Gerüst (Word)', 'Preislogik-Beschrieb', 'Nachfass-Sequenz (3 Mails)'],
  lessons: [['Offerten aus Stichworten', 'WERKSTATT', '22 Min'], ['Ihre Preislogik hinterlegen', 'WERKSTATT', '18 Min'], ['Leistungsbeschriebe, die überzeugen', 'WERKSTATT', '16 Min'], ['Nachfassen ohne Verkaufsdruck', 'WERKSTATT', '18 Min'], ['Auftragsbestätigung und Übergabe', 'WERKSTATT', '14 Min']]
}, {
  n: '05',
  title: 'Buchhaltung & Belege',
  level: 'PRAXIS',
  hours: '1 Std 23',
  nutzen: 'Der Belegstapel fürs Treuhandbüro ist in zwanzig Minuten sortiert — und die Treuhandrechnung sinkt, weil die Rückfragen ausbleiben.',
  tile: 'Belegstapel, Spesen, Mahnwesen — bis zur Übergabe ans Treuhandbüro.',
  lead: 'Der Papierkram, den niemand mag: Belege vorsortieren, Spesen erfassen, Zahlungseingänge prüfen. Am Ende steht ein Monatsabschluss, der eine halbe Stunde dauert statt einen Abend.',
  bild: 'Bild: Belege und Kaffeetasse',
  img: 'assets/lernplan-05.png',
  takeaways: ['Belegübergabe-Checkliste', 'Mahn-Textbausteine', 'Monatsabschluss-Ablauf'],
  lessons: [['Belege vorsortieren fürs Treuhandbüro', 'WERKSTATT', '18 Min'], ['Spesen und Quittungen ohne Zettelchaos', 'WERKSTATT', '16 Min'], ['Zahlungseingänge und Mahnwesen', 'WERKSTATT', '17 Min'], ['Monatsabschluss in einer halben Stunde', 'WERKSTATT', '20 Min'], ['Was der Treuhänder von Ihnen braucht', 'VIDEO', '12 Min']]
}, {
  n: '06',
  title: 'Sitzungen & Dokumentation',
  level: 'PRAXIS',
  hours: '1 Std 01',
  nutzen: 'Das Protokoll ist fertig, bevor alle den Sitzungsraum verlassen haben — inklusive Aufgabenliste mit Namen und Termin.',
  tile: 'Aus Notizen werden Protokolle, Aufgaben und Betriebswissen.',
  lead: 'Sitzungen enden meist mit Notizen, die niemand mehr liest. Hier entstehen daraus Protokolle, Aufgabenlisten mit Termin — und ein Betriebshandbuch, das mitwächst.',
  bild: 'Bild: Sitzungstisch mit Notizblock',
  img: 'assets/lernplan-06.png',
  takeaways: ['Protokoll-Vorlage', 'Aufgaben-Extraktion (Prompt)', 'Gerüst fürs Betriebshandbuch'],
  lessons: [['Sitzungsnotizen zu Protokollen', 'WERKSTATT', '16 Min'], ['Aufgaben und Termine herausziehen', 'WERKSTATT', '15 Min'], ['Wissen festhalten: das Betriebshandbuch', 'WERKSTATT', '18 Min'], ['Ihre Vorlagen-Bibliothek aufbauen', 'ÜBUNG', '12 Min']]
}, {
  n: '07',
  title: 'Kundengewinnung & Sichtbarkeit',
  level: 'PRAXIS',
  hours: '1 Std 38',
  nutzen: 'Website-Texte und Kundenkontakte in einer Stunde pro Monat, in Ihrer Sprache — statt einem Agenturauftrag über einige Tausend Franken.',
  tile: 'Sichtbar bleiben in Ihrer Sprache — ohne Agentur, ohne Verkaufsdruck.',
  lead: 'Website-Texte, Anfragen, Referenzen und ein Rhythmus, den Sie auch im Frühling halten. Alles in Ihrer Sprache — und mit einer klaren Grenze, was Chefsache bleibt.',
  bild: 'Bild: Handwerker mit Kunde vor Ort',
  img: 'assets/lernplan-07.png',
  takeaways: ['Tonalitäts-Profil', 'Textgerüst für Leistungsseiten', 'Referenz-Anfrage (Vorlage)'],
  lessons: [['Ihre Sprache festhalten: das Tonalitäts-Profil', 'WERKSTATT', '18 Min'], ['Website-Texte, die nicht nach KI klingen', 'WERKSTATT', '20 Min'], ['Anfragen in drei Minuten qualifizieren', 'WERKSTATT', '16 Min'], ['Bewertungen und Referenzen einholen', 'ÜBUNG', '14 Min'], ['Ein Rhythmus, den Sie halten können', 'ÜBUNG', '20 Min'], ['Was Chefsache bleibt', 'VIDEO', '10 Min']]
}, {
  n: '08',
  title: 'Kundenservice & vaiaconBot',
  level: 'PRAXIS',
  hours: '1 Std 23',
  nutzen: 'Der vaiaconBot beantwortet die zwanzig häufigsten Fragen rund um die Uhr. Ihr Telefon klingelt deutlich seltener für Auskünfte, die längst auf der Website stehen.',
  tile: 'Ein digitaler Mitarbeiter für die zwanzig häufigsten Fragen.',
  lead: 'Der vaiaconBot beantwortet, was sich täglich wiederholt — und gibt sauber an den Menschen ab, wenn es persönlich wird. Sie bauen ihn in dieser Werkstatt selbst.',
  bild: 'Bild: vaiaconBot am Telefon',
  img: 'assets/vaiacon-buerobot-phone.png',
  takeaways: ['Fragenkatalog (20 Fragen)', 'Übergabe-Regeln an den Menschen', 'Qualitäts-Check zum Mitlesen'],
  lessons: [['Die zwanzig häufigsten Fragen sammeln', 'ÜBUNG', '14 Min'], ['Ein vaiaconBot für die häufigen Fragen', 'WERKSTATT', '24 Min'], ['Übergabe an den Menschen — sauber geregelt', 'WERKSTATT', '16 Min'], ['Telefonnotizen und Rückrufe', 'WERKSTATT', '14 Min'], ['Qualität prüfen: mitlesen und nachschärfen', 'ÜBUNG', '15 Min']]
}, {
  n: '09',
  title: 'Abläufe automatisieren',
  level: 'FORTGESCHRITTEN',
  hours: '2 Std 03',
  nutzen: 'Ein Ablauf, den Sie einmal bauen, arbeitet jede Woche weiter — typisch ein halber Arbeitstag pro Monat, den Sie zurückbekommen.',
  tile: 'Vom einzelnen Handgriff zum verlässlichen Ablauf.',
  lead: 'Für Betriebe, die den ersten Nutzen gesehen haben und jetzt Struktur wollen: beschreiben, bauen, verbinden, prüfen — inklusive Rückfallplan, wenn etwas nicht läuft.',
  bild: 'Bild: Werkstatt-Whiteboard mit Ablauf',
  img: 'assets/lernplan-09.png',
  takeaways: ['Prozess-Steckbrief', 'Ablauf-Bauplan', 'Rückfallplan (eine Seite)'],
  lessons: [['Vom Handgriff zum Prozess: sauber beschreiben', 'WERKSTATT', '20 Min'], ['Der erste automatische Ablauf', 'WERKSTATT', '26 Min'], ['Verbindungen ohne Programmieren', 'WERKSTATT', '24 Min'], ['Daten sauber halten', 'WERKSTATT', '18 Min'], ['Wenn es schiefgeht: der Rückfallplan', 'WERKSTATT', '15 Min'], ['Aus einem Ablauf zehn machen', 'ÜBUNG', '20 Min']]
}, {
  n: '10',
  title: 'Zahlen & Entscheide',
  level: 'FÜHRUNG',
  hours: '1 Std 08',
  nutzen: 'Sie rechnen vor dem Kauf, ob sich ein Werkzeug lohnt — und stoppen Abos, die nichts bringen. Das sind schnell einige Hundert Franken im Jahr.',
  tile: 'Rechnen statt hoffen: Kosten, Nutzen, Quartals-Entscheid.',
  lead: 'Was bringt es wirklich? Sie rechnen Ihren eigenen Fall durch, vergleichen Lizenzen und entscheiden pro Quartal, was bleibt und was wieder verschwindet.',
  bild: 'Bild: Notizblock mit Zahlen',
  img: 'assets/lernplan-10.png',
  takeaways: ['Business-Case-Rechner', 'Lizenz-Vergleichsblatt', 'Quartals-Entscheid (Vorlage)'],
  lessons: [['Kosten und Nutzen rechnen', 'ÜBUNG', '22 Min'], ['Angebote und Lizenzen vergleichen', 'VIDEO', '14 Min'], ['Wann sich Eigenbau lohnt — und wann nicht', 'VIDEO', '14 Min'], ['Der Quartals-Entscheid: was bleibt, was fliegt', 'ÜBUNG', '18 Min']]
}, {
  n: '11',
  title: 'Team & Verantwortung',
  level: 'FÜHRUNG',
  hours: '1 Std 17',
  nutzen: 'Ihre Mitarbeitenden nutzen KI nach klaren Regeln statt heimlich am eigenen Konto. Sie behalten die Kontrolle über Daten und Qualität.',
  tile: 'Regeln, Rollen und der Umgang mit Skepsis im Team.',
  lead: 'KI im Betrieb ist Führungsarbeit. Sie schreiben eine Richtlinie auf einer Seite, klären Rollen und Freigaben und nehmen die Mitarbeitenden mit, statt sie zu überfahren.',
  bild: 'Bild: Team im Pausenraum',
  img: 'assets/lernplan-11.png',
  takeaways: ['KI-Richtlinie auf einer Seite', 'Rollen- und Freigabe-Matrix', 'Schulungsplan fürs Team'],
  lessons: [['Eine KI-Richtlinie auf einer Seite', 'WERKSTATT', '20 Min'], ['Mitarbeitende mitnehmen statt überfahren', 'VIDEO', '14 Min'], ['Wer darf was? Rollen und Freigaben', 'WERKSTATT', '16 Min'], ['Umgang mit Skepsis im Team', 'VIDEO', '12 Min'], ['KI-Kompetenz messen: der kleine Check', 'ÜBUNG', '15 Min']]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "academy/academy-daten.js", error: String((e && e.message) || e) }); }

// academy/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "academy/image-slot.js", error: String((e && e.message) || e) }); }

// components/cards/KompassTile.jsx
try { (() => {
/** Kompass-Tile: nummerierte Wertefrage auf Sand (radius 14px). */
function KompassTile({
  number,
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '14px',
      alignItems: 'baseline',
      background: 'var(--surface-card-sand)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-sm)',
      padding: '20px 22px',
      boxSizing: 'border-box',
      fontSize: '15.5px',
      lineHeight: 1.5,
      fontWeight: 500,
      color: 'var(--text-strong)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      fontWeight: 600,
      color: 'var(--terra-500)',
      flex: 'none'
    }
  }, number), children);
}
Object.assign(__ds_scope, { KompassTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/KompassTile.jsx", error: String((e && e.message) || e) }); }

// components/cards/QuoteCard.jsx
try { (() => {
/** Dunkle Zitat-Karte: weisses vaiacon-Symbol, «Zitat», Attribution in Orange. */
function QuoteCard({
  logoSrc,
  quote,
  attribution,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: 'var(--ink-950)',
      borderRadius: '24px',
      padding: '40px 36px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      justifyContent: 'center',
      ...style
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "",
    style: {
      height: '32px',
      width: 'auto',
      display: 'block',
      alignSelf: 'flex-start',
      opacity: 0.95
    }
  }) : null, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontSize: '21px',
      fontWeight: 500,
      letterSpacing: '-0.015em',
      lineHeight: 1.5,
      color: '#FFFFFF'
    }
  }, "\xAB", quote, "\xBB"), attribution ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      fontWeight: 600,
      color: 'rgba(233, 140, 88, 0.9)'
    }
  }, attribution) : null);
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/TeamCard.jsx
try { (() => {
/** Team-Karte: Foto in weicher Maske auf Sand-Karte, Name + Rolle darunter. */
function TeamCard({
  src,
  alt = '',
  name,
  role,
  photoHeight = 330,
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card-sand)',
      border: '1px solid var(--border-strong)',
      borderRadius: '24px',
      padding: '18px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transform: hover ? 'translateY(-5px)' : 'translateY(0)',
      transition: 'transform 0.4s var(--ease-spring)',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: `${photoHeight}px`,
      objectFit: 'cover',
      borderRadius: '16px',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: `${photoHeight}px`,
      borderRadius: '16px',
      boxSizing: 'border-box',
      border: '1px dashed var(--border-strong)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: '13px',
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, children || `Foto ${name || ''}`), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      padding: '0 8px 10px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '19px',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '14.5px',
      fontWeight: 600,
      color: 'var(--text-muted)'
    }
  }, role)));
}
Object.assign(__ds_scope, { TeamCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TeamCard.jsx", error: String((e && e.message) || e) }); }

// components/chat/ChatMessage.jsx
try { (() => {
/** Chat-Nachricht: Bot links (Creme), Nutzer rechts (Terracotta). */
function ChatMessage({
  role = 'bot',
  comic,
  style,
  children
}) {
  const user = role === 'user';
  const base = comic ? {
    background: user ? 'var(--terra-500)' : 'var(--cream-100)',
    border: '1.5px solid var(--border-ink)',
    color: user ? 'var(--cream-50)' : 'var(--text-strong)',
    borderRadius: user ? '12px 12px 3px 12px' : '12px 12px 12px 3px',
    padding: '8px 12px',
    fontSize: '13.5px',
    fontWeight: 500,
    lineHeight: 1.45
  } : {
    background: user ? 'var(--terra-700)' : 'var(--surface-card)',
    border: user ? 'none' : '1px solid rgba(28, 22, 19, 0.18)',
    color: user ? 'var(--cream-50)' : 'var(--text-strong)',
    borderRadius: user ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
    padding: '10px 14px',
    fontSize: '14.5px',
    lineHeight: 1.55
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: user ? 'flex-end' : 'flex-start',
      maxWidth: '86%',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'pre-wrap',
      ...base,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { ChatMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/ChatMessage.jsx", error: String((e && e.message) || e) }); }

// components/chat/SpeechBubble.jsx
try { (() => {
/** Comic-Sprechblase mit Tail — so «spricht» der Büro-Bot. */
function SpeechBubble({
  tail = 'bottom-left',
  comic,
  onClick,
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  const border = comic ? '2px solid var(--border-ink)' : '1.5px solid rgba(28, 22, 19, 0.55)';
  const clickable = !!onClick;
  const tails = {
    right: /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        right: '-12px',
        top: '44px',
        width: '22px',
        height: '22px',
        background: 'var(--surface-card)',
        borderTop: border,
        borderRight: border,
        transform: 'rotate(45deg)',
        zIndex: 2
      }
    }),
    left: /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        left: '-12px',
        top: '44px',
        width: '22px',
        height: '22px',
        background: 'var(--surface-card)',
        borderBottom: border,
        borderLeft: border,
        transform: 'rotate(45deg)',
        zIndex: 2
      }
    }),
    'bottom-left': /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        position: 'absolute',
        left: '-2px',
        bottom: '-11px',
        width: '18px',
        height: '18px',
        background: 'var(--surface-card)',
        borderLeft: border,
        borderBottom: border,
        transform: 'skewX(38deg) rotate(-14deg)',
        borderRadius: '0 0 0 6px'
      }
    })
  };
  const Tag = clickable ? 'button' : 'div';
  return /*#__PURE__*/React.createElement(Tag, {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'block',
      textAlign: 'left',
      boxSizing: 'border-box',
      background: 'var(--surface-card)',
      color: 'var(--text-strong)',
      border,
      borderRadius: tail === 'bottom-left' ? '18px 18px 18px 4px' : '20px',
      padding: '14px 18px',
      fontFamily: 'var(--font-sans)',
      fontSize: '15.5px',
      fontWeight: 600,
      lineHeight: 1.4,
      boxShadow: comic ? 'var(--shadow-comic)' : 'var(--shadow-soft)',
      cursor: clickable ? 'pointer' : 'default',
      transform: clickable && hover ? 'translateY(-4px) rotate(-1deg)' : 'none',
      transition: 'transform 0.35s var(--ease-spring)',
      ...style
    }
  }, tails[tail] || null, children);
}
Object.assign(__ds_scope, { SpeechBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/chat/SpeechBubble.jsx", error: String((e && e.message) || e) }); }

// components/content/FaqItem.jsx
try { (() => {
/** FAQ-Zeile als <details>: Frage + rotierendes «+», Hairline-Trenner. */
function FaqItem({
  question,
  last,
  defaultOpen,
  style,
  children
}) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return /*#__PURE__*/React.createElement("details", {
    open: open,
    onToggle: e => setOpen(e.target.open),
    style: {
      borderTop: '1px solid var(--border-strong)',
      borderBottom: last ? '1px solid var(--border-strong)' : 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("summary", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      cursor: 'pointer',
      padding: '21px 4px',
      listStyle: 'none',
      WebkitTapHighlightColor: 'transparent',
      fontSize: '17px',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, question, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--terra-500)',
      fontFamily: 'var(--font-sans)',
      fontSize: '20px',
      fontWeight: 400,
      flex: 'none',
      display: 'inline-block',
      transition: 'transform 0.35s ease',
      transform: open ? 'rotate(45deg)' : 'rotate(0deg)'
    }
  }, "+")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: '0 4px 24px',
      fontSize: '15px',
      lineHeight: 1.7,
      color: 'var(--text-body)'
    }
  }, children));
}
Object.assign(__ds_scope, { FaqItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FaqItem.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceRow.jsx
try { (() => {
/** Leistungs-Zeile: Nummer · Titel + Text · Pfeil; Hover tönt Grund und schiebt nach rechts. */
function ServiceRow({
  number,
  title,
  last,
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'grid',
      gridTemplateColumns: 'clamp(30px, 7vw, 84px) minmax(0, 1fr) auto',
      gap: 'clamp(14px, 3vw, 28px)',
      alignItems: 'center',
      padding: hover ? 'clamp(22px, 4vw, 32px) 18px clamp(22px, 4vw, 32px) 34px' : 'clamp(22px, 4vw, 32px) 18px',
      borderTop: '1px solid var(--border-strong)',
      borderBottom: last ? '1px solid var(--border-strong)' : 'none',
      background: hover ? 'var(--sand-300)' : 'transparent',
      transition: 'background 0.35s ease, padding-left 0.35s ease',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '14px',
      fontWeight: 600,
      color: 'var(--terra-500)'
    }
  }, number), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'clamp(18px, 4.4vw, 21px)',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '15.5px',
      lineHeight: 1.6,
      color: 'var(--text-body)',
      maxWidth: '70ch'
    }
  }, children)), /*#__PURE__*/React.createElement("i", {
    "aria-hidden": "true",
    style: {
      fontStyle: 'normal',
      fontSize: '20px',
      color: 'var(--brown-300)'
    }
  }, "\u2192"));
}
Object.assign(__ds_scope, { ServiceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const BUTTON_VARIANTS = {
  cta: {
    base: {
      background: 'var(--cta-bg)',
      color: '#FFFFFF'
    },
    hover: {
      background: 'var(--cta-bg-hover)'
    }
  },
  light: {
    base: {
      background: 'var(--cream-100)',
      color: 'var(--terra-600)',
      boxShadow: 'var(--shadow-cta)'
    },
    hover: {
      transform: 'translateY(-3px)',
      boxShadow: 'var(--shadow-cta-hover)'
    }
  },
  glass: {
    base: {
      background: 'rgba(255, 244, 236, 0.12)',
      border: '1px solid rgba(255, 255, 255, 0.35)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#FFFFFF'
    },
    hover: {
      background: 'rgba(255, 244, 236, 0.24)'
    }
  },
  dark: {
    base: {
      background: 'var(--ink-950)',
      color: 'var(--cream-100)'
    },
    hover: {
      background: 'var(--terra-700)'
    }
  }
};
const BUTTON_SIZES = {
  sm: {
    fontSize: '14.5px',
    padding: '10px 20px'
  },
  md: {
    fontSize: '17px',
    padding: '15px 28px'
  },
  lg: {
    fontSize: '18px',
    padding: '16px 32px'
  }
};

/** Pill-Button der Marke — Beschriftung lowercase, Pfeil-Glyph als Suffix. */
function Button({
  variant = 'cta',
  size = 'md',
  arrow,
  href,
  target,
  onClick,
  disabled,
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  const v = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.cta;
  const s = BUTTON_SIZES[size] || BUTTON_SIZES.md;
  const css = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '11px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 700,
    lineHeight: 1.2,
    textDecoration: 'none',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    transition: 'background 0.3s ease, color 0.3s ease, transform 0.3s var(--ease-spring), box-shadow 0.3s ease',
    ...s,
    ...v.base,
    ...(hover && !disabled ? v.hover : null),
    ...style
  };
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    target: target,
    rel: target === '_blank' ? 'noopener' : undefined,
    onClick: onClick,
    disabled: href ? undefined : disabled,
    style: css,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, children, arrow ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, arrow === true ? '→' : arrow) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/CheckItem.jsx
try { (() => {
/** ✓-Listenzeile. plain = nacktes ✓ (baseline) · boxed = ✓ im 22px-Quadrat (auf Terra). */
function CheckItem({
  boxed,
  tone = 'light',
  style,
  children
}) {
  const onColor = tone === 'onTerra';
  const check = boxed ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '22px',
      height: '22px',
      borderRadius: 'var(--radius-xs)',
      flex: 'none',
      background: onColor ? 'rgba(255, 244, 236, 0.15)' : 'var(--peach-150)',
      border: onColor ? '1px solid rgba(255, 255, 255, 0.34)' : '1px solid var(--border-strong)',
      color: onColor ? 'var(--peach-200)' : 'var(--terra-500)',
      fontSize: '11px'
    }
  }, "\u2713") : /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: onColor ? 'var(--peach-200)' : tone === 'onDark' ? 'var(--orange-300)' : 'var(--terra-500)',
      fontWeight: 700,
      flex: 'none'
    }
  }, "\u2713");
  return /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      alignItems: boxed ? 'center' : 'baseline',
      gap: '12px',
      listStyle: 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: boxed ? '16.5px' : '15px',
      fontWeight: boxed ? 600 : 500,
      lineHeight: 1.5,
      color: onColor ? 'var(--peach-100)' : tone === 'onDark' ? 'rgba(255, 255, 255, 0.88)' : 'var(--text-strong)',
      ...style
    }
  }, check, children);
}
Object.assign(__ds_scope, { CheckItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CheckItem.jsx", error: String((e && e.message) || e) }); }

// components/core/CheckPill.jsx
try { (() => {
/** Check-Chip: Pill mit ✓ für kurze Vertrauensargumente («DSG-konformes Arbeiten»). */
function CheckPill({
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("li", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '9px',
      listStyle: 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: '14.5px',
      fontWeight: 600,
      color: 'var(--text-strong)',
      background: 'var(--cream-100)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-pill)',
      padding: '10px 18px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--terra-500)'
    }
  }, "\u2713"), children);
}
Object.assign(__ds_scope, { CheckPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CheckPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Kicker.jsx
try { (() => {
const KICKER_TONES = {
  terra: 'var(--terra-500)',
  onTerra: 'rgba(255, 236, 222, 0.88)',
  onDark: 'var(--orange-500)'
};

/** Nummerierter Kicker über Sektionstiteln: «02 — WAS WIR FÜR SIE TUN». */
function Kicker({
  number,
  tone = 'terra',
  style,
  children
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: '13.5px',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: KICKER_TONES[tone] || KICKER_TONES.terra,
      ...style
    }
  }, number ? `${number} — ` : '', children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/core/LabelBadge.jsx
try { (() => {
const BADGE_TONES = {
  peach: {
    color: 'var(--terra-600)',
    background: 'var(--peach-150)',
    border: 'none'
  },
  onTerra: {
    color: 'var(--peach-100)',
    background: 'rgba(255, 244, 236, 0.16)',
    border: '1px solid rgba(255, 255, 255, 0.3)'
  },
  onDark: {
    color: 'var(--orange-300)',
    background: 'rgba(233, 140, 88, 0.13)',
    border: '1px solid rgba(233, 140, 88, 0.4)'
  }
};

/** Gesperrtes UPPERCASE-Mini-Badge: «KOSTENLOS & UNVERBINDLICH», «PAKET 01 · ARBEITSWEISE». */
function LabelBadge({
  tone = 'peach',
  style,
  children
}) {
  const t = BADGE_TONES[tone] || BADGE_TONES.peach;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      alignSelf: 'flex-start',
      fontFamily: 'var(--font-sans)',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      borderRadius: 'var(--radius-pill)',
      padding: '7px 13px',
      ...t,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { LabelBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LabelBadge.jsx", error: String((e && e.message) || e) }); }

// components/cards/PackageCard.jsx
try { (() => {
const PACKAGE_VARIANTS = {
  terra: {
    background: 'var(--grad-package)',
    border: '1.5px solid rgba(28, 22, 19, 0.5)',
    title: '#FFFFFF',
    subtitle: 'rgba(255, 240, 230, 0.9)',
    badge: 'onTerra',
    check: 'onTerra',
    rule: '1px solid rgba(255, 255, 255, 0.28)',
    label: 'rgba(255, 240, 230, 0.75)',
    price: '#FFFFFF'
  },
  dark: {
    background: 'var(--ink-950)',
    border: 'none',
    title: '#FFFFFF',
    subtitle: 'rgba(255, 255, 255, 0.7)',
    badge: 'onDark',
    check: 'onDark',
    rule: '1px solid rgba(255, 255, 255, 0.18)',
    label: 'rgba(255, 255, 255, 0.55)',
    price: '#FFFFFF'
  },
  sand: {
    background: 'var(--surface-card-sand)',
    border: '1px solid var(--border-strong)',
    title: 'var(--text-strong)',
    subtitle: 'var(--text-body)',
    badge: 'peach',
    check: 'light',
    rule: '1px solid var(--border-strong)',
    label: 'var(--text-muted)',
    price: 'var(--terra-600)'
  }
};
PACKAGE_VARIANTS.ink = PACKAGE_VARIANTS.dark;

/** Paket-Karte: Terra-Verlauf, Tinte oder Sand-Hairline, Badge, Feature-Liste, Preiszeile unten. */
function PackageCard({
  variant = 'terra',
  badge,
  title,
  subtitle,
  features = [],
  price = 'AUF ANFRAGE',
  style
}) {
  const [hover, setHover] = React.useState(false);
  const v = PACKAGE_VARIANTS[variant] || PACKAGE_VARIANTS.terra;
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: v.background,
      border: v.border,
      borderRadius: 'var(--radius-xl)',
      padding: 'clamp(26px, 5vw, 40px) clamp(22px, 4.6vw, 38px)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      transform: hover ? 'translateY(-6px)' : 'translateY(0)',
      transition: 'transform 0.4s var(--ease-spring)',
      ...style
    }
  }, badge ? /*#__PURE__*/React.createElement(__ds_scope.LabelBadge, {
    tone: v.badge
  }, badge) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 'clamp(24px, 5.4vw, 30px)',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: v.title
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '15px',
      lineHeight: 1.55,
      color: v.subtitle
    }
  }, subtitle) : null), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      listStyle: 'none',
      margin: '4px 0',
      padding: 0
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement(__ds_scope.CheckItem, {
    key: i,
    tone: v.check
  }, f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '12px',
      marginTop: 'auto',
      paddingTop: '20px',
      borderTop: v.rule,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10.5px',
      letterSpacing: '0.16em',
      color: v.label
    }
  }, "PREIS"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '0.14em',
      color: v.price,
      textTransform: 'uppercase'
    }
  }, price)));
}
Object.assign(__ds_scope, { PackageCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PackageCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/StepCard.jsx
try { (() => {
/** Nummerierte Ablauf-Karte (Sand, radius 22px, federnder Hover-Lift). */
function StepCard({
  number,
  badge,
  title,
  style,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("li", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      listStyle: 'none',
      background: 'var(--surface-card-sand)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-lg)',
      padding: '34px 32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      transform: hover ? 'translateY(-6px)' : 'translateY(0)',
      transition: 'transform 0.4s var(--ease-spring)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      fontWeight: 600,
      color: 'var(--terra-500)'
    }
  }, number), badge ? /*#__PURE__*/React.createElement(__ds_scope.LabelBadge, {
    style: {
      fontSize: '9.5px',
      letterSpacing: '0.12em',
      padding: '6px 11px'
    }
  }, badge) : null), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '20px',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: 'var(--text-strong)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '15px',
      lineHeight: 1.65,
      color: 'var(--text-body)'
    }
  }, children));
}
Object.assign(__ds_scope, { StepCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/StepCard.jsx", error: String((e && e.message) || e) }); }

// components/decor/Twinkle.jsx
try { (() => {
/** Twinkle-Stern ✦: absolut positionierte, sanft funkelnde Deko auf Terra/Dunkel. */
function Twinkle({
  left,
  right,
  top,
  bottom,
  size = 11,
  delay = 0,
  duration = 5.5,
  color = '#FFFFFF',
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left,
      right,
      top,
      bottom,
      color,
      fontSize: `${size}px`,
      pointerEvents: 'none',
      animation: `twinkle ${duration}s ease-in-out ${delay}s infinite`,
      ...style
    }
  }, "\u2726");
}
Object.assign(__ds_scope, { Twinkle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/decor/Twinkle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
/** Schlanker Footer auf Terra-Glow: weisses Lockup, Adresszeile, Meta. */
function SiteFooter({
  logoSrc = 'assets/logo-lockup-white.png',
  logoHeight = 24,
  address = 'vaiacon · Lehenstrasse 74, 8037 Zürich',
  email = 'hallo@vaiacon.ch',
  copyright = '© 2026 vaiacon',
  onTop,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--grad-terra-footer)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto',
      padding: '34px 32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '18px 36px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: onTop,
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "vaiacon",
    style: {
      height: `${logoHeight}px`,
      width: 'auto',
      display: 'block',
      opacity: 0.95
    }
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '14px',
      lineHeight: 1.6,
      color: 'rgba(255, 255, 255, 0.6)'
    }
  }, address, " \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      color: '#FFFFFF',
      fontWeight: 500,
      textDecoration: 'none'
    }
  }, email)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '28px',
      fontFamily: 'var(--font-sans)',
      fontSize: '13.5px',
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.5)'
    }
  }, /*#__PURE__*/React.createElement("span", null, copyright), /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: onTop,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: hover ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    }
  }, "\u2191 nach oben"))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function NavLink({
  href,
  active,
  onClick,
  children
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color: active || hover ? 'var(--terra-500)' : 'var(--text-strong)',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    }
  }, children);
}

/** Website-Header: vaiacon-Lockup, lowercase-Nav, oranger Pill-CTA. */
function SiteHeader({
  logoSrc = 'assets/logo-lockup-terra.png',
  logoHeight = 56,
  links = [],
  active,
  ctaLabel = 'erstgespräch',
  ctaHref = '#kontakt',
  onNavigate,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--cream-100)',
      borderBottom: '1px solid var(--border-soft)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--header-max)',
      margin: '0 auto',
      padding: '30px 40px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '28px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    "aria-label": "vaiacon Startseite",
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "vaiacon",
    style: {
      height: `${logoHeight}px`,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Hauptnavigation",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '40px',
      fontFamily: 'var(--font-sans)',
      fontSize: '18.5px',
      fontWeight: 600
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l.href,
    href: l.href,
    active: active === l.href.replace('#', ''),
    onClick: onNavigate ? e => onNavigate(e, l.href) : undefined
  }, l.label)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    arrow: true,
    href: ctaHref,
    style: {
      padding: '15px 32px'
    }
  }, ctaLabel))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
const {
  SiteHeader,
  SiteFooter
} = window.vaiaconDesignSystem_5f353f;
const NAV_LINKS = [{
  number: '01',
  label: 'Wofür wir stehen',
  href: '#orientierung'
}, {
  number: '02',
  label: 'Leistungen',
  href: '#leistungen'
}, {
  number: '03',
  label: 'Büro-Bot',
  href: '#buerobot'
}, {
  number: '05',
  label: 'Vertrauen',
  href: '#datenschutz'
}, {
  number: '06',
  label: 'Begleitung',
  href: '#begleitung'
}, {
  number: '07',
  label: 'Über uns',
  href: '#ueber-uns'
}, {
  number: '08',
  label: 'FAQ',
  href: '#faq'
}, {
  number: '09',
  label: 'Kontakt',
  href: '#kontakt'
}];
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "headlineTop": 17,
  "robotBottom": -3,
  "robotHeight": 56,
  "robotX": 0,
  "vignette": true,
  "stampStyle": "glas",
  "stampText": "Kostenlose Online-Erstanalyse",
  "stampPosX": 69.6,
  "stampPosY": 46,
  "stampWidth": 550,
  "stampRotate": 0,
  "stampFontSize": 16,
  "stampRadius": 999,
  "stampTail": false,
  "stampTailX": 26,
  "stampTailSize": 26
} /*EDITMODE-END*/;
function App() {
  const [active, setActive] = React.useState('');
  const [chatOpen, setChatOpen] = React.useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      let a = '';
      ['orientierung', 'leistungen', 'buerobot', 'datenschutz', 'begleitung', 'ueber-uns', 'faq', 'kontakt'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.45 && r.bottom >= vh * 0.45) a = id;
      });
      setActive(a);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    check();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "site-header-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-desktop"
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    logoSrc: "../../assets/logo-lockup-terra-symbol-cream.png",
    links: NAV_LINKS,
    active: active,
    ctaLabel: null
  })), /*#__PURE__*/React.createElement(MobileHeader, {
    logoSrc: "../../assets/logo-lockup-terra-symbol-cream.png",
    links: NAV_LINKS,
    active: active,
    ctaLabel: null
  })), /*#__PURE__*/React.createElement("div", {
    className: "site-header-spacer",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement(Hero, {
    tweaks: tweaks
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Orientierung, null), /*#__PURE__*/React.createElement(Leistungen, null), /*#__PURE__*/React.createElement(Buerobot, {
    onOpenChat: () => setChatOpen(true)
  }), /*#__PURE__*/React.createElement(Ablauf, null), /*#__PURE__*/React.createElement(Datenschutz, null), /*#__PURE__*/React.createElement(Versprechen, null), /*#__PURE__*/React.createElement(Begleitung, null), /*#__PURE__*/React.createElement(UeberUns, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Kontakt, null)), /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: "../../assets/logo-lockup-white.png"
  }), /*#__PURE__*/React.createElement(ChatWidget, {
    open: chatOpen,
    onOpen: () => setChatOpen(true),
    onClose: () => setChatOpen(false)
  }), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Roboter"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Position X (\xB1 Mitte)",
    value: tweaks.robotX,
    min: -24,
    max: 24,
    step: 1,
    unit: "vw",
    onChange: v => setTweak('robotX', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Abstand unten",
    value: tweaks.robotBottom,
    min: -8,
    max: 16,
    step: 1,
    unit: "vh",
    onChange: v => setTweak('robotBottom', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Gr\xF6sse",
    value: tweaks.robotHeight,
    min: 36,
    max: 78,
    step: 1,
    unit: "vh",
    onChange: v => setTweak('robotHeight', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero-Layout"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Headline \xB7 Abstand oben",
    value: tweaks.headlineTop,
    min: 12,
    max: 28,
    step: 1,
    unit: "vh",
    onChange: v => setTweak('headlineTop', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Erstanalyse-Stempel"
  }), /*#__PURE__*/React.createElement(TweakText, {
    label: "Text",
    value: tweaks.stampText,
    placeholder: "Kostenlose Online-Erstanalyse",
    onChange: v => setTweak('stampText', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Stil",
    value: tweaks.stampStyle,
    options: ['comic', 'glas', 'tinte'],
    onChange: v => setTweak('stampStyle', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Position X",
    value: tweaks.stampPosX,
    min: 20,
    max: 90,
    step: 0.5,
    unit: "%",
    onChange: v => setTweak('stampPosX', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Abstand unten",
    value: tweaks.stampPosY,
    min: 20,
    max: 72,
    step: 1,
    unit: "vh",
    onChange: v => setTweak('stampPosY', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Breite (max)",
    value: tweaks.stampWidth,
    min: 300,
    max: 620,
    step: 10,
    unit: "px",
    onChange: v => setTweak('stampWidth', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Drehung",
    value: tweaks.stampRotate,
    min: -8,
    max: 8,
    step: 0.5,
    unit: "\xB0",
    onChange: v => setTweak('stampRotate', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Textgr\xF6sse",
    value: tweaks.stampFontSize,
    min: 11,
    max: 16,
    step: 0.5,
    unit: "px",
    onChange: v => setTweak('stampFontSize', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Eckenradius",
    value: tweaks.stampRadius,
    min: 8,
    max: 28,
    step: 1,
    unit: "px",
    onChange: v => setTweak('stampRadius', v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Tail (Zeiger)",
    value: tweaks.stampTail,
    onChange: v => setTweak('stampTail', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Tail \xB7 Position",
    value: tweaks.stampTailX,
    min: 10,
    max: 90,
    step: 1,
    unit: "%",
    onChange: v => setTweak('stampTailX', v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Tail \xB7 Gr\xF6sse",
    value: tweaks.stampTailSize,
    min: 12,
    max: 44,
    step: 2,
    unit: "px",
    onChange: v => setTweak('stampTailSize', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Hero-Extras"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Abdunklungs-Vignette",
    value: tweaks.vignette,
    onChange: v => setTweak('vignette', v)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/chat-widget.compiled.js
try { (() => {
const {
  Button,
  ChatMessage
} = window.vaiaconDesignSystem_5f353f;

/* Fixes Chat-Widget unten rechts. Antworten sind Fake-Demo (keine API). */
function ChatWidget({
  open,
  onOpen,
  onClose
}) {
  const [msgs, setMsgs] = React.useState([{
    role: 'bot',
    text: 'Grüezi! Ich beantworte gern Ihre Fragen zu vaiacon, unseren Paketen oder dem vaiaconBot. Womit kann ich helfen?'
  }]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [bottomOffset, setBottomOffset] = React.useState(0);
  const listRef = React.useRef(null);
  React.useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, busy, open]);
  React.useEffect(() => {
    let frame = 0;
    const updateOffset = () => {
      frame = 0;
      if (window.matchMedia('(max-width: 760px)').matches) {
        setBottomOffset(0);
        return;
      }
      const footer = document.querySelector('footer');
      if (!footer) {
        setBottomOffset(0);
        return;
      }
      const footerTop = footer.getBoundingClientRect().top;
      const overlap = Math.max(0, window.innerHeight - footerTop);
      setBottomOffset(overlap > 0 ? Math.ceil(overlap + 18) : 0);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateOffset);
    };
    updateOffset();
    window.addEventListener('scroll', scheduleUpdate, {
      passive: true
    });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);
  const send = () => {
    const q = input.trim();
    if (!q || busy) return;
    setMsgs(m => m.concat([{
      role: 'user',
      text: q
    }]));
    setInput('');
    setBusy(true);
    setTimeout(() => {
      setMsgs(m => m.concat([{
        role: 'bot',
        text: 'Demo-Antwort: Am besten klären wir das im kostenlosen Erstgespräch – schreiben Sie uns an hallo@vaiacon.ch oder buchen Sie direkt einen Termin.'
      }]));
      setBusy(false);
    }, 700);
  };
  const chatFabStyle = {
    padding: '14px 18px',
    fontSize: 15.5,
    gap: 10,
    background: 'var(--surface-card-sand)',
    color: 'var(--text-strong)',
    border: '1px solid var(--border-strong)',
    borderRadius: 18,
    boxShadow: 'none'
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Chatbot",
    className: "chat-root",
    style: {
      position: 'fixed',
      right: 0,
      bottom: bottomOffset,
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      transition: 'bottom 0.18s ease'
    }
  }, !open && /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "sm",
    onClick: onOpen,
    style: chatFabStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 10,
      background: 'var(--cream-100)',
      border: '1px solid rgba(28,22,19,0.18)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--terra-500)',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "chat-fab-long"
  }, "Fragen an den vaiaconBot?")), open && /*#__PURE__*/React.createElement("div", {
    className: "chat-panel",
    style: {
      width: 380,
      maxWidth: 'calc(100vw - 44px)',
      height: 560,
      maxHeight: 'calc(100vh - 44px)',
      background: 'var(--cream-100)',
      border: '1.5px solid rgba(28,22,19,0.5)',
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--terra-700)',
      color: 'var(--cream-50)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, "vaiacon Assistent"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      opacity: 0.85
    }
  }, "beantwortet Fragen zu Angebot & vaiaconBot")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Chat schliessen",
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--cream-50)',
      fontSize: 24,
      cursor: 'pointer',
      lineHeight: 1,
      padding: '4px 6px'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement(ChatMessage, {
    key: i,
    role: m.role === 'user' ? 'user' : 'bot'
  }, m.text)), busy && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-start',
      background: 'var(--surface-card)',
      border: '1px solid rgba(28,22,19,0.18)',
      color: 'var(--text-muted)',
      borderRadius: '14px 14px 14px 4px',
      padding: '10px 14px',
      fontSize: 14.5
    }
  }, "schreibt \u2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: 12,
      borderTop: '1.5px solid var(--border-strong)',
      background: 'var(--bg-alt)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "chat-input",
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    placeholder: "Ihre Frage\u2026",
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-strong)',
      borderRadius: 12,
      padding: '12px 14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      color: 'var(--text-strong)',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: send,
    "aria-label": "Senden",
    className: "chat-send",
    style: {
      background: 'var(--ink-950)',
      color: 'var(--cream-100)',
      border: 'none',
      borderRadius: 12,
      padding: '0 18px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      opacity: busy ? 0.55 : 1
    }
  }, "\u2192"))));
}
Object.assign(window, {
  ChatWidget
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/chat-widget.compiled.js", error: String((e && e.message) || e) }); }

// ui_kits/website/chat-widget.jsx
try { (() => {
const {
  Button,
  ChatMessage
} = window.vaiaconDesignSystem_5f353f;

/* Fixes Chat-Widget unten rechts. Antworten sind Fake-Demo (keine API). */
function ChatWidget({
  open,
  onOpen,
  onClose
}) {
  const [msgs, setMsgs] = React.useState([{
    role: 'bot',
    text: 'Grüezi! Ich beantworte gern Ihre Fragen zu vaiacon, unseren Paketen oder dem vaiaconBot. Womit kann ich helfen?'
  }]);
  const [input, setInput] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [bottomOffset, setBottomOffset] = React.useState(0);
  const listRef = React.useRef(null);
  React.useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, busy, open]);
  React.useEffect(() => {
    let frame = 0;
    const updateOffset = () => {
      frame = 0;
      if (window.matchMedia('(max-width: 760px)').matches) {
        setBottomOffset(0);
        return;
      }
      const footer = document.querySelector('footer');
      if (!footer) {
        setBottomOffset(0);
        return;
      }
      const footerTop = footer.getBoundingClientRect().top;
      const overlap = Math.max(0, window.innerHeight - footerTop);
      setBottomOffset(overlap > 0 ? Math.ceil(overlap + 18) : 0);
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateOffset);
    };
    updateOffset();
    window.addEventListener('scroll', scheduleUpdate, {
      passive: true
    });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);
  const send = () => {
    const q = input.trim();
    if (!q || busy) return;
    setMsgs(m => m.concat([{
      role: 'user',
      text: q
    }]));
    setInput('');
    setBusy(true);
    setTimeout(() => {
      setMsgs(m => m.concat([{
        role: 'bot',
        text: 'Demo-Antwort: Am besten klären wir das im kostenlosen Erstgespräch – schreiben Sie uns an hallo@vaiacon.ch oder buchen Sie direkt einen Termin.'
      }]));
      setBusy(false);
    }, 700);
  };
  const chatFabStyle = {
    padding: '14px 18px',
    fontSize: 15.5,
    gap: 10,
    background: 'var(--surface-card-sand)',
    color: 'var(--text-strong)',
    border: '1px solid var(--border-strong)',
    borderRadius: 18,
    boxShadow: 'none'
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Chatbot",
    className: "chat-root",
    style: {
      position: 'fixed',
      right: 0,
      bottom: bottomOffset,
      zIndex: 90,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      transition: 'bottom 0.18s ease'
    }
  }, !open && /*#__PURE__*/React.createElement(Button, {
    variant: "light",
    size: "sm",
    onClick: onOpen,
    style: chatFabStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: 10,
      background: 'var(--cream-100)',
      border: '1px solid rgba(28,22,19,0.18)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 24px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--terra-500)',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "chat-fab-long"
  }, "Fragen an den vaiaconBot?")), open && /*#__PURE__*/React.createElement("div", {
    className: "chat-panel",
    style: {
      width: 380,
      maxWidth: 'calc(100vw - 44px)',
      height: 560,
      maxHeight: 'calc(100vh - 44px)',
      background: 'var(--cream-100)',
      border: '1.5px solid rgba(28,22,19,0.5)',
      borderRadius: 20,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--terra-700)',
      color: 'var(--cream-50)',
      padding: '14px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, "vaiacon Assistent"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      opacity: 0.85
    }
  }, "beantwortet Fragen zu Angebot & vaiaconBot")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Chat schliessen",
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--cream-50)',
      fontSize: 24,
      cursor: 'pointer',
      lineHeight: 1,
      padding: '4px 6px'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    ref: listRef,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, msgs.map((m, i) => /*#__PURE__*/React.createElement(ChatMessage, {
    key: i,
    role: m.role === 'user' ? 'user' : 'bot'
  }, m.text)), busy && /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'flex-start',
      background: 'var(--surface-card)',
      border: '1px solid rgba(28,22,19,0.18)',
      color: 'var(--text-muted)',
      borderRadius: '14px 14px 14px 4px',
      padding: '10px 14px',
      fontSize: 14.5
    }
  }, "schreibt \u2026")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: 12,
      borderTop: '1.5px solid var(--border-strong)',
      background: 'var(--bg-alt)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "chat-input",
    value: input,
    onChange: e => setInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send();
      }
    },
    placeholder: "Ihre Frage\u2026",
    style: {
      flex: 1,
      minWidth: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border-strong)',
      borderRadius: 12,
      padding: '12px 14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      color: 'var(--text-strong)',
      outline: 'none'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: send,
    "aria-label": "Senden",
    className: "chat-send",
    style: {
      background: 'var(--ink-950)',
      color: 'var(--cream-100)',
      border: 'none',
      borderRadius: 12,
      padding: '0 18px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 700,
      cursor: 'pointer',
      opacity: busy ? 0.55 : 1
    }
  }, "\u2192"))));
}
Object.assign(window, {
  ChatWidget
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/chat-widget.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/dsgvo-siegel.jsx
try { (() => {
/* DSG-Siegel: zertifikatartiger Sticker im vaiacon-Look.
   Kreis mit Comic-Rand, umlaufender Schrift und ✓/DSG/KONFORM im Zentrum.
   Verlinkt aufs Datenschutzversprechen (#datenschutz). */
function DsgvoSiegel({
  size = 132,
  rotate = -8,
  href = '#datenschutz',
  className,
  style
}) {
  const pid = React.useMemo(() => 'siegel-ring-' + Math.random().toString(36).slice(2, 8), []);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    "aria-label": "DSG-konform \u2014 zu unserem Datenschutzversprechen",
    className: 'dsgvo-siegel' + (className ? ' ' + className : ''),
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      textDecoration: 'none',
      flex: 'none',
      alignSelf: 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "-6 -6 144 144",
    width: "100%",
    height: "100%",
    role: "img",
    "aria-hidden": "true",
    style: {
      display: 'block',
      transform: 'rotate(' + rotate + 'deg)',
      filter: 'drop-shadow(4px 4px 0 rgba(28,22,19,0.26))'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: pid,
    d: "M 66 66 m -53.5 0 a 53.5 53.5 0 1 1 107 0 a 53.5 53.5 0 1 1 -107 0"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: "63",
    fill: "var(--surface-card)",
    stroke: "var(--border-ink)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "66",
    cy: "66",
    r: "48",
    fill: "none",
    stroke: "var(--terra-500)",
    strokeWidth: "1",
    strokeDasharray: "3 4",
    opacity: "0.75"
  }), /*#__PURE__*/React.createElement("text", {
    fill: "var(--terra-600)",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '8.5px',
      fontWeight: 700,
      letterSpacing: '1.8px'
    }
  }, /*#__PURE__*/React.createElement("textPath", {
    href: '#' + pid,
    startOffset: "25%",
    textAnchor: "middle"
  }, "\u2726 SCHWEIZER DATENSCHUTZ \u2726")), /*#__PURE__*/React.createElement("text", {
    x: "66",
    y: "54",
    textAnchor: "middle",
    fill: "var(--terra-500)",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '20px',
      fontWeight: 700
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("text", {
    x: "66",
    y: "77",
    textAnchor: "middle",
    fill: "var(--ink-900)",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '19px',
      fontWeight: 700,
      letterSpacing: '0.5px'
    }
  }, "DSG"), /*#__PURE__*/React.createElement("text", {
    x: "65",
    y: "92",
    textAnchor: "middle",
    fill: "var(--terra-600)",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '10px',
      fontWeight: 700,
      letterSpacing: '3px'
    }
  }, "KONFORM"), /*#__PURE__*/React.createElement("text", {
    x: "66",
    y: "113",
    textAnchor: "middle",
    fill: "var(--terra-500)",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '10px'
    }
  }, "\u2726")));
}
Object.assign(window, {
  DsgvoSiegel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/dsgvo-siegel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/erstanalyse-data.js
try { (() => {
/* Erstanalyse — Felddefinitionen, Fallback-Formel, Formatierung.
   Feldnamen sind EXAKT die Mail-Labels (identisch mit buero-bot.ch/erstanalyse).
   Gliederung: 8 Blöcke gemäss Konzept — Feldnamen unverändert, nur neu gruppiert. */
window.ErstanalyseData = function () {
  // External collection stays disabled until vaiacon has its own endpoints.
  const WORKER_URL = '';
  const FORMSPREE_URL = '';
  const PROD_HOSTS = ['philip1658.github.io', 'vaiacon.ch', 'www.vaiacon.ch', 'buero-bot.ch', 'www.buero-bot.ch', 'localhost', '127.0.0.1'];
  const SECTIONS = [{
    number: '01',
    kicker: 'Firmenprofil',
    fields: [{
      name: 'Firma und Name',
      type: 'text',
      required: true,
      placeholder: 'Muster AG, Hans Meier',
      hint: 'Firma, dann Ihr Name — z.B. «Muster AG, Hans Meier»'
    }, {
      name: 'Branche und Tätigkeit',
      type: 'text',
      required: true,
      placeholder: 'z.B. Sanitär, Kleinbetrieb mit Notfalldienst'
    }, {
      name: 'Mitarbeitende',
      type: 'radio',
      options: ['Nur ich', '2–5', '6–15', '16–50', 'Mehr als 50']
    }]
  }, {
    number: '02',
    kicker: 'Team & Rollen',
    fields: [{
      name: 'Büroarbeit erledigt',
      type: 'check',
      hint: 'Wer kümmert sich heute darum? Mehrfachauswahl möglich.',
      options: ['Ich selbst', 'Partner:in / Familie', 'Mitarbeiter:in', 'Extern (z.B. Treuhänder)']
    }, {
      name: 'Team-Haltung',
      type: 'radio',
      hint: 'Wie steht Ihr Team Veränderungen und neuen Tools gegenüber?',
      options: ['Offen und neugierig', 'Gemischt', 'Eher zurückhaltend', 'Schwer zu sagen']
    }, {
      name: 'KI-Schulung für',
      type: 'radio',
      hint: 'Wer soll bei Ihnen den Umgang mit KI lernen?',
      options: ['Das ganze Team', 'Einzelne Schlüsselpersonen', 'Erst einmal nur ich', 'Noch unklar']
    }, {
      name: 'Coaching-Interesse',
      type: 'radio',
      hint: 'Wünschen Sie sich neben der Technik auch Begleitung für sich und Ihr Team — Führung, Veränderung, Entlastung?',
      options: ['Ja, das interessiert mich', 'Vielleicht, erzählen Sie mehr', 'Nein, im Moment nur Technik']
    }]
  }, {
    number: '03',
    kicker: 'Administration & Ablage',
    fields: [{
      name: 'Tools Ablage',
      type: 'check',
      hint: 'Mehrfachauswahl möglich.',
      options: ['Papierordner', 'Ordner auf dem PC', 'Firmenserver / NAS', 'Cloud (Dropbox, OneDrive, Google Drive …)']
    }, {
      name: 'Papier oder digital',
      type: 'radio',
      options: ['Fast alles auf Papier', 'Gemischt, eher Papier', 'Gemischt, eher digital', 'Fast alles digital']
    }, {
      name: 'Tools Termine und Planung',
      type: 'check',
      hint: 'Mehrfachauswahl möglich.',
      options: ['Papieragenda', 'Outlook-/Google-Kalender', 'WhatsApp / Telefon', 'Planungstool / Software']
    }]
  }, {
    number: '04',
    kicker: 'Buchhaltung & Rechnungen',
    fields: [{
      name: 'Tools Offerten und Rechnungen',
      type: 'check',
      hint: 'Mehrfachauswahl möglich.',
      options: ['Word-/Excel-Vorlage', 'Bexio', 'Klara', 'Branchensoftware', 'Von Hand / Papier', 'Macht jemand anderes für mich']
    }, {
      name: 'Tools Buchhaltung',
      type: 'check',
      hint: 'Mehrfachauswahl möglich.',
      options: ['Treuhänder macht alles', 'Bexio', 'Banana', 'Abacus', 'Excel', 'Belege sammeln, Rest extern']
    }, {
      name: 'Offerten pro Monat',
      type: 'radio',
      options: ['Keine / fast keine', '1–5', '6–15', '16–40', 'Mehr als 40']
    }, {
      name: 'Dauer pro Offerte',
      type: 'radio',
      options: ['Unter 30 Minuten', '30–60 Minuten', '1–2 Stunden', 'Mehr als 2 Stunden']
    }, {
      name: 'Rechnungen pro Monat',
      type: 'radio',
      options: ['Keine / fast keine', '1–10', '11–30', '31–100', 'Mehr als 100']
    }]
  }, {
    number: '05',
    kicker: 'Kommunikation & Anfragen',
    fields: [{
      name: 'Anfragekanäle',
      type: 'check',
      hint: 'Wie kommen Kundenanfragen bei Ihnen an? Mehrfachauswahl möglich.',
      options: ['Telefon', 'WhatsApp / SMS', 'E-Mail', 'Website-Formular', 'Social Media', 'Empfehlung / Laufkundschaft']
    }, {
      name: 'Verpasste Anrufe',
      type: 'radio',
      hint: 'Gehen Anrufe verloren, wenn Sie unterwegs oder im Termin sind?',
      options: ['Ja, öfter', 'Manchmal', 'Combox, ich rufe zurück', 'Nein, jemand nimmt ab']
    }, {
      name: 'Gleiche Kundenfragen',
      type: 'radio',
      hint: 'Stellen Kunden oft dieselben Fragen (Preise, Ablauf, Termine …)?',
      options: ['Ja, ständig', 'Ab und zu', 'Selten']
    }, {
      name: 'Website-Status',
      type: 'radio',
      hint: 'Wie steht es um Ihre Website?',
      options: ['Keine Website', 'Vorhanden, aber veraltet', 'Aktuell', 'Aktuell mit Online-Funktionen']
    }]
  }, {
    number: '06',
    kicker: 'Tools & Systeme',
    fields: [{
      name: 'Tools E-Mail und Office',
      type: 'check',
      hint: 'Mehrfachauswahl möglich.',
      options: ['Microsoft 365 / Outlook', 'Google (Gmail/Workspace)', 'Bluewin / GMX / Hostpoint o.ä.', 'Word/Excel lokal installiert', 'Weiss nicht genau']
    }, {
      name: 'Branchensoftware',
      type: 'text',
      placeholder: 'Falls vorhanden: Name Ihrer Branchensoftware'
    }, {
      name: 'IT-Betreuung',
      type: 'radio',
      options: ['Niemand so richtig', 'Ich selbst', 'Externer IT-Dienstleister', 'Eigene IT-Person intern']
    }, {
      name: 'KI-Erfahrung',
      type: 'radio',
      options: ['Noch nie', 'Privat mal ausprobiert', 'Geschäftlich gelegentlich', 'Regelmässig im Einsatz']
    }]
  }, {
    number: '07',
    kicker: 'Zeitfresser & Engpässe',
    fields: [{
      name: 'Wiederkehrende Aufgaben',
      type: 'check',
      hint: 'Was kommt bei Ihnen regelmässig vor? Mehrfachauswahl möglich.',
      options: ['Offerten schreiben', 'Rechnungen und Mahnungen', 'E-Mails beantworten', 'Terminkoordination', 'Dokumente suchen und ablegen', 'Rapporte und Arbeitszeiten erfassen', 'Belege für die Buchhaltung', 'Social Media und Werbung', 'Lohnadministration', 'Texte und Briefe formulieren']
    }, {
      name: 'Bürostunden pro Woche',
      type: 'radio',
      options: ['Weniger als 5', '5–10', '10–20', 'Mehr als 20']
    }, {
      name: 'Grösster Zeitfresser',
      type: 'textarea',
      required: true,
      placeholder: 'Was frisst in Ihrem Büroalltag am meisten Zeit?',
      hint: 'Das einzige Feld, das wir nicht zum Ankreuzen anbieten — ein Satz genügt.'
    }]
  }, {
    number: '08',
    kicker: 'Kontakt & Erwartungen',
    fields: [{
      name: 'E-Mail',
      type: 'text',
      inputType: 'email',
      required: true,
      placeholder: 'z.B. peter.muster@muster-gmbh.ch',
      hint: 'Für Ihre Ersteinschätzung und die Terminvereinbarung.'
    }, {
      name: 'Telefon',
      type: 'text',
      inputType: 'tel',
      placeholder: 'z.B. 079 123 45 67',
      hint: 'Optional — falls Sie lieber angerufen werden.'
    }, {
      name: 'Zeithorizont',
      type: 'radio',
      hint: 'Wann möchten Sie etwas verändern?',
      options: ['So bald wie möglich', 'In den nächsten 3–6 Monaten', 'Ich möchte mich erst informieren']
    }, {
      name: 'Erwartungen an den Termin',
      type: 'textarea',
      placeholder: 'Optional: Was möchten Sie aus dem Erstgespräch mitnehmen?'
    }]
  }];
  const ALL_FIELDS = SECTIONS.flatMap(s => s.fields);

  /* Ein Feld zählt für den Fortschritt, wenn es Pflicht ist oder zum Ankreuzen. */
  const countsForProgress = f => Boolean(f.required) || f.type === 'radio' || f.type === 'check';
  const hasValue = v => Array.isArray(v) ? v.length > 0 : Boolean((v || '').trim());
  function progressOf(answers) {
    let done = 0,
      total = 0,
      blocksDone = 0;
    SECTIONS.forEach(s => {
      const countable = s.fields.filter(countsForProgress);
      const filled = countable.filter(f => hasValue(answers[f.name]));
      done += filled.length;
      total += countable.length;
      if (countable.length && filled.length === countable.length) blocksDone += 1;
    });
    return {
      done,
      total,
      blocksDone,
      blocks: SECTIONS.length,
      percent: total ? Math.round(done / total * 100) : 0
    };
  }
  function blockComplete(section, answers) {
    const countable = section.fields.filter(countsForProgress);
    return countable.length > 0 && countable.every(f => hasValue(answers[f.name]));
  }

  /* ---- Formatierung ---- */
  const fmtCHF = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  const fmtHours = n => {
    const r = Math.round(n * 10) / 10;
    return Number.isInteger(r) ? String(r) : String(r);
  };

  /* ---- Fallback-Formel (bei Fehler/Timeout des Endpoints) ----
     Bürostunden-Band-Mitte × 15–25 % als Std./Woche, × 46 Wochen × CHF 100 als CHF/Jahr. */
  const BAND_MITTE = {
    'Weniger als 5': 2.5,
    '5–10': 7.5,
    '10–20': 15,
    'Mehr als 20': 25
  };
  function fallbackAssessment(answers) {
    const mitte = BAND_MITTE[answers['Bürostunden pro Woche']] || 7.5;
    const hMin = Math.round(mitte * 0.15 * 10) / 10;
    const hMax = Math.round(mitte * 0.25 * 10) / 10;
    const rund100 = v => Math.round(v / 100) * 100;
    return {
      stunden_pro_woche_min: hMin,
      stunden_pro_woche_max: hMax,
      chf_pro_jahr_min: rund100(hMin * 46 * 100),
      chf_pro_jahr_max: rund100(hMax * 46 * 100),
      einschaetzung: 'Ihre Angaben zeigen typische Muster kleiner Betriebe: Viel Zeit fliesst in wiederkehrende Büroarbeit, die sich gut automatisieren lässt. Was das für Ihren Betrieb konkret bedeutet, klären wir gerne im kostenlosen Erstgespräch.',
      top_hebel: (answers['Wiederkehrende Aufgaben'] || []).slice(0, 3),
      vorbehalt: null
    };
  }
  return {
    WORKER_URL,
    FORMSPREE_URL,
    PROD_HOSTS,
    SECTIONS,
    ALL_FIELDS,
    fmtCHF,
    fmtHours,
    fallbackAssessment,
    progressOf,
    blockComplete
  };
}();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/erstanalyse-data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/erstanalyse-form.jsx
try { (() => {
const {
  Button: EaButton,
  Kicker: EaKicker,
  CheckPill: EaCheckPill,
  SiteFooter: EaSiteFooter
} = window.vaiaconDesignSystem_5f353f;
const {
  WORKER_URL,
  FORMSPREE_URL,
  PROD_HOSTS,
  SECTIONS,
  ALL_FIELDS,
  fmtCHF,
  fmtHours,
  fallbackAssessment,
  progressOf,
  blockComplete
} = window.ErstanalyseData;
const DRAFT_KEY = 'vaiacon-erstanalyse-draft';
const REQUIRED = ALL_FIELDS.filter(f => f.required).map(f => f.name);

/* ---- Submit-Helfer ---- */
function toAntworten(answers) {
  const out = {};
  ALL_FIELDS.forEach(f => {
    if (f.name === 'E-Mail' || f.name === 'Telefon') return; // Kontaktdaten nur in die Mail, nicht zur KI
    const v = answers[f.name];
    const s = Array.isArray(v) ? v.join(', ') : (v || '').trim();
    if (s) out[f.name] = s;
  });
  return out;
}
async function fetchAssessment(answers) {
  if (!WORKER_URL) return fallbackAssessment(answers);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 35000);
  try {
    const r = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        antworten: toAntworten(answers)
      }),
      signal: ctrl.signal
    });
    if (!r.ok) throw new Error('http ' + r.status);
    const j = await r.json();
    const nums = ['stunden_pro_woche_min', 'stunden_pro_woche_max', 'chf_pro_jahr_min', 'chf_pro_jahr_max'];
    if (!nums.every(k => Number.isFinite(j[k])) || typeof j.einschaetzung !== 'string') throw new Error('bad payload');
    return {
      stunden_pro_woche_min: j.stunden_pro_woche_min,
      stunden_pro_woche_max: j.stunden_pro_woche_max,
      chf_pro_jahr_min: j.chf_pro_jahr_min,
      chf_pro_jahr_max: j.chf_pro_jahr_max,
      einschaetzung: j.einschaetzung,
      top_hebel: Array.isArray(j.top_hebel) ? j.top_hebel.slice(0, 3) : [],
      vorbehalt: typeof j.vorbehalt === 'string' && j.vorbehalt ? j.vorbehalt : null
    };
  } finally {
    clearTimeout(timer);
  }
}
function assessmentSummary(a) {
  return 'ca. ' + fmtHours(a.stunden_pro_woche_min) + '–' + fmtHours(a.stunden_pro_woche_max) + ' Std./Woche ≈ CHF ' + fmtCHF(a.chf_pro_jahr_min) + '–' + fmtCHF(a.chf_pro_jahr_max) + ' pro Jahr | ' + a.einschaetzung + ' | Hebel: ' + (a.top_hebel.length ? a.top_hebel.join(', ') : '–') + ' | Vorbehalt: ' + (a.vorbehalt || '–');
}
async function sendFormspree(answers, assessment, gotcha) {
  if (!FORMSPREE_URL || !PROD_HOSTS.includes(location.hostname)) {
    console.info('Erstanalyse: Preview-Umgebung erkannt — Mail-Versand übersprungen.');
    return;
  }
  const fd = new FormData();
  ALL_FIELDS.forEach(f => {
    const v = answers[f.name];
    fd.append(f.name, Array.isArray(v) ? v.join(', ') : (v || '').trim());
  });
  fd.append('_gotcha', gotcha || '');
  fd.append('_subject', 'vaiacon Erstanalyse: ' + (answers['Firma und Name'] || '').trim());
  const replyMail = (answers['E-Mail'] || '').trim();
  if (replyMail) fd.append('_replyto', replyMail);
  fd.append('Ersteinschätzung Sparpotenzial (auto)', assessmentSummary(assessment));
  await fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json'
    },
    body: fd
  });
}
function vornameOf(firmaUndName) {
  const i = (firmaUndName || '').indexOf(',');
  if (i < 0) return '';
  return firmaUndName.slice(i + 1).trim().split(/\s+/)[0] || '';
}

/* ---- UI-Bausteine ---- */
function EaChip({
  selected,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    "aria-pressed": selected,
    className: 'ea-chip' + (selected ? ' is-selected' : '')
  }, selected ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "ea-chip-check"
  }, "\u2713") : null, children);
}
function EaField({
  field,
  value,
  error,
  onChange
}) {
  const {
    name,
    type,
    options,
    hint,
    placeholder,
    required
  } = field;
  return /*#__PURE__*/React.createElement("div", {
    className: 'ea-field' + (error ? ' has-error' : ''),
    "data-field": name
  }, /*#__PURE__*/React.createElement("label", {
    className: "ea-label",
    htmlFor: type === 'radio' || type === 'check' ? undefined : 'ea-' + name
  }, name, required ? /*#__PURE__*/React.createElement("span", {
    className: "ea-required"
  }, " \xB7 Pflicht") : null), hint ? /*#__PURE__*/React.createElement("p", {
    className: "ea-hint"
  }, hint) : null, type === 'text' ? /*#__PURE__*/React.createElement("input", {
    id: 'ea-' + name,
    className: "ea-input",
    type: field.inputType || 'text',
    inputMode: field.inputType === 'tel' ? 'tel' : field.inputType === 'email' ? 'email' : undefined,
    value: value || '',
    placeholder: placeholder || '',
    onChange: e => onChange(e.target.value)
  }) : null, type === 'textarea' ? /*#__PURE__*/React.createElement("textarea", {
    id: 'ea-' + name,
    className: "ea-input ea-textarea",
    rows: 3,
    value: value || '',
    placeholder: placeholder || '',
    onChange: e => onChange(e.target.value)
  }) : null, type === 'radio' ? /*#__PURE__*/React.createElement("div", {
    className: "ea-chips",
    role: "radiogroup",
    "aria-label": name
  }, options.map(o => /*#__PURE__*/React.createElement(EaChip, {
    key: o,
    selected: value === o,
    onClick: () => onChange(value === o ? '' : o)
  }, o))) : null, type === 'check' ? /*#__PURE__*/React.createElement("div", {
    className: "ea-chips",
    role: "group",
    "aria-label": name
  }, options.map(o => {
    const list = value || [];
    const sel = list.includes(o);
    return /*#__PURE__*/React.createElement(EaChip, {
      key: o,
      selected: sel,
      onClick: () => onChange(sel ? list.filter(x => x !== o) : list.concat([o]))
    }, o);
  })) : null, error ? /*#__PURE__*/React.createElement("p", {
    className: "ea-msg"
  }, "Bitte f\xFCllen Sie dieses Feld aus.") : null);
}
function EaProgress({
  answers
}) {
  const p = progressOf(answers);
  return /*#__PURE__*/React.createElement("div", {
    className: "ea-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ea-progress-inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ea-progress-label"
  }, p.blocksDone, " von ", p.blocks, " Bl\xF6cken"), /*#__PURE__*/React.createElement("div", {
    className: "ea-progress-track",
    role: "progressbar",
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": p.percent,
    "aria-label": "Fortschritt Erstanalyse"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ea-progress-fill",
    style: {
      width: p.percent + '%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "ea-progress-label"
  }, p.percent, " %")));
}

/* ---- Erfolgs-Screen ---- */
function EaSuccess({
  answers,
  result
}) {
  const vorname = vornameOf(answers['Firma und Name']);
  return /*#__PURE__*/React.createElement("div", {
    className: "ea-success",
    "data-screen-label": "Erstanalyse \u2014 Erfolg"
  }, /*#__PURE__*/React.createElement(EaKicker, null, "Kostenlos & unverbindlich"), /*#__PURE__*/React.createElement("h1", {
    className: "ea-h1"
  }, vorname ? 'Herzlichen Dank, ' + vorname + '!' : 'Herzlichen Dank!'), /*#__PURE__*/React.createElement("p", {
    className: "ea-lead"
  }, "Ihre Angaben sind bei uns angekommen. Wir schauen sie pers\xF6nlich an und melden uns bei Ihnen \u2014 ohne Fachchinesisch und ohne Verkaufsdruck."), /*#__PURE__*/React.createElement("div", {
    className: "ea-result"
  }, /*#__PURE__*/React.createElement(EaKicker, null, "Ihre Ersteinsch\xE4tzung"), /*#__PURE__*/React.createElement("p", {
    className: "ea-result-big"
  }, "ca. ", fmtHours(result.stunden_pro_woche_min), "\u2013", fmtHours(result.stunden_pro_woche_max), " Std. pro Woche"), /*#__PURE__*/React.createElement("p", {
    className: "ea-result-chf"
  }, "\u2248 CHF ", fmtCHF(result.chf_pro_jahr_min), "\u2013", fmtCHF(result.chf_pro_jahr_max), " pro Jahr"), /*#__PURE__*/React.createElement("p", {
    className: "ea-result-text"
  }, result.einschaetzung), result.top_hebel.length ? /*#__PURE__*/React.createElement("div", {
    className: "ea-result-hebel"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ea-result-hebel-label"
  }, "Ihre gr\xF6ssten Hebel:"), /*#__PURE__*/React.createElement("ul", {
    className: "ea-result-hebel-list"
  }, result.top_hebel.map(h => /*#__PURE__*/React.createElement(EaCheckPill, {
    key: h
  }, h)))) : null, result.vorbehalt ? /*#__PURE__*/React.createElement("p", {
    className: "ea-result-vorbehalt"
  }, result.vorbehalt) : null, /*#__PURE__*/React.createElement("p", {
    className: "ea-result-vorbehalt"
  }, "Bewusst konservativ gerechnet \u2014 wir versprechen lieber zu wenig als zu viel. Welche L\xF6sungswege dahinter stecken und was sie kosten, zeigen wir Ihnen im kostenlosen Erstgespr\xE4ch.")), /*#__PURE__*/React.createElement("div", {
    className: "ea-success-ctas"
  }, /*#__PURE__*/React.createElement(EaButton, {
    variant: "cta",
    arrow: "\u2197",
    href: "https://calendly.com/vaiacon",
    target: "_blank"
  }, "termin direkt buchen"), /*#__PURE__*/React.createElement("a", {
    className: "ea-back",
    href: "index.html"
  }, "zur\xFCck zur startseite \u2192")));
}

/* ---- Seite ---- */
function ErstanalyseApp() {
  const [answers, setAnswers] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem(DRAFT_KEY) || '{}') || {};
    } catch {
      return {};
    }
  });
  const [errors, setErrors] = React.useState([]);
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [gotcha, setGotcha] = React.useState('');
  React.useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(answers));
    } catch {}
  }, [answers]);
  const setValue = (name, v) => {
    setAnswers(a => ({
      ...a,
      [name]: v
    }));
    setErrors(e => e.filter(x => x !== name));
  };
  const submit = async () => {
    if (busy) return;
    const missing = REQUIRED.filter(n => !(answers[n] || '').trim());
    const mail = (answers['E-Mail'] || '').trim();
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail) && !missing.includes('E-Mail')) missing.push('E-Mail');
    if (missing.length) {
      setErrors(missing);
      const el = document.querySelector('[data-field="' + missing[0] + '"]');
      if (el) window.scrollTo({
        top: el.getBoundingClientRect().top + window.pageYOffset - 110,
        behavior: 'smooth'
      });
      return;
    }
    setBusy(true);
    let assessment;
    try {
      assessment = await fetchAssessment(answers);
    } catch {
      assessment = fallbackAssessment(answers);
    }
    try {
      await sendFormspree(answers, assessment, gotcha);
    } catch {}
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {}
    setResult(assessment);
    setBusy(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-screen-label": "Erstanalyse"
  }, /*#__PURE__*/React.createElement("header", {
    className: "ea-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ea-header-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    "aria-label": "vaiacon Startseite",
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-lockup-terra-symbol-cream.png",
    alt: "vaiacon",
    style: {
      height: 44,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("a", {
    className: "ea-back",
    href: "index.html"
  }, "zur\xFCck zur startseite \u2192"))), result ? null : /*#__PURE__*/React.createElement(EaProgress, {
    answers: answers
  }), /*#__PURE__*/React.createElement("main", {
    className: "ea-wrap"
  }, result ? /*#__PURE__*/React.createElement(EaSuccess, {
    answers: answers,
    result: result
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ea-intro"
  }, /*#__PURE__*/React.createElement(EaKicker, null, "Kostenlos & unverbindlich"), /*#__PURE__*/React.createElement("h1", {
    className: "ea-h1"
  }, "Kostenlose Erstanalyse."), /*#__PURE__*/React.createElement("p", {
    className: "ea-lead"
  }, "Acht kurze Bl\xF6cke, rund f\xFCnf Minuten \u2014 fast alles zum Ankreuzen. Direkt nach dem Absenden sehen Sie, wie viel Zeit und Geld in Ihrer Administration steckt.")), /*#__PURE__*/React.createElement("div", {
    className: "ea-note"
  }, /*#__PURE__*/React.createElement("p", {
    className: "ea-note-title"
  }, "Was Sie sofort erhalten"), /*#__PURE__*/React.createElement("p", {
    className: "ea-note-text"
  }, "Stunden pro Woche, Franken pro Jahr und Ihre gr\xF6ssten Hebel \u2014 konservativ gerechnet. Die konkreten L\xF6sungswege besprechen wir im kostenlosen Erstgespr\xE4ch, gemeinsam und ohne Verkaufsdruck.")), SECTIONS.map(s => /*#__PURE__*/React.createElement("section", {
    key: s.number,
    className: "ea-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ea-card-head"
  }, /*#__PURE__*/React.createElement(EaKicker, {
    number: s.number
  }, s.kicker), blockComplete(s, answers) ? /*#__PURE__*/React.createElement("span", {
    className: "ea-card-done"
  }, "\u2713 vollst\xE4ndig") : null), s.fields.map(f => /*#__PURE__*/React.createElement(EaField, {
    key: f.name,
    field: f,
    value: answers[f.name],
    error: errors.includes(f.name),
    onChange: v => setValue(f.name, v)
  })))), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "_gotcha",
    value: gotcha,
    onChange: e => setGotcha(e.target.value),
    tabIndex: -1,
    autoComplete: "off",
    "aria-hidden": "true",
    className: "ea-gotcha"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ea-submit"
  }, /*#__PURE__*/React.createElement(EaButton, {
    variant: "cta",
    size: "lg",
    arrow: busy ? undefined : '→',
    disabled: busy,
    onClick: submit
  }, busy ? 'Ihre Antworten werden ausgewertet …' : 'auswertung anfordern'), busy ? /*#__PURE__*/React.createElement("p", {
    className: "ea-busy-note"
  }, "Einen Moment bitte \u2014 das kann bis zu einer halben Minute dauern.") : /*#__PURE__*/React.createElement("p", {
    className: "ea-trust"
  }, "Klar \xB7 Pers\xF6nlich \xB7 Ohne Verkaufsdruck")))), /*#__PURE__*/React.createElement(EaSiteFooter, {
    logoSrc: "../../assets/logo-lockup-white.png"
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(ErstanalyseApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/erstanalyse-form.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/mobile-nav.jsx
try { (() => {
const {
  Button: MobileNavButton
} = window.vaiaconDesignSystem_5f353f;

/* Mobile-Header (≤920px): Logo + CTA + Burger; Overlay-Menü in Markenstimme. */
function MobileHeader({
  logoSrc,
  links = [],
  active,
  ctaLabel = 'Erstgespräch',
  ctaHref = '#kontakt'
}) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const iconBtn = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: 'var(--ink-900)'
  };
  return /*#__PURE__*/React.createElement("header", {
    className: "header-mobile",
    style: {
      background: 'var(--cream-100)',
      borderBottom: '1px solid var(--border-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '12px 16px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    "aria-label": "vaiacon Startseite",
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "vaiacon",
    style: {
      height: 40,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, ctaLabel ? /*#__PURE__*/React.createElement(MobileNavButton, {
    size: "sm",
    arrow: true,
    href: ctaHref,
    style: {
      padding: '11px 18px',
      fontSize: 14
    }
  }, ctaLabel) : null, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Men\xFC \xF6ffnen",
    "aria-expanded": open,
    onClick: () => setOpen(true),
    style: iconBtn
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      borderRadius: 2,
      background: 'var(--ink-900)',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 2,
      borderRadius: 2,
      background: 'var(--ink-900)',
      display: 'block'
    }
  }))))), open && /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Navigation",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      background: 'var(--cream-100)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'mobileMenuIn 0.32s cubic-bezier(0.22, 1, 0.36, 1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '12px 16px',
      borderBottom: '1px solid var(--border-soft)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    "aria-label": "vaiacon Startseite",
    onClick: () => setOpen(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "vaiacon",
    style: {
      height: 40,
      width: 'auto',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Men\xFC schliessen",
    onClick: () => setOpen(false),
    style: {
      ...iconBtn,
      fontFamily: 'var(--font-sans)',
      fontSize: 30,
      lineHeight: 1
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Hauptnavigation",
    style: {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px 22px 0',
      overflowY: 'auto'
    }
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: l.href,
    href: l.href,
    onClick: () => setOpen(false),
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 14,
      padding: '19px 2px',
      borderBottom: '1px solid var(--border-strong)',
      textDecoration: 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: active === l.href.replace('#', '') ? 'var(--terra-500)' : 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--terra-500)',
      letterSpacing: '0.08em',
      flex: 'none'
    }
  }, l.number || String(i + 1).padStart(2, '0')), l.label, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      marginLeft: 'auto',
      fontSize: 18,
      color: 'var(--brown-300)'
    }
  }, "\u2192")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      padding: '22px 22px calc(26px + env(safe-area-inset-bottom))',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      flex: 'none'
    }
  }, ctaLabel ? /*#__PURE__*/React.createElement(MobileNavButton, {
    size: "lg",
    arrow: true,
    href: ctaHref,
    onClick: () => setOpen(false),
    style: {
      width: '100%',
      padding: '17px 32px'
    }
  }, ctaLabel) : null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.2em',
      color: 'var(--text-muted)'
    }
  }, "VERTRAUEN \xB7 ORIENTIERUNG \xB7 ENTWICKLUNG"))));
}
Object.assign(window, {
  MobileHeader
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/mobile-nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/mockup-entwurf.compiled.js
try { (() => {
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
const {
  Kicker,
  FaqItem,
  SiteFooter,
  Button: DsButton,
  ServiceRow,
  LabelBadge,
  Twinkle
} = window.vaiaconDesignSystem_5f353f;
const ASSET_BASE = window.VAIACON_ASSET_BASE || '../../assets/';
function asset(path) {
  return ASSET_BASE + path;
}
const NAV_LINKS = [{
  label: 'vaiaconBot',
  href: '#service',
  product: 'Bot'
}, {
  label: 'vaiaconAcademy',
  href: '#academy',
  product: 'Academy'
}, {
  label: 'vaiaconLearning',
  href: '#learning',
  product: 'Learning'
}, {
  label: 'vaiaconService',
  href: '#service-pakete',
  product: 'Service'
}, {
  label: 'Über uns',
  href: 'ueber-uns.html'
}, {
  label: 'FAQ',
  href: '#faq'
}, {
  label: 'Kontakt',
  href: '#kontakt',
  contact: true
}];
const FAQS = [['Was macht vaiacon?', 'vaiacon befähigt Schweizer KMU, KI verständlich, persönlich und wirksam im Unternehmen einzusetzen. Wir verbinden Lernen, Automatisierung und langfristige Begleitung.'], ['Ist vaiacon eine klassische KI-Agentur?', 'Nein. KI ist für uns ein Werkzeug. Im Zentrum stehen verständliche Einführung, konkrete Abläufe und eine Umsetzung, die im Alltag funktioniert.'], ['Was ist vaiaconAcademy?', 'Die vaiaconAcademy ist unsere Selbstlern-Plattform: elf Lernpläne mit 55 kurzen Lektionen zu KI im KMU-Alltag. Die ersten Lektionen sind gratis, danach ab CHF 39 pro Monat.'], ['Was ist vaiaconLearning?', 'vaiaconLearning bündelt Online-Lernprogramme, Bibliotheken und persönliche Coachings, damit Unternehmer und Teams KI sicher anwenden können.'], ['Was ist vaiaconBot?', 'vaiaconBot ist der Ansatz für wiederkehrende Büro- und Administrationsprozesse: Wir analysieren Abläufe, priorisieren Hebel und setzen passende Automatisierungen um.'], ['Was ist vaiaconService?', 'vaiaconService begleitet bestehende Automatisierungen im Betrieb. Dazu gehören Pflege, Updates, Kontrolle und Weiterentwicklung nach Bedarf.'], ['Brauche ich technisches Vorwissen?', 'Nein. Die Inhalte und die Umsetzung werden so erklärt, dass Unternehmer und Mitarbeitende ohne technisches Vorwissen mitkommen.'], ['Was kostet eine Automation?', 'Eine Automation beginnt bei CHF 600. Den Fixpreis nennen wir nach der Erstanalyse — Sie wissen vor der Umsetzung, woran Sie sind.'], ['Was passiert mit unseren Daten?', 'Wir arbeiten nach dem revDSG. Vor der Umsetzung klären wir mit Ihnen, welche Daten ein Werkzeug überhaupt sehen darf, und halten Kundendaten dort heraus, wo sie nicht hingehören.'], ['Wie beginnt eine Zusammenarbeit?', 'Am Anfang steht ein unverbindliches Gespräch. Danach klären wir, ob Learning, Bot, Service oder eine Kombination davon sinnvoll ist.']];
const SERVICE_PLANS = [{
  number: '01',
  title: 'vaiaconService BASIC',
  text: 'Regelm\xE4ssige Funktionspr\xFCfung, kleine Anpassungen und E-Mail-Support.',
  price: 'ab CHF 90 / Monat'
}, {
  number: '02',
  title: 'vaiaconService STANDARD',
  text: 'Laufende Pflege und Updates, Optimierung bestehender Abl\xE4ufe, Support f\xFCr Ihr Team und ein periodischer Review-Termin.',
  price: 'ab CHF 190 / Monat'
}, {
  number: '03',
  title: 'vaiaconService PREMIUM',
  text: 'Proaktive Weiterentwicklung, priorisierte Betreuung, Erweiterungen und Integrationen.',
  price: 'ab CHF 390 / Monat'
}];
function Arrow() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192");
}
function ProductName({
  name,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, "vaiacon", /*#__PURE__*/React.createElement("span", {
    className: "mock-accent"
  }, name));
}
function NavLabel({
  link
}) {
  if (!link.product) return link.label;
  return /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-product"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-brand"
  }, "vaiacon"), /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-accent"
  }, link.product));
}
function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [solid, setSolid] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: `mock-header${solid || menuOpen ? ' is-solid' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-header__logo",
    href: "#top",
    "aria-label": "vaiacon Start"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset(solid || menuOpen ? 'logo-lockup-terra.png' : 'logo-lockup-white.png'),
    alt: "vaiacon"
  })), /*#__PURE__*/React.createElement("button", {
    className: "mock-menu-toggle",
    type: "button",
    "aria-label": menuOpen ? 'Men\xFC schliessen' : 'Men\xFC \xF6ffnen',
    "aria-controls": "mock-mobile-menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(open => !open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("nav", {
    className: "mock-header__nav",
    "aria-label": "Hauptnavigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  }))))), /*#__PURE__*/React.createElement("nav", {
    id: "mock-mobile-menu",
    className: `mock-mobile-nav${menuOpen ? ' is-open' : ''}`,
    "aria-label": "Mobile Navigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label,
    onClick: closeMenu
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  })))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "mock-hero",
    "aria-label": "Start"
  }, /*#__PURE__*/React.createElement(Twinkle, {
    top: "17%",
    left: "11%",
    size: 13,
    duration: 6.5
  }), /*#__PURE__*/React.createElement(Twinkle, {
    top: "28%",
    right: "14%",
    size: 10,
    delay: 1.2,
    duration: 5.5
  }), /*#__PURE__*/React.createElement(Twinkle, {
    bottom: "24%",
    left: "21%",
    size: 9,
    delay: 2.4,
    duration: 6
  }), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__text"
  }, /*#__PURE__*/React.createElement("h1", null, "Mit KI einfacher arbeiten, Zeit sparen und Kosten senken ", /*#__PURE__*/React.createElement("span", null, "– f\xFCr Schweizer KMU."))), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__doors"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#service"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "Automationen f\xFCr Ihren Betrieb ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#academy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "E-Learnings zu KI f\xFCr KMU ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#learning"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Learning"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "Trainings, Coachings, Workshops ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))))), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__robot",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset('vaiacon-buerobot-hero.png'),
    alt: ""
  })), /*#__PURE__*/React.createElement("a", {
    className: "mock-stamp",
    href: "erstanalyse.html"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-stamp__over"
  }, "Kostenlos & unverbindlich"), /*#__PURE__*/React.createElement("span", {
    className: "mock-stamp__label"
  }, "Jetzt Erstanalyse starten \u2192")));
}
function Learning() {
  return /*#__PURE__*/React.createElement("section", {
    id: "learning",
    className: "mock-section mock-section--alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-copy"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "02"
  }, "Lernen und bef\xE4higen"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-accent"
  }, "Lernen"), " mit vaiacon"), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead"
  }, "Wie sattelfest sind Sie in der Anwendung von KI? Wir bef\xE4higen Sie und Ihre Mitarbeitenden im Zeitalter von KI — auf zwei Wegen, die sich erg\xE4nzen: selbst\xE4ndig online oder pers\xF6nlich begleitet."), /*#__PURE__*/React.createElement("div", {
    className: "mock-learning-tracks"
  }, /*#__PURE__*/React.createElement("article", {
    className: "mock-learning-track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-learning-track__label"
  }, "Online \xB7 im eigenen Tempo"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  })), /*#__PURE__*/React.createElement("p", null, "Unsere Selbstlern-Plattform: E-Learnings zu KI f\xFCr KMU — elf Lernpl\xE4ne mit 55 kurzen Lektionen, im eigenen Tempo. Die ersten Lektionen sind gratis, danach ab CHF 39 pro Monat."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "sm",
    arrow: true,
    href: "#academy",
    style: {
      marginTop: 'auto',
      minHeight: 44
    }
  }, "Zur vaiaconAcademy")), /*#__PURE__*/React.createElement("article", {
    className: "mock-learning-track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-learning-track__label"
  }, "Pers\xF6nlich \xB7 bei Ihnen vor Ort"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Learning"
  })), /*#__PURE__*/React.createElement("p", null, "Trainings, Coachings und Workshops in Ihrer Firma — f\xFCr Unternehmer, F\xFChrungskr\xE4fte und Teams, zugeschnitten auf Ihre Abl\xE4ufe und Fragen."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "sm",
    arrow: true,
    href: "#kontakt",
    style: {
      marginTop: 'auto',
      minHeight: 44
    }
  }, "vaiaconLearning anfragen")))), /*#__PURE__*/React.createElement("div", {
    className: "mock-learning-visual"
  }, /*#__PURE__*/React.createElement("img", {
    className: "mock-learning-image",
    src: asset('vaiacon-buerobot-academy.png'),
    alt: "vaiaconBot am Schreibtisch beim Erstellen eines Lernmoduls"
  }), /*#__PURE__*/React.createElement("img", {
    className: "mock-learning-image mock-learning-image--bot",
    src: asset('vaiacon-buerobot-learning.png'),
    alt: "vaiaconBot als Lehrer vor einem Whiteboard"
  }))));
}
function Service() {
  return /*#__PURE__*/React.createElement("section", {
    id: "service",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "01"
  }, "Automatisieren"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Wir automatisieren Ihren Betrieb."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 720
    }
  }, "Wir \xFCbernehmen, was regelm\xE4ssig Zeit kostet — Schritt f\xFCr Schritt, bei Ihnen im Betrieb.")), /*#__PURE__*/React.createElement("article", {
    className: "mock-bot-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__intro"
  }, /*#__PURE__*/React.createElement(LabelBadge, {
    tone: "onTerra"
  }, "Hauptprodukt"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot"
  })), /*#__PURE__*/React.createElement("p", {
    className: "mock-bot-tile__sub"
  }, "Wir richten Ihre Automationen bei Ihnen im Betrieb ein und bef\xE4higen Ihr Team — pers\xF6nlich und auf Augenh\xF6he.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__offer"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-bot-tile__price-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__amount"
  }, "ab CHF 600"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__unit"
  }, "pro Automation")), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__note"
  }, "Fixpreis nach der Erstanalyse \xB7 meist in wenigen Wochen zur\xFCckverdient"), /*#__PURE__*/React.createElement(DsButton, {
    variant: "light",
    size: "sm",
    arrow: true,
    href: "#kontakt"
  }, "Gespr\xE4ch buchen"))), /*#__PURE__*/React.createElement("ol", {
    className: "mock-bot-tile__steps"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "01"), /*#__PURE__*/React.createElement("strong", null, "Empfehlung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Prozesse mit dem gr\xF6ssten Entlastungspotenzial, mit Offerte")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "02"), /*#__PURE__*/React.createElement("strong", null, "Priorisierung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "gemeinsam festlegen, was zuerst optimiert wird")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "03"), /*#__PURE__*/React.createElement("strong", null, "Planung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Umsetzung Schritt f\xFCr Schritt vorbereitet")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "04"), /*#__PURE__*/React.createElement("strong", null, "Umsetzung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Automationen eingerichtet, Team bef\xE4higt")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "05"), /*#__PURE__*/React.createElement("strong", null, "Kontrolle"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "regelm\xE4ssige Pr\xFCfung mit vaiaconService")))), /*#__PURE__*/React.createElement("div", {
    className: "mock-addons",
    id: "service-pakete"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-addons__note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-addons__label"
  }, "Zusatzprodukte"), /*#__PURE__*/React.createElement("span", null, "Pflege und Weiterentwicklung im Abo — optional zum ", /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot",
    className: "mock-inline-product"
  }), ".")), /*#__PURE__*/React.createElement("div", {
    className: "mock-service-rows"
  }, SERVICE_PLANS.map((plan, i) => /*#__PURE__*/React.createElement(ServiceRow, {
    key: plan.title,
    number: plan.number,
    title: plan.title,
    last: i === SERVICE_PLANS.length - 1
  }, plan.text, " ", /*#__PURE__*/React.createElement("span", {
    className: "mock-service-price"
  }, plan.price)))))));
}
const ACADEMY_TEASER = [['01', 'Grundlagen: KI einordnen', 'Einstieg \xB7 1 Std 05', 'Der Einstieg ohne Fachchinesisch \u2014 was die Werkzeuge k\xF6nnen und wie Sie sie ansprechen.'], ['02', 'Datenschutz & Sicherheit', 'Grundlage \xB7 1 Std 15', 'Was rein darf und was nie: revDSG, Anonymisieren, Cloud-Standort.'], ['03', 'Korrespondenz & E-Mail', 'Praxis \xB7 1 Std 22', 'Der Posteingang zuerst \u2014 Antworten, die nach Ihnen klingen.'], ['04', 'Offerten & Auftr\xE4ge', 'Praxis \xB7 1 Std 28', 'Aus f\xFCnf Stichworten eine Offerte in Ihrer Struktur.'], ['05', 'Buchhaltung & Belege', 'Praxis \xB7 1 Std 23', 'Belegstapel, Spesen, Mahnwesen \u2014 bis zur \xDCbergabe ans Treuhandb\xFCro.'], ['09', 'Abl\xE4ufe automatisieren', 'Fortgeschritten \xB7 2 Std 03', 'Vom einzelnen Handgriff zum verl\xE4sslichen Ablauf.']];
function Academy() {
  return /*#__PURE__*/React.createElement("section", {
    id: "academy",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "03"
  }, "E-Learnings"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Mehr als ein Chatbot: Lernen Sie, Ihre B\xFCroarbeit mit KI zu automatisieren."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 760
    }
  }, "Die ", /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  }), " ist unsere Selbstlern-Plattform: 55 kurze Lektionen in elf Lernpl\xE4nen. Jeder Plan ist f\xFCr sich abgeschlossen und dauert rund eine Stunde \u2014 Sie starten dort, wo es bei Ihnen brennt.")), /*#__PURE__*/React.createElement("ul", {
    className: "mock-academy-grid"
  }, ACADEMY_TEASER.map(([no, title, meta, text]) => /*#__PURE__*/React.createElement("li", {
    className: "mock-academy-plan",
    key: no
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-academy-plan__no"
  }, no), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("span", {
    className: "mock-academy-plan__meta"
  }, meta), /*#__PURE__*/React.createElement("p", null, text)))), /*#__PURE__*/React.createElement("div", {
    className: "mock-academy-foot"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-academy-foot__note"
  }, "Die ersten Lektionen sind gratis, danach ab CHF 39 pro Monat \u2014 jederzeit k\xFCndbar."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "md",
    arrow: true,
    href: "academy/index.html"
  }, "Zur vaiaconAcademy"))));
}
function Faq() {
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-faq-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "04"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Die wichtigsten Fragen und Antworten zu vaiacon."), /*#__PURE__*/React.createElement("img", {
    className: "mock-faq-robot",
    src: asset('vaiacon-buerobot-faq-transparent.png?v=20260903-alpha'),
    alt: "vaiaconBot beantwortet Fragen"
  })), /*#__PURE__*/React.createElement("div", null, FAQS.map(([question, answer], index) => /*#__PURE__*/React.createElement(FaqItem, {
    key: question,
    question: /*#__PURE__*/React.createElement("span", {
      className: "mock-faq-question-text"
    }, question),
    last: index === FAQS.length - 1
  }, answer)))));
}
function Kontakt() {
  return /*#__PURE__*/React.createElement("section", {
    id: "kontakt",
    className: "mock-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onTerra",
    number: "05"
  }, "Kontakt"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title",
    style: {
      color: '#fff',
      maxWidth: 840
    }
  }, "Welche vaiacon-L\xF6sung passt zu Ihrem Unternehmen?"), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 720
    }
  }, "Im unverbindlichen Gespr\xE4ch kl\xE4ren wir, ob f\xFCr Sie Learning, Bot, Service oder eine Kombination der richtige n\xE4chste Schritt ist."), /*#__PURE__*/React.createElement("div", {
    className: "mock-actions"
  }, /*#__PURE__*/React.createElement(DsButton, {
    variant: "light",
    arrow: true,
    href: "https://calendly.com/vaiacon",
    target: "_blank"
  }, "Termin direkt buchen"), /*#__PURE__*/React.createElement(DsButton, {
    variant: "glass",
    arrow: true,
    href: "mailto:hallo@vaiacon.ch"
  }, "hallo@vaiacon.ch")), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'rgba(255,236,222,0.9)'
    }
  }, "Simpel \xB7 Klar \xB7 Pers\xF6nlich")));
}
function App() {
  const [chatOpen, setChatOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "mock-page"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Service, null), /*#__PURE__*/React.createElement(Learning, null), /*#__PURE__*/React.createElement(Academy, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Kontakt, null)), /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: asset('logo-lockup-white.png')
  }), /*#__PURE__*/React.createElement(ChatWidget, {
    open: chatOpen,
    onOpen: () => setChatOpen(true),
    onClose: () => setChatOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/mockup-entwurf.compiled.js", error: String((e && e.message) || e) }); }

// ui_kits/website/mockup-entwurf.jsx
try { (() => {
const {
  Kicker,
  FaqItem,
  SiteFooter,
  Button: DsButton,
  ServiceRow,
  LabelBadge,
  Twinkle
} = window.vaiaconDesignSystem_5f353f;
const ASSET_BASE = window.VAIACON_ASSET_BASE || '../../assets/';
function asset(path) {
  return ASSET_BASE + path;
}
const NAV_LINKS = [{
  label: 'vaiaconBot',
  href: '#service',
  product: 'Bot'
}, {
  label: 'vaiaconAcademy',
  href: '#academy',
  product: 'Academy'
}, {
  label: 'vaiaconLearning',
  href: '#learning',
  product: 'Learning'
}, {
  label: 'vaiaconService',
  href: '#service-pakete',
  product: 'Service'
}, {
  label: 'Über uns',
  href: 'ueber-uns.html'
}, {
  label: 'FAQ',
  href: '#faq'
}, {
  label: 'Kontakt',
  href: '#kontakt',
  contact: true
}];
const FAQS = [['Was macht vaiacon?', 'vaiacon befähigt Schweizer KMU, KI verständlich, persönlich und wirksam im Unternehmen einzusetzen. Wir verbinden Lernen, Automatisierung und langfristige Begleitung.'], ['Ist vaiacon eine klassische KI-Agentur?', 'Nein. KI ist für uns ein Werkzeug. Im Zentrum stehen verständliche Einführung, konkrete Abläufe und eine Umsetzung, die im Alltag funktioniert.'], ['Was ist vaiaconAcademy?', 'Die vaiaconAcademy ist unsere Selbstlern-Plattform: elf Lernpläne mit 55 kurzen Lektionen zu KI im KMU-Alltag. Die ersten Lektionen sind gratis, danach ab CHF 39 pro Monat.'], ['Was ist vaiaconLearning?', 'vaiaconLearning bündelt Online-Lernprogramme, Bibliotheken und persönliche Coachings, damit Unternehmer und Teams KI sicher anwenden können.'], ['Was ist vaiaconBot?', 'vaiaconBot ist der Ansatz für wiederkehrende Büro- und Administrationsprozesse: Wir analysieren Abläufe, priorisieren Hebel und setzen passende Automatisierungen um.'], ['Was ist vaiaconService?', 'vaiaconService begleitet bestehende Automatisierungen im Betrieb. Dazu gehören Pflege, Updates, Kontrolle und Weiterentwicklung nach Bedarf.'], ['Brauche ich technisches Vorwissen?', 'Nein. Die Inhalte und die Umsetzung werden so erklärt, dass Unternehmer und Mitarbeitende ohne technisches Vorwissen mitkommen.'], ['Was kostet eine Automation?', 'Eine Automation beginnt bei CHF 600. Den Fixpreis nennen wir nach der Erstanalyse — Sie wissen vor der Umsetzung, woran Sie sind.'], ['Was passiert mit unseren Daten?', 'Wir arbeiten nach dem revDSG. Vor der Umsetzung klären wir mit Ihnen, welche Daten ein Werkzeug überhaupt sehen darf, und halten Kundendaten dort heraus, wo sie nicht hingehören.'], ['Wie beginnt eine Zusammenarbeit?', 'Am Anfang steht ein unverbindliches Gespräch. Danach klären wir, ob Learning, Bot, Service oder eine Kombination davon sinnvoll ist.']];
const SERVICE_PLANS = [{
  number: '01',
  title: 'vaiaconService BASIC',
  text: 'Regelmässige Funktionsprüfung, kleine Anpassungen und E-Mail-Support.',
  price: 'ab CHF 90 / Monat'
}, {
  number: '02',
  title: 'vaiaconService STANDARD',
  text: 'Laufende Pflege und Updates, Optimierung bestehender Abläufe, Support für Ihr Team und ein periodischer Review-Termin.',
  price: 'ab CHF 190 / Monat'
}, {
  number: '03',
  title: 'vaiaconService PREMIUM',
  text: 'Proaktive Weiterentwicklung, priorisierte Betreuung, Erweiterungen und Integrationen.',
  price: 'ab CHF 390 / Monat'
}];
function Arrow() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2192");
}
function ProductName({
  name,
  className = ''
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: className
  }, "vaiacon", /*#__PURE__*/React.createElement("span", {
    className: "mock-accent"
  }, name));
}
function NavLabel({
  link
}) {
  if (!link.product) return link.label;
  return /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-product"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-brand"
  }, "vaiacon"), /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-accent"
  }, link.product));
}
function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [solid, setSolid] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);
  React.useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    className: `mock-header${solid || menuOpen ? ' is-solid' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-header__logo",
    href: "#top",
    "aria-label": "vaiacon Start"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset(solid || menuOpen ? 'logo-lockup-terra.png' : 'logo-lockup-white.png'),
    alt: "vaiacon"
  })), /*#__PURE__*/React.createElement("button", {
    className: "mock-menu-toggle",
    type: "button",
    "aria-label": menuOpen ? 'Menü schliessen' : 'Menü öffnen',
    "aria-controls": "mock-mobile-menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(open => !open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("nav", {
    className: "mock-header__nav",
    "aria-label": "Hauptnavigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  }))))), /*#__PURE__*/React.createElement("nav", {
    id: "mock-mobile-menu",
    className: `mock-mobile-nav${menuOpen ? ' is-open' : ''}`,
    "aria-label": "Mobile Navigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label,
    onClick: closeMenu
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  })))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "mock-hero",
    "aria-label": "Start"
  }, /*#__PURE__*/React.createElement(Twinkle, {
    top: "17%",
    left: "11%",
    size: 13,
    duration: 6.5
  }), /*#__PURE__*/React.createElement(Twinkle, {
    top: "28%",
    right: "14%",
    size: 10,
    delay: 1.2,
    duration: 5.5
  }), /*#__PURE__*/React.createElement(Twinkle, {
    bottom: "24%",
    left: "21%",
    size: 9,
    delay: 2.4,
    duration: 6
  }), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__text"
  }, /*#__PURE__*/React.createElement("h1", null, "Mit KI einfacher arbeiten, Zeit sparen und Kosten senken ", /*#__PURE__*/React.createElement("span", null, "\u2013 f\xFCr Schweizer KMU."))), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__doors"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#service"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "Automationen f\xFCr Ihren Betrieb ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#academy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "E-Learnings zu KI f\xFCr KMU ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))), /*#__PURE__*/React.createElement("a", {
    className: "mock-hero__door",
    href: "#learning"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-title"
  }, /*#__PURE__*/React.createElement(ProductName, {
    name: "Learning"
  })), /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-text"
  }, "Trainings, Coachings, Workshops ", /*#__PURE__*/React.createElement("span", {
    className: "mock-hero__door-arrow",
    "aria-hidden": "true"
  }, "\u2192"))))), /*#__PURE__*/React.createElement("div", {
    className: "mock-hero__robot",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset('vaiacon-buerobot-hero.png'),
    alt: ""
  })), /*#__PURE__*/React.createElement("a", {
    className: "mock-stamp",
    href: "erstanalyse.html"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-stamp__over"
  }, "Kostenlos & unverbindlich"), /*#__PURE__*/React.createElement("span", {
    className: "mock-stamp__label"
  }, "Jetzt Erstanalyse starten \u2192")));
}
function Learning() {
  return /*#__PURE__*/React.createElement("section", {
    id: "learning",
    className: "mock-section mock-section--alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-copy"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "02"
  }, "Lernen und bef\xE4higen"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-accent"
  }, "Lernen"), " mit vaiacon"), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead"
  }, "Wie sattelfest sind Sie in der Anwendung von KI? Wir bef\xE4higen Sie und Ihre Mitarbeitenden im Zeitalter von KI \u2014 auf zwei Wegen, die sich erg\xE4nzen: selbst\xE4ndig online oder pers\xF6nlich begleitet."), /*#__PURE__*/React.createElement("div", {
    className: "mock-learning-tracks"
  }, /*#__PURE__*/React.createElement("article", {
    className: "mock-learning-track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-learning-track__label"
  }, "Online \xB7 im eigenen Tempo"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  })), /*#__PURE__*/React.createElement("p", null, "Unsere Selbstlern-Plattform: E-Learnings zu KI f\xFCr KMU \u2014 elf Lernpl\xE4ne mit 55 kurzen Lektionen, im eigenen Tempo. Die ersten Lektionen sind gratis, danach ab CHF 39 pro Monat."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "sm",
    arrow: true,
    href: "#academy",
    style: {
      marginTop: 'auto',
      minHeight: 44
    }
  }, "Zu den E-Learnings")), /*#__PURE__*/React.createElement("article", {
    className: "mock-learning-track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-learning-track__label"
  }, "Pers\xF6nlich \xB7 bei Ihnen vor Ort"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Learning"
  })), /*#__PURE__*/React.createElement("p", null, "Trainings, Coachings und Workshops in Ihrer Firma \u2014 f\xFCr Unternehmer, F\xFChrungskr\xE4fte und Teams, zugeschnitten auf Ihre Abl\xE4ufe und Fragen."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "sm",
    arrow: true,
    href: "#kontakt",
    style: {
      marginTop: 'auto',
      minHeight: 44
    }
  }, "vaiaconLearning anfragen")))), /*#__PURE__*/React.createElement("div", {
    className: "mock-learning-visual"
  }, /*#__PURE__*/React.createElement("img", {
    className: "mock-learning-image",
    src: asset('vaiacon-buerobot-academy.png'),
    alt: "vaiaconBot am Schreibtisch beim Erstellen eines Lernmoduls"
  }), /*#__PURE__*/React.createElement("img", {
    className: "mock-learning-image mock-learning-image--bot",
    src: asset('vaiacon-buerobot-learning.png'),
    alt: "vaiaconBot als Lehrer vor einem Whiteboard"
  }))));
}
function Service() {
  return /*#__PURE__*/React.createElement("section", {
    id: "service",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "01"
  }, "Automatisieren"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Wir automatisieren Ihren Betrieb."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 720
    }
  }, "Wir \xFCbernehmen, was regelm\xE4ssig Zeit kostet \u2014 Schritt f\xFCr Schritt, bei Ihnen im Betrieb.")), /*#__PURE__*/React.createElement("article", {
    className: "mock-bot-tile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__intro"
  }, /*#__PURE__*/React.createElement(LabelBadge, {
    tone: "onTerra"
  }, "Hauptprodukt"), /*#__PURE__*/React.createElement("h3", null, /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot"
  })), /*#__PURE__*/React.createElement("p", {
    className: "mock-bot-tile__sub"
  }, "Wir richten Ihre Automationen bei Ihnen im Betrieb ein und bef\xE4higen Ihr Team \u2014 pers\xF6nlich und auf Augenh\xF6he.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-bot-tile__offer"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-bot-tile__price-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__amount"
  }, "ab CHF 600"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__unit"
  }, "pro Automation")), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__note"
  }, "Fixpreis nach der Erstanalyse \xB7 meist in wenigen Wochen zur\xFCckverdient"), /*#__PURE__*/React.createElement(DsButton, {
    variant: "light",
    size: "sm",
    arrow: true,
    href: "#kontakt"
  }, "Gespr\xE4ch buchen"))), /*#__PURE__*/React.createElement("ol", {
    className: "mock-bot-tile__steps"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "01"), /*#__PURE__*/React.createElement("strong", null, "Empfehlung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Prozesse mit dem gr\xF6ssten Entlastungspotenzial, mit Offerte")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "02"), /*#__PURE__*/React.createElement("strong", null, "Priorisierung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "gemeinsam festlegen, was zuerst optimiert wird")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "03"), /*#__PURE__*/React.createElement("strong", null, "Planung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Umsetzung Schritt f\xFCr Schritt vorbereitet")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "04"), /*#__PURE__*/React.createElement("strong", null, "Umsetzung"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "Automationen eingerichtet, Team bef\xE4higt")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-no"
  }, "05"), /*#__PURE__*/React.createElement("strong", null, "Kontrolle"), /*#__PURE__*/React.createElement("span", {
    className: "mock-bot-tile__step-text"
  }, "regelm\xE4ssige Pr\xFCfung mit vaiaconService")))), /*#__PURE__*/React.createElement("div", {
    className: "mock-addons",
    id: "service-pakete"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-addons__note"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-addons__label"
  }, "Zusatzprodukte"), /*#__PURE__*/React.createElement("span", null, "Pflege und Weiterentwicklung im Abo \u2014 optional zum ", /*#__PURE__*/React.createElement(ProductName, {
    name: "Bot",
    className: "mock-inline-product"
  }), ".")), /*#__PURE__*/React.createElement("div", {
    className: "mock-service-rows"
  }, SERVICE_PLANS.map((plan, i) => /*#__PURE__*/React.createElement(ServiceRow, {
    key: plan.title,
    number: plan.number,
    title: plan.title,
    last: i === SERVICE_PLANS.length - 1
  }, plan.text, " ", /*#__PURE__*/React.createElement("span", {
    className: "mock-service-price"
  }, plan.price)))))));
}
const ACADEMY_TEASER = [['01', 'Grundlagen: KI einordnen', 'Einstieg · 1 Std 05', 'Der Einstieg ohne Fachchinesisch — was die Werkzeuge können und wie Sie sie ansprechen.'], ['02', 'Datenschutz & Sicherheit', 'Grundlage · 1 Std 15', 'Was rein darf und was nie: revDSG, Anonymisieren, Cloud-Standort.'], ['03', 'Korrespondenz & E-Mail', 'Praxis · 1 Std 22', 'Der Posteingang zuerst — Antworten, die nach Ihnen klingen.'], ['04', 'Offerten & Aufträge', 'Praxis · 1 Std 28', 'Aus fünf Stichworten eine Offerte in Ihrer Struktur.'], ['05', 'Buchhaltung & Belege', 'Praxis · 1 Std 23', 'Belegstapel, Spesen, Mahnwesen — bis zur Übergabe ans Treuhandbüro.'], ['09', 'Abläufe automatisieren', 'Fortgeschritten · 2 Std 03', 'Vom einzelnen Handgriff zum verlässlichen Ablauf.']];
function Academy() {
  return /*#__PURE__*/React.createElement("section", {
    id: "academy",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "03"
  }, "E-Learnings"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Mehr als ein Chatbot: Lernen Sie, Ihre B\xFCroarbeit mit KI zu automatisieren."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 760
    }
  }, "Die ", /*#__PURE__*/React.createElement(ProductName, {
    name: "Academy"
  }), " ist unsere Selbstlern-Plattform: 55 kurze Lektionen in elf Lernpl\xE4nen. Jeder Plan ist f\xFCr sich abgeschlossen und dauert rund eine Stunde \u2014 Sie starten dort, wo es bei Ihnen brennt.")), /*#__PURE__*/React.createElement("ul", {
    className: "mock-academy-grid"
  }, ACADEMY_TEASER.map(([no, title, meta, text]) => /*#__PURE__*/React.createElement("li", {
    className: "mock-academy-plan",
    key: no
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-academy-plan__no"
  }, no), /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("span", {
    className: "mock-academy-plan__meta"
  }, meta), /*#__PURE__*/React.createElement("p", null, text)))), /*#__PURE__*/React.createElement("div", {
    className: "mock-academy-foot"
  }, /*#__PURE__*/React.createElement("p", {
    className: "mock-academy-foot__note"
  }, "Die ersten Lektionen sind gratis, danach ab CHF 39 pro Monat \u2014 jederzeit k\xFCndbar."), /*#__PURE__*/React.createElement(DsButton, {
    variant: "cta",
    size: "md",
    arrow: true,
    href: "academy/index.html"
  }, "Zur vaiaconAcademy"))));
}
function Faq() {
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    className: "mock-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-faq-layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "04"
  }, "FAQ"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title"
  }, "Die wichtigsten Fragen und Antworten zu vaiacon."), /*#__PURE__*/React.createElement("img", {
    className: "mock-faq-robot",
    src: asset('vaiacon-buerobot-faq-transparent.png?v=20260903-alpha'),
    alt: "vaiaconBot beantwortet Fragen"
  })), /*#__PURE__*/React.createElement("div", null, FAQS.map(([question, answer], index) => /*#__PURE__*/React.createElement(FaqItem, {
    key: question,
    question: /*#__PURE__*/React.createElement("span", {
      className: "mock-faq-question-text"
    }, question),
    last: index === FAQS.length - 1
  }, answer)))));
}
function Kontakt() {
  return /*#__PURE__*/React.createElement("section", {
    id: "kontakt",
    className: "mock-contact"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onTerra",
    number: "05"
  }, "Kontakt"), /*#__PURE__*/React.createElement("h2", {
    className: "mock-title",
    style: {
      color: '#fff',
      maxWidth: 840
    }
  }, "Welche vaiacon-L\xF6sung passt zu Ihrem Unternehmen?"), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 720
    }
  }, "Im unverbindlichen Gespr\xE4ch kl\xE4ren wir, ob f\xFCr Sie Learning, Bot, Service oder eine Kombination der richtige n\xE4chste Schritt ist."), /*#__PURE__*/React.createElement("div", {
    className: "mock-actions"
  }, /*#__PURE__*/React.createElement(DsButton, {
    variant: "light",
    arrow: true,
    href: "https://calendly.com/vaiacon",
    target: "_blank"
  }, "Termin direkt buchen"), /*#__PURE__*/React.createElement(DsButton, {
    variant: "glass",
    arrow: true,
    href: "mailto:hallo@vaiacon.ch"
  }, "hallo@vaiacon.ch")), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'rgba(255,236,222,0.9)'
    }
  }, "Simpel \xB7 Klar \xB7 Pers\xF6nlich")));
}
function App() {
  const [chatOpen, setChatOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "mock-page"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Service, null), /*#__PURE__*/React.createElement(Learning, null), /*#__PURE__*/React.createElement(Academy, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(Kontakt, null)), /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: asset('logo-lockup-white.png')
  }), /*#__PURE__*/React.createElement(ChatWidget, {
    open: chatOpen,
    onOpen: () => setChatOpen(true),
    onClose: () => setChatOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/mockup-entwurf.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections-hero.jsx
try { (() => {
const {
  Kicker,
  Twinkle
} = window.vaiaconDesignSystem_5f353f;

/* Statischer Hero: Terra-Bühne, Büro-Bot-Standbild (Poster), Headline, Markenzeilen. */
const HERO_DEFAULTS = {
  headlineTop: 17,
  robotBottom: -3,
  robotHeight: 56,
  robotX: 0,
  vignette: true,
  stampStyle: 'glas',
  stampText: 'Kostenlose Online-Erstanalyse',
  stampPosX: 69.6,
  stampPosY: 46,
  stampWidth: 550,
  stampRotate: 0,
  stampFontSize: 16,
  stampRadius: 999,
  stampTail: false,
  stampTailX: 26,
  stampTailSize: 26
};
function Hero({
  tweaks
}) {
  const t = {
    ...HERO_DEFAULTS,
    ...tweaks
  };
  const stampButtonStyle = {
    display: 'inline-flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 9,
    whiteSpace: 'nowrap',
    background: 'rgba(255,244,236,0.12)',
    border: '1px solid rgba(255,255,255,0.32)',
    borderRadius: 999,
    padding: '10px 22px',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    color: 'var(--cream-50)',
    textDecoration: 'none',
    fontSize: t.stampFontSize,
    fontWeight: 700,
    lineHeight: 1.2,
    boxSizing: 'border-box'
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    "data-screen-label": "Hero",
    style: {
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--grad-terra-hero)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(62% 46% at 55% 102%, rgba(244,158,96,0.5) 0%, rgba(244,158,96,0) 70%), radial-gradient(90% 60% at 50% -8%, rgba(70,26,6,0.35) 0%, rgba(70,26,6,0) 60%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-robot",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: `${t.robotBottom}vh`,
      height: `${t.robotHeight}vh`,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      left: `${t.robotX}vw`,
      height: '100%',
      aspectRatio: '16 / 9',
      flex: 'none',
      animation: 'breathe 6.5s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/vaiacon-buerobot-hero.png",
    alt: "B\xFCro-Bot zeigt nach oben",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,0) 6%, #000 26%, #000 74%, rgba(0,0,0,0) 94%), linear-gradient(180deg, rgba(0,0,0,0) 0.5%, #000 7%, #000 93%, rgba(0,0,0,0) 99.5%)',
      maskImage: 'linear-gradient(90deg, rgba(0,0,0,0) 6%, #000 26%, #000 74%, rgba(0,0,0,0) 94%), linear-gradient(180deg, rgba(0,0,0,0) 0.5%, #000 7%, #000 93%, rgba(0,0,0,0) 99.5%)',
      WebkitMaskComposite: 'destination-in',
      maskComposite: 'intersect'
    }
  }))), /*#__PURE__*/React.createElement(DsgvoSiegel, {
    className: "hero-siegel",
    style: {
      position: 'absolute',
      zIndex: 36,
      right: '7vw',
      bottom: '12vh'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-headline",
    style: {
      position: 'absolute',
      zIndex: 30,
      left: 0,
      right: 0,
      top: `${t.headlineTop}vh`,
      pointerEvents: 'none',
      color: 'var(--cream-50)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '0 auto',
      maxWidth: 'min(1040px, calc(100vw - 40px))',
      fontSize: 'clamp(32px, 4vw, 68px)',
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.06
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block'
    }
  }, "KI f\xFCr KMU verst\xE4ndlich erkl\xE4rt,"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      color: 'var(--peach-200)'
    }
  }, "zuverl\xE4ssig umgesetzt")), /*#__PURE__*/React.createElement("p", {
    className: "hero-subline",
    style: {
      margin: 'clamp(18px, 2.6vh, 30px) auto 0',
      maxWidth: 780,
      padding: '0 20px',
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 0,
      lineHeight: 1.55,
      color: 'rgba(255,253,248,0.9)'
    }
  }, "Wir analysieren Abl\xE4ufe, setzen digitale L\xF6sungen um und begleiten Teams, bis sie im Alltag funktionieren."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'clamp(10px, 1.4vw, 18px)',
      flexWrap: 'wrap',
      marginTop: 'clamp(18px, 2.7vh, 32px)',
      pointerEvents: 'auto',
      padding: '0 20px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: "hero-pill hero-cta-pill",
    href: "#kontakt",
    style: stampButtonStyle
  }, /*#__PURE__*/React.createElement("span", null, "Erstgespr\xE4ch"), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--peach-200)',
      fontWeight: 700
    }
  }, "\u2192")), /*#__PURE__*/React.createElement("a", {
    className: "hero-pill hero-analysis-pill",
    href: "erstanalyse.html",
    "aria-label": "Kostenlose Online-Erstanalyse \xF6ffnen",
    style: stampButtonStyle
  }, /*#__PURE__*/React.createElement("span", null, t.stampText || 'Kostenlose Online-Erstanalyse'), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      color: 'var(--peach-200)',
      fontWeight: 700
    }
  }, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-mobile-values",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", null, "Orientierung"), /*#__PURE__*/React.createElement("span", null, "Entwicklung"), /*#__PURE__*/React.createElement("span", null, "Begleitung"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-brand",
    style: {
      position: 'absolute',
      zIndex: 40,
      left: '3.5vw',
      bottom: '4.6vh',
      fontSize: 11,
      letterSpacing: '0.16em',
      color: 'var(--cream-50)'
    }
  }, "ORIENTIERUNG\xA0\xA0\xB7\xA0\xA0ENTWICKLUNG\xA0\xA0\xB7\xA0\xA0BEGLEITUNG"), /*#__PURE__*/React.createElement("a", {
    href: "#kontakt",
    className: "hero-brand-link",
    style: {
      position: 'absolute',
      zIndex: 40,
      right: '3.5vw',
      bottom: '4.6vh',
      fontSize: 11,
      letterSpacing: '0.18em',
      color: 'var(--cream-50)',
      textDecoration: 'none'
    }
  }, "VAIACON.CH"), t.vignette ? /*#__PURE__*/React.createElement("div", {
    className: "hero-vignette",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(125% 120% at 50% 42%, rgba(0,0,0,0) 56%, rgba(62,22,6,0.30) 100%)',
      left: -528,
      top: 274
    }
  }) : null);
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections-hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections-lower.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Kicker,
  PackageCard,
  TeamCard,
  QuoteCard,
  KompassTile,
  FaqItem,
  Button,
  Twinkle
} = window.vaiaconDesignSystem_5f353f;
const wrap2 = {
  maxWidth: 'var(--content-max)',
  margin: '0 auto',
  padding: '72px 32px',
  boxSizing: 'border-box'
};

/* 06 · Begleitung (Pakete) */
function Begleitung() {
  return /*#__PURE__*/React.createElement("section", {
    id: "begleitung",
    "data-screen-label": "Begleitung",
    style: {
      background: 'var(--bg-alt)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap2,
      display: 'flex',
      flexDirection: 'column',
      gap: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
      gap: '28px 64px',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "06"
  }, "Langfristig gut begleitet"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.06,
      color: 'var(--text-strong)'
    }
  }, "Zwei Pakete. Eine Begleitung.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16.5,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      maxWidth: '50ch'
    }
  }, "Transformation ist kein einmaliger Workshop. Unsere Pakete verbinden Arbeitsweise und Mensch \u2013 einzeln buchbar oder kombiniert als ganzheitliche Begleitung.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
      gap: 24,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(PackageCard, {
    badge: "Paket 01 \xB7 Arbeitsweise",
    title: "KI im Alltag",
    subtitle: "Automatisierung und KI, die Ihr Team im Tagesgesch\xE4ft sp\xFCrbar entlasten.",
    features: ['Prozesse analysieren & automatisieren', 'Büro-Bot als digitaler Mitarbeiter', 'KI-Schulungen ohne technisches Vorwissen', 'IT-Koordination aus einer Hand'],
    price: "ab CHF 600.00"
  }), /*#__PURE__*/React.createElement(PackageCard, {
    badge: "Paket 02 \xB7 Mindchange",
    title: "Change & Coaching",
    subtitle: "Begleitung f\xFCr Change, Transformation und F\xFChrung \u2013 mit dem Menschen im Mittelpunkt.",
    features: ['Standortbestimmung Mitarbeitende', 'Coaching für Unternehmer & Führungskräfte', 'Teams befähigen & mitnehmen', 'Resultate messen & weiterentwickeln']
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, "Beide Pakete sind kombinierbar. Die konkreten Leistungen stimmen wir passend zu Ihrem Bedarf ab.")));
}

/* 07 · Über uns + Kompass */
function UeberUns() {
  return /*#__PURE__*/React.createElement("section", {
    id: "ueber-uns",
    "data-screen-label": "\xDCber uns",
    style: {
      background: 'var(--bg-page)',
      borderTop: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap2,
      display: 'flex',
      flexDirection: 'column',
      gap: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "07"
  }, "Wer dahinter steht"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.06,
      color: 'var(--text-strong)'
    }
  }, "Unternehmensentwicklung mit dem Menschen im Mittelpunkt."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16.5,
      lineHeight: 1.7,
      color: 'var(--text-body)'
    }
  }, "vaiacon ist ein Schweizer Unternehmen aus Z\xFCrich. Wir verbinden unternehmerische Praxis, menschliche Werte und moderne Technologie zu einem ganzheitlichen Ansatz \u2013 und begleiten KMU pers\xF6nlich, vor Ort und auf Augenh\xF6he.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
      gap: 22,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement(TeamCard, {
    src: "../../assets/andre-ulrich-team.png?v=20260720-andre-bg-clean",
    alt: "Portr\xE4t von Andr\xE9 Ulrich",
    name: "Andr\xE9 Ulrich",
    role: "Mitgr\xFCnder \xB7 KMU-Experte"
  }), /*#__PURE__*/React.createElement(TeamCard, {
    src: "../../assets/philip-krieger-team.png",
    alt: "Portr\xE4t von Philip Krieger",
    name: "Philip Krieger",
    role: "Mitgr\xFCnder \xB7 Coach"
  }), /*#__PURE__*/React.createElement(QuoteCard, {
    logoSrc: "../../assets/logo-mark-terra-symbol-white.png",
    quote: "Klarheit schafft bessere Entscheidungen.",
    style: {
      gridColumn: '1 / -1',
      minHeight: 200
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      borderTop: '1px solid var(--border-strong)',
      paddingTop: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      gap: '10px 28px'
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "Unser Kompass"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.6,
      color: 'var(--text-body)'
    }
  }, "Vier Fragen leiten jede Entscheidung und jede Begegnung.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(480px, 100%), 1fr))',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(KompassTile, {
    number: "01"
  }, "Ist es richtig f\xFCr die Menschen, die davon betroffen sind?"), /*#__PURE__*/React.createElement(KompassTile, {
    number: "02"
  }, "Ist es richtig f\xFCr das Unternehmen und seine Zukunft?"), /*#__PURE__*/React.createElement(KompassTile, {
    number: "03"
  }, "Ist es richtig f\xFCr unsere Werte und unseren Anspruch?"), /*#__PURE__*/React.createElement(KompassTile, {
    number: "04"
  }, "Ist es richtig f\xFCr unsere Partner und die langfristige Wirkung?")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--terra-500)'
    }
  }, "4 \xD7 Ja \u2014 dann sind wir auf Kurs."))));
}

/* 08 · FAQ */
function Faq() {
  return /*#__PURE__*/React.createElement("section", {
    id: "faq",
    "data-screen-label": "FAQ",
    style: {
      background: 'var(--bg-alt)',
      borderTop: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap2,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
      gap: 56,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "08"
  }, "H\xE4ufige Fragen"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.06,
      color: 'var(--text-strong)'
    }
  }, "Kurz gefragt. Klar beantwortet."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      maxWidth: '42ch'
    }
  }, "Die wichtigsten Antworten zu vaiacon und dem einfachen Einstieg.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(FaqItem, {
    question: "Was macht vaiacon?"
  }, "vaiacon ist Transformationspartner f\xFCr Schweizer KMU im KI-Zeitalter. Wir verbinden Strategie, Umsetzung und langfristige Begleitung, damit aus KI bessere Entscheidungen, produktivere Teams und messbare Gesch\xE4ftsergebnisse entstehen."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Ist vaiacon eine klassische KI-Agentur?"
  }, "Nein. KI ist f\xFCr uns nicht das Produkt, sondern das Werkzeug. Im Zentrum stehen Unternehmensentwicklung, F\xFChrung und messbare Resultate \u2013 nicht m\xF6glichst viele Tools oder ein einmaliger Workshop."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Was ist der vaiacon Kompass?"
  }, "Unser Kompass sind vier Fragen, die jede Entscheidung und jede Begegnung leiten: Ist es richtig f\xFCr die Menschen, f\xFCr das Unternehmen, f\xFCr unsere Werte und f\xFCr unsere Partner? 4 \xD7 Ja \u2013 dann sind wir auf Kurs."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Was ist B\xFCro-Bot?"
  }, "B\xFCro-Bot ist der digitale Mitarbeiter f\xFCr Schweizer Kleinunternehmen. Er vereinfacht wiederkehrende B\xFCroarbeit mit Automatisierung und KI, unterst\xFCtzt administrative Prozesse, Webseiten, CRM und Chatbots und entlastet dadurch Ihr Team."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Wie unterst\xFCtzt vaiacon Schweizer KMU mit KI?"
  }, "In drei Schritten: Wir schaffen Orientierung und priorisieren die wirksamsten Hebel, wir automatisieren konkrete Abl\xE4ufe im Tagesgesch\xE4ft und wir bef\xE4higen Ihr Team im sicheren Umgang mit KI. KI ist dabei Werkzeug, nicht Selbstzweck \u2013 im Zentrum steht Ihre Entlastung im Alltag."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Kann vaiacon die IT-Koordination f\xFCr KMU ohne interne IT \xFCbernehmen?"
  }, "Ja. Wir \xFCbernehmen die IT-Koordination aus einer Hand: Als zentraler Ansprechpartner stimmen wir Dienstleister und L\xF6sungen aufeinander ab und erkl\xE4ren alles verst\xE4ndlich \u2013 ohne Fachchinesisch."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "F\xFCr welche KMU eignet sich die digitale Beratung?"
  }, "F\xFCr Schweizer Kleinunternehmen und KMU, die klarer entscheiden und ihr Team entlasten m\xF6chten \u2013 unabh\xE4ngig von Branche und Vorwissen. Wir begleiten pers\xF6nlich, vor Ort in der ganzen Schweiz und auf Augenh\xF6he."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Brauche ich f\xFCr die KI-Schulungen technisches Vorwissen?"
  }, "Nein. Unsere Beratung, Schulungen und Coachings sind praxisnah aufgebaut und werden an den Wissensstand der Teilnehmenden angepasst. Im Mittelpunkt steht die sichere und sinnvolle Anwendung im Alltag."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Wie sch\xFCtzt vaiacon meine pers\xF6nlichen Daten?"
  }, "Wir verpflichten uns zur Einhaltung des geltenden Schweizer Datenschutzgesetzes. Personendaten bearbeiten wir rechtm\xE4ssig, transparent, zweckgebunden und sparsam \u2013 mit angemessenen technischen und organisatorischen Schutzmassnahmen."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Wie bietet vaiacon seine Dienstleistungen an?"
  }, "\xDCber zwei kombinierbare Pakete: \xABKI im Alltag\xBB f\xFCr Arbeitsweise und Automatisierung, \xABChange & Coaching\xBB f\xFCr Transformation und F\xFChrung mit dem Menschen im Mittelpunkt. Die konkreten Leistungen stimmen wir passend zu Ihrem Bedarf ab."), /*#__PURE__*/React.createElement(FaqItem, {
    question: "Wie beginnt eine Zusammenarbeit mit vaiacon?",
    last: true
  }, "Am Anfang steht ein kostenloses und unverbindliches Erstgespr\xE4ch. Wir kl\xE4ren Ihr Anliegen, zeigen sinnvolle M\xF6glichkeiten auf und empfehlen einen passenden n\xE4chsten Schritt \u2013 ohne Fachchinesisch und ohne Verkaufsdruck."))));
}

/* 09 · Kontakt (Terracotta-Finale) */
const SOCIAL_LINKS = [{
  label: 'Facebook',
  href: 'https://www.facebook.com/vaiacon',
  icon: 'facebook'
}, {
  label: 'LinkedIn',
  href: 'https://www.linkedin.com/company/vaiacon',
  icon: 'linkedin'
}, {
  label: 'Instagram',
  href: 'https://www.instagram.com/vaiacon',
  icon: 'instagram'
}];
function SocialIconLink({
  label,
  href,
  icon
}) {
  const [hover, setHover] = React.useState(false);
  const baseStyle = {
    width: 46,
    height: 46,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    background: hover ? 'rgba(255, 244, 236, 0.24)' : 'rgba(255, 244, 236, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxSizing: 'border-box',
    textDecoration: 'none',
    transform: hover ? 'translateY(-2px)' : 'translateY(0)',
    transition: 'background 0.3s ease, transform 0.3s var(--ease-spring), border-color 0.3s ease'
  };
  return /*#__PURE__*/React.createElement("a", {
    className: "contact-social-link",
    href: href,
    target: "_blank",
    rel: "noopener",
    "aria-label": label,
    title: label,
    style: baseStyle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, icon === 'facebook' ? /*#__PURE__*/React.createElement("svg", {
    width: "21",
    height: "21",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14.9 8.1h2.4V4.3c-.4-.1-1.8-.2-3.4-.2-3.4 0-5.7 2.1-5.7 6v3.3H4.5v4.3h3.7V24h4.5v-6.3h3.7l.6-4.3h-4.3v-2.9c0-1.3.4-2.4 2.2-2.4Z"
  })) : null, icon === 'linkedin' ? /*#__PURE__*/React.createElement("svg", {
    width: "21",
    height: "21",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5.4 8.5H2.3V22h3.1V8.5ZM3.9 6.7c1 0 1.8-.7 1.8-1.7S4.9 3.3 3.9 3.3 2.1 4 2.1 5s.8 1.7 1.8 1.7ZM22 22h-3.1v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22h-3.1V8.5h3v1.8h.1c.4-.8 1.5-2.2 4.5-2.2 3.2 0 3.8 2.1 3.8 4.9V22Z"
  })) : null, icon === 'instagram' ? /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3.5",
    y: "3.5",
    width: "17",
    height: "17",
    rx: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "7",
    r: "1.1",
    fill: "currentColor",
    stroke: "none"
  })) : null);
}
function Kontakt() {
  return /*#__PURE__*/React.createElement("section", {
    id: "kontakt",
    "data-screen-label": "Kontakt",
    style: {
      position: 'relative',
      background: 'var(--grad-terra-finale)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'var(--glow-peach)'
    }
  }), /*#__PURE__*/React.createElement(Twinkle, {
    left: "12%",
    top: "22%",
    size: 12
  }), /*#__PURE__*/React.createElement(Twinkle, {
    right: "14%",
    top: "34%",
    size: 9,
    delay: 1.8,
    duration: 6
  }), /*#__PURE__*/React.createElement(Twinkle, {
    left: "22%",
    bottom: "20%",
    size: 10,
    delay: 3.2,
    duration: 5.5
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 860,
      margin: '0 auto',
      padding: '88px 32px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 26,
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onTerra",
    number: "09"
  }, "Kostenlos & unverbindlich"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'clamp(36px, 4.6vw, 62px)',
      fontWeight: 600,
      letterSpacing: '-0.035em',
      lineHeight: 1.08,
      color: 'var(--cream-50)'
    }
  }, "Welche Richtung ist f\xFCr Ihr Unternehmen die richtige?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      lineHeight: 1.7,
      color: 'var(--text-on-terra-soft)',
      maxWidth: '56ch'
    }
  }, "Im Erstgespr\xE4ch schaffen wir Orientierung: Wir kl\xE4ren Ziele, Herausforderungen und den n\xE4chsten sinnvollen Schritt f\xFCr eine nachhaltige Entwicklung."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "glass",
    arrow: true,
    href: "https://calendly.com/vaiacon",
    target: "_blank"
  }, "Termin direkt buchen")), /*#__PURE__*/React.createElement("small", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'rgba(255,236,222,0.9)'
    }
  }, "Klar \xB7 Pers\xF6nlich \xB7 Ohne Verkaufsdruck"), /*#__PURE__*/React.createElement("div", {
    className: "contact-social-row",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      marginTop: 10
    }
  }, SOCIAL_LINKS.map(item => /*#__PURE__*/React.createElement(SocialIconLink, _extends({
    key: item.label
  }, item))))));
}
Object.assign(window, {
  Begleitung,
  UeberUns,
  Faq,
  Kontakt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections-lower.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections-main.jsx
try { (() => {
const {
  Kicker,
  CheckPill,
  ServiceRow,
  CheckItem,
  StepCard,
  Twinkle
} = window.vaiaconDesignSystem_5f353f;
const wrap = {
  maxWidth: 'var(--content-max)',
  margin: '0 auto',
  padding: '72px 32px',
  boxSizing: 'border-box'
};

/* 01 · Statement */
function Orientierung() {
  return /*#__PURE__*/React.createElement("section", {
    id: "orientierung",
    "data-screen-label": "Orientierung",
    style: {
      background: 'var(--bg-page)',
      borderBottom: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "01"
  }, "Wof\xFCr wir stehen"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'clamp(38px, 5vw, 66px)',
      fontWeight: 600,
      letterSpacing: '-0.035em',
      lineHeight: 1.05,
      color: 'var(--text-strong)',
      maxWidth: '18ch'
    }
  }, "Wir geben Orientierung."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17.5,
      lineHeight: 1.7,
      color: 'var(--text-body)',
      maxWidth: '62ch'
    }
  }, "Strategie, Prozesse und KI f\xFCr Schweizer KMU \u2013 verst\xE4ndlich erkl\xE4rt und im Alltag umgesetzt. Damit Sie klarer entscheiden, Ihr Team entlastet wird und Ihr Unternehmen zukunftsf\xE4hig bleibt."), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 12,
      listStyle: 'none',
      margin: '8px 0 0',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(CheckPill, null, "Pers\xF6nlich vor Ort in der ganzen Schweiz"), /*#__PURE__*/React.createElement(CheckPill, null, "DSG-konformes Arbeiten"), /*#__PURE__*/React.createElement(CheckPill, null, "Kein technisches Vorwissen n\xF6tig"))));
}

/* 02 · Leistungen */
function Leistungen() {
  return /*#__PURE__*/React.createElement("section", {
    id: "leistungen",
    "data-screen-label": "Leistungen",
    style: {
      background: 'var(--bg-alt)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
      gap: '28px 64px',
      alignItems: 'end',
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "02"
  }, "Was wir f\xFCr Sie tun"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.06,
      color: 'var(--text-strong)'
    }
  }, "Von der Vision zum Resultat.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16.5,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      maxWidth: '46ch'
    }
  }, "Wir begleiten nicht nur einen Workshop. Wir verbinden Strategie, Umsetzung im Alltag und F\xFChrung zu einer nachhaltigen Transformation.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(ServiceRow, {
    number: "01",
    title: "KI-Transformation & Strategie"
  }, "Wir schaffen Orientierung, priorisieren die wirksamsten Hebel und entwickeln eine klare Roadmap f\xFCr Entscheidungen, Prozesse und Wachstum."), /*#__PURE__*/React.createElement(ServiceRow, {
    number: "02",
    title: "Implementierung"
  }, "Wir automatisieren konkrete Abl\xE4ufe, integrieren passende L\xF6sungen und sorgen daf\xFCr, dass KI im Tagesgesch\xE4ft messbar entlastet."), /*#__PURE__*/React.createElement(ServiceRow, {
    number: "03",
    title: "Schulung & Change Management",
    last: true
  }, "Wir bef\xE4higen Unternehmer und Teams, mit KI bessere Entscheidungen zu treffen, Verantwortung zu \xFCbernehmen und Ver\xE4nderung klar zu kommunizieren."))));
}

/* Büro-Bot-Tanzvideo: Server liefert MP4 ohne Range-Support — Datei komplett laden und als Blob füttern (spielt 1×, kein Loop). */
function BuerobotVideo() {
  const ref = React.useRef(null);
  const [failed, setFailed] = React.useState(false);
  React.useEffect(() => {
    let url = null,
      cancelled = false;
    fetch('../../assets/buerobot-dance.mp4').then(r => {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.blob();
    }).then(b => {
      if (cancelled) return;
      url = URL.createObjectURL(b);
      const v = ref.current;
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
      v.src = url;
      v.play().catch(() => {});
    }).catch(() => {
      if (!cancelled) setFailed(true);
    });
    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, []);
  if (failed) {
    return /*#__PURE__*/React.createElement("img", {
      "data-comment-anchor": "tanzender-roboter",
      src: "../../assets/vaiacon-buerobot-phone.png",
      alt: "B\xFCro-Bot am Telefon",
      style: {
        width: '100%',
        maxWidth: 600,
        aspectRatio: '16 / 9',
        objectFit: 'cover',
        display: 'block',
        borderRadius: 18
      }
    });
  }
  return /*#__PURE__*/React.createElement("video", {
    "data-comment-anchor": "tanzender-roboter",
    ref: ref,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    style: {
      width: '100%',
      maxWidth: 600,
      aspectRatio: '16 / 9',
      display: 'block',
      borderRadius: 18
    }
  });
}

/* 03 · Büro-Bot (Terra) */
function Buerobot({
  onOpenChat
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "buerobot",
    "data-screen-label": "B\xFCro-Bot",
    style: {
      position: 'relative',
      background: 'var(--grad-terra-section)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Twinkle, {
    left: "6%",
    top: "16%",
    size: 11,
    delay: 1,
    duration: 5.5
  }), /*#__PURE__*/React.createElement(Twinkle, {
    right: "7%",
    top: "60%",
    size: 9,
    delay: 3,
    duration: 6.5
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '80px 32px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onTerra",
    number: "03"
  }, "Ein konkreter Hebel"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.08,
      color: '#FFFFFF'
    }
  }, "B\xFCro-Bot: Transformation, die im Alltag ankommt."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16.5,
      lineHeight: 1.7,
      color: 'var(--text-on-terra-soft)',
      maxWidth: '54ch'
    }
  }, "B\xFCro-Bot ist unser digitaler Mitarbeiter f\xFCr Schweizer Kleinunternehmen \u2013 ein Beispiel daf\xFCr, wie wir Strategie in echte Entlastung \xFCbersetzen: repetitive B\xFCroarbeit wird automatisiert, Abl\xE4ufe werden schneller und Ihr Team gewinnt Zeit f\xFCr wertsch\xF6pfende Aufgaben."), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      listStyle: 'none',
      margin: '2px 0 0',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(CheckItem, {
    boxed: true,
    tone: "onTerra"
  }, "Administrative Last reduzieren"), /*#__PURE__*/React.createElement(CheckItem, {
    boxed: true,
    tone: "onTerra"
  }, "Prozesse konsequent automatisieren"), /*#__PURE__*/React.createElement(CheckItem, {
    boxed: true,
    tone: "onTerra"
  }, "Resultate im Alltag sichtbar machen"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(BuerobotVideo, null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14.5,
      fontWeight: 600,
      color: 'rgba(255,236,222,0.9)'
    }
  }))));
}

/* 04 · Ablauf */
function Ablauf() {
  return /*#__PURE__*/React.createElement("section", {
    id: "ablauf",
    "data-screen-label": "Ablauf",
    style: {
      background: 'var(--bg-page)',
      borderBottom: '1px solid var(--border-strong)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      marginBottom: 52
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    number: "04"
  }, "So starten wir"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.06,
      color: 'var(--text-strong)'
    }
  }, "Unser Vorgehen.")), /*#__PURE__*/React.createElement("ol", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
      gap: 22,
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(StepCard, {
    number: "01",
    badge: "Kostenlos & unverbindlich",
    title: "Erstgespr\xE4ch"
  }, "Wir h\xF6ren zu, kl\xE4ren Ziele und Herausforderungen und zeigen den n\xE4chsten sinnvollen Schritt \u2013 ohne Fachchinesisch und ohne Verkaufsdruck."), /*#__PURE__*/React.createElement(StepCard, {
    number: "02",
    title: "Analyse & Roadmap"
  }, "Wir priorisieren die wirksamsten Hebel in Ihrem Unternehmen und entwickeln eine klare Roadmap f\xFCr Entscheidungen, Prozesse und Automatisierung."), /*#__PURE__*/React.createElement(StepCard, {
    number: "03",
    title: "Umsetzung & Begleitung"
  }, "Wir setzen um und bef\xE4higen Ihr Team im sicheren Umgang mit KI. Erste Resultate zeigen sich schnell im Alltag \u2013 und wir bleiben langfristig an Ihrer Seite."))));
}

/* Vertrauen (Terra) */
function Datenschutz() {
  return /*#__PURE__*/React.createElement("section", {
    id: "datenschutz",
    "data-screen-label": "Vertrauen",
    style: {
      position: 'relative',
      background: 'var(--grad-terra-section)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Twinkle, {
    left: "6%",
    top: "16%",
    size: 11,
    delay: 1.2,
    duration: 5.8
  }), /*#__PURE__*/React.createElement(Twinkle, {
    right: "7%",
    top: "60%",
    size: 9,
    delay: 3.1,
    duration: 6.6
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '80px 32px',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(420px, 100%), 1fr))',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "onTerra",
    number: "05"
  }, "Vertrauen"), /*#__PURE__*/React.createElement("h2", {
    className: "datenschutz-heading",
    style: {
      margin: 0,
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      letterSpacing: '-0.03em',
      lineHeight: 1.08,
      color: '#FFFFFF'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "datenschutz-heading-main"
  }, "Ihre Daten ", /*#__PURE__*/React.createElement("span", {
    className: "datenschutz-heading-verb"
  }, "verdienen")), /*#__PURE__*/React.createElement("br", {
    className: "datenschutz-heading-break"
  }), /*#__PURE__*/React.createElement("span", {
    className: "datenschutz-heading-trust",
    style: {
      color: 'var(--peach-200)'
    }
  }, "Vertrauen und Schutz.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16.5,
      lineHeight: 1.7,
      color: 'var(--text-on-terra-soft)',
      maxWidth: '54ch'
    }
  }, "Wir verpflichten uns, Personendaten im Einklang mit dem geltenden Schweizer Datenschutzgesetz zu bearbeiten. Datenschutz ber\xFCcksichtigen wir von der Planung bis zur Umsetzung jeder digitalen L\xF6sung."), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      listStyle: 'none',
      margin: '2px 0 0',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(CheckItem, {
    boxed: true,
    tone: "onTerra",
    style: {
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 16.5,
      fontWeight: 600,
      color: '#FFFFFF'
    }
  }, "Transparent & zweckgebunden"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      fontWeight: 500,
      color: 'var(--text-on-terra-soft)'
    }
  }, "Wir erkl\xE4ren verst\xE4ndlich, welche Daten wof\xFCr ben\xF6tigt werden."))), /*#__PURE__*/React.createElement(CheckItem, {
    boxed: true,
    tone: "onTerra",
    style: {
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 16.5,
      fontWeight: 600,
      color: '#FFFFFF'
    }
  }, "Sparsam & verantwortungsvoll"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      fontWeight: 500,
      color: 'var(--text-on-terra-soft)'
    }
  }, "Wir bearbeiten nur Daten, die f\xFCr die vereinbarte Leistung erforderlich sind."))), /*#__PURE__*/React.createElement(CheckItem, {
    boxed: true,
    tone: "onTerra",
    style: {
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 16.5,
      fontWeight: 600,
      color: '#FFFFFF'
    }
  }, "Technisch & organisatorisch gesch\xFCtzt"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      lineHeight: 1.6,
      fontWeight: 500,
      color: 'var(--text-on-terra-soft)'
    }
  }, "Wir setzen angemessene Schutzmassnahmen ein und w\xE4hlen eingesetzte Dienstleister sorgf\xE4ltig aus."))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 260
    }
  }, /*#__PURE__*/React.createElement(DsgvoSiegel, {
    size: 176,
    rotate: -6,
    style: {
      alignSelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14.5,
      fontWeight: 600,
      color: 'rgba(255,236,222,0.9)',
      textAlign: 'center'
    }
  }, "Schweizer Datenschutzgesetz"))));
}

/* Versprechen (Peach) */
function Versprechen() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "Versprechen",
    style: {
      background: 'linear-gradient(180deg, var(--cream-100) 0%, var(--peach-100) 58%, var(--sand-200) 100%)',
      borderTop: '1px solid var(--border-soft)',
      borderBottom: '2px solid var(--terra-500)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '88px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      alignItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.26em',
      color: 'var(--terra-500)'
    }
  }, "UNSER VERSPRECHEN"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'clamp(38px, 5vw, 68px)',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.14,
      color: 'var(--text-strong)'
    }
  }, "Transformation, die man", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--terra-500)'
    }
  }, "im Alltag sp\xFCrt."))));
}
Object.assign(window, {
  Orientierung,
  Leistungen,
  Buerobot,
  Ablauf,
  Datenschutz,
  Versprechen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections-main.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  // data-om-starter: inert presence marker — Claude Design's starter-usage
  // probe reads it. The closed panel renders nothing, so the marker rides
  // the <html> element as an attribute instead of a rendered node — zero
  // elements added, so page CSS (even structural selectors like
  // :nth-child) can never observe it. It records that the page WIRES a
  // tweaks panel, whether or not the panel is open. Keep this effect.
  React.useEffect(() => {
    document.documentElement.setAttribute('data-om-starter', 'tweaks-panel');
    return () => document.documentElement.removeAttribute('data-om-starter');
  }, []);
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ueber-uns.compiled.js
try { (() => {
const {
  Kicker,
  SiteFooter,
  TeamCard
} = window.vaiaconDesignSystem_5f353f;
const ASSET_BASE = window.VAIACON_ASSET_BASE || '../../assets/';
function asset(path) {
  return ASSET_BASE + path;
}
const NAV_LINKS = [{
  label: 'vaiaconLearning',
  href: 'index.html#learning',
  product: 'Learning'
}, {
  label: 'vaiaconBot',
  href: 'index.html#service',
  product: 'Bot'
}, {
  label: 'vaiaconService',
  href: 'index.html#service-pakete',
  product: 'Service'
}, {
  label: 'Über uns',
  href: 'ueber-uns.html'
}, {
  label: 'FAQ',
  href: 'index.html#faq'
}, {
  label: 'Kontakt',
  href: 'index.html#kontakt',
  contact: true
}];
function NavLabel({
  link
}) {
  if (!link.product) return link.label;
  return /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-product"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-brand"
  }, "vaiacon"), /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-accent"
  }, link.product));
}
function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);
  return /*#__PURE__*/React.createElement("header", {
    className: "mock-header is-solid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-header__logo",
    href: "index.html",
    "aria-label": "vaiacon Start"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset('logo-lockup-terra.png'),
    alt: "vaiacon"
  })), /*#__PURE__*/React.createElement("button", {
    className: "mock-menu-toggle",
    type: "button",
    "aria-label": menuOpen ? 'Menü schliessen' : 'Menü öffnen',
    "aria-controls": "mock-mobile-menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(open => !open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("nav", {
    className: "mock-header__nav",
    "aria-label": "Hauptnavigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  }))))), /*#__PURE__*/React.createElement("nav", {
    id: "mock-mobile-menu",
    className: `mock-mobile-nav${menuOpen ? ' is-open' : ''}`,
    "aria-label": "Mobile Navigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label,
    onClick: closeMenu
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  })))));
}
function UeberUns() {
  return /*#__PURE__*/React.createElement("section", {
    id: "ueber-uns",
    className: "mock-section mock-section--alt mock-subpage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, null, "\xDCber uns"), /*#__PURE__*/React.createElement("h1", {
    className: "mock-title"
  }, "Unternehmerische Praxis, menschliche Werte und moderne Technologie."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 980
    }
  }, "Andr\xE9 Ulrich und Philip Krieger sind zwei Unternehmer aus Z\xFCrich. Sie haben vaiacon gegr\xFCndet, um Schweizer KMU in das Zeitalter von KI zu begleiten und sie zu bef\xE4higen, KI f\xFCr ihr Unternehmen einzusetzen. Wir verbinden unternehmerische Praxis, menschliche Werte und moderne Technologie zu einem ganzheitlichen Ansatz und begleiten KMU pers\xF6nlich, vor Ort und auf Augenh\xF6he.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-team-grid"
  }, /*#__PURE__*/React.createElement(TeamCard, {
    src: asset('andre-ulrich-team.png?v=20260720-andre-bg-clean'),
    alt: "Andr\xE9 Ulrich",
    name: "Andr\xE9 Ulrich",
    role: "Mitgr\xFCnder \xB7 KMU-Experte",
    photoHeight: 340
  }), /*#__PURE__*/React.createElement(TeamCard, {
    src: asset('philip-krieger-team.png'),
    alt: "Philip Krieger",
    name: "Philip Krieger",
    role: "Mitgr\xFCnder \xB7 Coach",
    photoHeight: 340
  }))));
}
function App() {
  const [chatOpen, setChatOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "mock-page"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(UeberUns, null)), /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: asset('logo-lockup-white.png')
  }), /*#__PURE__*/React.createElement(ChatWidget, {
    open: chatOpen,
    onOpen: () => setChatOpen(true),
    onClose: () => setChatOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ueber-uns.compiled.js", error: String((e && e.message) || e) }); }

// ui_kits/website/ueber-uns.jsx
try { (() => {
const {
  Kicker,
  SiteFooter,
  TeamCard
} = window.vaiaconDesignSystem_5f353f;
const ASSET_BASE = window.VAIACON_ASSET_BASE || '../../assets/';
function asset(path) {
  return ASSET_BASE + path;
}
const NAV_LINKS = [{
  label: 'vaiaconLearning',
  href: 'index.html#learning',
  product: 'Learning'
}, {
  label: 'vaiaconBot',
  href: 'index.html#service',
  product: 'Bot'
}, {
  label: 'vaiaconService',
  href: 'index.html#service-pakete',
  product: 'Service'
}, {
  label: 'Über uns',
  href: 'ueber-uns.html'
}, {
  label: 'FAQ',
  href: 'index.html#faq'
}, {
  label: 'Kontakt',
  href: 'index.html#kontakt',
  contact: true
}];
function NavLabel({
  link
}) {
  if (!link.product) return link.label;
  return /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-product"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-brand"
  }, "vaiacon"), /*#__PURE__*/React.createElement("span", {
    className: "mock-nav-accent"
  }, link.product));
}
function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const closeMenu = () => setMenuOpen(false);
  return /*#__PURE__*/React.createElement("header", {
    className: "mock-header is-solid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-header__inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "mock-header__logo",
    href: "index.html",
    "aria-label": "vaiacon Start"
  }, /*#__PURE__*/React.createElement("img", {
    src: asset('logo-lockup-terra.png'),
    alt: "vaiacon"
  })), /*#__PURE__*/React.createElement("button", {
    className: "mock-menu-toggle",
    type: "button",
    "aria-label": menuOpen ? 'Menü schliessen' : 'Menü öffnen',
    "aria-controls": "mock-mobile-menu",
    "aria-expanded": menuOpen,
    onClick: () => setMenuOpen(open => !open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("nav", {
    className: "mock-header__nav",
    "aria-label": "Hauptnavigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  }))))), /*#__PURE__*/React.createElement("nav", {
    id: "mock-mobile-menu",
    className: `mock-mobile-nav${menuOpen ? ' is-open' : ''}`,
    "aria-label": "Mobile Navigation"
  }, NAV_LINKS.map(link => /*#__PURE__*/React.createElement("a", {
    key: link.label,
    className: link.contact ? 'mock-header__contact' : '',
    href: link.href,
    "aria-label": link.label,
    onClick: closeMenu
  }, /*#__PURE__*/React.createElement(NavLabel, {
    link: link
  })))));
}
function UeberUns() {
  return /*#__PURE__*/React.createElement("section", {
    id: "ueber-uns",
    className: "mock-section mock-section--alt mock-subpage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mock-center"
  }, /*#__PURE__*/React.createElement(Kicker, null, "\xDCber uns"), /*#__PURE__*/React.createElement("h1", {
    className: "mock-title"
  }, "Unternehmerische Praxis, menschliche Werte und moderne Technologie."), /*#__PURE__*/React.createElement("p", {
    className: "mock-lead",
    style: {
      maxWidth: 980
    }
  }, "Andr\xE9 Ulrich und Philip Krieger sind zwei Unternehmer aus Z\xFCrich. Sie haben vaiacon gegr\xFCndet, um Schweizer KMU in das Zeitalter von KI zu begleiten und sie zu bef\xE4higen, KI f\xFCr ihr Unternehmen einzusetzen. Wir verbinden unternehmerische Praxis, menschliche Werte und moderne Technologie zu einem ganzheitlichen Ansatz und begleiten KMU pers\xF6nlich, vor Ort und auf Augenh\xF6he.")), /*#__PURE__*/React.createElement("div", {
    className: "mock-team-grid"
  }, /*#__PURE__*/React.createElement(TeamCard, {
    src: asset('andre-ulrich-team.png?v=20260720-andre-bg-clean'),
    alt: "Andr\xE9 Ulrich",
    name: "Andr\xE9 Ulrich",
    role: "Mitgr\xFCnder \xB7 KMU-Experte",
    photoHeight: 340
  }), /*#__PURE__*/React.createElement(TeamCard, {
    src: asset('philip-krieger-team.png'),
    alt: "Philip Krieger",
    name: "Philip Krieger",
    role: "Mitgr\xFCnder \xB7 Coach",
    photoHeight: 340
  }))));
}
function App() {
  const [chatOpen, setChatOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "mock-page"
  }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(UeberUns, null)), /*#__PURE__*/React.createElement(SiteFooter, {
    logoSrc: asset('logo-lockup-white.png')
  }), /*#__PURE__*/React.createElement(ChatWidget, {
    open: chatOpen,
    onOpen: () => setChatOpen(true),
    onClose: () => setChatOpen(false)
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ueber-uns.jsx", error: String((e && e.message) || e) }); }

__ds_ns.KompassTile = __ds_scope.KompassTile;

__ds_ns.PackageCard = __ds_scope.PackageCard;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.StepCard = __ds_scope.StepCard;

__ds_ns.TeamCard = __ds_scope.TeamCard;

__ds_ns.ChatMessage = __ds_scope.ChatMessage;

__ds_ns.SpeechBubble = __ds_scope.SpeechBubble;

__ds_ns.FaqItem = __ds_scope.FaqItem;

__ds_ns.ServiceRow = __ds_scope.ServiceRow;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CheckItem = __ds_scope.CheckItem;

__ds_ns.CheckPill = __ds_scope.CheckPill;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.LabelBadge = __ds_scope.LabelBadge;

__ds_ns.Twinkle = __ds_scope.Twinkle;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
