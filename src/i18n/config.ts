import type { Audience } from "./audience";
import { defaultAudience } from "./audience";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function localizedPath(
  locale: Locale,
  audience: Audience = defaultAudience,
  path = ""
): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `/${locale}/${audience}${normalized}`;
}
