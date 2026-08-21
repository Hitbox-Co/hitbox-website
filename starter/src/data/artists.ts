import { CampaignIcon, ControlsIcon, CubeIcon, LoopIcon } from "@/components/ui/Icons";
import type { FaqItem, Feature, Step } from "@/types";

export const whyPartner: (Feature & { icon: typeof CubeIcon })[] = [
  {
    icon: CubeIcon,
    title: "Connected merchandise",
    body: "Create physical collectibles that connect to digital experiences.",
  },
  {
    icon: LoopIcon,
    title: "Collector engagement",
    body: "Give collectors additional reasons to interact with each collectible after purchase.",
  },
  {
    icon: CampaignIcon,
    title: "Campaign support",
    body: "Build collectible experiences around releases, tours, events, anniversaries, and promotional campaigns.",
  },
  {
    icon: ControlsIcon,
    title: "Creative control",
    body: "Artists approve the experiences connected to their collectibles.",
  },
];

export const partnershipProcess: Step[] = [
  { title: "Initial conversation" },
  { title: "Planning" },
  { title: "Product & experience design" },
  { title: "Sample approval" },
  { title: "Production" },
  { title: "Launch" },
];

export const artistFaq: FaqItem[] = [
  {
    question: "Who can work with HitBox?",
    answer:
      "Musicians, bands, creators, managers, labels, rights holders, and brands can all start a conversation with the HitBox team through an artist inquiry.",
  },
  {
    question: "Does HitBox own my content?",
    answer:
      "No. Artists and creators retain ownership of their content and approve the experiences connected to their collectibles.",
  },
  {
    question: "Can experiences change over time?",
    answer:
      "Yes. An experience connected to a collectible can be updated after launch, subject to what is agreed for that project.",
  },
  {
    question: "Who manufactures the collectibles?",
    answer:
      "Manufacturing is arranged as part of each project. Details are agreed during planning and product design, before any production begins.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "Timelines depend on the type of collectible, the experience being built, and production requirements. Timing is scoped during the initial conversation.",
  },
];

/** Who each inquiry route is intended for, shown on Work With HitBox. */
export const artistAudience: string[] = [
  "Musicians",
  "Bands",
  "Creators",
  "Managers",
  "Labels",
  "Rights holders",
];

export const businessAudience: string[] = [
  "Manufacturers",
  "Retailers",
  "Technology partners",
  "Licensing partners",
  "Event companies",
  "Marketing partners",
  "Investors",
];
