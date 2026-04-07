# StreamFab Plugin Common Rules

## Purpose
This file stores product-line rules that apply across multiple StreamFab browser plugins unless a plugin file explicitly overrides them.

## Usage
- Read this file when writing PRDs, plans, or cross-plugin comparisons.
- Do not copy it into every plugin folder by default.
- If a plugin has a confirmed exception, record that exception inside the plugin-local files.

## Common Rules
1. Each plugin is an independent product under the StreamFab plugin product line.
2. Plugin-local facts belong in the plugin folder, not in this shared file.
3. Shared rules should stay centralized to avoid drift.
4. New plugin initialization should always be registered in plugins_index.md.
5. Product-line common context should be read before making cross-plugin claims.

## Writing Rule
When a statement is true for all or most plugins, prefer storing it here.
When a statement is site-specific, store it in the plugin-local folder.