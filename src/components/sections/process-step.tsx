"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { useIsRtl } from "@/i18n/locale-provider";

const EASTERN_DIGITS = [
  "٠",
  "١",
  "٢",
  "٣",
  "٤",
  "٥",
  "٦",
  "٧",
  "٨",
  "٩",
] as const;

function formatStepNumeral(n: string, rtl: boolean) {
  if (!rtl) return n;
  return n.replace(/\d/g, (d) => EASTERN_DIGITS[Number(d)] ?? d);
}

export function ProcessStep({
  step,
  index,
}: {
  step: Dictionary["process"]["steps"][number];
  index: number;
}) {
  const isRtl = useIsRtl();
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  const isEven = index % 2 === 0;
  /** Grid columns follow inline-start/end — mirrors automatically in RTL */
  const cardCol = isRtl ? "" : isEven ? "md:col-start-1" : "md:col-start-2";
  const numeralCol = isEven ? "md:col-start-2" : "md:col-start-1";
  const cardPad = isRtl ? "md:ps-14 md:pe-0" : isEven ? "md:pe-12" : "md:ps-12";
  const numeralAlign = isEven
    ? "md:justify-start md:ps-12"
    : "md:justify-end md:pe-12";

  const displayN = formatStepNumeral(step.n, isRtl);
  const stepLabel = isRtl ? `${displayN} /` : `/${step.n}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cardEnterX = isRtl ? 32 : isEven ? -48 : 48;
  const numeralEnterX = isEven ? (isRtl ? -36 : 36) : isRtl ? 36 : -36;

  return (
    <li ref={ref} className="relative min-h-[5rem] md:min-h-0">
      <span
        className={`absolute start-[1.125rem] top-1/2 z-10 -translate-y-1/2 ${
          isRtl ? "translate-x-1/2" : "-translate-x-1/2"
        } ${isRtl ? "md:start-[1.5rem]" : "md:start-1/2"} ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } transition-all duration-500`}
        aria-hidden
      >
        <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(42,118,166,0.9)] md:h-4 md:w-4" />
        <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50 animate-ping md:h-8 md:w-8" />
      </span>

      <div
        className={`grid items-center gap-6 ${isRtl ? "" : "md:grid-cols-2"}`}
      >
        <div
          className={`pt-1 ps-10 sm:ps-12 md:row-start-1 ${cardCol} ${cardPad} pe-2 sm:pe-4 ${isRtl ? "" : isEven ? "md:ps-0" : "md:pe-0"}`}
          style={{
            transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "100ms",
            transform: visible
              ? "translate(0, 0)"
              : `translate(${cardEnterX}px, 20px)`,
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="spotlight-card glass-card group rounded-3xl p-7 text-start hover:border-white/20 md:p-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              {stepLabel}
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
              {step.blurb}
            </p>
          </div>
        </div>

        <div
          className={`${isRtl ? "hidden" : "hidden md:flex"} md:row-start-1 md:items-center ${numeralCol} ${numeralAlign}`}
          style={{
            transition: "all 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "200ms",
            transform: visible
              ? "translate(0, 0)"
              : `translate(${numeralEnterX}px, 0)`,
            opacity: visible ? 1 : 0,
          }}
        >
          <span
            className="display-headline select-none text-[8rem] leading-none text-zinc-900/[0.06] lg:text-[11rem]"
            dir="ltr"
          >
            {displayN}
          </span>
        </div>
      </div>
    </li>
  );
}
