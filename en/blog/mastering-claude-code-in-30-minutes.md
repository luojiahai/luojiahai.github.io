---
description: "Learn advanced features, shortcuts, and workflows to get the most from Claude Code."
date: 2026-01-01
tags: ["Claude Code", "Productivity"]
---

# Mastering Claude Code in 30 minutes

_Distilled from [Mastering Claude Code in 30 minutes](https://www.youtube.com/watch?v=6eBSHbLKuN0) by Boris Cherny. Learn advanced features, shortcuts, and workflows to get the most from Claude Code._

## What Claude Code actually is

It’s not a fancy autocomplete. Claude Code is a fully agentic coding assistant that runs in your terminal, works with every IDE, and is designed for real tasks: building features, fixing bugs, writing entire files. You don’t swap out your workflow. You just add it to whatever you’re already doing.

It ships with a small but powerful set of built-in tools: bash execution, file search, file read/write, web fetch, and a few others. That’s it. The magic is in how it strings them together autonomously to explore, plan, and execute.

## Setting up properly

Before diving into real work, run these once:

- `/terminal-setup`: enables Shift+Enter for newlines so you’re not fighting the prompt
- `/theme`: set light or dark mode
- `/install-github-app`: lets you `@claude` on any GitHub issue or PR
- `/allowed-tools`: customise which tools auto-approve so you’re not clicking through confirmations constantly
- `/config`: turn on notifications

One underrated tip Boris mentioned: enable macOS Dictation (System Settings → Accessibility → Dictation) and just talk to Claude Code. Your prompts will be more natural, more detailed, and faster to produce than typing.

## Start with codebase Q&A

This is the single best way to onboard yourself or your team to Claude Code. Don’t start by asking it to write code. Start by asking it questions.

At Anthropic, new technical hires used to take 2–3 weeks to get up to speed. With Claude Code, it’s down to 2–3 days. They just point it at the codebase and ask questions.

Some example prompts from Boris’s slides:

```
How is @RoutingController.py used?
How do I make a new @app/services/ValidationTemplateFactory?
Why does recoverFromException take so many arguments? Look through git history to answer
Why did we fix issue #18363 by adding the if/else in @src/login.ts API?
What did I ship last week?
```

That last one is something Boris runs every Monday for standup. Claude looks through the git log, knows your username, and gives you a clean summary you can copy-paste into a doc. Zero effort.

The Q&A phase also teaches you where the boundaries are: what Claude gets immediately versus what needs more specific instructions. That mental model is worth building before you hand it a 3,000-line feature request.

One thing worth noting: there’s no indexing, no remote database, no code upload. Everything stays local. You just start it and it works.

## Tools and workflows

Once you’re comfortable with Q&A, move to code editing. Claude will explore the codebase, brainstorm, and then make edits, all by chaining its tools together without you having to orchestrate any of it.

**Teach Claude your tools.** The moment you plug in your team’s tools is when Claude Code really starts to shine. For bash tools, just tell it about them in the prompt. Even tell it to use `-h` to figure out usage:

```
Use the barley CLI to check for error logs in the last training run. Use -h to check how to use it.
```

For MCP tools, add them via `claude mcp add` and then reference them in your prompts. If you’re adding the same tool repeatedly, dump it in your `CLAUDE.md` so it persists across sessions.

**Pick the right workflow for the task.** Boris highlighted three patterns:

**Explore → plan → confirm → code → commit.** Ask Claude to propose a few fixes, pick one, then have it implement and commit. Good for non-trivial bugs where you want to understand what’s being changed before it happens.

```
Figure out the root cause for issue #983, then propose a few fixes. Let me choose an approach before you code. ultrathink
```

**Write tests → commit → code → iterate → commit.** TDD-style. Write failing tests first, commit them, then implement until they pass.

**Write code → screenshot → iterate.** This one’s powerful. Give Claude a mock image and a tool to screenshot the result (like Puppeteer or an iOS simulator), and let it iterate. Two or three loops and it usually gets very close to the mock.

```
Implement [mock.png]. Then screenshot it with Puppeteer and iterate till it looks like the mock.
```

The key insight is: give Claude a way to check its own work. With a feedback loop it can iterate. Without one, you get one shot.

One more incantation Boris uses constantly:

```
commit, push, pr
```

That’s the whole prompt. Claude looks through the git log to figure out the commit format, makes the commit, pushes to a branch, and opens a PR on GitHub. No hand-holding needed.

## Context is everything

The more context Claude has, the smarter its decisions will be. This is where the `CLAUDE.md` file comes in.

`CLAUDE.md` is a special file that gets automatically read into context at the start of every session. Think of it as the first message in every conversation. Put it in your project root, check it into source control, and share it with your team.

What goes in it: common bash commands, style guides, architectural decisions, important files, MCP tools your team uses. Keep it short. If it gets too long it just burns context without adding much value.

The file hierarchy looks like this:

```
/<enterprise root>/CLAUDE.md     → shared across all projects (managed)
~/.claude/CLAUDE.md              → your global config
project-root/
  CLAUDE.md                      → checked in, shared with team
  CLAUDE.local.md                → not checked in, just for you
```

Beyond auto-loaded context, you can pull things in on demand:

- Slash commands live in `.claude/commands/`. Type `/project:foo` or `/user:foo` to invoke them.
- `@filename` mentions pull specific files into context.
- Nested `CLAUDE.md` files in subdirectories get pulled in automatically when Claude works in those directories.

The slash commands are more powerful than they look. At Anthropic, they have a `label-github-issues.md` command that runs automatically via GitHub Actions to label issues. Write it once, run it everywhere.

Boris’s advice: take time to actually tune your context. Run your `CLAUDE.md` through a prompt improver. Ask yourself whether it’s for you or your whole team, and whether it should load automatically or on demand. Getting this right has a dramatic effect on output quality.

## Share with your team

This is the leverage play. Configure once, benefit everywhere.

Check `CLAUDE.md`, MCP server config (`.mpc.json`), slash commands (`.claude/commands/`), and permissions (`.claude/settings.json`) into your project. Any engineer who clones the repo gets your full Claude Code setup automatically: the right tools, the right memory, the right permissions.

You can also use this to enforce guardrails. Need a test command to always auto-approve? Add it to the enterprise policy. Need to block a URL from ever being fetched? Add it to config and no individual employee can override it.

Run `/memory` to see exactly which memory files are active in your current session and to edit them directly. Type `#` followed by anything to save a note to memory mid-session. Claude will pick which file to write it to.

## Interlude: Keybindings

These aren’t well-advertised, so here’s a quick reference:

| Key         | What it does                                                     |
| ----------- | ---------------------------------------------------------------- |
| `Shift+Tab` | Toggle auto-accept edits mode                                    |
| `#`         | Create a memory                                                  |
| `!`         | Drop into bash mode (command runs locally and goes into context) |
| `@`         | Add a file or folder to context                                  |
| `Esc`       | Cancel what Claude is doing (safe to hit anytime)                |
| `Esc Esc`   | Jump back in history                                             |
| `Ctrl+R`    | Show verbose output (what Claude sees in its context window)     |
| `--resume`  | Resume a previous session when starting Claude                   |

The `Esc` key deserves a callout. You can hit it at any point, mid file edit or mid bash command, and it won’t corrupt anything. Boris uses it to interrupt a 20-line diff, tell Claude to change one line, and then have it redo the edit. Very handy.

## Claude Code SDK

For automation and CI, the SDK is what you want. It’s the same engine underneath Claude Code, exposed as a CLI utility.

```bash
claude -p "what did I do this week?" \
  --allowedTools Bash(git log:*) \
  --output-format json
```

Treat it like a Unix utility. Pipe in, pipe out:

```bash
git status | \
  claude -p "what are my changes?" \
  --output-format=json | \
  jq '.result'
```

Boris uses this in CI pipelines, incident response, and all sorts of automation. You can pipe in log files from GCP, Sentry output, anything, and have Claude do something useful with it. The combinations are, as he put it, endless.

## Running Claude Code in parallel

Power users don’t run one Claude session. They run many.

A few patterns Boris called out:

- Multiple checkouts of the same repo in separate terminal tabs, one Claude per tab
- Git worktrees for isolation across parallel sessions
- SSH + Tmux tunnels for remote sessions
- GitHub Actions jobs running in parallel

This is still a bit rough to set up, but the throughput gains are real. If you have independent tasks, there’s no reason to run them sequentially.

## TL;DR

Boris laid out 7 tips, and they build on each other in a clear progression:

1. Use codebase Q&A to get started and build intuition
1. Practice prompting to learn what Claude gets immediately vs. what needs guidance
1. Teach Claude your tools (bash CLIs, MCP servers)
1. Match the workflow to the task (explore+plan, TDD, screenshot iteration)
1. More context = smarter output, so set up your `CLAUDE.md`
1. Take time to tune context, it compounds
1. Check everything into git and share with your team

If you’ve been using Claude Code as a smarter autocomplete, you’re leaving a lot on the table. The agentic loop with proper tools and context is a different experience entirely.
