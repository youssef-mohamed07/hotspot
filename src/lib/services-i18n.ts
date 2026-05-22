import {
  IconScreen,
  IconSpotlight,
  IconTruck,
  IconTruss,
  IconUsers,
  IconWave,
} from "@/components/icons";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { ServiceItem } from "@/data/other-services";

const serviceIcons = {
  cybertruck: IconTruck,
  led: IconScreen,
  stage: IconTruss,
  sound: IconWave,
  lighting: IconSpotlight,
  production: IconUsers,
} as const;

export function getLocalizedServices(dict: Dictionary): ServiceItem[] {
  const { flagship, items } = dict.services;

  const flagshipItem: ServiceItem = {
    id: flagship.id,
    title: flagship.title,
    description: flagship.description,
    summary: flagship.summary,
    highlights: flagship.highlights,
    tag: flagship.tag,
    image: "/hero/car-hero.png",
    badge: flagship.badge,
    featured: true,
    Icon: serviceIcons.cybertruck,
  };

  return [
    flagshipItem,
    ...items.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      summary: item.summary,
      highlights: item.highlights,
      tag: item.tag,
      image:
        item.id === "led"
          ? "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80"
          : item.id === "stage"
            ? "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80"
            : item.id === "sound"
              ? "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80"
              : item.id === "lighting"
                ? "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80"
                : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      Icon: serviceIcons[item.id as keyof typeof serviceIcons] ?? IconUsers,
    })),
  ];
}
