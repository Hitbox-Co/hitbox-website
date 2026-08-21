import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export type LegalBlock = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  intro: string;
  updated: string;
  blocks: LegalBlock[];
  /** Shown when the copy is boilerplate that still needs professional review. */
  reviewNotice?: boolean;
};

/** Shared layout for Privacy Policy, Terms of Use and Accessibility. */
export function LegalPage({ title, intro, updated, blocks, reviewNotice = true }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} body={intro} watermark={false} />

      <section className="py-16 sm:py-24">
        <Container width="narrow">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-subtle">
            Last updated: {updated}
          </p>

          {reviewNotice ? (
            <div className="mt-8 rounded-card border border-line-strong bg-ink-soft p-5">
              <p className="text-sm leading-relaxed text-muted">
                <span className="font-display font-semibold text-fg">Placeholder copy.</span>{" "}
                This page contains standard template wording so the site is structurally complete.
                Have it reviewed and replaced by a qualified legal advisor before launch.
              </p>
            </div>
          ) : null}

          <div className="mt-12 flex flex-col gap-12">
            {blocks.map((block) => (
              <div key={block.heading}>
                <h2 className="font-display text-xl font-semibold sm:text-2xl">{block.heading}</h2>

                {block.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[15px] leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}

                {block.bullets?.length ? (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {block.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span
                          aria-hidden
                          className="mt-2.5 size-1 shrink-0 rounded-full bg-fg/45"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            <div className="border-t border-line pt-10">
              <h2 className="font-display text-xl font-semibold">Contact</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Questions about this page can be sent to{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-fg underline decoration-fg/30 underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
