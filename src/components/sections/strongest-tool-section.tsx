"use client";

import { Reveal } from "@/components/reveal";
import { EngagementGauge } from "@/components/strongest-tool/engagement-gauge";
import { ImpressionsTicker } from "@/components/strongest-tool/impressions-ticker";
import { OutcomeLadder } from "@/components/strongest-tool/outcome-ladder";

export function StrongestToolSection() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Cinematic crowd backdrop */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a] via-[#05060a]/85 to-[#05060a]" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 100%, rgba(42,118,166,0.22), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal className="mb-16 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">The strongest marketing tool</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            The most powerful<br />
            marketing tool in the<br />
            <span className="text-gradient-accent">Saudi market.</span>
          </h2>
        </Reveal>

        {/* Headline comparison strip */}
        <Reveal delay={0.1}>
          <div className="mb-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] sm:grid-cols-2">
            <div className="relative p-8 md:p-10">
              <div className="absolute inset-0 bg-zinc-900/40" aria-hidden />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Traditional ads</p>
                <p className="mt-4 display-headline text-5xl text-zinc-700 line-through decoration-zinc-700/60 sm:text-6xl">
                  IGNORED
                </p>
                <p className="mt-4 text-sm text-zinc-500">
                  Average banner CTR: <span className="text-zinc-300">0.05%</span>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-zinc-600">
                  <li className="flex items-center gap-2"><span className="text-red-500/80">✕</span> Ad-blocked, scrolled past</li>
                  <li className="flex items-center gap-2"><span className="text-red-500/80">✕</span> Saturated, forgettable</li>
                  <li className="flex items-center gap-2"><span className="text-red-500/80">✕</span> Static and time-bound</li>
                </ul>
              </div>
            </div>
            <div className="relative p-8 md:p-10">
              <div
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(70% 80% at 80% 30%, rgba(42,118,166,0.18), transparent 70%), linear-gradient(135deg, rgba(42,118,166,0.08), rgba(4,40,95,0.04))",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">HotSpot Cybertruck</p>
                <p className="mt-4 display-headline text-5xl text-gradient-accent sm:text-6xl">
                  REMEMBERED
                </p>
                <p className="mt-4 text-sm text-zinc-300">
                  Average dwell time per activation: <span className="font-semibold text-white">4–9 min</span>
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2"><span className="text-accent">✓</span> Crowds gather, film, and share</li>
                  <li className="flex items-center gap-2"><span className="text-accent">✓</span> Scarcity-driven attention</li>
                  <li className="flex items-center gap-2"><span className="text-accent">✓</span> Mobile, location-aware, programmable</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Big visual grid: gauge + ticker + outcomes */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Engagement gauge */}
          <Reveal delay={0.2}>
            <div className="spotlight-card glass-card relative h-full overflow-hidden rounded-3xl p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/Gauge · 01</p>
              <p className="mt-2 text-sm text-zinc-300">Engagement vs. traditional</p>
              <EngagementGauge value={94} />
              <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-zinc-500">
                <span>Banner ad</span>
                <span>HotSpot truck</span>
              </div>
            </div>
          </Reveal>

          {/* Live impressions ticker */}
          <Reveal delay={0.28}>
            <div className="spotlight-card glass-card relative h-full overflow-hidden rounded-3xl p-8">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(70% 70% at 50% 100%, rgba(42,118,166,0.4), transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/Live · 02</p>
                <p className="mt-2 text-sm text-zinc-300">Avg. impressions per activation day</p>
                <ImpressionsTicker />
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.9)]" />
                  Verified field data
                </div>
              </div>
            </div>
          </Reveal>

          {/* Outcomes ladder */}
          <Reveal delay={0.36}>
            <div className="spotlight-card glass-card relative h-full overflow-hidden rounded-3xl p-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">/Funnel · 03</p>
              <p className="mt-2 text-sm text-zinc-300">From glance to brand recall</p>
              <OutcomeLadder />
            </div>
          </Reveal>
        </div>

        {/* Tag strip */}
        <Reveal delay={0.45}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {["Mobile reach", "Crowd magnet", "Viral by design", "Premium presence", "Location-aware", "Always shareable"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}