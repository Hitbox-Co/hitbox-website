import type { Metadata } from "next";

import { PlaceholderMedia } from "@/components/brand/PlaceholderMedia";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqPreview } from "@/components/sections/FaqPreview";
import { StepFlow } from "@/components/sections/StepFlow";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";
import {
  collectibleFields,
  collectionTypes,
  experienceTypes,
  howItWorksFaq,
  lifecycleSteps,
} from "@/data/how-it-works";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Every HitBox collectible follows the same simple process, from receiving the physical item to accessing the connected digital experience.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="How HitBox works"
        body="Every HitBox collectible follows the same simple process. Once claimed, it becomes part of your HitBox account and can be revisited at any time."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <StepFlow steps={lifecycleSteps} />

          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <PlaceholderMedia label="Process artwork" ratio="portrait" />
          </div>
        </div>
      </Section>

      {/* Collections */}
      <Section bordered tone="raised">
        <SectionHeading
          eyebrow="Collections"
          title="Where your collectibles are filed"
          body="Claimed collectibles are grouped automatically based on the release they belong to."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collectionTypes.map((type) => (
            <Card key={type} className="flex items-center gap-3 py-5">
              <CheckIcon aria-hidden className="size-4 shrink-0 text-fg" />
              <span className="font-display text-[15px] font-medium">{type}</span>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-card border border-line bg-ink-soft p-7 sm:p-8">
          <h3 className="font-display text-lg font-semibold">Each collectible displays</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {collectibleFields.map((field) => (
              <li key={field} className="flex gap-3 text-[15px] text-muted">
                <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-fg/45" />
                {field}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Experiences */}
      <Section bordered>
        <SectionHeading
          eyebrow="Experiences"
          title="What a collectible can unlock"
          body="The available experience depends on the artist, creator, brand, or release behind each collectible."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experienceTypes.map((type) => (
            <Card key={type} className="py-5">
              <span className="font-display text-[15px] font-medium">{type}</span>
            </Card>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-muted">
          Collectors can return to previously claimed collectibles through their HitBox account.
          Every claimed collectible remains organized within its collection and continues to display
          any available experiences associated with that release.
        </p>
      </Section>

      <FaqPreview items={howItWorksFaq} />

      <CtaSection
        title="Ready when the first collectibles are"
        body="Join the waitlist for launch updates, or start a conversation about creating a collectible with HitBox."
        primary={{ label: "Join Waitlist", href: "/join-waitlist" }}
        secondary={{ label: "Work With HitBox", href: "/work-with-hitbox" }}
      />
    </>
  );
}
