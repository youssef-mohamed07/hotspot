"use client";

import { IconMail, IconWhatsApp } from "@/components/icons";
import type { BriefData } from "@/types/brief";

export function BriefSuccess({ data }: { data: BriefData }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-accent-gradient shadow-lg shadow-accent/30">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M5 12.5l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="display-headline text-3xl text-zinc-900 sm:text-4xl">
        Brief received.
      </h3>
      <p className="max-w-md text-sm text-zinc-600">
        Thanks{data.name ? `, ${data.name.split(" ")[0]}` : ""}. Our team will reach out within 24 hours with a tailored proposal for your{" "}
        <span className="text-zinc-900">{data.campaignType ?? "activation"}</span>{" "}
        in <span className="text-zinc-900">{data.city}</span>.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <a href="https://wa.me/966543938548" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90">
          <IconWhatsApp className="h-4 w-4" />
          Chat now
        </a>
        <a href="mailto:inquiry@hotsspots.com" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-zinc-900 transition hover:bg-white/10">
          <IconMail className="h-4 w-4" />
          Email us
        </a>
      </div>
    </div>
  );
}