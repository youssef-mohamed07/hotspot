"use client";

import { Reveal } from "@/components/reveal";
import { CybertruckSceneDynamic } from "@/components/scene/cybertruck-scene-dynamic";
import { useDictionary } from "@/i18n/locale-provider";

export function VisualizationSection() {
  const dict = useDictionary();

  return (
    <section
      id="visualization"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{dict.visualization.eyebrow}</p>
          <h2 className="display-headline mt-4 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {dict.visualization.headline1}{" "}
            <span className="text-gradient-accent">{dict.visualization.headlineAccent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-600">{dict.visualization.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[36px] glass-strong">
            <div
              className="absolute inset-12 rounded-full bg-accent-gradient opacity-25 blur-3xl"
              aria-hidden
            />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div className="relative h-full w-full">
              <CybertruckSceneDynamic initialView="explore" />
            </div>
            <div className="pointer-events-none absolute start-6 top-6">
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-600">
                <span className="pulse-dot" />
                {dict.visualization.badge}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
