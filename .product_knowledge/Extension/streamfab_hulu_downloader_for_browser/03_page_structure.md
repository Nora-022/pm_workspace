# 03 Page Structure

## Current Dialog Understanding

### Left Side
- content tree
- checkbox selection
- title / season / version / episode / extras grouping

### Right Side
- video quality selection only
- no independent audio selector in the current confirmed flow
- no independent subtitle selector in the current confirmed flow

## Current Confirmed Tree Cases

### Case 1: Pure season structure
- `Series -> Season -> Episode`

### Case 2: Title-level version structure
- `Title -> Version`
- common example:
  - subtitle-version
  - dubbed-version

### Case 3: Season + version structure
- `Series -> Season -> Version -> Episode`

### Case 4: Extras
- `Title/Series -> Extras`
- examples:
  - clip
  - trailer

## Current Display Principle
- Keep content structure on the left.
- Keep quality configuration on the right.
- Do not flatten versioned content into ambiguous repeated groups when metadata can distinguish it.
