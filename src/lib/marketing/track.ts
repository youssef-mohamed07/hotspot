"use client";

import type { Audience } from "@/i18n/audience";
import type { Locale } from "@/i18n/config";
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

function cleanPayload(payload?: TrackPayload): TrackPayload | undefined {
  if (!payload) return undefined;
  const data = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== ""),
  ) as TrackPayload;
  return Object.keys(data).length > 0 ? data : undefined;
}

function withAttribution(payload?: TrackPayload): TrackPayload | undefined {
  const attribution = getAttributionForLead();
  const data = cleanPayload(payload);
  if (!attribution || Object.keys(attribution).length === 0) return data;
  return cleanPayload({ ...data, ...attribution });
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

/** Meta Pixel events only. */
export function trackEvent(event: MarketingEventName | string, payload?: TrackPayload) {
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
  metaEvent("PageView", {
    page_path: path,
    page_location: typeof window !== "undefined" ? window.location.href : path,
    locale: context?.locale,
    audience: context?.audience,
  });
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
  metaEvent("Schedule", {
    content_name: "contact_meeting",
    content_category: "lead_funnel",
    ...payload,
  });
}

export function attributionPayload(): AttributionData | undefined {
  return getAttributionForLead();
}
