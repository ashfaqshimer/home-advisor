---
name: load-feature
description: Loads an existing feature or chore spec from context/features/<slug>/spec.md or context/chores/<slug>/spec.md into the Active Feature section of context/current-feature.md, giving Claude Code working context for the task. Use when the user says "load feature X", "load chore X", "pick up X", or references starting work on a spec that already exists. Requires the spec to already exist — if the user is describing brand-new, un-specced work, use draft-spec first instead.
---

# Load Feature

<!--
  This skill's job: move information from spec.md into context/current-feature.md's
  Active section. It should NOT create branches or write code — that's
  start-feature's job. Keep the planning/loading step and the "actually
  begin coding" step separate so there's a checkpoint to discuss approach
  before a branch even exists.
-->

## When to use

Use when a spec already exists and the user wants to bring it into active
context. If there's already something in the Active Feature section of
`context/current-feature.md` that isn't done, flag that before overwriting it —
suggest using `complete-feature` or manually clearing it first.

## Steps

1. **Locate the spec.** Check `context/features/<slug>/spec.md` and
   `context/chores/<slug>/spec.md`. If neither exists, stop and tell the
   user to run `draft-spec` first — don't try to improvise a spec here.

2. **Check current Active section in `context/current-feature.md`.**
   - If it's empty or says "Done"/archived, proceed.
   - If it holds a different, unfinished feature, warn the user and confirm
     before overwriting.

3. **Populate the Active Feature section**, mapping spec → doc:
   - `Feature` ← spec title
   - `Goal` ← spec Goal section
   - `Status` ← `Not started`
   - `Branch` ← leave blank (filled in by `start-feature`)
   - `Approach / Key Decisions` ← leave as TBD; this is meant to be worked
     out in conversation with the user, not invented from the spec alone
   - `Files Touched` ← leave empty
   - `Open Questions / Blockers` ← carry over anything unresolved from the
     spec's Notes section, if present
   - `Next Steps` ← draft a rough ordered list derived from the spec's
     Acceptance Criteria (this is a starting point, expect it to evolve)
   - `Explicitly Out of Scope` ← copy directly from spec's Out of Scope

4. **Do not touch Feature History** — this skill only writes to the Active
   section.

5. **Confirm with the user.** Show the populated Active section and ask if
   the Approach needs discussion before moving to `start-feature`.

## Output

Confirm what was loaded and suggest the next step: "Loaded `<slug>` into
context/current-feature.md. Want to talk through approach, or go ahead and
`start-feature <slug>`?"
