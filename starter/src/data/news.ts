export type NewsPost = {
  id: string;
  title: string;
  /** Rendered as written, e.g. "12 March 2026" — not parsed or reformatted. */
  date: string;
  /** One or two sentences shown on the card. */
  excerpt: string;
  /** Where the item leads. Omit while a post has nowhere to link yet. */
  href?: string;
  /** Short label such as "Release" or "Platform". */
  tag?: string;
};

/**
 * Announcements, releases and platform updates.
 *
 * Intentionally empty — the page renders an honest empty state until there is
 * something real to publish, rather than shipping invented headlines. Add
 * entries here and the listing appears on its own.
 */
export const newsPosts: NewsPost[] = [];
