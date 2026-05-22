"use client";

import { IconWhatsApp } from "@/components/icons";
import { getWhatsAppUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with HotSpot on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] ring-4 ring-white/90 transition duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(37,211,102,0.55)] active:scale-95 sm:h-16 sm:w-16"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40"
        />
        <span
          aria-hidden
          className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-accent"
        />
        <IconWhatsApp className="relative h-7 w-7 sm:h-8 sm:w-8" />
      </a>
    </div>
  );
}
