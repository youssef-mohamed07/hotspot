"use client";

import type { BriefData, CampaignType } from "@/types/brief";
import { StepHeader } from "./step-header";
import { ChoiceCard } from "./choice-card";

export function Step0Type({ data, update }: { data: BriefData; update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void }) {
  const types: { id: CampaignType; label: string; description: string }[] = [
    { id: "mall", label: "Mall Activation", description: "Brand presence inside or around shopping destinations." },
    { id: "event", label: "Event Launch", description: "Product launches, openings, gala arrivals." },
    { id: "national", label: "National Campaign", description: "Multi-city tour with a unified message." },
    { id: "vip", label: "VIP Experience", description: "Premium guest transport, branded entrances." },
    { id: "other", label: "Something Else", description: "Custom format — we'll design around it." },
  ];
  return (
    <div>
      <StepHeader title="What kind of activation?" hint="Pick the format that fits your campaign best." />
      <div className="grid gap-3 sm:grid-cols-2">
        {types.map((t, i) => (
          <ChoiceCard
            key={t.id}
            active={data.campaignType === t.id}
            onClick={() => update("campaignType", t.id)}
            label={t.label}
            description={t.description}
            kbd={`/0${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}