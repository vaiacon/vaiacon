#!/usr/bin/env python3
"""Kundenstimmen: schreibt die Blöcke als fertiges HTML in die Seiten.

Quelle ist allein `daten/kundenstimmen.json`. Jede Seite trägt für ihren Block ein
Markierungspaar

    <!-- kundenstimme:<ort>:anfang -->
    <!-- kundenstimme:<ort>:ende -->

und dieses Skript ersetzt, was dazwischen steht. Es wird nichts nachgeladen: der
Text steht im HTML, damit Suchmaschinen und KI-Assistenten ihn lesen.

    python3 scripts/kundenstimmen.py                       # Standard: nur Abschnitte mit status "ok"
    python3 scripts/kundenstimmen.py --mit-pruefen         # nimmt die unbestätigten dazu (nur zur Ansicht!)
    python3 scripts/kundenstimmen.py --nennung branche     # wechselt die Nennung überall, wird in der JSON gemerkt
    python3 scripts/kundenstimmen.py --probe               # zeigt nur, was sich ändern würde

Nennungen: voll / vorname_studio / branche. `voll` lässt sich erst wählen, wenn in der
JSON ein Text dafür steht (der Nachname ist nicht bekannt).

Regeln
- Lindas Sätze stehen wörtlich in der JSON; das Skript fügt nichts hinzu ausser den
  knappen Überleitungen der Seite «Aus der Praxis» (klar als unser Text gesetzt).
- Bleibt für einen Ort kein Abschnitt übrig, steht dort nichts (keine leere Hülle).
- Mehrfach laufen lassen gibt dasselbe Ergebnis (Dateien nur bei Änderung geschrieben).
- Keine Bewertungs-Strukturdaten (Sterne, Review-Markup).

Danach, damit alles zusammenstimmt:
    python3 scripts/strukturdaten.py --nur faq.html     # FAQ-Strukturdaten (Frage «Gibt es Referenzen?»)
    python3 scripts/bot_wissen.py                       # Chat-Wissen, Abschnitt «Referenz»

Veröffentlicht nichts.
"""
from __future__ import annotations

import argparse
import html
import json
import re
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
JSON_PFAD = WURZEL / "daten" / "kundenstimmen.json"

# Seite -> Ort (Name im Markierungspaar)
SEITEN = {
    "index.html": "startseite",
    "referenzen.html": "referenzen",
    "service.html": "service",
    "visibility.html": "visibility",
    "kontakt.html": "kontakt",
    "offerte.html": "offerte",
    "ueber-uns.html": "ueber_uns",
    "faq.html": "faq",
}


def esc(t: str) -> str:
    return html.escape(t, quote=False)


# ---------------------------------------------------------------- Daten

def laden() -> dict:
    return json.loads(JSON_PFAD.read_text(encoding="utf-8"))


def nennung_waehlen(daten: dict, name: str | None) -> dict:
    kundin = daten["kundin"]
    name = name or kundin["gewaehlt"]
    if name not in kundin["nennungen"]:
        raise SystemExit(f"Unbekannte Nennung «{name}». Möglich: " + ", ".join(kundin["nennungen"]))
    n = kundin["nennungen"][name]
    if not n.get("attribution"):
        raise SystemExit(f"Nennung «{name}» ist noch leer ({n.get('hinweis', 'Text fehlt')}). Erst in der JSON ausfüllen.")
    return {"name": name, **n}


def sichtbar_filter(daten: dict, mit_pruefen: bool):
    nach_id = {a["id"]: a for a in daten["abschnitte"]}

    def sichtbar(i: str) -> dict | None:
        a = nach_id[i]  # unbekannte id soll laut scheitern
        if a["status"] == "ok" or (mit_pruefen and a["status"] == "pruefen"):
            return a
        return None

    def auswahl(ids: list[str]) -> list[dict]:
        return [a for a in (sichtbar(i) for i in ids) if a]

    return auswahl


def absaetze(abschnitte: list[dict]) -> list[str]:
    """Aufeinanderfolgende Abschnitte desselben Absatzes zu einem Text verbinden."""
    gruppen: list[tuple[str, list[str]]] = []
    for a in abschnitte:
        if gruppen and gruppen[-1][0] == a["absatz"]:
            gruppen[-1][1].append(a["text"])
        else:
            gruppen.append((a["absatz"], [a["text"]]))
    return [" ".join(t) for _, t in gruppen]


# ---------------------------------------------------------------- Bausteine

def karte(abschnitte: list[dict], nennung: dict, mehr: tuple[str, str] | None = None, breit: bool = False, einzug: str = "      ") -> str:
    """Die dunkle Zitatkarte (Muster components/cards/QuoteCard)."""
    ps = "\n".join(f'{einzug}    <p>«{esc(t)}»</p>' for t in absaetze(abschnitte))
    zeilen = [
        f'{einzug}<figure class="ks-karte{" ks-karte--breit" if breit else ""}">',
        f'{einzug}  <img class="ks-karte__logo" src="assets/logo-mark-white.png" alt="" width="53" height="32" loading="lazy" decoding="async">',
        f'{einzug}  <blockquote class="ks-karte__zitat">',
        ps,
        f'{einzug}  </blockquote>',
        f'{einzug}  <figcaption class="ks-karte__nennung">{esc(nennung["attribution"])}</figcaption>',
    ]
    if mehr:
        zeilen.append(f'{einzug}  <a class="ks-karte__mehr" href="{mehr[0]}">{esc(mehr[1])}</a>')
    zeilen.append(f'{einzug}</figure>')
    return "\n".join(zeilen)


def sektion(inner: str, id_: str | None = None, label: str = "Stimme einer Kundin") -> str:
    i = f' id="{id_}"' if id_ else ""
    return (f'    <section{i} class="sv-section sv-section--alt ks-sektion" aria-label="{esc(label)}">\n'
            f'      <div class="sv-wrap">\n{inner}\n      </div>\n    </section>')


def block_startseite(auswahl, nennung, daten) -> str:
    a = auswahl(daten["orte"]["startseite"])
    if not a:
        return ""
    return sektion(karte(a, nennung, mehr=("referenzen", "Die ganze Geschichte lesen →")), id_="kundenstimme", label="Eine Kundin erzählt")


def block_einfach(ort: str, mehr: tuple[str, str] | None = None):
    def bauen(auswahl, nennung, daten) -> str:
        a = auswahl(daten["orte"][ort])
        return sektion(karte(a, nennung, mehr=mehr)) if a else ""
    return bauen


def block_kontakt(ort: str):
    def bauen(auswahl, nennung, daten) -> str:
        """Unter dem Formular, innerhalb des vorhandenen Abschnitts (keine eigene Sektion)."""
        a = auswahl(daten["orte"][ort])
        if not a:
            return ""
        return '        <div class="ks-eingebettet">\n' + karte(a, nennung, einzug="          ") + "\n        </div>"
    return bauen


def block_faq(auswahl, nennung, daten) -> str:
    if not auswahl(daten["orte"]["faq"]):
        return ""
    return (
        '            <details class="sv-faq-item">\n'
        '              <summary><span>Gibt es Referenzen?</span><span aria-hidden="true">+</span></summary>\n'
        '              <p>Ja. Auf der Seite <a href="referenzen">Aus der Praxis</a> erzählt eine Kundin, wie ihr Beauty Studio '
        'heute mit uns arbeitet: mit einer eigenen Website samt eigenem Terminbuch. <a href="referenzen">Zur Geschichte →</a></p>\n'
        '            </details>'
    )


SCHRITTE = [
    ("ausgangslage", "AUSGANGSLAGE", "Wo sie stand.",
     "{Wer} beschreibt die Lage vor der Zusammenarbeit so:"),
    ("eingerichtet", "EINGERICHTET", "Was eingerichtet wurde.",
     "Danach haben wir ihr das Technische abgenommen. Sie schildert es so:"),
    ("heute", "HEUTE", "So arbeitet sie heute.",
     "Und so sieht der Alltag jetzt aus:"),
]


def block_referenzen(auswahl, nennung, daten) -> str:
    wer = nennung["wer"]
    teile: list[str] = []
    gezeigt: set[str] = set()
    for nr, (key, kicker, titel, bruecke) in enumerate(SCHRITTE):
        a = auswahl(daten["orte"]["referenzen"][key])
        if not a:
            continue
        gezeigt.update(x["id"] for x in a)
        bruecke = bruecke.replace("{Wer}", wer[:1].upper() + wer[1:])
        anm = ""
        for m in daten.get("referenzen_anmerkungen", []):
            if m["schritt"] == key and m["braucht"] in {x["id"] for x in a}:
                anm += f'\n        <p class="ks-unser ks-unser--klein">{esc(m["text"])}</p>'
        alt = " sv-section--alt" if len(teile) % 2 == 0 else ""
        teile.append(
            f'    <section id="{key}" class="sv-section{alt} ks-schritt" aria-labelledby="ks-{key}">\n'
            f'      <div class="sv-wrap">\n'
            f'        <div class="sv-center">\n'
            f'          <p class="sv-kicker">{kicker}</p>\n'
            f'          <h2 class="sv-title" id="ks-{key}">{esc(titel)}</h2>\n'
            f'          <p class="sv-lead ks-unser">{esc(bruecke)}</p>\n'
            f'        </div>\n'
            + karte(a, nennung, breit=True, einzug="        ") + anm + "\n"
            f'      </div>\n'
            f'    </section>'
        )
    if not teile:
        return ""
    # Verweise auf die Bereiche, nur wo die Aussage auch gezeigt wird
    links = [v for v in daten["referenzen_verweise"] if v["braucht"] in gezeigt]
    if links:
        knoepfe = "\n".join(
            f'          <a class="sv-button sv-button--cta" href="{v["seite"]}">{esc(v["titel"])} →</a>' for v in links)
        alt = " sv-section--alt" if len(teile) % 2 == 0 else ""
        teile.append(
            f'    <section id="bereiche" class="sv-section{alt} ks-verweise" aria-labelledby="ks-bereiche">\n'
            f'      <div class="sv-wrap sv-center">\n'
            f'        <p class="sv-kicker">MEHR ERFAHREN</p>\n'
            f'        <h2 class="sv-title" id="ks-bereiche">Die passenden Bereiche.</h2>\n'
            f'        <div class="sv-actions">\n{knoepfe}\n        </div>\n'
            f'      </div>\n'
            f'    </section>'
        )
    return "\n\n".join(teile)


BAUER = {
    "startseite": block_startseite,
    "referenzen": block_referenzen,
    "service": block_einfach("service"),
    "visibility": block_einfach("visibility"),
    "kontakt": block_kontakt("kontakt"),
    "offerte": block_kontakt("offerte"),
    "ueber_uns": block_einfach("ueber_uns", mehr=("referenzen", "Die ganze Geschichte lesen →")),
    "faq": block_faq,
}


# ---------------------------------------------------------------- Einsetzen

def einsetzen(text: str, ort: str, inhalt: str, datei: str) -> str:
    anfang = f"<!-- kundenstimme:{ort}:anfang -->"
    ende = f"<!-- kundenstimme:{ort}:ende -->"
    muster = re.compile(re.escape(anfang) + r".*?" + re.escape(ende), re.S)
    if len(muster.findall(text)) != 1:
        raise SystemExit(f"{datei}: Markierungspaar «{ort}» nicht genau einmal gefunden.")
    zeile = text[:text.index(anfang)].rsplit("\n", 1)[-1]
    einzug = zeile if not zeile.strip() else ""
    mitte = f"\n{inhalt}\n" if inhalt else "\n"
    ersatz = f"{anfang}{mitte}{einzug}{ende}"
    return muster.sub(lambda m: ersatz, text)


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--mit-pruefen", action="store_true", help="auch Abschnitte mit status «pruefen» (nur zur Ansicht)")
    ap.add_argument("--nennung", help="voll | vorname_studio | branche (wird in der JSON gemerkt)")
    ap.add_argument("--probe", action="store_true", help="nichts schreiben")
    args = ap.parse_args()

    daten = laden()
    nennung = nennung_waehlen(daten, args.nennung)
    auswahl = sichtbar_filter(daten, args.mit_pruefen)

    # Nennung wechseln = überall, auch im Chat-Wissen: darum in der JSON festhalten
    if args.nennung and args.nennung != daten["kundin"]["gewaehlt"] and not args.probe:
        roh = JSON_PFAD.read_text(encoding="utf-8")
        neu = re.sub(r'("gewaehlt":\s*")[a-z_]+(")', lambda m: m.group(1) + args.nennung + m.group(2), roh, count=1)
        JSON_PFAD.write_text(neu, encoding="utf-8")

    # Warnung: Text verrät mehr, als die gewählte Nennung preisgibt
    if nennung["name"] == "branche":
        for ort, ids in daten["orte"].items():
            flach = [i for v in (ids.values() if isinstance(ids, dict) else [ids]) for i in v]
            for a in auswahl(flach):
                for wort in a.get("verraet", []):
                    if wort in a["text"]:
                        print(f"  ⚠ Nennung «branche», aber der Text in «{ort}» enthält «{wort}» (Abschnitt {a['id']}).")

    geaendert, gleich = [], []
    for datei, ort in SEITEN.items():
        pfad = WURZEL / datei
        if not pfad.exists():
            print(f"  ⚠ Übersprungen, Datei fehlt: {datei}")
            continue
        alt = pfad.read_text(encoding="utf-8")
        neu = einsetzen(alt, ort, BAUER[ort](auswahl, nennung, daten), datei)
        if neu != alt:
            geaendert.append(datei)
            if not args.probe:
                pfad.write_text(neu, encoding="utf-8")
        else:
            gleich.append(datei)

    modus = "mit unbestätigten Abschnitten" if args.mit_pruefen else "Standard, nur bestätigte Abschnitte"
    print(f"Nennung: {nennung['name']} · {modus}" + (" · PROBE" if args.probe else ""))
    print(("Würde ändern: " if args.probe else "Geschrieben: ") + (", ".join(geaendert) or "nichts"))
    if gleich:
        print("Unverändert: " + ", ".join(gleich))


if __name__ == "__main__":
    sys.exit(main())
