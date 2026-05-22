/** Standard + custom event names used across pixels and dataLayer. */

export const MarketingEvents = {
  pageView: "page_view",
  lead: "generate_lead",
  contact: "contact",
  ctaClick: "cta_click",
  formStart: "form_start",
} as const;

export type MarketingEventName = (typeof MarketingEvents)[keyof typeof MarketingEvents];

export type CtaLocation =
  | "hero"
  | "header"
  | "footer"
  | "process"
  | "faq"
  | "services"
  | "cities"
  | "whatsapp_float"
  | "other";
