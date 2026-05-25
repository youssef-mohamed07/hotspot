"use client";

import { Reveal } from "@/components/reveal";
import { StarIcon } from "@/components/testimonials/star-icon";
import { useDictionary } from "@/i18n/locale-provider";

const CARD_ACCENTS = [
  "from-[#2a76a6] to-[#04285f]",
  "from-[#5ba3d4] to-[#2a76a6]",
  "from-[#1d5a82] to-[#04285f]",
] as const;

function authorInitial(author: string) {
  const trimmed = author.replace(/[.\s]+$/u, "").trim();
  return trimmed.charAt(0) || "?";
}

export function TestimonialsSection() {
  const dict = useDictionary();
  const featuredIndex = 1;

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fafafa] py-24 md:py-32">
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <Reveal className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {dict.testimonials.eyebrow}
            </p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {dict.testimonials.headline1}
            <br />
            <span className="text-accent">{dict.testimonials.headlineAccent}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
            {dict.testimonials.subtitle}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-3 md:gap-8">
          {dict.testimonials.items.map((testimonial, i) => {
            const isFeatured = i === featuredIndex;

            return (
              <Reveal
                key={testimonial.author}
                delay={0.1 * i}
                className={`flex h-full ${isFeatured ? "md:z-10" : ""}`}
              >
                <article
                  className={`flex h-full w-full flex-col rounded-[2rem] bg-white p-8 ring-1 transition-all duration-300 ${
                    isFeatured
                      ? "shadow-2xl shadow-accent/15 ring-accent/25 md:-translate-y-3 md:scale-[1.03]"
                      : "shadow-xl shadow-accent/5 ring-accent/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:ring-accent/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${CARD_ACCENTS[i]} text-lg font-semibold text-white shadow-lg shadow-accent/20`}
                    >
                      {authorInitial(testimonial.author)}
                    </div>
                    <div
                      className="flex items-center gap-0.5 pt-1"
                      aria-label={dict.testimonials.ratingLabel}
                    >
                      {Array.from({ length: 5 }).map((_, star) => (
                        <StarIcon key={star} filled className="h-3.5 w-3.5" />
                      ))}
                    </div>
                  </div>

                  <blockquote className="mt-8 flex flex-1 flex-col">
                    <span className="font-serif text-5xl leading-none text-accent/30" aria-hidden>
                      &ldquo;
                    </span>
                    <p className="-mt-4 text-[15px] leading-relaxed text-zinc-600">
                      {testimonial.quote}
                    </p>
                  </blockquote>

                  <div className="mt-8 rounded-2xl bg-zinc-50 p-5 ring-1 ring-zinc-200/70">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                      {dict.testimonials.metricLabel}
                    </p>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <p className="display-headline text-4xl text-zinc-900 sm:text-5xl">
                        {testimonial.metric.value}
                      </p>
                      <p className="max-w-[9rem] text-end text-xs leading-snug text-zinc-500">
                        {testimonial.metric.label}
                      </p>
                    </div>
                  </div>

                  <footer className="mt-8 border-t border-accent/10 pt-6">
                    <h3 className="font-bold text-zinc-900">{testimonial.author}</h3>
                    <p className="mt-1 text-xs font-semibold text-accent">
                      {testimonial.role}{" "}
                      <span className="mx-1 font-normal text-zinc-300">&bull;</span>{" "}
                      {testimonial.company}
                    </p>
                  </footer>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
