"use client";

import { useEffect } from "react";
import { captureAttributionFromUrl } from "@/lib/marketing/attribution";

/** Persists UTM / click IDs on first landing (30-day cookie). */
export function AttributionCapture() {
  useEffect(() => {
    captureAttributionFromUrl();
  }, []);

  return null;
}
