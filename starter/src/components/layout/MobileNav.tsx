"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { headerActions, primaryNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/lib/utils";

/** Matches the `lg:hidden` on the drawer — above this the overlay is gone. */
const DESKTOP_QUERY = "(min-width: 1024px)";

/** Full-screen navigation overlay for tablet and phone widths. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const openButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);

  // Portals need a DOM target, which does not exist during SSR.
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setOpen(false), []);

  // Close whenever navigation actually happens.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Above `lg` the drawer is display:none, but the scroll lock lives on the
  // open state — so widening the window with the menu open froze the page with
  // no visible control to release it. Closing on the breakpoint fixes that.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const sync = () => {
      if (query.matches) setOpen(false);
    };

    sync();
    // Both signals: `change` is the precise one, but a plain resize listener
    // also covers environments where the media query never re-fires.
    query.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  // Move focus into the drawer when it opens and hand it back on close, so
  // keyboard users are never left on a control hidden behind the overlay.
  useEffect(() => {
    if (open) closeButton.current?.focus();
    else if (document.activeElement === document.body) openButton.current?.focus();
  }, [open]);

  const drawer = (
    /* `inert` while closed: the panel stays mounted for the fade, so without
       it every link inside remains tabbable and the dialog keeps announcing
       itself even though nothing is visible. */
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-100 flex flex-col bg-ink transition-opacity duration-200 lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <Logo />
        <button
          ref={closeButton}
          type="button"
          onClick={close}
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
                  // Tapping the current page's link does not change the
                  // pathname, so the navigation effect never fires — without
                  // this the menu stays open over the page you are on.
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block w-fit py-3 font-display text-2xl font-extrabold uppercase transition-colors",
                    active ? "text-fg light:text-brand" : "text-fg/70 hover:text-fg",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-1.5 h-0.5 origin-left bg-brand-bright light:bg-fg transition-transform duration-200",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line px-5 py-6">
        <div className="flex flex-col gap-3" onClick={close}>
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
                onClick={close}
                className="font-body text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={openButton}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-[4px] text-fg transition-colors hover:bg-fg/10 lg:hidden"
      >
        <MenuIcon className="size-6" />
      </button>

      {/* Rendered into <body>, not here. The header switches on backdrop-blur
          once the page scrolls, and a backdrop filter makes that element the
          containing block for fixed descendants — which collapsed this overlay
          into the 64px header bar instead of covering the viewport. */}
      {mounted ? createPortal(drawer, document.body) : null}
    </>
  );
}
