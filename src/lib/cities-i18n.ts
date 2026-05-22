import { cities as cityCoords } from "@/data/cities";
import type { Dictionary } from "@/i18n/get-dictionary";
import type { City } from "@/types/city";

const coordsById: Record<string, (typeof cityCoords)[number]> = {
  riyadh: cityCoords[0],
  jeddah: cityCoords[1],
  khobar: cityCoords[2],
  mecca: cityCoords[3],
  medina: cityCoords[4],
};

export function getLocalizedCities(dict: Dictionary): City[] {
  return dict.cities.list.map((item) => {
    const base = coordsById[item.id];
    return {
      name: item.name,
      region: item.region,
      x: base.x,
      y: base.y,
      hub: base.hub,
    };
  });
}
