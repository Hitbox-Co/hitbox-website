"use client";

import type { CSSProperties } from "react";
import { useId } from "react";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { useCarousel } from "@/hooks/useCarousel";
import type { Step } from "@/types";
import { cn } from "@/lib/utils";

type StepCarouselProps = {
  steps: Step[];
  className?: string;
  /** Names the carousel for assistive tech, e.g. "Partnership process". */
  label: string;
};

/**
 * One step at a time, with the neighbouring steps peeking either side.
 *
 * Every step is laid out in a single track that slides; the active card is the
 * one sitting under the centre line. Card width and gap live in the `--card-w`
 * and `--card-gap` custom properties so the slide distance is one calc away and
 * stays correct across breakpoints without measuring anything in JS.
 *
 * Autoplay is off. The hero banner rotates on its own because it is scenery;
 * this is a numbered process someone is reading, so it only moves when asked.
 */
export function StepCarousel({ steps, className, label }: StepCarouselProps) {
  const { index, goTo, next, previous } = useCarousel({
    length: steps.length,
    interval: 0,
  });
  const baseId = useId();

  if (steps.length === 0) return null;

  // A copy of the last step leads the lane and a copy of the first trails it,
  // so the neighbouring cards still peek in at either end of the run. They are
  // never selectable — only ever visible in the margins.
  const lane = [
    { step: steps[steps.length - 1], i: steps.length - 1, clone: true },
    ...steps.map((step, i) => ({ step, i, clone: false })),
    { step: steps[0], i: 0, clone: true },
  ];

  return (
    <div className={cn("flex flex-col items-center", className)} role="group" aria-label={label}>
      {/* Width is capped to exactly three cards plus their gaps, so the run
          always reads as one active card between two peeking neighbours. */}
      <div className="relative mx-auto w-full max-w-[calc(var(--card-w)*3+var(--card-gap)*2)] [--card-gap:16px] [--card-w:220px] sm:[--card-gap:24px] sm:[--card-w:320px]">
        {/* Viewport. The track is wider than this and slides behind it. */}
        <div className="overflow-hidden py-2">
          <div
            style={{ "--i": index } as CSSProperties}
            className={cn(
              "flex w-max items-center gap-[var(--card-gap)]",
              // Centre the first real card. The extra card-width backs out the
              // leading clone so index 0 still lands on the middle line.
              "ml-[calc(50%-var(--card-w)/2-(var(--card-w)+var(--card-gap)))]",
              "translate-x-[calc(var(--i)*(var(--card-w)+var(--card-gap))*-1)]",
              "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            )}
          >
            {lane.map((entry, position) => {
              const { step, i, clone } = entry;
              const active = !clone && i === index;

              return (
                <div
                  key={`${step.title}-${position}`}
                  id={active ? `${baseId}-panel` : undefined}
                  aria-hidden={active ? undefined : true}
                  className={cn(
                    "flex w-[var(--card-w)] shrink-0 flex-col items-center justify-center gap-1.5 rounded-card px-5 text-center",
                    "transition-[background-color,color,height,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    active
                      ? "h-[170px] bg-brand text-white shadow-[var(--shadow-lift)]"
                      : "h-[126px] bg-brand/15 ring-1 ring-brand/20",
                  )}
                >
                  <span
                    className={cn("font-body text-sm", active ? "text-white/85" : "text-fg/50")}
                  >
                    {`Step ${i + 1} :`}
                  </span>
                  <span
                    className={cn(
                      "font-display font-extrabold uppercase tracking-tight",
                      active ? "text-xl text-white sm:text-2xl" : "text-base text-fg/60",
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows straddle the edges of the centre card. */}
        <Arrow side="left" label="Previous step" onClick={previous}>
          <ChevronLeftIcon className="size-5" />
        </Arrow>
        <Arrow side="right" label="Next step" onClick={next}>
          <ChevronRightIcon className="size-5" />
        </Arrow>
      </div>

      <div role="tablist" aria-label={`${label} steps`} className="mt-8 flex items-center gap-2.5">
        {steps.map((step, i) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls={`${baseId}-panel`}
            aria-label={`Step ${i + 1}: ${step.title}`}
            onClick={() => goTo(i)}
            className={cn(
              "size-2.5 cursor-pointer rounded-full transition-colors duration-200 motion-reduce:transition-none",
              i === index ? "bg-brand" : "bg-brand/30 hover:bg-brand/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Arrow({
  side,
  label,
  onClick,
  children,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-10 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-brand-bright text-white transition-colors hover:bg-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright motion-reduce:transition-none",
        side === "left"
          ? "left-[calc(50%-var(--card-w)/2)] -translate-x-1/2"
          : "right-[calc(50%-var(--card-w)/2)] translate-x-1/2",
      )}
    >
      {children}
    </button>
  );
}
