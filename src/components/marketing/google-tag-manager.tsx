import Script from "next/script";
import { hasGtm, marketingConfig } from "@/lib/marketing/config";

/** GTM head snippet — loads on every page via root layout. */
export function GoogleTagManagerHead() {
  if (!hasGtm()) return null;

  const gtmId = marketingConfig.gtmId;

  return (
    <Script id="google-tag-manager" strategy="beforeInteractive">{`
      window.dataLayer = window.dataLayer || [];
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `}</Script>
  );
}

/** GTM noscript fallback — must be the first element inside <body>. */
export function GoogleTagManagerBody() {
  if (!hasGtm()) return null;

  const gtmId = marketingConfig.gtmId;

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
