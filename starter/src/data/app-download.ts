import type { StoreBadge } from "@/types";

/** Copy and assets for the app download band on the home page.
 *
 *  The HitBox app is not released, so nothing here links out: the store
 *  badges are static and the QR code is a stand-in image. Swap `qr.src` and
 *  give the badges real hrefs once the listings exist. */
export const appDownload = {
  eyebrow: "Get the app",
  title: "Build collectibles",
  highlight: "effortlessly",
  body: "Start your collection with HitBox.",
  mockup: {
    src: "/app/hitbox-app-mockup.webp",
    alt: "The HitBox app on a phone, showing the Discover screen with a search field, the featured Hitbox Collectible Pack and a Trending Now row of the figurine and jerseys.",
  },
  qr: {
    heading: "Scan the QR code to download the app",
    src: "/app/download-qr.png",
    alt: "Placeholder QR code standing in for the app download link.",
  },
} as const;

export const appStores: StoreBadge[] = [
  { platform: "ios", label: "Download for iPhone" },
  { platform: "android", label: "Get it on Android" },
];
