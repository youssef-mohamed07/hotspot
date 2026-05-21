"use client";

import { useEffect, useRef, useState } from "react";

export function EngagementGauge({ value }: { value: number }) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate from 0 to value
          let raf: number;
          const start = performance.now();
          const duration = 1800;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased * value);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          obs.disconnect();
          return () => cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  // Half-circle: 180° sweep. SVG path for the arc background and progress.
  const radius = 70;
  const circumference = Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div ref={ref} className="relative mt-6 flex flex-col items-center">
      <svg viewBox="0 0 180 100" className="w-full max-w-[260px]">
        <defs>
          <linearGradient id="gauge-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#2a76a6" />
            <stop offset="100%" stopColor="#5ba3d4" />
          </linearGradient>
        </defs>
        {/* Track */}
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {/* Progress */}
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="url(#gauge-grad)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ filter: "drop-shadow(0 0 6px rgba(91,163,212,0.5))" }}
        />
      </svg>
      <div className="-mt-8 flex flex-col items-center">
        <p className="display-headline text-5xl text-white sm:text-6xl">
          {Math.round(progress)}<span className="text-gradient-accent">×</span>
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-zinc-500">More attention</p>
      </div>
    </div>
  );
}
