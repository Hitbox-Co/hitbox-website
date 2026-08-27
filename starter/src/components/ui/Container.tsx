import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /**
   * `narrow` is for long-form reading columns (legal pages, FAQ),
   * `wide` for the full-bleed header, hero and card rails.
   */
  width?: "default" | "narrow" | "wide";
};

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  // In rem (1400px at the default root) so it scales with the wide-screen
  // step-down in globals.css rather than staying stubbornly 1400px wide.
  wide: "max-w-[87.5rem]",
} as const;

/** The single horizontal rhythm shared by every section. */
export function Container({
  children,
  className,
  as: Tag = "div",
  width = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)}>{children}</Tag>
  );
}
