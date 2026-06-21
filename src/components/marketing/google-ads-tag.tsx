import Script from "next/script";
import { hasGoogleAds, marketingConfig } from "@/lib/marketing/config";

/** Google Ads gtag.js — loads on every page via root layout. */
export function GoogleAdsTag() {
  if (!hasGoogleAds()) return null;

  const googleAdsId = marketingConfig.googleAdsId;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAdsId}');
      `}</Script>
    </>
  );
}
