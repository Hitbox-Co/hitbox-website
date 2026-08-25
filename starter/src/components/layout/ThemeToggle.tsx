"use client";

import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export type Theme = "dark" | "light";

/** Shared with the pre-paint script in the root layout. */
export const THEME_STORAGE_KEY = "hitbox:theme";

/**
 * Switches the site between the navy night palette and the daylight one by
 * setting `data-theme` on <html>, which re-points the colour tokens.
 *
 * The choice is remembered per browser; visitors who have never chosen get
 * whatever their OS asks for. The initial value is applied by an inline
 * script in the root layout, so this component only mirrors what is already
 * on the page — never fighting it on hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      // Storage blocked: fall back to whatever the document already carries.
    }
    const current =
      stored === "light" || stored === "dark"
        ? (stored as Theme)
        : document.documentElement.dataset.theme === "light"
          ? "light"
          : "dark";

    document.documentElement.dataset.theme = current;
    setTheme(current);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    const applied: Theme =
      document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const flipped: Theme = applied === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = flipped;
    setTheme(flipped);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, flipped);
    } catch {
      // Private mode or blocked storage: the choice just won't persist.
    }
  };

  const Icon = next === "light" ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        // Matches the nav's brand-outline buttons: 2px blue border, sharp
        // parallelogram, same 36px height.
        "grid h-9 w-10 shrink-0 place-items-center rounded-none border-2 border-brand text-fg transition-colors -skew-x-12 hover:bg-brand hover:text-white",
        className,
      )}
    >
      <Icon className="size-4.5 skew-x-12" />
    </button>
  );
}
