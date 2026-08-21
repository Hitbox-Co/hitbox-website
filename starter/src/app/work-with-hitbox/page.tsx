import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { artistAudience, businessAudience } from "@/data/artists";

export const metadata: Metadata = {
  title: "Work With HitBox",
  description:
    "Choose the option that best describes how you would like to work with HitBox.",
};

const options = [
  {
    eyebrow: "Option one",
    title: "Artist & creator",
    audience: artistAudience,
    cta: { label: "Start Artist Inquiry", href: "/work-with-hitbox/artist-inquiry" },
  },
  {
    eyebrow: "Option two",
    title: "Business partner",
    audience: businessAudience,
    cta: {
      label: "Start Business Partner Inquiry",
      href: "/work-with-hitbox/business-partner-inquiry",
    },
  },
];

export default function WorkWithHitBoxPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnerships"
        title="Work with HitBox"
        body="Choose the option below that best describes how you would like to work with HitBox."
      />

      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {options.map((option) => (
            <article
              key={option.title}
              className="flex flex-col rounded-card border border-line bg-ink-soft p-8 transition-colors hover:border-line-strong sm:p-10"
            >
              <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-subtle">
                {option.eyebrow}
              </span>

              <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
                {option.title}
              </h2>

              <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                For
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {option.audience.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-ink-raised px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <Button href={option.cta.href} size="lg" className="mt-9 self-start">
                {option.cta.label}
              </Button>
            </article>
          ))}
        </div>
      </Section>

      <Section bordered tone="raised" width="narrow">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">General contact</h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">
            If neither option applies, contact the HitBox team directly.
          </p>
          <Button href="/contact" variant="secondary" size="lg" className="mt-8">
            Contact HitBox
          </Button>
        </div>
      </Section>
    </>
  );
}
