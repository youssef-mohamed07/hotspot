"use client";

import { useEffect, useState } from "react";
import { IconArrowRight } from "./icons";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060a]/70 via-[#05060a]/85 to-[#05060a]" aria-hidden />
      <div className="aurora" aria-hidden />
      <div className="grid-floor pointer-events-none absolute inset-0" aria-hidden />

      <div
        className={`relative z-10 flex max-w-5xl flex-col items-center text-center transition-all duration-1000 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-zinc-300">
          <span className="pulse-dot" />
          Cybertruck Activations • LED Walls • Stage Production
        </div>

        <h1 className="display-headline text-5xl text-white sm:text-6xl md:text-7xl lg:text-[7rem]">
          Beyond Traditional
          <br />
          <span className="text-gradient-accent">Advertising</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-zinc-300 md:text-xl">
          Transform your brand into a moving experience people stop, film, and
          share. Immersive event technology powered by motion, LED, lighting,
          and interactive activations.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
          >
            Book Your Experience
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#visualization"
            className="glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Explore the Truck
            <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}
