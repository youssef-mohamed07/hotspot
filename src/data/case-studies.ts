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
    title: "Koora Break",
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
    image: "",
  },
  {
    title: "Tawuniya",
    category: "Insurance",
    location: "Saudi Arabia",
    intro: "The venue didn't need decoration — it needed a statement.",
    highlights: [
      {
        title: "Venue Takeover",
        description: "Entrance became the first brand moment",
      },
      {
        title: "Built-In Photo Moment",
        description: "Every guest left with a picture next to Cyber Stage",
      },
      {
        title: "Set The Energy",
        description: "Crowd was hyped before stepping inside",
      },
    ],
    image: "",
  },
];
