import {
  IconScreen,
  IconTruss,
  IconWave,
  IconSpotlight,
  IconUsers,
  IconTruck,
} from "@/components/icons";
import { getServiceImage } from "@/data/image-assets";
import type { ComponentType, SVGProps } from "react";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  summary: string;
  highlights: readonly string[];
  tag: string;
  image: string;
  href: string;
  badge?: string;
  featured?: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const serviceLinks: Record<string, string> = {
  cybertruck: "https://hotsspots.com/cyber-truck/corporate",
  "cyber-stage": "https://hotsspots.com/cyber-truck/corporate",
  "Cyber Stage": "https://hotsspots.com/cyber-truck/corporate",
  led: "https://hotsspots.com/experience/led-screens",
  sound: "https://hotsspots.com/experience/sound-systems",
  lighting: "https://hotsspots.com/experience/lighting",
  production: "https://hotsspots.com/experience/control-systems",
  stage: "https://hotsspots.com/experience/stage-trusses",
};

export const flagshipService: ServiceItem = {
  id: "cybertruck",
  title: "Cyber Stage",
  description: "Immersive Mobile Stage",
  summary:
    "A fully branded, AV-equipped mobile rig that deploys at your venue — custom wrap, on-board LED, spatial audio, and a crew that runs every on-ground moment.",
  highlights: [
    "Custom brand wrap",
    "On-board LED screens",
    "Road-ready crew",
    "KSA-wide deployment",
  ],
  tag: "Flagship",
  image: getServiceImage("cybertruck").path,
  href: serviceLinks.cybertruck,
  badge: "New",
  featured: true,
  Icon: IconTruck,
};

export const otherServices: ServiceItem[] = [
  {
    id: "led",
    title: "LED Screens & Displays",
    description: "Indoor & Outdoor · Any Scale",
    summary:
      "From intimate retail walls to stadium-scale outdoor walls — calibrated, content-ready, and operated by our AV team on activation day.",
    highlights: [
      "Indoor & outdoor rigs",
      "Any aspect ratio",
      "Content playback",
      "On-site tech crew",
    ],
    tag: "Visual",
    image: getServiceImage("led").path,
    href: serviceLinks.led,
    Icon: IconScreen,
  },
  {
    id: "sound",
    title: "Professional Sound System",
    description: "Line Array · Immersive Audio",
    summary:
      "Line-array systems tuned for clarity at scale — from VIP lounges to open-air activations with full spatial coverage.",
    highlights: [
      "Line array systems",
      "Zone mixing",
      "Live & playback",
      "Outdoor-rated",
    ],
    tag: "Audio",
    image: getServiceImage("sound").path,
    href: serviceLinks.sound,
    Icon: IconWave,
  },
  {
    id: "lighting",
    title: "Lighting Design",
    description: "Architectural · Stage · Outdoor",
    summary:
      "Architectural washes, stage looks, and outdoor scenes — designed to match your brand palette and photographed beautifully.",
    highlights: [
      "Architectural washes",
      "Stage looks",
      "Outdoor scenes",
      "DMX programming",
    ],
    tag: "Lighting",
    image: getServiceImage("lighting").path,
    href: serviceLinks.lighting,
    Icon: IconSpotlight,
  },
  {
    id: "stage",
    title: "Stage & Truss Systems",
    description: "Corporate Events · Concerts · Launches",
    summary:
      "Engineered stage platforms and truss for corporate keynotes, concert builds, and product launches — safe, fast to deploy, and brand-ready.",
    highlights: [
      "Corporate & concert builds",
      "Certified rigging",
      "Custom sizing",
      "Launch-ready staging",
    ],
    tag: "Structure",
    image: getServiceImage("stage").path,
    href: serviceLinks.stage,
    Icon: IconTruss,
  },
  {
    id: "production",
    title: "Full Event Production",
    description: "End-to-End · Single Point of Contact",
    summary:
      "One team owns the full stack — scope, vendors, permits, build, show-call, and strike. You get a single point of contact, zero hand-offs.",
    highlights: [
      "Single point of contact",
      "Permits & logistics",
      "Vendor management",
      "Show-day operations",
    ],
    tag: "Production",
    image: getServiceImage("production").path,
    href: serviceLinks.production,
    Icon: IconUsers,
  },
];

export const allServices: ServiceItem[] = [flagshipService, ...otherServices];
