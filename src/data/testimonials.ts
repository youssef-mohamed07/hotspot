import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    quote:
      "The Cybertruck activation generated more social impressions in one weekend than our entire Q3 digital campaign.",
    author: "Sara Al-Dosari",
    role: "Marketing Director",
    company: "IA Group",
    initials: "SA",
    rating: 5,
    metric: { value: "3.2M", label: "Social impressions" },
    accent: "from-[#2a76a6] to-[#04285f]",
  },
  {
    quote:
      "From brief to delivery, HotSpot ran the entire production. Zero coordination headaches on our side.",
    author: "Mohammed Al-Rashid",
    role: "VP Events",
    company: "Hikma Group",
    initials: "MA",
    rating: 5,
    metric: { value: "0", label: "Vendor escalations" },
    accent: "from-[#5ba3d4] to-[#2a76a6]",
  },
  {
    quote:
      "Crowds gathered before the truck even parked. The visual presence is on another level.",
    author: "Khalid Mansour",
    role: "Head of Production",
    company: "Mobily",
    initials: "KM",
    rating: 5,
    metric: { value: "12K", label: "Visitors / day" },
    accent: "from-[#1d5a82] to-[#04285f]",
  },
];
