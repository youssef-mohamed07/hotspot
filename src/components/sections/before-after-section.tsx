"use client";

import { Reveal } from "@/components/reveal";
import { BeforeAfterSlider } from "@/components/before-after/before-after-slider";

/** Replace with transparent PNGs (45° Cybertruck, same angle) when available */
const BEFORE_IMAGE = "/hero/car-hero.png";
const AFTER_IMAGE = "/hero/car-hero.png";

export function BeforeAfterSection() {
  return (
    <section
      id="before-after"
      className="relative overflow-hidden bg-[#fafafa] py-24 md:py-32"
    >
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply" aria-hidden />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Transformation</p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            Before vs after
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
            See the exact transformation — from stock Cybertruck to your brand moving through Saudi
            streets.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <BeforeAfterSlider
            beforeSrc={BEFORE_IMAGE}
            afterSrc={AFTER_IMAGE}
            beforeAlt="Stock Cybertruck before branding"
            afterAlt="Cybertruck after full brand wrap"
          />
          <p className="mt-6 text-center text-xs text-zinc-500">
            Drag the handle to compare · Same angle · Transparent assets with shadow
          </p>
        </Reveal>
      </div>
    </section>
  );
}
