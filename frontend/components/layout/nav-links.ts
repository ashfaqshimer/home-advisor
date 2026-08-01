/**
 * Single source of truth for the header's navigation, shared by the desktop row
 * and the mobile panel. Lives in its own module rather than in Navbar.tsx
 * because Navbar imports MobileMenu — putting the data next to either one would
 * make the import cycle.
 *
 * These are in-page anchors, not routes: the site is one page, so `/listings`
 * and `/contact` would 404. Targets are declared by the regions themselves
 * (`PropertyGrid`, `Footer`, `ChatPanel`); if an `id` there is renamed, update
 * it here too — nothing type-checks that pairing.
 */
export type NavLink = {
  href: string;
  label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "#featured-properties", label: "Listings" },
  { href: "#contact", label: "Contact" },
];

/** Anchor for the chat panel, used by the CTA in both the row and the panel. */
export const CHAT_HREF = "#chat";
