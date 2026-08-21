"use client";

import { useId, useState } from "react";

import { ChevronDownIcon } from "@/components/ui/Icons";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

type AccordionProps = {
  items: FaqItem[];
  className?: string;
};

/** Expandable FAQ list. One panel open at a time, fully keyboard operable. */
export function Accordion({ items, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-card bg-ink-soft ring-1 transition-all duration-200",
              open ? "ring-brand-bright/70" : "ring-fg/10 hover:ring-fg/25",
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full items-start justify-between gap-6 px-5 py-4 text-left sm:px-6 sm:py-5"
              >
                <span
                  className={cn(
                    "font-display text-base font-extrabold uppercase leading-snug tracking-tight transition-colors sm:text-lg",
                    open ? "text-fg" : "text-fg/85",
                  )}
                >
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={cn(
                    "mt-0.5 size-5 shrink-0 transition-transform duration-200",
                    open ? "rotate-180 text-brand-bright" : "text-subtle",
                  )}
                />
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-5 sm:px-6 sm:pb-6"
            >
              <p className="max-w-3xl font-body text-[15px] leading-relaxed text-muted">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
