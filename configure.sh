#!/usr/bin/env bash

set -e
set -o pipefail

if [ -t 1 ] && [ "${TERM:-dumb}" != "dumb" ]; then
    GREEN=$'\033[0;32m' RED=$'\033[0;31m' CYAN=$'\033[0;36m'
    BOLD=$'\033[1m' DIM=$'\033[2m' NC=$'\033[0m'
else
    GREEN='' RED='' CYAN='' BOLD='' DIM='' NC=''
fi

ok()  { printf "  ${GREEN}+${NC} %s\n" "$1"; }
err() { printf "  ${RED}x${NC} %s\n" "$1"; }
die() { err "$1"; exit 1; }

command_exists() { command -v "$1" >/dev/null 2>&1; }

if [ -n "${INSTALL_DIR:-}" ]; then
    INSTALL_DIR="$(cd "$INSTALL_DIR" && pwd)"
elif [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
    INSTALL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
else
    INSTALL_DIR="$PWD"
fi

ENV_FILE="$INSTALL_DIR/.env"
CHAT_ID_FILE="$INSTALL_DIR/chat_id.txt"

if [ ! -f "$ENV_FILE" ] && [ -f "$INSTALL_DIR/.env.enc" ]; then
    die "configure.sh currently supports plaintext .env only. Decrypt .env.enc first."
fi

touch "$ENV_FILE"

env_value() {
    local key="$1"
    grep "^${key}=" "$ENV_FILE" 2>/dev/null | head -1 | cut -d= -f2- | tr -d "' \"" || true
}

set_env_value() {
    local key="$1" value="$2"
    if grep -q "^${key}=" "$ENV_FILE" 2>/dev/null; then
        sed -i.bak "s|^${key}=.*|${key}=${value}|" "$ENV_FILE"
        rm -f "$ENV_FILE.bak"
    else
        echo "${key}=${value}" >> "$ENV_FILE"
    fi
}

unset_env_value() {
    local key="$1"
    if grep -q "^${key}=" "$ENV_FILE" 2>/dev/null; then
        sed -i.bak "/^${key}=.*/d" "$ENV_FILE"
        rm -f "$ENV_FILE.bak"
    fi
}

masked_value() {
    local value="$1"
    local len=${#value}
    if [ "$len" -le 4 ]; then
        printf "configured"
    else
        printf "configured (…%s)" "${value: -4}"
    fi
}

read_answer() {
    local answer=""
    IFS= read -r answer || true
    printf "%s" "$answer"
}

keep_existing() {
    local label="$1" value="$2"
    printf "  ${DIM}%s: %s${NC}\n" "$label" "$value"
    printf "  ${CYAN}Use existing value? [Y/n]:${NC} "
    local answer
    answer="$(read_answer)"
    case "$answer" in
        n|N|no|NO) return 1 ;;
        *) return 0 ;;
    esac
}

choose_runtime() {
    printf "  ${DIM}Select agent runtime:${NC}\n" >&2
    printf "    ${BOLD}1)${NC} Claude Code\n" >&2
    printf "    ${BOLD}2)${NC} Gemini CLI\n" >&2
    printf "  ${CYAN}Choice [1]:${NC} " >&2
    local answer
    answer="$(read_answer)"
    case "$answer" in
        2) printf "gemini" ;;
        *) printf "claude" ;;
    esac
}

choose_provider() {
    printf "  ${DIM}Select Claude provider:${NC}\n" >&2
    printf "    ${BOLD}1)${NC} Chutes\n" >&2
    printf "    ${BOLD}2)${NC} OpenRouter\n" >&2
    printf "  ${CYAN}Choice [1]:${NC} " >&2
    local answer
    answer="$(read_answer)"
    case "$answer" in
        2) printf "openrouter" ;;
        *) printf "chutes" ;;
    esac
}

choose_gemini_model() {
    printf "  ${DIM}Pick your Gemini model:${NC}\n" >&2
    printf "    ${BOLD}1)${NC} auto\n" >&2
    printf "    ${BOLD}2)${NC} pro\n" >&2
    printf "    ${BOLD}3)${NC} flash\n" >&2
    printf "    ${BOLD}4)${NC} flash-lite\n" >&2
    printf "    ${BOLD}5)${NC} Custom\n" >&2
    printf "  ${CYAN}Choice [1]:${NC} " >&2
    local answer model
    answer="$(read_answer)"
    case "$answer" in
        2) model="pro" ;;
        3) model="flash" ;;
        4) model="flash-lite" ;;
        5)
            printf "  ${CYAN}Custom Gemini model:${NC} " >&2
            model="$(read_answer)"
            [ -n "$model" ] || die "Gemini model is required"
            ;;
        *) model="auto" ;;
    esac
    printf "%s" "$model"
}

prompt_required_value() {
    local label="$1"
    printf "  ${CYAN}%s:${NC} " "$label" >&2
    local answer
    answer="$(read_answer)"
    [ -n "$answer" ] || die "$label is required"
    printf "%s" "$answer"
}

ensure_runtime_available() {
    local runtime="$1"
    if [ "$runtime" = "gemini" ]; then
        command_exists gemini || die "'gemini' command not found in PATH"
    else
        command_exists claude || die "'claude' command not found in PATH"
    fi
}

current_provider="$(env_value PROVIDER)"
if [ "$current_provider" = "gemini" ]; then
    runtime="gemini"
else
    runtime="claude"
fi

printf "\n  ${BOLD}Reconfigure Arbos${NC}\n\n"

if [ -n "$current_provider" ]; then
    if keep_existing "Agent runtime" "$( [ "$runtime" = "gemini" ] && printf "Gemini CLI" || printf "Claude Code" )"; then
        :
    else
        runtime="$(choose_runtime)"
    fi
else
    runtime="$(choose_runtime)"
fi

ensure_runtime_available "$runtime"

if [ "$runtime" = "gemini" ]; then
    set_env_value "PROVIDER" "gemini"
    unset_env_value "CHUTES_API_KEY"
    unset_env_value "OPENROUTER_API_KEY"
    unset_env_value "CLAUDE_MODEL"

    current_gemini_model="$(env_value GEMINI_MODEL)"
    if [ -n "$current_gemini_model" ]; then
        if keep_existing "Gemini model" "$current_gemini_model"; then
            gemini_model="$current_gemini_model"
        else
            gemini_model="$(choose_gemini_model)"
        fi
    else
        gemini_model="$(choose_gemini_model)"
    fi
    set_env_value "GEMINI_MODEL" "$gemini_model"
else
    unset_env_value "GEMINI_MODEL"

    current_provider="$(env_value PROVIDER)"
    if [ "$current_provider" = "chutes" ] || [ "$current_provider" = "openrouter" ]; then
        if keep_existing "Claude provider" "$current_provider"; then
            claude_provider="$current_provider"
        else
            claude_provider="$(choose_provider)"
        fi
    else
        claude_provider="$(choose_provider)"
    fi
    set_env_value "PROVIDER" "$claude_provider"

    if [ "$claude_provider" = "openrouter" ]; then
        unset_env_value "CHUTES_API_KEY"
        current_key="$(env_value OPENROUTER_API_KEY)"
        if [ -n "$current_key" ]; then
            if keep_existing "OpenRouter API key" "$(masked_value "$current_key")"; then
                :
            else
                set_env_value "OPENROUTER_API_KEY" "$(prompt_required_value "OpenRouter API key")"
            fi
        else
            set_env_value "OPENROUTER_API_KEY" "$(prompt_required_value "OpenRouter API key")"
        fi
    else
        unset_env_value "OPENROUTER_API_KEY"
        current_key="$(env_value CHUTES_API_KEY)"
        if [ -n "$current_key" ]; then
            if keep_existing "Chutes API key" "$(masked_value "$current_key")"; then
                :
            else
                set_env_value "CHUTES_API_KEY" "$(prompt_required_value "Chutes API key")"
            fi
        else
            set_env_value "CHUTES_API_KEY" "$(prompt_required_value "Chutes API key")"
        fi
    fi
fi

current_bot_token="$(env_value TAU_BOT_TOKEN)"
if [ -n "$current_bot_token" ]; then
    if keep_existing "Telegram bot token" "$(masked_value "$current_bot_token")"; then
        :
    else
        set_env_value "TAU_BOT_TOKEN" "$(prompt_required_value "Telegram bot token")"
    fi
else
    set_env_value "TAU_BOT_TOKEN" "$(prompt_required_value "Telegram bot token")"
fi

current_owner_id="$(env_value TELEGRAM_OWNER_ID)"
if [ -n "$current_owner_id" ]; then
    if keep_existing "Telegram owner ID" "$current_owner_id"; then
        :
    else
        printf "  ${CYAN}New Telegram owner ID (blank clears it):${NC} "
        new_owner_id="$(read_answer)"
        if [ -n "$new_owner_id" ]; then
            set_env_value "TELEGRAM_OWNER_ID" "$new_owner_id"
        else
            unset_env_value "TELEGRAM_OWNER_ID"
        fi
    fi
fi

if [ -f "$CHAT_ID_FILE" ]; then
    current_chat_id="$(tr -d '[:space:]' < "$CHAT_ID_FILE")"
    if keep_existing "Telegram chat ID" "$current_chat_id"; then
        :
    else
        printf "  ${CYAN}New Telegram chat ID (blank clears it):${NC} "
        new_chat_id="$(read_answer)"
        if [ -n "$new_chat_id" ]; then
            printf "%s\n" "$new_chat_id" > "$CHAT_ID_FILE"
        else
            rm -f "$CHAT_ID_FILE"
        fi
    fi
fi

if [ "$runtime" = "gemini" ]; then
    rm -f "$INSTALL_DIR/.claude/settings.local.json"
else
    rm -f "$INSTALL_DIR/.gemini/settings.json"
fi

if command_exists pm2; then
    pm2_pid="$(pm2 pid arbos 2>/dev/null | tail -1 | tr -d '[:space:]')"
    if [ -n "$pm2_pid" ] && [ "$pm2_pid" != "0" ]; then
        pm2 restart arbos >/dev/null 2>&1
        ok "Restarted pm2 process: arbos"
    else
        ok "pm2 is installed, but arbos is not running"
    fi
else
    ok "pm2 not found; configuration saved without restart"
fi

printf "\n"
ok "Configuration updated"
