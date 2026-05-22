import type { Audience } from "./audience";
import type { Locale } from "./config";

import enB2b from "@/messages/en/b2b.json";
import enB2c from "@/messages/en/b2c.json";
import arB2b from "@/messages/ar/b2b.json";
import arB2c from "@/messages/ar/b2c.json";

const dictionaries = {
  en: { b2b: enB2b, b2c: enB2c },
  ar: { b2b: arB2b, b2c: arB2c },
} as const;

export type Dictionary = typeof enB2b;

export function getDictionary(locale: Locale, audience: Audience): Dictionary {
  return dictionaries[locale][audience];
}
