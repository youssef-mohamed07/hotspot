"use client";

import Image from "next/image";
import type { TrustedClient } from "@/types/client";

export function ClientTile({
  client, index,
}: {
  client: TrustedClient;
  index: number;
}) {
  return (
    <div
      className="group relative flex h-32 items-center justify-center bg-[#08090f] transition-colors duration-300 hover:bg-white/[0.02] sm:h-36"
    >
      {/* Subtle accent corner glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(80% 80% at 50% 50%, rgba(42,118,166,0.18), transparent 70%)",
        }}
      />

      {/* Logo or wordmark */}
      <div className="relative flex h-full w-full items-center justify-center px-6 transition-all duration-300 group-hover:-translate-y-1">
        {client.logo ? (
          <Image
            src={client.logo}
            alt={`${client.name} logo`}
            width={140}
            height={48}
            className="h-9 w-auto max-w-[70%] object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 sm:h-10"
            unoptimized={client.logo.endsWith(".svg")}
            style={{ filter: "brightness(0) invert(0.78)" }}
          />
        ) : (
          <span
            className="display-headline text-2xl tracking-tight text-zinc-500 transition-colors duration-300 group-hover:text-white sm:text-3xl"
            style={{ letterSpacing: "0.04em" }}
          >
            {client.name.split(" ")[0]}
            {client.name.split(" ").length > 1 && (
              <span className="text-accent">·</span>
            )}
          </span>
        )}
      </div>

      {/* Hover-only sector + since pill */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 rounded-full border border-white/10 bg-black/70 px-2.5 py-0.5 text-[9px] uppercase tracking-widest text-zinc-400 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {client.sector} · since {client.since}
      </div>

      {/* Index marker */}
      <span className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] tracking-widest text-zinc-700">
        /{String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
