import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/layout/PageHero";
import { CtaSection } from "@/components/sections/CtaSection";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { newsPosts } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Announcements, releases and platform updates from HitBox Collectibles.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="HitBox news"
        body="Announcements, releases and platform updates. Everything published here is also sent to the waitlist first."
      />

      <Section>
        {newsPosts.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {newsPosts.map((post) => {
              const body = (
                <>
                  <div className="flex flex-wrap items-center gap-3">
                    <time className="font-body text-xs text-subtle">{post.date}</time>
                    {post.tag ? (
                      <span className="rounded-full border border-line px-2.5 py-0.5 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-bright">
                        {post.tag}
                      </span>
                    ) : null}
                  </div>

                  <h2 className="mt-3 text-lg leading-tight">{post.title}</h2>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </>
              );

              return (
                <li key={post.id}>
                  {post.href ? (
                    <Link href={post.href} className="block h-full">
                      <Card interactive className="h-full">
                        {body}
                      </Card>
                    </Link>
                  ) : (
                    <Card className="h-full">{body}</Card>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          /* No invented headlines. The page states plainly that nothing has
             been published and points at the channel that gets updates first. */
          <Card className="mx-auto max-w-xl text-center">
            <h2 className="text-xl sm:text-2xl">Nothing published yet</h2>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-muted">
              There are no announcements to show right now. Platform updates, product news and
              release announcements go to the waitlist first — join it and you will hear before
              anything appears here.
            </p>
            <Button href="/join-waitlist" className="mt-8">
              Join Waitlist
            </Button>
          </Card>
        )}
      </Section>

      <CtaSection
        title="Be first to hear"
        body="Join the waitlist for platform updates, product news and release announcements."
        primary={{ label: "Join Waitlist", href: "/join-waitlist" }}
        secondary={{ label: "Contact HitBox", href: "/contact" }}
      />
    </>
  );
}
