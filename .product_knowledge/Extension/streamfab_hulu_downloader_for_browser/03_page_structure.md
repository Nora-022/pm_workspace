# 03 Page Structure

## Page Inventory

Confirmed dialogs and pages from client-side breakdown:

1. **Trial dialog** — same content as Netflix's trial prompt
2. **Analysis dialog** — surfaces CoApp's analysis progress (`season` → `metadata` → `audio & subtitle`)
3. **Meta analysis result dialog** — left content tree + right quality configuration
4. **Downloading view** — running download list
5. **"Start download" dialog** — config layout differs from in-CEF view
6. **Setting view** — Extension and CoApp configuration

## Meta Analysis Result Dialog

### Left Side
- content tree
- checkbox selection
- title / season / version / episode / extras grouping

### Right Side
- video quality selection only
  - dimension: `Resolution (Bitrate)`
- no independent audio selector in the current confirmed flow
- no independent subtitle selector in the current confirmed flow

### Current Confirmed Tree Cases

#### Case 1: Pure season structure
- `Series -> Season -> Episode`

#### Case 2: Title-level version structure
- `Title -> Version`
- common example:
  - subtitle-version
  - dubbed-version

#### Case 3: Season + version structure
- `Series -> Season -> Version -> Episode`

#### Case 4: Extras
- `Title/Series -> Extras`
- examples:
  - clip
  - trailer

## Downloading View

- Task labels shown on each row: `Resolution`, `video codec`, `audio codec`
- Progress info shown on each row: `speed`, `progress`, `segment`
- The "start download" dialog renders configuration controls differently from the CEF-side preview

## Setting View

- Common configuration items are listed in `requirements/plugin_requirement.md` (Setting — Extension)
- Hulu-specific items beyond the common set:
  - `Video Codec` (`H264` / `H265`)
  - `Region`

## Current Display Principle
- Keep content structure on the left.
- Keep quality configuration on the right.
- Do not flatten versioned content into ambiguous repeated groups when metadata can distinguish it.
