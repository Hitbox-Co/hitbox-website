import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { PosterFan } from "@/components/sections/PosterFan";
import { StepCarousel } from "@/components/sections/StepCarousel";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { artistFaq, partnershipProcess, whyPartner } from "@/data/artists";
import { artistMerch } from "@/data/merch";

export const metadata: Metadata = {
  title: "For Artists & Creators",
  description:
    "HitBox allows artists and creators to connect digital experiences to physical collectibles, creating new ways for collectors to engage with each release.",
};

export default function ForArtistsPage() {
  return (
    <>
      <PageHero
        align="center"
        bordered={false}
        eyebrow="For artists & creators"
        title="Built for"
        highlight="Artists & Creators"
        body="HitBox allows artists and creators to connect digital experiences to physical collectibles, creating new ways for collectors to engage with each release."
      >
        <Button href="/join-waitlist" size="lg">
          Join Waitlist
        </Button>
      </PageHero>

      <Section className="pt-0">
        <PosterFan items={artistMerch} priority />
      </Section>

      <Section tone="brand">
        <SectionHeading
          eyebrow="Why partner"
          title="Why partner with HitBox?"
          body="HitBox combines physical merchandise with digital experiences, allowing artists to build collectible campaigns around albums, tours, events, product launches, and future releases."
          tone="onBrand"
        />
        <FeatureGrid features={whyPartner} tone="onBrand" className="mt-12" />
      </Section>

      <Section bordered tone="raised">
        <SectionHeading
          align="center"
          eyebrow="Process"
          title="How we work"
          highlight="together"
          body="Every project moves through the same stages, with approval points along the way."
        />

        <StepCarousel
          steps={partnershipProcess}
          label="Partnership process"
          className="mt-14"
        />
      </Section>

      {/* <FaqPreview title="Artist & creator questions" items={artistFaq} /> */}

      <CtaSection
        title="Start a conversation"
        body="Tell us about the release or campaign you have in mind and the HitBox team will follow up."
        primary={{ label: "Start Artist Inquiry", href: "/work-with-hitbox/artist-inquiry" }}
        secondary={{ label: "Contact HitBox", href: "/contact" }}
      />
    </>
  );
}
