"use client";

import { Reveal } from "@/components/reveal";
import { conceptPillars } from "@/data/concept-pillars";
import { ConceptPillar } from "@/components/concept/concept-pillar";

export function ConceptSection() {
  return (
    <section id="concept" className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24">
      {/* Ambient backdrop */}
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
        {/* Header */}
        <Reveal className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">The concept</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            This Cybertruck is<br />
            <span className="text-gradient-accent">made for you.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">
            Two principles drive every activation — where we put it, and how it&apos;s dressed for your brand.
          </p>
        </Reveal>

        {/* Pillars */}
        <div className="space-y-24 lg:space-y-28">
          {conceptPillars.map((pillar, i) => (
            <ConceptPillar key={pillar.title} pillar={pillar} index={i} flipped={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}