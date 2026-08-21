import type { Metadata } from "next";

import { BusinessPartnerForm } from "@/components/forms/BusinessPartnerForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { businessAudience } from "@/data/artists";

export const metadata: Metadata = {
  title: "Business Partner Inquiry",
  description: "Tell the HitBox team how your company would like to work with the platform.",
};

export default function BusinessPartnerInquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Business partner"
        title="Business partner inquiry"
        body="Tell us about your company and how you would like to work with HitBox. The team will review your inquiry and follow up."
        watermark={false}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:gap-16">
            <BusinessPartnerForm />

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-card border border-line bg-ink-soft p-7">
                <h2 className="font-display text-lg font-semibold">Who this is for</h2>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {businessAudience.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-ink-raised px-3 py-1.5 text-sm text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 border-t border-line pt-6 text-sm leading-relaxed text-subtle">
                  Working on a music or creator release instead? Use the artist inquiry so it reaches
                  the right team.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
