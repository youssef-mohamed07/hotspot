"use client";

import type { Testimonial } from "@/types/testimonial";
import { StarIcon } from "./star-icon";

interface TestimonialCardProps {
  testimonial: Testimonial;
  selected?: boolean;
  onSelect: () => void;
}

export function TestimonialCard({ testimonial, selected = false, onSelect }: TestimonialCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`spotlight-card glass-card group h-full w-full rounded-3xl p-6 text-left transition hover:-translate-y-0.5 ${
        selected ? "border-accent/40 bg-accent/[0.04]" : "hover:border-white/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${testimonial.accent} text-xs font-semibold text-white`}
          >
            {testimonial.initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900">{testimonial.author}</p>
            <p className="text-[11px] text-zinc-500">{testimonial.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5" aria-hidden>
          {Array.from({ length: testimonial.rating }).map((_, j) => (
            <StarIcon key={j} filled className="h-2.5 w-2.5" />
          ))}
        </div>
      </div>
      <p className="mt-5 line-clamp-3 text-xs leading-relaxed text-zinc-600 transition group-hover:text-zinc-700">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
          {testimonial.metric.label}
        </span>
        <span className="text-sm font-semibold text-accent">{testimonial.metric.value}</span>
      </div>
    </button>
  );
}
