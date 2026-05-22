import type { Metadata } from "next";
import { faqs } from "@/data/faq";
import { seoKeywords } from "@/data/seo-keywords";
import { siteConfig } from "@/lib/site";

const defaultTitle =
  "HotSpot | Cybertruck Activations, LED & Event Production in Saudi Arabia";
const defaultDescription =
  "Book Cyber Stage — a branded Tesla Cybertruck mobile activation for launches, venues, and festivals. LED screens, sound, lighting, and end-to-end event production across Riyadh, Jeddah, Khobar, Mecca & Medina.";

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
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const canonical = getSiteUrl(path);
  const ogImage = getSiteUrl("/hero/car-hero.png");

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords,
    applicationName: siteConfig.name,
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
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1400,
          height: 700,
          alt: "HotSpot Cybertruck mobile brand activation in Saudi Arabia",
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
    sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.x],
    areaServed: {
      "@type": "Country",
      name: siteConfig.address.countryName,
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: defaultDescription,
    inLanguage: "en",
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
    image: getSiteUrl("/hero/car-hero.png"),
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    priceRange: "$$$",
    areaServed: ["Riyadh", "Jeddah", "Khobar", "Mecca", "Medina", "Saudi Arabia"],
    description: defaultDescription,
    knowsAbout: [
      "Cybertruck brand activations",
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
      "Fully branded Tesla Cybertruck deployment with on-board LED, spatial audio, crew, and content — for launches, venues, and festivals.",
    serviceType: "Experiential marketing and event production",
  };
}

export function faqPageJsonLd() {
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

export function homePageJsonLd() {
  return [organizationJsonLd(), webSiteJsonLd(), localBusinessJsonLd(), serviceJsonLd(), faqPageJsonLd()];
}
