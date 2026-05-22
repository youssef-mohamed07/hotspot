import { notFound } from "next/navigation";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { HtmlDirSync } from "@/components/i18n/html-dir-sync";
import { isAudience, type Audience } from "@/i18n/audience";
import { LocaleProvider } from "@/i18n/locale-provider";
import { getDirection, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function generateStaticParams() {
  return [
    { locale: "en", audience: "b2b" },
    { locale: "en", audience: "b2c" },
    { locale: "ar", audience: "b2b" },
    { locale: "ar", audience: "b2c" },
  ];
}

export default async function AudienceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string; audience: string }>;
}) {
  const { locale: localeParam, audience: audienceParam } = await params;
  if (!isLocale(localeParam) || !isAudience(audienceParam)) notFound();

  const locale = localeParam as Locale;
  const audience = audienceParam as Audience;
  const dict = getDictionary(locale, audience);
  const dir = getDirection(locale);

  return (
    <LocaleProvider locale={locale} audience={audience} dict={dict}>
      <HtmlDirSync locale={locale} />
      <div dir={dir} lang={locale} className="flex min-h-full flex-1 flex-col text-start">
        {children}
        <WhatsAppFloat />
      </div>
    </LocaleProvider>
  );
}
