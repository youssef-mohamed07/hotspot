import type { ComponentType, SVGProps } from "react";

interface ServiceAddonCardProps {
  index: number;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export function ServiceAddonCard({ index, title, description, Icon }: ServiceAddonCardProps) {
  return (
    <div className="group relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.015] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.03]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.04), transparent 70%)",
        }}
      />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-zinc-200/70 bg-white/80 text-zinc-500 transition group-hover:border-zinc-300 group-hover:text-zinc-700">
            <Icon className="h-4 w-4" />
          </span>
          <span className="font-mono text-[10px] tracking-widest text-zinc-700">
            /{String(index).padStart(2, "0")}
          </span>
        </div>
        <h3 className="mt-5 text-base font-semibold tracking-tight text-zinc-900 transition group-hover:text-zinc-900">
          {title}
        </h3>
        <p className="mt-3 flex-1 text-xs leading-relaxed text-zinc-600 transition group-hover:text-zinc-700">
          {description}
        </p>
      </div>
    </div>
  );
}
