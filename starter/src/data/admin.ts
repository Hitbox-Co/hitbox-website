/**
 * Admin dashboard configuration.
 *
 * The tables below are intentionally empty. Real rows appear once form
 * submissions are persisted (see the Phase 2 note in `src/lib/submissions.ts`)
 * — the dashboard is not seeded with invented leads.
 */

export type Column = {
  key: string;
  label: string;
  /** Renders wider for free-text columns. */
  wide?: boolean;
};

export type AdminRow = Record<string, string>;

export const adminNav = [
  { label: "Overview", href: "/admin" },
  { label: "Waitlist", href: "/admin/waitlist" },
  { label: "Artist leads", href: "/admin/artist-leads" },
  { label: "Partner leads", href: "/admin/partner-leads" },
  { label: "Messages", href: "/admin/messages" },
];

export const leadStatuses = ["New", "In review", "Contacted", "In progress", "Closed"];

export const waitlistColumns: Column[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email", wide: true },
  { key: "country", label: "Country" },
  { key: "interests", label: "Interests", wide: true },
  { key: "joinedAt", label: "Date joined" },
];

export const artistLeadColumns: Column[] = [
  { key: "artistName", label: "Artist name" },
  { key: "contactName", label: "Contact name" },
  { key: "status", label: "Status" },
  { key: "submittedAt", label: "Submission date" },
];

export const partnerLeadColumns: Column[] = [
  { key: "company", label: "Company" },
  { key: "contact", label: "Contact" },
  { key: "partnershipType", label: "Partnership type" },
  { key: "status", label: "Status" },
];

export const messageColumns: Column[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email", wide: true },
  { key: "subject", label: "Subject", wide: true },
  { key: "status", label: "Status" },
];

/** No data until submissions are persisted. */
export const waitlistRows: AdminRow[] = [];
export const artistLeadRows: AdminRow[] = [];
export const partnerLeadRows: AdminRow[] = [];
export const messageRows: AdminRow[] = [];
