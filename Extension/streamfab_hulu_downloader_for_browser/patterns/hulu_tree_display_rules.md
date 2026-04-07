# Hulu Tree Display Rules

## Confirmed Cases

### Case 1
- `Series -> Season -> Episode`

### Case 2
- `Title -> Version`

### Case 3
- `Series -> Season -> Version -> Episode`

### Case 4
- `Title/Series -> Extras`

## Version Rules
- `subtitle-version` and `dubbed-version` are content-tree dimensions.
- They are not right-panel configuration items in the current confirmed flow.

## Rendering Principle
- Prefer the shallowest structure that still explains the content correctly.
- Separate content structure from quality configuration.
- Keep extras separate from main content whenever metadata allows.
