import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Cairo } from "next/font/google";
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

export const metadata: Metadata = {
  title: "HotSpot — Event Technology Solutions",
  description:
    "Integrated LED screens, lighting, sound systems, and live event production across Saudi Arabia. Where technology becomes experience.",
  metadataBase: new URL("https://hotsspots.com"),
  openGraph: {
    title: "HotSpot — Event Technology Solutions",
    description:
      "Integrated AV, LED screens, lighting and sound systems for every type of event.",
    url: "https://hotsspots.com",
    siteName: "HotSpot",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#08090c] text-zinc-100">
        {children}
      </body>
    </html>
  );
}
