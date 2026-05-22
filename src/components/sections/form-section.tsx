"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { IconArrowRight } from "@/components/icons";

export function FormSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fafafa] py-24 md:py-32">
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6">
        <Reveal className="mb-16 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Contact Us</p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            Start your<br />
            <span className="text-accent">activation.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-zinc-600">
            Tell us about your campaign. We come back within 24 hours with scope, timeline and a tailored proposal.
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
                <p className="mt-4 text-zinc-600">We're reviewing your specs and will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid flex-col gap-8 md:grid-cols-2">
                {/* 1. Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-900">Full Name *</label>
                  <input required type="text" className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
                {/* 2. Company */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-900">Brand / Company *</label>
                  <input required type="text" className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
                {/* 3. Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-900">Email *</label>
                  <input required type="email" className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
                {/* 4. WhatsApp */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-900">WhatsApp Number *</label>
                  <input required type="tel" className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>
                
                {/* 5. Industry */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-zinc-900">Your Industry / Category *</label>
                  <span className="text-xs text-zinc-500">Select your industry</span>
                  <select required className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent">
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
                </div>

                {/* 6. Campaign Type */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-zinc-900">Campaign Type *</label>
                  <span className="text-xs text-zinc-500">What are you activating?</span>
                  <select required className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent">
                    <option value="">Choose...</option>
                    <option>Product Launch</option>
                    <option>Brand Awareness Campaign</option>
                    <option>Seasonal / Promotional Campaign</option>
                    <option>Event Activation</option>
                    <option>Influencer / Content Moment</option>
                    <option>B2B / Corporate Activation</option>
                    <option>I'm not sure yet — advise me</option>
                  </select>
                </div>

                {/* 7. Target Cities */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-zinc-900">Target Cities *</label>
                  <span className="text-xs text-zinc-500">Where do you need to be?</span>
                  <select required className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent">
                    <option value="">Choose...</option>
                    <option>Riyadh only</option>
                    <option>Jeddah only</option>
                    <option>Khobar / Eastern Province only</option>
                    <option>Multiple KSA cities</option>
                    <option>KSA + Dubai</option>
                    <option>KSA + Cairo</option>
                    <option>Full multi-market — let's discuss</option>
                  </select>
                </div>

                {/* 8. Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-900">Estimated Campaign Date</label>
                  <input type="text" placeholder="e.g. Next month, Q3, etc." className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                </div>

                {/* 9. Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-zinc-900">Approximate Budget Range</label>
                  <select className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent">
                    <option value="">Choose...</option>
                    <option>Under SAR 50,000</option>
                    <option>SAR 50,000 – 150,000</option>
                    <option>SAR 150,000 – 500,000</option>
                    <option>SAR 500,000+</option>
                    <option>Let's discuss</option>
                  </select>
                </div>

                {/* 10. Notes */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-semibold text-zinc-900">Tell Us About Your Campaign</label>
                  <textarea rows={4} className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-accent focus:ring-1 focus:ring-accent" placeholder="Any extra details, links, or requirements..."></textarea>
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                  <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-bold text-white transition-all hover:bg-accent-deep hover:shadow-lg hover:shadow-accent/30">
                    Send My Brief — Let's Deploy
                    <IconArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}