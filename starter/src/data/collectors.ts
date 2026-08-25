import { AccountIcon, LayersIcon, ScanIcon, UnlockIcon } from "@/components/ui/Icons";
import type { CollectiblePlaceholder, Feature, Step } from "@/types";

export const whyJoin: (Feature & { icon: typeof ScanIcon })[] = [
  {
    icon: ScanIcon,
    title: "Claim your collectibles",
    body: "Associate supported collectibles with your HitBox account.",
  },
  {
    icon: LayersIcon,
    title: "Build digital collections",
    body: "Organize collectibles into artist, event, brand, sports, or other collections.",
  },
  {
    icon: UnlockIcon,
    title: "Unlock exclusive experiences",
    body: "Access digital experiences and rewards connected to each collectible.",
  },
  {
    icon: AccountIcon,
    title: "Everything in one account",
    body: "Manage every claimed collectible from one place.",
  },
];

export const collectionJourney: Step[] = [
  { title: "Receive or purchase" },
  { title: "Scan" },
  { title: "Claim" },
  { title: "Added to collection" },
  { title: "Unlock experience" },
  { title: "Revisit anytime" },
];

/**
 * Sample entries for the account preview.
 *
 * These are mock rows, not real releases — the surrounding card is labelled
 * "Interface preview — not a live account" so nothing here reads as a live
 * holding. Names, dates and edition numbers are illustrative.
 */
export const previewCollectibles: CollectiblePlaceholder[] = [
  {
    id: "mono-jersey",
    name: "Mono Jersey",
    image: {
      src: "/collection/jersey-mono.jpg",
      alt: "HitBox Collectibles jersey in black and white, lit against a blue backdrop.",
    },
    collection: "Brand collection",
    claimDate: "02 February 2026",
    edition: "Open edition",
    status: "Claimed",
  },
  {
    id: "bix-all-rounder",
    name: "Bix All-Rounder",
    image: {
      src: "/collection/bix-cricket-figure.jpg",
      alt: "Bix collectible figure in cricket whites and helmet, holding a bat on a lit display podium.",
    },
    collection: "Sports collection",
    claimDate: "14 March 2026",
    edition: "042 / 500",
    status: "Claimed",
  },
  {
    id: "azure-jersey",
    name: "Azure Jersey",
    image: {
      src: "/collection/jersey-azure.png",
      alt: "HitBox Collectibles jersey in blue and white, lit against a blue backdrop.",
    },
    collection: "Limited edition collection",
    claimDate: "28 January 2026",
    edition: "117 / 250",
    status: "Claimed",
  },
];
