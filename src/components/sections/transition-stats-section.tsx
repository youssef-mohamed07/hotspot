"use client";

import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { transitionStats } from "@/data/transition-stats";

export function TransitionStatsSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-background">
      {/* Subtle atmospheric glow */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(42,118,166,0.12), transparent 75%)" }} 
        aria-hidden 
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-15" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 shadow-sm">
          {transitionStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="group relative h-full bg-white p-8 text-center transition hover:bg-zinc-50/80">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400">/{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-zinc-500">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}