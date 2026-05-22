"use client";

import { createContext, useContext } from "react";
import type { Audience } from "@/i18n/audience";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

type LocaleContextValue = {
  locale: Locale;
  audience: Audience;
  dict: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  audience,
  dict,
  children,
}: LocaleContextValue & { children: React.ReactNode }) {
  return (
    <LocaleContext.Provider value={{ locale, audience, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx.locale;
}

export function useAudience() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useAudience must be used within LocaleProvider");
  return ctx.audience;
}

export function useIsRtl() {
  return useLocale() === "ar";
}

export function useDictionary() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useDictionary must be used within LocaleProvider");
  return ctx.dict;
}
