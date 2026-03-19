import os
import pathlib
import stat
import subprocess
import tempfile
import textwrap
import unittest


ROOT = pathlib.Path(__file__).resolve().parents[1]
CONFIGURE_SH = ROOT / "configure.sh"


def parse_env_file(path: pathlib.Path) -> dict[str, str]:
    values: dict[str, str] = {}
    if not path.exists():
        return values
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        values[key] = value.strip().strip("'\"")
    return values


class ConfigureShTests(unittest.TestCase):
    def make_executable(self, path: pathlib.Path, content: str) -> None:
        path.write_text(content)
        path.chmod(path.stat().st_mode | stat.S_IXUSR)

    def run_configure(self, install_dir: pathlib.Path, responses: str) -> subprocess.CompletedProcess:
        bin_dir = install_dir / "bin"
        bin_dir.mkdir()
        pm2_log = install_dir / "pm2.log"

        self.make_executable(
            bin_dir / "pm2",
            textwrap.dedent(
                """\
                #!/bin/sh
                echo "$@" >> "$PM2_LOG"
                if [ "$1" = "pid" ]; then
                  echo "1234"
                fi
                exit 0
                """
            ),
        )
        self.make_executable(bin_dir / "gemini", "#!/bin/sh\nexit 0\n")
        self.make_executable(bin_dir / "claude", "#!/bin/sh\nexit 0\n")

        env = os.environ.copy()
        env["INSTALL_DIR"] = str(install_dir)
        env["PATH"] = f"{bin_dir}:{env['PATH']}"
        env["PM2_LOG"] = str(pm2_log)

        return subprocess.run(
            ["bash", str(CONFIGURE_SH)],
            input=responses,
            text=True,
            capture_output=True,
            env=env,
        )

    def test_keep_existing_gemini_values_and_restart_pm2(self):
        with tempfile.TemporaryDirectory() as tmp:
            install_dir = pathlib.Path(tmp)
            (install_dir / ".env").write_text(
                "PROVIDER=gemini\n"
                "GEMINI_MODEL=flash\n"
                "TAU_BOT_TOKEN=secret-bot-token\n"
                "TELEGRAM_OWNER_ID=42\n"
            )
            (install_dir / "chat_id.txt").write_text("1001\n")

            result = self.run_configure(install_dir, "y\ny\ny\ny\ny\n")

            self.assertEqual(result.returncode, 0, msg=result.stderr or result.stdout)
            env_values = parse_env_file(install_dir / ".env")
            self.assertEqual(env_values["PROVIDER"], "gemini")
            self.assertEqual(env_values["GEMINI_MODEL"], "flash")
            self.assertEqual(env_values["TAU_BOT_TOKEN"], "secret-bot-token")
            self.assertEqual(env_values["TELEGRAM_OWNER_ID"], "42")
            self.assertEqual((install_dir / "chat_id.txt").read_text().strip(), "1001")
            self.assertIn("restart arbos", (install_dir / "pm2.log").read_text())

    def test_reset_runtime_to_claude_openrouter_and_drop_gemini_values(self):
        with tempfile.TemporaryDirectory() as tmp:
            install_dir = pathlib.Path(tmp)
            (install_dir / ".env").write_text(
                "PROVIDER=gemini\n"
                "GEMINI_MODEL=flash\n"
                "TAU_BOT_TOKEN=secret-bot-token\n"
            )

            result = self.run_configure(install_dir, "n\n1\n2\nnew-openrouter-key\ny\n")

            self.assertEqual(result.returncode, 0, msg=result.stderr or result.stdout)
            env_values = parse_env_file(install_dir / ".env")
            self.assertEqual(env_values["PROVIDER"], "openrouter")
            self.assertEqual(env_values["OPENROUTER_API_KEY"], "new-openrouter-key")
            self.assertEqual(env_values["TAU_BOT_TOKEN"], "secret-bot-token")
            self.assertNotIn("GEMINI_MODEL", env_values)
            self.assertIn("restart arbos", (install_dir / "pm2.log").read_text())


if __name__ == "__main__":
    unittest.main()
