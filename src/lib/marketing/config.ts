/** Meta Pixel ID — set env to override; fallback keeps production tracking enabled. */
const DEFAULT_META_PIXEL_ID = "988415113789964";

function env(key: string): string {
  return (process.env[key] ?? "").trim();
}

export const marketingConfig = {
  metaPixelId: env("NEXT_PUBLIC_META_PIXEL_ID") || DEFAULT_META_PIXEL_ID,
} as const;

export function hasMetaPixel() {
  return !!marketingConfig.metaPixelId;
}
