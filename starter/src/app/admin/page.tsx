import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/Icons";
import {
  artistLeadRows,
  messageRows,
  partnerLeadRows,
  waitlistRows,
} from "@/data/admin";

const stats = [
  { label: "Total waitlist signups", value: waitlistRows.length, href: "/admin/waitlist" },
  { label: "Artist inquiries", value: artistLeadRows.length, href: "/admin/artist-leads" },
  { label: "Business partner inquiries", value: partnerLeadRows.length, href: "/admin/partner-leads" },
  { label: "Contact messages", value: messageRows.length, href: "/admin/messages" },
];

export default function AdminOverviewPage() {
  return (
    <>
      <h1 className="font-display text-2xl font-semibold sm:text-3xl">Overview</h1>
      <p className="mt-3 text-[15px] text-muted">
        Submission volume across every form on the site.
      </p>

      <div className="mt-9 grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group flex flex-col rounded-card border border-line bg-ink-soft p-6 transition-colors hover:border-line-strong hover:bg-ink-raised"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-subtle">
              {stat.label}
            </span>

            <span className="mt-4 font-display text-4xl font-semibold tabular-nums">
              {stat.value}
            </span>

            <span className="mt-5 inline-flex items-center gap-2 text-sm text-muted transition-colors group-hover:text-fg">
              View
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-card border border-line bg-ink-soft p-6">
        <h2 className="font-display text-lg font-semibold">Connecting live data</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          Every form on the site already validates and posts to its own API route. Persist those
          payloads to a database and point the arrays in{" "}
          <code className="rounded-[4px] bg-ink-raised px-1.5 py-0.5 text-[13px]">src/data/admin.ts</code>{" "}
          at the stored records — the tables, search, filtering, sorting and CSV export all work
          against whatever rows they are given.
        </p>
      </div>
    </>
  );
}
