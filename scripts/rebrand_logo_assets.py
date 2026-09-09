from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
# Quellbild als Argument uebergeben: python3 scripts/rebrand_logo_assets.py <pfad>
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "assets" / "vaiacon-logo.jpeg"
BRAND_ORANGE = (230, 78, 42)

ASSET_DIRECTORIES = [
    ROOT / "assets",
    ROOT / "academy" / "assets",
    ROOT / "academy" / "kurs" / "assets",
    ROOT / "uploads",
]


def clean_logo() -> Image.Image:
    source = Image.open(SOURCE).convert("RGB")
    width, height = source.size
    alpha = Image.new("L", source.size, 0)
    alpha_pixels = alpha.load()
    source_pixels = source.load()

    xs: list[int] = []
    ys: list[int] = []
    for y in range(height):
        for x in range(width):
            red, green, blue = source_pixels[x, y]
            signal = red - max(green, blue)
            if red > 130 and signal > 30 and green < 170:
                alpha_pixels[x, y] = min(255, max(0, int((signal - 18) * 7)))
                xs.append(x)
                ys.append(y)

    if not xs:
        raise RuntimeError("The vaiacon logo mark could not be detected.")

    margin = 16
    box = (
        max(min(xs) - margin, 0),
        max(min(ys) - margin, 0),
        min(max(xs) + margin + 1, width),
        min(max(ys) + margin + 1, height),
    )
    result = Image.new("RGBA", source.size, BRAND_ORANGE + (0,))
    result.putalpha(alpha)
    return result.crop(box)


def content_bounds(image: Image.Image) -> tuple[int, int, int, int]:
    alpha = image.getchannel("A")
    bounds = alpha.getbbox()
    if not bounds:
        raise RuntimeError("Logo image has no visible pixels.")
    return bounds


def find_mark_end(image: Image.Image) -> int:
    alpha = image.getchannel("A")
    left, _, right, _ = content_bounds(image)
    columns = [alpha.crop((x, 0, x + 1, image.height)).getbbox() is not None for x in range(left, right)]
    gap_start = None
    for index, present in enumerate(columns):
        if not present and gap_start is None:
            gap_start = index
        if present and gap_start is not None:
            if index - gap_start >= 20:
                return left + gap_start
            gap_start = None
    raise RuntimeError("Unable to separate the vaiacon mark from the wordmark.")


def crop_visible(image: Image.Image) -> Image.Image:
    return image.crop(content_bounds(image))


def recolor(image: Image.Image, color: tuple[int, int, int]) -> Image.Image:
    result = Image.new("RGBA", image.size, color + (0,))
    result.putalpha(image.getchannel("A"))
    return result


def save_png(image: Image.Image, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, format="PNG", optimize=True)


def main() -> None:
    lockup = crop_visible(clean_logo())
    mark_end = find_mark_end(lockup)
    mark = crop_visible(lockup.crop((0, 0, mark_end, lockup.height)))
    word = crop_visible(lockup.crop((mark_end, 0, lockup.width, lockup.height)))

    orange_lockup = recolor(lockup, BRAND_ORANGE)
    orange_mark = recolor(mark, BRAND_ORANGE)
    orange_word = recolor(word, BRAND_ORANGE)
    white_lockup = recolor(lockup, (255, 255, 255))
    white_mark = recolor(mark, (255, 255, 255))
    white_word = recolor(word, (255, 255, 255))

    for directory in ASSET_DIRECTORIES:
        if not directory.exists():
            continue
        save_png(orange_lockup, directory / "logo-lockup-terra.png")
        save_png(white_lockup, directory / "logo-lockup-white.png")
        save_png(orange_mark, directory / "logo-mark-terra.png")
        save_png(white_mark, directory / "logo-mark-white.png")
        save_png(orange_word, directory / "logo-wordmark-terra.png")
        save_png(white_word, directory / "logo-wordmark-white.png")
        save_png(orange_mark, directory / "logo-mark-terra-symbol-white.png")
        save_png(orange_lockup, directory / "logo-lockup-terra-symbol-cream.png")
        save_png(white_lockup, directory / "logo-lockup-terra-symbol-white.png")
        save_png(orange_lockup, directory / "logo-lockup-academy.png")
        save_png(orange_mark, directory / "vaiacon-mark-terra.png")


if __name__ == "__main__":
    main()
