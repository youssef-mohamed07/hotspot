"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    trackRef.current?.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    trackRef.current?.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={trackRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-100 shadow-xl shadow-zinc-900/5 ring-1 ring-accent/10 touch-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
    >
      {/* After — full (branded, dominant) */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-white to-accent-deep/[0.04]">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className="object-contain object-center p-5 saturate-[1.15] contrast-[1.05] drop-shadow-[0_28px_56px_rgba(42,118,166,0.45)] sm:p-8"
          sizes="(max-width: 1024px) 100vw, 1200px"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 72% 48%, rgba(42,118,166,0.22), transparent 65%), radial-gradient(40% 35% at 50% 100%, rgba(4,40,95,0.08), transparent 70%)",
          }}
          aria-hidden
        />
      </div>

      {/* Before — clipped left (stock, muted) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className="object-contain object-center p-6 grayscale contrast-[0.85] brightness-[0.88] sm:p-10"
          sizes="(max-width: 1024px) 100vw, 1200px"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-zinc-400/25" aria-hidden />
      </div>

      {/* Divider */}
      <div
        className="absolute inset-y-0 z-20 w-0.5 bg-zinc-900 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-zinc-900 shadow-lg">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M8 8l-4 4 4 4M16 8l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-zinc-200/80 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500 shadow-sm backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-5 top-5 z-10 rounded-full bg-accent-gradient px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-lg shadow-accent/35 ring-2 ring-white/50">
        After
      </span>
    </div>
  );
}
