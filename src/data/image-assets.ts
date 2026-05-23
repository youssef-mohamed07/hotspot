/**
 * Image slots for designer handoff. Replace files in `public/placeholders/` — keep filename & dimensions.
 * See docs/IMAGE_ASSETS.md
 */

export type ImageAsset = {
  path: string;
  width: number;
  height: number;
  label: string;
};

function asset(path: string, width: number, height: number, label: string): ImageAsset {
  return { path, width, height, label };
}

export const imageAssets = {
  heroCar: asset(
    "/placeholders/hero-car-1400x700.png",
    1400,
    700,
    "Hero — Cybertruck (transparent PNG on dark hero)",
  ),
  ogShare: asset("/placeholders/og-share-1200x630.png", 1200, 630, "Open Graph / social share"),
  beforeAfter: {
    before: asset(
      "/placeholders/before-after-before-1600x1000.png",
      1600,
      1000,
      "Before/After slider — Before (stock / unbranded)",
    ),
    after: asset(
      "/placeholders/before-after-after-1600x1000.png",
      1600,
      1000,
      "Before/After slider — After (branded activation)",
    ),
  },
  caseStudies: [
    asset(
      "/placeholders/case-study-01-kora-break-1200x960.png",
      1200,
      960,
      "Case study — Kora Break",
    ),
    asset(
      "/placeholders/case-study-02-tawineya-1200x960.png",
      1200,
      960,
      "Case study — Tawineya",
    ),
  ],
  conceptPillars: [
    asset(
      "/placeholders/concept-pillar-01-location-800x1000.png",
      800,
      1000,
      "Concept pillar 01 — Location",
    ),
    asset(
      "/placeholders/concept-pillar-02-branding-800x1000.png",
      800,
      1000,
      "Concept pillar 02 — Branding",
    ),
  ],
  experiential: asset(
    "/placeholders/experiential-cinematic-800x1000.png",
    800,
    1000,
    "Experiential marketing — cinematic visual",
  ),
  services: {
    cybertruck: asset(
      "/placeholders/service-cybertruck-1200x880.png",
      1200,
      880,
      "Service — Cybertruck / Cyber Stage",
    ),
    led: asset("/placeholders/service-led-1200x880.png", 1200, 880, "Service — LED screens"),
    stage: asset("/placeholders/service-stage-1200x880.png", 1200, 880, "Service — Stage & truss"),
    sound: asset("/placeholders/service-sound-1200x880.png", 1200, 880, "Service — Sound"),
    lighting: asset(
      "/placeholders/service-lighting-1200x880.png",
      1200,
      880,
      "Service — Lighting",
    ),
    production: asset(
      "/placeholders/service-production-1200x880.png",
      1200,
      880,
      "Service — Full production",
    ),
  },
  clientLogos: {
    mobily: asset("/placeholders/client-logo-mobily-280x96.png", 280, 96, "Client logo — Mobily"),
    stc: asset("/placeholders/client-logo-stc-280x96.png", 280, 96, "Client logo — STC"),
    neom: asset("/placeholders/client-logo-neom-280x96.png", 280, 96, "Client logo — NEOM"),
    aramco: asset("/placeholders/client-logo-aramco-280x96.png", 280, 96, "Client logo — Aramco"),
    sabic: asset("/placeholders/client-logo-sabic-280x96.png", 280, 96, "Client logo — SABIC"),
    "riyadh-season": asset(
      "/placeholders/client-logo-riyadh-season-280x96.png",
      280,
      96,
      "Client logo — Riyadh Season",
    ),
    hikma: asset("/placeholders/client-logo-hikma-280x96.png", 280, 96, "Client logo — Hikma"),
  },
} as const;

export type ServiceImageId = keyof typeof imageAssets.services;

export function getServiceImage(id: string): ImageAsset {
  const key = id as ServiceImageId;
  return imageAssets.services[key] ?? imageAssets.services.production;
}

export function getClientLogoImage(logoPath: string): ImageAsset | null {
  const match = logoPath.match(/\/([^/]+)\.(svg|png)$/);
  if (!match) return null;
  const slug = match[1];
  const logos = imageAssets.clientLogos as Record<string, ImageAsset>;
  return logos[slug] ?? null;
}

/** All assets for placeholder generation script */
export function allImageAssets(): ImageAsset[] {
  const { services, clientLogos, caseStudies, conceptPillars, beforeAfter, ...rest } =
    imageAssets;
  return [
    rest.heroCar,
    rest.ogShare,
    rest.experiential,
    beforeAfter.before,
    beforeAfter.after,
    ...caseStudies,
    ...conceptPillars,
    ...Object.values(services),
    ...Object.values(clientLogos),
  ];
}
