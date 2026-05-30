"use client";

import { useEffect, useRef, useState } from "react";

export function ImpressionsTicker() {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Ramp up to 47000, then keep ticking by small random increments
          let raf: number;
          const start = performance.now();
          const duration = 2200;
          const target = 47000;
          const tick = (now: number) => {
            const t = (now - start) / duration;
            if (t < 1) {
              const eased = 1 - Math.pow(1 - t, 3);
              setCount(Math.round(eased * target));
              raf = requestAnimationFrame(tick);
            } else {
              setCount(target);
              // Slow live ticker
              const id = setInterval(() => {
                setCount((c) => c + Math.floor(Math.random() * 7) + 2);
              }, 1400);
              obs.disconnect();
              return () => {
                clearInterval(id);
                cancelAnimationFrame(raf);
              };
            }
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const formatted = count.toLocaleString("en-US");
  return (
    <div ref={ref} className="mt-6">
      <p className="display-headline text-5xl text-white sm:text-6xl">
        {formatted}
        <span className="text-gradient-accent">+</span>
      </p>
      <p className="mt-2 text-xs text-zinc-500">eyes per Cyber Stage per day</p>
    </div>
  );
}
