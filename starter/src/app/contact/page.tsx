import type { Metadata } from "next";

import { LogoMark } from "@/components/brand/LogoMark";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the HitBox team.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact HitBox"
        body="Send us a message and the team will get back to you."
        watermark={false}
      />

      {/* The form and the aside carry their own surfaces, so they read as
          panels sitting on the brand band rather than dissolving into it. */}
      <Section tone="brand" width="default">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.6fr] lg:gap-16">
          <ContactForm />

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-card border border-line bg-ink-soft p-7">
              <LogoMark aria-hidden className="h-9 w-auto opacity-70" />

              <h2 className="mt-7 font-display text-lg font-semibold">Email</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-[15px] text-muted underline decoration-fg/25 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
              >
                {site.email}
              </a>

              <h2 className="mt-8 font-display text-lg font-semibold">Follow</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="inline-block rounded-full border border-line bg-ink-raised px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-8 border-t border-line pt-6 text-sm leading-relaxed text-subtle">
                Looking to partner with HitBox? An artist or business inquiry reaches the right
                team faster than a general message.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
