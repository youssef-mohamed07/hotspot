export type CampaignType = "mall" | "event" | "national" | "vip" | "other";
export type Goal = "awareness" | "launch" | "footfall" | "sales" | "vip" | "social";
export type Service = "led" | "stage" | "sound" | "interactive" | "photo" | "wraps";
export type Timeline = "asap" | "1month" | "3months" | "exploring";
export type Budget = "under50" | "50to150" | "150to500" | "500plus" | "tbd";

export interface BriefData {
  campaignType: CampaignType | null;
  goals: Goal[];
  services: Service[];
  city: string;
  duration: number;
  audience: number;
  timeline: Timeline | null;
  budget: Budget | null;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
}

export const initialBrief: BriefData = {
  campaignType: null,
  goals: [],
  services: [],
  city: "Riyadh",
  duration: 3,
  audience: 5000,
  timeline: null,
  budget: null,
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};
