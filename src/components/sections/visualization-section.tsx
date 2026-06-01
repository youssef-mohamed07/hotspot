"use client";

import { CybertruckSceneDynamic } from "@/components/scene/cybertruck-scene-dynamic";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { useDictionary } from "@/i18n/locale-provider";

export function VisualizationSection() {
  const dict = useDictionary();
  const c = dict.visualization;

  return (
    <section
      id="visualization"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-white py-16"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(42,118,166,0.12), transparent 50%), radial-gradient(circle at 80% 80%, rgba(4,40,95,0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-15"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-col items-center mb-10 max-w-3xl mx-auto text-center">
            <SectionHeader
              variant="normal"
              align="center"
              title={c.eyebrow}
              theme="light"
              headline={
                <>
                  {c.headline1}{" "}
                  <span className="text-gradient-accent">
                    {c.headlineAccent}
                  </span>
                  {"headline2" in c && c.headline2 ? ` ${c.headline2}` : ""}
                </>
              }
              subtitle={c.subtitle}
            />
        </div>

        <Reveal delay={0.08}>
          <div className="mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-[48px] border border-zinc-200/50 shadow-[0_32px_80px_rgba(0,0,0,0.08)] bg-zinc-50/30">
            <CybertruckSceneDynamic
              initialView="explore"
              src="/Cybertruck%203D/Cyber%20Truck%20HotSpot.glb"
              alt={c.modelAlt}
              className="h-full w-full"
              modelClassName="h-full w-full"
              showLogo={false}
              showControls={false}
              tone="original"
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
