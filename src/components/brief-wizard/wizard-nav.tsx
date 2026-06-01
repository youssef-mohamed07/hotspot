"use client";

import { IconArrowRight } from "@/components/icons";
import { useDictionary, useIsRtl } from "@/i18n/locale-provider";

export function WizardNav({
  step,
  totalSteps,
  canAdvance,
  isSubmitting = false,
  onPrev,
  onNext,
  onSubmit,
  submitLabel = "Submit Brief",
  nextLabel,
}: {
  step: number;
  totalSteps: number;
  canAdvance: boolean;
  isSubmitting?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  nextLabel?: string;
}) {
  const dict = useDictionary();
  const isRtl = useIsRtl();
  const isLast = step === totalSteps - 1;
  const disabled = !canAdvance || isSubmitting;
  return (
    <div className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-6">
      <button
        type="button"
        onClick={onPrev}
        disabled={step === 0 || isSubmitting}
        className="rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-zinc-600 transition hover:bg-white/5 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-600"
      >
        {isRtl ? `${dict.contact.back} →` : `← ${dict.contact.back}`}
      </button>
      <button
        type="button"
        onClick={isLast ? onSubmit : onNext}
        disabled={disabled}
        className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/20 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:shadow-none"
      >
        {isLast
          ? isSubmitting
            ? dict.contact.sending
            : submitLabel
          : nextLabel ?? dict.contact.continue}
        <IconArrowRight className="rtl-flip h-3.5 w-3.5" />
      </button>
    </div>
  );
}
