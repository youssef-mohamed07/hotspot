"use client";

import { Reveal } from "@/components/reveal";
import { trustedClients } from "@/data/trusted-clients";
import { ClientTile } from "@/components/proof-of-concept/client-tile";

export function ProofOfConceptSection() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24">
      {/* Top + bottom hairlines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-soft/40 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-soft/40 to-transparent" aria-hidden />
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 60% at 50% 50%, rgba(42,118,166,0.18), transparent 70%)",
        }}
        aria-hidden
      />
      {/* Big background watermark "TRUSTED" */}
      <div
        aria-hidden
        className="display-headline pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[20rem] leading-none text-white/[0.02] sm:text-[28rem]"
      >
        TRUSTED
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-accent" />
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Proof of concept</p>
            </div>
            <h2 className="display-headline mt-5 text-3xl text-white sm:text-4xl md:text-5xl">
              Our solutions <span className="text-gradient-accent">trusted by</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center justify-end gap-3 text-sm text-zinc-400">
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.9)]" />
                <span className="text-zinc-200">{trustedClients.length}+</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">brands</span>
              </span>
              <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5">
                <span className="text-zinc-200">10</span>
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">sectors</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Logo grid */}
        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] sm:grid-cols-3 lg:grid-cols-5">
            {trustedClients.map((client, i) => (
              <ClientTile key={client.name} client={client} index={i} />
            ))}
          </div>
        </Reveal>

        {/* Footer caption */}
        <Reveal delay={0.25}>
          <p className="mt-8 text-center text-xs text-zinc-500">
            And more across telecom, government, real estate, and entertainment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}