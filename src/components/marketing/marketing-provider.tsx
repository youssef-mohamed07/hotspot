"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAudience, useLocale } from "@/i18n/locale-provider";
import { setMarketingContext } from "@/lib/marketing/context";
import { trackPageView } from "@/lib/marketing/track";

/** Sends page_view to Meta Pixel and Vercel Web Analytics on route changes. */
export function MarketingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const audience = useAudience();

  useEffect(() => {
    setMarketingContext({ locale, audience });
  }, [locale, audience]);

  useEffect(() => {
    if (!pathname) return;
    trackPageView(pathname, { locale, audience });
  }, [pathname, locale, audience]);

  return <>{children}</>;
}
