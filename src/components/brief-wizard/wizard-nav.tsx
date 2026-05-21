"use client";

import { IconArrowRight } from "@/components/icons";

export function WizardNav({
  step, totalSteps, canAdvance, onPrev, onNext, onSubmit,
}: {
  step: number; totalSteps: number; canAdvance: boolean;
  onPrev: () => void; onNext: () => void; onSubmit: () => void;
}) {
  const isLast = step === totalSteps - 1;
  return (
    <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 0}
        className="rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-zinc-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={isLast ? onSubmit : onNext}
        disabled={!canAdvance}
        className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:shadow-none"
      >
        {isLast ? "Submit Brief" : "Continue"}
        <IconArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}