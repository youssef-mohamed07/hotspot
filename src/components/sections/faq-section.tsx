"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { IconArrowRight, IconMail, IconWhatsApp } from "@/components/icons";
import { faqs } from "@/data/faq";
import { faqCategories, type FaqCategory } from "@/types/faq";
import { FAQItem } from "@/components/faq/faq-item";

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqs.filter(
    (f) => activeCategory === "All" || f.category === activeCategory
  );

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24">
      {/* Atmospheric backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 50% at 80% 20%, rgba(42,118,166,0.18), transparent 70%), radial-gradient(35% 45% at 10% 80%, rgba(4,40,95,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />

      {/* Massive transparent ? glyph */}
      <div
        aria-hidden
        className="display-headline pointer-events-none absolute right-[-8rem] top-1/2 -translate-y-1/2 select-none text-[40rem] leading-none text-zinc-900/[0.04] sm:right-[-4rem]"
      >
        ?
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <Reveal className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">FAQ</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Everything you<br />
            need to <span className="text-gradient-accent">know.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-600">
            Quick answers about customization, logistics, and how the activation actually runs.
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Category rail */}
          <Reveal delay={0.05}>
            <div className="lg:sticky lg:top-28">
              <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-zinc-500">Filter by</p>
              <div className="flex flex-wrap gap-2 lg:flex-col">
                {faqCategories.map((cat) => {
                  const count =
                    cat === "All" ? faqs.length : faqs.filter((f) => f.category === cat).length;
                  const active = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setOpenIndex(0);
                      }}
                      className={`group/btn flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 text-left text-sm transition-all ${
                        active
                          ? "border-accent/40 bg-accent/[0.08] text-white"
                          : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:bg-white/[0.04] hover:text-zinc-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.9)]" />
                        )}
                        <span className={active ? "font-semibold" : ""}>{cat}</span>
                      </span>
                      <span
                        className={`font-mono text-[10px] transition ${
                          active ? "text-accent" : "text-zinc-600 group-hover/btn:text-zinc-400"
                        }`}
                      >
                        {String(count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Helpful contact card */}
              <div className="mt-8 hidden rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 lg:block">
                <p className="text-sm font-semibold text-zinc-900">Still curious?</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                  Skip the forms. Reach our team directly.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href="https://wa.me/966543938548"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
                  >
                    <IconWhatsApp className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href="mailto:inquiry@hotsspots.com"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600 transition hover:bg-white/[0.04] hover:text-zinc-900"
                  >
                    <IconMail className="h-3.5 w-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Question list */}
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <Reveal key={`${activeCategory}-${faq.q}`} delay={i * 0.04}>
                <FAQItem
                  faq={faq}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </Reveal>
            ))}

            {filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center text-sm text-zinc-500">
                No questions in this category yet.
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={0.15}>
          <div className="mt-20 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <p className="text-lg font-semibold text-zinc-900">Didn&apos;t find what you needed?</p>
              <p className="mt-1 text-sm text-zinc-600">
                Our team responds within 24 hours with a tailored answer.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20"
            >
              Ask us anything
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}