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
      className={`group relative flex h-[min(58vh,440px)] w-full min-w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl text-left transition-all duration-500 sm:min-w-[300px] lg:min-w-[320px] xl:min-w-0 ${
        featured
          ? active
            ? "scale-[1.03] shadow-2xl shadow-accent/40 ring-2 ring-accent"
            : "scale-100 shadow-lg shadow-accent/15 ring-1 ring-accent/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/30 hover:ring-accent/40"
          : active
            ? "scale-[1.02] shadow-2xl shadow-accent/25 ring-2 ring-accent"
            : "scale-100 opacity-90 hover:opacity-100"
      }`}
    >
      {/* Image */}
      <div className={`absolute inset-0 ${featured ? "bg-zinc-950" : "bg-zinc-200"}`}>
        <Image
          src={service.image}
          alt={`${service.title} — HotSpot event service Saudi Arabia`}
          fill
          className={
            featured
              ? "object-contain object-bottom px-3 pt-8 transition duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-2 sm:px-4"
              : `object-cover transition duration-500 ${
                  active ? "scale-105" : "scale-100 grayscale-[25%] group-hover:grayscale-0"
                }`
          }
          sizes="(max-width: 768px) 75vw, 320px"
          priority={featured}
        />
      </div>

      {/* Hover shine — featured only */}
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
        />
      )}

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          featured
            ? active
              ? "bg-gradient-to-t from-accent-deep/95 via-accent/55 to-accent/15"
              : "bg-gradient-to-t from-zinc-950/90 via-accent-deep/50 to-accent/25 group-hover:from-zinc-950/75 group-hover:via-accent-deep/40 group-hover:to-accent/20"
            : active
              ? "bg-accent-deep/75"
              : "bg-zinc-200/88 group-hover:bg-zinc-900/50"
        }`}
        aria-hidden
      />

      {/* Bottom glow on hover — featured */}
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-10 pt-8 text-center">
        {service.badge && (
          <span
            className={`mb-auto rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md transition duration-300 ${
              featured
                ? "border border-white/20 bg-white/15 text-white shadow-sm group-hover:bg-white/25"
                : active
                  ? "bg-white/25 text-white"
                  : "bg-zinc-900/10 text-zinc-800"
            }`}
          >
            {service.badge}
          </span>
        )}

        <div
          className={`mb-4 grid h-12 w-12 place-items-center rounded-2xl transition duration-500 ${
            featured
              ? "border border-white/20 bg-white/10 text-white backdrop-blur-sm group-hover:scale-110 group-hover:bg-white/20 group-hover:shadow-lg group-hover:shadow-accent/30"
              : active
                ? "text-white"
                : "text-zinc-700 group-hover:text-white"
          }`}
        >
          <service.Icon className="h-6 w-6" />
        </div>

        <h3
          className={`max-w-[220px] text-xl font-bold leading-tight transition duration-300 xl:text-2xl ${
            featured || active ? "text-white" : "text-zinc-900 group-hover:text-white"
          }`}
        >
          {service.title}
        </h3>

        {!featured && (
          <div className="mt-3 max-w-[200px] space-y-1">
            {bullets.map((line) => (
              <p
                key={line}
                className={`text-xs leading-snug transition ${
                  active ? "text-white/85" : "text-zinc-600 group-hover:text-white/80"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {featured && (
          <p className="mt-2 max-w-[200px] text-sm font-medium text-white/85 transition duration-300 group-hover:text-white">
            {service.description}
          </p>
        )}
      </div>
    </button>
  );
}
