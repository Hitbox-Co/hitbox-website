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
 * Placeholder entries for the account preview. These describe the interface,
 * not real releases — no artist, product or partner names appear anywhere.
 */
export const previewCollectibles: CollectiblePlaceholder[] = [
  {
    id: "slot-1",
    name: "Collectible name",
    image: {
      src: "/worlds/bix-all-stars.jpg",
      alt: "HitBox key art: the Bix All Stars first anniversary poster.",
    },
    collection: "Artist collection",
    claimDate: "Claim date",
    edition: "Edition number",
    status: "Claimed",
  },
  {
    id: "slot-2",
    name: "Collectible name",
    image: {
      src: "/worlds/bix-stadium.jpg",
      alt: "HitBox key art: Bix in a football kit in a floodlit stadium.",
    },
    collection: "Tour collection",
    claimDate: "Claim date",
    status: "Claimed",
  },
  {
    id: "slot-3",
    name: "Collectible name",
    image: {
      src: "/worlds/bix-bubble-rumble.jpg",
      alt: "HitBox key art: Bix Bubble Rumble.",
    },
    collection: "Limited edition collection",
    claimDate: "Claim date",
    edition: "Edition number",
    status: "Claimed",
  },
];
