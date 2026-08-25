"use client";

import Image from "next/image";

import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import type { HeroSlide } from "@/data/hero-slides";
import { useCarousel } from "@/hooks/useCarousel";
import { cn } from "@/lib/utils";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

/**
 * Full-bleed key-art hero, styled after a game publisher's front page: the
 * artwork runs edge to edge under the header, the copy sits low-left over a
 * scrim, and the paging arrows are big white discs half-hung off each edge.
 *
 * Slides cross-fade, autoplay pauses on hover or keyboard focus, and the
 * progress bars double as pagination.
 */
export function HeroCarousel({ slides }: HeroCarouselProps) {
  const { index, goTo, next, previous, setPaused } = useCarousel({ length: slides.length });

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative isolate flex min-h-[600px] w-full flex-col justify-end overflow-hidden sm:min-h-[92svh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Key art */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {slide.image ? (
            <Image
              src={slide.image.src}
              alt={slide.image.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <>
              <div className={cn("absolute inset-0 bg-linear-to-br", slide.tone)} />
              <div className="halftone absolute inset-0 opacity-25 mix-blend-overlay" />
              <div className="poster-hatch absolute inset-0" />
              <div
                className="absolute -left-40 top-1/2 size-[46rem] -translate-y-1/2 rounded-full opacity-45 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--color-brand-bright) 70%, transparent), transparent 70%)",
                }}
              />
              <LogoMark
                tone="onDark"
                className="absolute -right-24 top-1/2 h-[42rem] w-auto -translate-y-1/2 opacity-[9%] lg:right-2"
              />
            </>
          )}

          {/* Legibility scrims: up from the bottom, in from the left */}
          <div className="absolute inset-0 bg-linear-to-t from-scrim via-scrim/60 to-scrim/15" />
          <div className="absolute inset-0 bg-linear-to-r from-scrim/85 via-scrim/25 to-transparent" />
        </div>
      ))}

      {/*
        Every slide shares one grid cell, so the section is always as tall as
        the tallest slide and paging never resizes the hero.
      */}
      <Container width="wide" className="relative z-10 grid items-end pb-24 pt-40 sm:pb-28">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            inert={i !== index}
            className={cn(
              "col-start-1 row-start-1 max-w-3xl self-end text-white transition-all duration-500",
              i === index
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-4 opacity-0",
            )}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              {slide.flags?.map((flag) => (
                <span
                  key={flag}
                  className="inline-flex -skew-x-12 items-center bg-white px-2.5 py-1 font-display text-[11px] font-extrabold uppercase leading-none tracking-[0.08em] text-navy-deep"
                >
                  <span className="skew-x-12">{flag}</span>
                </span>
              ))}
              <span className="font-display text-xs font-extrabold uppercase tracking-[0.28em] text-white/85 sm:text-sm">
                {slide.eyebrow}
              </span>
            </div>

            <h1 className="mt-3 text-[2.75rem] leading-[0.92] drop-shadow-[0_6px_30px_rgba(5,10,30,0.6)] sm:text-7xl lg:text-8xl">
              {slide.title}
            </h1>

            <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-white/80 sm:text-base">
              {slide.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={slide.primary.href} size="lg">
                {slide.primary.label}
              </Button>
              <Button href={slide.secondary.href} variant="onArt" size="lg">
                {slide.secondary.label}
              </Button>
            </div>
          </div>
        ))}
      </Container>

      {/* Edge arrows — white discs, half off-canvas */}
      <EdgeArrow side="left" label="Previous slide" onClick={previous}>
        <ChevronLeftIcon className="size-6 sm:size-7" />
      </EdgeArrow>
      <EdgeArrow side="right" label="Next slide" onClick={next}>
        <ChevronRightIcon className="size-6 sm:size-7" />
      </EdgeArrow>

      {/* Pagination */}
      <Container width="wide" className="absolute inset-x-0 bottom-7 z-10">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose slide">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={i === index}
              aria-label={slide.eyebrow}
              onClick={() => goTo(i)}
              className="group/dot h-1 max-w-16 flex-1 overflow-hidden bg-white/25"
            >
              <span
                className={cn(
                  "block h-full bg-white transition-all duration-300",
                  i === index ? "w-full" : "w-0 group-hover/dot:w-1/3",
                )}
              />
            </button>
          ))}
        </div>
      </Container>

      {/* Publisher-style accent rule along the bottom edge */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-2.5 bg-brand" />
    </section>
  );
}

function EdgeArrow({
  side,
  label,
  onClick,
  children,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-20 flex size-16 -translate-y-1/2 items-center rounded-full bg-white text-navy-deep shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)] transition-colors hover:bg-brand hover:text-white sm:size-24",
        side === "left"
          ? "left-0 -translate-x-1/2 justify-end pr-3 sm:pr-5"
          : "right-0 translate-x-1/2 justify-start pl-3 sm:pl-5",
      )}
    >
      {children}
    </button>
  );
}
