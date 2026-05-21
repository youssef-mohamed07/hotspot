"use client";

import type { BriefData, Goal } from "@/types/brief";
import { StepHeader } from "./step-header";
import { ChoiceCard } from "./choice-card";

export function Step1Goals({ data, toggle }: { data: BriefData; toggle: (g: Goal) => void }) {
  const goals: { id: Goal; label: string; description: string }[] = [
    { id: "awareness", label: "Brand Awareness", description: "Maximize impressions and visibility." },
    { id: "launch", label: "Product Launch", description: "Generate buzz around a new offering." },
    { id: "footfall", label: "Drive Footfall", description: "Pull crowds into a venue or location." },
    { id: "sales", label: "Sales Activation", description: "Convert attention into purchases on the spot." },
    { id: "vip", label: "VIP Hosting", description: "Premium experience for select guests." },
    { id: "social", label: "Social Virality", description: "Drive UGC and shareable moments." },
  ];
  return (
    <div>
      <StepHeader title="What are your goals?" hint="Pick all that apply — we'll tune the activation around them." />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((g) => (
          <ChoiceCard
            key={g.id}
            active={data.goals.includes(g.id)}
            onClick={() => toggle(g.id)}
            label={g.label}
            description={g.description}
          />
        ))}
      </div>
    </div>
  );
}