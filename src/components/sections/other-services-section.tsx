"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { ServiceShowcaseCard } from "@/components/other-services/service-showcase-card";
import { IconChevronLeft, IconChevronRight } from "@/components/icons";
import { useDictionary } from "@/i18n/locale-provider";
import { getLocalizedServices } from "@/lib/services-i18n";

export function OtherServicesSection() {
  const dict = useDictionary();
  const allServices = getLocalizedServices(dict);
  const [activeId, setActiveId] = useState(allServices[0].id);

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[100rem] px-6">
        <Reveal className="mb-12 flex max-w-3xl flex-col items-start xl:flex-row xl:items-end xl:justify-between">
          <div className="text-start">
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-accent" />
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                {dict.services.eyebrow}
              </p>
            </div>
            <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
              {dict.services.headline1}
              <br />
              <span className="text-accent">{dict.services.headlineAccent}</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-zinc-600">{dict.services.subtitle}</p>
          </div>
          
          {/* Mobile Swipe Hint */}
          <div className="mt-8 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-400 xl:hidden">
            <IconChevronLeft className="h-4 w-4 animate-pulse" />
            <span>{dict.services.swipe}</span>
            <IconChevronRight className="h-4 w-4 animate-pulse" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-3 snap-x snap-mandatory scroll-smooth xl:mx-0 xl:grid xl:grid-cols-6 xl:overflow-visible xl:px-0">
            {allServices.map((service) => (
              <ServiceShowcaseCard
                key={service.id}
                service={service}
                active={activeId === service.id}
                onSelect={() => setActiveId(service.id)}
                imageAlt={dict.services.serviceImageAlt.replace("{title}", service.title)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
