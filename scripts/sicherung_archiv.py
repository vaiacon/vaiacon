"""Packt den aktuellen Stand der Website als datiertes Archiv.

    python3 scripts/sicherung_archiv.py

Legt `~/Documents/vaiacon/Archiv/vaiacon-website-JJJJ-MM-TT.zip` an. Laeuft das
Skript mehrmals am selben Tag, wird das Archiv des Tages ueberschrieben — es gibt
also je Tag genau einen Stand, nicht je Push einen.

Das Archiv liegt bewusst NICHT in `~/Documents/vaiacon/Website`. Jener Ordner ist
eine Spiegelung, die bei jedem Abgleich mit `--delete` ueberschrieben wird; ein
Archiv darin waere bei der naechsten Aenderung weg oder muesste dauerhaft
ausgenommen werden.

Im Archiv liegt zusaetzlich `STAND.txt` mit Datum, Zweig und Eintrag aus der
Versionsverwaltung — damit spaeter nachvollziehbar ist, welcher Stand das war.

Optionen:
    --behalten N      Wie viele Archive stehen bleiben (Standard: 10).
    --alle-behalten   Nichts loeschen, egal wie viele es sind.
    --probe           Zeigt nur, was passieren wuerde.
"""
from __future__ import annotations

import argparse
import subprocess
import zipfile
from datetime import datetime
from pathlib import Path

QUELLE = Path(__file__).resolve().parents[1]
ZIEL = Path.home() / "Documents" / "vaiacon" / "Archiv"

# Was nicht ins Archiv gehoert. `.git` ist die Versionsverwaltung — die liegt
# vollstaendig auf GitHub und wuerde das Archiv nur aufblaehen.
AUSNAHMEN_ORDNER = {".git", "__pycache__", ".bau"}
AUSNAHMEN_DATEIEN = {".DS_Store"}
AUSNAHMEN_ENDUNGEN = {".zip", ".pyc"}


def stand_notiz() -> str:
    """Datum, Zweig und letzter Eintrag — als Beipackzettel im Archiv."""
    zeilen = [f"Stand vom {datetime.now():%d.%m.%Y, %H:%M Uhr}", ""]
    for beschriftung, befehl in [
        ("Zweig", ["git", "rev-parse", "--abbrev-ref", "HEAD"]),
        ("Eintrag", ["git", "log", "-1", "--format=%H"]),
        ("Beschreibung", ["git", "log", "-1", "--format=%s"]),
        ("Eingetragen am", ["git", "log", "-1", "--format=%cd", "--date=format:%d.%m.%Y, %H:%M Uhr"]),
    ]:
        try:
            wert = subprocess.run(befehl, cwd=QUELLE, capture_output=True,
                                  text=True, check=True).stdout.strip()
        except (subprocess.CalledProcessError, FileNotFoundError):
            wert = "unbekannt"
        zeilen.append(f"{beschriftung}: {wert}")

    try:
        offen = subprocess.run(["git", "status", "--porcelain"], cwd=QUELLE,
                               capture_output=True, text=True, check=True).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        offen = ""
    zeilen += ["", "Nicht eingetragene Aenderungen: " + (offen if offen else "keine")]
    return "\n".join(zeilen) + "\n"


def dateien() -> list[Path]:
    gefunden = []
    for pfad in QUELLE.rglob("*"):
        if not pfad.is_file():
            continue
        teile = set(pfad.relative_to(QUELLE).parts[:-1])
        if teile & AUSNAHMEN_ORDNER:
            continue
        if pfad.name in AUSNAHMEN_DATEIEN or pfad.suffix in AUSNAHMEN_ENDUNGEN:
            continue
        gefunden.append(pfad)
    return sorted(gefunden)


def aufraeumen(behalten: int, probe: bool) -> None:
    alle = sorted(ZIEL.glob("vaiacon-website-*.zip"))
    zuviel = alle[:-behalten] if behalten > 0 else []
    if not zuviel:
        print(f"Archive im Ordner: {len(alle)} — nichts zu entfernen (behalten: {behalten}).")
        return
    for datei in zuviel:
        gross = datei.stat().st_size / 1024 / 1024
        if probe:
            print(f"  wuerde entfernen: {datei.name} ({gross:.0f} MB)")
        else:
            datei.unlink()
            print(f"  entfernt: {datei.name} ({gross:.0f} MB)")
    print(f"Archive im Ordner: {len(alle) - (0 if probe else len(zuviel))}")


def main() -> None:
    p = argparse.ArgumentParser(description="Datiertes Archiv der Website anlegen.")
    p.add_argument("--behalten", type=int, default=10,
                   help="Wie viele Archive stehen bleiben (Standard: 10).")
    p.add_argument("--alle-behalten", action="store_true", help="Nichts loeschen.")
    p.add_argument("--probe", action="store_true", help="Nur zeigen, nichts schreiben.")
    a = p.parse_args()

    liste = dateien()
    gesamt = sum(f.stat().st_size for f in liste) / 1024 / 1024
    ziel = ZIEL / f"vaiacon-website-{datetime.now():%Y-%m-%d}.zip"

    print(f"Quelle:  {QUELLE}")
    print(f"Archiv:  {ziel}")
    print(f"Inhalt:  {len(liste)} Dateien, {gesamt:.0f} MB ungepackt")
    if ziel.exists():
        print("Hinweis: Ein Archiv von heute steht schon da und wird ersetzt.")

    if a.probe:
        print("\nProbe — nichts geschrieben.")
        aufraeumen(0 if a.alle_behalten else a.behalten, probe=True)
        return

    ZIEL.mkdir(parents=True, exist_ok=True)
    unfertig = ziel.with_suffix(".zip.teil")
    try:
        with zipfile.ZipFile(unfertig, "w", zipfile.ZIP_DEFLATED, compresslevel=6) as z:
            for datei in liste:
                z.write(datei, Path("vaiacon-website") / datei.relative_to(QUELLE))
            z.writestr("vaiacon-website/STAND.txt", stand_notiz())
        unfertig.replace(ziel)   # erst umbenennen, wenn alles drin ist
    except BaseException:
        unfertig.unlink(missing_ok=True)
        raise

    print(f"\nGeschrieben: {ziel.name} ({ziel.stat().st_size / 1024 / 1024:.0f} MB gepackt)")
    aufraeumen(0 if a.alle_behalten else a.behalten, probe=False)


if __name__ == "__main__":
    main()
