#!/usr/bin/env python3
"""Erzeugt die Branchenseiten der Automationen: automationen-<branche>.html.

    python3 scripts/branchen_seiten.py            # alle sieben Seiten schreiben
    python3 scripts/branchen_seiten.py --pruefen  # nichts schreiben, Exit 1 wenn eine Seite abweicht

Quellen: daten/branchen.json (Inhalt je Branche), scripts/branchen_seite_vorlage.html
(Kopf, Aufbau, Fuss) und die Texte unten (Überschrift, Lead, Schlusssatz).
Preise stehen auf den Branchenseiten nicht (Preisentscheid 11.10.2026).
Die Branche «alle» bekommt keine Seite.
URL-Form: /automationen-<branche>. Caddy löst über try_files {path}.html auf, ein
Ordner /bot/ würde /bot (= bot.html) gefährden.
"""
from __future__ import annotations

import html
import json
import subprocess
import sys
from datetime import date
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
BASIS = "https://vaiacon.ch"
VERSION = "20261012-nav17"

# (Überschrift, Lead, Schlusssatz) je Branche
TEXTE = {
    "malerbetrieb": (
        "Weniger Abtippen, mehr Zeit auf der Baustelle.",
        "Aufmass, Rapport, Offerte und Rechnung hängen zusammen. Wir sorgen dafür, dass sie sich gegenseitig füttern, statt dass jemand sie dreimal abtippt.",
        "Lassen Sie prüfen, was in Ihrem Malerbetrieb von selbst laufen kann.",
    ),
    "treuhand": (
        "Weniger Papierkram im Treuhandbüro.",
        "Belege, Fristen und Rückfragen laufen von selbst an. Ihr Team prüft, statt nachzufragen und abzulegen.",
        "Lassen Sie prüfen, was in Ihrem Treuhandbüro von selbst laufen kann.",
    ),
    "arztpraxis": (
        "Weniger Verwaltung in der Arztpraxis.",
        "Terminerinnerungen, Rezeptwünsche und Standardfragen laufen im Hintergrund. Was dabei mit Patientendaten geschieht, klären wir vorab mit Ihnen.",
        "Lassen Sie prüfen, was in Ihrer Arztpraxis von selbst laufen kann.",
    ),
    "sanitaer-heizung": (
        "Weniger Büro nach dem Feierabend.",
        "Rapport, Wartungserinnerung und Rechnung entstehen direkt aus dem Einsatz. Das Büro muss nicht mehr hinterhertelefonieren.",
        "Lassen Sie prüfen, was in Ihrem Betrieb für Sanitär und Heizung von selbst laufen kann.",
    ),
    "kosmetik": (
        "Weniger Nachrichten, mehr Zeit für Ihre Kundschaft.",
        "Termine, Erinnerungen und Nachsorge laufen im Hintergrund. Notizen und Allergien sind Gesundheitsdaten: Wer sie sehen darf und wo sie liegen, klären wir vorab mit Ihnen.",
        "Lassen Sie prüfen, was in Ihrem Studio von selbst laufen kann.",
    ),
    "restaurant": (
        "Weniger Administration, mehr Gäste am Tisch.",
        "Reservationen, Bewertungen und Dienstplan laufen mit. Sie bleiben beim Kochen und Servieren.",
        "Lassen Sie prüfen, was in Ihrem Restaurant von selbst laufen kann.",
    ),
    "immobilien": (
        "Weniger Nachfragen in der Bewirtschaftung.",
        "Interessentenfragen, Dossiers und Schadenmeldungen landen sortiert bei Ihnen. Standardantworten gehen von selbst raus.",
        "Lassen Sie prüfen, was in Ihrer Verwaltung von selbst laufen kann.",
    ),
}

# Stufe: (Schlüssel in branchen.json, Titel, Kurzzeile, Katalog-id, Ersatztext) – wie bot.html #preise
STUFEN = [
    ("einfach", "Einfache Automation", "Eine feste Regel in einem Programm", "au-ablauf-klein", "ab CHF 1'300"),
    ("verbunden", "Mittelgrosse Automation", "Zwei Programme arbeiten zusammen, oder eine Entscheidung oder Freigabe kommt dazu", "au-freigabe-schleife", "ab CHF 2'600"),
    ("ganzer_ablauf", "Komplette Automation", "Mehrere Schritte über bis zu drei Programme. Standardfälle laufen automatisch, Ausnahmen bleiben sichtbar.", "au-auftragsablauf", "ab CHF 4'200"),
]


def e(s: str) -> str:
    return html.escape(s, quote=True)


def pfad(slug: str) -> str:
    return f"automationen-{slug}"


def karten(b: dict) -> str:
    out = []
    for nr, (schluessel, titel, kurz, pid, ersatz) in enumerate(STUFEN, 1):
        lis = "".join(
            f"<li><b>{e(x['titel'])}</b> <span>{e(x['satz'])}</span></li>" for x in b[schluessel]
        )
        out.append(
            f'          <article class="pm-branchen__karte">'
            f'<p class="pm-branchen__sprosse"><i>{nr}</i>{e(titel)}</p>'
            f'<p class="bs-stufe">{e(kurz)}</p>'
            f'<ul class="pm-branchen__liste">{lis}</ul></article>'
        )
    return "\n".join(out)


def leiste(daten: dict, eigene: str) -> str:
    zeilen = []
    for slug, b in daten.items():
        if slug == "alle":
            continue
        if slug == eigene:
            zeilen.append(f'            <li><a href="{pfad(slug)}" aria-current="page" style="background:var(--accent);color:var(--text-on-terra);border-color:var(--accent)">{e(b["name"])}</a></li>')
        else:
            zeilen.append(f'            <li><a href="{pfad(slug)}">{e(b["name"])}</a></li>')
    return "\n".join(zeilen)


def jsonld(slug: str, name: str, titel: str, beschr: str, datum: str) -> str:
    url = f"{BASIS}/{pfad(slug)}"
    g = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage", "@id": url, "url": url, "name": titel, "description": beschr,
                "inLanguage": "de-CH", "isPartOf": {"@id": f"{BASIS}/#website"},
                "about": {"@id": f"{BASIS}/#organisation"}, "dateModified": datum,
            },
            {
                "@type": "Service", "name": f"Automationen für {name}", "serviceType": "Büroarbeit automatisieren",
                "provider": {"@id": f"{BASIS}/#organisation"}, "areaServed": {"@type": "Country", "name": "Schweiz"},
                "description": beschr, "url": url,
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "Automationen", "item": f"{BASIS}/bot"},
                    {"@type": "ListItem", "position": 2, "name": name, "item": url},
                ],
            },
        ],
    }
    return json.dumps(g, ensure_ascii=False, indent=2)


def beschreibung(name: str, lead: str, grenze: int = 160) -> str:
    """Anfang + so viele Sätze des Leads, wie in die Grenze passen (mindestens einer), dann der Hinweis auf die Erstanalyse."""
    anfang, ende = f"Automationen für {name}:", " Kostenlose Erstanalyse."
    saetze = [x.strip() + "." for x in lead.split(". ") if x.strip()]
    saetze = [x.replace("..", ".") for x in saetze]
    text = anfang + " " + saetze[0]
    for satz in saetze[1:]:
        if len(text + " " + satz + ende) <= grenze:
            text += " " + satz
    return text + ende


def seite(slug: str, daten: dict, vorlage: str, datum: str) -> str:
    b = daten[slug]
    name = b["name"]
    h1, lead, schluss = TEXTE[slug]
    # 27.10.2026: Titel höchstens 60, Beschreibung höchstens 160 Zeichen (Google kürzt sonst mitten im Satz).
    titel = f"Büroarbeit automatisieren für {name} · vaiacon"
    beschr = beschreibung(name, lead)
    werte = {
        "titel": e(titel), "beschreibung": e(beschr), "pfad": pfad(slug), "slug": slug, "name": e(name),
        "h1": e(h1), "lead": e(lead), "schluss": e(schluss), "version": VERSION,
        "nervt": "".join(f"<li>{e(x)}</li>" for x in b["nervt"]),
        "karten": karten(b), "leiste": leiste(daten, slug),
        "jsonld": jsonld(slug, name, titel, beschr, datum),
    }
    t = vorlage
    for k, v in werte.items():
        t = t.replace("{{" + k + "}}", v)
    assert "{{" not in t, f"Platzhalter übrig in {slug}"
    return t


def zuletzt_geaendert(datei: Path) -> str:
    """Wie lastmod in der Sitemap: letzter Commit der Datei, heute bei ungespeicherten Änderungen."""
    def git(*a):
        return subprocess.run(["git", "-C", str(WURZEL), *a], capture_output=True, text=True).stdout.strip()
    rel = str(datei.relative_to(WURZEL))
    if git("status", "--porcelain", "--", rel):
        return date.today().isoformat()
    return git("log", "-1", "--format=%cs", "--", rel) or date.today().isoformat()


def main() -> int:
    nur_pruefen = "--pruefen" in sys.argv
    daten = json.loads((WURZEL / "daten" / "branchen.json").read_text(encoding="utf-8"))
    vorlage = (WURZEL / "scripts" / "branchen_seite_vorlage.html").read_text(encoding="utf-8")
    abweichend = 0
    for slug in daten:
        if slug == "alle":
            continue
        ziel = WURZEL / f"{pfad(slug)}.html"
        heute = date.today().isoformat()
        neu = seite(slug, daten, vorlage, zuletzt_geaendert(ziel))
        alt_vorab = ziel.read_text(encoding="utf-8") if ziel.exists() else None
        if neu != alt_vorab and zuletzt_geaendert(ziel) != heute:
            neu = seite(slug, daten, vorlage, heute)   # dieser Lauf ändert die Seite: dateModified heute
        alt = ziel.read_text(encoding="utf-8") if ziel.exists() else None
        if nur_pruefen:
            if alt != neu:
                print(f"weicht ab: {ziel.name}")
                abweichend += 1
        elif alt != neu:
            ziel.write_text(neu, encoding="utf-8")
            print(f"geschrieben: {ziel.name}")
    return 1 if abweichend else 0


if __name__ == "__main__":
    sys.exit(main())
