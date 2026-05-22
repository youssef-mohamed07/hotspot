# HotSpot — Bilingual Localization Guide

## Route structure

| URL | Language | Direction |
|-----|----------|-----------|
| `/` | Redirect → `/en` | — |
| `/en` | English | `ltr` |
| `/ar` | Arabic | `rtl` |

Middleware sets `x-locale` for root `<html lang dir>`. Static params prebuild both locales.

## Localization structure

```
src/
  i18n/
    config.ts           # locales, paths, direction
    get-dictionary.ts   # loads JSON by locale
    locale-provider.tsx # client hook: useDictionary(), useLocale()
  messages/
    en.json             # English source of truth
    ar.json             # Native Arabic marketing copy (not literal translation)
  app/
    [locale]/
      layout.tsx        # LocaleProvider
      page.tsx          # metadata + sections
middleware.ts           # / → /en, invalid paths → /en/...
```

## JSON translations

All UI strings live in `src/messages/en.json` and `src/messages/ar.json`. Section keys mirror the landing page: `hero`, `nav`, `process`, `faq`, `contact`, etc.

## Hero — EN / AR / CTAs

| | English | Arabic (localized) |
|---|---------|-------------------|
| Badge | For the first time in Saudi Arabia | لأول مرة في السعودية |
| Headline | Cybertruck Is Now / Your Ad. | السايبرتراك / إعلانك الجديد. |
| Subtitle | Command attention with the most futuristic mobile billboard… | اجذب الأنظار بأقوى لوحة إعلانية متحركة… |
| Primary CTA | Book Your Experience | احجز تجربتك |
| Alt CTA | Start Your Activation | ابدأ التفعيل الآن |

## Meta & SEO

| | English | Arabic |
|---|---------|--------|
| **Title** | HotSpot \| Cybertruck Brand Activations & Event Production — Saudi Arabia | هوت سبوت \| تفعيلات سايبرتراك وإنتاج فعاليات في السعودية |
| **Description** | Cyber Stage: branded Tesla Cybertruck activations… Book in 48–72h. | سايبر ستيج: تفعيل Cybertruck بعلامتك… الحجز خلال 48–72 ساعة. |

**SEO notes**

- `hreflang` alternates: `en`, `ar`, `x-default` → `/en`
- `og:locale` / `alternateLocale`: `en_SA` ↔ `ar_SA`
- FAQ JSON-LD uses locale-specific Q&A from messages
- Keep brand terms **Cyber Stage**, **Cybertruck**, **HotSpot** in Arabic where recognition matters
- Target keywords (AR): تفعيل Cybertruck السعودية، إنتاج فعاليات الرياض، تسويق تجريبي، سايبر ستيج

## RTL handling

- `html[dir="rtl"]` + logical CSS (`start`/`end`, `ps`/`pe`)
- Cairo for Arabic body/headlines; Bebas Neue for EN display only
- `DirectionalArrow` flips CTA arrows in RTL
- Marquee/scroll animations unchanged; test sticky sections on mobile RTL

## Font pairings

| Role | English | Arabic |
|------|---------|--------|
| Body | Geist Sans | Cairo |
| Display headlines | Bebas Neue | Cairo (bold) |
| Mono / labels | Geist Mono | Geist Mono |

## Bilingual UX improvements

1. **Language switcher** in header (EN / AR), preserves hash anchors
2. **WhatsApp prefill** localized per locale
3. **Form options** fully translated (industry, cities, budget)
4. **FAQ categories** keyed in English for logic, labels from JSON

## CTA alternatives (reference)

| Context | EN options | AR options |
|---------|------------|------------|
| Hero | Book Your Experience / Start Your Activation | احجز تجربتك / ابدأ التفعيل الآن |
| Header | Book Experience | احجز تجربتك |
| Process | Build my brief | ابنِ بريفك |
| Contact submit | Send My Brief — Let's Deploy | أرسل البريف — لننطلق |
| FAQ footer | Ask us anything | اسألنا أي شيء |

## Running locally

```bash
npm run dev
# http://localhost:3000/en
# http://localhost:3000/ar
```

## Extending

1. Add keys to `en.json`, then rewrite `ar.json` (marketing tone, shorter headlines)
2. Consume via `useDictionary()` in client components or `getDictionary(locale)` in server metadata
3. New routes: `src/app/[locale]/your-page/page.tsx` + `localizedPath(locale, '/your-page')`
