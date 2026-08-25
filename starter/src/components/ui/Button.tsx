import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "onArt" | "light" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
/** `slant` is the parallelogram house style and the default; `square` is the opt-out. */
export type ButtonShape = "square" | "slant";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-extrabold uppercase tracking-tight transition-all duration-200 disabled:pointer-events-none disabled:opacity-45";

const variants: Record<ButtonVariant, string> = {
  // Text on a brand fill stays white in both themes.
  primary:
    "bg-brand text-white hover:bg-brand-bright hover:shadow-[var(--shadow-lift)] active:translate-y-px",
  // Outlined, and follows the theme — for buttons sitting on page surfaces.
  secondary:
    "border-2 border-fg/60 text-fg hover:border-fg hover:bg-fg hover:text-ink active:translate-y-px",
  // Outlined in white, for buttons sitting on key art or a brand band.
  onArt:
    "border-2 border-white/70 text-white hover:border-white hover:bg-white hover:text-navy-deep active:translate-y-px",
  light: "bg-white text-navy-deep hover:bg-brand-pale active:translate-y-px",
  ghost: "text-fg/80 hover:text-fg",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-7 text-sm",
  lg: "h-13 px-9 text-base",
};

const shapes: Record<ButtonShape, string> = {
  square: "rounded-[4px]",
  slant: "rounded-none -skew-x-12",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  className?: string;
};

type AsLink = CommonProps & { href: string };
type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: AsLink | AsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    shape = "slant",
    className,
    ...rest
  } = props as AsButton & { href?: string };

  const classes = cn(base, variants[variant], sizes[size], shapes[shape], className);

  // The box is skewed, so the label is counter-skewed to stay upright.
  const label =
    shape === "slant" ? (
      <span className="flex items-center gap-2 skew-x-12">{children}</span>
    ) : (
      children
    );

  if (typeof props.href === "string") {
    return (
      <Link href={props.href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {label}
    </button>
  );
}
