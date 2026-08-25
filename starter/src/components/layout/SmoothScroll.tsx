"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import { registerSmoothScroll } from "@/lib/smooth-scroll";

/**
 * Momentum scrolling for the whole page.
 *
 * Renders nothing — it exists to own the Lenis instance and its animation
 * frame loop for the lifetime of the app.
 *
 * Touch scrolling is left native on purpose. Lenis can drive it too, but
 * hijacking a phone's own scroll physics feels worse than it looks, so only
 * wheel and keyboard scrolling are smoothed.
 */
export function SmoothScroll() {
  useEffect(() => {
    // Momentum scrolling is precisely the kind of motion people turn this
    // setting on to avoid, so opt out entirely rather than shortening it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      // Native physics on touch devices.
      syncTouch: false,
    });

    registerSmoothScroll(lenis);

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      registerSmoothScroll(null);
    };
  }, []);

  return null;
}
