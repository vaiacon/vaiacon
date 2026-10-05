#!/usr/bin/env python3
"""KI-News für KMU: baut die statischen Seiten aus den Wochendateien.

Liest   ki-kmu-news/daten/JJJJ-kwNN.json   (eine Datei je Woche)
Schreibt in ki-kmu-news/:
    index.html         immer die neueste Woche
    JJJJ-kwNN.html     eine feste Seite je Woche
    archiv.html        alle Wochen
    feed.xml           RSS 2.0
    neueste.json       die drei neuesten Beitraege (Liste; Pfade ab Wurzel der Website)

Nur Standardbibliothek. Idempotent: eine Datei wird nur geschrieben, wenn sich ihr
Inhalt aendert. Kopf, Fuss und Skripte stehen in EINER Vorlage
(scripts/news_vorlagen/rahmen.html) und werden dort getauscht, nicht hier.

Aufruf:  python3 scripts/news_bauen.py [--wurzel PFAD] [--still]
"""
from __future__ import annotations

import argparse
import html
import json
import re
import struct
import sys
from datetime import date, datetime, time
from pathlib import Path
from zoneinfo import ZoneInfo

SEITE = "https://vaiacon.ch"
ORDNER = "ki-kmu-news"
VORLAGEN = Path(__file__).resolve().parent / "news_vorlagen"
ZEITZONE = ZoneInfo("Europe/Zurich")

WOCHENTAGE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
WOCHENTAGE_KURZ = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
MONATE = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August",
          "September", "Oktober", "November", "Dezember"]

RUBRIKEN = {
    "modelle": "Modelle",
    "werkzeuge": "Werkzeuge",
    "recht": "Recht",
    "sicherheit": "Sicherheit",
    "markt": "Markt",
    "praxis": "Praxis",
}
RUBRIK_BILD = {
    "modelle": "vaiacon-buerobot-news-modelle",
    "werkzeuge": "vaiacon-buerobot-news-werkzeuge",
    "recht": "vaiacon-buerobot-news-recht",
    "sicherheit": "vaiacon-buerobot-news-sicherheit",
    "markt": "vaiacon-buerobot-news-markt",
    "praxis": "vaiacon-buerobot-news-zeitung",
}
WOCHENBILD = "vaiacon-buerobot-news-zeitung"
RUECKFALL_BILDER = ["vaiacon-buerobot-faq-tablet", "vaiacon-buerobot-startseite"]
BEREICHE = {
    "ki-kompetenz": ("../learning", "KI-Kompetenz"),
    "sichtbarkeit": ("../visibility", "Sichtbarkeit"),
    "automationen": ("../bot", "Automationen"),
}
OHNE_ANGEBOT = "dazu brauchen sie uns"


# ---------------------------------------------------------------- Hilfen

def esc(text) -> str:
    return html.escape(str(text), quote=True)


def lies_vorlage(name: str) -> str:
    return (VORLAGEN / name).read_text(encoding="utf-8")


def schreibe(pfad: Path, inhalt: str, still: bool = False) -> bool:
    """Schreibt nur bei Aenderung. Gibt True zurueck, wenn geschrieben wurde."""
    daten = inhalt.encode("utf-8")
    if pfad.exists() and pfad.read_bytes() == daten:
        return False
    pfad.parent.mkdir(parents=True, exist_ok=True)
    pfad.write_bytes(daten)
    if not still:
        print(f"geschrieben: {pfad}")
    return True


def parse_datum(text: str) -> date:
    return datetime.strptime(text, "%Y-%m-%d").date()


def tag_monat(d: date) -> str:
    return f"{d.day}. {MONATE[d.month - 1]}"


def datum_lang(d: date) -> str:
    return f"{WOCHENTAGE[d.weekday()]}, {d.day}. {MONATE[d.month - 1]} {d.year}"


def zeitspanne(von: date, bis: date) -> str:
    """«28. September – 4. Oktober 2026», «5. – 11. Oktober 2026»."""
    if von.year != bis.year:
        return f"{tag_monat(von)} {von.year} – {tag_monat(bis)} {bis.year}"
    if von.month != bis.month:
        return f"{tag_monat(von)} – {tag_monat(bis)} {bis.year}"
    return f"{von.day}. – {bis.day}. {MONATE[bis.month - 1]} {bis.year}"


def woche_titel(w: dict) -> str:
    return f"KW {w['kw']} · {zeitspanne(w['_von'], w['_bis'])}"


def seitenname(w: dict) -> str:
    return f"{w['jahr']}-kw{int(w['kw']):02d}.html"


def rfc822(d: date) -> str:
    z = datetime.combine(d, time(7, 0), tzinfo=ZEITZONE)
    tag = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][z.weekday()]
    monat = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][z.month - 1]
    return f"{tag}, {z.day:02d} {monat} {z.year} 07:00:00 {z.strftime('%z')}"


def png_groesse(pfad: Path):
    try:
        kopf = pfad.read_bytes()[:32]
        if kopf[:8] != b"\x89PNG\r\n\x1a\n":
            return None
        return struct.unpack(">II", kopf[16:24])
    except OSError:
        return None


def json_ld(daten) -> str:
    text = json.dumps(daten, ensure_ascii=False, indent=2)
    return text.replace("</", "<\\/")


# ---------------------------------------------------------------- Bilder

class Bilder:
    def __init__(self, wurzel: Path):
        self.assets = wurzel / "assets"
        self.fehlend: list[str] = []

    def waehle(self, name: str) -> str:
        """Bildname ohne Endung; faellt auf Ersatzbilder zurueck, wenn die PNG fehlt."""
        for kandidat in [name] + RUECKFALL_BILDER:
            if (self.assets / f"{kandidat}.png").is_file():
                if kandidat != name:
                    self.fehlend.append(name)
                return kandidat
        self.fehlend.append(name)
        return RUECKFALL_BILDER[-1]

    def picture(self, name: str, alt: str, klasse: str = "", eager: bool = False) -> str:
        echt = self.waehle(name)
        png = self.assets / f"{echt}.png"
        groesse = png_groesse(png)
        masse = f' width="{groesse[0]}" height="{groesse[1]}"' if groesse else ""
        quelle = ""
        if (self.assets / f"{echt}.webp").is_file():
            quelle = f'<source srcset="../assets/{echt}.webp" type="image/webp">'
        lade = ' fetchpriority="high"' if eager else ' loading="lazy" decoding="async"'
        kl = f' class="{klasse}"' if klasse else ""
        return (f'<picture>{quelle}<img{kl} src="../assets/{echt}.png" alt="{esc(alt)}"{masse}{lade}></picture>')

    def pfad_ab_wurzel(self, name: str) -> str:
        return f"assets/{self.waehle(name)}.png"


# ---------------------------------------------------------------- Daten

def lade_wochen(wurzel: Path) -> list[dict]:
    ordner = wurzel / ORDNER / "daten"
    wochen = []
    for datei in sorted(ordner.glob("*.json")):
        try:
            w = json.loads(datei.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as fehler:
            print(f"WARNUNG: {datei.name} unlesbar: {fehler}", file=sys.stderr)
            continue
        try:
            w["_von"] = parse_datum(w["von"])
            w["_bis"] = parse_datum(w["bis"])
            w["jahr"] = int(w["jahr"])
            w["kw"] = int(w["kw"])
        except (KeyError, ValueError) as fehler:
            print(f"WARNUNG: {datei.name} ohne gueltige Woche: {fehler}", file=sys.stderr)
            continue
        beitraege = []
        for b in w.get("beitraege", []):
            try:
                b["_datum"] = parse_datum(b["datum"])
                b["id"] = re.sub(r"[^a-z0-9-]", "-", str(b["id"]).lower())
                b["rubrik"] = b["rubrik"] if b.get("rubrik") in RUBRIKEN else "praxis"
                b["wichtigkeit"] = int(b.get("wichtigkeit", 1) or 1)
                b["quellen"] = [q for q in b.get("quellen", [])
                                if isinstance(q, dict) and str(q.get("url", "")).startswith("https://")]
            except (KeyError, ValueError) as fehler:
                print(f"WARNUNG: {datei.name}: Beitrag uebersprungen ({fehler})", file=sys.stderr)
                continue
            beitraege.append(b)
        w["beitraege"] = beitraege
        wochen.append(w)
    wochen.sort(key=lambda x: (x["jahr"], x["kw"]), reverse=True)
    return wochen


def sortiere_tag(beitraege: list[dict]) -> list[dict]:
    return sorted(beitraege, key=lambda b: (-b["wichtigkeit"], b["titel"]))


def alle_beitraege(wochen: list[dict]) -> list[tuple[dict, dict]]:
    paare = []
    for w in wochen:
        for b in w["beitraege"]:
            paare.append((w, b))
    paare.sort(key=lambda p: (p[1]["_datum"], p[1]["wichtigkeit"]), reverse=True)
    return paare


# ---------------------------------------------------------------- Bausteine

def abzeichen(rubrik: str) -> str:
    return f'<span class="nw-abzeichen nw-abzeichen--{esc(rubrik)}">{esc(RUBRIKEN[rubrik])}</span>'


KI_HINWEIS = ('<p class="nw-ki-hinweis">Von KI zusammengestellt. Fehler entdeckt? '
              '<a href="mailto:hallo@vaiacon.ch">hallo@vaiacon.ch</a></p>')


def quellen_html(quellen: list[dict]) -> str:
    if not quellen:
        return ""
    punkte = []
    for q in quellen:
        titel = q.get("titel") or q["url"]
        punkte.append(
            f'<li><a href="{esc(q["url"])}" target="_blank" rel="noopener">{esc(titel)} ↗</a></li>')
    return ('<div class="nw-quellen"><p class="nw-quellen__titel">Quellen</p><ul>'
            + "".join(punkte) + "</ul></div>")


def karte_html(b: dict, bilder: Bilder, gross: bool) -> str:
    rubrik = b["rubrik"]
    name = RUBRIK_BILD[rubrik]
    bild = bilder.picture(name, f"Der vaiacon-Roboter zur Rubrik {RUBRIKEN[rubrik]}", eager=False)
    ziel, label = BEREICHE.get(b.get("bereich", ""), BEREICHE["ki-kompetenz"])
    vaiacon_text = str(b.get("vaiacon", ""))
    link = ""
    if not vaiacon_text.strip().lower().startswith(OHNE_ANGEBOT):
        link = f'<a class="nw-feld__link" href="{esc(ziel)}">Zu {esc(label)} →</a>'
    klasse = "nw-karte nw-karte--gross" if gross else "nw-karte"
    d = b["_datum"]
    teile = [
        f'<article class="{klasse}" id="{esc(b["id"])}" data-rubrik="{esc(rubrik)}" data-datum="{esc(b["datum"])}">',
        '  <header class="nw-karte__kopf">',
        f'    <figure class="nw-karte__bild">{bild}</figure>',
        '    <div class="nw-karte__titelblock">',
        f'      <p class="nw-karte__meta">{abzeichen(rubrik)}<time datetime="{esc(b["datum"])}">{esc(datum_lang(d))}</time>'
        + ('<span class="nw-karte__wichtig">Wichtigster Beitrag der Woche</span>' if gross else "") + '</p>',
        f'      <h3 class="nw-karte__titel"><a href="#{esc(b["id"])}">{esc(b["titel"])}</a></h3>',
        '    </div>',
        '  </header>',
        '  <div class="nw-karte__text">',
        '    <h4 class="nw-karte__frage">Was ist passiert?</h4>',
        f'    <p>{esc(b["kurz"])}</p>',
        '  </div>',
        '  <div class="nw-felder">',
        '    <section class="nw-feld nw-feld--kmu" aria-labelledby="{0}-kmu">'.format(esc(b["id"])),
        f'      <h4 id="{esc(b["id"])}-kmu">Was heisst das für Ihr KMU?</h4>',
        f'      <p>{esc(b["kmu"])}</p>',
        '    </section>',
        '    <section class="nw-feld nw-feld--vaiacon" aria-labelledby="{0}-vaiacon">'.format(esc(b["id"])),
        f'      <h4 id="{esc(b["id"])}-vaiacon">Was vaiacon dazu bietet</h4>',
        f'      <p>{esc(vaiacon_text)}</p>',
        f'      {link}',
        '    </section>',
        '    <section class="nw-feld nw-feld--achtung" aria-labelledby="{0}-achtung">'.format(esc(b["id"])),
        f'      <h4 id="{esc(b["id"])}-achtung">Worauf Sie achten sollten</h4>',
        f'      <p>{esc(b["achtung"])}</p>',
        '    </section>',
        '  </div>',
        '  ' + quellen_html(b["quellen"]),
        '  ' + KI_HINWEIS,
        '</article>',
    ]
    return "\n".join(t for t in teile if t.strip())


def tagesstreifen_html(w: dict) -> str:
    nach_tag: dict[date, list[dict]] = {}
    for b in w["beitraege"]:
        nach_tag.setdefault(b["_datum"], []).append(b)
    zellen = []
    for i in range(7):
        d = date.fromordinal(w["_von"].toordinal() + i)
        n = len(nach_tag.get(d, []))
        inhalt = (f'<span class="nw-tag__name">{WOCHENTAGE_KURZ[d.weekday()]}</span>'
                  f'<span class="nw-tag__zahl">{d.day}.</span>')
        if n:
            ersten = sortiere_tag(nach_tag[d])[0]["id"]
            zaehler = f'<span class="nw-tag__anzahl">{n} {"Beitrag" if n == 1 else "Beiträge"}</span>'
            zellen.append(
                f'<li><a class="nw-tag nw-tag--voll" href="#tag-{d.isoformat()}" data-datum="{d.isoformat()}"'
                f' data-erster="{esc(ersten)}">{inhalt}{zaehler}</a></li>')
        else:
            zaehler = '<span class="nw-tag__anzahl">kein Beitrag</span>'
            zellen.append(
                f'<li><span class="nw-tag nw-tag--leer" data-datum="{d.isoformat()}">{inhalt}{zaehler}</span></li>')
    return ('<nav class="nw-tage" aria-label="Tage dieser Woche"><ol>' + "".join(zellen) + "</ol></nav>")


def filter_html(w: dict) -> str:
    vorhanden = [r for r in RUBRIKEN if any(b["rubrik"] == r for b in w["beitraege"])]
    if len(vorhanden) < 2:
        return ""
    knoepfe = ['<button type="button" class="nw-filter__knopf" data-filter="alle" aria-pressed="true">Alle</button>']
    for r in vorhanden:
        knoepfe.append(
            f'<button type="button" class="nw-filter__knopf" data-filter="{r}" aria-pressed="false">{esc(RUBRIKEN[r])}</button>')
    return ('<div class="nw-filter" role="group" aria-label="Nach Rubrik filtern" hidden>'
            + "".join(knoepfe) + '<p class="nw-filter__status" role="status" aria-live="polite"></p></div>')


def wochenwahl_html(w: dict, wochen: list[dict], ist_index: bool) -> str:
    teile = []
    nummer = wochen.index(w)
    aelter = wochen[nummer + 1] if nummer + 1 < len(wochen) else None
    neuer = wochen[nummer - 1] if nummer > 0 else None
    if aelter:
        teile.append(f'<a href="{esc(seitenname(aelter))}">← KW {aelter["kw"]}</a>')
    teile.append('<a href="archiv.html">Archiv</a>')
    if neuer:
        ziel = "./" if wochen.index(neuer) == 0 else seitenname(neuer)
        teile.append(f'<a href="{esc(ziel)}">KW {neuer["kw"]} →</a>')
    if not ist_index and nummer == 0:
        teile.append('<a href="./">Zur aktuellen Woche</a>')
    return '<nav class="nw-wochenwahl" aria-label="Wochen">' + "".join(teile) + "</nav>"


def beitraege_html(w: dict, bilder: Bilder) -> str:
    if not w["beitraege"]:
        return ('<p class="nw-leer">In dieser Woche gab es nichts, das für Schweizer KMU wichtig genug war. '
                'Wir schreiben lieber nichts als Füllstoff.</p>')
    wichtigster = sorted(w["beitraege"], key=lambda b: (b["wichtigkeit"], b["_datum"]), reverse=True)[0]
    gross_id = wichtigster["id"] if wichtigster["wichtigkeit"] >= 2 else None
    nach_tag: dict[date, list[dict]] = {}
    for b in w["beitraege"]:
        nach_tag.setdefault(b["_datum"], []).append(b)
    abschnitte = []
    for d in sorted(nach_tag, reverse=True):
        karten = "\n".join(karte_html(b, bilder, b["id"] == gross_id) for b in sortiere_tag(nach_tag[d]))
        abschnitte.append(
            f'<section class="nw-tagesblock" id="tag-{d.isoformat()}" aria-labelledby="tag-{d.isoformat()}-titel">\n'
            f'<h2 class="nw-tagesblock__titel" id="tag-{d.isoformat()}-titel">{esc(datum_lang(d))}</h2>\n'
            f'{karten}\n</section>')
    return "\n".join(abschnitte)


def beschreibung_woche(w: dict) -> str:
    text = re.sub(r"\s+", " ", w.get("wochenfazit", "")).strip()
    if len(text) > 200:
        text = text[:197].rsplit(" ", 1)[0] + "…"
    return text or "Was KI-Neuigkeiten für Schweizer KMU heissen: täglich eingeordnet von vaiacon."


def jsonld_woche(w: dict, adresse: str, bilder: Bilder) -> dict:
    herausgeber = {
        "@type": "Organization",
        "name": "Vaiacon GmbH",
        "url": SEITE + "/",
        "logo": {"@type": "ImageObject", "url": SEITE + "/assets/logo-lockup-terra.png"},
    }
    elemente = []
    paare = sorted(w["beitraege"], key=lambda b: (b["_datum"], b["wichtigkeit"]), reverse=True)
    for i, b in enumerate(paare, 1):
        url = f"{SEITE}/{ORDNER}/{adresse}#{b['id']}"
        elemente.append({
            "@type": "ListItem",
            "position": i,
            "item": {
                "@type": "NewsArticle",
                "@id": url,
                "headline": b["titel"],
                "description": b["kurz"],
                "datePublished": b["datum"],
                "dateModified": b["datum"],
                "inLanguage": "de-CH",
                "articleSection": RUBRIKEN[b["rubrik"]],
                "url": url,
                "mainEntityOfPage": url,
                "image": f"{SEITE}/" + bilder.pfad_ab_wurzel(RUBRIK_BILD[b["rubrik"]]),
                "author": {"@type": "Organization", "name": "Vaiacon GmbH"},
                "publisher": herausgeber,
                "citation": [q["url"] for q in b["quellen"]],
            },
        })
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": f"KI-News für KMU {woche_titel(w)}",
        "description": beschreibung_woche(w),
        "numberOfItems": len(elemente),
        "itemListElement": elemente,
    }


# ---------------------------------------------------------------- Seiten

def rahmen(titel: str, beschreibung: str, kanonisch: str, jsonld: dict, aktiv: str,
           inhalt: str, mit_filter_js: bool) -> str:
    skripte = '  <script src="../ui_kits/website/news.js?v=20261004-news" defer></script>' if mit_filter_js else ""
    seite = lies_vorlage("rahmen.html")
    ersatz = {
        "{{TITEL}}": esc(titel),
        "{{BESCHREIBUNG}}": esc(beschreibung),
        "{{KANONISCH}}": esc(kanonisch),
        "{{JSONLD}}": json_ld(jsonld),
        "{{AKTIV}}": aktiv,
        "{{SKRIPT_EXTRA}}": skripte,
        "{{INHALT}}": inhalt,
    }
    for schluessel, wert in ersatz.items():
        seite = seite.replace(schluessel, wert)
    return seite


def wochenseite(w: dict, wochen: list[dict], bilder: Bilder, ist_index: bool) -> str:
    titel_woche = woche_titel(w)
    adresse = "" if ist_index else seitenname(w)
    kanonisch = f"{SEITE}/{ORDNER}/{adresse}"
    hero_bild = bilder.picture(WOCHENBILD, "Der vaiacon-Roboter liest eine Zeitung", "", eager=True)
    fazit = esc(w.get("wochenfazit", ""))
    aktiv = "page" if ist_index else "true"
    zaehl = len(w["beitraege"])
    anzahl = f"{zaehl} {'Beitrag' if zaehl == 1 else 'Beiträge'} in dieser Woche"
    # Leere Woche (Montagmorgen, ruhige Tage): statt einer leeren Seite die Beiträge der Vorwoche zeigen.
    vorwoche = None
    if not zaehl:
        anzahl = "Noch kein Beitrag in dieser Woche"
        spaeter = wochen[wochen.index(w) + 1:]
        vorwoche = next((v for v in spaeter if v["beitraege"]), None)
    if fazit:
        fazit_html = f'<p class="nw-kopf__fazit"><span class="nw-kopf__fazit-titel">Das Wochenfazit</span> {fazit}</p>'
    elif vorwoche:
        fazit_html = (f'<p class="nw-kopf__fazit">Die Woche ist noch jung: Bisher gab es nichts, das für Schweizer KMU '
                      f'wichtig genug war. Darunter lesen Sie die Beiträge der KW {vorwoche["kw"]}.</p>')
    else:
        fazit_html = ('<p class="nw-kopf__fazit">Bisher gab es in dieser Woche nichts, das für Schweizer KMU '
                      'wichtig genug war.</p>')
    liste = vorwoche or w
    if vorwoche:
        zuletzt = (f'<p class="nw-zuletzt">Zuletzt erschienen: <a href="{esc(seitenname(vorwoche))}">KW {vorwoche["kw"]}, '
                   f'{esc(zeitspanne(vorwoche["_von"], vorwoche["_bis"]))}</a></p>')
    else:
        zuletzt = ""
    # Schmaler Kopf (05.10.2026, Philip): Wer auf KI-News klickt, sieht die Beiträge ohne Scrollen.
    inhalt = f"""    <section id="top" class="nw-kopf" aria-label="Kopf der Woche">
      <div class="nw-kopf__innen">
        <div class="nw-kopf__text">
          <p class="nw-kopf__kicker">KI-NEWS FÜR KMU · {esc(anzahl).upper()}</p>
          <h1 class="nw-kopf__titel"><span class="nw-kopf__kw">KW {w['kw']}</span> <span class="nw-kopf__datum">{esc(zeitspanne(w['_von'], w['_bis']))}</span></h1>
          {fazit_html}
        </div>
        <figure class="nw-kopf__bild" aria-hidden="true">
          {hero_bild}
        </figure>
      </div>
    </section>

    <section class="nw-streifen" aria-label="Wochenübersicht">
      <div class="nw-streifen__innen">
        {tagesstreifen_html(w)}
        {wochenwahl_html(w, wochen, ist_index)}
      </div>
    </section>

    <section id="beitraege" class="sv-section nw-liste">
      <div class="sv-wrap">
        <h2 class="nw-unsichtbar">Die Beiträge</h2>
        {zuletzt}
        {filter_html(liste)}
        <div class="nw-beitraege">
{beitraege_html(liste, bilder)}
        </div>
      </div>
    </section>

{lies_vorlage("schluss.html").rstrip()}"""
    titel = f"KI-News für KMU {titel_woche_kurz(w)} · vaiacon"
    return rahmen(titel, beschreibung_woche(w), kanonisch, jsonld_woche(w, adresse or seitenname(w), bilder),
                  aktiv, inhalt, mit_filter_js=True)


def titel_woche_kurz(w: dict) -> str:
    return f"KW {w['kw']}/{w['jahr']}"


def archivseite(wochen: list[dict], bilder: Bilder) -> str:
    eintraege = []
    for i, w in enumerate(wochen):
        ziel = "./" if i == 0 else seitenname(w)
        rubriken = []
        for r in RUBRIKEN:
            if any(b["rubrik"] == r for b in w["beitraege"]):
                rubriken.append(abzeichen(r))
        titel_liste = "".join(
            f'<li><a href="{esc(seitenname(w))}#{esc(b["id"])}">{esc(b["titel"])}</a></li>'
            for b in sorted(w["beitraege"], key=lambda b: (b["_datum"], b["wichtigkeit"]), reverse=True))
        n = len(w["beitraege"])
        aktuell = '<span class="nw-karte__wichtig">Aktuelle Woche</span>' if i == 0 else ""
        eintraege.append(f"""<li class="nw-archiv__woche">
  <h2 class="nw-archiv__titel"><a href="{esc(ziel)}">{esc(woche_titel(w))}</a> {aktuell}</h2>
  <p class="nw-archiv__fazit">{esc(beschreibung_woche(w))}</p>
  <p class="nw-karte__meta">{''.join(rubriken)}<span>{n} {'Beitrag' if n == 1 else 'Beiträge'}</span></p>
  <ul class="nw-archiv__beitraege">{titel_liste}</ul>
</li>""")
    bild = bilder.picture(WOCHENBILD, "Der vaiacon-Roboter liest eine Zeitung", "", eager=True)
    inhalt = f"""    <section id="top" class="sv-hero nw-hero nw-hero--archiv" aria-label="Archiv">
      <div class="sv-hero__inner">
        <div class="sv-hero__copy">
          <p class="sv-kicker sv-kicker--on-terra">KI-NEWS FÜR KMU</p>
          <h1 class="nw-hero__titel"><span class="nw-hero__kw">Archiv</span></h1>
          <p class="sv-hero__lead">Alle bisherigen Wochen auf einen Blick. Jede Woche hat ihre feste Adresse.</p>
          <div class="sv-actions">
            <a class="sv-button sv-button--light" href="./">Aktuelle Woche →</a>
            <a class="sv-button sv-button--glass" href="feed.xml">RSS-Feed ↗</a>
          </div>
        </div>
        <div class="sv-hero__visual" aria-hidden="true">
          <figure class="sv-hero__robot sv-hero__robot--frei">
            {bild}
          </figure>
        </div>
      </div>
    </section>

    <section class="sv-section nw-archiv">
      <div class="sv-wrap">
        <ol class="nw-archiv__liste">
{chr(10).join(eintraege)}
        </ol>
      </div>
    </section>

{lies_vorlage("schluss.html").rstrip()}"""
    beschr = "Alle Wochen von KI-News für KMU: was KI-Neuigkeiten für Schweizer KMU heissen, nach Kalenderwoche geordnet."
    liste = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "KI-News für KMU Archiv",
        "numberOfItems": len(wochen),
        "itemListElement": [
            {"@type": "ListItem", "position": i + 1,
             "url": f"{SEITE}/{ORDNER}/" + ("" if i == 0 else seitenname(w)),
             "name": woche_titel(w)}
            for i, w in enumerate(wochen)
        ],
    }
    return rahmen("KI-News für KMU Archiv · vaiacon", beschr, f"{SEITE}/{ORDNER}/archiv.html", liste,
                  "true", inhalt, mit_filter_js=False)


def feed(wochen: list[dict], bilder: Bilder) -> str:
    paare = alle_beitraege(wochen)[:40]
    stand = rfc822(paare[0][1]["_datum"]) if paare else rfc822(date(2026, 1, 1))
    zeilen = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        "<channel>",
        "<title>KI-News für KMU · vaiacon</title>",
        f"<link>{SEITE}/{ORDNER}/</link>",
        f'<atom:link href="{SEITE}/{ORDNER}/feed.xml" rel="self" type="application/rss+xml"/>',
        "<description>Was KI-Neuigkeiten für Schweizer KMU heissen: was passiert ist, was es für Ihren Betrieb bedeutet und worauf Sie achten sollten.</description>",
        "<language>de-CH</language>",
        f"<lastBuildDate>{stand}</lastBuildDate>",
    ]
    for w, b in paare:
        url = f"{SEITE}/{ORDNER}/{seitenname(w)}#{b['id']}"
        text = (f"{b['kurz']}\n\nWas heisst das für Ihr KMU? {b['kmu']}\n\n"
                f"Was vaiacon dazu bietet: {b['vaiacon']}\n\nWorauf Sie achten sollten: {b['achtung']}")
        zeilen += [
            "<item>",
            f"<title>{esc(b['titel'])}</title>",
            f"<link>{esc(url)}</link>",
            f'<guid isPermaLink="true">{esc(url)}</guid>',
            f"<pubDate>{rfc822(b['_datum'])}</pubDate>",
            f"<category>{esc(RUBRIKEN[b['rubrik']])}</category>",
            f"<description>{esc(text)}</description>",
            "</item>",
        ]
    zeilen += ["</channel>", "</rss>", ""]
    return "\n".join(zeilen)


def neueste(wochen: list[dict], bilder: Bilder) -> str:
    eintraege = []
    for w, b in alle_beitraege(wochen)[:3]:
        eintraege.append({
            "titel": b["titel"],
            "datum": b["datum"],
            "rubrik": b["rubrik"],
            "kurz": b["kurz"],
            "adresse": f"{ORDNER}/{seitenname(w)}#{b['id']}",
            "bild": bilder.pfad_ab_wurzel(RUBRIK_BILD[b["rubrik"]]),
        })
    return json.dumps(eintraege, ensure_ascii=False, indent=2) + "\n"


# ---------------------------------------------------------------- Ablauf

def baue(wurzel: Path, still: bool = False) -> int:
    wochen = lade_wochen(wurzel)
    if not wochen:
        print("keine Wochendateien gefunden", file=sys.stderr)
        return 1
    bilder = Bilder(wurzel)
    ziel = wurzel / ORDNER
    geaendert = 0
    geaendert += schreibe(ziel / "index.html", wochenseite(wochen[0], wochen, bilder, True), still)
    for w in wochen:
        geaendert += schreibe(ziel / seitenname(w), wochenseite(w, wochen, bilder, False), still)
    geaendert += schreibe(ziel / "archiv.html", archivseite(wochen, bilder), still)
    geaendert += schreibe(ziel / "feed.xml", feed(wochen, bilder), still)
    geaendert += schreibe(ziel / "neueste.json", neueste(wochen, bilder), still)
    for name in sorted(set(bilder.fehlend)):
        print(f"HINWEIS: Bild {name}.png fehlt, Ersatzbild verwendet", file=sys.stderr)
    if not still:
        print(f"fertig: {geaendert} Datei(en) geändert, {len(wochen)} Woche(n)")
    return 0


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--wurzel", default=str(Path(__file__).resolve().parent.parent),
                    help="Wurzel der Website (Standard: Ordner über scripts/)")
    ap.add_argument("--still", action="store_true", help="nichts ausgeben")
    args = ap.parse_args()
    return baue(Path(args.wurzel).resolve(), args.still)


if __name__ == "__main__":
    sys.exit(main())
