"use client";

import { track as vercelTrack } from "@vercel/analytics";
import type { Audience } from "@/i18n/audience";
import type { Locale } from "@/i18n/config";
import { getMarketingContext } from "@/lib/marketing/context";
import { hasGtm } from "@/lib/marketing/config";
import { MarketingEvents, type MarketingEventName } from "@/lib/marketing/events";
import type { AttributionData } from "@/lib/marketing/attribution";
import { getAttributionForLead } from "@/lib/marketing/attribution";

export type TrackPayload = Record<string, string | number | boolean | undefined>;

const standardEvents = [
  "Lead",
  "Contact",
  "ViewContent",
  "PageView",
  "InitiateCheckout",
  "Schedule",
  "CompleteRegistration",
];

/** Pro plan allows 2 custom properties per event. */
const VERCEL_DATA_PRIORITY = [
  "cta_location",
  "audience",
  "locale",
  "form_step",
  "form_step_name",
  "utm_source",
  "utm_campaign",
  "funnel_stage",
  "form_name",
  "error_message",
] as const;

function cleanPayload(payload?: TrackPayload): TrackPayload | undefined {
  if (!payload) return undefined;
  const data = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== ""),
  ) as TrackPayload;
  return Object.keys(data).length > 0 ? data : undefined;
}

function withContext(payload?: TrackPayload): TrackPayload | undefined {
  const { locale, audience } = getMarketingContext();
  return cleanPayload({
    locale,
    audience,
    ...payload,
  });
}

function withAttribution(payload?: TrackPayload): TrackPayload | undefined {
  const attribution = getAttributionForLead();
  const data = withContext(payload);
  if (!attribution || Object.keys(attribution).length === 0) return data;
  return cleanPayload({ ...data, ...attribution });
}

function toVercelData(payload?: TrackPayload): Record<string, string | number | boolean> | undefined {
  const data = cleanPayload(payload);
  if (!data) return undefined;

  const picked: Record<string, string | number | boolean> = {};
  for (const key of VERCEL_DATA_PRIORITY) {
    const value = data[key];
    if (value === undefined || value === "") continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      picked[key] = key === "error_message" && typeof value === "string" ? value.slice(0, 255) : value;
    }
    if (Object.keys(picked).length >= 2) break;
  }

  return Object.keys(picked).length > 0 ? picked : undefined;
}

function vercelEvent(name: string, payload?: TrackPayload) {
  try {
    const data = toVercelData(withAttribution(payload));
    if (data) vercelTrack(name, data);
    else vercelTrack(name);
  } catch {
    // Analytics must never break UX.
  }
}

function metaEvent(name: string, params?: TrackPayload) {
  if (typeof window.fbq !== "function") return;
  const data = withAttribution(params);
  if (standardEvents.includes(name)) {
    window.fbq("track", name, data);
  } else {
    window.fbq("trackCustom", name, data);
  }
}

function gtmEvent(event: string, payload?: TrackPayload) {
  if (typeof window === "undefined" || !hasGtm()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event,
    ...withAttribution(payload),
  });
}

/** Meta Pixel + GTM dataLayer + Vercel Web Analytics custom events. */
export function trackEvent(event: MarketingEventName | string, payload?: TrackPayload) {
  vercelEvent(event, payload);
  gtmEvent(event, payload);

  switch (event) {
    case MarketingEvents.lead:
      metaEvent(MarketingEvents.lead, { currency: "SAR", ...payload });
      break;
    case MarketingEvents.contact:
      metaEvent(MarketingEvents.contact, payload);
      break;
    case MarketingEvents.ctaClick:
      metaEvent(MarketingEvents.ctaClick, {
        content_name: "contact_brief",
        content_category: "lead_funnel",
        currency: "SAR",
        ...payload,
      });
      break;
    case MarketingEvents.formStart:
      metaEvent(MarketingEvents.formStart, {
        content_name: "contact_form",
        content_category: "lead_funnel",
        ...payload,
      });
      break;
    default:
      metaEvent(event, payload);
  }
}

export function trackPageView(path: string, context?: { locale?: Locale; audience?: Audience }) {
  const payload = {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
    locale: context?.locale,
    audience: context?.audience,
  };

  vercelEvent(MarketingEvents.pageView, payload);
  gtmEvent(MarketingEvents.pageView, payload);
  metaEvent("PageView", payload);
}

export function trackLead(payload?: TrackPayload) {
  trackEvent(MarketingEvents.lead, payload);
}

export function trackContact(payload?: TrackPayload) {
  trackEvent(MarketingEvents.contact, payload);
}

export function trackCtaClick(location: string, label?: string) {
  trackEvent(MarketingEvents.ctaClick, {
    cta_location: location,
    cta_label: label,
    funnel_stage: "cta_to_contact",
  });
}

export function trackFormStart(payload?: TrackPayload) {
  trackEvent(MarketingEvents.formStart, {
    form_name: "contact_brief",
    funnel_stage: "form_start",
    ...payload,
  });
}

export function trackFormStep(step: number, totalSteps: number, stepName?: string) {
  trackEvent(MarketingEvents.formStep, {
    form_name: "contact_brief",
    form_step: step,
    form_total_steps: totalSteps,
    form_step_name: stepName,
    funnel_stage: "form_progress",
  });
}

export function trackFormSubmitAttempt(payload?: TrackPayload) {
  trackEvent(MarketingEvents.formSubmitAttempt, {
    form_name: "contact_brief",
    funnel_stage: "submit_attempt",
    ...payload,
  });
}

export function trackFormSubmitError(message?: string) {
  trackEvent(MarketingEvents.formSubmitError, {
    form_name: "contact_brief",
    funnel_stage: "submit_error",
    error_message: message,
  });
}

export function trackSchedule(payload?: TrackPayload) {
  vercelEvent(MarketingEvents.schedule, {
    content_name: "contact_meeting",
    content_category: "lead_funnel",
    ...payload,
  });
  gtmEvent(MarketingEvents.schedule, {
    content_name: "contact_meeting",
    content_category: "lead_funnel",
    ...payload,
  });
  metaEvent("Schedule", {
    content_name: "contact_meeting",
    content_category: "lead_funnel",
    ...payload,
  });
}

export function attributionPayload(): AttributionData | undefined {
  return getAttributionForLead();
}
