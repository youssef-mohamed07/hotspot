/** First-touch UTM & click IDs — stored 30 days for lead reporting. */

export const ATTRIBUTION_COOKIE = "hs_attribution";
const MAX_AGE_DAYS = 30;

export type AttributionData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  landing_page?: string;
  referrer?: string;
  captured_at?: string;
};

const PARAM_KEYS: (keyof AttributionData)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
];

export function parseAttributionFromSearch(search: string): Partial<AttributionData> {
  const params = new URLSearchParams(search.startsWith("?") ? search : `?${search}`);
  const out: Partial<AttributionData> = {};

  for (const key of PARAM_KEYS) {
    const v = params.get(key);
    if (v) out[key] = v;
  }

  return out;
}

export function hasAttributionParams(data: Partial<AttributionData>): boolean {
  return PARAM_KEYS.some((k) => !!data[k]);
}

export function readAttributionCookie(): AttributionData | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${ATTRIBUTION_COOKIE}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as AttributionData;
  } catch {
    return null;
  }
}

export function writeAttributionCookie(data: AttributionData) {
  if (typeof document === "undefined") return;
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;
  const value = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${ATTRIBUTION_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

/** Merge new URL params into existing first-touch cookie (never overwrite UTMs once set). */
export function captureAttributionFromUrl() {
  if (typeof window === "undefined") return;

  const fromUrl = parseAttributionFromSearch(window.location.search);
  if (!hasAttributionParams(fromUrl)) return;

  const existing = readAttributionCookie() ?? {};
  const merged: AttributionData = {
    ...existing,
    landing_page: existing.landing_page ?? window.location.pathname + window.location.search,
    referrer: existing.referrer ?? (document.referrer || undefined),
    captured_at: existing.captured_at ?? new Date().toISOString(),
  };

  for (const key of PARAM_KEYS) {
    const v = fromUrl[key];
    if (v && !merged[key]) merged[key] = v;
  }

  writeAttributionCookie(merged);
}

export function getAttributionForLead(): AttributionData | undefined {
  const data = readAttributionCookie();
  if (!data || Object.keys(data).length === 0) return undefined;
  return data;
}
