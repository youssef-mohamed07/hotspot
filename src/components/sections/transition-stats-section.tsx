"use client";

import { Reveal } from "@/components/reveal";
import { Counter } from "@/components/counter";
import { transitionStats } from "@/data/transition-stats";

export function TransitionStatsSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(60% 60% at 50% 50%, rgba(42,118,166,0.18), transparent 70%)" }} aria-hidden />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md sm:grid-cols-2 lg:grid-cols-4">
          {transitionStats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06}>
              <div className="group relative h-full glass-light p-10 text-center transition hover:bg-white/[0.06]">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">/{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-xs uppercase tracking-widest text-zinc-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}