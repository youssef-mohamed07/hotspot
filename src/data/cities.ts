import type { City } from "@/types/city";

/** City positions on the 1000×824 viewBox of the KSA SVG (src/lib/ksa-map.ts) */
export const cities: City[] = [
  { name: "Riyadh", region: "Central", x: 530, y: 476, hub: true },
  { name: "Jeddah", region: "Western", x: 310, y: 540, hub: true },
  { name: "Mecca", region: "Western", x: 351, y: 555 },
  { name: "Medina", region: "Western", x: 245, y: 405 },
  { name: "AlUla", region: "Western", x: 215, y: 320 },
  { name: "NEOM", region: "North-West", x: 130, y: 180 },
  { name: "Dammam", region: "Eastern", x: 735, y: 425, hub: true },
  { name: "Khobar", region: "Eastern", x: 750, y: 440 },
];
