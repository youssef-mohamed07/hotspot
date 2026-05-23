"use client";

import { SiteImage } from "@/components/ui/site-image";
import type { CaseStudy } from "@/data/case-studies";
import type { ImageAsset } from "@/data/image-assets";

export function CaseStudyCard({
  study,
  index,
  image,
}: {
  study: CaseStudy;
  index: number;
  image: ImageAsset;
}) {
  const flipped = index % 2 === 1;

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xl shadow-accent/[0.06] ring-1 ring-accent/10">
      <div className="grid lg:grid-cols-2">
        <div
          className={`relative min-h-[280px] bg-white sm:min-h-[320px] lg:min-h-[480px] ${
            flipped ? "lg:order-2" : ""
          }`}
        >
          <SiteImage
            asset={image}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 600px"
          />
        </div>

        <div
          className={`flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14 ${
            flipped ? "lg:order-1" : ""
          }`}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
            {study.category} · {study.location}
          </p>
          <h3 className="display-headline mt-3 text-4xl text-zinc-900 lg:text-5xl">{study.title}</h3>
          <p className="mt-6 text-lg leading-relaxed text-zinc-600 lg:mt-8">{study.intro}</p>

          <div className="my-8 h-px w-full bg-zinc-200" />

          <ul className="space-y-6">
            {study.highlights.map((item, i) => (
              <li key={item.title} className="flex gap-5">
                <span className="font-mono text-xs font-medium tracking-widest text-zinc-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 pl-1">
                  <p className="text-sm font-bold uppercase tracking-wide text-zinc-900">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
