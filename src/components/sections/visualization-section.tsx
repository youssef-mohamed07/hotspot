"use client";

import { CybertruckSceneDynamic } from "@/components/scene/cybertruck-scene-dynamic";
import { Reveal } from "@/components/reveal";
import { useDictionary } from "@/i18n/locale-provider";

export function VisualizationSection() {
  const dict = useDictionary();
  const c = dict.visualization;

  return (
    <section
      id="visualization"
      className="relative flex min-h-[56dvh] flex-col items-center justify-center overflow-hidden py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <Reveal className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{c.eyebrow}</p>
          <h2 className="display-headline mt-4 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {c.headline1}{" "}
            <span className="text-gradient-accent">{c.headlineAccent}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">{c.subtitle}</p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-[28px] glass-strong">
            <CybertruckSceneDynamic
              initialView="explore"
              src="/Cyber%20Truck%20Koora%20Break.glb"
              alt="Koora Break 3D model"
              className="h-full w-full"
              modelClassName="h-full w-full"
              showLogo={false}
              showControls
              tone="original"
              controlsPlacement="side"
              autoRotate
              rotationPerSecond="8deg"
              disableZoom
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
