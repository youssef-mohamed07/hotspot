"use client";

import type { BriefData } from "@/types/brief";
import { StepHeader } from "./step-header";
import { BriefSummary } from "./brief-summary";

export function Step5Contact({
  data,
  update,
}: {
  data: BriefData;
  update: <K extends keyof BriefData>(k: K, v: BriefData[K]) => void;
}) {
  const inputCls =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 transition focus:border-accent focus:bg-white focus:outline-none";
  const labelCls =
    "mb-2 block text-[10px] uppercase tracking-[0.25em] text-zinc-400";
  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div>
        <StepHeader
          title="Almost there."
          hint="Where should we send the proposal?"
        />
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="w-name" className={labelCls}>
                Full name
              </label>
              <input
                id="w-name"
                autoComplete="name"
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                type="text"
                required
                placeholder="Your name"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="w-company" className={labelCls}>
                Company
              </label>
              <input
                id="w-company"
                autoComplete="organization"
                value={data.company}
                onChange={(e) => update("company", e.target.value)}
                type="text"
                placeholder="Brand or agency"
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="w-email" className={labelCls}>
                Email
              </label>
              <input
                id="w-email"
                autoComplete="email"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                type="email"
                required
                placeholder="you@brand.com"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="w-phone" className={labelCls}>
                Phone (WhatsApp)
              </label>
              <input
                id="w-phone"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                type="tel"
                placeholder="+966 5x xxx xxxx"
                className={inputCls}
              />
            </div>
          </div>
          <div>
            <label htmlFor="w-extra" className={labelCls}>
              Anything else?
            </label>
            <textarea
              id="w-extra"
              value={data.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={3}
              placeholder="Specific dates, brand references, must-haves..."
              className={inputCls}
            />
          </div>
        </div>
      </div>
      <BriefSummary data={data} />
    </div>
  );
}
