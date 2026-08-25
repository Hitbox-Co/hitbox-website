"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNav } from "@/data/admin";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin sections">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {adminNav.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block whitespace-nowrap rounded-[8px] px-3.5 py-2.5 font-display text-sm font-semibold transition-colors",
                  active ? "bg-ink-raised text-fg" : "text-muted hover:bg-ink-soft hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
