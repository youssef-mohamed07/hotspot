"use client";

import { Reveal } from "@/components/reveal";
import { KingdomMap } from "@/components/cities/kingdom-map";
import { CitiesPanel } from "@/components/cities/cities-panel";

export function ServingCitiesSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(42,118,166,0.2), transparent 70%)" }} aria-hidden />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Serving cities</p>
          <h2 className="display-headline mt-4 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            Operating across<br />
            <span className="text-gradient-accent">the Kingdom.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">
            Riyadh, Jeddah, Khobar, Mecca, and Medina — five active hubs across the Kingdom.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <KingdomMap />
            <CitiesPanel />
          </div>
        </Reveal>
      </div>
    </section>
  );
}