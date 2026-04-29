---
description: "How Claude Code solves AI context drift with a three-tier memory architecture: hot indexes, on-demand topic files, and searchable conversation history, and the engineering decisions that make each tier actually work."
---

# Inside Claude Code: Three-Tier Memory Architecture

Anyone who's spent serious time with an AI coding tool knows the feeling. You're deep into a session, thirty tool calls in, and the model starts contradicting itself. It forgets the architectural decision you made an hour ago. It suggests the approach you already ruled out. The longer the session, the worse it gets.

Claude Code's answer to this is a tiered memory system. Not a bigger context window, not a smarter model, but a deliberate data architecture. Hot data stays resident. Warm data loads on demand. Cold data is searched. It's the same pattern you'd apply to any storage problem, applied to the model's own memory.

Here's how it works.

## Tier 1: MEMORY.md (always loaded)

`MEMORY.md` is the index. It loads into context on every conversation, every time, no exceptions.

```typescript
// memdir/memdir.ts
export const ENTRYPOINT_NAME = "MEMORY.md";
export const MAX_ENTRYPOINT_LINES = 200;
export const MAX_ENTRYPOINT_BYTES = 25_000;
```

Hard capped at 200 lines and 25KB. It stores pointers, not content. Think of it as a table of contents for the model's working knowledge about your project.

The caps matter because this file permanently occupies context window space. Every byte in `MEMORY.md` is a byte unavailable to your actual conversation. So it's deliberately kept lean.

The 25KB byte cap was actually added after the fact. Someone found a way to stay under 200 lines while writing so much per line that the file hit 197KB. Classic. So they added the byte floor as a second check.

When the file hits either limit, truncation kicks in:

```typescript
export function truncateEntrypointContent(raw: string): EntrypointTruncation {
  let truncated = wasLineTruncated ? contentLines.slice(0, MAX_ENTRYPOINT_LINES).join("\n") : trimmed;

  if (truncated.length > MAX_ENTRYPOINT_BYTES) {
    const cutAt = truncated.lastIndexOf("\n", MAX_ENTRYPOINT_BYTES);
    truncated = truncated.slice(0, cutAt > 0 ? cutAt : MAX_ENTRYPOINT_BYTES);
  }

  return {
    content: truncated + `\n\n> WARNING: ${ENTRYPOINT_NAME} is ${reason}. Only part of it was loaded.`,
  };
}
```

Line cap, then byte cap, cutting at natural line boundaries. The important part is the last bit: explicitly telling the model the index was truncated. Without that warning, the model would work with partial information and not know it. Silent failure is the worst kind.

The memory directory is also git-aware. The path resolves to `~/.claude/projects/<sanitized-git-root>/memory/`, using the canonical git root. Every worktree of the same repo shares a single memory directory. You don't lose context when you branch.

## Tier 2: Topic files (loaded on demand)

Coding preferences, architectural decisions, known pitfalls: these live in individual topic files. Things like `user_role.md` ("senior backend engineer, new to the React side") or `feedback_testing.md` ("integration tests must hit real database").

At the start of each conversation, a lighter Sonnet model reads the index and picks up to five files relevant to your current query. The selection prompt includes this rule:

```typescript
const SELECT_MEMORIES_SYSTEM_PROMPT = `You are selecting memories that will be
useful to Claude Code as it processes a user's query.
Return a list of filenames for the memories that will clearly be useful (up to 5).
- If a list of recently-used tools is provided, do not select memories that are
  usage reference or API documentation for those tools (Claude Code is already
  exercising them). DO still select memories containing warnings, gotchas, or
  known issues about those tools — active use is exactly when those matter.`;
```

If you're actively using a tool, skip its documentation but always load its gotchas. You clearly know how to invoke it. What you need right now is the list of ways it can go wrong.

The selector call is deliberately minimal: `max_tokens: 256`. It only needs filenames. Output is constrained with JSON schema enforcement so it physically cannot hallucinate filenames that don't exist.

The scan phase only reads the first 30 lines of each file, enough to get the YAML frontmatter. Full content is never read during selection. The manifest the selector sees looks like:

```
[feedback] feedback_testing.md (2026-04-15T10:32:00Z): integration tests must hit real database
[user] user_role.md (2026-04-28T09:15:00Z): senior backend engineer, new to React side of repo
[project] project_deadline.md (2026-04-20T14:00:00Z): merge freeze begins 2026-05-03 for mobile release
```

Scan is capped at 200 files, sorted newest-first. Recent memories surface to where the selector sees them first. A deduplication pass also removes files already loaded earlier in the current conversation, so the 5-slot budget isn't wasted re-selecting what the model already has.

### Making staleness visceral

Raw ISO timestamps don't trigger staleness reasoning in models. `2025-11-14T09:32:00Z` doesn't feel old. `47 days ago` does.

So there's a `memoryAge.ts` that converts file modification times to human language:

```typescript
export function memoryAge(mtimeMs: number): string {
  const d = memoryAgeDays(mtimeMs);
  if (d === 0) return "today";
  if (d === 1) return "yesterday";
  return `${d} days ago`;
}
```

Memories older than one day get an inline caveat on load:

```
▎ This memory is 47 days old. Memories are point-in-time observations, not live
▎ state — claims about code behavior or file:line citations may be outdated.
▎ Verify against current code before asserting as fact.
```

This feeds into a section of the system prompt titled "Before recommending from memory" (not "Trusting what you recall"). The heading is action-cue framing, placed at the decision point. Same body text with a more abstract header tested 0/3 in evals. The action-cue version tested 3/3. That's the kind of prompt engineering detail that only shows up after you've run the evals.

### Memory never stores code

This is the most important design constraint in the entire tier.

Code changes. Memory doesn't auto-update. If a memory says "function X is on line 30" and you've since refactored, that memory is now actively misleading. So memory tracks preferences and judgments, and code facts are always read from source in real time. Cache-database consistency problems, eliminated at the design level.

## Tier 3: Conversation history (grep search)

Older conversations are stored as `.jsonl` files and searched by keyword with `grep` when actually needed:

```typescript
const transcriptSearch = `${GREP_TOOL_NAME} with pattern="<search term>" path="${projectDir}/" glob="*.jsonl"`;
```

The instructions explicitly say to use narrow search terms (error messages, file paths, function names) rather than broad keywords. Transcripts are large and slow. This tier is the last resort, not the first.

## The background extraction agent

The three tiers explain how memory is read. The fourth piece is how it gets written.

At the end of each complete query loop, a background extraction agent fires. It's a forked agent: a perfect copy of the main conversation that shares the parent's prompt cache instead of starting cold. Reusing the cache means it doesn't pay the full cost of context re-ingestion.

The fork runs with sandboxed permissions. Read and grep freely, read-only bash, write and edit only within the memory directory. It cannot touch your project files.

The main agent and the background agent are mutually exclusive. If the main agent already wrote a memory during the conversation, the extractor detects this and skips. When the main agent writes, extraction skips. When it doesn't, extraction catches what was missed. The cursor advances each run so the extractor only processes messages added since the previous extraction.

## The memory taxonomy

Memories are constrained to four types, each with explicit guidance:

**user** — Role, goals, expertise. Used to calibrate explanations. A ten-year Go veteran and a React newcomer need different responses to the same question.

**feedback** — Corrections and confirmed approaches both. The source makes a point of this: if you only save corrections, you'll avoid past mistakes but drift away from approaches the user has already validated. You end up overly cautious. Saving successes matters as much as saving failures.

**project** — Goals, deadlines, incidents, decisions and their rationale. Things not derivable from code or git. Relative dates are converted to absolute on save, so "Thursday" becomes "2026-03-05" and the memory stays interpretable after time passes.

**reference** — Pointers to external systems. "Pipeline bugs are tracked in Linear project INGEST." Keeps the model from guessing where to look.

Explicitly excluded: code patterns, architecture, file paths, git history, debugging recipes, anything already in `CLAUDE.md`, ephemeral task details. The exclusions apply even when you explicitly ask to save them. If you ask it to save this week's PR list, it's supposed to ask what was surprising about it. The surprising part is what's worth keeping.

## The Takeaway

The whole system is a context engineering problem solved with storage engineering principles. Tiered access by temperature, aggressive caching, explicit staleness signaling, write isolation. None of this is novel in database design. Applied to a model's working memory, it's elegant.

The detail that sticks with me is the warning appended on truncation. Not just "here's what I loaded." But: "here's what I didn't load, and here's why." The model knows the shape of what it's missing. That's the kind of design decision that separates a system someone thought through from one that just happened to work.
