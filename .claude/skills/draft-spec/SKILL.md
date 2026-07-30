---
name: draft-spec
description: Creates a structured spec file for a new feature or chore at context/features/<slug>/spec.md or context/chores/<slug>/spec.md, capturing goal, acceptance criteria, out-of-scope items, and edge cases. Use this whenever the user wants to plan, scope, or write up new work before touching code — trigger on phrases like "draft a spec", "plan out X", "let's spec this feature", "I want to work on Y next", or any description of new work that isn't yet tracked. This is always the FIRST step before load-feature — do not skip straight to loading or coding if no spec exists yet.
---

# Draft Spec

<!--
  This skill's only job is to produce a good spec.md file. It should NOT
  touch context/current-feature.md, create branches, or write any code — that's
  what load-feature and start-feature are for. Keep this skill's scope tight.
-->

## When to use

Use when the user describes new work (feature or chore) that doesn't have a
spec yet. If a spec already exists for what they're describing, tell them
and ask if they want to edit it instead of creating a duplicate.

## Steps

1. **Determine type and slug.**
   - Ask (or infer) whether this is a `feature` or a `chore`.
   - Derive a short kebab-case slug from the description, e.g.
     "basic page layout with hardcoded data" → `basic-page-layout`.
   - Confirm the slug with the user if it's ambiguous — this becomes the
     folder name and branch name later, so it's worth getting right once.

2. **Check for an existing spec.**
   - Look in `context/features/<slug>/` and `context/chores/<slug>/`.
   - If `spec.md` already exists there, stop and ask the user whether they
     want to edit the existing one instead.

3. **Interview the user** (skip questions you can already answer from
   conversation context):
   - **Goal** — one or two sentences, from the user's/end-result POV.
   - **Acceptance criteria** — a checklist of concrete, verifiable
     conditions. These will later be checked mechanically by
     `complete-feature`, so push for specific and testable, not vague.
     ("Layout is responsive" is weak. "Layout renders correctly at 375px
     and 1440px widths" is checkable.)
   - **Out of scope** — anything adjacent that should explicitly NOT be
     built now. This matters more than it seems — it's what stops scope
     creep later.
   - **Edge cases** — empty states, error states, boundary conditions worth
     calling out up front.

4. **Write the spec file** to `context/features/<slug>/spec.md` (or
   `context/chores/<slug>/spec.md`), using this structure:

   ```md
   # Spec: <Feature/Chore Title>

   ## Goal
   <1-2 sentences>

   ## Acceptance Criteria
   - [ ] <concrete, checkable criterion>
   - [ ] <concrete, checkable criterion>

   ## Out of Scope
   - <explicitly excluded item>

   ## Edge Cases
   - <edge case and expected behavior>

   ## Notes
   <!-- optional: links, prior art, constraints -->
   ```

5. **Confirm with the user** before finishing — show the file contents,
   ask if anything's missing or wrong before they move on to `load-feature`.

## Output

Tell the user the spec path and suggest the natural next step:
"Spec created at `context/features/<slug>/spec.md`. Ready to `load-feature
<slug>` when you want to start."
