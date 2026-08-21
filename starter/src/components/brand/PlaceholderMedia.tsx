import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/utils";

type PlaceholderMediaProps = {
  /** Describes what will eventually sit here, so the slot is self-documenting. */
  label: string;
  className?: string;
  ratio?: "video" | "square" | "wide" | "portrait";
  /** Set false for decorative slots that need no caption. */
  labelled?: boolean;
};

const ratios = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-21/9",
  portrait: "aspect-4/5",
} as const;

/**
 * An honest stand-in for artwork that does not exist yet. It uses the HitBox
 * cube rather than inventing artists, products or packshots, and names the
 * asset it is holding space for so nothing ships looking accidental.
 */
export function PlaceholderMedia({
  label,
  className,
  ratio = "video",
  labelled = true,
}: PlaceholderMediaProps) {
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-card bg-linear-to-br from-navy via-ink-soft to-ink ring-1 light:from-brand-pale light:via-ink-soft light:to-ink-raised ring-fg/10",
        ratios[ratio],
        className,
      )}
    >
      <div aria-hidden className="iso-grid absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-56 rounded-full border-[30px] border-brand/15"
      />

      <LogoMark className="relative h-1/3 w-auto opacity-15" />

      {labelled ? (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-ink/75 px-3 py-1.5 font-display text-[10px] font-extrabold uppercase tracking-[0.2em] text-muted backdrop-blur">
          {label}
        </span>
      ) : null}
    </div>
  );
}
