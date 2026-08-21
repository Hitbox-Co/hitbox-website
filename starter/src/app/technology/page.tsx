import type { Metadata } from "next";

import { LogoMark } from "@/components/brand/LogoMark";
import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { technologyPillars } from "@/data/technology";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "HitBox connects physical collectibles with digital experiences using secure product authentication and cloud-based account management.",
};

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title="Technology"
        body="HitBox connects physical collectibles with digital experiences using secure product authentication and cloud-based account management."
      />

      <Section>
        <SectionHeading
          eyebrow="Platform"
          title="How the platform fits together"
          body="A high-level view of what happens between a physical collectible and the experience it unlocks."
          className="mb-14"
        />

        <div className="flex flex-col gap-4">
          {technologyPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="grid gap-6 rounded-card border border-line bg-ink-soft p-7 sm:grid-cols-[auto_1fr] sm:p-9"
              >
                <div className="flex items-start gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-[10px] border border-line bg-ink-raised text-fg">
                    <Icon className="size-5" />
                  </span>
                  <span
                    aria-hidden
                    className="hidden font-display text-sm font-semibold text-subtle sm:block"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold sm:text-2xl">{pillar.title}</h2>
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section bordered tone="raised" width="narrow">
        <div className="flex flex-col items-center text-center">
          <LogoMark aria-hidden className="h-12 w-auto opacity-70" />
          <p className="mt-8 text-[15px] leading-relaxed text-muted">
            HitBox does not publish implementation details or security architecture. If you are a
            technology partner and need a deeper technical conversation, get in touch through a
            business partner inquiry.
          </p>
        </div>
      </Section>

      <CtaSection
        title="See it end to end"
        body="Walk through the full lifecycle of a collectible, or join the waitlist for platform updates."
        primary={{ label: "Learn How It Works", href: "/how-it-works" }}
        secondary={{ label: "Join Waitlist", href: "/join-waitlist" }}
      />
    </>
  );
}
