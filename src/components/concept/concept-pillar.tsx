"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import type { ConceptPillarData } from "@/types/concept-pillar";

export function ConceptPillar({
  pillar, index, flipped,
}: { pillar: ConceptPillarData; index: number; flipped: boolean }) {
  return (
    <Reveal delay={index * 0.1}>
      <div
        className={`grid items-center gap-10 lg:gap-16 lg:grid-cols-2 ${
          flipped ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        {/* Visual side */}
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[36px]">
            <Image
              src={pillar.image}
              alt={pillar.title}
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-[#05060a]/30 to-transparent" />
            <div
              className="absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  "radial-gradient(60% 60% at 30% 30%, rgba(42,118,166,0.4), transparent 70%)",
              }}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

            {/* Floating index badge */}
            <div className="glass-strong absolute left-6 top-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-zinc-200">
              <span className="pulse-dot" />
              Pillar /{String(index + 1).padStart(2, "0")}
            </div>

            {/* Floating metric pill */}
            <div className="glass-strong absolute bottom-6 right-6 rounded-2xl px-5 py-3">
              <p className="text-2xl font-semibold tracking-tight text-white">{pillar.metric.value}</p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">{pillar.metric.label}</p>
            </div>
          </div>

          {/* Decorative offset frame */}
          <div
            className={`pointer-events-none absolute inset-0 hidden -translate-x-3 translate-y-3 rounded-[36px] border border-accent/20 lg:block ${
              flipped ? "-translate-x-[-12px]" : ""
            }`}
            aria-hidden
          />
        </div>

        {/* Copy side */}
        <div className="relative">
          {/* Huge background numeral */}
          <span
            className="display-headline pointer-events-none absolute -left-2 -top-10 select-none text-[10rem] leading-none text-white/[0.04] sm:text-[14rem]"
            aria-hidden
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 text-accent">
                <pillar.Icon className="h-5 w-5" />
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{pillar.subtitle}</p>
            </div>

            <h3 className="display-headline mt-6 text-3xl text-white sm:text-4xl md:text-5xl">
              {pillar.title}
            </h3>

            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">
              {pillar.description}
            </p>

            {/* Bullets */}
            <ul className="mt-8 space-y-3">
              {pillar.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
