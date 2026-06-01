# Meta Pixel — tracking & UTM

HotSpot uses **Meta Pixel only** (Facebook / Instagram ads). Enabled via `NEXT_PUBLIC_META_PIXEL_ID` in `.env` or Vercel.

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

## Meta standard events

| User action | Meta event |
|-------------|------------|
| Page / route change | `PageView` |
| CTA → `#contact` | `InitiateCheckout` |
| WhatsApp button | `Contact` |
| Contact form started | `ViewContent` |
| Contact form step reached | `FormStep` |
| Contact form submit clicked | `FormSubmitAttempt` |
| Contact form submit failed | `FormSubmitError` |
| Meeting date submitted | `Schedule` |
| Form submitted | `Lead` |

In Ads Manager, optimize campaigns for **Lead** or **Contact** as your conversion goal.

## Local testing

- No `NEXT_PUBLIC_META_PIXEL_ID` → no scripts (safe for dev).
- With ID set: `npm run dev` → open `/en/b2b?utm_source=test` → check Pixel Helper.
