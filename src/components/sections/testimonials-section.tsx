"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/data/testimonials";
import { AggregateRating } from "@/components/testimonials/aggregate-rating";
import { StarIcon } from "@/components/testimonials/star-icon";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const main = testimonials[active];

  return (
    <section className="relative overflow-hidden py-32">
      {/* Atmospheric backdrop */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(45% 55% at 25% 30%, rgba(42,118,166,0.18), transparent 70%), radial-gradient(35% 45% at 80% 70%, rgba(4,40,95,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      {/* Massive quote glyph backdrop */}
      <div
        aria-hidden
        className="display-headline pointer-events-none absolute -left-8 top-20 select-none text-[28rem] leading-none text-white/[0.02] sm:-left-16 sm:text-[40rem]"
      >
        “
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header + aggregate rating */}
        <Reveal className="mb-16 flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Client voices</p>
            </div>
            <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Trusted by the<br />
              <span className="text-gradient-accent">biggest stages.</span>
            </h2>
          </div>
          <AggregateRating />
        </Reveal>

        {/* Featured testimonial */}
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[36px] glass-strong">
            {/* Accent gradient wash */}
            <div
              className={`absolute inset-0 opacity-50 bg-gradient-to-br ${main.accent}`}
              style={{ mixBlendMode: "soft-light" }}
              aria-hidden
            />
            <div
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(60% 80% at 80% 20%, rgba(42,118,166,0.22), transparent 65%)",
              }}
              aria-hidden
            />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-30" aria-hidden />

            <div className="relative grid gap-10 p-8 sm:p-12 md:p-16 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              {/* Quote side */}
              <div className="flex flex-col">
                {/* Rating */}
                <div className="mb-6 flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < main.rating} className="h-4 w-4" />
                  ))}
                  <span className="ml-3 text-[10px] uppercase tracking-[0.3em] text-zinc-400">
                    Verified partner
                  </span>
                </div>

                {/* The quote */}
                <p className="text-pretty text-2xl font-medium leading-tight text-white sm:text-3xl md:text-4xl lg:leading-[1.15]">
                  <span className="text-accent">&ldquo;</span>
                  {main.quote}
                  <span className="text-accent">&rdquo;</span>
                </p>

                {/* Author block */}
                <div className="mt-10 flex items-center gap-4">
                  <div
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${main.accent} text-base font-semibold text-white shadow-lg shadow-accent/20`}
                  >
                    {main.initials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">{main.author}</p>
                    <p className="text-sm text-zinc-400">
                      {main.role} · <span className="text-zinc-300">{main.company}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric pull-out */}
              <div className="flex flex-col gap-3 lg:items-end lg:text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Outcome</p>
                <p className="display-headline text-7xl text-white sm:text-8xl">
                  {main.metric.value}
                </p>
                <p className="max-w-[12rem] text-sm text-zinc-300 lg:ml-auto">
                  {main.metric.label}
                </p>
                {/* Bottom progress dots / nav */}
                <div className="mt-6 flex items-center gap-2 lg:justify-end">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Show testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active
                          ? "w-8 bg-accent shadow-[0_0_8px_rgba(42,118,166,0.7)]"
                          : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Side rail with the other two */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={0.05 * i}>
              <button
                onClick={() => setActive(i)}
                className={`spotlight-card glass-card group h-full w-full rounded-3xl p-6 text-left transition hover:-translate-y-0.5 ${
                  i === active
                    ? "border-accent/40 bg-accent/[0.04]"
                    : "hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${t.accent} text-xs font-semibold text-white`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.author}</p>
                      <p className="text-[11px] text-zinc-500">{t.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <StarIcon key={j} filled className="h-2.5 w-2.5" />
                    ))}
                  </div>
                </div>
                <p className="mt-5 line-clamp-3 text-xs leading-relaxed text-zinc-400 transition group-hover:text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500">{t.metric.label}</span>
                  <span className="text-sm font-semibold text-accent">{t.metric.value}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}