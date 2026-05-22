/** Meta Pixel ID — empty means disabled. */

function env(key: string): string {
  return (process.env[key] ?? "").trim();
}

export const marketingConfig = {
  metaPixelId: env("NEXT_PUBLIC_META_PIXEL_ID"),
} as const;

export function hasMetaPixel() {
  return !!marketingConfig.metaPixelId;
}
