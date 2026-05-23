"use client";

import { Reveal } from "@/components/reveal";
import { KingdomMap } from "@/components/cities/kingdom-map";
import { CitiesPanel } from "@/components/cities/cities-panel";
import { useDictionary, useIsRtl, useAudience } from "@/i18n/locale-provider";

export function ServingCitiesSection() {
  const dict = useDictionary();
  const isRtl = useIsRtl();
  const audience = useAudience();

  const SidePanel = () => {
    if (audience === "b2b") {
      return (
        <div className="flex h-full flex-col justify-center gap-4 text-start lg:pl-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500 mb-2">
            {dict.cities.zonesTitle}
          </p>
          <ul className="space-y-4">
            {dict.cities.zones.map((item, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-lg font-medium text-zinc-800">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <CitiesPanel />;
  };

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(42,118,166,0.2), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-3xl text-start">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            {dict.cities.eyebrow}
          </p>
          <h2 className="display-headline mt-4 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {dict.cities.headline1}
            <br />
            <span className="text-gradient-accent">
              {dict.cities.headlineAccent}
            </span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">{dict.cities.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className={`grid gap-6 ${isRtl ? "lg:grid-cols-[1fr_1.4fr]" : "lg:grid-cols-[1.4fr_1fr]"}`}
          >
            {isRtl ? (
              <>
                <SidePanel />
                <KingdomMap showPins={audience !== "b2b"} showLegend={audience !== "b2b"} />
              </>
            ) : (
              <>
                <KingdomMap showPins={audience !== "b2b"} showLegend={audience !== "b2b"} />
                <SidePanel />
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
