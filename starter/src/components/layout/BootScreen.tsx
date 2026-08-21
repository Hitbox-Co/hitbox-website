"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/utils";

/** Shortest time the splash stays up, so it never flickers on a warm cache. */
const MIN_VISIBLE_MS = 900;
/** Safety net: never hold the site back longer than this, whatever happens. */
const MAX_VISIBLE_MS = 4000;
/** Length of the curtain wipe. Must match the duration class below. */
const WIPE_MS = 700;

type Phase = "loading" | "leaving" | "done";

/**
 * Boot splash, in the manner of a game publisher's front page: a brand-blue
 * curtain with the lockup and a filling progress bar, which wipes upward once
 * the page has loaded.
 *
 * It is server-rendered so it covers the page from the very first paint — no
 * flash of half-built content — and it removes itself from the DOM when done.
 * Reduced-motion visitors skip the whole thing.
 */
export function BootScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(8);

  useLockBodyScroll(phase !== "done");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("done");
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const mountedAt = Date.now();
    let settled = false;

    /** Fill the bar, wipe the curtain away, then drop it from the tree. */
    const finish = () => {
      if (settled) return;
      settled = true;
      setProgress(100);
      timers.push(setTimeout(() => setPhase("leaving"), 180));
      timers.push(setTimeout(() => setPhase("done"), 180 + WIPE_MS));
    };

    // Creep towards 92% while the page is still coming in.
    const creep = setInterval(() => {
      setProgress((p) => (p >= 92 ? p : p + Math.max(1, Math.round((92 - p) * 0.18))));
    }, 110);

    const onLoad = () => {
      const remaining = MIN_VISIBLE_MS - (Date.now() - mountedAt);
      timers.push(setTimeout(finish, Math.max(remaining, 0)));
    };

    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    timers.push(setTimeout(finish, MAX_VISIBLE_MS));

    return () => {
      clearInterval(creep);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {/* Without scripting the curtain could never lift, so never show it. */}
      <noscript>
        <style>{`#boot-screen{display:none!important}`}</style>
      </noscript>

      <div
        id="boot-screen"
        role="progressbar"
        aria-label="Loading HitBox Collectibles"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        className={cn(
          "fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-navy-deep transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]",
          phase === "leaving" ? "-translate-y-full" : "translate-y-0",
        )}
      >
        {/* Poster field, matching the hero treatment */}
        <div aria-hidden className="absolute inset-0 bg-linear-to-br from-brand via-navy to-scrim" />
        <div aria-hidden className="halftone absolute inset-0 opacity-20 mix-blend-overlay" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-brand-bright) 60%, transparent), transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-center px-6">
          <Logo variant="lockup" size="lg" href={null} tone="onDark" className="animate-pulse" />

          {/* Progress track */}
          <div className="mt-12 h-1 w-56 overflow-hidden bg-white/20 sm:w-72">
            <div
              className="h-full bg-white transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 flex w-56 items-center justify-between font-display text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/70 sm:w-72">
            <span>Loading</span>
            <span className="tabular-nums text-white">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Accent rule, same as the hero's bottom edge */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2.5 bg-brand-bright" />
      </div>
    </>
  );
}
