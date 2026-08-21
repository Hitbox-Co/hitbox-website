import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  width?: "default" | "narrow" | "wide";
  /** Adds a hairline rule along the top edge to separate stacked sections. */
  bordered?: boolean;
  /** Alternating band, echoing the reference site's section rhythm.
   *  `brand` paints a full-bleed blue band; its contents must use their
   *  own `onBrand` tone. */
  tone?: "flat" | "raised" | "brand";
};

export function Section({
  children,
  id,
  className,
  containerClassName,
  width = "wide",
  bordered = false,
  tone = "flat",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 sm:py-20",
        bordered && "border-t border-line",
        tone === "raised" &&
          "bg-linear-to-b from-navy-deep/45 via-transparent to-transparent light:from-brand-pale/70",
        tone === "brand" && "bg-brand-flat text-white",
        className,
      )}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
