export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  rating: number;
  metric: { value: string; label: string };
  accent: string;
}
