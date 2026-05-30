"use client";

import { useState } from "react";
import type { City } from "@/types/city";
import { useIsRtl } from "@/i18n/locale-provider";

export function CityPinSvg({ city }: { city: City }) {
  const isRtl = useIsRtl();
  const [isActive, setIsActive] = useState(false);
  const r = city.hub ? 9 : 6;
  const ringR = city.hub ? 22 : 16;
  const dur = city.hub ? "2.4s" : "3.2s";
  const padX = Math.max(40, city.name.length * (isRtl ? 9 : 7));
  const label = isRtl ? city.name : city.name.toUpperCase();
  return (
    <g
      className="group outline-none"
      style={{ cursor: "pointer", WebkitTapHighlightColor: "transparent" }}
      onClick={(e) => {
        e.stopPropagation();
        setIsActive(!isActive);
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsActive(!isActive);
        }
      }}
    >
      {/* Outer halo (static glow) */}
      <circle cx={city.x} cy={city.y} r={ringR * 1.7} fill="url(#pin-glow)" />
      {/* Invisible larger hit area for easier tapping on mobile */}
      <circle cx={city.x} cy={city.y} r={32} fill="transparent" />
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
        <animate
          attributeName="r"
          from={r}
          to={ringR}
          dur={dur}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.7"
          to="0"
          dur={dur}
          repeatCount="indefinite"
        />
      </circle>
      {/* Solid dot */}
      <circle
        cx={city.x}
        cy={city.y}
        r={r}
        fill="#5ba3d4"
        className={`transition-all duration-200 ${isActive ? "opacity-100" : "group-hover:opacity-100"}`}
        style={{ filter: "drop-shadow(0 0 14px rgba(91,163,212,0.9))" }}
      />
      {/* Hover label */}
      <g
        className={`transition-all duration-200 max-md:scale-125 max-sm:scale-[1.65] ${
          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{ transformOrigin: `${city.x}px ${city.y + 14}px` }}
      >
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
