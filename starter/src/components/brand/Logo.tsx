import Link from "next/link";

import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** `lockup` stacks the wordmark under the mark; `inline` sets it beside. */
  variant?: "inline" | "lockup" | "mark";
  /** Wraps the logo in a link to the homepage. */
  href?: string | null;
  size?: "sm" | "md" | "lg";
  /** `onDark` pins the lockup to white, for brand surfaces. */
  tone?: "theme" | "onDark";
};

const markSize = { sm: "h-7", md: "h-9", lg: "h-24" } as const;
const wordSize = { sm: "text-lg", md: "text-2xl", lg: "text-5xl" } as const;
const subSize = {
  sm: "text-[7px] tracking-[0.34em]",
  md: "text-[8px] tracking-[0.36em]",
  lg: "text-xs tracking-[0.52em]",
} as const;

/**
 * The full brand lockup. The mark is inline SVG (so it inherits `currentColor`
 * and stays crisp at any size); the wordmark is live text in the display face,
 * which keeps it selectable, translatable and pixel-sharp.
 */
export function Logo({
  className,
  variant = "inline",
  href = "/",
  size = "md",
  tone = "theme",
}: LogoProps) {
  const onDark = tone === "onDark";

  const content = (
    <span
      className={cn(
        onDark ? "inline-flex text-white" : "inline-flex text-fg",
        variant === "lockup" ? "flex-col items-center gap-3" : "flex-row items-center gap-2.5",
        className,
      )}
    >
      <LogoMark tone={tone} className={cn(markSize[size], "w-auto shrink-0")} />

      {variant !== "mark" && (
        <span className={cn("flex flex-col", variant === "lockup" && "items-center")}>
          <span
            className={cn(
              "font-display font-extrabold uppercase italic leading-none tracking-tight",
              wordSize[size],
            )}
          >
            HitBox
          </span>
          <span
            className={cn(
              "font-display font-bold uppercase leading-none",
              onDark ? "text-white/60" : "text-subtle",
              subSize[size],
              variant === "lockup" ? "mt-2" : "mt-1",
            )}
          >
            Collectibles
          </span>
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="HitBox Collectibles — home" className="inline-flex">
      {content}
    </Link>
  );
}
