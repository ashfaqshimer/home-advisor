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

**Feature:** <!-- e.g. "Property search filters (price range, bedrooms, location)" -->

**Goal:**
<!-- One or two sentences. What does "done" look like from the user's POV? -->

**Status:** `Not started | In progress | Blocked | In review/testing | Done`

**Branch:** <!-- e.g. feature/property-search-filters -->

### Approach / Key Decisions
<!--
  Why you're building it this way — especially anything non-obvious.
  This is the highest-value section: code shows WHAT, this shows WHY.
  e.g. "Using query params instead of POST body for filters so results are
  shareable via URL."
-->
-

### Files Touched
<!-- Running list so Claude Code doesn't have to grep the whole repo to find scope -->
-

### Open Questions / Blockers
<!-- Anything unresolved. Delete once resolved, don't let these pile up stale. -->
-

### Next Steps
<!-- Ordered, small, actionable. This is what Claude Code should tackle first. -->
1.
2.
3.

### Explicitly Out of Scope (for now)
<!--
  Prevents Claude Code from "helpfully" expanding scope mid-task.
  e.g. "Not adding map view yet — filters first, map is a separate feature."
-->
-

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