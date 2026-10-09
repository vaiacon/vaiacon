"""Schreibt `vaia-wissen/wissen.md` neu aus dem echten Seitenstand.

    python3 scripts/bot_wissen.py                 # schreibt vaia-wissen/wissen.md
    python3 scripts/bot_wissen.py --ziel /pfad/probe.md   # Probelauf in eine andere Datei

Das ist das Wissen, das dem Chat auf vaiacon.ch bei jeder Frage mitgeschickt
wird. Frueher lag es nur auf dem Server und wurde von Hand gepflegt, und es ist
stillschweigend veraltet. Darum wird die Datei erzeugt statt gepflegt.

Quellen: die Seiten dieses Repos und der Preiskatalog `daten/preise.json`
(Quelle der Wahrheit fuer alle Preise). Es gibt keine Academy und keine
Gratis-Kurse mehr; Preise stehen nur aus dem Katalog im Wissen.
"""
from __future__ import annotations

import html
import json
import re
import subprocess
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
ZIEL = WURZEL / "vaia-wissen" / "wissen.md"
KATALOG = json.loads((WURZEL / "daten" / "preise.json").read_text(encoding="utf-8"))
BRANCHEN = json.loads((WURZEL / "daten" / "branchen.json").read_text(encoding="utf-8"))

# Reihenfolge zaehlt: So liest der Chat die Website von vorn nach hinten.
SEITEN = [
    ("index.html", "Startseite"),
    ("ueber-uns.html", "Über uns"),
    ("learning.html", "KI-Kompetenz (inkl. KI-Standortbestimmung)"),
    ("visibility.html", "Sichtbarkeit — gefunden werden"),
    ("bot.html", "Automationen"),
    ("service.html", "Begleitung"),
    ("offerte.html", "Offerten-Tool"),
    ("ki-kmu-news/index.html", "KI-News für KMU"),
    ("faq.html", "Häufige Fragen"),
    ("kontakt.html", "Kontakt"),
    ("datenschutz.html", "Datenschutz und Impressum"),
    ("agb.html", "Allgemeine Geschäftsbedingungen"),
]


def chf(zahl: float) -> str:
    ganz = abs(zahl - round(zahl)) < 0.005
    text = f"{round(zahl)}" if ganz else f"{zahl:.2f}"
    vor, _, nach = text.partition(".")
    vor = re.sub(r"(?<=\d)(?=(\d{3})+$)", "'", vor)
    return vor + ("." + nach if nach else "")


def preisliste() -> list[str]:
    z = [f"{KATALOG['mwst_hinweis']} Die Preise sind Richtwerte und gelten {KATALOG['gueltigkeit_tage']} Tage. "
         "Eine Richtofferte stellt man im Offerten-Tool (vaiacon.ch/offerte) zusammen; "
         "verbindlich wird sie erst nach Bestätigung durch vaiacon.", ""]
    for b in KATALOG["bereiche"]:
        z.append(f"### {b['titel']}")
        z.append("")
        for p in b["positionen"]:
            t = ("ab " if p["ab"] else "") + "CHF " + chf(p["preis"])
            if p["einheit"] != "pauschal":
                t += " " + p["einheit"]
            zusatz = f" ({p['hinweis']})" if p["hinweis"] else ""
            z.append(f"- {p['titel']}: {t}{zusatz}")
        z.append("")
    return z


def seitentext(pfad: Path) -> str:
    """Sichtbarer Text einer Seite — ohne Kopfzeile, Menü und Fusszeile."""
    t = pfad.read_text(encoding="utf-8")
    # Kundenstimmen kommen aus daten/kundenstimmen.json (Abschnitt «Referenz»), nicht aus den Seiten
    t = re.sub(r"(?s)<!-- kundenstimme:(\w+):anfang -->.*?<!-- kundenstimme:\1:ende -->", " ", t)
    t = re.sub(r"(?s)<(script|style|head|header|footer|nav)\b.*?</\1>", " ", t)
    t = re.sub(r"(?s)<!--.*?-->", " ", t)
    # Absatzgrenzen erhalten, damit der Text lesbar bleibt statt zu einem Block zu verkleben
    t = re.sub(r"</(p|h1|h2|h3|h4|li|summary|article|section|div)>", "\n", t)
    t = re.sub(r"<[^>]+>", " ", t)
    t = html.unescape(t)
    zeilen = [re.sub(r"[ \t]+", " ", z).strip() for z in t.split("\n")]
    return "\n".join(z for z in zeilen if z)


def referenz() -> list[str]:
    """Abschnitt «Referenz» aus der Kundenstimmen-Quelle: nur Status ok, gewählte Nennung."""
    d = json.loads((WURZEL / "daten" / "kundenstimmen.json").read_text(encoding="utf-8"))
    k = d["kundin"]
    n = k["nennungen"][k["gewaehlt"]]
    if not n.get("attribution"):
        return []
    nach_id = {a["id"]: a for a in d["abschnitte"]}
    sichtbar = [nach_id[i] for i in d["orte"]["chatbot"] if nach_id[i]["status"] == "ok"]
    if not sichtbar:
        return []
    z = ["## Referenz", "",
         "Wenn jemand nach Referenzen oder Erfahrungen anderer Kundinnen fragt: Es gibt eine",
         "Kundenstimme, die wir veröffentlichen dürfen. Gib sie wörtlich wieder, ergänze nichts",
         "und nenne keine Zahlen dazu, die hier nicht stehen. Die ganze Geschichte steht auf",
         "https://vaiacon.ch/referenzen (Seite «Aus der Praxis»).",
         "Mit «Academy» meint die Kundin ein eigenes Kursangebot ihres Studios, nicht eine",
         "Academy von vaiacon (die es nicht gibt).", "",
         f"Von: {n['attribution']}", ""]
    gruppen: list[tuple[str, list[str]]] = []
    for a in sichtbar:
        if gruppen and gruppen[-1][0] == a["absatz"]:
            gruppen[-1][1].append(a["text"])
        else:
            gruppen.append((a["absatz"], [a["text"]]))
    for _, texte in gruppen:
        z.append("«" + " ".join(texte) + "»")
        z.append("")
    return z


def stand() -> str:
    """Stand des Repos, nicht die Uhrzeit des Laufs.

    Absichtlich ohne `datetime.now()`: Sonst faellt bei jedem Lauf eine
    Scheinaenderung an, und man sieht in der Versionsverwaltung nicht mehr,
    ob sich am Wissen wirklich etwas geaendert hat. So ist zweimal Laufen
    hintereinander zeichengleich.
    """
    try:
        return subprocess.run(
            ["git", "log", "-1", "--format=%cd · Eintrag %h %s", "--date=format:%d.%m.%Y"],
            cwd=WURZEL, capture_output=True, text=True, check=True).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return "unbekannt (keine Versionsverwaltung erreichbar)"


def bauen() -> tuple[str, list[str]]:
    t: list[str] = []
    t.append("# Wissen für Vaia — den Chat auf vaiacon.ch")
    t.append("")
    t.append("> **Diese Datei wird erzeugt, nicht von Hand gepflegt.**")
    t.append("> Neu schreiben mit `python3 scripts/bot_wissen.py` im Website-Repo.")
    t.append("> Änderungen von Hand gehen beim nächsten Lauf verloren — ändere die")
    t.append("> Website, nicht diese Datei.")
    t.append(f"> Stand: {stand()}")
    t.append("")
    t.append("## Wie du antwortest")
    t.append("")
    t.append("- Deutsch (Schweiz), immer «ss» statt «ß». Die Besucher per Sie, wir als «wir».")
    t.append("- Kurz und ohne Fachjargon. «Grüezi!» als Begrüssung.")
    t.append("- Preise nennst du nur aus der Preisübersicht unten, mit «inklusive MWST».")
    t.append("  Was hier nicht steht, weisst du nicht. Dann sag das und verweise auf")
    t.append("  hallo@vaiacon.ch — erfinde keine Preise, Fristen oder Zusagen.")
    t.append("- Es gibt keine Academy und keine Gratis-Kurse. Kostenlos sind nur das")
    t.append("  Erstgespräch, die KI-Standortbestimmung (Selbsttest für Führungskräfte),")
    t.append("  die Erstanalyse zur Zeitersparnis und der automatische Check der Website.")
    t.append("- Nimm keine Personendaten entgegen. Wer ein persönliches Anliegen hat,")
    t.append("  soll schreiben oder einen Termin buchen.")
    t.append("")
    t.append("## Die Firma")
    t.append("")
    t.append("vaiacon GmbH, Lehenstrasse 74, 8037 Zürich, Schweiz · hallo@vaiacon.ch")
    t.append("")
    t.append("Wir bringen Schweizer KMU dazu, KI im Alltag zu nutzen, in drei Bereichen:")
    t.append("KI-Kompetenz, Sichtbarkeit und Automationen; auf Wunsch mit laufender")
    t.append("Begleitung. Verständlich, persönlich und ohne Verkaufsdruck. Kundendaten")
    t.append("bleiben nach revDSG auf Schweizer Infrastruktur.")
    t.append("")
    t.append("## Preisübersicht (aus dem Katalog daten/preise.json)")
    t.append("")
    t.extend(preisliste())
    t.append("Hinweis: Die KI-Standortanalyse im Betrieb (bezahlt, Begleitung) ist nicht die")
    t.append("kostenlose KI-Standortbestimmung (Selbsttest für Führungskräfte).")
    t.append("")

    t.extend(referenz())

    t.append("## Der Text der Website")
    t.append("")
    fehlend: list[str] = []
    for datei, name in SEITEN:
        pfad = WURZEL / datei
        if not pfad.exists():
            fehlend.append(datei)
            continue
        t.append(f"### {name}")
        t.append("")
        t.append(seitentext(pfad))
        t.append("")

    # Branchen-Umschalter der Preisleiter (daten/branchen.json): realistische Use Cases je Branche.
    t.append("### Branchen")
    t.append("")
    t.append("Realistische Use Cases je Branche, geordnet nach den drei Sprossen (Einfache, Mittelgrosse, Komplette Automation):")
    t.append("")
    for k, b in BRANCHEN.items():
        t.append(f"#### {b['name']}")
        t.append("")
        if b.get("nervt"):
            t.append("Das nervt: " + " ".join(b["nervt"]))
            t.append("")
        for sk, nm in (("einfach", "Einfache Automation"), ("verbunden", "Mittelgrosse Automation"), ("ganzer_ablauf", "Komplette Automation")):
            t.append(f"{nm}:")
            for u in b.get(sk, []):
                t.append(f"- {u['titel']}: {u['satz']}")
            t.append("")

    return "\n".join(t).rstrip() + "\n", fehlend


def main() -> None:
    ziel = ZIEL
    if "--ziel" in sys.argv:
        ziel = Path(sys.argv[sys.argv.index("--ziel") + 1]).expanduser()
    inhalt, fehlend = bauen()
    ziel.parent.mkdir(parents=True, exist_ok=True)
    vorher = ziel.read_text(encoding="utf-8") if ziel.exists() else ""
    ziel.write_text(inhalt, encoding="utf-8")

    zeichen = len(inhalt)
    print(f"Geschrieben: {ziel}")
    print(f"  {zeichen} Zeichen, rund {zeichen // 4} Token je Frage")
    if vorher and vorher != inhalt:
        print("  Inhalt hat sich gegenüber dem letzten Lauf geändert.")
    elif vorher:
        print("  Unverändert.")

    # Nicht stillschweigend weglassen: Wer eine Seite vermisst, soll es hier sehen.
    for datei in fehlend:
        print(f"  ⚠ Übersprungen, Datei fehlt: {datei}")


if __name__ == "__main__":
    main()
