import type { Metadata } from "next";

import { LogoMark } from "@/components/brand/LogoMark";
import { AdminNav } from "@/components/admin/AdminNav";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24">
      <Container className="!max-w-7xl py-10">
        {/* Internal-only banner — this area has no authentication yet. */}
        <div className="mb-8 flex items-center gap-3 rounded-card border border-line-strong bg-ink-soft px-5 py-3.5">
          <LogoMark aria-hidden className="h-5 w-auto shrink-0 opacity-70" />
          <p className="text-sm text-muted">
            <span className="font-display font-semibold text-fg">Internal use only.</span> Add
            authentication before this dashboard is deployed publicly.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[190px_1fr] lg:gap-12">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <AdminNav />
          </aside>

          <div>{children}</div>
        </div>
      </Container>
    </div>
  );
}
