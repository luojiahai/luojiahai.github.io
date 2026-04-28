# Inside Claude Code

Claude Code is built on roughly 500,000 lines of TypeScript spread across nearly 2,000 source files. It covers the agent loop engine, 40+ built-in tools, system prompt assembly, a memory system, context compression, and a permission layer. There is no server-side model training code here. This is purely the client.

The whole thing runs on React Ink, which is exactly what it sounds like: React, but for the terminal. That is why the CLI feels smooth compared to most command-line tools. Someone made the unusual call to treat a terminal interface like a UI component tree, and it paid off.

Here is what the architecture actually looks like, from top to bottom.

-----

## The Agent Loop Is a While Loop

Not a framework. Not a graph. A `while (true)`.

The core of `query.ts` reads like this:

```typescript
while (true) {
  // 1. Compress context if needed
  // 2. Call the model, stream the response
  // 3. Parse any tool calls from the response
  // 4. Execute tools, collect results
  // 5. Append results to conversation history
  // 6. If no new tool calls, break. Otherwise, continue.
}
```

This is a direct implementation of the ReAct pattern: Reason, Act, Observe, repeat. The model thinks, decides on a tool call, sees the result, thinks again. The loop stops when the model stops asking for tools.

There is a comment in the source above this loop that the engineers called the “Rules of Thinking.” It covers three constraints on how thinking blocks (the model’s internal reasoning traces) must be handled. The comment ends with: *“Heed these rules well, young wizard. For they are the rules of thinking, and the rules of thinking are the rules of the universe. If ye does not heed these rules, ye will be punished with an entire day of debugging and hair pulling.”*

I genuinely cannot tell if this is a human writing in character or the AI writing about itself.

-----

## Tool Design: Fail Closed, Always

Claude Code ships with 40+ built-in tools registered in `tools.ts`. The list includes `BashTool`, `FileReadTool`, `FileEditTool`, `FileWriteTool`, `WebFetchTool`, `WebSearchTool`, `AgentTool`, `TodoWriteTool`, and more. Several are gated behind feature flags or environment checks. One entry:

```typescript
...(process.env.USER_TYPE === 'ant' ? [ConfigTool] : []),
```

`ant` is Anthropic’s internal employee identifier. Anthropic uses Claude Code to build Claude Code.

The more interesting piece is the default values on `buildTool`, the factory function that creates every tool:

```typescript
const TOOL_DEFAULTS = {
  isConcurrencySafe: (_input?: unknown) => false,
  isReadOnly: (_input?: unknown) => false,
  isDestructive: (_input?: unknown) => false,
  toAutoClassifierInput: () => '',
}
```

The comment says: *“fail-closed where it matters.”*

If a tool developer forgets to declare that their tool is read-only, the system treats it as a write operation. If they forget to mark it as concurrency-safe, it runs sequentially. The default assumption is always “dangerous.” You have to explicitly opt into trust.

There is also `ToolSearchTool`, which solves a real problem. If you connect a lot of MCP plugins, the full tool definitions get too large to fit in the system prompt without burning tokens. Claude Code sends the model a compact summary of all tool names first, lets the model pick what it needs, then loads full definitions on demand.

-----

## Read/Write Concurrency Separation

When the model wants to run multiple tools at once, Claude Code does not just fire them all in parallel. `toolOrchestration.ts` partitions the calls into batches first.

The default concurrency limit is 10, configurable via `CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY`. The batching logic groups consecutive read-safe tools together. The moment it hits a write operation, it seals the current batch and starts a new one. Writes wait for all preceding reads to complete.

There is a `try-catch` in the safety check: if the `isConcurrencySafe` function throws an exception during evaluation, the tool is treated as unsafe. Fail closed, again.

Context modifications from concurrent tool runs do not apply immediately either. They queue up and flush in the original tool call order once the whole batch is done. This is read/write locking applied to an AI agent. The same pattern databases have used for decades, just in a new context.

-----

## System Prompt Caching: Split at the Boundary

Anthropic’s API supports prompt caching. If the first part of a system prompt is identical across requests, the API can reuse the cached version without reprocessing it. This saves both latency and cost.

Claude Code exploits this with a hard boundary marker in `constants/prompts.ts`:

```typescript
export const SYSTEM_PROMPT_DYNAMIC_BOUNDARY = '__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__'
```

Everything above the boundary is static: role definitions, behavioral guidelines, tool descriptions. Millions of users share one cache for this section.

Everything below the boundary is dynamic: current timestamp, git repository state, your personal `CLAUDE.md` configuration, MCP tool definitions. This part is unique per user and never cached globally.

The source comment warns explicitly: if dynamic content ever migrates above the boundary, every user’s system prompt becomes unique, the global cache invalidates, and costs spike. The boundary is protected with a `WARNING` comment in three separate files.

-----

## Grep Instead of RAG

The default approach to retrieval in AI applications is RAG: embed documents, store in a vector database, semantic search at query time. Claude Code does not do this.

Memory search and conversation history search both use `grep`:

```typescript
const memSearch = `grep -rn "<search term>" ${autoMemDir} --include="*.md"`
const transcriptSearch = `grep -rn "<search term>" ${projectDir}/ --include="*.jsonl"`
```

Boris Cherny, one of Claude Code’s creators, has said in a podcast that they tried RAG and found that letting the AI decide what to search for, and how, produced dramatically better results than pre-computed embeddings.

The framing that makes sense to me: RAG is handing a junior developer a pre-curated reading list. Agentic search is giving them access to the full company docs and letting them figure it out. The stronger the model, the more the second approach wins. And grep has no index staleness, no vector database to maintain, and no embedding pipeline to manage. One layer of complexity, gone.

-----

## Three-Tier Memory Architecture

This is probably the most thoughtful piece of the whole system.

Long-running AI conversations degrade. The model forgets context, contradicts itself, loses track of earlier decisions. Claude Code’s answer is a tiered memory system sometimes called “self-healing memory.”

**Tier 1: MEMORY.md (hot, always loaded)**

A compact index file, capped at 200 lines and 25KB. It is loaded into every conversation’s context window automatically.

The 25KB byte cap was added after the 200-line cap alone proved insufficient. Users were writing 197KB of content across 200 lines. The truncation logic cuts on a line boundary (not mid-line) and appends a `WARNING` to the file content so the model knows it did not see the full index. That last part is subtle. The model knows its own memory is incomplete.

**Tier 2: Topic files (warm, loaded on demand)**

Encoding preferences, architectural conventions, known gotchas: all stored in separate files like `user_role.md` and `feedback_testing.md`. At the start of each conversation, a smaller Sonnet model selects up to 5 relevant files based on the initial query.

The selection prompt has one instruction worth highlighting: if a tool is currently being used, do not load its usage documentation (the model already knows how to use it), but always load files about its known issues. You most need to know about the footguns when you are actively pulling the trigger.

Also: Claude Code’s memory never stores code. Code changes. A memory saying “function X is on line 30” becomes actively misleading after a refactor. The system only stores human preferences and judgments. Source-of-truth for code stays in the actual source files, read in real time.

**Tier 3: Conversation history (cold, grep-searchable)**

Older sessions are written to `.jsonl` files. Grep finds them when needed.

Hot data is resident. Warm data loads on demand. Cold data gets searched. This is just cache tiering, applied to AI memory.

-----

## Five Levels of Context Compression

Context windows fill up. Tool results accumulate. Token costs compound. Claude Code handles this with five compression levels, applied from lightest to heaviest:

1. **Snip**: Strip content from old tool call results, keep only structure.
1. **Microcompact**: Offload large tool execution results to a cache (not deleted, because sub-agents may still need them).
1. **Context Collapse**: Summarize intermediate conversation turns, keep only the key signal.
1. **Autocompact**: Full summary compression when context usage exceeds a threshold.
1. **Reactive Compact**: Emergency compression triggered when the API returns a 413 “prompt too long” error.

Each level is gated behind a feature flag and loaded conditionally in `query.ts`.

The autocompact module has a circuit breaker:

```typescript
// Stop trying autocompact after this many consecutive failures.
// BQ 2026-03-10: 1,279 sessions had 50+ consecutive failures
// (up to 3,272) in a single session, wasting ~250K API calls/day globally.
const MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3
```

3,272 consecutive failed compression attempts in a single session. 250,000 wasted API calls globally, per day. The fix: give up after 3 consecutive failures. Sometimes the right engineering decision is to stop trying.

-----

## Security Is Layered, Even in YOLO Mode

`--dangerously-skip-permissions` skips the normal confirmation prompts. It does not skip security entirely.

There is a separate AI classifier in `utils/permissions/yoloClassifier.ts` that evaluates every operation independently:

```typescript
async function classifyYoloAction(
  toolName: string,
  toolInput: Record<string, unknown>,
): Promise<'allow' | 'soft_deny' | 'hard_deny'>
```

`allow` passes through. `soft_deny` downgrades to a manual confirmation. `hard_deny` blocks unconditionally.

Beyond the YOLO classifier, a single tool invocation passes through at minimum: the current run mode (Plan/Auto/Bypass), user-defined hook rules, the classifier result, bash command safety analysis, and a config-based rule engine. Multiple results compete. The strictest one wins.

The bash security check alone defines 23 rule categories in `tools/BashTool/bashSecurity.ts`. These include: obfuscated flags, IFS variable injection, `/proc/environ` access, Unicode whitespace spoofing (where the display and actual execution differ), and Zsh-specific `zmodload` abuse. Unicode whitespace as an attack vector means someone thought carefully about prompt injection at the shell level.

-----

## Feature Flags as a Roadmap

Feature flags in the source read like a public roadmap:

**KAIROS**: A long-running assistant mode where Claude Code runs continuously across sessions. There is an `AutoDream` function in the same module. The name is evocative: the agent works during the day, consolidates memory overnight.

**COORDINATOR_MODE**: Multi-agent orchestration. One coordinator agent directs parallel worker agents through four phases: Research (workers explore the codebase in parallel), Synthesis (coordinator reads findings and drafts specs), Implementation (workers make changes and commit), Verification (workers run tests). Sub-agents communicate through a file-based message queue in `utils/mailbox.ts`.

**VOICE_MODE** and **WEB_BROWSER_TOOL** are also present.

-----

## Anti-Distillation and Undercover Mode

There are two defensive mechanisms worth understanding.

**Anti-distillation**: Competitors can record Claude Code’s API traffic to train their own models on its input-output behavior. The countermeasure: inject fake tool definitions into requests. If you record the traffic and train on it, your model learns the wrong thing. This only activates for Anthropic’s first-party CLI client. It has no effect on the API or SDK.

**Undercover mode**: When Anthropic employees contribute to public open source repositories using Claude Code, the tool strips all attribution automatically. No internal model codenames, no project names, no Anthropic-identifying metadata in commits. The code:

```typescript
export function isUndercover(): boolean {
  if (process.env.USER_TYPE === 'ant') {
    return getRepoClassCached() !== 'internal'
  }
  return false
}
```

Default is on. It disables only when the repository is confirmed internal. The comment: *“There is NO force-OFF.”*

-----

## The Details That Add Up

A few small things that explain why the tool feels polished.

`--version` loads zero modules and exits immediately. Every other path uses dynamic `await import()`. Startup time is treated as a user experience problem.

There is an early input capture buffer in `utils/earlyInput.ts`. Keystrokes entered while the tool is loading are recorded and replayed once the UI is ready. You do not wait and then type. You type, and the input appears once the tool catches up.

TCP preconnection runs at startup in parallel with initialization:

```typescript
// Preconnect to the Anthropic API to overlap TCP+TLS handshake with startup.
// The TCP+TLS handshake is ~100-200ms that normally blocks inside the first API call.
```

100ms shaved off the first request, for free.

And buried in `buddy/types.ts`: a digital pet system with 18 species, including duck, capybara, axolotl, ghost, cactus, and `chonk`. Apparently planned as a launch feature. An AI that codes alongside you, and also needs feeding.

-----

## What This Actually Is

There is no secret algorithm here. The Agent loop is a while loop. The retrieval is grep. The memory is tiered file storage. The concurrency is read/write locking.

What Claude Code demonstrates is that strong fundamentals, applied carefully to an AI context, outperform novel architectures. The things that make this tool good are not new ideas. They are old ideas, placed in exactly the right spots.

If you are building an AI agent of any kind, this architecture is a better reference than most published papers.