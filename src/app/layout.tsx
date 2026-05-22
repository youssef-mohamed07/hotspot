import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Bebas_Neue, Cairo } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { homePageJsonLd, rootMetadata } from "@/lib/seo";
import { defaultAudience, isAudience, type Audience } from "@/i18n/audience";
import { defaultLocale, getDirection, isLocale, type Locale } from "@/i18n/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic"],
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#2a76a6",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale") ?? defaultLocale;
  const audienceHeader = headersList.get("x-audience") ?? defaultAudience;
  const locale: Locale = isLocale(localeHeader) ? localeHeader : defaultLocale;
  const audience: Audience = isAudience(audienceHeader) ? audienceHeader : defaultAudience;
  const dir = getDirection(locale);
  const fontClass = `${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${cairo.variable} h-full antialiased${locale === "ar" ? " lang-ar" : ""}`;

  return (
    <html lang={locale} dir={dir} className={fontClass}>
      <body className="min-h-full flex flex-col bg-[#08090c] text-zinc-100">
        <JsonLd data={homePageJsonLd(locale, audience)} />
        {children}
      </body>
    </html>
  );
}
