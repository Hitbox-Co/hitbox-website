import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small uppercase label above the heading. */
  eyebrow?: string;
  title: string;
  body?: string;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
  /** `onBrand` for headings sitting on a brand-blue band. */
  tone?: "theme" | "onBrand";
};

export function SectionHeading({
  eyebrow,
  title,
  body,
  children,
  align = "left",
  className,
  as: Tag = "h2",
  tone = "theme",
}: SectionHeadingProps) {
  const onBrand = tone === "onBrand";

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "mb-4 font-display text-xs font-extrabold uppercase tracking-[0.2em]",
            onBrand ? "text-white" : "text-brand-bright",
          )}
        >
          {eyebrow}
        </span>
      ) : null}

      <Tag className={cn(Tag === "h2" ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl")}>
        {title}
      </Tag>

      {body ? (
        <p
          className={cn(
            "mt-5 max-w-2xl font-body text-base leading-relaxed",
            onBrand ? "text-white" : "text-muted",
          )}
        >
          {body}
        </p>
      ) : null}

      {children}
    </div>
  );
}
