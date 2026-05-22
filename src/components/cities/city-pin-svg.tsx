"use client";

import type { City } from "@/types/city";
import { useIsRtl } from "@/i18n/locale-provider";

export function CityPinSvg({
  city,
}: {
  city: City;
}) {
  const isRtl = useIsRtl();
  const r = city.hub ? 9 : 6;
  const ringR = city.hub ? 22 : 16;
  const dur = city.hub ? "2.4s" : "3.2s";
  const padX = Math.max(40, city.name.length * (isRtl ? 9 : 7));
  const label = isRtl ? city.name : city.name.toUpperCase();
  return (
    <g className="group" style={{ cursor: "pointer" }}>
      {/* Outer halo (static glow) */}
      <circle cx={city.x} cy={city.y} r={ringR * 1.7} fill="url(#pin-glow)" />
      {/* Animated pulse ring */}
      <circle
        cx={city.x}
        cy={city.y}
        r={r}
        fill="none"
        stroke="#2a76a6"
        strokeWidth={1.8}
        opacity={0.7}
      >
        <animate attributeName="r" from={r} to={ringR} dur={dur} repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.7" to="0" dur={dur} repeatCount="indefinite" />
      </circle>
      {/* Solid dot */}
      <circle
        cx={city.x}
        cy={city.y}
        r={r}
        fill="#5ba3d4"
        className="transition-all duration-200 group-hover:opacity-100"
        style={{ filter: "drop-shadow(0 0 14px rgba(91,163,212,0.9))" }}
      />
      {/* Hover label */}
      <g className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <rect
          x={city.x - padX}
          y={city.y + 14}
          width={padX * 2}
          height={26}
          rx={13}
          fill="rgba(10, 12, 18, 0.95)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
        />
        <text
          x={city.x}
          y={city.y + 31}
          textAnchor="middle"
          fontSize={isRtl ? 13 : 14}
          fill="#fff"
          fontWeight={600}
          direction={isRtl ? "rtl" : "ltr"}
          style={{ letterSpacing: isRtl ? "0" : "0.1em" }}
        >
          {label}
        </text>
      </g>
    </g>
  );
}
