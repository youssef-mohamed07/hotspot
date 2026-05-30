import type { Metadata } from "next";
import type { Audience } from "@/i18n/audience";
import { defaultAudience } from "@/i18n/audience";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { localizedPath } from "@/i18n/config";
import { seoKeywords } from "@/data/seo-keywords";
import { imageAssets } from "@/data/image-assets";
import { siteConfig } from "@/lib/site";

const defaultTitle =
  "HotSpot | Cyber Stage Activations, LED & Event Production in Saudi Arabia";
const defaultDescription =
  "Book Cyber Stage — a branded mobile activation for launches, venues, and festivals. LED screens, sound, lighting, and end-to-end event production across Riyadh, Jeddah, Khobar, Mecca & Medina.";

const keywords = [...seoKeywords];

export function getSiteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${base}${normalized}`;
}

export function buildMetadata({
  title = defaultTitle,
  description = defaultDescription,
  path = "/",
  locale = "en" as Locale,
  audience = defaultAudience,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  locale?: Locale;
  audience?: Audience;
  noIndex?: boolean;
} = {}): Metadata {
  const canonical = getSiteUrl(path);
  const ogImage = getSiteUrl(imageAssets.ogShare.path);
  const ogLocale = locale === "ar" ? "ar_SA" : "en_SA";
  const alternateLocale = locale === "ar" ? "en_SA" : "ar_SA";

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords,
    applicationName: siteConfig.name,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Business",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical,
      languages: {
        en: getSiteUrl(localizedPath("en", audience)),
        ar: getSiteUrl(localizedPath("ar", audience)),
        "x-default": getSiteUrl(localizedPath("en", audience)),
      },
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: imageAssets.ogShare.width,
          height: imageAssets.ogShare.height,
          alt: imageAssets.ogShare.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const rootMetadata = buildMetadata();

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: getSiteUrl("/logo.png"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
      siteConfig.social.x,
    ],
    areaServed: {
      "@type": "Country",
      name: siteConfig.address.countryName,
    },
  };
}

export function webSiteJsonLd(
  locale: Locale = "en",
  audience: Audience = defaultAudience,
) {
  const dict = getDictionary(locale, audience);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: getSiteUrl(localizedPath(locale, audience)),
    description: dict.meta.description,
    inLanguage: locale === "ar" ? "ar" : "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    image: getSiteUrl(imageAssets.heroCar.path),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    priceRange: "$$$",
    areaServed: [
      "Riyadh",
      "Jeddah",
      "Khobar",
      "Mecca",
      "Medina",
      "Saudi Arabia",
    ],
    description: defaultDescription,
    knowsAbout: [
      "Cyber Stage brand activations",
      "Cyber Stage mobile activations",
      "LED screen rental and displays",
      "Professional sound systems for events",
      "Stage and truss systems",
      "Lighting design for events",
      "Full event production Saudi Arabia",
      "Experiential marketing and brand activation",
      "Venue entrance activations",
      "Product launch activations",
    ],
  };
}

export function serviceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cyber Stage Mobile Activation",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    areaServed: siteConfig.address.countryName,
    description:
      "Fully branded Cyber Stage deployment with on-board LED, spatial audio, crew, and content — for launches, venues, and festivals.",
    serviceType: "Experiential marketing and event production",
  };
}

export function faqPageJsonLd(
  locale: Locale = "en",
  audience: Audience = defaultAudience,
) {
  const faqs = getDictionary(locale, audience).faq.items;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function homePageJsonLd(
  locale: Locale = "en",
  audience: Audience = defaultAudience,
) {
  return [
    organizationJsonLd(),
    webSiteJsonLd(locale, audience),
    localBusinessJsonLd(),
    serviceJsonLd(),
    faqPageJsonLd(locale, audience),
  ];
}
