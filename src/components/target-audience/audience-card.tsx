"use client";

import { motion } from "framer-motion";
import { useIsRtl } from "@/i18n/locale-provider";

export function AudienceCard({
  index,
  total,
  lead,
  payoff,
  active,
}: {
  index: number;
  total: number;
  lead: string;
  payoff: string;
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
      className={`relative flex w-full flex-col justify-start overflow-hidden rounded-3xl border p-7 text-start transition-colors duration-300 sm:p-9 ${
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

      <div className="relative flex justify-end">
        <span className="font-mono text-[10px] tracking-widest text-zinc-400">
          {String(index + 1).padStart(2, "0")}
          <span className="text-zinc-300">
            {" "}
            / {String(total).padStart(2, "0")}
          </span>
        </span>
      </div>

      <div className="relative mt-6 space-y-3 sm:mt-7">
        <motion.p
          animate={{ x: active ? 0 : slideX }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 26,
            delay: 0.05,
          }}
          className={`text-2xl font-semibold leading-tight tracking-tight transition-colors sm:text-3xl ${
            active ? "text-zinc-900" : "text-zinc-500"
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
          className={`text-base font-medium leading-relaxed sm:text-lg ${
            active ? "text-zinc-600" : "text-zinc-400"
          }`}
        >
          {payoff}
        </motion.p>
      </div>
    </motion.div>
  );
}
