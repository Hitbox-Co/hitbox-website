import type { Metadata } from "next";

import { LogoMark } from "@/components/brand/LogoMark";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadershipSlots, mission, values, vision } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "HitBox is building a platform that combines physical collectibles with digital experiences.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About"
        highlight="HitBox"
        body="HitBox is building a platform that combines physical collectibles with digital experiences. Our goal is to give collectors, artists, creators, and brands a new way to interact with collectibles beyond the physical product."
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {[mission, vision].map((block) => (
            <Card key={block.heading} className="flex flex-col p-8 sm:p-10">
              <LogoMark aria-hidden className="mb-7 h-9 w-auto opacity-70" />
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">{block.heading}</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{block.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section bordered tone="raised">
        <SectionHeading
          eyebrow="Values"
          title="Our values"
          body="Four principles that decide what we build and what we leave out."
        />
        <FeatureGrid features={values} className="mt-12" />
      </Section>

      <Section bordered>
        <SectionHeading
          eyebrow="Team"
          title="Leadership"
          body="Leadership profiles will be published here once they are finalized."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: leadershipSlots }, (_, index) => (
            <Card key={index} className="flex flex-col items-start">
              <div className="grid size-16 place-items-center rounded-full border border-line bg-ink-raised">
                <LogoMark aria-hidden className="h-6 w-auto opacity-25" />
              </div>

              <div className="mt-6 h-3.5 w-32 rounded-full bg-fg/10" aria-hidden />
              <div className="mt-3 h-3 w-24 rounded-full bg-fg/6" aria-hidden />
              <div className="mt-6 flex w-full flex-col gap-2" aria-hidden>
                <div className="h-2.5 w-full rounded-full bg-fg/6" />
                <div className="h-2.5 w-11/12 rounded-full bg-fg/6" />
                <div className="h-2.5 w-3/5 rounded-full bg-fg/6" />
              </div>

              <span className="mt-7 rounded-full border border-line px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-subtle">
                Profile coming soon
              </span>
            </Card>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Talk to the team"
        body="Whether you are a collector, an artist or a potential partner, we would like to hear from you."
        primary={{ label: "Contact HitBox", href: "/contact" }}
        secondary={{ label: "Work With HitBox", href: "/work-with-hitbox" }}
      />
    </>
  );
}
