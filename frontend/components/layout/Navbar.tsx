import Placeholder from "@/components/Placeholder";
import Container from "@/components/layout/Container";

/**
 * Layout shell only — no links yet, and non-sticky by deliberate choice
 * (the mockup shows no scroll state). Revisit when the navbar becomes
 * its own feature.
 *
 * Below `md` the inline links and CTA collapse to a single menu-button slot,
 * since neither fits alongside the logo at 375px.
 */
export default function Navbar() {
  return (
    <header className="border-b border-neutral-200 bg-neutral-100/50">
      <Container className="py-3">
        <nav aria-label="Main" className="flex items-center gap-4">
          <Placeholder label="Logo" className="h-9 w-32 shrink-0 sm:w-36" />
          <Placeholder label="Nav links" className="hidden h-9 flex-1 md:block" />
          <Placeholder
            label="Header CTA"
            className="hidden h-9 w-44 shrink-0 md:block"
          />
          <Placeholder
            label="Menu"
            className="ml-auto h-9 w-9 shrink-0 md:hidden"
          />
        </nav>
      </Container>
    </header>
  );
}
