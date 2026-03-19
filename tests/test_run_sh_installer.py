import pathlib
import unittest


RUN_SH = pathlib.Path(__file__).resolve().parents[1] / "run.sh"
ARBOS_PY = pathlib.Path(__file__).resolve().parents[1] / "arbos.py"


class RunShInstallerTests(unittest.TestCase):
    def test_runtime_menu_includes_gemini_cli_before_provider_selection(self):
        script = RUN_SH.read_text()

        self.assertIn("Agent Runtime", script)
        self.assertIn("Pick your agent runtime", script)
        self.assertIn("Gemini CLI", script)

    def test_gemini_path_skips_key_prompt_and_persists_model(self):
        script = RUN_SH.read_text()

        self.assertIn('PROVIDER="gemini"', script)
        self.assertIn("GEMINI_MODEL", script)
        self.assertNotIn('"Google API key"', script)

    def test_arbos_uses_gemini_alias_default_and_project_settings_shape(self):
        script = ARBOS_PY.read_text()

        self.assertIn('os.environ.get("GEMINI_MODEL", "auto")', script)
        self.assertIn('"model": {"name": CLAUDE_MODEL}', script)

    def test_arbos_runs_gemini_in_headless_yolo_mode_without_verbose(self):
        script = ARBOS_PY.read_text()

        self.assertIn('cmd = ["gemini", "-p", prompt]', script)
        self.assertIn('"--approval-mode", "yolo"', script)
        self.assertIn('env["GEMINI_SANDBOX"] = "false"', script)
        self.assertNotIn('cmd = ["gemini", prompt]', script)

    def test_arbos_only_treats_gemini_assistant_messages_as_output(self):
        script = ARBOS_PY.read_text()

        self.assertIn('PROVIDER == "gemini" and etype == "message" and evt.get("role") == "assistant"', script)


if __name__ == "__main__":
    unittest.main()
