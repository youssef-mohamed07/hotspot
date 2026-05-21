export const faqCategories = [
  "All",
  "Customization",
  "Operations",
  "Technology",
  "Logistics",
] as const;

export type FaqCategory = (typeof faqCategories)[number];

export interface FaqItem {
  q: string;
  a: string;
  category: Exclude<FaqCategory, "All">;
}
