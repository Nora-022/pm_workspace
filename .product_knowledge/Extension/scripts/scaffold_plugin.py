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


SKILLS_DIR = Path(__file__).resolve().parents[1] / "skills" / "streamfab-extension-init-skill"
REFERENCES_DIR = SKILLS_DIR / "references"
EXTENSION_DIR = Path(__file__).resolve().parents[1]
COMMON_TEMPLATES_DIR = EXTENSION_DIR / "common_templates"

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

# Files copied from common_templates with {SiteName}/{sitename} placeholders replaced.
# {SiteName} is the streaming service name with its original casing for product
# display names, installer names, and mlink package names. {sitename} is the
# lowercase service slug for app id and URL jump links.
# Other placeholders ({BannerContentEN}, {ThirdStoreProductImageCaption}, etc.) are
# left intact for the workflow stage to fill from feishu requirement docs.
TEMPLATE_FILES = [
    ("plugin_requirement_template.md",     "requirements/plugin_requirement.md"),
    ("plugin_ui_requirement_template.md",  "requirements/plugin_ui_requirement.md"),
]

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
    return content.replace("{display_name}", display_name).replace("{service_name}", service_name)


def apply_template_placeholders(content: str, display_name: str, service_name: str) -> str:
    """Replace {SiteName} and {sitename} placeholders in common_templates content.

    {SiteName} → display_name, preserving the streaming service name casing
    {sitename} → hyphenated lowercase service name (snake_case → kebab-case)
    """
    sitename = service_name.replace("_", "-")
    return content.replace("{SiteName}", display_name).replace("{sitename}", sitename)


def main() -> int:
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

    # Create requirement files from common_templates (with {SiteName}/{sitename} replaced)
    for template_name, target_name in TEMPLATE_FILES:
        template_path = COMMON_TEMPLATES_DIR / template_name
        target_path = plugin_dir / target_name

        if target_path.exists():
            skipped_files.append(target_name)
            continue

        if not template_path.exists():
            print(f"WARNING: template not found: {template_path}", file=sys.stderr)
            continue

        content = apply_template_placeholders(
            template_path.read_text(encoding="utf-8"),
            display_name,
            service_name,
        )

        if not args.dry_run:
            target_path.parent.mkdir(parents=True, exist_ok=True)
            target_path.write_text(content, encoding="utf-8")
        created_files.append(target_name)

    result = {
        "service_name": service_name,
        "display_name": display_name,
        "plugin_dir": str(plugin_dir),
        "mode": mode,
        "dry_run": args.dry_run,
        "created_dirs": created_dirs,
        "created_files": created_files,
        "skipped_files": skipped_files,
    }
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    sys.stdout.write("\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
