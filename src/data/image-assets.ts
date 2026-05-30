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

function asset(
  path: string,
  width: number,
  height: number,
  label: string,
): ImageAsset {
  return { path, width, height, label };
}

export const imageAssets = {
  heroCar: asset(
    "/placeholders/hero-car-1400x700.png",
    1400,
    700,
    "Hero — Cyber Stage (transparent PNG on dark hero)",
  ),
  ogShare: asset(
    "/placeholders/og-share-1200x630.png",
    1200,
    630,
    "Open Graph / social share",
  ),
  beforeAfter: {
    before: asset("/1600.png", 1600, 1000, "Before/After slider — Before"),
    after: asset("/1600%20%202.png", 1600, 1000, "Before/After slider — After"),
  },
  caseStudies: [
    asset("/1600%20%202.png", 1600, 1000, "Case study — Kora Break"),
    asset("/1400.png", 1400, 700, "Case study — Tawuniya (التعاونية)"),
  ],
  conceptPillars: [
    asset(
      "/placeholders/concept-pillar-01-location-800x1000.png",
      800,
      1000,
      "Concept pillar 01 — Location",
    ),
    asset(
      "/assets/wrap.png",
      800,
      1000,
      "Concept pillar 02 — Brand wrapping process",
    ),
  ],
  experiential: asset(
    "/assets/event.png",
    800,
    1000,
    "Experiential marketing — Brand activation event",
  ),
  services: {
    cybertruck: asset(
      "/assets/services/cybertruck.png",
      1200,
      880,
      "Service — Cyber Stage / Cyber Stage",
    ),
    led: asset(
      "/assets/services/ledscreens.png",
      1200,
      880,
      "Service — LED screens",
    ),
    stage: asset(
      "/assets/services/stqgeandtruss.png",
      1200,
      880,
      "Service — Stage & truss",
    ),
    sound: asset("/assets/services/sound.png", 1200, 880, "Service — Sound"),
    lighting: asset(
      "/assets/services/lighting.png",
      1200,
      880,
      "Service — Lighting",
    ),
    production: asset(
      "/assets/services/fulleventprod.png",
      1200,
      880,
      "Service — Full production",
    ),
  },
  clientLogos: {
    mobily: asset("/logos/new/mobily.jpg", 280, 96, "Client logo — Mobily"),
    stc: asset("/logos/new/stc.jpg", 280, 96, "Client logo — STC"),
    neom: asset("/logos/neom.svg", 280, 96, "Client logo — NEOM"),
    aramco: asset(
      "/placeholders/client-logo-aramco-280x96.png",
      280,
      96,
      "Client logo — Aramco",
    ),
    sabic: asset("/logos/sabic.svg", 280, 96, "Client logo — SABIC"),
    "riyadh-season": asset(
      "/logos/new/riyadhseason.jpg",
      280,
      96,
      "Client logo — Riyadh Season",
    ),
    hikma: asset("/logos/new/hikma.jpg", 280, 96, "Client logo — Hikma"),
    alhilal: asset("/logos/new/alhilal.jpg", 280, 96, "Client logo — Alhilal"),
    altawnya: asset(
      "/logos/new/altawnya.jpg",
      280,
      96,
      "Client logo — Altawnya",
    ),
    korabreak: asset(
      "/logos/new/korabreak.jpg",
      280,
      96,
      "Client logo — Kora Break",
    ),
    riyadbank: asset(
      "/logos/new/riyadbank.jpg",
      280,
      96,
      "Client logo — Riyadh Bank",
    ),
    sabinvest: asset(
      "/logos/new/sabinvest.jpg",
      280,
      96,
      "Client logo — SAB Invest",
    ),
    sabk: asset("/logos/new/sabk.jpg", 280, 96, "Client logo — SAB"),
    snb: asset("/logos/new/snb.jpg", 280, 96, "Client logo — SNB"),
  },
} as const;

export type ServiceImageId = keyof typeof imageAssets.services;

export function getServiceImage(id: string): ImageAsset {
  const key = id as ServiceImageId;
  return imageAssets.services[key] ?? imageAssets.services.production;
}

export function getClientLogoImage(logoPath: string): ImageAsset | null {
  const match = logoPath.match(/\/([^/]+)\.(svg|png|jpg|jpeg)$/);
  if (!match) return null;
  const slug = match[1];
  const logos = imageAssets.clientLogos as Record<string, ImageAsset>;
  return logos[slug] ?? null;
}

/** All assets for placeholder generation script */
export function allImageAssets(): ImageAsset[] {
  const {
    services,
    clientLogos,
    caseStudies,
    conceptPillars,
    beforeAfter,
    ...rest
  } = imageAssets;
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
