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

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group relative flex h-[min(58vh,440px)] w-full min-w-[280px] shrink-0 snap-center flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 sm:min-w-[300px] lg:min-w-[320px] xl:min-w-0 ${
        active
          ? "scale-[1.02] shadow-2xl shadow-accent/25 ring-2 ring-accent"
          : "scale-100 opacity-90 hover:opacity-100"
      }`}
    >
      <Image
        src={service.image}
        alt=""
        fill
        className={`object-cover transition duration-500 ${
          active ? "scale-105" : "scale-100 grayscale-[25%] group-hover:grayscale-0"
        }`}
        sizes="(max-width: 768px) 75vw, 320px"
      />

      <div
        className={`absolute inset-0 transition duration-300 ${
          active
            ? service.featured
              ? "bg-accent/85"
              : "bg-accent-deep/75"
            : "bg-zinc-200/88 group-hover:bg-zinc-900/50"
        }`}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-8 text-center">
        {service.badge && (
          <span
            className={`mb-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${
              active ? "bg-white/25 text-white" : "bg-zinc-900/10 text-zinc-800"
            }`}
          >
            {service.badge}
          </span>
        )}

        <service.Icon
          className={`mb-5 h-9 w-9 transition ${
            active ? "text-white" : "text-zinc-700 group-hover:text-white"
          }`}
        />

        <h3
          className={`max-w-[220px] text-xl font-bold leading-tight transition xl:text-[1.35rem] ${
            active ? "text-white" : "text-zinc-900 group-hover:text-white"
          }`}
        >
          {service.title}
        </h3>

        {!service.featured && (
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

        {service.featured && (
          <p
            className={`mt-3 max-w-[200px] text-sm font-medium ${
              active ? "text-white/85" : "text-zinc-600 group-hover:text-white/80"
            }`}
          >
            {service.description}
          </p>
        )}
      </div>
    </button>
  );
}
