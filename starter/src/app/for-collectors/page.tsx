import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { CollectionPreview } from "@/components/sections/CollectionPreview";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { StepFlow } from "@/components/sections/StepFlow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { collectionJourney, previewCollectibles, whyJoin } from "@/data/collectors";

export const metadata: Metadata = {
  title: "For Collectors",
  description:
    "HitBox gives collectors a way to organize physical collectibles, access connected experiences, and build collections that continue growing over time.",
};

export default function ForCollectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="For collectors"
        title="Built for collectors"
        body="HitBox gives collectors a way to organize physical collectibles, access connected experiences, and build collections that continue growing over time."
      />

      <Section>
        <SectionHeading
          eyebrow="Why join"
          title="Why join HitBox?"
          body="HitBox extends the value of physical collectibles by connecting them to a digital platform that allows collectors to organize, revisit, and interact with their collections."
        />
        <FeatureGrid features={whyJoin} className="mt-12" />
      </Section>

      <Section bordered tone="raised">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <SectionHeading
            eyebrow="The journey"
            title="From collectible to collection"
            body="Each collectible follows the same path, and stays in your account once it arrives there."
          />

          <StepFlow steps={collectionJourney} variant="chain" />
        </div>
      </Section>

      <Section bordered>
        <SectionHeading
          eyebrow="Account preview"
          title="Your HitBox collection"
          body="A preview of how claimed collectibles appear inside a HitBox account. The entries below show the interface only — artwork and release details arrive with the first collectibles."
        />
        <CollectionPreview items={previewCollectibles} className="mt-12" />
      </Section>

      <Section bordered tone="raised" width="narrow">
        <SectionHeading
          eyebrow="Over time"
          title="Your collection grows over time"
          body="Every new collectible claimed through HitBox is automatically added to the appropriate collection, making it easy to build and manage larger collections over time."
          align="center"
        />
      </Section>

      <CtaSection
        title="Be first in line"
        body="Join the waitlist to hear about product launches, artist partnerships and platform updates as they are announced."
        primary={{ label: "Join Waitlist", href: "/join-waitlist" }}
        secondary={{ label: "Learn How It Works", href: "/how-it-works" }}
      />
    </>
  );
}
