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

**Feature:** Site Header

**Spec:** `context/features/site-header/spec.md`

**Goal:**
Turn the navbar's placeholder slots into the real header from
`context/ui-interface.png` — brand mark + "Terra & Co." wordmark, three centred
nav links, dark pill "Chat with our AI Agent" CTA, and a working menu below `md`.
First real region of the shell, so it also lands the brand-green and serif
display tokens the hero and footer will reuse.

**Status:** `In progress`

**Branch:** `feature/site-header` (worktree: `.claude/worktrees/feature+site-header`)

### Approach / Key Decisions
<!--
  Why you're building it this way — especially anything non-obvious.
  This is the highest-value section: code shows WHAT, this shows WHY.
-->
- **In-page anchors, not routes.** Home → `/`, Listings → `#featured-properties`,
  Contact → `#contact`, CTA → `#chat`. There's one page; `/listings` and
  `/contact` would 404. Every link works today and needs no rework when those
  regions become real.
- **Anchor targets are owned by the header feature, minimally.** PropertyGrid,
  ChatPanel, and Footer get an `id` + `scroll-mt-*` and nothing else. ChatPanel's
  section also gets `tabIndex={-1}` — without it a `#chat` jump moves the
  viewport but not keyboard focus.
- **Only Navbar goes client-side.** The mobile menu needs `useState`; keeping
  `"use client"` on Navbar (or a child of it) means `page.tsx` and the other
  regions stay server components.
- **Closed menu unmounts.** Hiding it with CSS would leave its links tabbable and
  duplicated in the accessibility tree — and would make every `getByRole("link")`
  in tests ambiguous.
- **Stays non-sticky.** Carried over from the layout-shell decision: the mockup
  shows no scroll state. Sticky is its own change if wanted.
- **Tokens in `@theme`, not inline hex.** Brand green (CTA, mark, hover) and
  `--font-serif` via `next/font/google`. Tailwind 4 here has no config file and
  isn't getting one.
- **Existing tests get re-scoped, not deleted.** `scope-boundaries.test.tsx`
  asserts the homepage has zero `<a>`/headings — true only while every region is
  a placeholder. Narrow those queries to exclude the header so the guard keeps
  protecting the regions that *are* still unbuilt.

### Files Touched
<!-- Running list so Claude Code doesn't have to grep the whole repo to find scope -->
- `frontend/components/layout/Navbar.tsx` — the work
- `frontend/app/layout.tsx` — serif font via `next/font/google`
- `frontend/app/globals.css` — brand + font tokens in `@theme`
- `frontend/components/properties/PropertyGrid.tsx` — `id="featured-properties"`
- `frontend/components/chat/ChatPanel.tsx` — `id="chat"`, `tabIndex={-1}`
- `frontend/components/layout/Footer.tsx` — `id="contact"`
- `frontend/tests/regions.test.tsx` — rewrite the Navbar block
- `frontend/tests/scope-boundaries.test.tsx` — re-scope to exclude the header
- `frontend/tests/navbar.test.tsx` *(new)* — menu interaction

### Open Questions / Blockers
<!-- Anything unresolved. Delete once resolved, don't let these pile up stale. -->
- None blocking. Note that local `main` is **ahead of `origin/main`** — the whole
  frontend scaffold is unpushed, and this branch was reset onto local `main`
  after the worktree defaulted to the stale remote ref.

### Next Steps
<!-- Ordered, small, actionable. This is what Claude Code should tackle first. -->
1. Add brand-green scale + `--font-serif` to `@theme`; wire the serif face
   through `next/font/google` in `app/layout.tsx`.
2. Add `id`/`scroll-mt` (and `tabIndex={-1}` on the chat section) to the three
   anchor targets.
3. Build `Navbar`: brand link, desktop links, CTA pill, inline SVGs — drop
   `Placeholder`.
4. Add the mobile menu button and panel with `aria-expanded`/`aria-controls`,
   Escape, outside-click, and link-click closing.
5. Rewrite the Navbar tests, re-scope `scope-boundaries.test.tsx`, add the
   interaction tests.
6. `pnpm build` && `pnpm test` from `frontend/`, then check 375px and 1440px in a
   browser — jsdom proves nothing visual.

### Explicitly Out of Scope (for now)
<!-- Prevents Claude Code from "helpfully" expanding scope mid-task. -->
- Sticky / scroll-shadow header.
- Real `/listings` and `/contact` routes; any multi-page routing.
- Opening, mounting, or focusing an actual chat *session* — the CTA only
  navigates to the panel region, which is still a placeholder.
- Hero, property card, chat panel, and footer content — only their anchor
  attributes are touched.
- Deleting `components/Placeholder.tsx`; other regions still use it.
- Dark mode, theme switching, i18n.
- Header search input or filters.

---

## 📜 Feature History

<!--
  Append-only, most recent first. Each entry should be short — 3-5 lines max.
  Goal is "remind me what this was and where the bodies are buried," not a
  full changelog (git already has that).
-->

### Basic Frontend Layout — 2026-08-01
- **What:** Stripped create-next-app boilerplate and built the homepage as an empty
  structural shell — navbar, hero, two-column main (property grid + sticky chat
  panel), footer — with every region a labelled placeholder. Each region is now
  its own follow-up feature.
- **Key files:** `frontend/app/page.tsx`, `frontend/components/` (six stubs +
  `Placeholder.tsx`, which is temporary — delete it when the last placeholder goes),
  `frontend/app/globals.css` (`@theme` tokens)
- **Gotchas/lessons:** A sticky element taller than the viewport can never scroll to
  its own bottom — hence `--spacing-panel-max`, which derives from
  `--spacing-panel-inset`; keep them in sync. The page grid needs `items-start` or
  sticky has nothing to slide against. jsdom has no layout engine and ignores
  Tailwind, so responsive/sticky/overflow are browser-only checks; class assertions
  in tests are deletion guards, not proof. Testing Library's auto-cleanup does not
  register without Vitest globals — `tests/setup.ts` calls `afterEach(cleanup)`.

<!-- Repeat block above for each shipped feature -->

---

<!--
  ARCHIVE POINTER (add once history section gets long)
  Older entries (before <date>) moved to: history/2026-archive.md
-->