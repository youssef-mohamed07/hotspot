"use client";

import Image from "next/image";
import type { ServiceItem } from "@/data/other-services";

export function ServiceShowcaseCard({
  service,
  active,
  onSelect,
}: {
  service: ServiceItem;
  active: boolean;
  onSelect: () => void;
}) {
  const bullets = service.description.includes("·")
    ? service.description.split(" · ")
    : [service.description];
  const featured = service.featured;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group relative flex h-[320px] w-[82vw] min-w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl text-left transition-all duration-500 sm:h-[380px] sm:w-[320px] xl:h-[440px] xl:w-auto xl:min-w-0 ${
        featured
          ? active
            ? "shadow-2xl shadow-accent/40 ring-2 ring-accent"
            : "shadow-lg shadow-accent/15 ring-1 ring-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:ring-accent/40"
          : active
            ? "shadow-2xl shadow-accent/25 ring-2 ring-accent"
            : "opacity-90 hover:opacity-100"
      }`}
    >
      {/* Image */}
      <div className={`absolute inset-0 ${featured ? "bg-zinc-950" : "bg-zinc-900"}`}>
        <Image
          src={service.image}
          alt={`${service.title} — HotSpot event service Saudi Arabia`}
          fill
          className={
            featured
              ? "object-contain object-bottom px-3 pt-8 transition duration-700 ease-out sm:px-4"
              : `object-cover transition duration-500 ${
                  active ? "grayscale-0" : "grayscale-[25%] group-hover:grayscale-0"
                }`
          }
          sizes="(max-width: 768px) 75vw, 320px"
          priority={featured}
        />
      </div>

      {/* Subtle Text Scrim for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-start justify-start px-6 py-8 text-left">
        {service.badge && (
          <span
            className={`mb-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md transition duration-300 ${
              featured
                ? "border border-white/20 bg-white/15 text-white shadow-sm"
                : "bg-white/25 text-white"
            }`}
          >
            {service.badge}
          </span>
        )}

        <div
          className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl transition duration-500 ${
            featured
              ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm"
              : "text-white"
          }`}
        >
          <service.Icon className="h-6 w-6" />
        </div>

        <h3 className="max-w-[220px] text-xl font-bold leading-tight text-white transition duration-300 xl:text-2xl">
          {service.title}
        </h3>

        {!featured && (
          <div className="mt-3 max-w-[200px] space-y-1">
            {bullets.map((line) => (
              <p key={line} className="text-xs leading-snug text-white/85 transition">
                {line}
              </p>
            ))}
          </div>
        )}

        {featured && (
          <p className="mt-2 max-w-[200px] text-sm font-medium text-white/85 transition duration-300">
            {service.description}
          </p>
        )}
      </div>
    </button>
  );
}
