export const siteConfig = {
  name: "HotSpot",
  legalName: "HotSpot Event Technology",
  tagline: "Cybertruck activations & 360° event production in Saudi Arabia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hotsspots.com",
  locale: "en_SA",
  email: "inquiry@hotsspots.com",
  phone: "+966543938548",
  phoneDisplay: "+966 54 393 8548",
  whatsappMessage:
    "Hi HotSpot! I'd like to learn more about Cyber Stage and book an activation.",
  address: {
    city: "Riyadh",
    country: "SA",
    countryName: "Saudi Arabia",
  },
  social: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    x: "https://x.com/",
  },
} as const;

export function getWhatsAppUrl(message = siteConfig.whatsappMessage) {
  const phone = siteConfig.phone.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
