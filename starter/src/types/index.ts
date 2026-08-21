/** Shared domain types. */

export type NavLink = {
  label: string;
  href: string;
};

export type FooterGroup = {
  heading: string;
  links: NavLink[];
};

/** A titled block of copy used in feature grids throughout the site. */
export type Feature = {
  title: string;
  body: string;
};

/** One stage in a sequential flow (claim lifecycle, partnership process). */
export type Step = {
  title: string;
  body?: string;
  /** Bullet points shown under the step body. */
  points?: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  heading: string;
  items: FaqItem[];
};

/** Shape of a collectible tile in the account preview. Structure only — the
 *  preview renders placeholder entries, never real artists or products. */
export type CollectiblePlaceholder = {
  id: string;
  name: string;
  collection: string;
  claimDate: string;
  edition?: string;
  status: string;
};
