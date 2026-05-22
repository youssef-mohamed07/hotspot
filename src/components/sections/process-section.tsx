"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { IconArrowRight } from "@/components/icons";
import { processSteps } from "@/data/process-steps";
import { ProcessStep } from "@/components/sections/process-step";

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress: 0 when section top hits viewport bottom; 1 when section bottom hits viewport top
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setScrollProgress(p);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <section id="process" className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24">
      {/* Backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 60% at 50% 30%, rgba(42,118,166,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <Reveal className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Our process</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            From brief to<br />
            <span className="text-gradient-accent">activation day.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">
            Five stages, one team, no hand-offs. Every step is signed off before the next begins.
          </p>
        </Reveal>

        {/* Timeline rail */}
        <div ref={containerRef} className="relative">
          {/* Center vertical track (mobile: left-aligned, desktop: centered) */}
          <div
            className="absolute bottom-0 left-6 top-0 w-px bg-white/[0.06] md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />
          {/* Animated progress fill */}
          <div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-accent via-accent-soft to-accent-deep md:left-1/2 md:-translate-x-1/2"
            style={{
              height: `${scrollProgress * 100}%`,
              boxShadow: "0 0 12px rgba(42,118,166,0.6)",
              transition: "height 80ms linear",
            }}
            aria-hidden
          />

          {/* Steps */}
          <ol className="space-y-16 md:space-y-24">
            {processSteps.map((step, i) => (
              <ProcessStep key={step.n} step={step} index={i} />
            ))}
          </ol>
        </div>

        {/* Footer CTA */}
        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-zinc-600">Ready to start your timeline?</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
            >
              Build my brief
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}