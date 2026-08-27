import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { AndroidIcon, AppleIcon, PlayIcon, ScanIcon } from "@/components/ui/Icons";
import { appDownload, appStores } from "@/data/app-download";
import { worldPosters } from "@/data/worlds";
import { cn } from "@/lib/utils";
import type { StoreBadge } from "@/types";

const badgeIcon: Record<StoreBadge["platform"], typeof AppleIcon> = {
  ios: AppleIcon,
  android: PlayIcon,
};

/** Poster art drifting behind the device, purely decorative.
 *  The overhang is kept within the grid gap (40px at lg, 64px at xl) so the
 *  cards never drift under the copy or the scan card. */
const floaters = [
  { poster: 0, className: "-left-6 top-8 w-28 -rotate-12 xl:-left-12 xl:w-32" },
  { poster: 2, className: "-left-4 bottom-6 w-24 rotate-6 xl:-left-8 xl:w-28" },
  { poster: 1, className: "-right-6 top-20 w-28 rotate-12 xl:-right-12 xl:w-32" },
  { poster: 3, className: "-right-4 bottom-10 w-24 -rotate-6 xl:-right-8 xl:w-28" },
];

/**
 * The app download band: copy and store badges on the left, the app running on
 * a phone in the middle, a scan-to-download card on the right.
 *
 * This one paints its own surface rather than using `Section`, because it wants
 * a flat dark navy field instead of the brand band. `scrim` does not flip with
 * the theme, so the band stays dark in both.
 *
 * The badges are mock — the app has no listings yet — so they render as static
 * pills rather than dead links.
 */
export function AppDownload() {
  return (
    <section className="relative isolate overflow-hidden bg-scrim py-16 text-white sm:py-24">
      <Container width="wide">
        {/* Stacked, the rows need more air than the columns do: the device's
            drop-shadow reaches ~120px past its own box and would otherwise
            fall across the scan card below it. */}
        <div className="grid items-center gap-20 sm:gap-16 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-10 xl:gap-16">
          {/* Copy */}
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-left">
            <span className="inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-2 font-display text-[11px] font-extrabold uppercase tracking-[0.22em] text-white/90">
              {appDownload.pill.map((word, i) => (
                <span key={word} className="flex items-center gap-3">
                  {i > 0 ? <span className="size-1 rounded-full bg-brand-bright" /> : null}
                  {word}
                </span>
              ))}
            </span>

            <h2 className="mt-7 text-4xl sm:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {appDownload.title}
              <br />
              <span className="text-brand-bright">{appDownload.highlight}</span>
            </h2>

            <p className="mx-auto mt-6 max-w-md font-body text-sm leading-relaxed text-white/75 sm:text-base lg:mx-0">
              {appDownload.body}
            </p>

            {/* Store badges — static mocks, sized as a matched pair */}
            <ul className="mx-auto mt-9 flex max-w-[26rem] flex-col gap-3.5 sm:flex-row lg:mx-0 lg:flex-col 2xl:flex-row">
              {appStores.map((store) => {
                const Icon = badgeIcon[store.platform];

                return (
                  <li
                    key={store.platform}
                    className="flex flex-1 items-center gap-3 rounded-2xl border border-white/15 bg-black/70 px-5 py-3 shadow-[0_18px_34px_-14px_rgba(0,10,40,0.9)]"
                  >
                    <Icon className="size-7 shrink-0 text-white" />
                    <span className="text-left leading-tight">
                      <span className="block font-body text-[10px] uppercase tracking-[0.14em] text-white/65">
                        {store.caption}
                      </span>
                      <span className="block font-display text-base font-extrabold tracking-tight text-white">
                        {store.label}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Device, with poster art drifting behind it */}
          <div className="relative mx-auto w-60 shrink-0 sm:w-64 lg:w-72">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[85%] -translate-y-1/2 rounded-[50%] opacity-80 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-brand-bright) 75%, transparent), transparent 70%)",
              }}
            />

            {floaters.map((floater) => {
              const poster = worldPosters[floater.poster];
              if (!poster) return null;

              return (
                <div
                  key={floater.className}
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -z-10 hidden overflow-hidden rounded-xl border border-brand-bright/40 opacity-50 shadow-[0_20px_50px_-12px_rgba(0,8,30,0.8)] blur-[1px] lg:block",
                    floater.className,
                  )}
                >
                  <Image
                    src={poster.image.src}
                    alt=""
                    width={200}
                    height={280}
                    sizes="10rem"
                    className="h-auto w-full"
                  />
                </div>
              );
            })}

            <Image
              src={appDownload.mockup.src}
              alt={appDownload.mockup.alt}
              width={760}
              height={1348}
              sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 15rem"
              className="relative h-auto w-full [filter:drop-shadow(0_10px_14px_rgba(0,6,25,0.5))_drop-shadow(0_26px_34px_rgba(0,4,20,0.6))] lg:[filter:drop-shadow(0_16px_20px_rgba(0,6,25,0.55))_drop-shadow(0_50px_70px_rgba(0,4,20,0.7))]"
            />
          </div>

          {/* Scan card */}
          <div className="mx-auto w-full max-w-[17.5rem] rounded-card border border-brand-bright/35 bg-white/[0.04] p-5 backdrop-blur lg:ml-auto lg:mr-0">
            <div className="flex items-start gap-3">
              <ScanIcon className="mt-0.5 size-7 shrink-0 text-brand-bright" />
              <span>
                <span className="block font-display text-sm font-extrabold uppercase tracking-[0.12em] text-white">
                  {appDownload.qr.heading}
                </span>
                <span className="mt-1 block font-body text-xs text-white/65">
                  {appDownload.qr.subheading}
                </span>
              </span>
            </div>

            {/* Bracketed frame around the code, echoing a scanner viewfinder.
                `w-fit` keeps the brackets tight to the code; the pair centres
                on the stacked layout and sits right once the card has a
                column of its own. */}
            <div className="relative mx-auto mt-5 w-fit p-3">
              {[
                "left-0 top-0 border-l-2 border-t-2 rounded-tl-md",
                "right-0 top-0 border-r-2 border-t-2 rounded-tr-md",
                "left-0 bottom-0 border-b-2 border-l-2 rounded-bl-md",
                "right-0 bottom-0 border-b-2 border-r-2 rounded-br-md",
              ].map((corner) => (
                <span
                  key={corner}
                  aria-hidden
                  className={cn("absolute size-6 border-brand-bright", corner)}
                />
              ))}

              <Image
                src={appDownload.qr.src}
                alt={appDownload.qr.alt}
                width={200}
                height={200}
                className="size-32 rounded-lg bg-white p-2"
              />
            </div>

            <div className="mt-4 flex flex-col items-center gap-3 border-t border-white/12 pt-4">
              <span className="font-body text-xs text-white/65">{appDownload.qr.footer}</span>
              <span className="flex items-center gap-4 text-white/80">
                <AppleIcon className="size-5" />
                <AndroidIcon className="size-5" />
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
