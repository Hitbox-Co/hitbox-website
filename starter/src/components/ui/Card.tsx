import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
  /** Lifts the card on hover — use for cards that link somewhere. */
  interactive?: boolean;
};

export function Card({ children, className, interactive = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card bg-ink-soft p-6 ring-1 ring-fg/10 sm:p-7",
        interactive &&
          "transition-all duration-300 hover:-translate-y-1.5 hover:ring-brand-bright/70",
        className,
      )}
    >
      {children}
    </div>
  );
}
