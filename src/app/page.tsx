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
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "HotSpot | Cybertruck Brand Activations & Event Production — Saudi Arabia",
  description:
    "Cyber Stage: branded Tesla Cybertruck activations for product launches, venues & festivals. LED, sound, lighting & full event production in Riyadh, Jeddah, Khobar, Mecca & Medina. Book in 48–72h.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <Hero />
        <ClientsMarqueeSection />
        <TargetAudienceSection />
        <BeforeAfterSection />
        <ExperientialMarketingSection />
        <TransitionStatsSection />
        <ProcessSection />
        <ConceptSection />
        <VisualizationSection />
        <CaseStudiesSection />
        <OtherServicesSection />
        <TestimonialsSection />
        <ServingCitiesSection />
        <FormSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
