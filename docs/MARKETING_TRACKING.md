# Marketing tracking — Meta Pixel & Vercel Analytics

HotSpot sends the same funnel events to **Meta Pixel** (ads) and **Vercel Web Analytics** (Events tab). Meta is enabled via `NEXT_PUBLIC_META_PIXEL_ID` in `.env` or Vercel. Vercel custom events require Web Analytics enabled on the project (Pro plan).

## Setup

1. [Meta Events Manager](https://business.facebook.com/events_manager) → **Connect data sources** → **Web** → Pixel.
2. Copy the Pixel ID (numeric).
3. Add to Vercel / `.env.local`:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=123456789012345
   ```
4. Redeploy.
5. Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper) and verify events on the live site.

## Campaign URLs

Use audience paths + UTM (and `fbclid` is captured automatically from Meta ads):

| Audience | Example |
|----------|---------|
| B2B EN | `https://hotsspots.com/en/b2b?utm_source=instagram&utm_medium=paid&utm_campaign=b2b_launch` |
| B2C AR | `https://hotsspots.com/ar/b2c?utm_source=instagram&utm_medium=paid&utm_campaign=wedding` |

UTM + `fbclid` are stored in cookie `hs_attribution` for **30 days** and sent with lead form emails.

## Events (Meta + Vercel)

| User action | Vercel custom event | Meta event |
|-------------|---------------------|------------|
| Page / route change | `Page_Viewed` | `PageView` |
| CTA → `#contact` | `CTA_Clicked` | `InitiateCheckout` (custom) |
| WhatsApp button | `Contact_Initiated` | `Contact` (custom) |
| Contact form started | `Brief_Started` | `ViewContent` (custom) |
| Contact form step reached | `Brief_Step_Completed` | `FormStep` (custom) |
| Contact form submit clicked | `Brief_Submit_Attempted` | custom |
| Contact form submit failed | `Brief_Submit_Failed` | custom |
| Meeting date submitted | `Meeting_Scheduled` | `Schedule` |
| Form submitted (client + API) | `Lead_Generated` | `Lead` (custom) |

Vercel Pro stores up to **2 properties** per event (e.g. `audience`, `cta_location`, `utm_source`). In Ads Manager, optimize campaigns for **Lead** or **Contact** as your conversion goal.

## Local testing

- No `NEXT_PUBLIC_META_PIXEL_ID` → no scripts (safe for dev).
- With ID set: `npm run dev` → open `/en/b2b?utm_source=test` → check Pixel Helper.
