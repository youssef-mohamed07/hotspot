import { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

// ==========================================
// CENTRAL DESIGN SYSTEM FOR SECTION HEADERS
// ==========================================

export interface SectionHeaderProps {
  /**
   * "normal": Large standard section header with Accent overtitle line and display headline.
   * "transition": Minimal, centered, tracking-widest text to separate sections smoothly.
   */
  variant: "normal" | "transition";

  // Used by both variants
  title: string;

  // Used only by "normal" variant
  headline?: ReactNode;
  subtitle?: ReactNode;
  align?: "start" | "center";
  theme?: "light" | "dark"; // "dark" = dark background (white text), "light" = light background (dark text)
}

export function SectionHeader({
  variant,
  title,
  headline,
  subtitle,
  align = "start",
  theme = "dark",
}: SectionHeaderProps) {
  // -------------------------
  // TRANSITION SECTION HEADER
  // -------------------------
  if (variant === "transition") {
    const isDark = theme === "dark";
    const lineColor = isDark ? "to-white/10" : "to-zinc-300";
    const textColor = isDark ? "text-zinc-400" : "text-zinc-500";

    return (
      <div className="mx-auto mb-10 flex w-full max-w-4xl items-center justify-center gap-4 px-6 text-center sm:mb-12">
        {/* Left fading line with a tech dot */}
        <div className="flex flex-1 items-center gap-3">
          <div
            className={`h-px w-full bg-linear-to-r from-transparent ${lineColor}`}
          />
          <div className="hidden h-1 w-1 shrink-0 rounded-full bg-accent/40 sm:block" />
        </div>

        {/* Interesting Title Badge */}
        <div className="group relative flex items-center gap-3">
          {/* Tech bracket left */}
          <span className="font-mono text-[10px] text-accent/50 transition-colors group-hover:text-accent sm:text-[12px]">
            {"//"}
          </span>

          <p
            className={`text-[9px] font-bold uppercase tracking-[0.35em] sm:text-[11px] ${textColor}`}
          >
            {title}
          </p>

          {/* Tech bracket right */}
          <span className="font-mono text-[10px] text-accent/50 transition-colors group-hover:text-accent sm:text-[12px]">
            {"//"}
          </span>
        </div>

        {/* Right fading line with a tech dot */}
        <div className="flex flex-1 items-center gap-3">
          <div className="hidden h-1 w-1 shrink-0 rounded-full bg-accent/40 sm:block" />
          <div
            className={`h-px w-full bg-linear-to-l from-transparent ${lineColor}`}
          />
        </div>
      </div>
    );
  }

  // -------------------------
  // NORMAL SECTION HEADER
  // -------------------------
  const isCenter = align === "center";
  const isDark = theme === "dark"; // dark background

  return (
    <Reveal
      className={`mb-16 max-w-4xl text-start ${isCenter ? "mx-auto text-center" : ""}`}
    >
      <div
        className={`flex items-center gap-3 ${isCenter ? "justify-center" : ""}`}
      >
        {!isCenter && <span className="h-px w-12 bg-accent" />}
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          {title}
        </p>
        {isCenter && <span className="h-px w-12 bg-accent hidden md:block" />}
      </div>

      {headline && (
        <h2
          className={`display-headline mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${isDark ? "text-white" : "text-zinc-900"}`}
        >
          {headline}
        </h2>
      )}

      {subtitle && (
        <p
          className={`mt-6 text-lg ${isCenter ? "mx-auto" : ""} ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
