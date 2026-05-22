"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/process-steps";

export function ProcessStep({
  step, index,
}: {
  step: typeof processSteps[number];
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);
  const fromLeft = index % 2 === 0;

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
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <li ref={ref} className="relative">
      {/* Mobile dot (left rail) */}
      <span
        className={`absolute left-6 top-6 -translate-x-1/2 md:hidden ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } transition-all duration-500`}
        aria-hidden
      >
        <span className="block h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_rgba(42,118,166,0.9)]" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full border border-accent/50 animate-ping" />
      </span>

      {/* Desktop dot (center rail) */}
      <span
        className={`absolute left-1/2 top-6 hidden -translate-x-1/2 md:block ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        } transition-all duration-500`}
        style={{ transitionDelay: "120ms" }}
        aria-hidden
      >
        <span className="relative block h-4 w-4 rounded-full bg-accent shadow-[0_0_14px_rgba(42,118,166,0.9)]">
          <span className="absolute inset-0 rounded-full bg-white/30" />
        </span>
        <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 animate-ping" />
      </span>

      <div
        className={`grid items-start gap-6 md:grid-cols-2 ${
          fromLeft ? "" : "md:[&>div:first-child]:order-2"
        }`}
      >
        {/* Card side */}
        <div
          className={`pl-16 md:pl-0 ${fromLeft ? "md:pr-12" : "md:pl-12"}`}
          style={{
            transition: "all 800ms cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "100ms",
            transform: visible
              ? "translateX(0) translateY(0)"
              : `translateX(${fromLeft ? "-40px" : "40px"}) translateY(20px)`,
            opacity: visible ? 1 : 0,
          }}
        >
          <div className="spotlight-card glass-card group rounded-3xl p-7 hover:border-white/20 md:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                /Step {step.n}
              </span>
              {"duration" in step && (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                  {(step as any).duration}
                </span>
              )}
            </div>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
              {step.blurb}
            </p>
            {"bullets" in step && (
              <ul className="mt-5 space-y-2">
                {(step as any).bullets.map((b: string) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-zinc-600 md:text-sm">
                    <span className="mt-1.5 grid h-3 w-3 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Numeral side — huge index for visual rhythm */}
        <div
          className={`hidden md:flex md:items-start ${fromLeft ? "md:justify-start md:pl-12" : "md:justify-end md:pr-12"}`}
          style={{
            transition: "all 900ms cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: "200ms",
            transform: visible
              ? "translateX(0)"
              : `translateX(${fromLeft ? "30px" : "-30px"})`,
            opacity: visible ? 1 : 0,
          }}
        >
          <span className="display-headline select-none text-[8rem] leading-none text-zinc-900/[0.06] lg:text-[11rem]">
            {step.n}
          </span>
        </div>
      </div>
    </li>
  );
}