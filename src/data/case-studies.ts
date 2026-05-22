export type CaseStudyHighlight = {
  title: string;
  description: string;
};

export type CaseStudy = {
  title: string;
  category: string;
  location: string;
  intro: string;
  highlights: CaseStudyHighlight[];
  image: string;
};

export const caseStudies: CaseStudy[] = [
  {
    title: "Kora Break",
    category: "Sports Media",
    location: "Riyadh",
    intro: "Sports media brand. Riyadh. The truck was the entrance.",
    highlights: [
      {
        title: "Instant Crowd",
        description: "Lines formed before doors opened",
      },
      {
        title: "Organic Content",
        description: "Guests filmed it before the event started",
      },
      {
        title: "Zero Paid Reach",
        description: "The activation marketed itself",
      },
    ],
    image: "https://images.unsplash.com/photo-1522778119026-d647f9f68212?w=1200&q=80",
  },
  {
    title: "Tawineya",
    category: "Community Brand",
    location: "Saudi Arabia",
    intro:
      "Saudi community brand. The venue didn't need decoration — it needed a statement.",
    highlights: [
      {
        title: "Venue Takeover",
        description: "Entrance became the first brand moment",
      },
      {
        title: "Built-In Photo Moment",
        description: "Every guest left with a picture next to the truck",
      },
      {
        title: "Set The Energy",
        description: "Crowd was hyped before stepping inside",
      },
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
];
