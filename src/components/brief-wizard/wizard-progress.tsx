"use client";

export function WizardProgress({
  current,
  total,
  labels = ["Type", "Goals", "Services", "Logistics", "Timing", "Contact"],
}: {
  current: number;
  total: number;
  labels?: string[];
}) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        <span className="text-accent">Step {current + 1} of {total}</span>
        <span>{labels[current]}</span>
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