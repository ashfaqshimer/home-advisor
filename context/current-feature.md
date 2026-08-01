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

**Feature:** Hero Section

**Spec:** `context/features/hero-section/spec.md`

**Goal:**
Replace the hero's four placeholder blocks with real content matching
`context/ui-interface.png` — eyebrow pill, two-line serif headline, subcopy, and a
dark-green pill CTA that jumps to the chat panel. A visitor should immediately
understand what the site does and have one obvious action to take.

**Status:** `In progress`

**Branch:** `feature/hero-section` (git worktree at `.claude/worktrees/hero-section`)

### Approach / Key Decisions
<!--
  Why you're building it this way — especially anything non-obvious.
  This is the highest-value section: code shows WHAT, this shows WHY.
-->
- **Colours are sampled, not eyeballed.** Every brand value came out of
  `context/ui-interface.png` pixel data, and lands as an `@theme` token in
  `globals.css` rather than an inline arbitrary utility — the navbar, cards, and
  footer all need the same green and the same band tone.
- **No web fonts on this branch.** The mockup's headline is a high-contrast display
  serif, but picking the real pairing is a global call affecting every later section.
  Shipping a `--font-display` token pointed at a system serif stack gets the hero's
  shape right now and makes the eventual swap a one-line change.
- **CTA is an `<a href="#chat">`, not a button.** It works with no JS, is keyboard
  reachable for free, and keeps working unchanged once the chat panel is real.
  Costs one `id="chat"` on `ChatPanel`.
- **Hero only.** The navbar shares the green pill and brand mark but stays
  placeholdered, so this diff stays reviewable.

### Files Touched
<!-- Running list so Claude Code doesn't have to grep the whole repo to find scope -->
- `frontend/app/globals.css` — brand colour + `--font-display` tokens, smooth scroll
- `frontend/components/layout/Hero.tsx` — the feature
- `frontend/components/ui/ChatCta.tsx` — new; the navbar needs this same control
- `frontend/components/chat/ChatPanel.tsx` — `id="chat"` + `scroll-mt` only
- `frontend/tests/hero.test.tsx` — new
- `frontend/tests/scope-boundaries.test.tsx` — hero is no longer content-free

### Open Questions / Blockers
<!-- Anything unresolved. Delete once resolved, don't let these pile up stale. -->
- None blocking. Deferred: the real font pairing (Playfair Display + DM Sans is the
  leading candidate) needs its own typography feature.

### Next Steps
<!-- Ordered, small, actionable. This is what Claude Code should tackle first. -->
1. Add brand colour and `--font-display` tokens to `globals.css`.
2. Rebuild `Hero.tsx`: eyebrow pill, `h1`, subcopy, CTA anchor with icon.
3. Add `id="chat"` to `ChatPanel`; enable reduced-motion-safe smooth scroll.
4. Write `tests/hero.test.tsx`; update the scope-boundaries test.
5. `pnpm build` + `pnpm test`, then check 375px / 1440px in a browser.

### Explicitly Out of Scope (for now)
<!-- Prevents Claude Code from "helpfully" expanding scope mid-task. -->
- Web fonts / final typography pairing
- Navbar (logo, nav links, header CTA stay placeholders)
- A functioning chat panel — the CTA only anchors to it
- Property grid, footer, background imagery
- Dark mode

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