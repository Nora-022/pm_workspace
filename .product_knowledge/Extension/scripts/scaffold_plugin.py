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

# Requirement and UI requirement docs are generated later by workflow after the
# client plan breakdown has been filled. Init creates only the PM-fillable client
# plan from common_templates.
DEFERRED_TEMPLATE_FILES = [
    ("plugin_requirement_template.md",     "requirements/plugin_requirement.md"),
    ("plugin_ui_requirement_template.md",  "requirements/plugin_ui_requirement.md"),
]

# Files copied from common_templates with placeholders replaced.
# {SiteName} is the streaming service display name. {service_name} is snake_case
# for app ids. {SiteNameMlink} uses underscores for mlink package names.
# {sitename} is the hyphenated slug for product page and What's New URLs.
# Other placeholders ({BannerContentEN}, {ThirdStoreProductImageCaption}, etc.) are
# left intact for the workflow stage to fill from the local client plan.
CLIENT_PLAN_TEMPLATE = "plugin_client_plan_template.md"

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
    """Replace common_templates placeholders.

    {SiteName} → display_name, preserving the streaming service name casing
    {service_name} → snake_case service name
    {SiteNameMlink} → display_name with spaces converted to underscores
    {sitename} → hyphenated lowercase service name (snake_case → kebab-case)
    """
    sitename = service_name.replace("_", "-")
    site_name_mlink = "_".join(display_name.split())
    return (
        content
        .replace("{SiteNameMlink}", site_name_mlink)
        .replace("{SiteName}", display_name)
        .replace("{service_name}", service_name)
        .replace("{sitename}", sitename)
    )


def client_plan_target_name(display_name: str) -> str:
    return f"requirements/[StreamFab 浏览器插件] - [{display_name}] - 客户端方案拆解.md"


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

    # Create the local client plan breakdown document for the PM to fill.
    client_plan_template = COMMON_TEMPLATES_DIR / CLIENT_PLAN_TEMPLATE
    client_plan_target = plugin_dir / client_plan_target_name(display_name)
    client_plan_relative = str(client_plan_target.relative_to(plugin_dir))

    if client_plan_target.exists():
        skipped_files.append(client_plan_relative)
    elif not client_plan_template.exists():
        print(f"WARNING: template not found: {client_plan_template}", file=sys.stderr)
    else:
        content = apply_template_placeholders(
            client_plan_template.read_text(encoding="utf-8"),
            display_name,
            service_name,
        )
        if not args.dry_run:
            client_plan_target.parent.mkdir(parents=True, exist_ok=True)
            client_plan_target.write_text(content, encoding="utf-8")
        created_files.append(client_plan_relative)

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
