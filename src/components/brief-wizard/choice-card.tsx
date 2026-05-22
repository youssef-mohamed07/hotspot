"use client";

const cardBase = "group relative cursor-pointer rounded-2xl border bg-white/[0.03] p-5 transition hover:border-white/30 hover:bg-white/[0.06]";
const cardSelected = "border-accent bg-accent/10";
const cardIdle = "border-white/10";

export function ChoiceCard({
  active, onClick, label, description, kbd,
}: {
  active: boolean; onClick: () => void; label: string; description?: string; kbd?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`${cardBase} ${active ? cardSelected : cardIdle} text-left ${kbd ? "pb-7" : ""}`}
    >
      {/* Reserve right padding so the check badge never overlaps the title */}
      <div className="pr-8">
        <p className="text-sm font-semibold text-zinc-900">{label}</p>
        {description && <p className="mt-1 text-xs leading-relaxed text-zinc-500">{description}</p>}
      </div>

      {/* Check badge — top-right corner only */}
      <span
        className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full transition ${
          active ? "bg-accent text-white" : "border border-white/15 text-transparent"
        }`}
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M2.5 6.5l2.5 2.5L9.5 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      {/* Index pill — bottom-right corner, far from the check badge */}
      {kbd && (
        <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-widest text-zinc-600">
          {kbd}
        </span>
      )}
    </button>
  );
}