"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { IconArrowRight } from "./icons";

// 3D scene — browser only, lazy
const CybertruckScene = dynamic(
  () => import("./cybertruck-scene").then((m) => m.CybertruckScene),
  { ssr: false, loading: () => <SceneFallback /> }
);

function SceneFallback() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-3 text-zinc-500">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
        <p className="text-[10px] uppercase tracking-[0.3em]">Loading 3D model</p>
      </div>
    </div>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12 sm:px-6">
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

      {/* Stage container */}
      <div
        className={`relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center transition-all duration-1000 ease-out ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        {/* Top label */}
        <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-zinc-300 sm:text-xs">
          <span className="pulse-dot" />
          Cybertruck • LED Walls • Stage Production
        </div>

        {/* Headline */}
        <h1 className="display-headline text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem]">
          Beyond Traditional
          <br />
          <span className="text-gradient-accent">Advertising</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base text-zinc-300 md:text-lg">
          Transform your brand into a moving experience people stop, film, and
          share. Powered by motion, LED, and interactive activations.
        </p>

        {/* 3D stage — sits BELOW the headline like the reference */}
        <div className="relative mt-10 aspect-[16/9] w-full max-w-5xl sm:aspect-[16/8]">
          {/* Ground glow */}
          <div className="absolute inset-x-10 bottom-0 h-1/3 rounded-[100%] bg-accent-gradient opacity-30 blur-3xl" aria-hidden />
          {/* Side rim glow */}
          <div className="pointer-events-none absolute -inset-4 rounded-[40px] bg-[radial-gradient(70%_60%_at_50%_60%,rgba(42,118,166,0.2),transparent_70%)]" aria-hidden />
          <CybertruckScene initialView="hero" />
        </div>

        {/* CTAs */}
        <div className="-mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
          >
            Book Your Experience
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#concept"
            className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
          >
            See the Concept
            <IconArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-zinc-500 to-transparent" />
        </div>
      </div>
    </section>
  );
}
