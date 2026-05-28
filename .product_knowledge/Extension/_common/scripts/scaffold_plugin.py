#!/usr/bin/env python
"""
scaffold_plugin.py — Create local directory scaffold for a new StreamFab browser plugin.

Usage:
    python scaffold_plugin.py --service <service_name> --display-name "<display_name>"

Output:
    JSON with created paths, mode (create/repair), and file list.
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path


COMMON_DIR = Path(__file__).resolve().parents[1]  # Extension/_common
EXTENSION_DIR = COMMON_DIR.parent  # Extension/
SKILLS_DIR = COMMON_DIR / "skills" / "streamfab-extension-init-skill"
REFERENCES_DIR = SKILLS_DIR / "references"
TEMPLATES_DIR = COMMON_DIR / "templates"

SKELETON_FILES = [
    ("skeleton_readme.md",              "README.md"),
    ("skeleton_00_overview.md",         "00_overview.md"),
    ("skeleton_01_product_brief.md",    "01_product_brief.md"),
    ("skeleton_02_functional_architecture.md", "02_functional_architecture.md"),
    ("skeleton_03_page_structure.md",   "03_page_structure.md"),
    ("skeleton_04_interaction_details.md", "04_interaction_details.md"),
    ("skeleton_05_design_principles.md","05_design_principles.md"),
    ("skeleton_06_business_rules.md",   "06_business_rules.md"),
    ("skeleton_07_technical_constraints.md", "07_technical_constraints.md"),
    ("skeleton_changelog.md",           "CHANGELOG.md"),
    ("skeleton_requirements_index.md",  "requirements/index.md"),
]

# Requirement and UI requirement docs are generated later by the workflow skill
# after the user has filled in the Feishu client plan breakdown. They are listed
# here so the JSON output can advertise which deferred files the workflow will
# eventually produce.
DEFERRED_TEMPLATE_FILES = [
    ("plugin_requirement_template.md",     "requirements/plugin_requirement.md"),
    ("plugin_ui_requirement_template.md",  "requirements/plugin_ui_requirement.md"),
]

# Common-template files copied immediately at init time. Unlike DEFERRED_TEMPLATE_FILES
# these get materialized right away because their content is largely fixed and only
# depends on display_name (e.g. store listing copy). Placeholders {SiteName} /
# {SiteNameMlink} / {sitename} are applied at copy time so the doc is ready to use.
IMMEDIATE_COMMON_TEMPLATES = [
    ("plugin_store_listing_template.md",   "store_listing.md"),
]

# Client plan breakdown is no longer scaffolded locally. It now lives as a Feishu
# doc copied from the shared template at
# https://i6a1sqw3p2.feishu.cn/docx/KEledkZ7Po2OFNxCtaccq1B9nsf — the user makes
# their own copy in Feishu and hands the URL back to the workflow skill, which
# fetches the content with `lark-cli docs +fetch --api-version v2`.

SUBDIRS = [
    "requirements",
    "patterns",
    "constraints",
    "references",
    "context",
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Scaffold a new StreamFab plugin knowledge base.")
    parser.add_argument("--service", required=True, help="snake_case service name, e.g. crunchyroll")
    parser.add_argument("--display-name", required=True, dest="display_name", help="Display name, e.g. Crunchyroll")
    parser.add_argument("--dry-run", action="store_true", help="Show planned actions without writing files")
    return parser.parse_args()


def apply_placeholders(content: str, display_name: str, service_name: str) -> str:
    # Init-time placeholders for skeleton files.
    content = content.replace("{display_name}", display_name).replace("{service_name}", service_name)
    # Product-name placeholders shared with _common/templates. Rules match
    # init-skill SKILL.md: {SiteName} keeps original display_name casing;
    # {SiteNameMlink} joins display_name tokens with "_"; {sitename} uses
    # hyphenated lowercase form of service_name.
    site_name_mlink = display_name.replace(" ", "_")
    sitename_hyphen = service_name.replace("_", "-").lower()
    content = (
        content
        .replace("{SiteNameMlink}", site_name_mlink)
        .replace("{SiteName}", display_name)
        .replace("{sitename}", sitename_hyphen)
    )
    return content


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    args = parse_args()
    service_name: str = args.service
    display_name: str = args.display_name

    plugin_dir = EXTENSION_DIR / f"streamfab_{service_name}_downloader_for_browser"
    mode = "repair" if plugin_dir.exists() else "create"

    created_dirs: list[str] = []
    created_files: list[str] = []
    skipped_files: list[str] = []

    # Create subdirectories
    for subdir in SUBDIRS:
        target = plugin_dir / subdir
        if not target.exists():
            if not args.dry_run:
                target.mkdir(parents=True, exist_ok=True)
            created_dirs.append(str(target.relative_to(EXTENSION_DIR)))

    # Create files from skeletons
    for skeleton_name, target_name in SKELETON_FILES:
        skeleton_path = REFERENCES_DIR / skeleton_name
        target_path = plugin_dir / target_name

        if target_path.exists():
            skipped_files.append(target_name)
            continue

        if not skeleton_path.exists():
            print(f"WARNING: skeleton not found: {skeleton_path}", file=sys.stderr)
            continue

        content = apply_placeholders(
            skeleton_path.read_text(encoding="utf-8"),
            display_name,
            service_name,
        )

        if not args.dry_run:
            target_path.parent.mkdir(parents=True, exist_ok=True)
            target_path.write_text(content, encoding="utf-8")
        created_files.append(target_name)

    # Copy immediate common templates (store listing, etc.) right away. These
    # depend only on display_name / service_name and don't need the workflow's
    # Feishu client plan breakdown to be filled in first.
    for template_name, target_name in IMMEDIATE_COMMON_TEMPLATES:
        template_path = TEMPLATES_DIR / template_name
        target_path = plugin_dir / target_name

        if target_path.exists():
            skipped_files.append(target_name)
            continue

        if not template_path.exists():
            print(f"WARNING: common template not found: {template_path}", file=sys.stderr)
            continue

        content = apply_placeholders(
            template_path.read_text(encoding="utf-8"),
            display_name,
            service_name,
        )

        if not args.dry_run:
            target_path.parent.mkdir(parents=True, exist_ok=True)
            target_path.write_text(content, encoding="utf-8")
        created_files.append(target_name)

    # Client plan breakdown is intentionally NOT scaffolded locally — it lives in
    # Feishu (see CLIENT_PLAN_TEMPLATE_URL note at top of file). The user copies
    # the shared template in Feishu and hands the URL to the workflow skill.

    result = {
        "service_name": service_name,
        "display_name": display_name,
        "plugin_dir": str(plugin_dir),
        "mode": mode,
        "dry_run": args.dry_run,
        "created_dirs": created_dirs,
        "created_files": created_files,
        "deferred_files": [target_name for _, target_name in DEFERRED_TEMPLATE_FILES],
        "skipped_files": skipped_files,
    }
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
