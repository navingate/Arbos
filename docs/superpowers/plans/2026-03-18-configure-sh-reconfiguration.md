# Configure Script Reconfiguration Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `configure.sh` wizard that lets the user keep or reset each Arbos configuration item and restarts the `pm2` process automatically when done.

**Architecture:** Build `configure.sh` as an interactive bash wizard that reads the current plaintext `.env`, prompts per configuration step, updates only the selected values, clears stale runtime/provider values when switching modes, and restarts `pm2` if the `arbos` process exists. Cover the script with focused Python `unittest` cases that run it against a temporary install directory with stubbed `pm2` and CLI binaries.

**Tech Stack:** Bash, Python `unittest`, temporary filesystem fixtures, `pm2`

---

### Task 1: Add failing tests for the wizard

**Files:**
- Create: `tests/test_configure_sh.py`
- Test: `tests/test_configure_sh.py`

- [ ] **Step 1: Write the failing tests**

```python
def test_keep_existing_gemini_values_and_restart_pm2():
    ...

def test_reset_runtime_to_claude_openrouter_and_drop_gemini_values():
    ...
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `python3 -m unittest tests.test_configure_sh -v`
Expected: FAIL because `configure.sh` does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create `configure.sh` with only the prompt flow needed to satisfy the tests.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `python3 -m unittest tests.test_configure_sh -v`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/test_configure_sh.py configure.sh
git commit -m "feat: add selective arbos reconfiguration wizard"
```

### Task 2: Verify shell/runtime behavior

**Files:**
- Verify: `configure.sh`
- Verify: `tests/test_configure_sh.py`

- [ ] **Step 1: Run targeted verification**

Run: `python3 -m unittest tests.test_configure_sh -v`
Expected: PASS

- [ ] **Step 2: Run shell syntax validation**

Run: `bash -n configure.sh`
Expected: PASS

- [ ] **Step 3: Review diff**

Run: `git diff -- configure.sh tests/test_configure_sh.py docs/superpowers/plans/2026-03-18-configure-sh-reconfiguration.md`
Expected: Only the intended configure wizard and test changes.
