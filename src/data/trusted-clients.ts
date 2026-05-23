import { imageAssets } from "@/data/image-assets";
import type { TrustedClient } from "@/types/client";

export const trustedClients: TrustedClient[] = [
  { name: "Mobily", sector: "Telecom", since: "2022", logo: imageAssets.clientLogos.mobily.path },
  { name: "STC", sector: "Telecom", since: "2023", logo: imageAssets.clientLogos.stc.path },
  { name: "NEOM", sector: "Real Estate", since: "2023", logo: imageAssets.clientLogos.neom.path },
  { name: "Aramco", sector: "Energy", since: "2024", logo: imageAssets.clientLogos.aramco.path },
  { name: "SABIC", sector: "Industrial", since: "2024", logo: imageAssets.clientLogos.sabic.path },
  {
    name: "Riyadh Season",
    sector: "Entertainment",
    since: "2023",
    logo: imageAssets.clientLogos["riyadh-season"].path,
  },
  { name: "Hikma", sector: "Healthcare", since: "2024", logo: imageAssets.clientLogos.hikma.path },
];
