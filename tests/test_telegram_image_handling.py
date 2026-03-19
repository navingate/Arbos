import sys
import types
import unittest
from types import SimpleNamespace
from unittest.mock import patch

import arbos


class _ImmediateThread:
    def __init__(self, *, target=None, daemon=None):
        self._target = target
        self.daemon = daemon

    def start(self):
        if self._target:
            self._target()


class _FakeTeleBot:
    instances = []

    def __init__(self, token):
        self.token = token
        self.handlers = []
        self.sent_messages = []
        _FakeTeleBot.instances.append(self)

    def message_handler(self, commands=None, regexp=None, func=None, content_types=None, chat_types=None, **kwargs):
        if content_types is None:
            content_types = ["text"]

        def decorator(handler):
            self.handlers.append({
                "handler": handler,
                "commands": commands or [],
                "content_types": content_types,
                "func": func,
            })
            return handler

        return decorator

    def send_message(self, chat_id, text):
        self.sent_messages.append((chat_id, text))
        return SimpleNamespace(message_id=len(self.sent_messages))

    def edit_message_text(self, text, chat_id, message_id):
        self.sent_messages.append((chat_id, text, message_id))

    def get_file(self, file_id):
        return SimpleNamespace(file_path=f"photos/{file_id}.jpg")

    def download_file(self, file_path):
        return b"fake-image-bytes"

    def infinity_polling(self):
        raise KeyboardInterrupt


class TelegramImageHandlingTests(unittest.TestCase):
    def setUp(self):
        _FakeTeleBot.instances.clear()
        self.fake_telebot = types.ModuleType("telebot")
        self.fake_telebot.TeleBot = _FakeTeleBot
        self.original_telebot = sys.modules.get("telebot")
        sys.modules["telebot"] = self.fake_telebot
        os_environ_patcher = patch.dict(arbos.os.environ, {"TAU_BOT_TOKEN": "test-token"}, clear=False)
        os_environ_patcher.start()
        self.addCleanup(os_environ_patcher.stop)

    def tearDown(self):
        if self.original_telebot is None:
            sys.modules.pop("telebot", None)
        else:
            sys.modules["telebot"] = self.original_telebot

    def _register_bot(self):
        with self.assertRaises(KeyboardInterrupt):
            arbos.run_bot()
        return _FakeTeleBot.instances[-1]

    def test_run_bot_registers_photo_handler(self):
        bot = self._register_bot()

        photo_handlers = [
            entry for entry in bot.handlers if "photo" in entry["content_types"]
        ]

        self.assertTrue(photo_handlers, "Expected Telegram photo messages to have a handler")

    def test_photo_message_runs_agent_with_caption_and_image_context(self):
        with patch.object(arbos, "_is_owner", return_value=True), \
             patch.object(arbos, "_process_pending_env"), \
             patch.object(arbos, "_save_to_encrypted_env"), \
             patch.object(arbos, "log_chat") as log_chat, \
             patch.object(arbos, "_build_operator_prompt", side_effect=lambda text: f"PROMPT::{text}") as build_prompt, \
             patch.object(arbos, "run_agent_streaming", return_value="done") as run_agent, \
             patch.object(arbos, "_summarize_telegram_image", return_value="A landing page screenshot with a dark header.", create=True), \
             patch.object(arbos.threading, "Thread", _ImmediateThread):
            bot = self._register_bot()
            handler = next(
                (entry["handler"] for entry in bot.handlers if "photo" in entry["content_types"]),
                None,
            )

            self.assertIsNotNone(handler, "Expected Telegram photo messages to have a handler")

            message = SimpleNamespace(
                photo=[SimpleNamespace(file_id="thumb"), SimpleNamespace(file_id="full")],
                document=None,
                caption="The UI only becomes visible after scroll",
                text=None,
                from_user=SimpleNamespace(id=123),
                chat=SimpleNamespace(id=456),
            )

            handler(message)

            run_agent.assert_called_once()
            forwarded_text = build_prompt.call_args.args[0]
            self.assertIn("[Image attached]", forwarded_text)
            self.assertIn("[Image summary]: A landing page screenshot with a dark header.", forwarded_text)
            self.assertIn("[Caption]: The UI only becomes visible after scroll", forwarded_text)
            log_chat.assert_any_call("user", forwarded_text[:1000])


if __name__ == "__main__":
    unittest.main()
