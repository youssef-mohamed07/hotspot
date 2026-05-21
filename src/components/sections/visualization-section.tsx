"use client";

import { Reveal } from "@/components/reveal";
import { CybertruckSceneDynamic } from "@/components/scene/cybertruck-scene-dynamic";

export function VisualizationSection() {
  return (
    <section id="visualization" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Visualization</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Meet your <span className="text-gradient-accent">activation truck.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-zinc-400">
            Drag to rotate. Scroll to zoom. Explore every angle of the platform that will carry your brand.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[36px] glass-strong">
            <div className="absolute inset-12 rounded-full bg-accent-gradient opacity-25 blur-3xl" aria-hidden />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div className="relative h-full w-full">
              <CybertruckSceneDynamic initialView="explore" />
            </div>
            <div className="pointer-events-none absolute left-6 top-6">
              <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-300">
                <span className="pulse-dot" />
                Drag · Zoom · Explore
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}