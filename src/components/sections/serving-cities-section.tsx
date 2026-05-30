"use client";

import { Reveal } from "@/components/reveal";
import { KingdomMap } from "@/components/cities/kingdom-map";
import { CitiesPanel } from "@/components/cities/cities-panel";
import { useDictionary, useIsRtl } from "@/i18n/locale-provider";

export function ServingCitiesSection() {
  const dict = useDictionary();
  const isRtl = useIsRtl();

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-white py-24">
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
                <CitiesPanel />
                <KingdomMap />
              </>
            ) : (
              <>
                <KingdomMap />
                <CitiesPanel />
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
