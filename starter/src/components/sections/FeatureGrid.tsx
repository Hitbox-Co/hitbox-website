import type { ComponentType, SVGProps } from "react";

import type { Feature } from "@/types";
import { cn } from "@/lib/utils";

type FeatureWithIcon = Feature & {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type FeatureGridProps = {
  features: FeatureWithIcon[];
  columns?: 2 | 3 | 4;
  className?: string;
  /** `onBrand` for grids sitting on a brand-blue band. */
  tone?: "theme" | "onBrand";
};

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/** The repeating benefits block used on most pages. */
export function FeatureGrid({ features, columns = 4, className, tone = "theme" }: FeatureGridProps) {
  const onBrand = tone === "onBrand";

  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <article
            key={feature.title}
            className={cn(
              "group/card flex flex-col rounded-card p-6 ring-1 transition-all duration-300 hover:-translate-y-1.5 sm:p-7",
              onBrand
                ? "bg-white/12 ring-white/25 hover:ring-white"
                : "bg-ink-soft ring-fg/10 hover:ring-brand-bright/70",
            )}
          >
            {Icon ? (
              <span
                className={cn(
                  "mb-6 grid size-12 place-items-center rounded-[10px] ring-1 transition-colors duration-300",
                  onBrand
                    ? "bg-white/15 text-white ring-white/30 group-hover/card:bg-white group-hover/card:text-brand"
                    : "bg-brand/15 text-brand-bright ring-brand/30 group-hover/card:bg-brand group-hover/card:text-white",
                )}
              >
                <Icon className="size-5.5" />
              </span>
            ) : null}

            <h3 className="text-lg leading-tight">{feature.title}</h3>
            <p
              className={cn(
                "mt-3 font-body text-sm leading-relaxed",
                onBrand ? "text-white" : "text-muted",
              )}
            >
              {feature.body}
            </p>
          </article>
        );
      })}
    </div>
  );
}
