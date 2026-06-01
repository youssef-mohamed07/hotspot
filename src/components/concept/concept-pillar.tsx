"use client";

import { Reveal } from "@/components/reveal";
import { SiteImage } from "@/components/ui/site-image";
import { useIsRtl } from "@/i18n/locale-provider";
import type { ConceptPillarData } from "@/types/concept-pillar";
import type { ImageAsset } from "@/data/image-assets";

export function ConceptPillar({
  pillar,
  index,
  flipped,
  image,
}: {
  pillar: ConceptPillarData;
  index: number;
  flipped: boolean;
  image: ImageAsset;
}) {
  const isRtl = useIsRtl();
  const swapColumns = isRtl ? !flipped : flipped;

  return (
    <Reveal delay={index * 0.1}>
      <div
        className={`grid items-center gap-10 text-start lg:grid-cols-2 lg:gap-16 ${
          swapColumns ? "lg:[&>div:first-child]:order-2" : ""
        }`}
      >
        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[36px]">
            <SiteImage asset={image} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 400px" />

            <div className="absolute bottom-6 end-6 rounded-2xl border border-zinc-200/90 bg-white/95 px-5 py-3 shadow-sm backdrop-blur-sm">
              <p className="text-2xl font-semibold tracking-tight text-zinc-900">
                {pillar.metric.value}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500">
                {pillar.metric.label}
              </p>
            </div>
          </div>

          <div
            className={`pointer-events-none absolute inset-0 hidden translate-y-3 rounded-[36px] border border-accent/20 lg:block ${
              swapColumns ? "translate-x-3" : "-translate-x-3"
            }`}
            aria-hidden
          />
        </div>

        <div className="relative">
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 text-accent">
                <pillar.Icon className="h-5 w-5" />
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-accent">{pillar.subtitle}</p>
            </div>

            <h3 className="display-headline mt-6 text-3xl text-zinc-900 sm:text-4xl md:text-5xl">
              {pillar.title}
            </h3>

            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-600 md:text-lg">
              {pillar.description}
            </p>

            <ul className="mt-8 space-y-3">
              {pillar.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-zinc-600">
                  <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
