"use client";

import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { IconCamera, IconScreen, IconSparkle, IconSpotlight } from "@/components/icons";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { useDictionary } from "@/i18n/locale-provider";

const addonHotspots = [
  {
    id: "photobooth",
    x: "93%",
    y: "44%",
    Icon: IconCamera,
  },
  {
    id: "giveaways",
    x: "22%",
    y: "52%",
    Icon: IconSparkle,
  },
  {
    id: "ledBackpack",
    x: "7.4%",
    y: "55%",
    Icon: IconScreen,
  },
  {
    id: "topSphere",
    x: "49.5%",
    y: "34%",
    Icon: IconSpotlight,
  },
  {
    id: "frontBranding",
    x: "48.5%",
    y: "59%",
    Icon: IconSparkle,
  },
] as const;

export function AddonsSection() {
  const dict = useDictionary();

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 28% 24%, rgba(42,118,166,0.13), transparent 44%), radial-gradient(circle at 82% 72%, rgba(4,40,95,0.08), transparent 46%)",
        }}
        aria-hidden
      />
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-20"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-[100rem] px-6">
        <SectionHeader
          variant="normal"
          title={dict.addons.eyebrow}
          theme="light"
          align="center"
          className="mx-auto mb-12 max-w-4xl text-center"
          headline={dict.addons.title}
          subtitle={dict.addons.subtitle}
        />

        <Reveal delay={0.08}>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-100 shadow-[0_28px_80px_rgba(0,0,0,0.08)] sm:rounded-[28px]">
            <div className="relative aspect-[8/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/addons/addons.png"
                alt={dict.addons.imageAlt}
                className="absolute inset-0 block h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/25" />

              {addonHotspots.map((hotspot) => {
                const addon =
                  dict.addons.items?.[
                    hotspot.id as keyof typeof dict.addons.items
                  ];
                const Icon = hotspot.Icon;

                // Determine alignment based on horizontal position to prevent cutoff
                if (!addon) return null;
                const xVal = parseFloat(hotspot.x);
                const alignClass =
                  xVal < 25
                    ? "left-0 -translate-x-2"
                    : xVal > 75
                      ? "right-0 translate-x-2"
                      : "left-1/2 -translate-x-1/2";

                return (
                  <div
                    key={hotspot.id}
                    tabIndex={0}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
                    style={{ left: hotspot.x, top: hotspot.y }}
                  >
                    {/* Glassmorphic Popup */}
                    <div
                      className={`pointer-events-none absolute bottom-full mb-2 flex w-32 translate-y-2 scale-95 items-start gap-2 rounded-lg border border-white/40 bg-white/70 px-2.5 py-2 text-start opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus:pointer-events-auto group-focus:translate-y-0 group-focus:scale-100 group-focus:opacity-100 sm:mb-3 sm:w-44 sm:px-3 ${alignClass}`}
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent/20 text-accent sm:h-7 sm:w-7">
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] font-bold leading-tight text-zinc-900 sm:text-xs">
                          {addon?.title}
                        </span>
                        <span className="mt-1 block text-[9px] leading-snug text-zinc-600 sm:text-[11px]">
                          {addon?.description}
                        </span>
                      </span>
                    </div>

                    {/* Heartbeat Dot */}
                    <div className="relative flex h-4 w-4 items-center justify-center sm:h-5 sm:w-5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-accent/60 duration-1000" />
                      <span className="relative flex h-full w-full items-center justify-center rounded-full bg-accent shadow-[0_0_24px_rgba(42,118,166,0.55)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-white sm:h-2 sm:w-2" />
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Decorative Counter Card */}
              <div className="absolute right-4 bottom-4 z-20 rounded-xl border border-white/40 bg-white/90 px-4 py-2.5 shadow-xl backdrop-blur-md sm:right-6 sm:bottom-6 sm:px-6 sm:py-3">
                <div className="text-left ltr">
                  <div className="text-[11px] font-bold text-zinc-900 sm:text-sm">
                    {dict.addons.counter.number}
                  </div>
                  <div className="text-[9px] text-zinc-600 sm:text-[11px]">
                    {dict.addons.counter.label}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-10 flex justify-center">
            <TrackedCta
              href="#contact"
              ctaLocation="addons"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:opacity-90"
            >
              {dict.hero.cta}
              <DirectionalArrow className="h-4 w-4" />
            </TrackedCta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
