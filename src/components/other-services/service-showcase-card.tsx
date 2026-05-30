"use client";

import Image from "next/image";
import type { ServiceItem } from "@/data/other-services";

function getDetailLines(service: ServiceItem): string[] {
  if (service.description.includes("·")) {
    return service.description.split("·").map((line) => line.trim()).filter(Boolean);
  }
  if (service.highlights.length >= 2) {
    return [...service.highlights].slice(0, 2);
  }
  return [service.description];
}

export function ServiceShowcaseCard({
  service,
  active,
  onSelect,
}: {
  service: ServiceItem;
  active: boolean;
  onSelect: () => void;
}) {
  const detailLines = getDetailLines(service);
  const featured = service.featured;
  const badgeOnly = featured && service.badge;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group relative flex h-[320px] w-[82vw] min-w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl text-start transition-all duration-500 sm:h-[380px] sm:w-[320px] xl:h-[440px] xl:w-auto xl:min-w-0 ${
        featured
          ? active
            ? "shadow-2xl shadow-accent/40 ring-2 ring-accent"
            : "shadow-lg shadow-accent/15 ring-1 ring-accent/20 hover:shadow-2xl hover:shadow-accent/30 hover:ring-accent/40"
          : active
            ? "shadow-2xl shadow-accent/25 ring-2 ring-accent"
            : "opacity-90 hover:opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-zinc-900">
        <Image
          src={service.image}
          alt={`${service.title} — HotSpot event service Saudi Arabia`}
          fill
          className={`object-cover transition duration-500 ${
            active ? "grayscale-0" : "grayscale-[25%] group-hover:grayscale-0"
          }`}
          sizes="(max-width: 768px) 75vw, 320px"
          priority={featured}
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-start justify-start px-6 py-8">
        {service.badge && (
          <span className="mb-4 rounded-full bg-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {service.badge}
          </span>
        )}

        {!badgeOnly && (
          <>
            <div className="mb-4 text-white">
              <service.Icon className="h-6 w-6" />
            </div>

            <h3 className="max-w-[220px] text-xl font-bold leading-tight text-white transition duration-300 xl:text-2xl">
              {service.title}
            </h3>

            <div className="mt-3 max-w-[200px] space-y-1">
              {detailLines.map((line) => (
                <p key={line} className="text-xs leading-snug text-white/85">
                  {line}
                </p>
              ))}
            </div>
          </>
        )}
      </div>
    </button>
  );
}
