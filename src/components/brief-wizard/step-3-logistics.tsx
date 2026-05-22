"use client";

import type { BriefData } from "@/types/brief";
import { StepHeader } from "./step-header";
import { SliderField } from "./slider-field";

export function Step3Logistics({ data, update }: { data: BriefData; update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void }) {
  const inputCls = "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 transition focus:border-accent focus:bg-white focus:outline-none";
  const labelCls = "mb-2 block text-[10px] uppercase tracking-[0.25em] text-zinc-400";
  const cityOptions = ["Riyadh", "Jeddah", "Khobar", "Mecca", "Medina", "Multi-city"];
  return (
    <div>
      <StepHeader title="Tell us the logistics." hint="City, duration and expected audience help us scope the right kit." />
      <div className="grid gap-6">
        <div>
          <label className={labelCls}>Primary city</label>
          <div className="flex flex-wrap gap-2">
            {cityOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => update("city", c)}
                className={`rounded-full border px-4 py-2 text-xs transition ${
                  data.city === c
                    ? "border-accent bg-accent/15 text-white"
                    : "border-zinc-200 bg-white/[0.06] text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <SliderField
            label="Activation duration"
            value={data.duration}
            min={1}
            max={14}
            step={1}
            onChange={(v) => update("duration", v)}
            display={`${data.duration} ${data.duration === 1 ? "day" : "days"}`}
          />
          <SliderField
            label="Expected audience"
            value={data.audience}
            min={500}
            max={50000}
            step={500}
            onChange={(v) => update("audience", v)}
            display={data.audience >= 1000 ? `${(data.audience / 1000).toFixed(data.audience % 1000 === 0 ? 0 : 1)}K people` : `${data.audience} people`}
          />
        </div>
        <div>
          <label htmlFor="venue-detail" className={labelCls}>Specific venue or area (optional)</label>
          <input
            id="venue-detail"
            type="text"
            placeholder="e.g. Boulevard City, Park Avenue Mall, King Abdullah Park..."
            className={inputCls}
            onChange={(e) => update("notes", e.target.value)}
            defaultValue={data.notes}
          />
        </div>
      </div>
    </div>
  );
}