"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { DirectionalArrow } from "@/components/icons/directional-arrow";
import { StepHeader } from "@/components/brief-wizard/step-header";
import { WizardNav } from "@/components/brief-wizard/wizard-nav";
import { WizardProgress } from "@/components/brief-wizard/wizard-progress";
import type { ContactFormData } from "@/lib/contact-form";
import { useDictionary } from "@/i18n/locale-provider";
import { attributionPayload, trackFormStart, trackLead } from "@/lib/marketing/track";

const initialForm: ContactFormData = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  industry: "",
  campaignType: "",
  targetCities: "",
  campaignDate: "",
  budget: "",
  notes: "",
};

const inputCls =
  "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent";
const labelCls = "text-sm font-semibold text-zinc-900";
const hintCls = "text-xs text-zinc-500";

function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className={labelCls}>{label}</label>
      {hint && <span className={hintCls}>{hint}</span>}
      {children}
    </div>
  );
}

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm outline-none transition-all ${
          isOpen
            ? "border-accent bg-white ring-1 ring-accent"
            : "border-zinc-200 bg-zinc-50 hover:bg-zinc-100/80"
        } ${value ? "text-zinc-900" : "text-zinc-500"}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] outline-none"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-3 text-start text-sm transition-colors ${
                  value === opt
                    ? "bg-accent/5 font-semibold text-accent"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                }`}
              >
                {opt}
                {value === opt && (
                  <svg
                    className="ml-auto h-4 w-4 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FormSection() {
  const dict = useDictionary();
  const c = dict.contact;
  const TOTAL_STEPS = c.steps.length;

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<ContactFormData>(initialForm);

  const update = <K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const canAdvance = [
    data.name.trim().length > 0 &&
      data.company.trim().length > 0 &&
      /\S+@\S+\.\S+/.test(data.email) &&
      data.whatsapp.trim().length > 0,
    data.industry.length > 0,
    data.campaignType.length > 0 && data.targetCities.length > 0,
    true,
  ][step];

  const handleSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const payload: ContactFormData = {
        ...data,
        attribution: attributionPayload(),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(body.error ?? c.error);
      }
      trackLead({
        campaign_type: data.campaignType,
        industry: data.industry,
        budget: data.budget || undefined,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : c.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const successBody = c.successBody.replace(
    "{name}",
    data.name ? `، ${data.name.split(" ")[0]}` : ""
  );

  return (
    <section
      id="contact"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fafafa] py-24 md:py-32"
    >
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <Reveal className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{c.eyebrow}</p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {c.headline1}
            <br />
            <span className="text-accent">{c.headlineAccent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-zinc-600">{c.subtitle}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative rounded-[2rem] bg-white p-8 shadow-xl shadow-accent/5 ring-1 ring-accent/10 md:p-12">
            {submitted ? (
              <div className="flex flex-col items-center py-20 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <DirectionalArrow className="h-10 w-10 rotate-90" />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900">{c.successTitle}</h3>
                <p className="mt-4 text-zinc-600">{successBody}</p>
              </div>
            ) : (
              <div className="grid gap-8">
                <WizardProgress current={step} total={TOTAL_STEPS} labels={c.steps} />

                <div className="min-h-[280px]">
                  {step === 0 && (
                    <div>
                      <StepHeader title={c.step0.title} hint={c.step0.hint} />
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label={c.step0.name}>
                          <input
                            required
                            type="text"
                            value={data.name}
                            onChange={(e) => update("name", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={c.step0.company}>
                          <input
                            required
                            type="text"
                            value={data.company}
                            onChange={(e) => update("company", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={c.step0.email}>
                          <input
                            required
                            type="email"
                            value={data.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={c.step0.whatsapp}>
                          <input
                            required
                            type="tel"
                            value={data.whatsapp}
                            onChange={(e) => update("whatsapp", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div>
                      <StepHeader title={c.step1.title} hint={c.step1.hint} />
                      <Field label={c.step1.industry} hint={c.step1.industryHint}>
                        <CustomSelect
                          value={data.industry}
                          onChange={(val) => update("industry", val)}
                          options={c.step1.industries}
                          placeholder={c.step1.choose}
                        />
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <StepHeader title={c.step2.title} hint={c.step2.hint} />
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label={c.step2.type} hint={c.step2.typeHint} className="md:col-span-2">
                          <CustomSelect
                            value={data.campaignType}
                            onChange={(val) => update("campaignType", val)}
                            options={c.step2.campaignTypes}
                            placeholder={c.step1.choose}
                          />
                        </Field>
                        <Field label={c.step2.cities} hint={c.step2.citiesHint} className="md:col-span-2">
                          <CustomSelect
                            value={data.targetCities}
                            onChange={(val) => update("targetCities", val)}
                            options={c.step2.cityOptions}
                            placeholder={c.step1.choose}
                          />
                        </Field>
                        <Field label={c.step2.date}>
                          <input
                            type="text"
                            placeholder={c.step2.datePlaceholder}
                            value={data.campaignDate}
                            onChange={(e) => update("campaignDate", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label={c.step2.budget}>
                          <CustomSelect
                            value={data.budget}
                            onChange={(val) => update("budget", val)}
                            options={c.step2.budgetOptions}
                            placeholder={c.step1.choose}
                          />
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <StepHeader title={c.step3.title} hint={c.step3.hint} />
                      <Field label={c.step3.notes}>
                        <textarea
                          rows={5}
                          value={data.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          placeholder={c.step3.notesPlaceholder}
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  )}
                </div>

                {submitError && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                )}

                <WizardNav
                  step={step}
                  totalSteps={TOTAL_STEPS}
                  canAdvance={canAdvance}
                  isSubmitting={isSubmitting}
                  onPrev={() => setStep((s) => Math.max(0, s - 1))}
                  onNext={() => {
                    if (step === 0) trackFormStart();
                    setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
                  }}
                  onSubmit={handleSubmit}
                  submitLabel={c.submit}
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
