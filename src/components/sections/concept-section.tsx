"use client";

import { Reveal } from "@/components/reveal";
import { ConceptPillar } from "@/components/concept/concept-pillar";
import { IconCube } from "@/components/icons";
import { imageAssets } from "@/data/image-assets";
import { useDictionary } from "@/i18n/locale-provider";
import type { ConceptPillarData } from "@/types/concept-pillar";

export function ConceptSection() {
  const dict = useDictionary();
  const pillarData = dict.concept.pillars[1];

  if (!pillarData) return null;

  const pillar: ConceptPillarData = {
    ...pillarData,
    Icon: IconCube,
    image: "",
  };

  return (
    <section
      id="concept"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 50% at 20% 30%, rgba(42,118,166,0.18), transparent 65%), radial-gradient(40% 50% at 80% 70%, rgba(4,40,95,0.18), transparent 65%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-20 max-w-3xl text-start">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{dict.concept.eyebrow}</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.concept.headline1}
            <br />
            <span className="text-gradient-accent">{dict.concept.headlineAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">{dict.concept.subtitle}</p>
        </Reveal>

        <div className="space-y-24 lg:space-y-28">
          <ConceptPillar
            pillar={pillar}
            index={0}
            flipped={false}
            image={imageAssets.conceptPillars[1] ?? imageAssets.conceptPillars[0]}
          />
        </div>
      </div>
    </section>
  );
}
