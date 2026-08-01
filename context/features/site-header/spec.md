# Spec: Site Header

## Goal

Replace the navbar's placeholder slots with the real header from
[context/ui-interface.png](../../ui-interface.png): brand mark + "Terra & Co."
wordmark on the left, the three nav links centred, and a dark pill
"Chat with our AI Agent" CTA on the right — with a working menu below `md`.
It is the first region of the shell to become real content, so it also lands the
two shared design tokens (brand green, serif display face) that the hero and
footer will reuse.

## Acceptance Criteria

### Structure and content

- [ ] `frontend/components/layout/Navbar.tsx` imports no `Placeholder`; the
      component tree contains no dashed-border placeholder regions.
- [ ] Header renders a brand link to `/` whose accessible name contains
      "Terra & Co.", composed of an inline SVG mark plus the wordmark text.
- [ ] Wordmark renders in the serif display face (`font-serif` resolving to the
      new `--font-serif` token), not the body sans.
- [ ] Three nav links render with these exact `href`s: Home → `/`,
      Listings → `#featured-properties`, Contact → `#contact`.
- [ ] Home carries `aria-current="page"` (single-page site; revisit when real
      routes exist).
- [ ] CTA renders as a link to `#chat`, accessible name "Chat with our AI Agent",
      containing an inline chat-bubble SVG marked `aria-hidden`.
- [ ] The anchor targets exist: `PropertyGrid`'s section has
      `id="featured-properties"`, `ChatPanel`'s section has `id="chat"` and
      `tabIndex={-1}` so anchor navigation moves keyboard focus, `Footer` has
      `id="contact"`. Each scroll target carries a `scroll-mt-*` utility.
- [ ] Existing landmark contract still holds: one `<header>` (banner) containing
      one `<nav aria-label="Main">`.

### Responsive behaviour

- [ ] At `md` and up: inline nav links and CTA visible, menu button hidden.
- [ ] Below `md`: menu button visible, inline links and CTA hidden. Verified in a
      browser at 375px and 1440px; class-presence guards in tests only.
- [ ] Brand is visible at every width.
- [ ] Header content aligns to the shared `Container` — same left/right edge as
      hero, main, and footer.

### Mobile menu

- [ ] Menu button toggles a panel containing the three nav links and the CTA.
- [ ] Button has `aria-expanded` reflecting state, `aria-controls` pointing at
      the panel's `id`, and an accessible name that states the action
      ("Open menu" / "Close menu").
- [ ] Panel is absent from the DOM when closed (not merely hidden), so closed-state
      links are not tabbable or duplicated in the accessibility tree.
- [ ] `Escape` closes the panel; a click outside it closes it; activating any link
      inside it closes it.
- [ ] Only `Navbar` (or a child of it) becomes a client component — `app/page.tsx`
      and the other region components stay server components.

### Design tokens (`frontend/app/globals.css`)

- [ ] `@theme` gains a brand green scale used by the CTA and brand mark, with a
      distinct hover value. No hard-coded hex outside `globals.css`.
- [ ] Serif display font loaded via `next/font/google` in `app/layout.tsx` and
      exposed as `--font-serif` in `@theme`; no `<link>` tags to Google Fonts.
- [ ] No `tailwind.config.ts` is created.

### Tests and build

- [ ] `pnpm build` and `pnpm test` pass from `frontend/`.
- [ ] `tests/scope-boundaries.test.tsx` still guards the *unbuilt* regions: its
      "no links / no headings / no images" assertions are re-scoped to exclude the
      header rather than deleted.
- [ ] `tests/regions.test.tsx`'s Navbar block is rewritten against real content
      (links, hrefs, breakpoint classes) instead of placeholder labels.
- [ ] New tests cover: brand link, the three hrefs, CTA href and name, menu
      toggle, `aria-expanded` flip, Escape-to-close, link-click-to-close.
- [ ] Tests that query links scope with `within(...)` so an open mobile panel's
      duplicate links don't make queries ambiguous.

## Out of Scope

- Sticky / scroll-shadow header. The mockup shows no scroll state and the current
  shell is deliberately non-sticky; revisit as its own change.
- `/listings` and `/contact` as real routes, and any multi-page routing. Links are
  in-page anchors for now.
- Wiring the CTA to actually open, mount, or focus a chat *session* — it only
  navigates to the chat panel region, which is still a placeholder.
- Hero, property cards, chat panel, and footer content. Only the `id` and
  `scroll-mt` attributes those files need as anchor targets are touched here.
- Deleting `components/Placeholder.tsx` — other regions still use it.
- Dark mode, theme switching, i18n.
- Search input or filters in the header.

## Edge Cases

- **Long wordmark at 375px** — brand must not wrap or push the menu button off the
  row; brand is `shrink-0` and the row keeps the button pinned right.
- **Menu open, then viewport widens past `md`** — panel is `md:hidden`, so it
  disappears without closing state; narrowing again re-reveals it. Accepted as-is;
  a resize listener is not worth the client-side cost.
- **JS disabled / pre-hydration** — the menu button does nothing before hydration.
  The brand link and (at `md`+) all nav links and the CTA are plain anchors and
  work regardless.
- **`#chat` target below `lg`** — the chat panel sits after the property grid in
  flow, so the CTA scrolls a long way down. Correct, just a long jump.
- **Reduced motion** — if smooth scrolling is enabled for anchors, it must be
  gated behind `prefers-reduced-motion`; otherwise leave scrolling at the browser
  default and add nothing.

## Notes

- Mockup reference: [context/ui-interface.png](../../ui-interface.png). Header is
  the top band: near-white background, thin bottom rule, ~56px tall.
- Next 16 + Tailwind 4 — read `frontend/node_modules/next/dist/docs/01-app/`
  before reaching for remembered API shapes. Tailwind is configured only through
  `@theme`.
- jsdom applies no CSS, so every breakpoint/visual criterion above is a
  browser check; class assertions in tests are deletion guards and should say so
  in a comment (see `CLAUDE.md` → Frontend testing).
- Built in the worktree at `.claude/worktrees/feature+site-header` on branch
  `feature/site-header`, branched from local `main` (which is ahead of
  `origin/main` — the frontend scaffold is unpushed).
