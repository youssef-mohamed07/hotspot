import {
  IconScreen,
  IconSpotlight,
  IconTruck,
  IconTruss,
  IconUsers,
  IconWave,
} from "@/components/icons";
import type { Dictionary } from "@/i18n/get-dictionary";
import { serviceLinks, type ServiceItem } from "@/data/other-services";
import { getServiceImage } from "@/data/image-assets";

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
    image: getServiceImage("cybertruck").path,
    href: serviceLinks[flagship.id] ?? serviceLinks.cybertruck,
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
      image: getServiceImage(item.id).path,
      href: serviceLinks[item.id] ?? serviceLinks.production,
      Icon: serviceIcons[item.id as keyof typeof serviceIcons] ?? IconUsers,
    })),
  ];
}
