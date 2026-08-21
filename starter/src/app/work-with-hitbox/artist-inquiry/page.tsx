import type { Metadata } from "next";

import { ArtistInquiryForm } from "@/components/forms/ArtistInquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { StepFlow } from "@/components/sections/StepFlow";
import { Container } from "@/components/ui/Container";
import { partnershipProcess } from "@/data/artists";

export const metadata: Metadata = {
  title: "Artist Inquiry",
  description: "Tell the HitBox team about the collectible experience you would like to create.",
};

export default function ArtistInquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Artist & creator"
        title="Artist inquiry"
        body="Tell us about the release or campaign you have in mind. The HitBox team will follow up to arrange an initial conversation."
        watermark={false}
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:gap-16">
            <ArtistInquiryForm />

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-card border border-line bg-ink-soft p-7">
                <h2 className="font-display text-lg font-semibold">What happens next</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Every project moves through the same stages, with approval points along the way.
                </p>
                <StepFlow steps={partnershipProcess} variant="chain" className="mt-7" />
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
