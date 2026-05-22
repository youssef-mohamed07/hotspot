"use client";

import { Reveal } from "@/components/reveal";
import { CaseStudyCard } from "@/components/case-studies/case-study-card";
import { useDictionary } from "@/i18n/locale-provider";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudiesSection() {
  const dict = useDictionary();
  const caseStudies: CaseStudy[] = dict.caseStudies.items.map((item) => ({
    ...item,
    image: "",
  }));

  return (
    <section id="cases" className="relative overflow-hidden bg-[#fafafa] py-24 md:py-32">
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply" aria-hidden />

      <div className="relative mx-auto w-full max-w-[100rem] px-6">
        <Reveal className="mb-14 max-w-3xl text-start">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {dict.caseStudies.eyebrow}
            </p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.caseStudies.headline1}
            <br />
            <span className="text-gradient-accent">{dict.caseStudies.headlineAccent}</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-10 lg:gap-14">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.08}>
              <CaseStudyCard study={cs} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
