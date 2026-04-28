# Inside Claude Code

Claude Code is built on 1,906 TypeScript source files and roughly 512,000 lines of code. The client-side source covers the agent loop engine, 40+ built-in tools, system prompt assembly logic, a memory system, context compression, and a permission control layer, along with a handful of unreleased features.

The whole thing runs on React Ink, which lets you write terminal UIs with React. Think "webdev but in the terminal." That's why the Claude Code CLI feels so much smoother than most traditional tools.

At a high level, the architecture breaks down into 6 layers:

1. CLI and UI layer: everything you see in the terminal
2. Agent loop engine: the brain, where all decisions originate
3. Tool system: 40+ built-in tools plus MCP extensions
4. Memory system: solving the "AI forgets everything" problem
5. Context compression: keeping token costs under control
6. Permission and security layer: at the bottom, holding everything accountable

Let's look at how each module is implemented.

## 1. The Agent Loop

Modern AI coding tools aren't simple Q&A anymore. They're autonomous agents that plan and execute across multiple steps. You might expect that kind of capability to require some sophisticated multi-agent orchestration framework under the hood.

Open `query.ts`, and what you find is a `while(true)` loop.

```typescript
// query.ts
async function* queryLoop(params: QueryParams, consumedCommandUuids: string[]) {
  let state: State = {
    messages: params.messages,
    toolUseContext: params.toolUseContext,
    autoCompactTracking: undefined,
    maxOutputTokensRecoveryCount: 0,
    hasAttemptedReactiveCompact: false,
    turnCount: 1,
    // ...
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // 1. Compress context (prevent token explosion)
    // 2. Call the model, stream response
    // 3. Parse tool calls from the response
    // 4. Execute tools, collect results
    // 5. Append results to conversation history
    // 6. If no new tool calls, exit; otherwise continue
  }
}
```

Each iteration: compress context, call the model, check if the response contains `tool_use` blocks. If it does, execute those tools, append the results, loop again. When there are no more tool calls, the task is done.

This is the ReAct pattern (Reasoning + Acting), forming a tight "think → act → observe → think again" loop. Claude Code is one of the most grounded production implementations of this idea.

The model communication itself lives in `services/api/claude.ts` as `queryModel`. It handles sending the request, consuming SSE streaming output, and tracking cumulative token usage.

```typescript
// services/api/claude.ts
async function* queryModel(
  messages: Message[],
  systemPrompt: SystemPrompt,
  thinkingConfig: ThinkingConfig,
  tools: Tools,
  signal: AbortSignal,
  options: Options,
): AsyncGenerator<StreamEvent | AssistantMessage> {
  // Resolve model (including Bedrock inference profiles)
  // Merge beta headers
  // Build anthropic.beta.messages streaming request
  // Accumulate token usage
  // yield streaming events
}
```

Just above the loop definition, there's a comment block the engineers call the "Wizard's Code":

```typescript
// query.ts
/**
 * The rules of thinking are lengthy and fortuitous...
 *
 * The rules follow:
 * 1. A message that contains a thinking block must be part of a query
 *    whose max_thinking_length > 0
 * 2. A thinking block may not be the last message in a block
 * 3. Thinking blocks must be preserved for the duration of an assistant
 *    trajectory
 *
 * Heed these rules well, young wizard. For they are the rules of thinking,
 * and the rules of thinking are the rules of the universe. If ye does not
 * heed these rules, ye will be punished with an entire day of debugging
 * and hair pulling.
 */
```

Three constraints on how thinking blocks must be handled. The penalty for ignoring them: a full day of debugging and "hair pulling." Whether that's programmer humor or AI humor, hard to say.

## 2. Tool Design

The 40+ built-in tools are registered in `tools.ts` via `getAllBaseTools()`:

```typescript
// tools.ts
/**
 * NOTE: This MUST stay in sync with https://console.statsig.com/...
 * in order to cache the system prompt across users.
 */
export function getAllBaseTools(): Tools {
  return [
    AgentTool,         // Spawn sub-agents
    TaskOutputTool,    // Task output
    BashTool,          // Execute shell commands
    ...(hasEmbeddedSearchTools() ? [] : [GlobTool, GrepTool]),
    FileReadTool,
    FileEditTool,
    FileWriteTool,
    NotebookEditTool,
    WebFetchTool,
    WebSearchTool,
    TodoWriteTool,
    SkillTool,
    EnterPlanModeTool,
    ...(process.env.USER_TYPE === 'ant' ? [ConfigTool] : []),
    // ... dozens more, dynamically loaded by environment and feature flags
    ...(isToolSearchEnabledOptimistic() ? [ToolSearchTool] : []),
  ]
}
```

The comment at the top says this list must stay in sync with their A/B test configuration, otherwise the globally cached system prompt breaks. Tool registration isn't just a feature concern; it has direct cost and performance implications.

The last line, `ToolSearchTool`, is worth noting. When a user has many MCP plugins connected, Claude Code doesn't dump every tool's full description into the system prompt. Instead, it gives the model a compact list of tool names with one-line descriptions, lets the model pick what it needs, then loads the full definitions on demand. Significant token savings.

There's also `process.env.USER_TYPE === 'ant'`; "ant" is the internal code name for Anthropic employees. Anthropic uses Claude Code to build Claude Code. That explains a lot about the codebase's feel.

Each tool is created through a `buildTool` factory in `Tool.ts`, with a deliberate default value design:

```typescript
// Tool.ts
// Defaults (fail-closed where it matters):
// - isConcurrencySafe → false (assume not safe)
// - isReadOnly → false (assume writes)
// - isDestructive → false
// - toAutoClassifierInput → '' (skip classifier — security-relevant tools must override)
const TOOL_DEFAULTS = {
  isEnabled: () => true,
  isConcurrencySafe: (_input?: unknown) => false,
  isReadOnly: (_input?: unknown) => false,
  isDestructive: (_input?: unknown) => false,
  toAutoClassifierInput: () => '',
  // ...
}
```

"Fail-closed where it matters." Both `isConcurrencySafe` and `isReadOnly` default to `false`. If a tool author forgets to explicitly declare "this is read-only," the system treats it as a write operation and blocks concurrent execution.

Fail-closed is like a badge-access door: no badge, no entry. The opposite, fail-open, is a lobby where anyone can walk in. For AI tools that have full access to your codebase, defaulting to deny is the only sensible choice. `toAutoClassifierInput` also defaults to an empty string, skipping the auto-classifier check, but the comment specifically calls out that security-sensitive tools must override this. Same philosophy.

## 3. Read/Write Concurrency Separation

Say the model wants to read 3 files and edit 1 simultaneously. Do those 4 operations run sequentially or in parallel?

`toolOrchestration.ts` handles this with a read/write separation approach. The concurrency cap defaults to 10, configurable via env var:

```typescript
// services/tools/toolOrchestration.ts
function getMaxToolUseConcurrency(): number {
  return parseInt(process.env.CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY || '', 10) || 10
}
```

The batching logic:

```typescript
// services/tools/toolOrchestration.ts
function partitionToolCalls(toolUseMessages, toolUseContext): Batch[] {
  return toolUseMessages.reduce((acc, toolUse) => {
    const tool = findToolByName(toolUseContext.options.tools, toolUse.name)
    const parsedInput = tool?.inputSchema.safeParse(toolUse.input)
    const isConcurrencySafe = parsedInput?.success
      ? (() => {
          try {
            return Boolean(tool?.isConcurrencySafe(parsedInput.data))
          } catch {
            return false  // exceptions also treated as unsafe — fail-closed again
          }
        })()
      : false  // parse failures also treated as unsafe

    if (isConcurrencySafe && acc[acc.length - 1]?.isConcurrencySafe) {
      acc[acc.length - 1].blocks.push(toolUse)  // merge into concurrent batch
    } else {
      acc.push({ isConcurrencySafe, blocks: [toolUse] })  // start new batch
    }
    return acc
  }, [])
}
```

Consecutive read-only tools run in parallel. The moment a write operation appears, it waits for all preceding operations to finish. The `try-catch` matters too: if the safety check itself throws, that's treated as unsafe. Fail-closed, all the way down.

Context modifications (`contextModifier`) produced by concurrent tools don't apply immediately either. They queue up and are applied in order only after the entire batch completes:

```typescript
// services/tools/toolOrchestration.ts — runTools
if (isConcurrencySafe) {
  const queuedContextModifiers = {}
  for await (const update of runToolsConcurrently(blocks, ...)) {
    if (update.contextModifier) {
      queuedContextModifiers[toolUseID].push(modifyContext)
    }
  }
  // Apply in tool call order after all complete
  for (const block of blocks) {
    for (const modifier of queuedContextModifiers[block.id]) {
      currentContext = modifier(currentContext)
    }
  }
}
```

Anyone who's worked with databases will recognize this: reads-parallel, read-write-exclusive. Classic concurrency control, applied to an AI tool execution layer.

## 4. System Prompt Cache Splitting

Anthropic's API supports prompt caching. If the prefix of your system prompt stays constant across requests, the API caches that portion and reuses it, skipping reprocessing on subsequent calls.

In `constants/prompts.ts`, the system prompt is split at a marker called `DYNAMIC_BOUNDARY`:

```typescript
// constants/prompts.ts
export const SYSTEM_PROMPT_DYNAMIC_BOUNDARY =
  '__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__'

sections = [
  // ...static section: role definition, behavior rules, tool descriptions, tone requirements
  // === BOUNDARY MARKER - DO NOT MOVE OR REMOVE ===
  ...(shouldUseGlobalCacheScope() ? [SYSTEM_PROMPT_DYNAMIC_BOUNDARY] : []),
  // --- Dynamic content (registry-managed) ---
  ...resolvedDynamicSections,  // current time, git state, CLAUDE.md config, MCP tools, etc.
]
```

Everything above the boundary is static, shared across millions of users from the same cache. Everything below is dynamic: your current timestamp, your git repo state, your CLAUDE.md rules. Different per user, loaded independently.

The comments warn explicitly: accidentally mixing dynamic content into the static section invalidates the cache for everyone. There are even cross-file references to make sure the boundary stays coordinated:

```typescript
// constants/prompts.ts
// WARNING: Do not remove or reorder this marker without updating cache logic in:
// - src/utils/api.ts (splitSysPromptPrefix)
// - src/services/api/claude.ts (buildSystemPromptBlocks)
```

If you're building AI apps at any real call volume, this pattern can make a meaningful dent in your API costs.

## 5. Retrieval Strategy: Grep Over RAG

The model has no memory of your codebase, so it needs a way to "see" relevant code and docs. The standard industry approach is RAG: embed your project data into a vector database, retrieve semantically similar chunks at query time, and feed them to the model alongside the question.

Claude Code doesn't use RAG.

For both memory file search and historical conversation search, it uses plain `grep`.

In `memdir/memdir.ts`, the `buildSearchingPastContextSection` function makes this explicit:

```typescript
// memdir/memdir.ts
const memSearch = `grep -rn "<search term>" ${autoMemDir} --include="*.md"`
const transcriptSearch = `grep -rn "<search term>" ${projectDir}/ --include="*.jsonl"`
```

Claude Code's creator Boris Cherny has said in a podcast that they tried RAG, but letting the AI decide what to search for and how to search produces far better results.

The analogy that makes sense to me: RAG is like pre-packaging all the relevant material for an intern before they start work. Agentic search is giving them direct access to the entire document library and letting them dig. The stronger the model, the bigger the advantage for the latter approach, since the model knows better than you do what information it actually needs. And grep has no index expiry, no vector database to maintain, and an order of magnitude less engineering complexity.

The broader lesson: as models get stronger, the boundary between "what the engineering system handles" and "what the model handles" keeps shifting. A lot of things that used to require complex retrieval pipelines might just be better off left to the agent.

## 6. Three-Tier Memory Architecture

This is the most elegant design in the entire codebase, and probably the best real-world example of context engineering done well.

Anyone who's used an AI coding tool long enough has hit this: deep into a session, the AI starts contradicting itself, forgetting earlier decisions, losing the thread. Claude Code addresses this with a tiered memory system, sometimes called "self-healing memory."

### Tier 1: MEMORY.md (hot data, always loaded)

`MEMORY.md` is the index. Loaded into context on every conversation.

```typescript
// memdir/memdir.ts
export const ENTRYPOINT_NAME = 'MEMORY.md'
export const MAX_ENTRYPOINT_LINES = 200
// ~125 chars/line at 200 lines. At p97 today; catches long-line indexes that
// slip past the line cap (p100 observed: 197KB under 200 lines).
export const MAX_ENTRYPOINT_BYTES = 25_000
```

Hard capped at 200 lines and 25KB. It stores pointers, not content. Each line stays under 150 characters. The reason: this file permanently occupies context window space, so bloating it directly crowds out useful conversation.

The 25KB byte cap was added after the fact. Someone found a way to stay under 200 lines while writing enough per line that the file hit 197KB. So they added a byte floor.

When truncation kicks in:

```typescript
// memdir/memdir.ts
export function truncateEntrypointContent(raw: string): EntrypointTruncation {
  // First truncate by line count
  let truncated = wasLineTruncated
    ? contentLines.slice(0, MAX_ENTRYPOINT_LINES).join('\n')
    : trimmed
  // Then truncate by bytes, cutting at the last newline to avoid mid-line cuts
  if (truncated.length > MAX_ENTRYPOINT_BYTES) {
    const cutAt = truncated.lastIndexOf('\n', MAX_ENTRYPOINT_BYTES)
    truncated = truncated.slice(0, cutAt > 0 ? cutAt : MAX_ENTRYPOINT_BYTES)
  }

  // Append a WARNING so the model knows the index was partially loaded
  return {
    content: truncated +
      `\n\n> WARNING: ${ENTRYPOINT_NAME} is ${reason}. Only part of it was loaded.`,
  }
}
```

Line cap plus byte cap, cutting at word boundaries, and then explicitly telling the model "this index is incomplete." That last part is the detail that actually matters. Without it, the model would silently work with partial information.

### Tier 2: Topic files (warm data, loaded on demand)

Coding preferences, architectural decisions, known pitfalls: these live in individual topic files like `user_role.md` or `feedback_testing.md`.

At the start of each conversation, a lighter Sonnet model picks up to 5 files that are relevant to the current query. The selection prompt from `findRelevantMemories.ts`:

```typescript
// memdir/findRelevantMemories.ts
const SELECT_MEMORIES_SYSTEM_PROMPT = `You are selecting memories that will be
useful to Claude Code as it processes a user's query.
Return a list of filenames for the memories that will clearly be useful (up to 5).
- If a list of recently-used tools is provided, do not select memories that are
  usage reference or API documentation for those tools (Claude Code is already
  exercising them). DO still select memories containing warnings, gotchas, or
  known issues about those tools — active use is exactly when those matter.`
```

That last rule is the punchline. If a tool is actively being used, skip its documentation (you clearly know how to use it), but always load its known issues. When you're actively using something, gotchas are exactly what you need.

Also: Claude Code's memory never stores code. Code changes; memory doesn't auto-update. If a memory says "function X is on line 30" and you've since refactored, that memory is now actively misleading. So memory tracks preferences and judgments, while code facts are always read from source in real time. Cache-database consistency problems, eliminated at the design level.

### Tier 3: Conversation history (cold data, grep search)

Older conversations are stored as `.jsonl` files and searched by keyword with `grep` when needed.

Hot data stays resident. Warm data loads on demand. Cold data is searched. Different temperature, different access pattern.

## 7. Five-Level Context Compression

Context windows have limits. Long sessions with lots of tool call results will burn through tokens fast, and at some point you'll either hit the window ceiling or run up a serious bill.

Claude Code handles this with five compression strategies, applied lightest-to-heaviest:

1. **Snip**: strip old tool call results down to structure only, discard content
2. **Microcompact**: offload large tool execution results to a cache (not deleted, since sub-agents may still need them)
3. **Context Collapse**: summarize intermediate conversation, keeping only key information
4. **Autocompact**: full summary compression when context usage crosses a threshold
5. **Reactive Compact**: emergency fallback, triggered when the API returns a 413 "prompt too long" error

Three of these are loaded via feature flags in `query.ts`:

```typescript
// query.ts
const reactiveCompact = feature('REACTIVE_COMPACT')
  ? require('./services/compact/reactiveCompact.js') : null
const contextCollapse = feature('CONTEXT_COLLAPSE')
  ? require('./services/contextCollapse/index.js') : null
const snipModule = feature('HISTORY_SNIP')
  ? require('./services/compact/snipCompact.js') : null
```

There's also a circuit breaker in `services/compact/autoCompact.ts`:

```typescript
// services/compact/autoCompact.ts
// Stop trying autocompact after this many consecutive failures.
// BQ 2026-03-10: 1,279 sessions had 50+ consecutive failures
// (up to 3,272) in a single session, wasting ~250K API calls/day globally.
const MAX_CONSECUTIVE_AUTOCOMPACT_FAILURES = 3
```

Those numbers: on March 10, 2026, they measured 1,279 sessions with 50+ consecutive compression failures, with the worst single session failing 3,272 times and still retrying. 250,000 wasted API calls per day globally. The fix: stop after 3 consecutive failures. Classic circuit breaker.

## 8. Security Layer

Claude Code has a `--dangerously-skip-permissions` flag (also known as YOLO mode) that bypasses all permission prompts and lets the AI execute freely.

It's not as unguarded as it sounds. There's a shadow AI running quietly in the background.

`utils/permissions/yoloClassifier.ts` runs an independent classifier on every action the main model wants to take:

```typescript
// utils/permissions/yoloClassifier.ts
export async function classifyYoloAction(
  toolName: string,
  toolInput: Record<string, unknown>,
  // ...
): Promise<'allow' | 'soft_deny' | 'hard_deny'> {
  // allow: safe, proceed
  // soft_deny: risky, downgrade to manual confirmation
  // hard_deny: blocked, no negotiation
}
```

And the YOLO classifier is just one checkpoint. A single tool call passes through at least:

1. Current run mode (Plan / Auto / Bypass)
2. User-defined rules in hooks
3. YOLO Classifier model analysis
4. Bash command danger classification (things like `rm -rf` get blocked outright)
5. Rules engine from config files

Multiple permission sources are evaluated and the most restrictive result wins.

The Bash security checks in `tools/BashTool/bashSecurity.ts` cover 23 distinct rules:

```typescript
// tools/BashTool/bashSecurity.ts
const BASH_SECURITY_CHECK_IDS = {
  INCOMPLETE_COMMANDS: 1,       // Commands starting with tab or dash
  JQ_SYSTEM_FUNCTION: 2,        // jq system() function calls
  OBFUSCATED_FLAGS: 4,          // Obfuscated CLI flags
  SHELL_METACHARACTERS: 5,      // Dangerous shell metacharacters
  DANGEROUS_VARIABLES: 6,       // Dangerous environment variable injection
  IFS_INJECTION: 11,            // IFS variable injection
  PROC_ENVIRON_ACCESS: 13,      // /proc/environ access
  CONTROL_CHARACTERS: 17,       // Control characters
  UNICODE_WHITESPACE: 18,       // Unicode whitespace spoofing
  ZSH_DANGEROUS_COMMANDS: 20,   // Zsh dangerous commands (zmodload, etc.)
  COMMENT_QUOTE_DESYNC: 22,     // Comment/quote state desync
  QUOTED_NEWLINE: 23,           // Newlines inside quotes
  // ... 23 total
}
```

Rule 18 (`UNICODE_WHITESPACE`) covers attacks using zero-width Unicode characters to make what the security checker sees differ from what the shell actually executes. Rule 20 covers `zmodload` in Zsh, which can load modules that bypass standard file and network checks. The threat modeling here is serious.

## 9. Feature Flags and the Product Roadmap

The codebase is full of `feature('XXX')` gates:

```typescript
// tools.ts
const SleepTool = feature('PROACTIVE') || feature('KAIROS')
  ? require('./tools/SleepTool/SleepTool.js').SleepTool : null

const WebBrowserTool = feature('WEB_BROWSER_TOOL')
  ? require('./tools/WebBrowserTool/WebBrowserTool.js').WebBrowserTool : null
```

Standard feature flag pattern: experimental features gated behind flags, with per-user and per-environment gradual rollout. If something breaks, flip the flag rather than rolling back code. With conditional `require`, disabled features get tree-shaken out at build time too.

The flags also function as an accidental product roadmap preview:

**KAIROS**: a persistent long-running assistant mode, designed to run continuously for 24 hours. It includes something called `AutoDream`: the AI works and takes notes during the day, then automatically consolidates its memory overnight.

**COORDINATOR_MODE**: multi-agent coordination. One AI orchestrating multiple AI workers. The workflow in `coordinatorMode.ts` has four phases:

| Phase          | Who                | Purpose                                               |
|----------------|--------------------|-------------------------------------------------------|
| Research       | Workers (parallel) | Investigate codebase, find files, understand problem  |
| Synthesis      | You (coordinator)  | Read findings, craft implementation specs             |
| Implementation | Workers            | Make targeted changes per spec, commit                |
| Verification   | Workers            | Test changes work                                     |

Sub-agents communicate through a `Mailbox` in `utils/mailbox.ts`, a file-based message queue.

Other flags in the codebase: `VOICE_MODE`, `WEB_BROWSER_TOOL`, and more.

## 10. Anti-Distillation and Undercover Mode

Two defensive mechanisms built into the source to prevent capability theft and internal information leakage.

**Anti-distillation.** A competitor could record Claude Code's API traffic and use those input-output pairs to distill a smaller model with similar behavior. Anthropic's response: inject fake tool definitions into the API request.

```typescript
// services/api/claude.ts
// Anti-distillation: send fake_tools opt-in for 1P CLI only
if (feature('ANTI_DISTILLATION_CC')
    && process.env.CLAUDE_CODE_ENTRYPOINT === 'cli'
    && shouldIncludeFirstPartyOnlyBetas()
) {
  result.anti_distillation = ['fake_tools']
}
```

Not encryption or rate limiting. It actively feeds bad training data into any captured traffic, so any model trained on those recordings degrades over time. A counterintelligence approach. It only activates in the official first-party CLI, not through the SDK or other integrations.

**Undercover mode.** When Anthropic employees use Claude Code to contribute to open-source projects, this mode activates automatically:

```typescript
// utils/undercover.ts
/**
 * Undercover mode — safety utilities for contributing to public repos.
 * When active, Claude Code strips all attribution to avoid leaking internal
 * model codenames, project names, or other Anthropic-internal information.
 * The model is not told what model it is.
 *
 * There is NO force-OFF. This guards against model codename leaks.
 */

export function isUndercover(): boolean {
  if (process.env.USER_TYPE === 'ant') {
    if (isEnvTruthy(process.env.CLAUDE_CODE_UNDERCOVER)) return true
    // Auto: active unless we've confirmed we're in an internal repo.
    return getRepoClassCached() !== 'internal'
  }
  return false
}
```

"There is NO force-OFF." It defaults to active for Anthropic employees and only turns off when the repo is confirmed internal. The concern is clearly internal model codenames leaking through open-source commit history.

## 11. Miscellaneous Details

A few more things buried in the source worth calling out.

**A virtual pet system.** In the `buddy/` directory, there's a full digital pet system with 18 species:

```typescript
// buddy/types.ts
export const SPECIES = [
  duck, goose, blob, cat, dragon, octopus, owl, penguin,
  turtle, snail, ghost, axolotl, capybara, cactus, robot,
  rabbit, mushroom, chonk,
] as const
```

Originally planned as an April teaser ahead of a May launch. For when the AI needs a break from writing code.

**Hardcoded directory guidance.** Claude used to waste a full turn running `mkdir` or checking if a directory existed before writing. The fix: hardcode a hint in `memdir/memdir.ts` telling the model the directory already exists:

```typescript
// memdir/memdir.ts
// Shipped because Claude was burning turns on `ls`/`mkdir -p` before writing.
export const DIR_EXISTS_GUIDANCE =
  'This directory already exists — write to it directly with the Write tool
  (do not run mkdir or check for its existence).'
```

**Obsessive startup performance.** The entry point in `cli.tsx` uses `await import()` for everything, loading modules dynamically on demand. The `--version` flag returns immediately without loading a single module.

During the few hundred milliseconds the main module is loading, an "early input capturer" (`utils/earlyInput.ts`) buffers any keystrokes you type, then replays them after the module loads. The effect: it feels like the tool responded before you finished typing.

There's also a TCP preconnect in `utils/apiPreconnect.ts` that fires during initialization, overlapping the TCP+TLS handshake with startup work to save 100-200ms on the first API call:

```typescript
// utils/apiPreconnect.ts
/**
 * Preconnect to the Anthropic API to overlap TCP+TLS handshake with startup.
 * The TCP+TLS handshake is ~100-200ms that normally blocks inside the first
 * API call. Kicking a fire-and-forget fetch during init lets the handshake
 * happen in parallel with action-handler work.
 */
```

## Closing Thoughts

Looking at the source end-to-end, there's no secret sauce. No novel algorithms. Everything in Claude Code is built on concepts that working engineers have encountered before: concurrency control, read/write separation, layered caching, circuit breakers, feature flags.

What's impressive is how well those fundamentals are applied to the specific constraints of an AI agent that has full access to your codebase. Every design decision has a reason. Every default is conservative. Every edge case is handled explicitly.

As an architecture reference for anyone building AI applications, it's hard to beat. Agent loops, tool system design, memory management, security layers: it's all here, production-hardened and annotated.

The fundamentals matter. They always did.
