/** Standard + custom event names used across pixels and dataLayer. */

export const MarketingEvents = {
  pageView: "Page_Viewed",
  lead: "Lead_Generated",
  contact: "Contact_Initiated",
  ctaClick: "CTA_Clicked",
  formStart: "Brief_Started",
  formStep: "Brief_Step_Completed",
  formSubmitAttempt: "Brief_Submit_Attempted",
  formSubmitError: "Brief_Submit_Failed",
  schedule: "Meeting_Scheduled",
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
  | "case_studies"
  | "before_after"
  | "testimonials"
  | "addons"
  | "target_audience"
  | "experiential"
  | "concept"
  | "whatsapp_float"
  | "other";
