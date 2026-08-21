import type { FaqCategory } from "@/types";

/**
 * Answers are intentionally non-committal where the company has not made a
 * public decision yet — no launch dates, partners, or product availability
 * are implied anywhere in this file.
 */
export const faqCategories: FaqCategory[] = [
  {
    heading: "General",
    items: [
      {
        question: "What is HitBox?",
        answer:
          "HitBox is a platform that connects physical collectibles with digital experiences. Collectors scan and claim a collectible, which organizes it into a digital collection and unlocks the experiences and rewards connected to that release.",
      },
      {
        question: "How does HitBox work?",
        answer:
          "You receive a HitBox collectible, scan or tap it with a compatible mobile device, and claim it to your HitBox account. The collectible is then saved to the appropriate collection, where you can revisit it and access its connected experience.",
      },
      {
        question: "Are products currently available?",
        answer:
          "Not yet. HitBox is pre-launch. Product availability, artist partnerships, and release information will be announced through this website and to people on the waitlist.",
      },
      {
        question: "Is HitBox free to use?",
        answer:
          "Creating a HitBox account and claiming a supported collectible is part of the collecting experience. Any future pricing or purchase options will be published before they become available.",
      },
      {
        question: "Do I need a HitBox account?",
        answer:
          "Yes. An account is what allows a collectible to be claimed, saved to a collection, and revisited later.",
      },
    ],
  },
  {
    heading: "Collectors",
    items: [
      {
        question: "How do I claim a collectible?",
        answer:
          "Scan or tap the collectible with a compatible mobile device, sign in or create a HitBox account, and confirm the claim. The collectible is then added to your account automatically.",
      },
      {
        question: "Can I own more than one collectible?",
        answer:
          "Yes. Every collectible you claim is added to your account and organized into the appropriate collection, so a collection can keep growing over time.",
      },
      {
        question: "Can I organize collectibles into collections?",
        answer:
          "Claimed collectibles are organized into collections automatically, based on the release they belong to — for example an artist, tour, event, sports, brand, or limited edition collection.",
      },
      {
        question: "What happens if I lose my collectible?",
        answer:
          "A collectible you have already claimed remains in your account, and the connected experiences stay accessible from your collection.",
      },
      {
        question: "Do all collectibles include the same experiences?",
        answer:
          "No. Each experience is created for a specific release, so what a collectible unlocks depends on the artist, creator, or brand behind it.",
      },
    ],
  },
  {
    heading: "Artists & Creators",
    items: [
      {
        question: "Who can partner with HitBox?",
        answer:
          "Musicians, bands, creators, managers, labels, rights holders, and brands can start a conversation with the HitBox team through an artist inquiry.",
      },
      {
        question: "Does HitBox manufacture collectibles?",
        answer:
          "Manufacturing is arranged as part of each project and confirmed during planning and product design, before production begins.",
      },
      {
        question: "Does HitBox own my content?",
        answer:
          "No. Artists and creators retain ownership of their content and approve the experiences connected to their collectibles.",
      },
      {
        question: "Can I choose what experiences are included?",
        answer:
          "Yes. Artists and creators determine and approve the experiences connected to each of their collectibles.",
      },
      {
        question: "How do I start a project?",
        answer:
          "Submit an artist inquiry with details about what you would like to create. The HitBox team will follow up to arrange an initial conversation.",
      },
    ],
  },
  {
    heading: "Technology",
    items: [
      {
        question: "How does scanning work?",
        answer:
          "Supported collectibles are scanned or tapped with a compatible mobile device, which opens the HitBox experience for that specific collectible and continues to the claim process.",
      },
      {
        question: "Is my account secure?",
        answer:
          "HitBox verifies collectibles before they are associated with an account and uses modern authentication practices to help protect user accounts and platform data.",
      },
      {
        question: "Can I access my collectibles from another device?",
        answer:
          "Yes. Claimed collectibles are tied to your HitBox account rather than to a single device, so you can sign in and access your collection elsewhere.",
      },
      {
        question: "Does every collectible connect to the platform?",
        answer:
          "Connected collectibles are designed to work with the platform. Whether a particular item is supported is confirmed for each individual release.",
      },
    ],
  },
  {
    heading: "Launch",
    items: [
      {
        question: "When will HitBox launch?",
        answer:
          "A launch date has not been announced. Timing will be shared publicly once it is confirmed.",
      },
      {
        question: "How do I stay updated?",
        answer:
          "Join the waitlist. Platform updates, product news, and major announcements are sent there first.",
      },
      {
        question: "When will artists be announced?",
        answer:
          "Artist partnerships will be announced once they are confirmed and the partners are ready to share them. Nothing has been announced yet.",
      },
    ],
  },
];

/** Flattened list used for the FAQ page's structured data. */
export const allFaqItems = faqCategories.flatMap((category) => category.items);
