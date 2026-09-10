"""Schreibt `bot/wissen.md` neu aus dem echten Seitenstand.

    python3 scripts/bot_wissen.py

Das ist das Wissen, das dem Chat auf vaiacon.ch bei jeder Frage mitgeschickt
wird. Frueher lag es nur auf dem Server und wurde von Hand gepflegt — dabei ist
es zweimal stillschweigend veraltet: Der Chat nannte noch Preise fuer die
Academy, als die laengst kostenlos war.

Darum wird die Datei erzeugt statt gepflegt. Quellen sind die Seiten dieses
Repos und `academy/academy-daten.js`. Wer den Seitentext aendert, laesst das
Skript laufen — dann kann der Chat gar nicht mehr etwas anderes erzaehlen als
die Website.

Braucht JavaScriptCore fuer die Academy-Daten (auf macOS vorhanden).
"""
from __future__ import annotations

import html
import json
import re
import subprocess
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
ZIEL = WURZEL / "bot" / "wissen.md"
JSC = Path("/System/Library/Frameworks/JavaScriptCore.framework/Versions/A/Helpers/jsc")

# Reihenfolge zaehlt: So liest der Chat die Website von vorn nach hinten.
SEITEN = [
    ("index.html", "Startseite"),
    ("ueber-uns.html", "Über uns"),
    ("visibility.html", "vaiaconVisibility — gefunden werden"),
    ("academy/index.html", "vaiaconAcademy — Selbstlernen"),
    ("learning.html", "vaiaconLearning — Schulung vor Ort"),
    ("bot.html", "vaiaconBot — Automation"),
    ("service.html", "vaiaconService — Betreuung"),
    ("faq.html", "Häufige Fragen"),
    ("kontakt.html", "Kontakt"),
    # Steht noch nicht in main, sondern im Zweig «datenschutz-und-chat-hinweis».
    # Der Eintrag darf trotzdem hier stehen: Fehlt die Datei, wird sie
    # uebersprungen und gemeldet. Sobald die Seite da ist, kann Vaia
    # Datenschutzfragen aus dem eigenen Text beantworten, statt zu raten.
    ("datenschutz.html", "Datenschutz und Impressum"),
]


def seitentext(pfad: Path) -> str:
    """Sichtbarer Text einer Seite — ohne Kopfzeile, Menü und Fusszeile."""
    t = pfad.read_text(encoding="utf-8")
    t = re.sub(r"(?s)<(script|style|head|header|footer|nav)\b.*?</\1>", " ", t)
    t = re.sub(r"(?s)<!--.*?-->", " ", t)
    # Absatzgrenzen erhalten, damit der Text lesbar bleibt statt zu einem Block zu verkleben
    t = re.sub(r"</(p|h1|h2|h3|h4|li|summary|article|section|div)>", "\n", t)
    t = re.sub(r"<[^>]+>", " ", t)
    t = html.unescape(t)
    zeilen = [re.sub(r"[ \t]+", " ", z).strip() for z in t.split("\n")]
    return "\n".join(z for z in zeilen if z)


def academy_module() -> list[dict]:
    """Liest die Lernpfade aus academy-daten.js — der massgeblichen Quelle."""
    skript = (
        "var window={};"
        f"eval(readFile({json.dumps(str(WURZEL / 'academy' / 'academy-daten.js'))}));"
        "var aus = window.ACADEMY_PLANS.map(function (m) {"
        "  return { n: m.n, titel: m.title, stufe: m.level, dauer: m.hours,"
        "           nutzen: m.nutzen,"
        "           lektionen: m.lessons.map(function (l) {"
        "             return { titel: l[0], art: l[1], dauer: l[2], inhalt: !!l[3] };"
        "           }) };"
        "});"
        "print(JSON.stringify(aus));"
    )
    r = subprocess.run([str(JSC), "-e", skript], capture_output=True, text=True, check=True)
    return json.loads(r.stdout)


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


def bauen() -> str:
    module = academy_module()
    lektionen_gesamt = sum(len(m["lektionen"]) for m in module)

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
    t.append("- Was hier nicht steht, weisst du nicht. Dann sag das und verweise auf")
    t.append("  hallo@vaiacon.ch — erfinde keine Preise, Fristen oder Zusagen.")
    t.append("- Nimm keine Personendaten entgegen. Wer ein persönliches Anliegen hat,")
    t.append("  soll schreiben oder einen Termin buchen.")
    t.append("")
    t.append("## Die Firma")
    t.append("")
    t.append("vaiacon GmbH, Lehenstrasse 74, 8037 Zürich, Schweiz · hallo@vaiacon.ch")
    t.append("")
    t.append("Wir bringen Schweizer KMU dazu, KI im Alltag zu nutzen — verständlich,")
    t.append("persönlich und ohne Verkaufsdruck. Kundendaten bleiben nach revDSG auf")
    t.append("Schweizer Infrastruktur.")
    t.append("")

    t.append("## Die vaiaconAcademy im Überblick")
    t.append("")
    t.append(f"{len(module)} Lernpfade mit {lektionen_gesamt} Lektionen. **Alles kostenlos** — "
             "kein Abo, keine Verpflichtungen, keine versteckten Kosten, kein Konto und")
    t.append("keine Anmeldung. Es gibt keinen Pro-Zugang und keinen Team-Zugang gegen Geld.")
    t.append("")
    t.append("| Nr | Lernpfad | Stufe | Dauer | Lektionen |")
    t.append("|---|---|---|---|---|")
    for m in module:
        t.append(f"| {m['n']} | {m['titel']} | {m['stufe']} | {m['dauer']} | "
                 f"{len(m['lektionen'])} |")
    t.append("")

    for m in module:
        t.append(f"### Lernpfad {m['n']} — {m['titel']}")
        t.append("")
        t.append(f"{m['nutzen']}")
        t.append("")
        for l in m["lektionen"]:
            t.append(f"- {l['titel']} ({l['art']}, {l['dauer']})")
        t.append("")

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

    return "\n".join(t).rstrip() + "\n", fehlend


def main() -> None:
    inhalt, fehlend = bauen()
    ZIEL.parent.mkdir(parents=True, exist_ok=True)
    vorher = ZIEL.read_text(encoding="utf-8") if ZIEL.exists() else ""
    ZIEL.write_text(inhalt, encoding="utf-8")

    zeichen = len(inhalt)
    print(f"Geschrieben: {ZIEL.relative_to(WURZEL)}")
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
