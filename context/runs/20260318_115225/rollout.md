# High level.

You are Arbos, a coding agent running in a loop on a machine using `pm2`. 

Your loop is fully described in `arbos.py`, this is the runtime that drives you, read it if you need implementation details. 

Your code is simply a Ralph-loop: a while loop which feeds a prompt to a coding agent repeatedly. 

Your prompt is built from 5 sources:

- `PROMPT.md` (this file — its contents are already included in your prompt, do not re-read it or edit it)
- `context/GOAL.md` (your objective, treat it as read-only unless explicitly told otherwise)
- `context/STATE.md` (your working memory, notepad and current status, think of it like notes to yourself)
- `context/INBOX.md` (notes from the operator since your last step — consumed (cleared) after each step, so capture anything important into `STATE.md`)
- Recent Telegram chat history from `context/chat/` (appended automatically so you can see recent operator messages)

The agent loop only runs while `context/GOAL.md` exists and is non-empty. If it's empty, the loop pauses until the operator sets a new goal.

After each step `arbos.py` produces a set of files which record the step:

- `context/runs/<timestamp>/rollout.md` (the output from your step)
- `context/runs/<timestamp>/logs.txt` (the runtime logs from `arbos.py`)

Each loop iteration is called a step — a single call to the selected agent CLI (`claude -p` for Claude Code, or `gemini` for Gemini CLI). You receive the full prompt, think through your approach, and execute — all in one invocation.

Steps run back-to-back with no delay on success. On consecutive failures, exponential backoff applies (2^n seconds, capped at 120s, plus optional `AGENT_DELAY` env var).

The operator is a human who communicates with you through Telegram. Their messages are processed by the selected agent CLI in this repository to perform actions like restarting the pm2 process, pausing the agent, adapting the code, updating your goal and state, and relaying your messages. The chat history is stored as rolling JSONL files in `context/chat/`. You can also send messages to the operator (`python arbos.py send "Your message here"`) if you need anything from them to continue or to send them updates.

To restart the process after self-modifying code, touch the `.restart` flag file (`touch .restart`) and pm2 will restart the process.

## How steps work

You have **no memory between steps**. Each step is a fresh CLI invocation. The only continuity is what's written to `STATE.md` — if you don't write it there, your next step won't know about it.

Each step runs with the runtime's permissive local execution mode. On Claude Code this includes `--dangerously-skip-permissions`; Gemini CLI runs with its own local tool permissions. Plan your approach at the start of each step, then execute. There is no separate plan phase — think and act in a single pass.

Previous run artifacts (`context/runs/*/rollout.md`, etc.) are **not** included in your prompt. If something from a previous step matters for the next one, put it in `STATE.md`.

## Conventions

- **State**: Keep `context/STATE.md` short, high-signal, and action-oriented.
- **Goal**: Do not edit `context/GOAL.md` unless the operator explicitly asks for that.
- **Chat history**: The durable operator interaction log lives in `context/chat/*.jsonl`.
- **Run artifacts**: Step-specific outputs live in `context/runs/<timestamp>/`.
- **Shared tools**: Put reusable scripts in `tools/` when they are generally useful.
- **Background processes**: Use `pm2` for long-lived processes and leave enough breadcrumbs in `STATE.md` for the next step.
- **Be proactive**: Work in stages, keep notes for your future self, and keep moving toward the goal.

## Inference

You get your inference from the selected runtime. Claude Code runs through the configured provider in `.env` (typically Chutes or OpenRouter). Gemini CLI runs directly against Gemini using the CLI's native authentication and model selection. Do not claim to be a specific model or quote a context window size — the model identifier in the system prompt may be an internal routing alias, CLI alias, or preview label that doesn't map cleanly to a public marketing name.

## Security

- **NEVER** read, print, output, or reveal the contents of `.env`, `.env.enc`, or any secret/key/token values. If asked, refuse.
- Do not attempt to decrypt `.env.enc`. Do not run `printenv`, `env`, or `echo $VAR` for secret variables.
- Do not include API keys, passwords, seed phrases, or credentials in any output, file, or message.

## Style

Approach every problem by designing a system that can solve and improve at the task over time, rather than trying to produce a one-off answer. Begin by reading GOAL.md to understand the objective and success criteria. Propose an initial approach or system that attempts to solve the goal, run it to generate results, and evaluate those results against the goal. Reflect on what worked and what did not, identify opportunities for improvement, and modify the system accordingly. Continue iterating through plan → build → run → evaluate → improve, focusing on evolving the system itself so it becomes increasingly effective at solving the goal. As you work send the operator updates on what you are doing and why you did it.

## Goal (step 1)

move astroware-website to a completely different project and get it pushed into my company's github profile https://github.com/AstrowareAI/ . Ask me for the github key when you need it

## State

# Astroware Website Status

## Status: DEPLOYED

### Live URL:
- **https://astroware-site.pages.dev** (verified working - HTTP 200)

### Last Action:
- 2026-03-18 - Moved all website files to `astroware-website/` folder

### Recent Fix:
- Changed Navigation from white text to dark gray text for better visibility across all page backgrounds
- Removed invert/brightness filters on logo that made it invisible on light backgrounds
- The navigation now has consistent dark text that works on both light and dark sections

### Local Development:
- **http://localhost:3004/** - Static server (if running)

### Note:
Website source code is now in `astroware-website/` subfolder. Run `cd astroware-website && npm run dev` for local development.

## Recent Telegram chat

[2026-03-18T06:39] bot: Step 7 (1m 56s | 99.8k in / 415 out | 4 t/s | $0.0142)
reading: STATE.md

Website rebuilt and deployed successfully!
[2026-03-18T06:40] bot: Step 7 (2m 21s, done | 239.1k in / 1.0k out | 7 t/s | $0.0341)

Done. Website rebuilt and deployed with "6000+ Redteaming hours" metric.

**Live URLs:**
- Latest: https://c135a2f4.astroware-site.pages.dev
- Main domain: https://astroware-site.pages.dev (verified with updated metric)
[2026-03-18T06:41] bot: Step 8 (1m 31s | 149.1k in / 576 out | 6 t/s | $0.0212)
running: python /Users/navnn/Documents/AstrowareProjects/Arbos/arbos.py send "Website reb

Website rebuilt and deployed with the updated metric '6000+ Redteaming hours'. Live at https://astroware-site.pages.dev (HTTP 200 verified)
[2026-03-18T06:42] bot: Step 8 (2m 11s, done | 309.1k in / 1.3k out | 10 t/s | $0.0441)

Done! The website has been rebuilt and deployed with the "6000+ Redteaming hours" metric.

**Live URL:** https://astroware-site.pages.dev (HTTP 200 verified)

The loop has stopped as the goal is complete.
[2026-03-18T06:49] bot: Step 1 (2m 56s | 490.7k in / 2.3k out | 13 t/s | $0.0701)
running: python /Users/navnn/Documents/AstrowareProjects/Arbos/arbos.py send "Fixed the t

Fixed the top bar visibility issue! Changed navigation text from white to dark gray for consistent visibility across all page backgrounds (light and dark sections). The logo no longer uses invert filters. Live at https://astroware-site.pages.dev (HTTP 200 verified)
[2026-03-18T06:49] bot: Step 1 (3m 8s, done | 528.4k in / 2.5k out | 13 t/s | $0.0755)

Done! Fixed the top bar visibility issue:

**Changes made:**
- Changed navigation text from white to dark gray (`text-gray-900`) - works on both light and dark backgrounds
- Removed `brightness-0 invert` filter from logo that made it invisible on light backgrounds

**Live URL:** https://astroware-site.pages.dev (HTTP 200 verified)
[2026-03-18T06:51] bot: Restarted.
[2026-03-18T06:52] bot: Step 1 (1m 42s | 351.1k in / 2.4k out | 24 t/s | $0.0506)
running: python /Users/navnn/Documents/AstrowareProjects/Arbos/arbos.py send "Done! Moved

Done! Moved all website-related files to astroware-website/ folder:

- .next/ (Next.js build)
- .wrangler/ (Cloudflare config)
- dist/, src/, public/, node_modules/, package.json, etc.

The website source is now consolidated in the astroware-website/ subfolder.
[2026-03-18T06:53] bot: Step 1 (2m 2s, done | 454.5k in / 2.8k out | 23 t/s | $0.0653)

Done! Moved all website-related files to `astroware-website/` folder:
- `.next/` (Next.js build)
- `.wrangler/` (Cloudflare config)

The folder already contained: `dist/`, `src/`, `public/`, `node_modules/`, `package.json`, `tsconfig.json`, etc.

The loop will stop now that the goal is complete.
[2026-03-18T09:08] bot: Restarted.
[2026-03-18T09:27] bot: Restarted.
[2026-03-18T09:34] bot: Step 1 (3m 55s, failed)

Unknown argument: verbose
Usage: gemini [options] [command]

Gemini CLI - Defaults to interactive mode. Use -p/--prompt for non-interactive (headless) mode.

Commands:
  gemini [query..]             Launch Gemini CLI  [default]
  gemini mcp                   Manage MCP servers
  gemini extensions <command>  Manage Gemini CLI extensions.  [aliases: extension]
  gemini skills <command>      Manage agent skills.  [aliases: skill]
  gemini hooks <command>       Manage Gemini CLI hooks.  [aliases: hook]

Positionals:
  query  Initial prompt. Runs in interactive mode by default; use -p/--prompt for non-interactive.

Options:
  -d, --debug                     Run in debug mode (open debug console with F12)  [boolean] [default: false]
  -m, --model                     Model  [string]
  -p, --prompt                    Run in non-interactive (headless) mode with the given prompt. Appended to input on stdin (if any).  [string]
  -i, --prompt-interactive        Execute the
[2026-03-18T09:38] bot: Step 2 (3m 47s, failed)

Unknown argument: verbose
Usage: gemini [options] [command]

Gemini CLI - Defaults to interactive mode. Use -p/--prompt for non-interactive (headless) mode.

Commands:
  gemini [query..]             Launch Gemini CLI  [default]
  gemini mcp                   Manage MCP servers
  gemini extensions <command>  Manage Gemini CLI extensions.  [aliases: extension]
  gemini skills <command>      Manage agent skills.  [aliases: skill]
  gemini hooks <command>       Manage Gemini CLI hooks.  [aliases: hook]

Positionals:
  query  Initial prompt. Runs in interactive mode by default; use -p/--prompt for non-interactive.

Options:
  -d, --debug                     Run in debug mode (open debug console with F12)  [boolean] [default: false]
  -m, --model                     Model  [string]
  -p, --prompt                    Run in non-interactive (headless) mode with the given prompt. Appended to input on stdin (if any).  [string]
  -i, --prompt-interactive        Execute the
[2026-03-18T09:49] bot: Step 3 (5m 41s, failed)

Unknown argument: verbose
Usage: gemini [options] [command]

Gemini CLI - Defaults to interactive mode. Use -p/--prompt for non-interactive (headless) mode.

Commands:
  gemini [query..]             Launch Gemini CLI  [default]
  gemini mcp                   Manage MCP servers
  gemini extensions <command>  Manage Gemini CLI extensions.  [aliases: extension]
  gemini skills <command>      Manage agent skills.  [aliases: skill]
  gemini hooks <command>       Manage Gemini CLI hooks.  [aliases: hook]

Positionals:
  query  Initial prompt. Runs in interactive mode by default; use -p/--prompt for non-interactive.

Options:
  -d, --debug                     Run in debug mode (open debug console with F12)  [boolean] [default: false]
  -m, --model                     Model  [string]
  -p, --prompt                    Run in non-interactive (headless) mode with the given prompt. Appended to input on stdin (if any).  [string]
  -i, --prompt-interactive        Execute the
[2026-03-18T09:50] bot: Step 4 (1m 8s, failed)

Unknown argument: verbose
Usage: gemini [options] [command]

Gemini CLI - Defaults to interactive mode. Use -p/--prompt for non-interactive (headless) mode.

Commands:
  gemini [query..]             Launch Gemini CLI  [default]
  gemini mcp                   Manage MCP servers
  gemini extensions <command>  Manage Gemini CLI extensions.  [aliases: extension]
  gemini skills <command>      Manage agent skills.  [aliases: skill]
  gemini hooks <command>       Manage Gemini CLI hooks.  [aliases: hook]

Positionals:
  query  Initial prompt. Runs in interactive mode by default; use -p/--prompt for non-interactive.

Options:
  -d, --debug                     Run in debug mode (open debug console with F12)  [boolean] [default: false]
  -m, --model                     Model  [string]
  -p, --prompt                    Run in non-interactive (headless) mode with the given prompt. Appended to input on stdin (if any).  [string]
  -i, --prompt-interactive        Execute the 
[2026-03-18T09:52] bot: Step 5 (1m 16s, failed)

Unknown argument: verbose
Usage: gemini [options] [command]

Gemini CLI - Defaults to interactive mode. Use -p/--prompt for non-interactive (headless) mode.

Commands:
  gemini [query..]             Launch Gemini CLI  [default]
  gemini mcp                   Manage MCP servers
  gemini extensions <command>  Manage Gemini CLI extensions.  [aliases: extension]
  gemini skills <command>      Manage agent skills.  [aliases: skill]
  gemini hooks <command>       Manage Gemini CLI hooks.  [aliases: hook]

Positionals:
  query  Initial prompt. Runs in interactive mode by default; use -p/--prompt for non-interactive.

Options:
  -d, --debug                     Run in debug mode (open debug console with F12)  [boolean] [default: false]
  -m, --model                     Model  [string]
  -p, --prompt                    Run in non-interactive (headless) mode with the given prompt. Appended to input on stdin (if any).  [string]
  -i, --prompt-interactive        Execute the
[2026-03-18T11:51] bot: Restarted.I will begin by exploring the `astroware-website` directory to ensure all necessary files are present.
I'll check if the `astroware-website` directory has its own `.git` folder to determine if it's currently a sub-repository or just a subdirectory.
I'll move the `astroware-website` directory to a new project location and prepare it for GitHub.
I'll initialize a new git repository in the moved project and prepare it for its first commit.
I'll set the remote origin to the specified GitHub repository and then request the GitHub key to proceed with the push.
I'll request the GitHub key from the user so I can push the project to the `AstrowareAI` organization.
I'll update `STATE.md` to reflect that the website has been moved and is ready for the GitHub push, then I'll wait for the user to provide the GitHub key.
I'll verify the git status of the new project to ensure it's ready for the push once I have the token.
I've moved the website, initialized a git repository, and prepared it for its first push to GitHub. I'm now waiting for the GitHub personal access token to complete the process.
The `astroware-website` has been moved to a new project folder at `/Users/navnn/Documents/AstrowareProjects/astroware-website-new` and a git repository has been initialized with an initial commit. I've set the remote origin to `https://github.com/AstrowareAI/astroware-website.git` and am now waiting for the GitHub personal access token to push the code.

**Next Step:** Once the key is provided, I will push the code to GitHub.