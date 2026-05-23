"use client";

import { useDictionary } from "@/i18n/locale-provider";

export function WizardProgress({
  current,
  total,
  labels,
}: {
  current: number;
  total: number;
  labels?: string[];
}) {
  const dict = useDictionary();
  const progressLabels = labels ?? dict.contact.steps;
  const stepText = dict.contact.progressLabel
    .replace("{current}", String(current + 1))
    .replace("{total}", String(total));
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        <span className="text-accent">{stepText}</span>
        <span>{progressLabels[current]}</span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-accent-gradient transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}