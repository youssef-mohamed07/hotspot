"use client";

import { useState } from "react";
import type { BriefData } from "@/types/brief";
import { initialBrief } from "@/types/brief";
import { BriefSuccess } from "./brief-success";
import { Step0Type } from "./step-0-type";
import { Step1Goals } from "./step-1-goals";
import { Step2Services } from "./step-2-services";
import { Step3Logistics } from "./step-3-logistics";
import { Step4TimingBudget } from "./step-4-timing-budget";
import { Step5Contact } from "./step-5-contact";
import { WizardNav } from "./wizard-nav";
import { WizardProgress } from "./wizard-progress";

export function BriefWizard({ submitted, onSubmitted }: { submitted: boolean; onSubmitted: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BriefData>(initialBrief);
  const totalSteps = 6;

  const update = <K extends keyof BriefData>(key: K, value: BriefData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const toggleArray = <K extends "goals" | "services">(key: K, value: BriefData[K][number]) =>
    setData((d) => {
      const arr = d[key] as Array<typeof value>;
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...d, [key]: next } as BriefData;
    });

  // Per-step validity
  const canAdvance = [
    data.campaignType !== null,
    data.goals.length > 0,
    data.services.length > 0,
    data.city.trim().length > 0,
    data.timeline !== null && data.budget !== null,
    data.name.trim().length > 1 && /\S+@\S+\.\S+/.test(data.email),
  ][step];

  if (submitted) return <BriefSuccess data={data} />;

  return (
    <div className="grid gap-8">
      <WizardProgress current={step} total={totalSteps} />
      <div className="min-h-[360px]">
        {step === 0 && <Step0Type data={data} update={update} />}
        {step === 1 && <Step1Goals data={data} toggle={(v) => toggleArray("goals", v)} />}
        {step === 2 && <Step2Services data={data} toggle={(v) => toggleArray("services", v)} />}
        {step === 3 && <Step3Logistics data={data} update={update} />}
        {step === 4 && <Step4TimingBudget data={data} update={update} />}
        {step === 5 && <Step5Contact data={data} update={update} />}
      </div>
      <WizardNav
        step={step}
        totalSteps={totalSteps}
        canAdvance={canAdvance}
        onPrev={() => setStep((s) => Math.max(0, s - 1))}
        onNext={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
        onSubmit={onSubmitted}
      />
    </div>
  );
}