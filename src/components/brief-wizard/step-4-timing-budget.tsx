"use client";

import type { BriefData, Timeline, Budget } from "@/types/brief";
import { StepHeader } from "./step-header";
import { ChoiceCard } from "./choice-card";

export function Step4TimingBudget({ data, update }: { data: BriefData; update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void }) {
  const timelines: { id: Timeline; label: string; description: string }[] = [
    { id: "asap", label: "ASAP", description: "Within the next 2 weeks." },
    { id: "1month", label: "Within 1 month", description: "We have a target date." },
    { id: "3months", label: "1–3 months out", description: "Planning ahead." },
    { id: "exploring", label: "Just exploring", description: "Open timeline." },
  ];
  const budgets: { id: Budget; label: string; description: string }[] = [
    { id: "under50", label: "Under 50K SAR", description: "Tactical activation." },
    { id: "50to150", label: "50K–150K SAR", description: "Standard production." },
    { id: "150to500", label: "150K–500K SAR", description: "Premium scope." },
    { id: "500plus", label: "500K+ SAR", description: "Hero production." },
    { id: "tbd", label: "Not sure yet", description: "Help us scope it." },
  ];
  return (
    <div className="grid gap-8">
      <div>
        <StepHeader title="When are you aiming for?" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {timelines.map((t) => (
            <ChoiceCard
              key={t.id}
              active={data.timeline === t.id}
              onClick={() => update("timeline", t.id)}
              label={t.label}
              description={t.description}
            />
          ))}
        </div>
      </div>
      <div>
        <StepHeader title="Indicative budget?" hint="Helps us recommend the right scope. Adjustable later." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((b) => (
            <ChoiceCard
              key={b.id}
              active={data.budget === b.id}
              onClick={() => update("budget", b.id)}
              label={b.label}
              description={b.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}