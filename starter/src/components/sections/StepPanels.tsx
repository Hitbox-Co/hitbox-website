"use client";

import { useId, useState } from "react";

import type { Step } from "@/types";
import { cn } from "@/lib/utils";

type StepPanelsProps = {
  steps: Step[];
  className?: string;
  /** Which step is open on first paint. */
  defaultOpen?: number;
};

/**
 * Expanding panels for the claim lifecycle.
 *
 * From `lg` up this is the horizontal layout: closed panels shrink to a 142px
 * rail with the label rotated to read bottom-to-top, and the open panel takes
 * the remaining width. Below `lg` the same panels stack into a vertical
 * accordion, because a rotated rail has nowhere to go on a phone.
 *
 * Width is animated through `flex-grow` rather than `width` — it is a unitless
 * number, so it interpolates without needing a measured pixel target for the
 * open state. Height on mobile uses the `grid-template-rows: 0fr → 1fr` trick,
 * which animates a collapse without hardcoding a max-height.
 *
 * Exactly one panel is open at a time, so each header is a disclosure button
 * whose `aria-expanded` stays truthful at both breakpoints.
 */
export function StepPanels({ steps, className, defaultOpen = 0 }: StepPanelsProps) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("flex flex-col gap-3 lg:h-[456px] lg:flex-row", className)}>
      {steps.map((step, index) => {
        const active = index === open;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-tab-${index}`;
        const number = String(index + 1).padStart(2, "0");

        return (
          <div
            key={step.title}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-card ring-1",
              "transition-[flex-grow,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
              // Same basis for every panel; only the grow factor moves.
              "lg:basis-[142px]",
              active
                ? "bg-ink-raised ring-brand-bright/60 lg:grow"
                : "bg-ink-soft ring-fg/10 hover:ring-fg/25 lg:grow-0",
            )}
          >
            {/* Header: a row on mobile, the rotated rail on desktop. It fades
                out once open, since the panel body then repeats the title. */}
            <button
              id={buttonId}
              type="button"
              aria-expanded={active}
              aria-controls={panelId}
              onClick={() => setOpen(index)}
              className={cn(
                "relative z-10 flex w-full cursor-pointer items-center gap-4 p-5 text-left",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright",
                // Label sits bottom-left of the rail, matching the reference.
                "lg:absolute lg:inset-0 lg:w-[142px] lg:flex-col lg:items-start lg:justify-end lg:gap-0 lg:p-0 lg:pb-6 lg:pl-6",
                "lg:transition-opacity lg:duration-300 motion-reduce:lg:transition-none",
                active && "lg:pointer-events-none lg:opacity-0",
              )}
            >
              {/* Oversized hollow numeral, desktop rail only: top-weighted and
                  pushed past the right edge so the panel clips it. Tabular
                  figures keep every digit the same width, so 1 and 4 sit in the
                  rail exactly where 2 and 3 do.

                  It is sized and offset to stay clear of the rotated label,
                  which occupies the left 56px of the rail. The reference lets
                  its longest labels run straight through the numeral; our step
                  names are longer, so that read as two texts colliding. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 hidden select-none lg:block"
              >
                <span className="text-numeral absolute -right-[35px] top-[52px] font-display text-[170px] font-extrabold leading-none tabular-nums">
                  {index + 1}
                </span>
              </span>

              {/* The small badge is the mobile stand-in for that numeral. */}
              <span className="font-display text-sm font-extrabold text-brand-bright lg:hidden">
                {number}
              </span>
              <span className="relative z-10 font-display text-base font-extrabold uppercase tracking-tight text-fg lg:rotate-180 lg:text-2xl lg:tracking-normal lg:text-brand-bright lg:[writing-mode:vertical-rl]">
                {step.title}
              </span>
            </button>

            {/* Body. Mobile collapses it by row height; desktop cross-fades it
                over the rail. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                "lg:absolute lg:inset-0 lg:block lg:transition-opacity lg:duration-300",
                active
                  ? "grid-rows-[1fr] lg:opacity-100 lg:delay-100"
                  : "grid-rows-[0fr] lg:pointer-events-none lg:opacity-0",
              )}
            >
              <div className="overflow-hidden lg:h-full lg:overflow-y-auto">
                <div className="flex h-full flex-col px-5 pb-6 lg:p-8">
                  <span className="font-display text-4xl font-extrabold text-brand-bright lg:text-5xl">
                    {number}
                  </span>

                  <h3 className="mt-3 text-xl lg:mt-4 lg:text-2xl">{step.title}</h3>

                  {step.body ? (
                    <p className="mt-3 max-w-md font-body text-[15px] leading-relaxed text-muted">
                      {step.body}
                    </p>
                  ) : null}

                  {step.points?.length ? (
                    <ul className="mt-5 flex flex-col gap-2">
                      {step.points.map((point) => (
                        <li key={point} className="flex gap-3 font-body text-sm text-muted">
                          <span
                            aria-hidden
                            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
