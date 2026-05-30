import { Hero } from "@/components/hero";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ClientsMarqueeSection } from "@/components/sections/clients-marquee-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { TargetAudienceSection } from "@/components/sections/target-audience-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ConceptSection } from "@/components/sections/concept-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FormSection } from "@/components/sections/form-section";
import { OtherServicesSection } from "@/components/sections/other-services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServingCitiesSection } from "@/components/sections/serving-cities-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TransitionStatsSection } from "@/components/sections/transition-stats-section";
import { VisualizationSection } from "@/components/sections/visualization-section";
import { ExperientialMarketingSection } from "@/components/sections/experiential-marketing-section";
import { isAudience, type Audience } from "@/i18n/audience";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; audience: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam, audience: audienceParam } = await params;
  if (!isLocale(localeParam) || !isAudience(audienceParam)) return {};

  const locale = localeParam as Locale;
  const audience = audienceParam as Audience;
  const dict = getDictionary(locale, audience);

  return buildMetadata({
    title: dict.meta.title,
    description: dict.meta.description,
    path: localizedPath(locale, audience),
    locale,
    audience,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam, audience: audienceParam } = await params;
  if (!isLocale(localeParam) || !isAudience(audienceParam)) notFound();

  const audience = audienceParam as Audience;
  const isB2B = audience === "b2b";

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 bg-white text-start">
        <Hero />
        <ClientsMarqueeSection />
        <ExperientialMarketingSection />
        <TargetAudienceSection />
        <BeforeAfterSection />
        <ServingCitiesSection />
        <TransitionStatsSection />
        <ProcessSection />
        <ConceptSection />
        {isB2B && <CaseStudiesSection />}
        <OtherServicesSection />
        <TestimonialsSection />
        <FormSection />
        <VisualizationSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
