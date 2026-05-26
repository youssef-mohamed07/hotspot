"use client";

import type { CSSProperties } from "react";
import { useDictionary } from "@/i18n/locale-provider";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { getWhatsAppUrl } from "@/lib/site";

export function WhatsAppFloat() {
  const dict = useDictionary();
  const card = dict.contactCard;

  return (
    <div
      className="enter-item fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6"
      style={{ "--enter-delay": "0.68s" } as CSSProperties}
    >
      <TrackedCta
        href={getWhatsAppUrl(dict.site.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        ctaLocation="whatsapp_float"
        isContact
        aria-label={card.ariaLabel}
        className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/70 py-2.5 pe-4 ps-2.5 text-white shadow-[0_24px_60px_-12px_rgba(4,40,95,0.55),0_8px_24px_-8px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_28px_72px_-12px_rgba(42,118,166,0.6),0_12px_32px_-10px_rgba(0,0,0,0.5)] active:translate-y-0"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 0%, rgba(42,118,166,0.22) 0%, transparent 55%), radial-gradient(120% 80% at 100% 100%, rgba(4,40,95,0.35) 0%, transparent 60%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-px h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />

        <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-accent-gradient text-white ring-1 ring-white/20 shadow-[0_8px_20px_-8px_rgba(42,118,166,0.7)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M20 21a8 8 0 1 0-16 0" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </span>

        <span className="relative flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold tracking-tight text-white">
            {card.label}
          </span>
          <span className="truncate text-[11px] font-medium text-white/65">
            {card.role}
          </span>
        </span>
      </TrackedCta>
    </div>
  );
}
