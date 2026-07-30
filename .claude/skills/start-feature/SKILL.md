---
name: start-feature
description: Starts implementation of the currently loaded feature or chore — creates and checks out a git branch, sets context/current-feature.md's status to "In progress", and commits that tracking update. Use when the user says "start feature X", "start-feature", "let's start building", or "begin work on this" AFTER a feature has already been loaded via load-feature. Do not use this to draft specs or load context into context/current-feature.md — this skill only handles branching and marking work as started.
---

# Start Feature

<!--
  Deliberately thin skill — branch + status flip + commit, nothing else.
  Keeping it minimal means it's safe to re-run defensively (e.g. checking
  status) without side effects piling up.
-->

## When to use

Use only after `load-feature` has already populated the Active section of
`context/current-feature.md`. If the Active section is empty or doesn't match the
feature the user is naming, stop and suggest `load-feature` first.

## Steps

1. **Verify preconditions.**
   - Confirm `context/current-feature.md`'s Active `Feature` field matches the
     slug/name the user is starting.
   - Confirm `Status` is currently `Not started` (if it's already `In
     progress`, ask before re-branching — they may just want to resume).

2. **Determine branch name.**
   - `feature/<slug>` for features, `chore/<slug>` for chores.
   - Slug should match the folder name under `context/features/` or
     `context/chores/` used in the spec, for traceability.

3. **Create and check out the branch.**
   ```bash
   git checkout -b feature/<slug>
   ```
   (or `chore/<slug>`). If the branch already exists, check it out instead
   of erroring, and tell the user.

4. **Update `context/current-feature.md`:**
   - `Status` → `In progress`
   - `Branch` → the branch name just created

5. **Commit the tracking update on its own**, not mixed with feature code:
   ```
   chore: start <slug> — update feature tracker
   ```

## Output

Confirm branch name and status update: "Branch `feature/<slug>` created,
status set to In progress. Ready to build."
