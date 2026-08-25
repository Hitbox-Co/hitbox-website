import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Lifts the card on hover — use for cards that link somewhere. */
  interactive?: boolean;
  /** `onBrand` for cards sitting on a brand-blue band. */
  tone?: "theme" | "onBrand";
};

export function Card({ children, className, interactive = false, tone = "theme" }: CardProps) {
  const onBrand = tone === "onBrand";
  return (
    <div
      className={cn(
        "rounded-card p-6 ring-1 sm:p-7",
        onBrand ? "bg-white/12 text-white ring-white/25" : "bg-ink-soft ring-fg/10",
        interactive &&
          cn(
            "transition-all duration-300 hover:-translate-y-1.5",
            onBrand ? "hover:ring-white" : "hover:ring-brand-bright/70",
          ),
        className,
      )}
    >
      {children}
    </div>
  );
}
