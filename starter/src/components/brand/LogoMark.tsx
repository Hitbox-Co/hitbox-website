import Image from "next/image";

import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
  /** Accessible name. Omit for decorative use next to the wordmark. */
  title?: string;
  priority?: boolean;
  /**
   * `theme` follows the palette — white artwork in the dark theme, inked in
   * the light one. `onDark` keeps it white whatever the theme, for the mark
   * sitting on key art, a brand band or the boot splash.
   */
  tone?: "theme" | "onDark";
};

/**
 * The HitBox cube mark.
 *
 * Renders `hitbox-mark.png`, which is generated from the supplied
 * `hitbox-logo.png` by `npm run logo` — that script bakes the artwork's
 * luminance into an alpha channel, so the mark is genuinely transparent
 * rather than a white shape on a black square.
 *
 * Because the artwork is pure white with a real alpha channel, the light
 * theme only has to knock the brightness out of it to ink the cube in;
 * the transparency is untouched.
 *
 * Size it with height utilities (`h-9 w-auto`); fade it with `opacity-*`.
 */
export function LogoMark({ className, title, priority = false, tone = "theme" }: LogoMarkProps) {
  return (
    <Image
      src="/brand/hitbox-mark.png"
      alt={title ?? ""}
      width={597}
      height={680}
      priority={priority}
      aria-hidden={title ? undefined : true}
      className={cn(
        "select-none object-contain",
        tone === "theme" && "light:brightness-0",
        className,
      )}
    />
  );
}
