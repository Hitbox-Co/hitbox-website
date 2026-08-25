import Image from "next/image";

import type { WorldTile } from "@/data/worlds";
import { cn } from "@/lib/utils";

type PosterFanProps = {
  /** Rendered left to right; the middle one is raised and enlarged. */
  items: WorldTile[];
  className?: string;
  /** Set on the first screenful so the fan is not lazy-loaded. */
  priority?: boolean;
};

/**
 * Artwork fanned into an overlapping cluster, middle image raised.
 *
 * The overlap is a percentage rather than a pixel offset, so the fan keeps its
 * shape at every width — the cards scale with the container and the tuck stays
 * proportional.
 */
export function PosterFan({ items, className, priority = false }: PosterFanProps) {
  const middle = Math.floor(items.length / 2);

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {items.map((item, index) => {
        const isMiddle = index === middle;

        return (
          <div
            key={item.id}
            className={cn(
              "relative aspect-3/4 overflow-hidden rounded-card bg-ink-soft ring-1 ring-fg/10",
              isMiddle
                ? "z-10 w-[40%] max-w-[320px] shadow-[var(--shadow-tile)]"
                : "w-[34%] max-w-[272px]",
              index < middle && "-mr-[6%]",
              index > middle && "-ml-[6%]",
            )}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 40vw, (max-width: 1024px) 30vw, 320px"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
