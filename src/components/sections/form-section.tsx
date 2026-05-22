"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { IconArrowRight } from "@/components/icons";
import { StepHeader } from "@/components/brief-wizard/step-header";
import { WizardNav } from "@/components/brief-wizard/wizard-nav";
import { WizardProgress } from "@/components/brief-wizard/wizard-progress";
import type { ContactFormData } from "@/lib/contact-form";

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

const STEP_LABELS = ["Contact", "Brand", "Campaign", "Details"];
const TOTAL_STEPS = STEP_LABELS.length;

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

export function FormSection() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fafafa] py-24 md:py-32"
    >
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <Reveal className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Contact Us</p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            Start your
            <br />
            <span className="text-accent">activation.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            Tell us about your campaign. We come back within 24 hours with scope, timeline and a
            tailored proposal.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] bg-white p-8 shadow-xl shadow-accent/5 ring-1 ring-accent/10 md:p-12">
            {submitted ? (
              <div className="flex flex-col items-center py-20 text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <IconArrowRight className="h-10 w-10 rotate-90" />
                </div>
                <h3 className="text-3xl font-bold text-zinc-900">Brief Received!</h3>
                <p className="mt-4 text-zinc-600">
                  Thanks{data.name ? `, ${data.name.split(" ")[0]}` : ""}. We&apos;re reviewing your
                  specs and will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <div className="grid gap-8">
                <WizardProgress current={step} total={TOTAL_STEPS} labels={STEP_LABELS} />

                <div className="min-h-[280px]">
                  {step === 0 && (
                    <div>
                      <StepHeader
                        title="Let's connect."
                        hint="Tell us who you are and how to reach you."
                      />
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Full Name *">
                          <input
                            required
                            type="text"
                            value={data.name}
                            onChange={(e) => update("name", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Brand / Company *">
                          <input
                            required
                            type="text"
                            value={data.company}
                            onChange={(e) => update("company", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Email *">
                          <input
                            required
                            type="email"
                            value={data.email}
                            onChange={(e) => update("email", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="WhatsApp Number *">
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
                      <StepHeader
                        title="About your brand."
                        hint="Help us understand your industry and category."
                      />
                      <Field label="Your Industry / Category *" hint="Select your industry">
                        <select
                          required
                          value={data.industry}
                          onChange={(e) => update("industry", e.target.value)}
                          className={inputCls}
                        >
                          <option value="">Choose...</option>
                          <option>FMCG / Consumer Goods</option>
                          <option>Retail / Fashion</option>
                          <option>F&B / Food & Beverage</option>
                          <option>Tech / Fintech / App</option>
                          <option>Real Estate / Hospitality</option>
                          <option>Automotive</option>
                          <option>Government / Public Sector</option>
                          <option>Healthcare / Pharma</option>
                          <option>Entertainment / Events</option>
                          <option>Other</option>
                        </select>
                      </Field>
                    </div>
                  )}

                  {step === 2 && (
                    <div>
                      <StepHeader
                        title="The campaign."
                        hint="What you're activating and where."
                      />
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field
                          label="Campaign Type *"
                          hint="What are you activating?"
                          className="md:col-span-2"
                        >
                          <select
                            required
                            value={data.campaignType}
                            onChange={(e) => update("campaignType", e.target.value)}
                            className={inputCls}
                          >
                            <option value="">Choose...</option>
                            <option>Product Launch</option>
                            <option>Brand Awareness Campaign</option>
                            <option>Seasonal / Promotional Campaign</option>
                            <option>Event Activation</option>
                            <option>Influencer / Content Moment</option>
                            <option>B2B / Corporate Activation</option>
                            <option>I&apos;m not sure yet — advise me</option>
                          </select>
                        </Field>
                        <Field
                          label="Target Cities *"
                          hint="Where do you need to be?"
                          className="md:col-span-2"
                        >
                          <select
                            required
                            value={data.targetCities}
                            onChange={(e) => update("targetCities", e.target.value)}
                            className={inputCls}
                          >
                            <option value="">Choose...</option>
                            <option>Riyadh only</option>
                            <option>Jeddah only</option>
                            <option>Khobar / Eastern Province only</option>
                            <option>Multiple KSA cities</option>
                            <option>KSA + Dubai</option>
                            <option>KSA + Cairo</option>
                            <option>Full multi-market — let&apos;s discuss</option>
                          </select>
                        </Field>
                        <Field label="Estimated Campaign Date">
                          <input
                            type="text"
                            placeholder="e.g. Next month, Q3, etc."
                            value={data.campaignDate}
                            onChange={(e) => update("campaignDate", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Approximate Budget Range">
                          <select
                            value={data.budget}
                            onChange={(e) => update("budget", e.target.value)}
                            className={inputCls}
                          >
                            <option value="">Choose...</option>
                            <option>Under SAR 50,000</option>
                            <option>SAR 50,000 – 150,000</option>
                            <option>SAR 150,000 – 500,000</option>
                            <option>SAR 500,000+</option>
                            <option>Let&apos;s discuss</option>
                          </select>
                        </Field>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div>
                      <StepHeader
                        title="Anything else?"
                        hint="Share extra details, links, or requirements before you send."
                      />
                      <Field label="Tell Us About Your Campaign">
                        <textarea
                          rows={5}
                          value={data.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          placeholder="Any extra details, links, or requirements..."
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
                  onNext={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
                  onSubmit={handleSubmit}
                  submitLabel="Send My Brief — Let's Deploy"
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
