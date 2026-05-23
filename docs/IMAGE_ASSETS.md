# Image assets — designer handoff

All content photos live in **`public/placeholders/`**. Replace each file with the final export using the **exact same filename and pixel dimensions**.

Regenerate gray placeholders after adding slots:

```bash
python3 scripts/generate-placeholders.py
```

Source of truth in code: `src/data/image-assets.ts`.

## Brand (keep as-is)

| File | Size | Notes |
|------|------|--------|
| `public/logo.png` | 357×94 | Header, footer, splash — wordmark |
| `src/app/icon.png` | 32×32 | Favicon |
| `src/app/apple-icon.png` | 180×180 | iOS home screen |

## Content placeholders

| Filename | Size | Where it appears |
|----------|------|------------------|
| `hero-car-1400x700.png` | **1400×700** | Hero Cybertruck (PNG with transparency recommended) |
| `og-share-1200x630.png` | **1200×630** | Facebook / LinkedIn / Twitter preview |
| `before-after-before-1600x1000.png` | **1600×1000** | Before/After slider — left (before) |
| `before-after-after-1600x1000.png` | **1600×1000** | Before/After slider — right (after) |
| `case-study-01-kora-break-1200x960.png` | **1200×960** | Case study card 1 |
| `case-study-02-tawineya-1200x960.png` | **1200×960** | Case study card 2 |
| `concept-pillar-01-location-800x1000.png` | **800×1000** | Concept section — pillar 1 (4:5) |
| `concept-pillar-02-branding-800x1000.png` | **800×1000** | Concept section — pillar 2 (4:5) |
| `experiential-cinematic-800x1000.png` | **800×1000** | Experiential marketing — desktop visual |
| `service-cybertruck-1200x880.png` | **1200×880** | Services carousel + detail — Cybertruck |
| `service-led-1200x880.png` | **1200×880** | Services — LED |
| `service-stage-1200x880.png` | **1200×880** | Services — Stage |
| `service-sound-1200x880.png` | **1200×880** | Services — Sound |
| `service-lighting-1200x880.png` | **1200×880** | Services — Lighting |
| `service-production-1200x880.png` | **1200×880** | Services — Production |
| `client-logo-mobily-280x96.png` | **280×96** | Clients marquee — Mobily |
| `client-logo-stc-280x96.png` | **280×96** | Clients — STC |
| `client-logo-neom-280x96.png` | **280×96** | Clients — NEOM |
| `client-logo-aramco-280x96.png` | **280×96** | Clients — Aramco |
| `client-logo-sabic-280x96.png` | **280×96** | Clients — SABIC |
| `client-logo-riyadh-season-280x96.png` | **280×96** | Clients — Riyadh Season |
| `client-logo-hikma-280x96.png` | **280×96** | Clients — Hikma |

## Export tips

- **Hero car:** transparent PNG, vehicle centered, ~1400px wide.
- **Case studies / services:** JPG or WebP at quality 80+ is fine if you update paths in `image-assets.ts` (PNG preferred for consistency).
- **Client logos:** light/white marks on transparent PNG; displayed monochrome in UI.
- **OG image:** safe text in center; no critical detail in outer 10% (crop on some platforms).

## Not replaced (interactive / brand)

- **3D Cybertruck** viewer (`#visualization`) — separate 3D asset pipeline.
- **Favicon** — separate from content placeholders.
