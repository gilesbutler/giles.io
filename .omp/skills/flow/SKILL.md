---
name: flow
description: Recall and advise on the right level of orchestration for a coding task — direct agent, OpenSpec, babysitter, or pairing. TRIGGER when the user starts a feature, refactor, or has an idea and asks for flow/process/tooling advice, says "pick a flow", "what's the right way to approach this", "how should I do this", or invokes the skill by name. Do NOT trigger for trivial one-line changes; defer to the agent directly.
version: 1.0
source: internal
applies_to: coding-agent planning before work begins
---

# flow

User is about to start work (feature, refactor, idea, bug). Recall the available workflow options — direct agent, OpenSpec, babysitter, or pairing — pick the best 2–3 with a recommended one first, briefly explain each, then ask the user how they want to proceed.

## When to run this skill

- User is starting a **non-trivial** coding task and asks "how should I approach this" or invokes this skill.
- User says "pick a flow", "what's the right way", "use the skill", "I have an idea", "I want to refactor X", "let's build Y".
- User is choosing between working solo vs. using a process/spec layer.

## When NOT to run this skill

- Trivial change (rename, typo, one-line fix). Just do it.
- User has already chosen a flow and is mid-execution.
- Pure question about the tools themselves (use the prior advisory, not this skill).

## Recall: the two tools

| | **OpenSpec** | **Babysitter (a5c-ai)** |
|---|---|---|
| Job | Spec-driven **planning**. "What should we build?" | Process-driven **execution**. "Do exactly this, enforce gates." |
| Artifact | `openspec/changes/<name>/{proposal,specs,design,tasks}.md` | `process.mjs` with `ctx.task` / `ctx.breakpoint`; journal in `~/.a5c/runs/` |
| Authority | Soft — AI can still drift. | Hard — orchestrator can only do what the code permits. |
| Installed? | `npm i -g @fission-ai/openspec` then `openspec init` per repo. | `npm i -g @a5c-ai/babysitter` + the `oh-my-pi` plugin. |
| Cost to skip | Misalignment, vague outputs, no reviewable spec history. | Half-finished features, agent overshoot, no audit trail. |

They are **complementary, not competing**: OpenSpec writes the *what*, babysitter enforces the *how*.

## The six flow options

Use these as the candidate set. Pick the best 2–3 for the user's situation, lead with the recommended one first, briefly explain each, then ask before doing anything.

### A. Direct (no tool)

Just ask the coding agent. Cheapest. Use for: small, well-understood, one-shot changes; typo fixes; quick experiments; "let me see what you come up with."

### B. OpenSpec only

Plan with the agent, review the proposal + spec delta, then implement.

Flow: `/opsx:explore` (optional) → `/opsx:propose <name>` → review `openspec/changes/<name>/` → `/opsx:apply` → `/opsx:archive`.

Use for: features and bug fixes in existing repos where the *spec* is the value — reviewable, persists in git, accumulates as living docs.

### C. OpenSpec + babysitter (the pairing) ★

OpenSpec plans; babysitter executes with hard gates, breakpoints, and a resumable journal.

Flow: `/opsx:propose` → review → `/babysitter:call` with a process that reads `tasks.md`, has a `ctx.task` quality gate per section, and a `ctx.breakpoint` before risky moves → `/opsx:verify` → `/opsx:archive`.

Use for: spec-worthy work that is also long, parallel, or dangerous — big refactors, multi-package changes, anything you'd otherwise hand-babysit.

### D. OpenSpec explore (no commit)

`/opsx:explore` with the agent. No artifacts, no code. Read the area, compare options, sharpen the idea.

Use for: vague problems, unclear requirements, or "I want to improve X but I'm not sure how."

### E. Babysitter yolo (autonomous, no breakpoints)

`/babysitter:yolo <prompt>`. Full auto, journal still records.

Use for: small, well-understood, repeatable chores — "regenerate the icon set", "run this migration across worktrees." Not for novel work.

### F. OpenSpec + babysitter + CI / multi-repo

OpenSpec on the planning side, babysitter process running in CI validating PRs against `openspec/specs/`. Uses OpenSpec Stores for cross-repo planning.

Use for: team-grade spec governance, multi-repo features, or CI-enforced planning.

## How to advise

1. Read the request for: size, novelty, risk, parallelism, whether a spec is valuable, and whether hard enforcement is valuable.
2. Pick 2–3 options from the six above. Lead with the recommended one.
3. For each picked option: explain what it is and why it fits this task.
4. Ask the user how they want to proceed. Use an interactive question with options ordered recommended-first. Do not start work yet.

Keep the response tight. No re-explaining what the tools are in detail. No lists of "what not to do" unless the user is clearly heading toward one.

## Decision heuristic

```text
Novel + small + low-risk?              → A. Direct
Spec-worthy + any size?                → B. OpenSpec
Spec-worthy + long/parallel/dangerous? → C. OpenSpec + babysitter
Vague problem, no plan yet?            → D. OpenSpec explore
Repeatable chore, well understood?    → E. Babysitter yolo
Multi-repo / team / CI governance?     → F. OpenSpec + babysitter + CI
```

If the user has already implied the answer — e.g. "let's spec this out" → B; "I want you to do this end to end" → C; "just do it" → A — confirm with one line and ask, rather than enumerating all six.

## Anti-patterns

- Don't enumerate all six options every time. Keep it short.
- Don't start the work in the same turn. Gate on the user's choice.
- Don't run the skill for trivial work.
- Don't lecture about the tools. The skill is a recall surface, not a tutorial.
- Don't pick an option the user can't actually run. Check whether OpenSpec or babysitter is installed in the current repo before recommending them; if not, mention that installation is required.
