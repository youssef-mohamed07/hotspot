"use client";

import { IconArrowRight } from "@/components/icons";
import { cities } from "@/data/cities";

export function CitiesPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        {cities.map((city) => (
          <div
            key={city.name}
            className="spotlight-card glass-card group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-white/20"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{city.name}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-500">{city.region}</p>
              </div>
              {city.hub && (
                <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-accent">
                  Hub
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.8)]" />
              <span>Active</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-center">
        <p className="text-sm text-zinc-300">
          <span className="font-semibold text-white">Need another city?</span>{" "}
          We deploy nationwide on request.
        </p>
        <a href="#contact" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition hover:text-white">
          Request location
          <IconArrowRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
