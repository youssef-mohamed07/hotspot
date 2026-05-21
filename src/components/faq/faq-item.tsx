"use client";

import type { FaqItem } from "@/types/faq";
import { useEffect, useRef, useState } from "react";
export function FAQItem({
  faq, index, isOpen, onToggle,
}: {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setHeight(isOpen ? el.scrollHeight : 0);
  }, [isOpen, faq.a]);

  return (
    <div
      className={`spotlight-card glass-card group rounded-3xl transition-all duration-300 ${
        isOpen
          ? "border-accent/30 bg-white/[0.04]"
          : "hover:border-white/20"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-7"
      >
        {/* Number + content */}
        <div className="flex items-start gap-5">
          <span
            className={`shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
              isOpen ? "text-accent" : "text-zinc-600"
            }`}
          >
            /{String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1">
            <h3
              className={`text-base font-semibold leading-snug transition-colors md:text-lg ${
                isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
              }`}
            >
              {faq.q}
            </h3>
            <p
              className={`mt-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500 transition-opacity ${
                isOpen ? "opacity-0 md:opacity-100" : "opacity-70"
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-zinc-600" />
              {faq.category}
            </p>
          </div>
        </div>

        {/* Chevron / plus icon */}
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all ${
            isOpen
              ? "rotate-45 border-accent/40 bg-accent/15 text-accent"
              : "border-white/10 bg-white/[0.03] text-zinc-400 group-hover:border-white/30 group-hover:text-white"
          }`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2}>
            <path d="M8 2v12M2 8h12" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* Animated answer */}
      <div
        style={{
          height: `${height}px`,
          transition: "height 380ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="overflow-hidden"
      >
        <div ref={contentRef}>
          <div className="border-t border-white/5 px-6 pb-6 pt-4 md:px-7">
            <p
              className="ml-9 max-w-3xl text-sm leading-relaxed text-zinc-400 md:text-base"
              style={{
                transform: isOpen ? "translateY(0)" : "translateY(-8px)",
                opacity: isOpen ? 1 : 0,
                transition: "transform 400ms ease-out, opacity 400ms ease-out",
                transitionDelay: isOpen ? "120ms" : "0ms",
              }}
            >
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
