import {
  AccountIcon,
  CampaignIcon,
  ControlsIcon,
  CubeIcon,
  LayersIcon,
  LoopIcon,
  ScanIcon,
  SparkIcon,
  UnlockIcon,
} from "@/components/ui/Icons";
import type { Feature, Step } from "@/types";

export const hero = {
  heading: "A new way to collect.",
  body: "HitBox brings physical collectibles to life through connected digital experiences that continue long after the moment you collect them.",
  primary: { label: "Join Waitlist", href: "/join-waitlist" },
  secondary: { label: "See How It Works", href: "/how-it-works" },
  textLink: { label: "Work With HitBox", href: "/work-with-hitbox" },
} as const;

export const whatIsHitBox = {
  heading: "What is HitBox?",
  body: "HitBox is a platform that connects physical collectibles with digital experiences. By scanning and claiming a collectible, collectors can organize their collectibles into digital collections and unlock exclusive digital experiences and rewards.",
};

export const whatIsHitBoxFeatures: (Feature & { icon: typeof CubeIcon })[] = [
  {
    icon: CubeIcon,
    title: "Physical collectibles",
    body: "Physical products that connect to the HitBox platform.",
  },
  {
    icon: ScanIcon,
    title: "Digital claiming",
    body: "Collectors can claim supported collectibles to their HitBox account.",
  },
  {
    icon: LayersIcon,
    title: "Digital collections",
    body: "Claimed collectibles are automatically organized into collections inside the user's account.",
  },
  {
    icon: SparkIcon,
    title: "Exclusive experiences & rewards",
    body: "Each collectible can unlock experiences and rewards created specifically for that release.",
  },
];

export const claimSteps: Step[] = [
  { title: "Receive or purchase", body: "Receive a HitBox collectible." },
  { title: "Scan", body: "Scan or tap the collectible with a compatible mobile device." },
  { title: "Claim", body: "Associate the collectible with your HitBox account." },
  {
    title: "Save to collection",
    body: "The collectible is automatically added to the appropriate collection.",
  },
  {
    title: "Unlock the experience",
    body: "Access the exclusive experiences and rewards connected to the collectible.",
  },
];

export const whyCollect: (Feature & { icon: typeof CubeIcon })[] = [
  {
    icon: LayersIcon,
    title: "Build digital collections",
    body: "Organize claimed collectibles into digital collections.",
  },
  {
    icon: ScanIcon,
    title: "Claim your collectibles",
    body: "Associate supported collectibles with your account.",
  },
  {
    icon: UnlockIcon,
    title: "Exclusive experiences",
    body: "Unlock content and rewards connected to each collectible.",
  },
  {
    icon: AccountIcon,
    title: "Everything in one place",
    body: "Manage all claimed collectibles from one account.",
  },
];

export const whyCreate: (Feature & { icon: typeof CubeIcon })[] = [
  {
    icon: CubeIcon,
    title: "Connected merchandise",
    body: "Connect physical collectibles to digital experiences.",
  },
  {
    icon: LoopIcon,
    title: "Long-term engagement",
    body: "Continue engaging collectors after the physical product has been received.",
  },
  {
    icon: CampaignIcon,
    title: "Campaign support",
    body: "Build collectible experiences around albums, tours, events, product launches, or special releases.",
  },
  {
    icon: ControlsIcon,
    title: "Creative control",
    body: "Artists control the experience connected to their collectibles.",
  },
];
