import Image from "next/image";

import { PlaceholderMedia } from "@/components/brand/PlaceholderMedia";
import { Button } from "@/components/ui/Button";
import type { CollectiblePlaceholder } from "@/types";
import { cn } from "@/lib/utils";

type CollectionPreviewProps = {
  items: CollectiblePlaceholder[];
  className?: string;
};

/**
 * Shows the *shape* of a collector's account: which fields each claimed
 * collectible surfaces. Entries are labelled placeholders on purpose — no
 * invented artists, products or releases.
 */
export function CollectionPreview({ items, className }: CollectionPreviewProps) {
  return (
    <div className={cn("rounded-card border border-line bg-ink-soft p-4 sm:p-6", className)}>
      {/* Account chrome, so the preview reads as a product surface */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
        <div>
          <p className="font-display text-sm font-semibold text-fg">Your collection</p>
          <p className="mt-1 text-xs text-subtle">Interface preview — not a live account</p>
        </div>
        <span className="rounded-full border border-line px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-subtle">
          Preview
        </span>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col overflow-hidden rounded-[10px] border border-line bg-ink-raised"
          >
            {item.image ? (
              <div className="relative aspect-square border-b border-line">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                  className="object-cover"
                />
              </div>
            ) : (
              <PlaceholderMedia
                label="Collectible image"
                ratio="square"
                labelled={false}
                className="rounded-none border-0 border-b border-line"
              />
            )}

            <div className="flex flex-1 flex-col gap-3 p-4">
              <div>
                <h3 className="font-display text-[15px] font-semibold text-fg">{item.name}</h3>
                <p className="mt-1 text-xs text-subtle">{item.collection}</p>
              </div>

              <dl className="mt-auto flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-subtle">Claimed</dt>
                  <dd className="text-muted">{item.claimDate}</dd>
                </div>
                {item.edition ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-subtle">Edition</dt>
                    <dd className="text-muted">{item.edition}</dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-3">
                  <dt className="text-subtle">Status</dt>
                  <dd className="text-fg">{item.status}</dd>
                </div>
              </dl>

              <Button variant="secondary" size="sm" className="mt-1 w-full" href="/how-it-works">
                View experience
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
