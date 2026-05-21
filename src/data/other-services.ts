import { IconBolt, IconScreen, IconSpotlight, IconStar } from "@/components/icons";

export const otherServices = [
  {
    title: "LED Screens & Walls",
    description:
      "Modular LED panels for any size or shape — pair with the truck for full-coverage activations.",
    Icon: IconScreen,
  },
  {
    title: "Stage Production",
    description:
      "Full event staging, lighting, sound and AV crews to extend the activation into a complete production.",
    Icon: IconSpotlight,
  },
  {
    title: "Interactive Tech",
    description:
      "Custom apps, AI photo booths, social walls and live audience engagement layers.",
    Icon: IconBolt,
  },
  {
    title: "Brand Activations",
    description:
      "End-to-end campaign design, content production and on-site execution across the Kingdom.",
    Icon: IconStar,
  },
] as const;
