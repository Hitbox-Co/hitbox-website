import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CtaSectionProps = {
  title: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** The closing call-to-action band that ends every page. */
export function CtaSection({ title, body, primary, secondary }: CtaSectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <Container width="wide">
        <div className="relative overflow-hidden rounded-card bg-linear-to-r from-brand via-brand-bright to-navy px-8 py-14 text-white sm:px-14 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full border-[40px] border-white/10"
          />
          <LogoMark
            aria-hidden
            tone="onDark"
            className="pointer-events-none absolute -bottom-16 right-8 h-64 w-auto opacity-10"
          />

          <div className="relative max-w-2xl">
            <LogoMark aria-hidden tone="onDark" className="mb-7 h-10 w-auto" />

            <h2 className="text-3xl sm:text-5xl">{title}</h2>
            {body ? (
              <p className="mt-5 max-w-lg font-body text-sm leading-relaxed text-white sm:text-base">
                {body}
              </p>
            ) : null}

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={primary.href} variant="light" size="lg">
                {primary.label}
              </Button>
              {secondary ? (
                <Button href={secondary.href} variant="onArt" size="lg">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
