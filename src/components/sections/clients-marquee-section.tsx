"use client";

import Image from "next/image";
import { trustedClients } from "@/data/trusted-clients";
import { SectionHeader } from "@/components/section-header";
import { useDictionary } from "@/i18n/locale-provider";

// We only want clients that have a logo defined
const clientsWithLogos = trustedClients.filter((client) => client.logo);

export function ClientsMarqueeSection() {
  const dict = useDictionary();
  // Duplicate for seamless infinite scroll
  const doubledLogos = [
    ...clientsWithLogos,
    ...clientsWithLogos,
    ...clientsWithLogos,
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Optional faint top border to give structure after the hero */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-zinc-200 to-transparent opacity-50" />

      <SectionHeader
        variant="transition"
        title={dict.marquee.title}
        theme="light"
      />

      <div className="marquee-mask w-full overflow-hidden">
        <div className="marquee items-center">
          {doubledLogos.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="relative flex h-12 w-32 shrink-0 items-center justify-center grayscale transition-all duration-300 hover:grayscale-0 sm:h-14 sm:w-40"
            >
              <Image
                src={client.logo!}
                alt={`${client.name} logo`}
                fill
                className="object-contain opacity-50 transition-opacity hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
