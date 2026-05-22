import type { ComponentType, SVGProps } from "react";

interface ServiceAddonCardProps {
  index: number;
  title: string;
  description: string;
  tag: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  className?: string;
}

export function ServiceAddonCard({
  index,
  title,
  description,
  tag,
  Icon,
  className = "",
}: ServiceAddonCardProps) {
  const bullets = description.split(" · ");

  return (
    <article
      className={`group relative flex h-full min-h-[220px] flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-accent/25 hover:shadow-xl hover:shadow-accent/[0.08] md:p-7 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(70% 80% at 100% 0%, rgba(42,118,166,0.08), transparent 65%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/[0.07] text-accent ring-1 ring-accent/10 transition group-hover:bg-accent group-hover:text-white group-hover:ring-accent">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition group-hover:bg-accent/10 group-hover:text-accent">
            {tag}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-zinc-400">
            /{String(index).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="relative mt-auto pt-8">
        <h3 className="text-lg font-semibold tracking-tight text-zinc-900 transition group-hover:text-accent-deep md:text-xl">
          {title}
        </h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {bullets.map((item) => (
            <li
              key={item}
              className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent-gradient transition-all duration-500 group-hover:w-full"
      />
    </article>
  );
}
