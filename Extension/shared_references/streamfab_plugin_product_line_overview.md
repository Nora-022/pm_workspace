# StreamFab Plugin Product Line Overview

## Purpose
This file stores cross-plugin PM context that should stay centralized instead of being copied into each plugin folder.

## Current Workspace Layers
1. Root indexes
- README.md
- plugins_index.md
- product_line_index.md
- search_index.md
- pm_context_hub.md
- common_plugin_rules.md

2. Shared templates
- common_templates/
- Copy and adapt when a plugin needs a working document.

3. Shared references
- shared_references/
- Read on demand as product-line context.

4. Plugin-local folders
- streamfab_<service>_downloader_for_browser/
- Store plugin-specific planning, references, requirements, and final conclusions.

## Usage Rules
- Put reusable document skeletons in common_templates.
- Put product-line knowledge that should remain centralized in shared_references.
- Put site-specific research in each plugin's references/.
- Put distilled plugin conclusions in plugin 01-07 files.

## Current Shared Assets
- common_templates/plugin_prd_template.md
- shared_references/streamfab_plugin_product_line_overview.md