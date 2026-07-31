<!--
  HOW TO USE THIS FILE
  =====================
  Purpose: Give Claude Code fast orientation on "what am I working on right now
  and why" without re-explaining context every session.

  Workflow:
  1. Reference this file at the start of a session, e.g.
     "Read context/current-feature.md before we start."
  2. Update the "Active Feature" section as you go — treat it like a
     scratchpad, not a formal doc. Messy but current beats tidy but stale.
  3. When a feature ships, cut its "Active Feature" block, compress it into
     a 3-5 line entry, and paste it at the TOP of "Feature History".
  4. Keep this file separate from CLAUDE.md:
       - CLAUDE.md   = static project facts (stack, conventions, commands)
       - THIS FILE   = dynamic state (what's in progress, what just happened)

  CONTEXT BUDGET WARNING:
  Feature History grows forever if you let it. Once it passes ~15-20 entries,
  archive the oldest ones into a separate ARCHIVE.md (or history/2026-Q1.md)
  and just keep a one-line pointer here. Claude Code doesn't need the full
  history every session — only the recent, relevant thread.
-->

# Current Feature Tracker

<!-- Optional: link back to the main context doc so Claude Code can hop over if needed -->
> See also: `CLAUDE.md` for stack, conventions, and project-wide rules.

---

## 🔨 Active Feature

<!--
  Fill this in fresh for whatever you're currently building.
  Keep it honest and current — if something below is wrong, fix it don't
  just append a correction under it.
-->

**Feature:** Basic Frontend Layout

**Spec:** `context/features/basic-frontend-layout/spec.md`

**Goal:**
Strip the create-next-app boilerplate out of `frontend/` and replace the homepage
with an empty structural shell matching the region layout of
`context/ui-interface.png` — navbar, hero, a two-column main area (property grid +
sticky chat panel), and footer. Every region is a labelled empty placeholder; no
copy, images, fonts, or colours from the mockup are implemented here. Each region
then becomes its own feature.

**Status:** `In progress`

**Branch:** `feature/basic-frontend-layout`

### Approach / Key Decisions

**TBD — to work out in conversation before/while building.** Already settled in
the spec's Assumptions:
- Placeholder regions render with a visible dashed outline + their own name as a
  label, so the layout is verifiable in a browser with no content in it.
- Stub component files go at the paths already fixed by `PROJECT_OVERVIEW.md` §3,
  so later component features fill in an existing file rather than picking a new
  location.

Still to decide:
- How the shared max-width container is expressed — a `<Container>` component vs.
  a repeated utility class string.
- Which side of the one-column/two-column switch the tablet range (~768–1024px)
  falls on.
- How the sticky chat panel is height-constrained (see Edge Cases in the spec).
- Whether the placeholder outline/label styling is a small shared helper or
  repeated per stub — matters because every one of these gets deleted later.

### Files Touched
<!-- Running list so Claude Code doesn't have to grep the whole repo to find scope -->
-

### Open Questions / Blockers

- Navbar sticky or not? The mockup shows no scroll state. Spec says build it
  non-sticky for now; revisit when the navbar becomes its own feature.

### Next Steps

1. Clear the create-next-app boilerplate: rewrite `app/page.tsx`, strip the
   unused `--background`/`--foreground` + `prefers-color-scheme` block from
   `app/globals.css`, and set real `metadata` title/description in
   `app/layout.tsx`.
2. Delete the five default SVGs from `public/` (`file`, `globe`, `next`,
   `vercel`, `window`).
3. Decide the container + placeholder-styling approach, then create the six stub
   components under `components/layout/`, `components/properties/`,
   `components/chat/`.
4. Compose `app/page.tsx` with real landmarks — `<header><nav>`, `<main>`,
   `<footer>` — around the stubs.
5. Build the 1440px layout: 2:1 two-column main, sticky height-constrained chat
   panel, 8 cards in 2 columns with fixed aspect-ratio image regions, 3-column
   footer + bottom bar.
6. Build the 375px layout: single column throughout, chat after grid and not
   sticky, no horizontal overflow.
7. Verify the edge cases in the browser — temporarily render 2 and 7 cards, check
   the tablet range, check a chat panel taller than the viewport.
8. `pnpm build` from `frontend/`, fix any TS/ESLint errors, then ask before
   committing.

### Explicitly Out of Scope (for now)

- All real content: property data, headings, marketing copy, nav labels, contact
  details, footer links.
- Images and image handling — no `next/image`, no `/public` assets, no
  `next.config` remote patterns.
- Typography — no `next/font`, no serif/sans pairing.
- The mockup's colour palette. Neutral greys only.
- Chat panel behaviour: no message state, input handling, prompt chips, or API
  calls.
- Nav routing — no `app/listings/` or `app/contact/` routes, no anchor targets,
  no links in the nav placeholder.
- Any backend work, API client, or `NEXT_PUBLIC_API_URL` usage.
- Animations, transitions, dark mode, and SEO beyond `metadata` title/description.
- Accessibility beyond correct landmark elements.

---

## 📜 Feature History

<!--
  Append-only, most recent first. Each entry should be short — 3-5 lines max.
  Goal is "remind me what this was and where the bodies are buried," not a
  full changelog (git already has that).
-->

### <!-- Feature name --> — <!-- date shipped -->
- **What:** <!-- one-line summary -->
- **Key files:** <!-- 1-3 files/dirs if someone touching this area again would need to know -->
- **Gotchas/lessons:** <!-- anything you'd want to warn future-you or Claude Code about -->

<!-- Repeat block above for each shipped feature -->

---

<!--
  ARCHIVE POINTER (add once history section gets long)
  Older entries (before <date>) moved to: history/2026-archive.md
-->