type ImagePlaceholderProps = {
  width: number;
  height: number;
  label: string;
  className?: string;
  fill?: boolean;
};

export function ImagePlaceholder({
  width,
  height,
  label,
  className = "",
  fill = false,
}: ImagePlaceholderProps) {
  const sizeLabel = `${width}×${height}`;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-3xl border border-zinc-200/90 bg-[#f0f1f3] shadow-[0_12px_40px_rgba(0,0,0,0.06)] ${
        fill ? `absolute inset-0 ${className}` : `relative w-full ${className}`
      }`}
    >
      <span
        className="absolute left-5 top-5 h-2.5 w-2.5 rounded-full bg-accent/45"
        aria-hidden
      />
      <span
        className="absolute bottom-5 right-5 h-3.5 w-3.5 rounded-full bg-accent/30"
        aria-hidden
      />

      <p className="relative z-10 max-w-[85%] px-6 text-center text-sm font-medium leading-snug text-zinc-500">
        <span className="mb-1 block text-base font-semibold tracking-tight text-zinc-600">
          {sizeLabel}
        </span>
        {label}
      </p>
    </div>
  );
}

/** Only the Cybertruck / car hero asset stays as a real photo */
export function isCarImage(src: string) {
  return src.includes("/hero/car-hero");
}
