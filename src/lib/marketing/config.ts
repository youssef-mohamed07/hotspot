/** Meta Pixel ID — set env to override; fallback keeps production tracking enabled. */
const DEFAULT_META_PIXEL_ID = "988415113789964";
const DEFAULT_GTM_ID = "GTM-NMJF8S7N";

function env(key: string): string {
  return (process.env[key] ?? "").trim();
}

export const marketingConfig = {
  metaPixelId: env("NEXT_PUBLIC_META_PIXEL_ID") || DEFAULT_META_PIXEL_ID,
  gtmId: env("NEXT_PUBLIC_GTM_ID") || DEFAULT_GTM_ID,
} as const;

export function hasMetaPixel() {
  return !!marketingConfig.metaPixelId;
}

export function hasGtm() {
  return !!marketingConfig.gtmId;
}
