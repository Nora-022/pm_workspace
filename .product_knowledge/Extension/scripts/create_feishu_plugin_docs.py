#!/usr/bin/env python
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CONFIG = ROOT / "skills" / "streamfab-extension-init-skill" / "feishu_target.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Copy Feishu template docs for a browser plugin and set Chinese titles safely."
    )
    parser.add_argument("--service", required=True, help="snake_case service name")
    parser.add_argument("--display-name", required=True, help="display name for Feishu titles")
    parser.add_argument("--profile", help="optional lark-cli profile")
    parser.add_argument("--as", dest="identity", default="", choices=("user", "bot", ""))
    parser.add_argument("--folder-token", help="target drive folder token")
    parser.add_argument("--config", default=str(DEFAULT_CONFIG), help="JSON config path")
    parser.add_argument("--dry-run", action="store_true", help="show planned copies without creating them")
    return parser.parse_args()


def load_config(path: str) -> dict[str, object]:
    config_path = Path(path)
    if not config_path.exists():
        raise FileNotFoundError(f"Config file not found: {config_path}")
    return json.loads(config_path.read_text(encoding="utf-8"))


def resolve_node_runjs() -> tuple[str, str]:
    node = shutil.which("node")
    if not node:
        raise FileNotFoundError("node executable not found in PATH.")
    npm_root = Path.home() / "AppData" / "Roaming" / "npm" / "node_modules" / "@larksuite" / "cli" / "scripts" / "run.js"
    if not npm_root.exists():
        raise FileNotFoundError(f"lark-cli run.js not found: {npm_root}")
    return node, str(npm_root)


def build_title(display_name: str, title_template: str) -> str:
    return title_template.replace("{display_name}", display_name)


def unicode_safe_json(payload: dict[str, object]) -> str:
    return json.dumps(payload, ensure_ascii=True)


def run_cli(command: list[str], stdin_text: str | None = None) -> dict[str, object]:
    completed = subprocess.run(
        command,
        input=stdin_text,
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True,
    )
    stdout = completed.stdout.strip()
    if not stdout:
        raise RuntimeError("lark-cli returned empty output.")
    return json.loads(stdout)


def retry_cli(
    action,
    *,
    retries: int = 5,
    delay_seconds: float = 1.0,
):
    last_error: Exception | None = None
    for attempt in range(retries):
        try:
            return action()
        except (subprocess.CalledProcessError, RuntimeError, json.JSONDecodeError) as exc:
            last_error = exc
            if attempt == retries - 1:
                raise
            time.sleep(delay_seconds)
    if last_error:
        raise last_error
    raise RuntimeError("retry_cli exited without result or error.")


def copy_doc(
    node: str,
    runjs: str,
    identity: str,
    profile: str,
    template_token: str,
    folder_token: str,
    title: str,
) -> dict[str, object]:
    params = unicode_safe_json({"file_token": template_token})
    data = unicode_safe_json({"folder_token": folder_token, "name": title, "type": "docx"})
    command = [node, runjs, "drive", "files", "copy", "--params", params, "--data", data]
    if identity:
        command.extend(["--as", identity])
    if profile:
        command.extend(["--profile", profile])
    return run_cli(command)


def patch_title(
    node: str,
    runjs: str,
    identity: str,
    profile: str,
    doc_token: str,
    title: str,
) -> dict[str, object]:
    path = f"/open-apis/drive/v1/files/{doc_token}"
    params = unicode_safe_json({"type": "docx"})
    data = unicode_safe_json({"new_title": title})
    command = [node, runjs, "api", "PATCH", path, "--params", params, "--data", data]
    if identity:
        command.extend(["--as", identity])
    if profile:
        command.extend(["--profile", profile])
    return retry_cli(lambda: run_cli(command))


def query_meta(
    node: str,
    runjs: str,
    identity: str,
    profile: str,
    doc_token: str,
) -> dict[str, object]:
    data = unicode_safe_json(
        {
            "request_docs": [{"doc_token": doc_token, "doc_type": "docx"}],
            "with_url": True,
        }
    )
    command = [node, runjs, "api", "POST", "/open-apis/drive/v1/metas/batch_query", "--data", data]
    if identity:
        command.extend(["--as", identity])
    if profile:
        command.extend(["--profile", profile])
    response = retry_cli(lambda: run_cli(command))
    metas = response.get("data", {}).get("metas", [])
    if not metas:
        raise RuntimeError(f"No metadata returned for doc token: {doc_token}")
    return metas[0]


def main() -> int:
    args = parse_args()
    config = load_config(args.config)
    node, runjs = resolve_node_runjs()

    identity = args.identity or str(config.get("as", "user"))
    profile = args.profile or str(config.get("profile", ""))
    folder_token = args.folder_token or str(config.get("folder_token", ""))
    templates = config.get("templates", [])

    if not folder_token:
        raise ValueError("folder_token is required.")
    if not templates:
        raise ValueError("No templates configured.")

    results: list[dict[str, str]] = []

    for item in templates:
        template_token = str(item["token"])
        title_template = str(item["title_template"])
        key = str(item["key"])
        title = build_title(args.display_name, title_template)

        if args.dry_run:
            results.append(
                {
                    "key": key,
                    "title": title,
                    "template_token": template_token,
                    "folder_token": folder_token,
                }
            )
            continue

        copied = copy_doc(node, runjs, identity, profile, template_token, folder_token, title)
        file_info = copied.get("data", {}).get("file", {})
        doc_token = str(file_info.get("token", ""))
        if not doc_token:
            raise RuntimeError(f"Copy succeeded without token for template: {template_token}")

        patch_title(node, runjs, identity, profile, doc_token, title)
        meta = query_meta(node, runjs, identity, profile, doc_token)

        results.append(
            {
                "key": key,
                "title": str(meta.get("title", "")),
                "doc_id": str(meta.get("doc_token", "")),
                "doc_url": str(meta.get("url", "")),
                "template_token": template_token,
            }
        )

    payload = {
        "service_name": args.service,
        "display_name": args.display_name,
        "folder_token": folder_token,
        "documents": results,
    }
    json.dump(payload, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
