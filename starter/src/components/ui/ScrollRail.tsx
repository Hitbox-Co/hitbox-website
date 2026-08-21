"use client";

import type { ReactNode } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { useScrollRail } from "@/hooks/useScrollRail";
import { cn } from "@/lib/utils";

type ScrollRailProps = {
  children: ReactNode;
  /** Accessible name for the rail's scroll controls. */
  label: string;
  className?: string;
  trackClassName?: string;
};

/** A horizontally scrollable track with snap points and overlay arrows. */
export function ScrollRail({ children, label, className, trackClassName }: ScrollRailProps) {
  const { ref, scrollBy, canScrollLeft, canScrollRight } = useScrollRail<HTMLDivElement>();

  return (
    <div className={cn("group/rail relative", className)}>
      <div
        ref={ref}
        className={cn(
          "scroll-rail flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2",
          trackClassName,
        )}
      >
        {children}
      </div>

      <RailButton
        direction="left"
        label={`Scroll ${label} backwards`}
        disabled={!canScrollLeft}
        onClick={() => scrollBy("left")}
      />
      <RailButton
        direction="right"
        label={`Scroll ${label} forwards`}
        disabled={!canScrollRight}
        onClick={() => scrollBy("right")}
      />
    </div>
  );
}

function RailButton({
  direction,
  label,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-ink/80 text-fg backdrop-blur transition-all duration-200 md:grid",
        "opacity-0 group-hover/rail:opacity-100 focus-visible:opacity-100",
        "hover:border-brand-bright hover:bg-brand hover:text-white",
        "disabled:pointer-events-none disabled:opacity-0",
        direction === "left" ? "-left-4" : "-right-4",
      )}
    >
      <Icon className="size-5" />
    </button>
  );
}
