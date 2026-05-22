"use client";

import Link from "next/link";
import { localeNames, type Locale } from "@/i18n/config";
import { useAudience, useLocale } from "@/i18n/locale-provider";

export function LanguageSwitcher() {
  const locale = useLocale();
  const audience = useAudience();
  const codes = locale === "ar" ? (["ar", "en"] as const) : (["en", "ar"] as const);

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-0.5 text-[10px] font-semibold uppercase tracking-wider">
      {codes.map((code) => {
        const active = code === locale;
        return (
          <Link
            key={code}
            href={`/${code}/${audience}`}
            className={`rounded-full px-2.5 py-1 transition ${
              active ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
            }`}
            aria-current={active ? "page" : undefined}
            lang={code}
          >
            {code === "en" ? "EN" : "AR"}
          </Link>
        );
      })}
      <span className="sr-only">{localeNames[locale === "en" ? "ar" : "en"]}</span>
    </div>
  );
}
