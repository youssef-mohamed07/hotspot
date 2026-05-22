"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { IconArrowRight } from "@/components/icons";
import { caseStudies } from "@/data/case-studies";

export function CaseStudiesSection() {
  return (
    <section id="cases" className="relative flex min-h-[100dvh] flex-col items-center justify-center py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Case studies</p>
          <h2 className="display-headline mt-4 text-4xl text-white sm:text-5xl md:text-6xl">
            Activations that<br />
            <span className="text-gradient-accent">moved markets.</span>
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.08}>
              <div className="spotlight-card glass-card group relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/60 to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-8">
                  <div className="flex items-start justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{cs.category} · {cs.year}</p>
                    <span className="glass rounded-full px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-200">{cs.impressions} reach</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{cs.title}</h3>
                    <div className="mt-3 flex items-center gap-2 text-xs text-zinc-400 opacity-0 transition group-hover:opacity-100">
                      <span>View case study</span>
                      <IconArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}