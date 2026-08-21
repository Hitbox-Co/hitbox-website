import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/utils";

const controlClasses =
  "w-full rounded-input border border-line-strong bg-ink px-4 py-3 font-body text-[15px] text-fg placeholder:text-subtle transition-colors focus:border-brand-bright focus:outline-none disabled:opacity-50";

type FieldShellProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

/** Label + control + hint/error, so every form on the site looks identical. */
export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  className,
}: FieldShellProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="font-display text-xs font-extrabold uppercase tracking-[0.16em] text-muted"
      >
        {label}
        {required ? (
          <span className="ml-1 text-brand-bright">*</span>
        ) : (
          <span className="ml-1.5 font-body font-normal normal-case tracking-normal text-subtle">
            (optional)
          </span>
        )}
      </label>

      {children}

      {error ? (
        <p className="font-body text-sm text-brand-pale" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="font-body text-sm text-subtle">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClasses, className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(controlClasses, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClasses, "appearance-none pr-10", className)} {...props}>
      {children}
    </select>
  );
}

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
};

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-start gap-3 font-body text-[15px] leading-relaxed text-muted",
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 size-4.5 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-line-strong bg-ink transition-colors checked:border-brand checked:bg-brand focus-visible:outline-2 focus-visible:outline-brand-bright"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}

/** Groups related controls with a legend — used for the interest checkboxes. */
export function FieldGroup({
  legend,
  children,
  className,
}: {
  legend: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("flex flex-col gap-3", className)}>
      <legend className="mb-1 font-display text-xs font-extrabold uppercase tracking-[0.16em] text-muted">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
