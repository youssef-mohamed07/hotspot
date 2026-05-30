"use client";

import { useState } from "react";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { Reveal } from "@/components/reveal";
import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { IconMail, IconWhatsApp } from "@/components/icons";
import { FAQItem } from "@/components/faq/faq-item";
import { useDictionary } from "@/i18n/locale-provider";
import type { FaqItem } from "@/types/faq";

export function FAQSection() {
  const dict = useDictionary();
  const faqs = dict.faq.items as FaqItem[];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-white py-24">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 50% at 80% 20%, rgba(42,118,166,0.18), transparent 70%), radial-gradient(35% 45% at 10% 80%, rgba(4,40,95,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      <div
        aria-hidden
        className="display-headline pointer-events-none absolute end-[-8rem] top-1/2 -translate-y-1/2 select-none text-[40rem] leading-none text-zinc-900/[0.04] sm:end-[-4rem]"
      >
        ?
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <Reveal className="mb-16 max-w-3xl text-start">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{dict.faq.eyebrow}</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            {dict.faq.headline1}
            <br />
            <span className="text-gradient-accent">{dict.faq.headlineAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">{dict.faq.subtitle}</p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.04}>
                <FAQItem
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.05}>
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-zinc-900">{dict.faq.stillCurious}</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">{dict.faq.stillCuriousBody}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="https://wa.me/966543938548"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-accent/20 transition hover:opacity-90"
                  >
                    <IconWhatsApp className="h-4 w-4" />
                    {dict.faq.whatsappCta}
                  </a>
                  <a
                    href="mailto:inquiry@hotsspots.com"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-4 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    <IconMail className="h-4 w-4" />
                    {dict.faq.emailCta}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-20 flex flex-col items-center gap-4 rounded-3xl border border-zinc-200/60 bg-white/50 p-10 text-center shadow-sm backdrop-blur-sm md:flex-row md:justify-between md:text-start">
            <div>
              <p className="text-lg font-semibold text-zinc-900">{dict.faq.bottomTitle}</p>
              <p className="mt-1 text-sm text-zinc-600">{dict.faq.bottomBody}</p>
            </div>
            <TrackedCta
              href="#contact"
              ctaLocation="faq"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition hover:opacity-90"
            >
              {dict.faq.bottomCta}
              <DirectionalArrow className="h-4 w-4" />
            </TrackedCta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
