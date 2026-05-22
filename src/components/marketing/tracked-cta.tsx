"use client";

import type { ComponentPropsWithoutRef } from "react";
import type { CtaLocation } from "@/lib/marketing/events";
import { trackCtaClick, trackContact } from "@/lib/marketing/track";

type TrackedCtaProps = ComponentPropsWithoutRef<"a"> & {
  ctaLocation: CtaLocation;
  /** Set for WhatsApp / external contact links */
  isContact?: boolean;
};

/** Anchor with optional conversion tracking on click. */
export function TrackedCta({
  ctaLocation,
  isContact,
  onClick,
  children,
  ...props
}: TrackedCtaProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (isContact) {
          trackContact({ cta_location: ctaLocation });
        } else {
          trackCtaClick(ctaLocation);
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
