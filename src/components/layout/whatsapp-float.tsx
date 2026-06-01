"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
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

        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-zinc-900 ring-1 ring-white/20 shadow-[0_8px_20px_-8px_rgba(42,118,166,0.7)]">
          <Image
            src="/assets/contact.jpeg"
            alt=""
            width={1600}
            height={1280}
            className="h-full w-full object-cover"
            sizes="48px"
          />
        </span>

        <span className="relative flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold tracking-tight text-white sm:text-base">
            {card.label}
          </span>
        </span>
      </TrackedCta>
    </div>
  );
}
