"use client";

import { Reveal } from "@/components/reveal";
import { TruckCustomizer } from "@/components/customizer/truck-customizer";
import { useDictionary } from "@/i18n/locale-provider";

export function VisualizationSection() {
  const dict = useDictionary();
  const c = dict.visualization;

  return (
    <section
      id="visualization"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{c.eyebrow}</p>
          <h2 className="display-headline mt-4 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {c.headline1}{" "}
            <span className="text-gradient-accent">{c.headlineAccent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-600">{c.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <TruckCustomizer badge={c.badge} labels={c.customizer} />
        </Reveal>
      </div>
    </section>
  );
}
