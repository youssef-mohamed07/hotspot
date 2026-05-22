import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Cairo } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { homePageJsonLd, rootMetadata } from "@/lib/seo";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08090c] text-zinc-100">
        <JsonLd data={homePageJsonLd()} />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
