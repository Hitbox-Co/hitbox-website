"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
  /** Number of slides in the carousel. */
  length: number;
  /** Milliseconds between automatic advances. Pass 0 to disable autoplay. */
  interval?: number;
};

/**
 * Index state for the hero banner: wraps around, pauses on hover/focus and
 * respects the user's reduced-motion preference.
 */
export function useCarousel({ length, interval = 7000 }: Options) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number) => setIndex(((next % length) + length) % length),
    [length],
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (!interval || paused || length < 2) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    timer.current = setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [interval, length, paused]);

  return { index, goTo, next, previous, paused, setPaused };
}
