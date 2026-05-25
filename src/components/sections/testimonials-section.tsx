"use client";

import { Reveal } from "@/components/reveal";
import { IconUser } from "@/components/icons";
import { useDictionary } from "@/i18n/locale-provider";

export function TestimonialsSection() {
  const dict = useDictionary();

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fafafa] py-24 md:py-32">
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" aria-hidden />

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
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {dict.testimonials.items.map((testimonial, i) => (
            <Reveal key={testimonial.author} delay={0.1 * i} className="flex h-full">
              <div className="flex w-full flex-col justify-between rounded-[2rem] bg-white p-8 shadow-xl shadow-accent/5 ring-1 ring-accent/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:ring-accent/20">
                <div>
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <IconUser className="h-7 w-7" />
                  </div>

                  <p className="text-[15px] leading-relaxed text-zinc-600">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-8 border-t border-accent/10 pt-6">
                  <h3 className="font-bold text-zinc-900">{testimonial.author}</h3>
                  <p className="mt-1 text-xs font-semibold text-accent">
                    {testimonial.role} <span className="mx-1 text-zinc-300">&bull;</span>{" "}
                    {testimonial.company}
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
