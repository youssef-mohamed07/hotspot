"use client";

import type { BriefData, Service } from "@/types/brief";
import { StepHeader } from "./step-header";
import { ChoiceCard } from "./choice-card";

export function Step2Services({
  data,
  toggle,
}: {
  data: BriefData;
  toggle: (s: Service) => void;
}) {
  const services: { id: Service; label: string; description: string }[] = [
    {
      id: "led",
      label: "LED Screens",
      description: "Modular walls, mobile screens, branded panels.",
    },
    {
      id: "stage",
      label: "Stage Production",
      description: "Full staging, rigging, lighting and crew.",
    },
    {
      id: "sound",
      label: "Sound System",
      description: "Line array, monitors, broadcast-ready audio.",
    },
    {
      id: "interactive",
      label: "Interactive Tech",
      description: "Custom apps, AR, social walls, data overlays.",
    },
    {
      id: "photo",
      label: "AI Photo Booth",
      description: "Branded photo experiences for guests.",
    },
    {
      id: "wraps",
      label: "Vehicle Wraps",
      description: "Full custom Cyber Stage branding skin.",
    },
  ];
  return (
    <div>
      <StepHeader
        title="Which add-ons do you need?"
        hint="Combine Cyber Stage with extra production capabilities."
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ChoiceCard
            key={s.id}
            active={data.services.includes(s.id)}
            onClick={() => toggle(s.id)}
            label={s.label}
            description={s.description}
          />
        ))}
      </div>
    </div>
  );
}
