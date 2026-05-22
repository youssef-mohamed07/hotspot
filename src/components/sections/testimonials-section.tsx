"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/data/testimonials";
import { AggregateRating } from "@/components/testimonials/aggregate-rating";
import { FeaturedTestimonial } from "@/components/testimonials/featured-testimonial";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const featured = testimonials[active];
  const others = testimonials
    .map((testimonial, index) => ({ testimonial, index }))
    .filter(({ index }) => index !== active);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24">
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(45% 55% at 25% 30%, rgba(42,118,166,0.18), transparent 70%), radial-gradient(35% 45% at 80% 70%, rgba(4,40,95,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div
        aria-hidden
        className="display-headline pointer-events-none absolute -left-8 top-20 select-none text-[28rem] leading-none text-white/[0.02] sm:-left-16 sm:text-[40rem]"
      >
        &ldquo;
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
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

        <Reveal delay={0.15}>
          <FeaturedTestimonial
            testimonial={featured}
            total={testimonials.length}
            activeIndex={active}
            onSelect={setActive}
          />
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map(({ testimonial, index }, i) => (
            <Reveal key={testimonial.author} delay={0.05 * i} className="h-full">
              <TestimonialCard
                testimonial={testimonial}
                onSelect={() => setActive(index)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
