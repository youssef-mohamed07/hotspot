"use client";

import { KSA_REGIONS, KSA_VIEWBOX } from "@/lib/ksa-map";
import { cities } from "@/data/cities";
import { CityPinSvg } from "./city-pin-svg";

export function KingdomMap() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[36px] glass-strong">
      {/* Ambient glow */}
      <div className="absolute inset-12 rounded-full bg-accent-gradient opacity-15 blur-3xl" aria-hidden />
      {/* Subtle grid overlay */}
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-50" aria-hidden />

      {/* Real KSA regions + city hotspots in shared SVG coord space */}
      <svg
        viewBox={KSA_VIEWBOX}
        className="absolute inset-0 h-full w-full p-6"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="ksa-fill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a76a6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#04285f" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="ksa-stroke" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5ba3d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2a76a6" stopOpacity="0.35" />
          </linearGradient>
          <radialGradient id="pin-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5ba3d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#5ba3d4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* All 13 administrative regions */}
        <g aria-hidden>
          {KSA_REGIONS.map((region) => (
            <path
              key={region.id}
              d={region.d}
              fill="url(#ksa-fill)"
              stroke="url(#ksa-stroke)"
              strokeWidth={1.2}
              strokeLinejoin="round"
              className="transition-colors duration-300 hover:fill-[rgba(42,118,166,0.28)]"
            >
              <title>{region.name}</title>
            </path>
          ))}
        </g>

        {/* City pins on top */}
        {cities.map((city) => (
          <CityPinSvg key={city.name} city={city} />
        ))}
      </svg>

      {/* Footer caption */}
      <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-zinc-500">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(42,118,166,0.9)]" />
          Active hub
        </span>
        <span>Saudi Arabia · KSA</span>
      </div>
    </div>
  );
}