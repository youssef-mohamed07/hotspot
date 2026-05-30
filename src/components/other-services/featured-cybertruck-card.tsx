import { IconArrowRight, IconTruck } from "@/components/icons";

const featureTags = [
  "Mobile reach",
  "Custom wrap",
  "On-board LED",
  "Crew + content",
] as const;

export function FeaturedCybertruckCard() {
  return (
    <a
      href="#visualization"
      className="group relative block overflow-hidden rounded-[2rem] border border-accent-deep/20 shadow-2xl shadow-accent-deep/15 ring-1 ring-white/10 transition duration-300 hover:shadow-accent-deep/25"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#04285f] via-[#0a3d6b] to-[#1d5a82]"
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 90% at 80% 30%, rgba(91,163,212,0.35), transparent 60%), radial-gradient(40% 60% at 20% 80%, rgba(4,40,95,0.6), transparent 70%)",
        }}
        aria-hidden
      />
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full"
      />
      <div
        aria-hidden
        className="led-panel pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="relative grid gap-10 p-8 md:p-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white backdrop-blur">
            <span className="pulse-dot" />
            Core product · /01
          </div>
          <h3 className="display-headline text-4xl text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Cyber Stage
            <br />
            <span className="text-gradient-accent">Activation.</span>
          </h3>
          <p className="max-w-lg text-base text-zinc-200 md:text-lg">
            The mobile, customizable, attention-stealing platform that anchors
            every campaign — fully wrapped in your brand, fitted with on-board
            LED, and operated by our crew.
          </p>

          <div className="flex flex-wrap gap-2">
            {featureTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-xs text-white backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#04285f] transition group-hover:translate-x-1">
              Explore the truck
              <IconArrowRight className="rtl-flip h-4 w-4" />
            </span>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(42,118,166,0.9)]" />
              Featured experience
            </span>
          </div>
        </div>

        <div className="relative flex min-h-[220px] items-center justify-center md:min-h-[280px]">
          <div
            aria-hidden
            className="absolute inset-8 rounded-full bg-accent-gradient opacity-40 blur-3xl"
          />
          <div className="relative grid h-40 w-40 place-items-center rounded-3xl border border-white/20 bg-white/[0.06] backdrop-blur md:h-56 md:w-56">
            <IconTruck className="h-20 w-20 text-white md:h-28 md:w-28" />
          </div>
          <div className="absolute bottom-0 right-0 w-44 rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur sm:bottom-2 sm:right-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/60">
              Mobile rig
            </p>
            <p className="mt-1 text-sm font-semibold text-white">
              Cyber Stage · LED skin
            </p>
            <p className="mt-2 text-[10px] text-white/50">
              Plug-and-play · road-ready
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}
