"use client";

import { useEffect, useRef, useState } from "react";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { Reveal } from "@/components/reveal";
import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { ProcessStep } from "@/components/sections/process-step";
import { useDictionary } from "@/i18n/locale-provider";

export function ProcessSection() {
  const dict = useDictionary();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
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
    <section
      id="process"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24"
    >
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
        <Reveal className="mb-20 max-w-3xl text-start">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{dict.process.eyebrow}</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.process.headline1}
            <br />
            <span className="text-gradient-accent">{dict.process.headlineAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">{dict.process.subtitle}</p>
        </Reveal>

        <div ref={containerRef} className="relative">
          <div
            className="absolute bottom-0 start-1/2 top-0 w-px -translate-x-1/2 bg-white/[0.06]"
            aria-hidden
          />
          <div
            className="absolute start-1/2 top-0 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-accent via-accent-soft to-accent-deep"
            style={{
              height: `${scrollProgress * 100}%`,
              boxShadow: "0 0 12px rgba(42,118,166,0.6)",
              transition: "height 120ms ease-out",
            }}
            aria-hidden
          />

          <ol className="space-y-16 md:space-y-24">
            {dict.process.steps.map((step, i) => (
              <ProcessStep key={step.n} step={step} index={i} />
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-24 flex flex-col items-center gap-4 text-center">
            <p className="text-sm text-zinc-600">{dict.process.ctaPrompt}</p>
            <TrackedCta
              href="#contact"
              ctaLocation="process"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
            >
              {dict.process.cta}
              <DirectionalArrow className="h-4 w-4" />
            </TrackedCta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
