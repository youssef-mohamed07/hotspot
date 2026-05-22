"use client";

import { motion } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import { useIsRtl } from "@/i18n/locale-provider";

export function AudienceCard({
  index,
  total,
  lead,
  payoff,
  icon: Icon,
  active,
}: {
  index: number;
  total: number;
  lead: string;
  payoff: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active: boolean;
}) {
  const isRtl = useIsRtl();
  const slideX = isRtl ? 8 : -8;

  return (
    <motion.div
      animate={{
        scale: active ? 1 : 0.94,
        opacity: active ? 1 : 0.35,
        y: active ? 0 : 16,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className={`relative flex  w-full flex-col justify-start overflow-hidden rounded-3xl border p-7 text-start transition-colors duration-300 sm:p-9 ${
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
          <span className="text-zinc-300">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </span>
      </div>

      <div className="relative mt-4 space-y-2 sm:mt-5 sm:space-y-3">
        <motion.p
          animate={{ x: active ? 0 : slideX }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 26,
            delay: 0.05,
          }}
          className={`text-lg leading-snug transition-colors sm:text-xl ${
            active ? "text-zinc-600" : "text-zinc-400"
          }`}
        >
          {lead}
        </motion.p>
        <motion.p
          animate={{ x: active ? 0 : slideX }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 26,
            delay: 0.1,
          }}
          className={`text-xl font-bold leading-snug tracking-tight sm:text-2xl ${
            active ? "text-zinc-900" : "text-zinc-500"
          }`}
        >
          {payoff}
        </motion.p>
      </div>
    </motion.div>
  );
}
