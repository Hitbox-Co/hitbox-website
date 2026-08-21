import type { Metadata } from "next";

import { LogoMark } from "@/components/brand/LogoMark";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Join the Waitlist",
  description:
    "Sign up to receive updates about artist partnerships, future product launches, platform updates, and major announcements.",
};

const promises = [
  "Artist and creator partnership announcements",
  "Product launches and availability",
  "Platform updates as features go live",
  "Major company announcements",
];

export default function JoinWaitlistPage() {
  return (
    <>
      <PageHero
        eyebrow="Waitlist"
        title="Join the waitlist"
        body="Sign up to receive updates about artist partnerships, future product launches, platform updates, and major announcements."
      />

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr] lg:gap-16">
            <WaitlistForm />

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-card border border-line bg-ink-soft p-7">
                <LogoMark aria-hidden className="h-9 w-auto opacity-70" />

                <h2 className="mt-7 font-display text-xl font-semibold">What you will receive</h2>

                <ul className="mt-5 flex flex-col gap-3">
                  {promises.map((promise) => (
                    <li key={promise} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-fg/45" />
                      {promise}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-line pt-6 text-sm leading-relaxed text-subtle">
                  HitBox has not announced a launch date. Signing up simply means you hear about it
                  first.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
