import { IconSparkle, IconVenue, IconCamera, IconWave } from "@/components/icons";
import type { ComponentType, SVGProps } from "react";

export type AudienceItem = {
  id: string;
  lead: string;
  payoff: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const audienceList: AudienceItem[] = [
  {
    id: "launch",
    lead: "You're launching something big...",
    payoff: "You need an entrance, not just an announcement.",
    icon: IconSparkle,
  },
  {
    id: "event",
    lead: "You have an event ahead...",
    payoff: "The first impression starts outside the door.",
    icon: IconVenue,
  },
  {
    id: "buzz",
    lead: "You want people talking before it starts...",
    payoff: "Cyber Stage is already filming before guests arrive.",
    icon: IconCamera,
  },
  {
    id: "street",
    lead: "You're ready to own the street...",
    payoff: "One truck. Every city. Unlimited presence.",
    icon: IconWave,
  },
];
