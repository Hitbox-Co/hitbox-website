import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FormFrameProps = {
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
  error: string | null;
  submitLabel: string;
  /** Small print rendered under the submit button. */
  footnote?: ReactNode;
  className?: string;
};

/** Card, error region and submit row shared by every form. */
export function FormFrame({
  children,
  onSubmit,
  submitting,
  error,
  submitLabel,
  footnote,
  className,
}: FormFrameProps) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "flex flex-col gap-6 rounded-card bg-ink-soft p-6 ring-1 ring-fg/10 sm:p-8",
        className,
      )}
    >
      {children}

      {error ? (
        <p
          role="alert"
          className="rounded-input border border-brand-bright/60 bg-brand/15 px-4 py-3 font-body text-sm text-fg"
        >
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-4">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : submitLabel}
        </Button>
        {footnote ? (
          <p className="font-body text-xs leading-relaxed text-subtle">{footnote}</p>
        ) : null}
      </div>
    </form>
  );
}

/** Groups fields under a subheading inside a longer form. */
export function FormSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <h2 className="border-b border-line pb-3 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-brand-bright">
        {title}
      </h2>
      {children}
    </div>
  );
}
