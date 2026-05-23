"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { useDictionary, useLocale } from "@/i18n/locale-provider";

const d = (seconds: number): CSSProperties =>
  ({ "--enter-delay": `${seconds}s` }) as CSSProperties;

export function Hero() {
  const dict = useDictionary();
  const locale = useLocale();

  return (
    <section className="dark-hero-bg relative flex w-full flex-col items-center overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pb-28 md:h-dvh md:min-h-dvh md:pb-0 md:pt-24 lg:pt-28">
      <div className="aurora" aria-hidden />
      <div className="cinematic-guides" aria-hidden />

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[10%] bg-linear-to-r from-black/40 to-transparent md:w-[18%] md:from-black/60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-[10%] bg-linear-to-l from-black/40 to-transparent md:w-[18%] md:from-black/60"
        aria-hidden
      />

      <div
        dir="ltr"
        className="locale-shell-ltr relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center"
      >
        <div
          className="enter-item mb-4 flex items-center justify-center gap-3 sm:mb-6"
          style={d(0.14)}
        >
          <div className="flex items-center gap-1.5 pt-0.5">
            <svg
              className="h-3.5 w-3.5 text-accent drop-shadow-[0_0_5px_rgba(80,160,230,0.8)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <span className="text-[12px] font-black italic tracking-wider text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] sm:text-[14px]">
              {dict.hero.badgeRank}
            </span>
          </div>
          <div className="h-3.5 w-px bg-white/30" />
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-zinc-300 sm:text-[11px]">
            {dict.hero.badgeLabel}
          </span>
        </div>

        <h1
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="display-headline text-[2.5rem] leading-[0.92] tracking-[-0.01em] text-white sm:text-5xl sm:leading-[0.9] md:text-6xl lg:text-[5.5rem] xl:text-[6.25rem]"
        >
          <span className="enter-item block" style={d(0.22)}>
            {dict.hero.titleLine1}
          </span>
          <span className="enter-item hero-accent-gradient mt-0 block" style={d(0.3)}>
            <span className="text-gradient-accent">{dict.hero.titleLine2}</span>
          </span>
        </h1>

        <p
          dir={locale === "ar" ? "rtl" : "ltr"}
          className="enter-item mt-4 max-w-xl text-[14px] leading-[1.6] text-zinc-300/90 sm:mt-5 sm:text-base md:text-[17px] md:leading-[1.6]"
          style={d(0.38)}
        >
          {dict.hero.subtitle1}
          <br className="hidden sm:block" />
          {dict.hero.subtitle2}
        </p>

        <div
          className="enter-item relative z-20 mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-6 sm:gap-3 md:mt-7"
          style={d(0.46)}
        >
          <TrackedCta
            href="#contact"
            ctaLocation="hero"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent-gradient px-5 py-2.5 text-[13px] font-semibold tracking-wide text-white shadow-[0_0_50px_-12px_rgba(80,160,230,0.85)] ring-1 ring-white/10 transition-all duration-300 hover:shadow-[0_0_60px_-8px_rgba(80,160,230,1)] hover:ring-white/20 sm:px-6 sm:py-3 sm:text-sm"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
            />
            <span className="relative">{dict.hero.cta}</span>
            <DirectionalArrow className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
          </TrackedCta>
        </div>
      </div>

      <div className="relative z-0 mt-8 flex w-full max-w-2xl items-end justify-center pb-2 sm:mt-10 sm:max-w-3xl sm:pb-4 md:mt-10 md:max-w-5xl md:flex-1 md:pb-6">
        <div className="hero-spotlight" aria-hidden />

        <div
          className="enter-item enter-item-vehicle relative z-10 flex w-full items-end justify-center"
          style={d(0.54)}
        >
          <div className="relative">
            <div className="vehicle-edge-glow" aria-hidden />

            <div className="relative z-10 h-[220px] w-[82vw] max-w-3xl drop-shadow-[0_28px_44px_rgba(0,0,0,0.5)] sm:h-[280px] md:h-[32vh] lg:h-[36vh]">
              <Image
                src="/hero/tawuniya-hero-transparent.png"
                alt="HotSpot branded Cybertruck"
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 82vw, 768px"
                priority
              />
            </div>

            <div
              aria-hidden
              className="vehicle-reflection pointer-events-none absolute start-0 end-0 top-[calc(100%-18px)] z-5 mx-auto h-[220px] w-[82vw] max-w-3xl scale-y-[-1] opacity-16 blur-[1px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.45),transparent_55%)] sm:h-[280px] md:h-[32vh] lg:h-[36vh]"
            >
              <Image
                src="/hero/tawuniya-hero-transparent.png"
                alt=""
                fill
                className="object-contain object-center"
                sizes="(max-width: 768px) 82vw, 768px"
              />
            </div>

            <div
              className="pointer-events-none absolute start-1/2 top-[calc(100%-22px)] h-16 w-[110%] -translate-x-1/2 rounded-[50%] bg-black/55 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute start-1/2 top-[calc(100%-14px)] h-10 w-[90%] -translate-x-1/2 rounded-[50%] bg-black/75 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute start-1/2 top-[calc(100%-6px)] h-5 w-[65%] -translate-x-1/2 rounded-[50%] bg-black/90 blur-lg"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute start-1/2 top-[calc(100%-2px)] h-2 w-[45%] -translate-x-1/2 rounded-[50%] bg-black blur-sm"
              aria-hidden
            />
          </div>
        </div>
      </div>

      <div className="hero-bottom-transition z-20" aria-hidden />
    </section>
  );
}
