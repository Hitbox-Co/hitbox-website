import { LogoMark } from "@/components/brand/LogoMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="iso-grid flex min-h-[80svh] items-center pt-24">
      <Container width="narrow" className="text-center">
        <LogoMark aria-hidden className="mx-auto h-14 w-auto opacity-25" />

        <p className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.24em] text-subtle">
          404
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted">
          The page you were looking for has moved or does not exist.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact HitBox
          </Button>
        </div>
      </Container>
    </section>
  );
}
