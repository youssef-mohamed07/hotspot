import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    quote:
      "We needed to be in Riyadh and Jeddah in the same week. Hotspot made it happen — fully branded, on time, with a report in our inbox before we even debriefed internally. That's the level of execution we needed.",
    author: "Ahmed K.",
    role: "Head of Marketing",
    company: "FMCG Brand",
    initials: "A",
    rating: 5,
    metric: { value: "2", label: "Cities in one week" },
    accent: "from-[#2a76a6] to-[#04285f]",
  },
  {
    quote:
      "People stopped their cars. They got out and took photos. That's not something you can buy with an ad budget. The Cyber Stage is genuinely something people have never seen before in Saudi Arabia.",
    author: "Sara M.",
    role: "Brand Manager",
    company: "Retail Group",
    initials: "S",
    rating: 5,
    metric: { value: "10x", label: "Organic engagement" },
    accent: "from-[#5ba3d4] to-[#2a76a6]",
  },
  {
    quote:
      "The Cybertruck activation generated more social impressions in one weekend than our entire Q3 digital campaign. Outstanding tech and execution.",
    author: "Khalid R.",
    role: "VP Marketing",
    company: "Tech Company",
    initials: "K",
    rating: 5,
    metric: { value: "3.2M", label: "Social impressions" },
    accent: "from-[#1d5a82] to-[#04285f]",
  },
];
