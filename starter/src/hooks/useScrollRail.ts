"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives the horizontal card rails: tracks how far the track is scrolled so
 * the arrow buttons can disable themselves at either end.
 */
export function useScrollRail<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState({ canScrollLeft: false, canScrollRight: true });

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setState({
      canScrollLeft: el.scrollLeft > 8,
      canScrollRight: el.scrollLeft < maxScroll - 8,
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollBy = useCallback((direction: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 240);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  return { ref, scrollBy, ...state };
}
