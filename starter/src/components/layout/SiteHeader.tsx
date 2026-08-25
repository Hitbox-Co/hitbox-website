"use client";

import { Logo } from "@/components/brand/Logo";
import { MainNav } from "@/components/layout/MainNav";
import { MobileNav } from "@/components/layout/MobileNav";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerActions } from "@/data/navigation";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

/**
 * Two-tier header: a brand bar with the conversion actions, and a nav strip
 * beneath it. Transparent over the hero, solid once the page scrolls.
 */
export function SiteHeader() {
  const scrolled = useScrolled(40);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-80 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-ink/90 backdrop-blur-xl"
          : // Transparent over the hero art in the dark theme; in daylight the
            // bar stays opaque, since dark art would swallow dark type.
            "border-b border-transparent bg-linear-to-b from-ink/85 to-transparent light:border-line light:bg-ink/90 light:backdrop-blur-xl",
      )}
    >
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Logo />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href={headerActions.secondary.href}
              variant="brandOutline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {headerActions.secondary.label}
            </Button>
            <Button href={headerActions.primary.href} size="sm">
              {headerActions.primary.label}
            </Button>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "hidden border-t border-line/60 xl:block",
          scrolled ? "bg-ink/60" : "bg-ink/30",
        )}
      >
        <Container width="wide">
          <MainNav />
        </Container>
      </div>
    </header>
  );
}
