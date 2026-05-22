"use client";

import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";
import type { ServiceItem } from "@/data/other-services";

export function ServiceDetailPanel({ service }: { service: ServiceItem }) {
  const Icon = service.Icon;

  return (
    <div
      key={service.id}
      className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xl shadow-accent/[0.06] ring-1 ring-accent/10"
    >
      <div className="grid lg:grid-cols-2">
        {/* Image — left */}
        <div
          className={`relative min-h-[300px] sm:min-h-[360px] lg:min-h-[440px] ${
            service.featured ? "bg-zinc-900" : "bg-zinc-100"
          }`}
        >
          <Image
            src={service.image}
            alt={service.title}
            fill
            className={service.featured ? "object-contain p-6 sm:p-10" : "object-cover"}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {!service.featured && (
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/20 via-transparent to-transparent"
              aria-hidden
            />
          )}

          <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 p-6 lg:p-8">
            {service.highlights.slice(0, 2).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/60 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-zinc-800 shadow-sm backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Copy — right */}
        <div className="flex flex-col justify-center border-t border-zinc-100 px-8 py-10 lg:border-t-0 lg:border-l lg:px-12 lg:py-14">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/[0.08] text-accent ring-1 ring-accent/15">
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                {service.tag}
                {service.badge ? ` · ${service.badge}` : ""}
              </p>
              <p className="mt-0.5 font-mono text-[10px] tracking-widest text-zinc-400">/{service.id}</p>
            </div>
          </div>

          <h3 className="display-headline mt-8 text-3xl text-zinc-900 sm:text-4xl lg:text-[2.75rem]">
            {service.title}
          </h3>
          <p className="mt-2 text-lg font-medium text-zinc-500">{service.description}</p>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600">{service.summary}</p>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {service.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50 px-3 py-2.5 text-sm text-zinc-700"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            {service.featured && (
              <Link
                href="#visualization"
                className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 hover:shadow-lg hover:shadow-accent/25"
              >
                Explore Cyber Stage
                <IconArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-800 transition hover:border-accent hover:text-accent"
            >
              Request this layer
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
