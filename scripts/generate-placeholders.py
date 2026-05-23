#!/usr/bin/env python3
"""Generate placeholder PNGs — run: python3 scripts/generate-placeholders.py"""

from __future__ import annotations

import json
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "placeholders"
SPEC = ROOT / "scripts" / "placeholder-spec.json"

BG = (240, 241, 243, 255)
BORDER = (212, 212, 216, 255)
ACCENT = (42, 118, 166, 255)
TEXT = (82, 82, 91, 255)
TEXT_DIM = (113, 113, 122, 255)


def load_spec() -> list[dict]:
    if SPEC.exists():
        return json.loads(SPEC.read_text())
    # fallback: parse filenames if spec missing
    return []


def slug_from_path(path: str) -> str:
    name = Path(path).stem
    return name


def draw_placeholder(width: int, height: int, label: str, filename: str) -> Image.Image:
    img = Image.new("RGBA", (width, height), BG)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, width - 1, height - 1], outline=BORDER, width=2)
    draw.rectangle([12, 12, 28, 28], fill=(*ACCENT[:3], 115))

    try:
        font_lg = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 22)
        font_sm = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
    except OSError:
        font_lg = ImageFont.load_default()
        font_sm = font_lg

    size_text = f"{width} × {height}"
    lines = [size_text, label, filename]

    line_heights = [28, 22, 18]
    total_h = sum(line_heights) + 16
    y = (height - total_h) // 2

    for i, line in enumerate(lines):
        font = font_lg if i == 0 else font_sm
        color = TEXT if i < 2 else TEXT_DIM
        bbox = draw.textbbox((0, 0), line, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((width - tw) // 2, y), line, fill=color, font=font)
        y += line_heights[i]

    return img


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    # Built from image-assets paths (keep in sync)
    assets = [
        ("hero-car-1400x700.png", 1400, 700, "Hero — Cybertruck"),
        ("og-share-1200x630.png", 1200, 630, "Open Graph / social share"),
        ("before-after-before-1600x1000.png", 1600, 1000, "Before — unbranded"),
        ("before-after-after-1600x1000.png", 1600, 1000, "After — branded"),
        ("case-study-01-kora-break-1200x960.png", 1200, 960, "Case study — Kora Break"),
        ("case-study-02-tawineya-1200x960.png", 1200, 960, "Case study — Tawineya"),
        ("concept-pillar-01-location-800x1000.png", 800, 1000, "Concept — Location"),
        ("concept-pillar-02-branding-800x1000.png", 800, 1000, "Concept — Branding"),
        ("experiential-cinematic-800x1000.png", 800, 1000, "Experiential — cinematic"),
        ("service-cybertruck-1200x880.png", 1200, 880, "Service — Cybertruck"),
        ("service-led-1200x880.png", 1200, 880, "Service — LED"),
        ("service-stage-1200x880.png", 1200, 880, "Service — Stage"),
        ("service-sound-1200x880.png", 1200, 880, "Service — Sound"),
        ("service-lighting-1200x880.png", 1200, 880, "Service — Lighting"),
        ("service-production-1200x880.png", 1200, 880, "Service — Production"),
        ("client-logo-mobily-280x96.png", 280, 96, "Logo — Mobily"),
        ("client-logo-stc-280x96.png", 280, 96, "Logo — STC"),
        ("client-logo-neom-280x96.png", 280, 96, "Logo — NEOM"),
        ("client-logo-aramco-280x96.png", 280, 96, "Logo — Aramco"),
        ("client-logo-sabic-280x96.png", 280, 96, "Logo — SABIC"),
        ("client-logo-riyadh-season-280x96.png", 280, 96, "Logo — Riyadh Season"),
        ("client-logo-hikma-280x96.png", 280, 96, "Logo — Hikma"),
    ]

    for filename, w, h, label in assets:
        out = OUT / filename
        img = draw_placeholder(w, h, label, filename)
        img.save(out, "PNG", optimize=True)
        print(f"  {out.relative_to(ROOT)}")

    print(f"\nGenerated {len(assets)} placeholders in public/placeholders/")


if __name__ == "__main__":
    main()
