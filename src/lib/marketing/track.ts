"use client";

import type { Audience } from "@/i18n/audience";
import type { Locale } from "@/i18n/config";
import type { MarketingEventName } from "@/lib/marketing/events";
import type { AttributionData } from "@/lib/marketing/attribution";
import { getAttributionForLead } from "@/lib/marketing/attribution";

export type TrackPayload = Record<string, string | number | boolean | undefined>;

function withAttribution(payload?: TrackPayload): TrackPayload | undefined {
  const attribution = getAttributionForLead();
  if (!attribution || Object.keys(attribution).length === 0) return payload;
  return { ...payload, ...attribution };
}

function metaEvent(name: string, params?: TrackPayload) {
  if (typeof window.fbq !== "function") return;
  const standard = ["Lead", "Contact", "ViewContent", "PageView", "InitiateCheckout"];
  const data = withAttribution(params);
  if (standard.includes(name)) {
    window.fbq("track", name, data);
  } else {
    window.fbq("trackCustom", name, data);
  }
}

/** Meta Pixel events only. */
export function trackEvent(event: MarketingEventName | string, payload?: TrackPayload) {
  switch (event) {
    case "generate_lead":
      metaEvent("Lead", { currency: "SAR", ...payload });
      break;
    case "contact":
      metaEvent("Contact", payload);
      break;
    case "cta_click":
      metaEvent("InitiateCheckout", payload);
      break;
    case "form_start":
      metaEvent("ViewContent", { content_name: "contact_form", ...payload });
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
  trackEvent("generate_lead", payload);
}

export function trackContact(payload?: TrackPayload) {
  trackEvent("contact", payload);
}

export function trackCtaClick(location: string, label?: string) {
  trackEvent("cta_click", { cta_location: location, cta_label: label });
}

export function trackFormStart() {
  trackEvent("form_start");
}

export function attributionPayload(): AttributionData | undefined {
  return getAttributionForLead();
}
