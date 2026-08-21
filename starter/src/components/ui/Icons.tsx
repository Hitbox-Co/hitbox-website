import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const defaults: IconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 5v14M5 13l7 7 7-7" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 12.5l5.5 5.5L20 7" />
    </svg>
  );
}

/** Scan / tap — a phone reading a collectible. */
export function ScanIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M3 8V5.5A2.5 2.5 0 015.5 3H8M16 3h2.5A2.5 2.5 0 0121 5.5V8M21 16v2.5a2.5 2.5 0 01-2.5 2.5H16M8 21H5.5A2.5 2.5 0 013 18.5V16" />
      <path d="M7 12h10" />
    </svg>
  );
}

/** Stacked layers — a digital collection. */
export function LayersIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  );
}

/** Shield — platform security. */
export function ShieldIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3l7.5 3v5.5c0 4.4-3.1 8.2-7.5 9.5-4.4-1.3-7.5-5.1-7.5-9.5V6L12 3z" />
      <path d="M9.5 12l1.8 1.8 3.4-3.6" />
    </svg>
  );
}

/** Key — unlocking an experience. */
export function UnlockIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="4" y="10.5" width="16" height="10.5" rx="2" />
      <path d="M8 10.5V7a4 4 0 017.7-1.5" />
    </svg>
  );
}

/** Cube — a physical collectible. */
export function CubeIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6z" />
      <path d="M4 7.4l8 4.6 8-4.6M12 12v9.2" />
    </svg>
  );
}

/** Person — a single account. */
export function AccountIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="8" r="3.75" />
      <path d="M4.5 20c0-3.4 3.4-6 7.5-6s7.5 2.6 7.5 6" />
    </svg>
  );
}

/** Spark — exclusive content and rewards. */
export function SparkIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3l2.2 5.9L20 11l-5.8 2.1L12 19l-2.2-5.9L4 11l5.8-2.1L12 3z" />
    </svg>
  );
}

/** Megaphone — campaigns. */
export function CampaignIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 10v4a1 1 0 001 1h2l6 4V5L7 9H5a1 1 0 00-1 1z" />
      <path d="M17 9.5a3.5 3.5 0 010 5" />
    </svg>
  );
}

/** Sliders — creative control. */
export function ControlsIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 21V14M5 10V3M12 21V12M12 8V3M19 21V16M19 12V3" />
      <path d="M2.5 14h5M9.5 8h5M16.5 16h5" />
    </svg>
  );
}

/** Repeating loop — long-term engagement. */
export function LoopIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 9a5 5 0 015-5h6.5M20 15a5 5 0 01-5 5H8.5" />
      <path d="M13 1.5L15.5 4 13 6.5M11 17.5L8.5 20 11 22.5" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M15 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

/** Diagonal "go there" arrow used by the section overline links. */
export function ArrowDownRightIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M7 7l10 10M17 8v9h-9" />
    </svg>
  );
}

/** Theme toggle: daylight. */
export function SunIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

/** Theme toggle: night. */
export function MoonIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M20 14.5A8.5 8.5 0 019.5 4a7 7 0 108.9 10.5 8.6 8.6 0 011.6 0z" />
    </svg>
  );
}
