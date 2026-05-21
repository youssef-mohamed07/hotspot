"use client";

import { Reveal } from "@/components/reveal";
import { otherServices } from "@/data/other-services";
import { FeaturedCybertruckCard } from "@/components/other-services/featured-cybertruck-card";
import { ServiceAddonCard } from "@/components/other-services/service-addon-card";

export function OtherServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden py-32">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(40% 50% at 20% 20%, rgba(42,118,166,0.16), transparent 70%), radial-gradient(35% 45% at 80% 80%, rgba(4,40,95,0.16), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Beyond the truck</p>
          </div>
          <h2 className="display-headline mt-6 text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            One core product.
            <br />
            <span className="text-gradient-accent">Four extensions.</span>
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            The Cybertruck is the centerpiece. We extend it with full event production
            capabilities — so a single team owns your activation end to end.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <FeaturedCybertruckCard />
        </Reveal>

        <Reveal delay={0.15} className="mt-4">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
              Add-on services · /02–/05
            </p>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((service, i) => (
              <ServiceAddonCard
                key={service.title}
                index={i + 2}
                title={service.title}
                description={service.description}
                Icon={service.Icon}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
