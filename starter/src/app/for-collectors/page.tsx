import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { CollectionPreview } from "@/components/sections/CollectionPreview";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { StepCarousel } from "@/components/sections/StepCarousel";
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
        title="Built for"
        highlight="collectors"
        body="HitBox gives collectors a way to organize physical collectibles, access connected experiences, and build collections that continue growing over time."
      />

      <Section tone="brand">
        <SectionHeading
          eyebrow="Why join"
          title="Why join HitBox?"
          body="HitBox extends the value of physical collectibles by connecting them to a digital platform that allows collectors to organize, revisit, and interact with their collections."
          tone="onBrand"
        />
        <FeatureGrid features={whyJoin} tone="onBrand" className="mt-12" />
      </Section>

      <Section bordered tone="raised">
        <SectionHeading
          align="center"
          eyebrow="The journey"
          title="From collectible to"
          highlight="collection"
          body="Each collectible follows the same path, and stays in your account once it arrives there."
        />

        <StepCarousel
          steps={collectionJourney}
          label="Collection journey"
          className="mt-14"
        />
      </Section>

      <Section tone="brand">
        <SectionHeading
          eyebrow="Account preview"
          title="Your HitBox collection"
          body="A preview of how claimed collectibles appear inside a HitBox account. The entries below show the interface only — artwork and release details arrive with the first collectibles."
          tone="onBrand"
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
