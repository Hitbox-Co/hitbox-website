import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { Container } from "@/components/ui/Container";
import { footerGroups } from "@/data/navigation";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-navy-deep light:bg-ink-soft">
      <Container width="wide" className="py-16">
        {/* Waitlist capture, styled as the footer's brand panel */}
        <div className="overflow-hidden rounded-card bg-linear-to-br from-brand to-navy-deep p-8 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-2xl sm:text-4xl">Join the HitBox waitlist</h2>
              <p className="mt-4 max-w-md font-body text-sm leading-relaxed text-white">
                Sign up to get artist partnership news, product launches and platform updates
                straight to your inbox.
              </p>
            </div>

            <WaitlistForm compact variant="onBrand" />
          </div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block font-body text-sm text-muted underline decoration-fg/25 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
            >
              {site.email}
            </a>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-sm tracking-[0.12em] text-fg">{group.heading}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8">
          <div className="flex flex-wrap items-center gap-4">
            <label
              htmlFor="language"
              className="font-body text-xs uppercase tracking-[0.14em] text-muted"
            >
              Choose your language
            </label>
            <select
              id="language"
              defaultValue="en"
              className="h-9 rounded-[4px] border border-line bg-ink/60 px-3 font-body text-sm text-fg focus:border-brand-bright focus:outline-none"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-xs text-subtle">
              © {year} {site.name}. All rights reserved.
            </p>
            <p className="font-body text-xs text-subtle">
              HitBox is pre-launch. Products, partnerships and release dates will be announced here
              first.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
