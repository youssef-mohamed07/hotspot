"use client";

export function StepHeader({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h3>
      {hint && <p className="mt-2 text-sm text-zinc-500">{hint}</p>}
    </div>
  );
}