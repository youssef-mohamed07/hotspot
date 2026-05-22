export const audiences = ["b2b", "b2c"] as const;
export type Audience = (typeof audiences)[number];

/** Default entry when no audience segment is present (paid B2B campaigns). */
export const defaultAudience: Audience = "b2b";

export function isAudience(value: string): value is Audience {
  return audiences.includes(value as Audience);
}
