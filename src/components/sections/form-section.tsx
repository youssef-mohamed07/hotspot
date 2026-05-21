"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { BriefWizard } from "@/components/brief-wizard/brief-wizard";

export function FormSection() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Build your brief</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Start your<br />
            <span className="text-gradient-accent">activation.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-zinc-400">
            Six quick questions. We come back within 24 hours with scope, timeline and a tailored proposal.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-[36px] glass-strong p-6 md:p-10">
            <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(42,118,166,0.22), transparent 60%)" }} aria-hidden />
            <div className="grid-floor pointer-events-none absolute inset-0 opacity-25" aria-hidden />
            <div className="relative">
              <BriefWizard submitted={submitted} onSubmitted={() => setSubmitted(true)} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}