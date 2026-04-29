---
description: "Claude Code is built on roughly 512,000 lines of code. A look at how each module works: the agent loop, tool system, memory, context compression, and permission layer."
---

# Inside Claude Code: Overview

Claude Code is built on roughly 512,000 lines of code. The client-side source covers the agent loop engine, 40+ built-in tools, system prompt assembly logic, a three-tier memory system, context compression, and a permission layer, along with a handful of unreleased features.

The whole thing runs on React Ink, which lets you write terminal UIs with React. Think "webdev but in the terminal." That's why the Claude Code CLI feels so much smoother than most traditional tools.

At a high level, the architecture breaks down into 6 layers:

1. **CLI and UI layer**: everything you see in the terminal
2. **Agent loop engine**: the brain, where all decisions originate
3. **Tool system**: 40+ built-in tools plus MCP extensions
4. **Memory system**: solving the "AI forgets everything" problem
5. **Context compression**: keeping token costs under control
6. **Permission and security layer**: at the bottom, holding everything accountable

## The Agent Loop

Modern AI coding tools aren't simple Q&A. They're autonomous agents that plan and execute across multiple steps. You might expect that kind of capability to require some sophisticated orchestration framework under the hood.

Open `query.ts`, and what you find is a `while(true)` loop.

Each iteration: compress context if needed, call the model, check if the response contains tool calls. If it does, execute those tools, append the results, loop again. When there are no more tool calls, the task is done.

This is the ReAct pattern (Reasoning + Acting), a tight "think → act → observe → think again" loop. Simple in concept, powerful in practice.

More on this in [Inside Claude Code: The Agent Loop](./01-the-agent-loop).

## Tool Design

The 40+ built-in tools are registered in `tools.ts`. Tool registration isn't just a feature concern; it has direct cost implications. The list must stay in sync with A/B test configuration, otherwise the globally cached system prompt breaks.

When a user has many MCP plugins connected, Claude Code doesn't dump every tool's full description into the system prompt. It gives the model a compact list of tool names with one-line descriptions, lets the model pick what it needs, then loads the full definitions on demand. Significant token savings.

Each tool is built with fail-closed defaults. `isConcurrencySafe` and `isReadOnly` both default to `false`. If a tool author forgets to declare "this is read-only," the system treats it as a write operation and blocks concurrent execution. No badge, no entry.

More on this in [Inside Claude Code: Tool Design](./02-tool-design).

## Read/Write Concurrency Separation

When the model wants to read 3 files and edit 1 simultaneously, `toolOrchestration.ts` separates them. Consecutive read-only tools run in parallel; the moment a write operation appears, it waits for all preceding operations to finish.

The fail-closed pattern shows up again here. If the concurrency safety check itself throws an exception, that's treated as unsafe. If input parsing fails, that's also unsafe. The concurrency cap defaults to 10, configurable via env var.

Anyone who's worked with databases will recognize the pattern: reads-parallel, read-write-exclusive.

More on this in [Inside Claude Code: Read/Write Concurrency Separation](./03-read-write-concurrency-separation).

## System Prompt Cache Splitting

Anthropic's API caches prompt prefixes. If the start of your system prompt stays constant across requests, it gets reused, skipping reprocessing and cutting costs.

Claude Code splits the system prompt at a `DYNAMIC_BOUNDARY` marker. Everything above is static: role definition, behavior rules, tool descriptions. Everything below is dynamic: your current timestamp, git repo state, CLAUDE.md config. Different per user, loaded independently.

Accidentally mixing dynamic content into the static section invalidates the cache for everyone. The codebase has cross-file warnings to keep the boundary coordinated. If you're building AI apps at any real call volume, this pattern makes a meaningful dent in API costs.

More on this in [Inside Claude Code: System Prompt Cache Splitting](./04-system-prompt-cache-splitting).

## Retrieval Strategy: Grep Over RAG

The model has no native memory of your codebase. The standard approach is RAG: embed your project into a vector database, retrieve semantically similar chunks at query time, feed them to the model.

Claude Code doesn't use RAG. For both memory file search and historical conversation search, it uses plain `grep`.

Claude Code's creator Boris Cherny has said they tried RAG, but letting the AI decide what to search for and how to search produces far better results. An agent with direct access to the full document library and the freedom to dig beats a pre-packaged information bundle, especially as models get stronger. And `grep` has no index expiry, no vector database to maintain, and an order of magnitude less engineering complexity.

More on this in [Inside Claude Code: Retrieval Strategy](./05-retrieval-strategy).

## Three-Tier Memory Architecture

This is the most elegant design in the codebase. Anyone who's used an AI coding tool long enough has hit the wall: deep into a session, the AI starts contradicting itself, losing the thread. Claude Code addresses this with a tiered memory system.

**Tier 1: MEMORY.md (hot data)** — Loaded into context every conversation. Hard capped at 200 lines and 25KB. It stores pointers, not content. If truncation kicks in, the model is explicitly told the index is incomplete, so it doesn't silently work with partial information.

**Tier 2: Topic files (warm data)** — Coding preferences, architectural decisions, known pitfalls. At the start of each conversation, a lighter Sonnet model selects up to 5 files relevant to the current query. If a tool is actively being used, its documentation is skipped (you clearly know how to use it), but its known issues are always loaded.

Also worth noting: Claude Code's memory never stores code. Code changes; memory doesn't auto-update. Memory tracks preferences and judgments; code facts are always read from source in real time.

**Tier 3: Conversation history (cold data)** — Older conversations stored as `.jsonl` files, searched by `grep` when needed.

Hot data stays resident. Warm data loads on demand. Cold data is searched. Clean.

More on this in [Inside Claude Code: Three-Tier Memory Architecture](./06-three-tier-memory-architecture).

## Five-Level Context Compression

Context windows have limits. Long sessions with lots of tool call results will burn through tokens fast. Claude Code handles this with five compression strategies, applied lightest-to-heaviest:

1. **Snip**: strip old tool call results down to structure only
2. **Microcompact**: offload large tool execution results to a cache
3. **Context Collapse**: summarize intermediate conversation, keeping only key information
4. **Autocompact**: full summary compression when context usage crosses a threshold
5. **Reactive Compact**: emergency fallback, triggered when the API returns a 413 error

There's also a circuit breaker. On March 10, 2026, they measured 1,279 sessions with 50+ consecutive compression failures, the worst hitting 3,272 retries in a single session. That translated to 250,000 wasted API calls per day globally. The fix: stop after 3 consecutive failures.

More on this in [Inside Claude Code: Five-Level Context Compression](./07-five-level-context-compression).

## Security Layer

Claude Code has a `--dangerously-skip-permissions` flag (YOLO mode) that bypasses all permission prompts. It's not as unguarded as it sounds. A shadow AI runs quietly in the background, classifying every action the main model wants to take as `allow`, `soft_deny`, or `hard_deny`.

That's just one checkpoint. A single tool call passes through at least five layers: run mode, user-defined hooks, the YOLO classifier, bash command danger classification, and the config file rules engine. The most restrictive result wins.

The Bash security checks cover 23 rules, including Unicode whitespace spoofing (where zero-width characters make what the checker sees differ from what the shell executes) and Zsh-specific module loading that can bypass standard file and network checks. The threat modeling here is serious.

More on this in [Inside Claude Code: Security Layer](./08-security-layer).

## Anti-Distillation and Undercover Mode

Two defensive mechanisms to prevent capability theft and internal information leakage.

**Anti-distillation.** A competitor could record Claude Code's API traffic and use those input-output pairs to distill a smaller model with similar behavior. Anthropic's response: inject fake tool definitions into the API request. Not encryption or rate limiting. It actively feeds bad training data into any captured traffic, so any model trained on those recordings degrades over time. Only activates in the official first-party CLI.

**Undercover mode.** When Anthropic employees use Claude Code to contribute to open-source projects, this mode activates automatically, stripping all attribution to avoid leaking internal model codenames or project names. There is no force-off. It defaults to active for Anthropic employees and only turns off when the repo is confirmed internal.

More on this in [Inside Claude Code: Anti-Distillation and Undercover Mode](./09-anti-distillation-and-undercover-mode).

## The Takeaway

Looking at the source end-to-end, there's no secret sauce. No novel algorithms. Everything in Claude Code is built on concepts working engineers have encountered before: concurrency control, read/write separation, layered caching, circuit breakers, feature flags.

What's impressive is how well those fundamentals are applied to the specific constraints of an AI agent with full access to your codebase. Every design decision has a reason. Every default is conservative. Every edge case is handled explicitly.

The fundamentals matter. They always did.
