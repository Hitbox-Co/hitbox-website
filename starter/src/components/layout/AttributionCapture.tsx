"use client";

import { useEffect } from "react";

import { captureAttribution } from "@/lib/attribution";

/**
 * Records the UTM parameters from the landing URL so form submissions can
 * carry them. Renders nothing.
 *
 * Reads `window.location.search` directly rather than `useSearchParams`, which
 * would opt every page into client-side rendering unless wrapped in Suspense.
 * It runs once per app mount, which is the load that has the query string on it.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
