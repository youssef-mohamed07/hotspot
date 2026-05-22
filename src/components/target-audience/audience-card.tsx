"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps, ReactNode } from "react";

export function AudienceCard({
  index,
  total,
  title,
  description,
  icon: Icon,
  active,
}: {
  index: number;
  total: number;
  title: string;
  description: ReactNode;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
}) {
  return (
    <motion.div
      animate={{
        scale: active ? 1 : 0.94,
        opacity: active ? 1 : 0.35,
        y: active ? 0 : 16,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border p-7 transition-colors duration-300 sm:p-9 ${
        active
          ? "border-accent/25 bg-white shadow-2xl shadow-accent/[0.08] ring-1 ring-accent/15"
          : "border-zinc-200/70 bg-white/80 shadow-sm"
      }`}
    >
      {active && (
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(80% 60% at 100% 0%, rgba(42,118,166,0.1), transparent 55%)",
          }}
          aria-hidden
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <motion.div
          animate={active ? { y: [0, -3, 0] } : { y: 0 }}
          transition={
            active ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}
          }
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl transition-colors duration-300 ${
            active
              ? "bg-accent-gradient text-white shadow-lg shadow-accent/25"
              : "border border-zinc-100 bg-zinc-50 text-accent"
          }`}
        >
          <Icon className="h-6 w-6" />
        </motion.div>

        <span className="font-mono text-[10px] tracking-widest text-zinc-400">
          {String(index + 1).padStart(2, "0")}
          <span className="text-zinc-300"> / {String(total).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="relative mt-8">
        <motion.h3
          animate={{ x: active ? 0 : -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.05 }}
          className={`text-xl font-bold tracking-tight transition-colors sm:text-2xl ${
            active ? "text-zinc-900" : "text-zinc-500"
          }`}
        >
          {title}
        </motion.h3>
        <motion.p
          animate={{ x: active ? 0 : -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 26, delay: 0.1 }}
          className="mt-3 text-base leading-relaxed text-zinc-600 sm:text-lg"
        >
          {description}
        </motion.p>
      </div>

      <div className="relative mt-8 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i === index && active
                ? "bg-accent"
                : i === index
                  ? "bg-accent/40"
                  : "bg-zinc-200"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
