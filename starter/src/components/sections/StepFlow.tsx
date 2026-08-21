import { ArrowDownIcon } from "@/components/ui/Icons";
import type { Step } from "@/types";
import { cn } from "@/lib/utils";

type StepFlowProps = {
  steps: Step[];
  className?: string;
  /** `stacked` is the numbered vertical list; `chain` is the compact arrow flow. */
  variant?: "stacked" | "chain";
};

/** Sequential process display — the claim lifecycle and partnership process. */
export function StepFlow({ steps, className, variant = "stacked" }: StepFlowProps) {
  if (variant === "chain") {
    return (
      <ol className={cn("flex flex-col items-stretch", className)}>
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col items-center">
            <div className="w-full rounded-card bg-ink-soft px-6 py-4 text-center ring-1 ring-fg/10 transition-all duration-300 hover:ring-brand-bright/70">
              <span className="font-display text-base font-extrabold uppercase tracking-tight">
                {step.title}
              </span>
              {step.body ? (
                <p className="mt-1.5 font-body text-sm text-muted">{step.body}</p>
              ) : null}
            </div>

            {index < steps.length - 1 ? (
              <ArrowDownIcon aria-hidden className="my-2.5 size-5 shrink-0 text-brand-bright" />
            ) : null}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className={cn("flex flex-col gap-10", className)}>
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cn("relative flex gap-5 sm:gap-7", index < steps.length - 1 && "step-line")}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand font-display text-base font-extrabold text-white shadow-[0_0_30px_-6px_rgba(0,87,255,0.9)]">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="pt-1.5">
            <h3 className="text-xl sm:text-2xl">{step.title}</h3>
            {step.body ? (
              <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-muted">
                {step.body}
              </p>
            ) : null}

            {step.points?.length ? (
              <ul className="mt-4 flex flex-col gap-2">
                {step.points.map((point) => (
                  <li key={point} className="flex gap-3 font-body text-[15px] text-muted">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {point}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
