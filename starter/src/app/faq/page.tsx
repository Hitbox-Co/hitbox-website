import type { Metadata } from "next";

import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";
import { faqCategories } from "@/data/faq";
import { slugify } from "@/lib/utils";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about HitBox.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        body="If your question is not answered here, contact the HitBox team directly."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            {/* Category jump list */}
            <nav aria-label="FAQ categories" className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
                Categories
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {faqCategories.map((category) => (
                  <li key={category.heading}>
                    <a
                      href={`#${slugify(category.heading)}`}
                      className="inline-block rounded-[6px] px-3 py-2 text-sm text-muted transition-colors hover:bg-ink-soft hover:text-fg lg:px-3"
                    >
                      {category.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-16">
              {faqCategories.map((category) => (
                <section key={category.heading} id={slugify(category.heading)} className="scroll-mt-28">
                  <h2 className="mb-6 font-display text-2xl font-semibold sm:text-3xl">
                    {category.heading}
                  </h2>
                  <Accordion items={category.items} />
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaSection
        title="Still have a question?"
        body="Send the HitBox team a message and we will get back to you."
        primary={{ label: "Contact HitBox", href: "/contact" }}
        secondary={{ label: "Join Waitlist", href: "/join-waitlist" }}
      />
    </>
  );
}
