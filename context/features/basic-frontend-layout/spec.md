# Spec: Basic Frontend Layout

## Goal

Strip the create-next-app boilerplate out of `frontend/` and replace the homepage
with an empty structural shell that matches the region layout of
[context/ui-interface.png](../../ui-interface.png) — navbar, hero, a two-column
main area (property grid + sticky chat panel), and footer. Every region is a
labelled empty placeholder; no copy, images, fonts, or colours from the mockup
are implemented here. Each region then becomes its own feature.

## Assumptions / Preconditions

- The user runs `create-next-app` themselves (App Router, TypeScript, Tailwind)
  into `frontend/`. **Done** — Next 16.2.12, React 19.2.4, Tailwind v4, pnpm.
- Tailwind v4 is configured via `@theme` in `globals.css`; there is no
  `tailwind.config.ts` and one should not be added.
- Package manager is pnpm, installed inside `frontend/` with no root workspace.
- Placeholder regions render with a visible dashed outline and their own name as
  a label, so the layout is verifiable in a browser without content.
- Stub component files are created at the paths already fixed by
  [PROJECT_OVERVIEW.md](../../PROJECT_OVERVIEW.md) §3, so later features fill in
  an existing file instead of choosing a new location.

## Acceptance Criteria

### Boilerplate removal

- [ ] `frontend/app/page.tsx` contains none of the create-next-app default
      markup — no `next.svg`/`vercel.svg` imports, no "Get started by editing"
      text, no default instruction list or footer links.
- [ ] `frontend/public/` contains no create-next-app default SVGs
      (`next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`).
- [ ] `frontend/app/globals.css` contains only the Tailwind import plus theme
      tokens that are deliberately kept — no leftover default `--background`/
      `--foreground` dark-mode block that isn't being used.
- [ ] `metadata` in `frontend/app/layout.tsx` has a project-appropriate `title`
      and `description`, not `"Create Next App"`.

### Component stubs

- [ ] These files exist and each default-exports a component rendering a single
      labelled placeholder region:
      - `frontend/components/layout/Navbar.tsx`
      - `frontend/components/layout/Hero.tsx`
      - `frontend/components/layout/Footer.tsx`
      - `frontend/components/properties/PropertyGrid.tsx`
      - `frontend/components/properties/PropertyCard.tsx`
      - `frontend/components/chat/ChatPanel.tsx`
- [ ] No component accepts props yet beyond what the layout itself needs
      (e.g. `className`); no data types, no mock data file.

### Page composition

- [ ] `frontend/app/page.tsx` composes the stubs in this order: `Navbar`, `Hero`,
      a `main` containing `PropertyGrid` and `ChatPanel`, then `Footer`.
- [ ] Semantic landmarks are used: `<header>` wraps the navbar (with a `<nav>`
      inside), `<main>` wraps the two-column area, `<footer>` wraps the footer.
      Placeholder regions are not all generic `<div>`s at the top level.
- [ ] A single shared max-width container class/component horizontally centres
      the navbar, hero, main, and footer content on the same alignment.

### Layout at 1440px

- [ ] `main` is two columns: the property-grid column is visibly wider than the
      chat column (roughly 2:1), with a gap between them.
- [ ] The chat panel is sticky — it uses `position: sticky` with a top offset and
      stays in view while the grid column scrolls past it.
- [ ] `PropertyGrid` renders 8 `PropertyCard` placeholders in 2 columns.
- [ ] Each `PropertyCard` placeholder holds a fixed aspect-ratio image region
      above a shorter text region, so card height is realistic rather than
      collapsed.
- [ ] The footer placeholder is laid out as 3 columns with a full-width bottom
      bar beneath them.

### Layout at 375px

- [ ] Everything is a single column: cards are 1 per row and the chat panel sits
      after the grid in document flow.
- [ ] The chat panel is not sticky at this width.
- [ ] No horizontal scrollbar and no element overflows the viewport.

### Build

- [ ] `pnpm build` passes from `frontend/` with no TypeScript or ESLint errors.
- [ ] No property data, marketing copy, image files, or font imports are
      introduced anywhere in the diff.

## Out of Scope

- All real content: property data, headings, marketing copy, nav labels, contact
  details, footer links.
- Images and image handling — no `next/image` usage, no `/public` assets, no
  `next.config` remote patterns.
- Typography — no `next/font` imports, no serif/sans pairing. The mockup's fonts
  are a later decision.
- The mockup's colour palette. Placeholders use neutral greys only; the real
  cream/dark-green scheme comes with the component features.
- Chat panel behaviour: no message state, no input handling, no prompt chips, no
  API calls.
- Nav routing — no `app/listings/` or `app/contact/` routes, and no anchor
  targets. Nav placeholder has no links in it yet.
- Any backend work, API client, or `NEXT_PUBLIC_API_URL` usage.
- Animations, transitions, dark mode, and SEO work beyond the `metadata` title
  and description.
- Accessibility beyond correct landmark elements — no focus management, ARIA, or
  contrast work while there's no content.

## Edge Cases

- **Chat panel taller than the viewport** — a sticky element taller than the
  viewport won't scroll to reveal its bottom. The placeholder should be
  constrained (e.g. `max-height` with the message region as the scrolling part)
  so this is designed for now rather than discovered later.
- **Short page / few cards** — with only a couple of cards the grid column may be
  shorter than the chat column; the two-column layout must not collapse or leave
  the chat panel stretched oddly. Verify by temporarily rendering 2 cards.
- **Odd card count** — 8 is even, but the grid must not assume it. Rendering 7
  should leave one card in the last row at normal width, not stretched.
- **Between breakpoints (~768–1024px)** — define which side of the
  one-column/two-column switch the tablet range falls on rather than leaving it
  to whatever the default breakpoint happens to do.
- **Long unbroken placeholder label text** — labels must not force horizontal
  overflow in the narrow chat/card columns.

## Notes

- Mockup: [context/ui-interface.png](../../ui-interface.png). Read it for region
  positions and proportions only — treat its colours, fonts, and copy as out of
  scope here.
- This runs ahead of PROJECT_OVERVIEW's suggested build phases (frontend is
  Phase 4 there). That's deliberate: the shell is being built first so component
  features have somewhere to land. No backend dependency is introduced, so the
  ordering is safe.
- Per [ai-interaction.md](../../ai-interaction.md): no commits without explicit
  permission, and not before `npm run build` passes.
- Open question for a later feature, not this one: whether the navbar is sticky.
  The mockup doesn't show scroll state. Built non-sticky here.
