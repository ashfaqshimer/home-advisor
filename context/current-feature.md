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

**Feature:** Footer

**Spec:** `context/features/footer/spec.md`

**Goal:**
Replace the four `Placeholder` stubs in `frontend/components/layout/Footer.tsx`
with the real footer from `context/ui-interface.png` — brand column with blurb,
contact column, follow column, and a bottom copyright bar. First region of the
layout shell to get real content.

**Status:** `In progress`

**Branch:** `feature/footer`

### Approach / Key Decisions
<!--
  Why you're building it this way — especially anything non-obvious.
  This is the highest-value section: code shows WHAT, this shows WHY.
-->
- **Brand is "Home Advisor", not the mockup's "Terra & Co."** The mockup is
  placeholder art; the real name propagates to the wordmark, the email
  (`hello@homeadvisor.lk`), and the copyright line.
- **Logo is extracted to `components/layout/Logo.tsx` now, not inlined.** The
  mark appears in both navbar and footer; extracting on first use avoids the
  navbar feature having to un-duplicate it later. Navbar itself is untouched
  here — it adopts `Logo` in its own feature.
- **`Placeholder.tsx` stays.** Four other regions still use it. It only gets
  deleted when the last one is built.
- **`scope-boundaries.test.tsx` gets narrowed, not gutted.** It currently
  asserts the whole shell is free of links and headings, which stops being true
  the moment the footer is real. Scope it to the regions that are still
  placeholders so it keeps guarding them.
- Working in a git worktree at `.claude/worktrees/footer` rather than switching
  the main checkout's branch.

### Files Touched
<!-- Running list so Claude Code doesn't have to grep the whole repo to find scope -->
- `frontend/components/layout/Logo.tsx` (new)
- `frontend/components/layout/Footer.tsx`
- `frontend/tests/footer.test.tsx` (new)
- `frontend/tests/scope-boundaries.test.tsx`

### Open Questions / Blockers
<!-- Anything unresolved. Delete once resolved, don't let these pile up stale. -->
- Social links point at `href="#"` — no real accounts exist yet. Each carries a
  TODO; revisit when the accounts are created.

### Next Steps
<!-- Ordered, small, actionable. This is what Claude Code should tackle first. -->
1. Build `Logo.tsx` — inline SVG/CSS mark plus "Home Advisor" wordmark as real text.
2. Rewrite `Footer.tsx`: brand + blurb, Contact `<h2>` + list, Follow `<h2>` + list,
   bottom bar with top border. Keep the existing band styling and grid shape.
3. Wire links — `tel:`, `mailto:`, `#` for social; hover and focus-visible states.
4. Write `footer.test.tsx`; narrow `scope-boundaries.test.tsx`.
5. `pnpm build` && `pnpm test` from `frontend/`.

### Explicitly Out of Scope (for now)
<!-- Prevents Claude Code from "helpfully" expanding scope mid-task. -->
- Navbar, hero, property grid, chat panel — still placeholders.
- Deleting `Placeholder.tsx`.
- `next/font` setup and the mockup's serif display face.
- Real destinations for social links; social icons (text labels only).
- Newsletter signup, sitemap, legal/privacy pages.
- Dark mode.
- Making contact details configurable via env vars or a CMS.

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