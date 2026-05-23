"use client";

import { Reveal } from "@/components/reveal";
import { SiteImage } from "@/components/ui/site-image";
import { imageAssets } from "@/data/image-assets";
import { SectionHeader } from "@/components/section-header";
import { IconIntegration, IconVenue, IconSparkle } from "@/components/icons";
import { useDictionary } from "@/i18n/locale-provider";

const cardIcons = [IconIntegration, IconVenue, IconSparkle];

export function ExperientialMarketingSection() {
  const dict = useDictionary();
  const cards = dict.experiential.cards.map((card, i) => ({
    ...card,
    icon: cardIcons[i] ?? IconSparkle,
  }));

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden py-24 bg-background">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(42,118,166,0.12), transparent 50%), radial-gradient(circle at 90% 80%, rgba(4,40,95,0.08), transparent 50%)",
        }}
        aria-hidden
      />
      <div className="grid-floor pointer-events-none absolute inset-0 opacity-15" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <SectionHeader
              variant="normal"
              title={dict.experiential.title}
              theme="light"
              headline={
                <>
                  {dict.experiential.headline1}
                  <br />
                  {dict.experiential.headline2}{" "}
                  <span className="text-gradient-accent">{dict.experiential.headlineAccent}</span>
                </>
              }
              subtitle={dict.experiential.subtitle}
            />

            <div className="grid gap-5 mt-12 sm:grid-cols-1 max-w-xl">
              {cards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <Reveal key={card.title} delay={0.1 + i * 0.08}>
                    <div className="group relative flex items-start gap-5 rounded-[24px] border border-zinc-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all hover:border-accent/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-100 text-accent transition-colors group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-zinc-900">{card.title}</h3>
                        <p className="mt-1.5 text-sm text-zinc-500 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal delay={0.3} className="relative hidden lg:block h-full min-h-[600px]">
            <div className="absolute inset-0 overflow-hidden rounded-[48px] border border-zinc-200/50 shadow-[0_32px_80px_rgba(0,0,0,0.08)]">
              <SiteImage
                asset={imageAssets.experiential}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 50vw, 400px"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
