import { IconCube, IconMapPin } from "@/components/icons";
import type { ConceptPillarData } from "@/types/concept-pillar";

export const conceptPillars: ConceptPillarData[] = [
  {
    title: "Location-Based",
    subtitle: "Built around your audience",
    description:
      "We position the Cyber Stage where your audience already lives — malls, events, neighborhoods, business districts. The location is part of the message.",
    Icon: IconMapPin,
    image: "",
    bullets: [
      "Foot-traffic mapping in advance",
      "Permits, parking & power handled",
      "Indoor mall + open street ready",
    ],
    metric: { value: "98%", label: "On-target placement" },
  },
  {
    title: "Built for Your Brand",
    subtitle: "Designed around your brand",
    description:
      "Full vehicle wraps, custom LED content, interactive overlays, and modular accessories. The truck becomes a 100% extension of your brand identity.",
    Icon: IconCube,
    image: "",
    bullets: [
      "Full-body custom vehicle wrap",
      "Branded LED content & motion graphics",
      "Modular props, lighting & accessories",
    ],
    metric: { value: "100%", label: "Brand control" },
  },
];
