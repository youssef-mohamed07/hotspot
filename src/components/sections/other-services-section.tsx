"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { allServices } from "@/data/other-services";
import { ServiceShowcaseCard } from "@/components/other-services/service-showcase-card";

export function OtherServicesSection() {
  const [activeId, setActiveId] = useState(allServices[0].id);

  return (
    <section id="services" className="relative overflow-hidden bg-[#fafafa] py-24 md:py-32">
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[100rem] px-6">
        <Reveal className="mb-12 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Beyond The Truck</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            Years of 360&deg; solutions.
            <br />
            <span className="text-accent">and still innovating.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600">
            Cyber Stage is the newest chapter of a decade-long commitment to making Saudi events
            unforgettable.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3 snap-x snap-mandatory scroll-smooth xl:mx-0 xl:grid xl:grid-cols-6 xl:overflow-visible xl:px-0">
            {allServices.map((service) => (
              <ServiceShowcaseCard
                key={service.id}
                service={service}
                active={activeId === service.id}
                onSelect={() => setActiveId(service.id)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
