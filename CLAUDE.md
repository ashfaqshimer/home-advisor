# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Current state

**The repo is pre-scaffold.** There is no application code, no `package.json`, no `requirements.txt`, and no commits on `main` yet — only the spec in [context/PROJECT_OVERVIEW.md](context/PROJECT_OVERVIEW.md), the workflow rules in [context/ai-interaction.md](context/ai-interaction.md), and the feature-tracking skills. Build commands below don't exist until the corresponding scaffold is created (Phase 1 of the spec).

## What this is

A real estate brokerage site for the Sri Lankan (Colombo-focused) market, built around an AI agent that chats with buyers/renters, matches them to properties in a live database, and captures leads. Monorepo: `/frontend` (Next.js App Router + TypeScript + Tailwind, Vercel) and `/backend` (FastAPI + SQLAlchemy/Alembic + Neon Postgres, Render).

The full spec — data models, endpoints, tool signatures, env vars, build phases — lives in [context/PROJECT_OVERVIEW.md](context/PROJECT_OVERVIEW.md). Read it before implementing anything; don't re-derive design decisions that are already settled there.

## Architectural constraint (the point of the project)

The agent uses a **hand-rolled tool-calling loop against the raw Gemini API — no LangChain, no LangGraph, no agent framework.** This is deliberate: demonstrating manual orchestration is a primary goal, not an implementation detail. Do not introduce an agent framework as a "simplification." A LangGraph migration is explicitly deferred to a documented v2.

The loop lives in `backend/app/agent/loop.py`: append user message → send full contents + tool declarations + system instruction to Gemini → if a `function_call` part comes back, execute the Python function and append the model turn plus a `function_response` part → repeat until a plain text response → persist and return. Cap the iterations (~5) so a model that keeps re-calling a tool can't spin.

Model: `gemini-3.1-flash-lite` via AI Studio, using the `google-genai` Python SDK (`GEMINI_API_KEY`). It's the cheapest tier in its generation; if it proves unreliable at chaining `search_properties` → `capture_lead` across one conversation, the non-lite Flash model of the same generation is a drop-in upgrade (model string only). Don't silently swap the model to work around a prompt bug — fix the prompt first. Keep the model string in one place (config/settings), not inlined at the call site.

Agent tools (`backend/app/agent/tools.py`): `search_properties`, `capture_lead`, and optionally `get_property_details`. Persona and behavior rules (ask clarifying questions before searching; work toward name/phone naturally rather than demanding it upfront) belong in `backend/app/agent/prompts.py`, not scattered through the loop.

## Feature workflow (skills)

Work is tracked through four skills that form an ordered pipeline. Follow it rather than jumping straight to code:

1. `draft-spec` — writes `context/features/<slug>/spec.md` (or `context/chores/<slug>/spec.md`). Always first for new work.
2. `load-feature` — copies that spec into the Active Feature section of the tracker. No branching, no code.
3. `start-feature` — creates `feature/<slug>` or `chore/<slug>`, flips status to In progress, commits the tracker update alone.
4. `complete-feature` — verifies acceptance criteria against the actual codebase, runs tests, and **only then** archives. Gaps mean report-and-leave-active, never archive-and-fix-later.

All four skills live in [.claude/skills/](.claude/skills/). The tracker they read and write is [context/current-feature.md](context/current-feature.md) — dynamic state (what's in progress, what just shipped), deliberately kept separate from this file, which holds static project facts.

## Working rules (from context/ai-interaction.md)

- **Never commit without explicit permission**, and never before `npm run build` passes. Fix build errors first.
- Conventional commit messages (`feat:`, `fix:`, `chore:`). **No "Generated with Claude" or "Co-Authored-By" lines** — this repo explicitly opts out.
- One branch per feature/fix; ask before deleting a branch after merge.
- Make minimal changes. Don't refactor unrelated code, don't add unspecced features, don't delete files without asking.
- If something isn't working after 2-3 attempts, stop and explain rather than trying more random fixes.
- Verification is browser-based for now; unit tests come later.

## Environment

Backend `.env`: `DATABASE_URL` (Neon), `GEMINI_API_KEY` (AI Studio), `ALLOWED_ORIGINS`.
Frontend `.env.local`: `NEXT_PUBLIC_API_URL` (the Render backend URL).

The Render free tier spins down when idle, so the first request after inactivity is slow — expected, not a bug.
