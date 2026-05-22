import { IconScreen, IconTruss, IconWave, IconSpotlight, IconUsers, IconTruck } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  summary: string;
  highlights: readonly string[];
  tag: string;
  image: string;
  badge?: string;
  featured?: boolean;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const flagshipService: ServiceItem = {
  id: "cybertruck",
  title: "Cybertruck",
  description: "Immersive Mobile Stage",
  summary:
    "A fully branded, AV-equipped mobile rig that deploys at your venue — custom wrap, on-board LED, spatial audio, and a crew that runs every on-ground moment.",
  highlights: ["Custom brand wrap", "On-board LED screens", "Road-ready crew", "KSA-wide deployment"],
  tag: "Flagship",
  image: "/hero/car-hero.png",
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
    highlights: ["Indoor & outdoor rigs", "Any aspect ratio", "Content playback", "On-site tech crew"],
    tag: "Visual",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    Icon: IconScreen,
  },
  {
    id: "stage",
    title: "Stage & Truss Systems",
    description: "Corporate Events · Concerts · Launches",
    summary:
      "Engineered stage platforms and truss for corporate keynotes, concert builds, and product launches — safe, fast to deploy, and brand-ready.",
    highlights: ["Corporate & concert builds", "Certified rigging", "Custom sizing", "Launch-ready staging"],
    tag: "Structure",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
    Icon: IconTruss,
  },
  {
    id: "sound",
    title: "Professional Sound System",
    description: "Line Array · Immersive Audio",
    summary:
      "Line-array systems tuned for clarity at scale — from VIP lounges to open-air activations with full spatial coverage.",
    highlights: ["Line array systems", "Zone mixing", "Live & playback", "Outdoor-rated"],
    tag: "Audio",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
    Icon: IconWave,
  },
  {
    id: "lighting",
    title: "Lighting Design",
    description: "Architectural · Stage · Outdoor",
    summary:
      "Architectural washes, stage looks, and outdoor scenes — designed to match your brand palette and photographed beautifully.",
    highlights: ["Architectural washes", "Stage looks", "Outdoor scenes", "DMX programming"],
    tag: "Lighting",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    Icon: IconSpotlight,
  },
  {
    id: "production",
    title: "Full Event Production",
    description: "End-to-End · Single Point of Contact",
    summary:
      "One team owns the full stack — scope, vendors, permits, build, show-call, and strike. You get a single point of contact, zero hand-offs.",
    highlights: ["Single point of contact", "Permits & logistics", "Vendor management", "Show-day operations"],
    tag: "Production",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    Icon: IconUsers,
  },
];

export const allServices: ServiceItem[] = [flagshipService, ...otherServices];
