"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { headerActions, primaryNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/utils";

/** Full-screen navigation overlay for tablet and phone widths. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useLockBodyScroll(open);

  // Close whenever navigation actually happens.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-[4px] text-fg transition-colors hover:bg-fg/10 xl:hidden"
      >
        <MenuIcon className="size-6" />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          "fixed inset-0 z-100 flex flex-col bg-ink transition-opacity duration-200 xl:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-10 place-items-center rounded-[4px] text-fg transition-colors hover:bg-fg/10"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
          <ul className="flex flex-col gap-1">
            {primaryNav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block py-3 font-display text-2xl font-extrabold uppercase transition-colors",
                      active ? "text-brand-bright" : "text-fg/90 hover:text-brand-bright",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-line px-5 py-6">
          <div className="flex flex-col gap-3">
            <Button href={headerActions.primary.href} size="lg" className="w-full">
              {headerActions.primary.label}
            </Button>
            <Button
              href={headerActions.secondary.href}
              variant="brandOutline"
              size="lg"
              className="w-full"
            >
              {headerActions.secondary.label}
            </Button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {site.social.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="font-body text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
