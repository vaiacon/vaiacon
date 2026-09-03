from __future__ import annotations

from pathlib import Path
from shutil import copy2


ROOT = Path(__file__).resolve().parents[1]
TEXT_EXTENSIONS = {".css", ".html", ".js", ".json", ".jsx", ".md", ".ts"}
SKIP_DIRECTORIES = {".git", "vendor", "node_modules", "scripts"}

REPLACEMENTS = [
    ("Simplaro GmbH", "vaiacon GmbH (in Gründung)"),
    ("SIMPLARO ACADEMY", "VAIACONACADEMY"),
    ("Simplaro Academy", "vaiaconAcademy"),
    ("SimplaroAcademy", "vaiaconAcademy"),
    ("SimplaroLearning", "vaiaconLearning"),
    ("SimplaroVisibility", "vaiaconVisibility"),
    ("SimplaroService", "vaiaconService"),
    ("SimplaroBot", "vaiaconBot"),
    ("S-Mark", "vaiacon-Symbol"),
    ("S-Logo", "vaiacon-Symbol"),
    ("SIMPLARO", "VAIACON"),
    ("Simplaro", "vaiacon"),
    ("simplaro-kurs.css", "vaiacon-kurs.css"),
    ("simplaro_", "vaiacon_"),
    ("simplaro.ch", "vaiacon.ch"),
    ("hallo@simplaro.ch", "hallo@vaiacon.ch"),
    ("calendly.com/simplaro", "calendly.com/vaiacon"),
    ("facebook.com/simplaro", "facebook.com/vaiacon"),
    ("linkedin.com/company/simplaro", "linkedin.com/company/vaiacon"),
    ("instagram.com/simplaro", "instagram.com/vaiacon"),
    ("buerobot-poster-hand-sharp.jpg", "vaiacon-buerobot-hero.png"),
    ("simplarobot-lupe-visibility.jpg", "vaiacon-buerobot-visibility.png"),
    ("simplaro-robot-teacher.png", "vaiacon-buerobot-learning.png"),
    ("simplaro-academy-desk.png", "vaiacon-buerobot-academy.png"),
    ("buerobot-faq-simplaro.png", "vaiacon-buerobot-faq-transparent.png"),
    ("faq-bot.jpg", "vaiacon-buerobot-faq.png"),
    ("buerobot-phone.jpg", "vaiacon-buerobot-phone.png"),
    ("buerobot-poster.jpg", "vaiacon-buerobot-hero.png"),
    ("buerobot-terra.png", "vaiacon-buerobot-hero.png"),
]


def rebrand_text_files() -> None:
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in TEXT_EXTENSIONS:
            continue
        if any(part in SKIP_DIRECTORIES for part in path.parts):
            continue
        content = path.read_text(encoding="utf-8")
        updated = content
        for old, new in REPLACEMENTS:
            updated = updated.replace(old, new)
        if updated != content:
            path.write_text(updated, encoding="utf-8")


def publish_generated_assets() -> None:
    assets = ROOT / "assets"
    targets = [
        ROOT / "academy" / "assets",
        ROOT / "academy" / "kurs" / "assets",
        ROOT / "uploads",
    ]
    generated = [
        "vaiacon-buerobot-hero.png",
        "vaiacon-buerobot-visibility.png",
        "vaiacon-buerobot-learning.png",
        "vaiacon-buerobot-academy.png",
        "vaiacon-buerobot-faq.png",
        "vaiacon-buerobot-faq-transparent.png",
        "vaiacon-buerobot-phone.png",
    ]
    for target in targets:
        if not target.exists():
            continue
        for filename in generated:
            source = assets / filename
            if source.exists():
                copy2(source, target / filename)


def main() -> None:
    rebrand_text_files()
    publish_generated_assets()


if __name__ == "__main__":
    main()
