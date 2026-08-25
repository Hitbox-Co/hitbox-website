import type { ReactNode } from "react";

import { LogoMark } from "@/components/brand/LogoMark";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  /** Trailing phrase rendered in brand blue, e.g. "Artists & Creators". */
  highlight?: string;
  body?: string;
  children?: ReactNode;
  /** Shows the cube mark as a large watermark behind the copy. */
  watermark?: boolean;
  /** Hairline rule along the bottom edge. Turn off when the section below
   *  should read as part of the hero rather than a separate band. */
  bordered?: boolean;
  align?: "left" | "center";
  className?: string;
};

/** Shared masthead for every inner page, sitting under the fixed header. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  body,
  children,
  watermark = true,
  bordered = true,
  align = "left",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "iso-grid relative overflow-hidden bg-linear-to-b from-navy-deep to-transparent light:from-brand-pale pb-16 pt-36 sm:pb-20 sm:pt-44",
        bordered && "border-b border-line",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 size-[28rem] rounded-full border-[60px] border-brand/15"
      />

      {watermark ? (
        <LogoMark
          aria-hidden
          className="pointer-events-none absolute -right-16 top-20 h-96 w-auto opacity-[4%] sm:-right-4"
        />
      ) : null}

      <Container width="wide" className={cn("relative", align === "center" && "text-center")}>
        {eyebrow ? (
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-brand-bright">
            {eyebrow}
          </span>
        ) : null}

        <h1 className={cn("mt-4 text-4xl sm:text-6xl", align === "center" && "mx-auto max-w-4xl")}>
          {title}
          {highlight ? <> <span className="text-brand-bright">{highlight}</span></> : null}
        </h1>

        {body ? (
          <p
            className={cn(
              "mt-6 max-w-2xl font-body text-base leading-relaxed text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {body}
          </p>
        ) : null}

        {children ? (
          <div className={cn("mt-9 flex flex-wrap gap-3", align === "center" && "justify-center")}>
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
