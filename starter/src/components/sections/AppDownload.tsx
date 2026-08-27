import Image from "next/image";

import { AndroidIcon, AppleIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { appDownload, appStores } from "@/data/app-download";
import { cn } from "@/lib/utils";
import type { StoreBadge } from "@/types";

const badgeTone: Record<StoreBadge["platform"], string> = {
  // `scrim` and `navy-deep` never flip with the theme, so the badges stay
  // dark-on-white and white-on-navy on the blue band in both themes.
  ios: "bg-scrim text-white",
  android: "bg-white text-navy-deep",
};

const badgeIcon: Record<StoreBadge["platform"], typeof AppleIcon> = {
  ios: AppleIcon,
  android: AndroidIcon,
};

/**
 * The app download band: store badges on the left, the app running on a phone
 * in the middle, the QR code on the right. The badges are mock — the app has
 * no listings yet — so they render as static pills rather than dead links.
 */
export function AppDownload() {
  return (
    <Section tone="brand" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/12 blur-3xl"
      />

      <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        <div className="mx-auto max-w-md lg:mx-0">
          <SectionHeading
            eyebrow={appDownload.eyebrow}
            title={appDownload.title}
            highlight={appDownload.highlight}
            body={appDownload.body}
            tone="onBrand"
            align="center"
            className="lg:items-start lg:text-left"
          />

          {/* Both badges share one width so the pair reads as a set. */}
          <ul className="mx-auto mt-9 flex w-full max-w-[17.5rem] flex-col gap-3.5 lg:mx-0">
            {appStores.map((store) => {
              const Icon = badgeIcon[store.platform];

              return (
                <li
                  key={store.platform}
                  className={cn(
                    "inline-flex w-full items-center gap-3 rounded-full px-7 py-3.5 font-display text-sm font-extrabold tracking-tight shadow-[0_18px_34px_-14px_rgba(0,10,40,0.75)]",
                    badgeTone[store.platform],
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  {store.label}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Two stacked drop-shadows: a tight contact shadow under the device
            and a wide soft one, so the phone lifts off the blue band. */}
        <div className="mx-auto w-56 shrink-0 sm:w-64 lg:w-72">
          <Image
            src={appDownload.mockup.src}
            alt={appDownload.mockup.alt}
            width={1200}
            height={2054}
            sizes="(min-width: 1024px) 18rem, (min-width: 640px) 16rem, 14rem"
            className="h-auto w-full [filter:drop-shadow(0_16px_20px_rgba(0,10,40,0.45))_drop-shadow(0_48px_60px_rgba(0,8,30,0.55))]"
          />
        </div>

        <div className="flex flex-col items-center gap-7 text-center">
          <h3 className="max-w-xs text-2xl text-white sm:text-3xl">{appDownload.qr.heading}</h3>

          <div className="rounded-card bg-white/12 p-4 ring-1 ring-white/25 backdrop-blur">
            <Image
              src={appDownload.qr.src}
              alt={appDownload.qr.alt}
              width={200}
              height={200}
              className="size-36 rounded-[6px] bg-white p-2 sm:size-44"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
