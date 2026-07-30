---
name: complete-feature
description: Verifies a feature or chore's implementation against its spec's acceptance criteria, writes or fills in missing tests, checks test coverage of the changed code, and — only if everything passes — archives the feature (compresses the Active block in context/current-feature.md into Feature History, moves the spec to context/features/done/ or context/chores/done/, clears the Active section). If gaps are found, it reports them clearly and leaves the feature Active rather than archiving. Use when the user says "complete feature X", "finish this feature", "is X done", "check if this is ready", or "wrap up this feature". Say "verify only, don't archive" if the user wants to check status without filing it away yet.
---

# Complete Feature

<!--
  This is the highest-stakes skill of the four — it's the one that decides
  whether work is "done." The core rule: archiving is GATED on verification
  passing. Never archive first and check later. If in doubt about whether
  a criterion is met, treat it as unmet and ask the user rather than
  guessing generously.
-->

## When to use

Use when the user believes (or wants to check whether) the currently active
feature is finished. Requires an Active feature in `context/current-feature.md` with
a corresponding spec file.

## Steps

### 1. Gather context
- Read the Active section of `context/current-feature.md` (Feature, Approach, Files
  Touched, Next Steps).
- Read the matching `spec.md`'s Acceptance Criteria, Out of Scope, and Edge
  Cases.

### 2. Verify against acceptance criteria
For each acceptance criterion in the spec:
- Check the actual codebase (not just the Files Touched list — grep/search
  as needed) to confirm it's genuinely implemented.
- Check edge cases listed in the spec are handled, not just the happy path.
- Mark each criterion clearly: ✅ met / ❌ not met / ⚠️ partially met, with
  a one-line reason.

Do not mark something ✅ on the assumption it's "probably fine" — if you
can't find evidence in the code, treat it as not met.

### 3. Tests and coverage
- Check whether tests exist for the new/changed code.
- Write tests for any acceptance criteria or edge cases that aren't
  currently covered.
- Run the test suite and report pass/fail.
- Check coverage of the changed files specifically (not just overall repo
  coverage) — flag if meaningfully under the project's usual bar.

### 4. Decide: archive or report gaps

**If everything is ✅ and tests pass** (and the user hasn't said
"verify only"):
- Compress the Active block into a Feature History entry:
  ```md
  ### <Feature Title> — <today's date>
  - **What:** <one-line summary>
  - **Key files:** <1-3 most relevant files/dirs>
  - **Gotchas/lessons:** <anything worth flagging for next time>
  ```
  Prepend it to the top of Feature History in `context/current-feature.md`.
- Move `spec.md` from `context/features/<slug>/` (or `chores/<slug>/`) to
  `context/features/done/<slug>/` (or `chores/done/<slug>/`).
- Clear the Active Feature section back to empty/template state.
- Commit: `chore: complete <slug> — archive feature tracker`

**If anything is ❌ or ⚠️, or the user said "verify only":**
- Do NOT archive. Leave the Active section and spec exactly where they are.
- Report a clear checklist of what's met and what isn't, so the user knows
  exactly what to fix before re-running this skill.

## Output

Always show the acceptance-criteria checklist and test results. Then either:
- "Everything's verified and archived — Active section is clear for the
  next feature." (on success), or
- "Not quite there yet — here's what's missing: ..." (on gaps found)
