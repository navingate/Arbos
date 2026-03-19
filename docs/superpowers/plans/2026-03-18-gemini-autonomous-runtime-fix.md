# Gemini Autonomous Runtime Fix Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the Gemini runtime path so Arbos launches Gemini CLI in non-interactive autonomous mode instead of failing on unsupported flags or hanging on approvals.

**Architecture:** Keep the existing Gemini provider path in `arbos.py`, but change the subprocess contract to match Gemini CLI's current headless interface: use `-p` for prompt injection, `--output-format stream-json` for JSONL events, `--approval-mode yolo` for autonomous tool approval, and explicitly disable sandboxing for the subprocess so behavior matches Claude's unrestricted local execution mode more closely.

**Tech Stack:** Python runtime (`arbos.py`), Python `unittest`, Gemini CLI command-line flags

---

### Task 1: Add a failing regression test

**Files:**
- Modify: `tests/test_run_sh_installer.py`
- Test: `tests/test_run_sh_installer.py`

- [ ] **Step 1: Write the failing test**

Add assertions that the Gemini branch in `arbos.py`:
- uses `["gemini", "-p", prompt]`
- includes `--approval-mode` and `yolo`
- does not include `--verbose`
- sets `GEMINI_SANDBOX=false` in the Gemini env path

- [ ] **Step 2: Run the test to verify it fails**

Run: `python3 -m unittest tests.test_run_sh_installer -v`
Expected: FAIL because the current Gemini command still uses a positional prompt plus `--verbose`.

- [ ] **Step 3: Write minimal implementation**

Update only the Gemini-specific command/env/settings logic in `arbos.py`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `python3 -m unittest tests.test_run_sh_installer -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add arbos.py tests/test_run_sh_installer.py
git commit -m "fix: run gemini cli in autonomous headless mode"
```

### Task 2: Final verification

**Files:**
- Verify: `arbos.py`
- Verify: `tests/test_run_sh_installer.py`
- Verify: `tests/test_configure_sh.py`

- [ ] **Step 1: Run targeted tests**

Run: `python3 -m unittest tests.test_run_sh_installer tests.test_configure_sh -v`
Expected: PASS

- [ ] **Step 2: Run syntax verification**

Run: `python3 -m py_compile arbos.py`
Expected: PASS

- [ ] **Step 3: Review diff**

Run: `git diff -- arbos.py tests/test_run_sh_installer.py docs/superpowers/plans/2026-03-18-gemini-autonomous-runtime-fix.md`
Expected: Only the Gemini autonomy fix and its regression coverage.
