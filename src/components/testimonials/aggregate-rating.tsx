"use client";

import { StarIcon } from "./star-icon";

export function AggregateRating() {
  return (
    <div className="glass-light flex items-center gap-5 rounded-2xl px-6 py-4">
      <div className="text-right">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled className="h-4 w-4" />
          ))}
        </div>
        <p className="mt-1.5 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
          4.9 / 5 · 80+ partners
        </p>
      </div>
      <div className="h-10 w-px bg-white/10" />
      <div>
        <p className="text-2xl font-semibold tracking-tight text-zinc-900">98%</p>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500">
          Repeat clients
        </p>
      </div>
    </div>
  );
}
