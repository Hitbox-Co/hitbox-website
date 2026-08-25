"use client";

import { useEffect } from "react";

import { pauseSmoothScroll, resumeSmoothScroll } from "@/lib/smooth-scroll";

/** Freezes background scrolling while the mobile menu is open. */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Lenis scrolls from wheel/touch events, so hidden overflow alone would
    // not stop the page moving behind an overlay.
    pauseSmoothScroll();

    return () => {
      document.body.style.overflow = previous;
      resumeSmoothScroll();
    };
  }, [locked]);
}
