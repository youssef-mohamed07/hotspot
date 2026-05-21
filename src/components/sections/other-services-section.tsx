"use client";

import { Reveal } from "@/components/reveal";
import { IconArrowRight, IconTruck } from "@/components/icons";
import { otherServices } from "@/data/other-services";

export function OtherServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden py-32">
      {/* Backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 50% at 20% 20%, rgba(42,118,166,0.16), transparent 70%), radial-gradient(35% 45% at 80% 80%, rgba(4,40,95,0.16), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Beyond the truck</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            One core product.<br />
            <span className="text-gradient-accent">Four extensions.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            The Cybertruck is the centerpiece. We extend it with full event production capabilities — so a single team owns your activation end to end.
          </p>
        </Reveal>

        {/* Featured Cybertruck card */}
        <Reveal delay={0.1}>
          <a
            href="#visualization"
            className="group relative mb-4 block overflow-hidden rounded-[36px] border border-white/10"
          >
            {/* Brand-blue gradient backdrop */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#04285f] via-[#0a3d6b] to-[#1d5a82]"
              aria-hidden
            />
            {/* Atmospheric overlays */}
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(60% 90% at 80% 30%, rgba(91,163,212,0.35), transparent 60%), radial-gradient(40% 60% at 20% 80%, rgba(4,40,95,0.6), transparent 70%)",
              }}
              aria-hidden
            />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-30" aria-hidden />

            {/* Hover shine sweep */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
            />

            {/* Subtle grain / dot pattern */}
            <div
              aria-hidden
              className="led-panel pointer-events-none absolute inset-0 opacity-25"
            />

            <div className="relative grid gap-10 p-8 md:p-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              {/* Left: copy */}
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur">
                  <span className="pulse-dot" />
                  Core product · /01
                </div>
                <h3 className="display-headline text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  Cybertruck<br />
                  <span className="text-gradient-accent">Activation.</span>
                </h3>
                <p className="max-w-lg text-base text-zinc-200 md:text-lg">
                  The mobile, customizable, attention-stealing platform that anchors every campaign — fully wrapped in your brand, fitted with on-board LED, and operated by our crew.
                </p>

                {/* Pillar chips */}
                <div className="flex flex-wrap gap-2">
                  {["Mobile reach", "Custom wrap", "On-board LED", "Crew + content"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-xs text-white backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#04285f] transition group-hover:translate-x-1">
                    Explore the truck
                    <IconArrowRight className="rtl-flip h-4 w-4" />
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(42,118,166,0.9)]" />
                    Featured experience
                  </span>
                </div>
              </div>

              {/* Right: stylized truck silhouette */}
              <div className="relative flex h-full items-center justify-center">
                <div
                  aria-hidden
                  className="absolute inset-8 rounded-full bg-accent-gradient opacity-40 blur-3xl"
                />
                <div className="relative grid h-40 w-40 place-items-center rounded-3xl border border-white/20 bg-white/[0.06] backdrop-blur md:h-56 md:w-56">
                  <IconTruck className="h-20 w-20 text-white md:h-28 md:w-28" />
                </div>
                {/* Floating spec card */}
                <div className="absolute -bottom-2 -right-2 hidden w-44 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur md:block">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">Mobile rig</p>
                  <p className="mt-1 text-sm font-semibold text-white">Cybertruck · LED skin</p>
                  <p className="mt-2 text-[10px] text-white/50">Plug-and-play · road-ready</p>
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        {/* Supporting services — neutral gray treatment */}
        <Reveal delay={0.18}>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Add-on services · /02–/05
            </p>
            <span className="h-px flex-1 bg-white/10" />
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((service, i) => (
            <Reveal key={service.title} delay={0.2 + i * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.03]">
                {/* Subtle hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-400 transition group-hover:border-white/20 group-hover:text-zinc-200">
                      <service.Icon className="h-4 w-4" />
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-zinc-700">
                      /{String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-200 transition group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-zinc-500 transition group-hover:text-zinc-400">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}