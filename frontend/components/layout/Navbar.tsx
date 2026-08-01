import Link from "next/link";

import ChatCta from "@/components/layout/ChatCta";
import Container from "@/components/layout/Container";
import MobileMenu from "@/components/layout/MobileMenu";
import { NAV_LINKS } from "@/components/layout/nav-links";

/**
 * Non-sticky by deliberate choice — the mockup shows no scroll state. `relative`
 * is here so the mobile panel can anchor to the full width of the header rather
 * than to the nav row.
 *
 * Below `md` the inline links and CTA collapse into MobileMenu, since neither
 * fits alongside the wordmark at 375px.
 */
export default function Navbar() {
  return (
    <header className="relative border-b border-neutral-200 bg-neutral-100/50">
      <Container>
        <nav aria-label="Main" className="flex h-16 items-center gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800"
          >
            {/* Decorative: the wordmark beside it already names the brand. */}
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-lg bg-brand-800 font-serif text-sm font-semibold text-white"
            >
              T
            </span>
            <span className="font-serif text-lg tracking-tight text-neutral-900">
              Terra &amp; Co.
            </span>
          </Link>

          {/*
            `flex-1` centres the links in the space left between the wordmark
            and the CTA — which lands them slightly left of the page centre,
            matching the mockup, since the CTA is wider than the wordmark.
          */}
          <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  // Single page for now, so Home is always the current one.
                  aria-current={href === "/" ? "page" : undefined}
                  className="rounded text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-800 aria-[current]:text-neutral-900"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ChatCta className="hidden shrink-0 md:inline-flex" />

          <MobileMenu className="ml-auto md:hidden" />
        </nav>
      </Container>
    </header>
  );
}
