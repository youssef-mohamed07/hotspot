"use client";

import { Reveal } from "@/components/reveal";
import { otherServices } from "@/data/other-services";
import { IconTruck } from "@/components/icons";

export function OtherServicesSection() {
  return (
    <section id="services" className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#fafafa] py-24 md:py-32">
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <Reveal className="mb-20 flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Beyond The Truck</p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline mt-6 text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            Years of 360&deg; Solutions.<br />
            <span className="text-accent">and still Innovating.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600">
            Cyber Stage is the newest chapter of a decade-long commitment to making Saudi events unforgettable.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Cyber Stage featured block */}
          <Reveal delay={0.0} className="flex h-full">
            <div className="flex w-full flex-col items-center justify-center rounded-[2rem] bg-accent p-8 text-center text-white shadow-xl shadow-accent/20 ring-1 ring-accent transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/30">
              <span className="mb-6 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                New Product
              </span>
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur-sm">
                <IconTruck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Cybertruck</h3>
              <p className="mt-3 text-sm font-medium leading-relaxed text-white/80 shrink-0">
                Immersive Mobile Stage
              </p>
            </div>
          </Reveal>

          {/* Other Services */}
          {otherServices.map((service, i) => {
            const Icon = service.Icon;
            return (
              <Reveal key={service.title} delay={0.05 * (i + 1)} className="flex h-full">
                <div className="flex w-full flex-col items-center justify-center rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-accent/5 ring-1 ring-accent/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:ring-accent/20">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent/5 text-accent">
                    <Icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">{service.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-relaxed tracking-wide text-zinc-500 shrink-0">
                    {service.description.replace(/ · /g, " • ")}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
