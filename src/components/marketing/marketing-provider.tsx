"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAudience, useLocale } from "@/i18n/locale-provider";
import { trackPageView } from "@/lib/marketing/track";

/** Sends page_view to GA4, Meta, TikTok, and dataLayer on route changes. */
export function MarketingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const audience = useAudience();

  useEffect(() => {
    if (!pathname) return;
    trackPageView(pathname, { locale, audience });
  }, [pathname, locale, audience]);

  return <>{children}</>;
}
