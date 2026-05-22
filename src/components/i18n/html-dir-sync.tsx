"use client";

import { useEffect } from "react";
import { getDirection, type Locale } from "@/i18n/config";

export function HtmlDirSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    const dir = getDirection(locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.classList.toggle("lang-ar", locale === "ar");
  }, [locale]);

  return null;
}
