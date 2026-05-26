import { imageAssets } from "@/data/image-assets";
import type { TrustedClient } from "@/types/client";

export const trustedClients: TrustedClient[] = [
  { name: "Mobily", sector: "Telecom", since: "2022", logo: imageAssets.clientLogos.mobily.path },
  { name: "STC", sector: "Telecom", since: "2023", logo: imageAssets.clientLogos.stc.path },
  {
    name: "Riyadh Season",
    sector: "Entertainment",
    since: "2023",
    logo: imageAssets.clientLogos["riyadh-season"].path,
  },
  { name: "Hikma", sector: "Healthcare", since: "2024", logo: imageAssets.clientLogos.hikma.path },
  { name: "Al Hilal", sector: "Sports", since: "2024", logo: imageAssets.clientLogos.alhilal.path },
  {
    name: "Altawniya",
    sector: "Insurance",
    since: "2023",
    logo: imageAssets.clientLogos.altawnya.path,
  },
  {
    name: "Kora Break",
    sector: "Entertainment",
    since: "2024",
    logo: imageAssets.clientLogos.korabreak.path,
  },
  {
    name: "Riyadh Bank",
    sector: "Finance",
    since: "2023",
    logo: imageAssets.clientLogos.riyadbank.path,
  },
  {
    name: "SAB Invest",
    sector: "Finance",
    since: "2024",
    logo: imageAssets.clientLogos.sabinvest.path,
  },
  { name: "SAB", sector: "Finance", since: "2023", logo: imageAssets.clientLogos.sabk.path },
  { name: "SNB", sector: "Finance", since: "2023", logo: imageAssets.clientLogos.snb.path },
];
