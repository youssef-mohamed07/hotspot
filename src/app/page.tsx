import { Hero } from "@/components/hero";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ConceptSection } from "@/components/sections/concept-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FormSection } from "@/components/sections/form-section";
import { OtherServicesSection } from "@/components/sections/other-services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ProofOfConceptSection } from "@/components/sections/proof-of-concept-section";
import { ServingCitiesSection } from "@/components/sections/serving-cities-section";
import { StrongestToolSection } from "@/components/sections/strongest-tool-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TransitionStatsSection } from "@/components/sections/transition-stats-section";
import { VisualizationSection } from "@/components/sections/visualization-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StrongestToolSection />
        <ProofOfConceptSection />
        <ConceptSection />
        <TransitionStatsSection />
        <VisualizationSection />
        <CaseStudiesSection />
        <ProcessSection />
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
