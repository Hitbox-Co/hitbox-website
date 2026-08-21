import type { FaqItem, Step } from "@/types";

export const lifecycleSteps: Step[] = [
  {
    title: "Receive or purchase",
    body: "Collectors receive a HitBox collectible through an artist, creator, event, retailer, promotional campaign, or future online purchase.",
  },
  {
    title: "Scan",
    body: "Use a compatible mobile device to scan or tap the collectible. The scan opens the HitBox experience for that specific collectible.",
    points: ["Scan the collectible.", "Open the connected experience.", "Continue to the claim process."],
  },
  {
    title: "Claim",
    body: "Sign in or create a HitBox account to claim the collectible. Once claimed, the collectible becomes associated with that account.",
    points: ["Sign in or create an account.", "Confirm the claim.", "Add the collectible to your account."],
  },
  {
    title: "Save to collection",
    body: "After claiming the collectible, it is automatically added to the appropriate collection inside your HitBox account.",
  },
  {
    title: "Unlock the experience",
    body: "Each collectible can include its own digital experience. The available experience depends on the artist, creator, brand, or release.",
  },
];

/** Collection types a claimed collectible may be filed under. */
export const collectionTypes: string[] = [
  "Artist collections",
  "Tour collections",
  "Event collections",
  "Sports collections",
  "Brand collections",
  "Limited edition collections",
];

/** Fields surfaced on each collectible inside an account. */
export const collectibleFields: string[] = [
  "Collectible name",
  "Collection name",
  "Claim date",
  "Edition (when applicable)",
  "Status",
];

/** The kinds of experience a release may include. */
export const experienceTypes: string[] = [
  "Exclusive content",
  "Digital rewards",
  "Collectible information",
  "Behind-the-scenes content",
  "Early access opportunities",
  "Limited-time experiences",
];

export const howItWorksFaq: FaqItem[] = [
  {
    question: "Do I need an account?",
    answer:
      "Yes. Claiming a collectible associates it with a HitBox account, which is what allows it to be saved to a collection and revisited later.",
  },
  {
    question: "Can I claim a collectible more than once?",
    answer:
      "A collectible is claimed to a single account. Once it has been claimed, it stays associated with that account.",
  },
  {
    question: "What happens if I lose my collectible?",
    answer:
      "Collectibles already claimed to your account remain in your collection, and the connected experiences stay accessible from your account.",
  },
  {
    question: "Do all collectibles include the same experiences?",
    answer:
      "No. The experience connected to a collectible is created for that specific release and is determined by the artist, creator, or brand behind it.",
  },
];
