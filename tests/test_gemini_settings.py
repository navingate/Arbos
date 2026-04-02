import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import arbos


class GeminiSettingsTests(unittest.TestCase):
    def test_write_agent_settings_for_gemini_allows_context_files_via_workspace_config(self):
        with tempfile.TemporaryDirectory() as tmp:
            workdir = Path(tmp)

            with patch.object(arbos, "WORKING_DIR", workdir), \
                 patch.object(arbos, "PROVIDER", "gemini"), \
                 patch.object(arbos, "CLAUDE_MODEL", "auto"), \
                 patch.object(arbos, "_log"):
                arbos._write_agent_settings()

            settings = json.loads((workdir / ".gemini" / "settings.json").read_text())
            file_filtering = settings.get("context", {}).get("fileFiltering", {})

            self.assertFalse(file_filtering.get("respectGitIgnore", True))
            self.assertTrue(file_filtering.get("respectGeminiIgnore", False))

            geminiignore = (workdir / ".geminiignore").read_text()
            self.assertIn(".env", geminiignore)
            self.assertIn("logs/", geminiignore)
            self.assertIn("chat_id.txt", geminiignore)
            self.assertNotIn("context/", geminiignore)


if __name__ == "__main__":
    unittest.main()
