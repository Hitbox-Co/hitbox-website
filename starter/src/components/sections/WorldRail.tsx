"use client";

import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import {
  ArrowDownRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/ui/Icons";
import type { WorldTile } from "@/data/worlds";
import { useScrollRail } from "@/hooks/useScrollRail";
import { cn } from "@/lib/utils";

type WorldRailProps = {
  title: string;
  /** Right-aligned overline link, e.g. "About HitBox". */
  link: { label: string; href: string };
  tiles: WorldTile[];
  className?: string;
};

/**
 * Publisher-style poster rail: a navy band carrying an oversized hollow
 * heading, then a full-bleed track of 9:16 key-art posters that butt against
 * one another. The art is shown clean — each poster already carries its own
 * title — so nothing is overlaid on it.
 *
 * The paging discs sit on top of the artwork and stay visible, fading out
 * rather than disappearing when a direction runs out.
 */
export function WorldRail({ title, link, tiles, className }: WorldRailProps) {
  const { ref, scrollBy, canScrollLeft, canScrollRight } = useScrollRail<HTMLDivElement>();

  return (
    <section className={cn("relative isolate", className)}>
      {/* Heading band */}
      <div className="overflow-hidden bg-navy-deep">
        <Container
          width="wide"
          className="flex flex-col items-start gap-4 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-9"
        >
          <h2 className="text-outline -ml-0.5 text-4xl leading-[0.85] sm:whitespace-nowrap sm:text-6xl lg:text-[5.5rem]">
            {title}
          </h2>

          <Link
            href={link.href}
            className="group inline-flex shrink-0 items-center gap-2.5 border-b-2 border-white/70 pb-2 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-white transition-colors hover:border-brand-bright hover:text-brand-bright sm:text-sm"
          >
            {link.label}
            <ArrowDownRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5 sm:size-5" />
          </Link>
        </Container>
      </div>

      {/* Full-bleed poster track. Tiles match the art's 9:16 frame, so nothing
          is cropped and no scrim is needed. */}
      <div className="relative">
        <div
          ref={ref}
          className="scroll-rail flex snap-x snap-mandatory gap-[3px] overflow-x-auto bg-navy-deep"
        >
          {tiles.map((tile) => (
            <figure
              key={tile.id}
              className="group/tile relative m-0 aspect-9/16 h-[30rem] w-auto shrink-0 snap-start overflow-hidden sm:h-[34rem] lg:h-[42rem]"
            >
              <Image
                src={tile.image.src}
                alt={tile.image.alt}
                fill
                sizes="(min-width: 1024px) 378px, (min-width: 640px) 306px, 270px"
                className="object-cover object-center transition-transform duration-500 group-hover/tile:scale-[1.04]"
              />
            </figure>
          ))}
        </div>

        {/* Paging discs, laid over the artwork */}
        <RailDisc
          side="left"
          label={`Scroll ${title} backwards`}
          faded={!canScrollLeft}
          onClick={() => scrollBy("left")}
        >
          <ChevronLeftIcon className="size-6 sm:size-8" />
        </RailDisc>
        <RailDisc
          side="right"
          label={`Scroll ${title} forwards`}
          faded={!canScrollRight}
          onClick={() => scrollBy("right")}
        >
          <ChevronRightIcon className="size-6 sm:size-8" />
        </RailDisc>
      </div>
    </section>
  );
}

function RailDisc({
  side,
  label,
  faded,
  onClick,
  children,
}: {
  side: "left" | "right";
  label: string;
  /** End of the track in this direction: stays put, just dims. */
  faded: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={faded}
      className={cn(
        "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full transition-all duration-200 sm:size-16",
        faded
          ? "pointer-events-none bg-white/20 text-white/70 backdrop-blur-sm"
          : "bg-white text-brand shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8)] hover:bg-brand hover:text-white",
        side === "left" ? "left-5 sm:left-8" : "right-5 sm:right-8",
      )}
    >
      {children}
    </button>
  );
}
