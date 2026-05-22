# HotSpot — Dual Audience Architecture (B2B / B2C)

Two isolated conversion experiences on **one design system**. No duplicate components. No cross-audience UI.

> **Content status (May 2026):** `b2b` and `b2c` JSON files currently share the **original site copy** (pre-audience split). Dedicated B2B enterprise copy and B2C lifestyle copy will replace each file when ready.

## Route strategy

| URL | Audience | Use case |
|-----|----------|----------|
| `/` | → redirect | `/en/b2b` (default) |
| `/en/b2b` | B2B EN | Enterprise / brand / agency campaigns |
| `/en/b2c` | B2C EN | Weddings, personal events, viral moments |
| `/ar/b2b` | B2B AR | Same, Arabic RTL |
| `/ar/b2c` | B2C AR | Same, Arabic RTL |

**Isolation rules**

- No audience toggle in the UI (only EN ↔ AR language switcher).
- B2B and B2C are separate entry URLs (ads, QR, email links).
- `hreflang` links only swap language **within the same audience**.
- Sitemap lists four URLs; no cross-audience alternates.

## Folder structure

```
src/
  i18n/
    config.ts          # locale + localizedPath(locale, audience)
    audience.ts        # b2b | b2c
    get-dictionary.ts  # getDictionary(locale, audience)
    locale-provider.tsx
  messages/
    en/
      b2b.json         # enterprise / ROI copy
      b2c.json         # lifestyle / emotional copy
    ar/
      b2b.json
      b2c.json
  app/
    [locale]/
      [audience]/
        layout.tsx     # LocaleProvider + dict load
        page.tsx       # same sections, content-driven
  middleware.ts        # inject x-locale, x-audience; redirect missing segments
```

## Dynamic content system

```ts
// Server / static
const dict = getDictionary(locale, audience);

// Client (any section)
const dict = useDictionary();
```

Components never branch on audience in JSX — only read `dict.hero.titleLine1`, etc.

## Middleware

1. `/` → `/{defaultLocale}/{defaultAudience}` (`/en/b2b`)
2. `/en` → `/en/b2b`
3. `/ar` → `/ar/b2b`
4. Valid: `/{locale}/{audience}/...`
5. Sets headers: `x-locale`, `x-audience` for root `<html>` + JSON-LD

## Tone matrix

| | B2B | B2C |
|---|-----|-----|
| **EN** | ROI, scale, enterprise, performance | Emotional, exciting, easy, lifestyle |
| **AR** | احترافي، عائد، نطاق، مؤسسي | عاطفي، عصري، سهل، لحظة لا تُنسى |

## CTA examples

| Section | B2B EN | B2C EN | B2B AR | B2C AR |
|---------|--------|--------|--------|--------|
| Hero | Book Your Experience | Book Your Moment | احجز تجربتك | احجز لحظتك |
| Nav | Book Experience | Book Your Moment | احجز تجربتك | احجز لحظتك |
| Process | Build my brief | Reserve my date | ابنِ بريفك | احجز موعدي |
| Form | Send My Brief — Let's Deploy | Send My Request — Let's Go | أرسل البريف — لننطلق | أرسل طلبي — يلا نبدأ |

## SEO (per audience)

**B2B EN title:** HotSpot | Cybertruck Brand Activations & Event Production — Saudi Arabia  

**B2C EN title:** HotSpot | Book the Cybertruck for Your Moment — Saudi Arabia  

**B2B AR:** تفعيلات سايبرتراك وإنتاج فعاليات (مؤسسي)  

**B2C AR:** احجز Cybertruck لمناسبتك  

Keywords: keep shared technical terms (Cyber Stage, Cybertruck); B2B adds *brand activation, enterprise, ROI*; B2C adds *wedding, birthday, book cybertruck*.

**Campaign URLs (examples)**

- LinkedIn / B2B deck → `hotsspots.com/en/b2b?utm_source=linkedin&utm_medium=paid&utm_campaign=b2b`
- Instagram / consumer reel → `hotsspots.com/ar/b2c?utm_source=instagram&utm_medium=paid&utm_campaign=b2c`
- Never link both on the same landing footer.

**Meta Pixel & UTM:** see [MARKETING_TRACKING.md](./MARKETING_TRACKING.md).

## Adding a new section

1. Add keys to `messages/en/b2b.json` and `en/b2c.json` (different copy).
2. Mirror structure in `ar/b2b.json` and `ar/b2c.json`.
3. In component: `const dict = useDictionary();` — no `if (audience)`.

## Sample JSON shape

```json
{
  "meta": { "title": "...", "description": "..." },
  "hero": { "titleLine1": "...", "cta": "..." },
  "targetAudience": { "items": [{ "id": "launch", "lead": "...", "payoff": "..." }] }
}
```

Same keys in all four files; values differ by audience + locale.

## Local dev

```bash
npm run dev
# http://localhost:3000/en/b2b
# http://localhost:3000/en/b2c
# http://localhost:3000/ar/b2b
# http://localhost:3000/ar/b2c
```
