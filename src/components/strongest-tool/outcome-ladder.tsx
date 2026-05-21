"use client";

import { useEffect, useRef, useState } from "react";

export function OutcomeLadder() {
  const stages = [
    { label: "Glance", value: 100, desc: "First eye contact" },
    { label: "Stop", value: 78, desc: "Pause to look" },
    { label: "Engage", value: 54, desc: "Walk over, interact" },
    { label: "Share", value: 31, desc: "Film, post, tag" },
    { label: "Recall", value: 88, desc: "Remember 7 days later" },
  ];
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-6 space-y-2.5">
      {stages.map((s, i) => (
        <div key={s.label} className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium text-white">{s.label}</span>
            <span className="font-mono text-zinc-500">{s.value}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="h-full rounded-full bg-accent-gradient transition-[width] duration-1000 ease-out"
              style={{
                width: visible ? `${s.value}%` : "0%",
                transitionDelay: `${i * 110}ms`,
                boxShadow: "0 0 8px rgba(42,118,166,0.5)",
              }}
            />
          </div>
          <p className="text-[10px] text-zinc-600">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
