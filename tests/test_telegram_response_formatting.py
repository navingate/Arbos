import unittest
from types import SimpleNamespace
from unittest.mock import patch

import arbos


class _FakeBot:
    def __init__(self):
        self.sent_messages = []
        self.edits = []

    def send_message(self, chat_id, text):
        self.sent_messages.append((chat_id, text))
        return SimpleNamespace(message_id=len(self.sent_messages))

    def edit_message_text(self, text, chat_id, message_id):
        self.edits.append((chat_id, message_id, text))


class TelegramResponseFormattingTests(unittest.TestCase):
    def test_operator_prompt_demands_short_final_answers_without_plan_narration(self):
        prompt = arbos._build_operator_prompt("what's happening?")

        self.assertIn("Use short paragraphs or a few flat bullets.", prompt)
        self.assertIn("Do not narrate your plan or list every command before doing the work.", prompt)

    def test_operator_prompt_stays_under_budget_even_with_large_context(self):
        with patch.object(arbos, "load_chatlog", return_value="CHAT:" + ("x" * 5000)), \
             patch.object(arbos, "_recent_context", return_value="CTX:" + ("y" * 5000)):
            prompt = arbos._build_operator_prompt("hi")

        self.assertLess(len(prompt), 1800)
        self.assertIn("Use shell commands for `context/` files if needed.", prompt)
        self.assertIn("## Operator message", prompt)

    def test_run_agent_streaming_hides_partial_text_until_final_answer(self):
        bot = _FakeBot()
        partial = "I will inspect the files and then explain everything in detail."
        final = "Checking logs now.\nNo new run since 15:09."

        def fake_run_agent_once(cmd, env, on_text=None, on_activity=None):
            if on_activity:
                on_activity("checking logs...")
            if on_text:
                on_text(partial)
                on_text(partial + " More detail.")
            return 0, final, [], ""

        with patch.object(arbos, "_run_agent_once", side_effect=fake_run_agent_once), \
             patch.object(arbos, "_agent_cmd", return_value=["claude", "-p", "prompt"]), \
             patch.object(arbos, "_agent_env", return_value={}), \
             patch.object(arbos.time, "time", side_effect=[10.0, 12.0, 14.0, 16.0]), \
             patch.object(arbos, "PROVIDER", "openrouter"):
            result = arbos.run_agent_streaming(bot, "prompt", 123)

        self.assertEqual(result, final)
        self.assertEqual(bot.sent_messages, [(123, "thinking...")])
        self.assertIn((123, 1, "checking logs..."), bot.edits)
        self.assertEqual(bot.edits[-1], (123, 1, final))
        self.assertFalse(any(partial in edit[2] for edit in bot.edits))


if __name__ == "__main__":
    unittest.main()
