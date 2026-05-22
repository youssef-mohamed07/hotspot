"use client";

import type { Testimonial } from "@/types/testimonial";
import { StarIcon } from "./star-icon";

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
  total: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function FeaturedTestimonial({
  testimonial,
  total,
  activeIndex,
  onSelect,
}: FeaturedTestimonialProps) {
  return (
    <div className="relative overflow-hidden rounded-[36px] glass-strong">
      <div
        className={`absolute inset-0 opacity-50 bg-gradient-to-br ${testimonial.accent}`}
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
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < testimonial.rating} className="h-4 w-4" />
            ))}
            <span className="ml-3 text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              Verified partner
            </span>
          </div>

          <p className="text-pretty text-2xl font-medium leading-tight text-zinc-900 sm:text-3xl md:text-4xl lg:leading-[1.15]">
            <span className="text-accent">&ldquo;</span>
            {testimonial.quote}
            <span className="text-accent">&rdquo;</span>
          </p>

          <div className="mt-10 flex items-center gap-4">
            <div
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${testimonial.accent} text-base font-semibold text-white shadow-lg shadow-accent/20`}
            >
              {testimonial.initials}
            </div>
            <div>
              <p className="text-base font-semibold text-zinc-900">{testimonial.author}</p>
              <p className="text-sm text-zinc-600">
                {testimonial.role} · <span className="text-zinc-700">{testimonial.company}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end lg:text-right">
          <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Outcome</p>
          <p className="display-headline text-7xl text-zinc-900 sm:text-8xl">
            {testimonial.metric.value}
          </p>
          <p className="max-w-[12rem] text-sm text-zinc-600 lg:ml-auto">
            {testimonial.metric.label}
          </p>
          <div className="mt-6 flex items-center gap-2 lg:justify-end" role="tablist" aria-label="Testimonials">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                onClick={() => onSelect(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex
                    ? "w-8 bg-accent shadow-[0_0_8px_rgba(42,118,166,0.7)]"
                    : "w-3 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
