"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { primaryNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

/** Desktop navigation strip beneath the brand bar. */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex items-center justify-center gap-1">
        {primaryNav.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative block px-4 py-3.5 font-display text-sm font-extrabold uppercase tracking-[0.06em] transition-colors",
                  active ? "text-fg light:text-brand" : "text-fg/70 hover:text-fg",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-3 bottom-1.5 h-0.5 origin-left bg-brand-bright light:bg-fg transition-transform duration-200",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
