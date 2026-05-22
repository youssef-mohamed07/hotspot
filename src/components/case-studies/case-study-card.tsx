"use client";

import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies";

export function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const flipped = index % 2 === 1;

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xl shadow-accent/[0.06] ring-1 ring-accent/10">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <div
          className={`relative min-h-[280px] bg-zinc-100 sm:min-h-[320px] lg:min-h-[480px] ${
            flipped ? "lg:order-2" : ""
          }`}
        >
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-zinc-900/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-zinc-900/20"
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:hidden">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
              {study.category} · {study.location}
            </p>
            <h3 className="display-headline mt-2 text-3xl text-white">{study.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div
          className={`flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-14 ${
            flipped ? "lg:order-1" : ""
          }`}
        >
          <p className="hidden text-[10px] font-bold uppercase tracking-[0.3em] text-accent lg:block">
            {study.category} · {study.location}
          </p>
          <h3 className="display-headline mt-0 hidden text-4xl text-zinc-900 lg:mt-3 lg:block lg:text-5xl">
            {study.title}
          </h3>

          <p className="mt-6 text-lg leading-relaxed text-zinc-600 lg:mt-8">{study.intro}</p>

          <div className="my-8 h-px w-full bg-zinc-200" />

          <ul className="space-y-6">
            {study.highlights.map((item, i) => (
              <li key={item.title} className="flex gap-5">
                <span className="font-mono text-xs font-medium tracking-widest text-zinc-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 border-l border-accent/20 pl-5">
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
