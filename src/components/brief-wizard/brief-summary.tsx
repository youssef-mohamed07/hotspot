"use client";

import type { BriefData, CampaignType, Timeline, Budget } from "@/types/brief";
export function BriefSummary({ data }: { data: BriefData }) {
  const typeLabels: Record<CampaignType, string> = {
    mall: "Mall Activation",
    event: "Event Launch",
    national: "National Campaign",
    vip: "VIP Experience",
    other: "Custom",
  };
  const timelineLabels: Record<Timeline, string> = {
    asap: "ASAP",
    "1month": "Within 1 month",
    "3months": "1–3 months",
    exploring: "Exploring",
  };
  const budgetLabels: Record<Budget, string> = {
    under50: "<50K SAR",
    "50to150": "50–150K SAR",
    "150to500": "150–500K SAR",
    "500plus": "500K+ SAR",
    tbd: "TBD",
  };
  const audienceDisplay = data.audience >= 1000
    ? `${(data.audience / 1000).toFixed(data.audience % 1000 === 0 ? 0 : 1)}K`
    : `${data.audience}`;
  const rows = [
    { label: "Type", value: data.campaignType ? typeLabels[data.campaignType] : "—" },
    { label: "Goals", value: data.goals.length ? `${data.goals.length} selected` : "—" },
    { label: "Add-ons", value: data.services.length ? `${data.services.length} selected` : "—" },
    { label: "City", value: data.city || "—" },
    { label: "Duration", value: `${data.duration} ${data.duration === 1 ? "day" : "days"}` },
    { label: "Audience", value: audienceDisplay },
    { label: "Timeline", value: data.timeline ? timelineLabels[data.timeline] : "—" },
    { label: "Budget", value: data.budget ? budgetLabels[data.budget] : "—" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Your brief</p>
      <div className="mt-5 space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between border-b border-white/5 pb-3 text-sm last:border-0">
            <span className="text-zinc-500">{r.label}</span>
            <span className="font-medium text-zinc-900">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}