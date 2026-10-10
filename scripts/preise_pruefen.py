"""Prueft, dass alle Preise auf vaiacon.ch aus einer Quelle kommen: daten/preise.json.

    python3 scripts/preise_pruefen.py            # alles pruefen, Exit-Code 1 bei Rot
    python3 scripts/preise_pruefen.py --alle     # nicht nach 12 Meldungen je Pruefung kuerzen
    python3 scripts/preise_pruefen.py --dienste  # zusaetzlich https://vaiacon.ch/daten/preise.json
                                                 # gegen die lokale Datei halten (nur Hinweis)

Geprueft wird:
  a) Schema des Katalogs (Pflichtfelder, Status, Sprosse, betreuung_id, ids, Saetze)
  b) jede Zahl «CHF 1'300» oder «1'300» in den HTML-Seiten der Wurzel ausserhalb eines
     Elements mit data-preis*-Attribut (Jahreszahlen, 100'000 in agb.html, JSON-LD erlaubt)
  c) der Ersatztext jedes data-preis-Elements gegen den Katalog
  d) verbotene Woerter in den Seiten
  e) llms.txt und vaia-wissen/wissen.md gegen den Katalog (erzeugt von strukturdaten.py
     und bot_wissen.py; nach jeder Preisaenderung beide Skripte laufen lassen)

Nur Standardbibliothek. Aendert nichts, schreibt nichts.
"""
from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

WURZEL = Path(__file__).resolve().parents[1]
KATALOG_PFAD = WURZEL / "daten" / "preise.json"
KUERZEN = 12

PFLICHT = ("id", "titel", "preis", "einheit", "art", "umfang", "status", "hinweis")
STATUS = {"fest", "produkttest", "pruefen"}
SPROSSEN = {"einfach", "verbunden", "ganzer_ablauf", None}
SAETZE = ("ab_preis", "betreuung", "fremdkosten", "beispiel_jahr", "maengel", "abnahme", "gueltigkeit")

# Seiten ohne Wortpruefung: rechtliche Texte und News (eigene Sprache, eigene Quelle)
OHNE_WORTPRUEFUNG = {"agb.html", "datenschutz.html", "impressum.html"}
# Erlaubte Zahlen ausserhalb von data-preis: Datei -> Texte
ERLAUBT = {"agb.html": ("100'000", "100’000")}

VERBOTEN = [
    ("KI-Agent", r"KI-Agent(?:en|s)?\b"),
    ("Agent", r"\bAgent(?:en|s)?\b"),
    ("Retainer", r"\bRetainer\w*"),
    ("Abo", r"\bAbos?\b"),
    ("statt CHF", r"statt\s+CHF"),
    ("garantiert", r"\bgarantiert\b"),
    ("typisch", r"\btypisch\w*"),
    ("Geld zurück", r"Geld\s+zur(?:ü|ue)ck"),
    ("Integration", r"\bIntegration\w*"),
]

# «CHF 0» (Platzhalter einer leeren Summe) ist kein Preis
ZAHL = re.compile(r"CHF(?:\s|&nbsp;|&#160;|\u00a0)?(?!0(?![\d'’.,]))\d|\d['’]\d{3}")
ELEMENT = re.compile(r"<(\w+)\b[^>]*\bdata-preis[\w-]*(?:=\"[^\"]*\")?[^>]*>(.*?)</\1\s*>", re.S)


class Bericht:
    def __init__(self, alle: bool) -> None:
        self.alle = alle
        self.rot = 0
        self.abschnitte: list[tuple[str, list[str]]] = []

    def pruefung(self, titel: str, meldungen: list[str]) -> None:
        self.abschnitte.append((titel, meldungen))
        self.rot += len(meldungen)

    def ausgeben(self) -> None:
        for titel, m in self.abschnitte:
            if not m:
                print(f"[gruen] {titel}")
                continue
            print(f"[ROT]   {titel}: {len(m)}")
            zeigen = m if self.alle else m[:KUERZEN]
            for z in zeigen:
                print(f"          {z}")
            if len(zeigen) < len(m):
                print(f"          ... und {len(m) - len(zeigen)} weitere (--alle zeigt alle)")
        print()
        print("ROT: " + str(self.rot) + " Meldung(en)" if self.rot else "GRUEN: Katalog, Seiten und Texte stimmen.")


# ---------- Hilfen ----------

def chf(zahl: float) -> str:
    ganz = abs(zahl - round(zahl)) < 0.005
    text = f"{round(zahl)}" if ganz else f"{zahl:.2f}"
    vor, _, nach = text.partition(".")
    vor = re.sub(r"(?<=\d)(?=(\d{3})+$)", "'", vor)
    return vor + ("." + nach if nach else "")


def preis_text(pos: dict, form: str | None = None) -> str:
    t = ("ab " if pos.get("ab") else "") + "CHF " + chf(pos["preis"])
    if form != "betrag" and pos.get("einheit") not in (None, "pauschal"):
        t += " " + pos["einheit"]
    return t


def norm(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    text = html.unescape(text).replace(" ", " ")
    return re.sub(r"\s+", " ", text).strip()


def positionen(katalog: dict) -> dict[str, dict]:
    return {p["id"]: p for b in katalog.get("bereiche", []) for p in b.get("positionen", []) if "id" in p}


def zeile_von(text: str, pos: int) -> int:
    return text.count("\n", 0, pos) + 1


def leeren(text: str, muster: str, flags: int = re.S) -> str:
    """Treffer durch Leerzeichen ersetzen, Zeilenumbrueche behalten (Zeilennummern bleiben)."""
    return re.sub(muster, lambda m: re.sub(r"[^\n]", " ", m.group(0)), text, flags=flags)


def ohne_unsichtbares(text: str) -> str:
    text = leeren(text, r"<!--.*?-->")
    text = leeren(text, r"<script\b.*?</script>", re.S | re.I)
    text = leeren(text, r"<style\b.*?</style>", re.S | re.I)
    return text


def seiten() -> list[Path]:
    # Arbeitsdateien anderer Agenten (_t_*.html, zz_*.html) sind keine Seiten
    return sorted(f for f in WURZEL.glob("*.html") if not f.name.startswith(("_", "zz_")))


# ---------- a) Schema ----------

def schema(katalog: dict) -> list[str]:
    m: list[str] = []
    for k in ("stand", "waehrung", "mwst_inklusive", "mwst_satz", "mwst_hinweis", "gueltigkeit_tage", "saetze", "bereiche"):
        if k not in katalog:
            m.append(f"Kopf: Feld «{k}» fehlt")
    saetze = katalog.get("saetze") or {}
    for k in SAETZE:
        if not isinstance(saetze.get(k), str) or not saetze.get(k):
            m.append(f"saetze.{k} fehlt oder ist leer")
    ids: dict[str, int] = {}
    alle = positionen(katalog)
    for b in katalog.get("bereiche", []):
        for p in b.get("positionen", []):
            pid = p.get("id", "?")
            ids[pid] = ids.get(pid, 0) + 1
            for f in PFLICHT:
                if f not in p:
                    m.append(f"{pid}: Pflichtfeld «{f}» fehlt")
            if not isinstance(p.get("preis"), (int, float)) or isinstance(p.get("preis"), bool):
                m.append(f"{pid}: preis ist keine Zahl")
            if p.get("status") not in STATUS:
                m.append(f"{pid}: status «{p.get('status')}» nicht in {sorted(STATUS)}")
            if b.get("id") == "automationen" and p.get("sprosse") not in SPROSSEN:
                m.append(f"{pid}: sprosse «{p.get('sprosse')}» ungueltig")
            if b.get("id") == "automationen" and "sprosse" not in p:
                m.append(f"{pid}: Feld «sprosse» fehlt (Automation)")
            bid = p.get("betreuung_id")
            if bid and bid not in alle:
                m.append(f"{pid}: betreuung_id «{bid}» gibt es nicht")
            if not (p.get("umfang") or "").strip():
                m.append(f"{pid}: umfang ist leer")
    for pid, n in ids.items():
        if n > 1:
            m.append(f"id «{pid}» kommt {n}x vor")
    return m


# ---------- b) Zahlen ausserhalb data-preis ----------

def freie_zahlen() -> list[str]:
    m: list[str] = []
    for datei in seiten():
        roh = datei.read_text(encoding="utf-8")
        text = ohne_unsichtbares(roh)
        gedeckt = [(e.start(), e.end()) for e in ELEMENT.finditer(text)]
        # Elemente, die schon im Rohtext (JSON-LD) nicht stehen, sind oben leer; Rest scannen
        erlaubt = ERLAUBT.get(datei.name, ())
        for z in ZAHL.finditer(text):
            if any(a <= z.start() < b for a, b in gedeckt):
                continue
            a = max(0, z.start() - 28)
            ausschnitt = norm(text[a:z.end() + 32])
            if any(e in ausschnitt for e in erlaubt):
                continue
            m.append(f"{datei.name}:{zeile_von(text, z.start())}  «{ausschnitt}»")
    return m


# ---------- c) Ersatztexte ----------

def ersatztexte(katalog: dict) -> list[str]:
    m: list[str] = []
    pos = positionen(katalog)
    saetze = katalog.get("saetze", {})
    felder = ("titel", "umfang", "hinweis", "fremdkosten", "folgekosten")
    for datei in seiten():
        text = ohne_unsichtbares(datei.read_text(encoding="utf-8"))
        for e in ELEMENT.finditer(text):
            kopf = text[e.start():text.index(">", e.start()) + 1]
            inhalt = norm(e.group(2))
            ort = f"{datei.name}:{zeile_von(text, e.start())}"

            def attr(n: str) -> str | None:
                a = re.search(r"\b" + n + r"=\"([^\"]*)\"", kopf)
                return a.group(1) if a else None

            if "data-preis-mwst" in kopf:
                proz = f"{katalog.get('mwst_satz', 0):g}".replace(".", ",")
                if re.search(r"\d", inhalt) and proz + " %" not in inhalt:
                    m.append(f"{ort}  MwSt-Text «{inhalt[:50]}» nennt nicht {proz} %")
                continue
            if attr("data-preis-satz") is not None:
                k = attr("data-preis-satz")
                if k not in saetze:
                    m.append(f"{ort}  Satz «{k}» gibt es nicht")
                elif inhalt != norm(saetze[k]):
                    m.append(f"{ort}  Satz «{k}» weicht ab: «{inhalt[:60]}»")
                continue
            if attr("data-preis-staffel") is not None:
                p = pos.get(attr("data-preis-staffel") or "")
                if not p or not p.get("staffel"):
                    m.append(f"{ort}  Staffel «{attr('data-preis-staffel')}» gibt es nicht")
                    continue
                soll = (f"jede weitere Minute CHF {chf(p['staffel'][0]['preis'])}" if len(p["staffel"]) == 1 else " / ".join(chf(s["preis"]) for s in p["staffel"]) + " je Lernminute")
                if inhalt != soll:
                    m.append(f"{ort}  Staffel «{inhalt}» statt «{soll}»")
                continue
            pid = attr("data-preis")
            if pid is None:
                continue
            p = pos.get(pid)
            if not p:
                m.append(f"{ort}  Position «{pid}» gibt es nicht")
                continue
            form = attr("data-preis-form")
            if form in felder:
                soll = norm(p.get(form) or "")
                if soll and inhalt != soll:
                    m.append(f"{ort}  {pid}/{form}: «{inhalt[:50]}» statt «{soll[:50]}»")
                continue
            if form == "zahl":
                soll = chf(p["preis"])
            elif form == "ab":
                soll = ("ab " if p.get("ab") else "") + "CHF " + chf(p["preis"])
            elif form == "jahr":
                b = pos.get(p.get("betreuung_id") or "")
                gesamt = p["preis"] + 12 * b["preis"] if b else (12 * p["preis"] if p.get("art") == "monatlich" else p["preis"])
                soll = ("ab " if p.get("ab") else "") + "CHF " + chf(gesamt)
            else:
                soll = preis_text(p, form)
            if inhalt != soll:
                m.append(f"{ort}  {pid}: «{inhalt}» statt «{soll}»")
    return m


# ---------- d) verbotene Woerter ----------

ATTR_OHNE_TEXT = re.compile(
    r"\s(?:class|id|href|src|srcset|style|for|name|type|rel|action|method|d|viewBox|loading|decoding|"
    r"data-[\w-]+|on\w+)=\"[^\"]*\"")


def woerter() -> list[str]:
    m: list[str] = []
    for datei in seiten():
        if datei.name in OHNE_WORTPRUEFUNG:
            continue
        text = ohne_unsichtbares(datei.read_text(encoding="utf-8"))
        text = leeren(text, ATTR_OHNE_TEXT.pattern, re.S)
        text = re.sub(r"</?\w+", lambda t: " " * len(t.group(0)), text)   # Tag-Namen
        for nr, zeile in enumerate(text.split("\n"), 1):
            for name, muster in VERBOTEN:
                if name == "Agent" and re.search(VERBOTEN[0][1], zeile):
                    continue   # schon als «KI-Agent» gemeldet
                for t in re.finditer(muster, zeile, re.I):
                    a = max(0, t.start() - 25)
                    m.append(f"{datei.name}:{nr}  «{name}»  …{norm(zeile[a:t.end() + 25])}…")
    return m


# ---------- e) llms.txt und wissen.md ----------

def textdatei(pfad: Path, katalog: dict, hinweis: str) -> list[str]:
    m: list[str] = []
    if not pfad.exists():
        return [f"{pfad.name} fehlt ({hinweis})"]
    zeilen = pfad.read_text(encoding="utf-8").split("\n")
    name = pfad.name if WURZEL not in pfad.parents else pfad.relative_to(WURZEL).as_posix()
    gesamt = "\n".join(zeilen)
    for k in ("ab_preis", "betreuung", "fremdkosten", "beispiel_jahr"):
        satz = katalog.get("saetze", {}).get(k, "")
        if satz and satz not in gesamt:
            m.append(f"{name}: Satz «{k}» fehlt oder weicht ab ({hinweis})")
    for pos in positionen(katalog).values():
        if pos.get("status") == "pruefen":
            continue
        kopf = f"- {pos['titel']}:"
        treffer = [z for z in zeilen if z.startswith(kopf)]
        if not treffer:
            m.append(f"{name}: «{pos['titel']}» fehlt ({hinweis})")
            continue
        if preis_text(pos) not in treffer[0]:
            m.append(f"{name}: «{pos['titel']}» ohne «{preis_text(pos)}» (steht: {treffer[0][len(kopf):][:50].strip()})")
    return m


def texte(katalog: dict) -> list[str]:
    return (textdatei(WURZEL / "llms.txt", katalog, "python3 scripts/strukturdaten.py")
            + textdatei(WURZEL / "vaia-wissen" / "wissen.md", katalog, "python3 scripts/bot_wissen.py"))


# ---------- f) Dienste ----------

def dienste(katalog: dict) -> None:
    import urllib.request
    adresse = "https://vaiacon.ch/daten/preise.json"
    try:
        with urllib.request.urlopen(adresse, timeout=10) as r:
            live = json.loads(r.read().decode("utf-8"))
    except Exception as fehler:   # nur Hinweis
        print(f"[hinweis] {adresse} nicht erreichbar: {fehler}")
        return
    if live == katalog:
        print("[gruen] live-Katalog gleich der lokalen Datei")
        return
    a, b = positionen(live), positionen(katalog)
    neu = sorted(set(b) - set(a))
    weg = sorted(set(a) - set(b))
    geaendert = sorted(i for i in set(a) & set(b) if a[i] != b[i])
    print(f"[hinweis] live weicht ab (Stand live {live.get('stand')}, lokal {katalog.get('stand')}): "
          f"{len(neu)} neu, {len(weg)} weg, {len(geaendert)} geaendert. "
          "Normal vor dem Merge; nach Merge und Abgleich muss das gleich sein.")


def main() -> int:
    try:
        katalog = json.loads(KATALOG_PFAD.read_text(encoding="utf-8"))
    except (OSError, ValueError) as fehler:
        print(f"[ROT] daten/preise.json nicht lesbar: {fehler}")
        return 1
    b = Bericht("--alle" in sys.argv)
    b.pruefung("a) Katalog-Schema", schema(katalog))
    b.pruefung("b) Zahlen ausserhalb data-preis", freie_zahlen())
    b.pruefung("c) Ersatztexte gegen Katalog", ersatztexte(katalog))
    b.pruefung("d) verbotene Woerter", woerter())
    b.pruefung("e) llms.txt und Bot-Wissen gegen Katalog", texte(katalog))
    b.ausgeben()
    if "--dienste" in sys.argv:
        dienste(katalog)
    return 1 if b.rot else 0


if __name__ == "__main__":
    sys.exit(main())
