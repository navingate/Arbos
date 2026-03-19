# Gemini CLI Runtime Selection Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an installer runtime menu that lets users choose between Claude Code and Gemini CLI, with Gemini using native CLI authentication and a guided model picker.

**Architecture:** Keep Arbos's existing provider model for Claude intact, but split the installer into two decisions: runtime first, provider second. The Gemini path becomes a direct runtime branch in `run.sh` that skips provider API setup and persists `PROVIDER=gemini` plus a selected `GEMINI_MODEL`.

**Tech Stack:** Bash installer (`run.sh`), Python runtime (`arbos.py`), Markdown docs (`PROMPT.md`), Python `unittest`

---

### Task 1: Add installer regression coverage

**Files:**
- Create: `tests/test_run_sh_installer.py`
- Test: `tests/test_run_sh_installer.py`

- [ ] **Step 1: Write the failing test**

```python
import pathlib
import unittest


class RunShInstallerTests(unittest.TestCase):
    def test_runtime_menu_includes_gemini_cli_before_provider_selection(self):
        script = pathlib.Path("run.sh").read_text()
        self.assertIn("Agent Runtime", script)
        self.assertIn("Gemini CLI", script)
        self.assertIn("Pick your agent runtime", script)

    def test_gemini_path_skips_key_prompt_and_persists_model(self):
        script = pathlib.Path("run.sh").read_text()
        self.assertIn('PROVIDER="gemini"', script)
        self.assertIn("GEMINI_MODEL", script)
        self.assertNotIn('"Google API key"', script)
```

- [ ] **Step 2: Run test to verify it fails**

Run: `python3 -m unittest tests/test_run_sh_installer.py -v`
Expected: FAIL because `run.sh` does not yet contain the runtime menu, Gemini model picker, or native-auth flow.

- [ ] **Step 3: Write minimal implementation**

Add the new runtime menu and Gemini branch in `run.sh` so the assertions become true without introducing unrelated installer refactors.

- [ ] **Step 4: Run test to verify it passes**

Run: `python3 -m unittest tests/test_run_sh_installer.py -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/test_run_sh_installer.py run.sh
git commit -m "feat: add gemini cli installer runtime selection"
```

### Task 2: Align runtime defaults and docs

**Files:**
- Modify: `arbos.py`
- Modify: `PROMPT.md`
- Test: `python3 -m py_compile arbos.py`

- [ ] **Step 1: Write the failing test**

Use the installer regression test from Task 1 as the entry point, then add a syntax/consistency check for `arbos.py`.

- [ ] **Step 2: Run checks to verify current behavior is incomplete**

Run: `python3 -m py_compile arbos.py`
Expected: PASS today, but docs still mention Claude/Chutes as the only runtime path and the Gemini default model is still the older hardcoded value.

- [ ] **Step 3: Write minimal implementation**

Update `arbos.py` to use a Gemini-friendly default model alias and update `PROMPT.md` so it describes runtime selection accurately.

- [ ] **Step 4: Run verification**

Run: `python3 -m py_compile arbos.py`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add arbos.py PROMPT.md
git commit -m "docs: align runtime docs with gemini cli support"
```

### Task 3: Final verification

**Files:**
- Verify: `run.sh`
- Verify: `arbos.py`
- Verify: `PROMPT.md`
- Verify: `tests/test_run_sh_installer.py`

- [ ] **Step 1: Run targeted tests**

Run: `python3 -m unittest tests/test_run_sh_installer.py -v`
Expected: PASS

- [ ] **Step 2: Run syntax verification**

Run: `bash -n run.sh && python3 -m py_compile arbos.py`
Expected: PASS

- [ ] **Step 3: Review diff**

Run: `git diff -- run.sh arbos.py PROMPT.md tests/test_run_sh_installer.py`
Expected: Only the intended runtime-menu, Gemini installer, model-selection, and documentation changes.

