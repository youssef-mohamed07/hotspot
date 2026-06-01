"use client";

import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { useDictionary } from "@/i18n/locale-provider";
import { getLocalizedCities } from "@/lib/cities-i18n";

export function CitiesPanel() {
  const dict = useDictionary();
  const cities = getLocalizedCities(dict);
  const c = dict.cities;

  return (
    <div className="flex h-full flex-col gap-3 text-start">
      <div className="grid grid-cols-2 gap-3">
        {cities.map((city) => (
          <div
            key={city.name}
            className="spotlight-card glass-card group rounded-2xl p-4 transition hover:-translate-y-0.5 hover:border-white/20"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-zinc-900">{city.name}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-500">
                  {city.region}
                </p>
              </div>
              {city.hub && (
                <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[9px] font-medium uppercase tracking-widest text-accent">
                  {c.hubBadge}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 text-[10px] text-zinc-500">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(42,118,166,0.8)]" />
              <span>{c.active}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-start">
        <p className="text-sm text-zinc-600">
          <span className="font-semibold text-zinc-900">{c.ctaBold}</span> {c.ctaRest}
        </p>
        <TrackedCta
          href="#contact"
          ctaLocation="cities"
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent transition hover:text-zinc-900"
        >
          {c.requestCta}
          <DirectionalArrow className="h-3 w-3" />
        </TrackedCta>
      </div>
    </div>
  );
}
