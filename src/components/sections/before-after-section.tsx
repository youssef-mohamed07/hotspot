"use client";

import { Reveal } from "@/components/reveal";
import { BeforeAfterSlider } from "@/components/before-after/before-after-slider";
import { imageAssets } from "@/data/image-assets";
import { useAudience, useDictionary } from "@/i18n/locale-provider";

const B2C_AFTER_SRC = "/16002.png";

export function BeforeAfterSection() {
  const dict = useDictionary();
  const audience = useAudience();
  const afterSrc =
    audience === "b2c" ? B2C_AFTER_SRC : imageAssets.beforeAfter.after.path;

  return (
    <section
      id="before-after"
      className="relative overflow-hidden bg-[#fafafa] py-24 md:py-32"
    >
      <div
        className="grid-floor pointer-events-none absolute inset-0 opacity-25 mix-blend-multiply"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <Reveal className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-accent" />
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              {dict.beforeAfter.eyebrow}
            </p>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="display-headline text-4xl text-zinc-900 sm:text-5xl md:text-6xl">
            {dict.beforeAfter.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600">
            {dict.beforeAfter.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <BeforeAfterSlider
            beforeSrc={imageAssets.beforeAfter.before.path}
            afterSrc={afterSrc}
            beforeAlt={dict.beforeAfter.beforeAlt}
            afterAlt={dict.beforeAfter.afterAlt}
          />
        </Reveal>
      </div>
    </section>
  );
}
