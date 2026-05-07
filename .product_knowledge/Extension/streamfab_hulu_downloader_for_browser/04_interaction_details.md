# 04 Interaction Details

## Current Confirmed Interaction Rules
- Users choose subtitle-version or dubbed-version by selecting the content item itself.
- Users do not switch subtitle/audio through separate settings in the current Hulu dialog.
- Main content and extras should be distinguishable in the tree when metadata allows.

## Selection Logic
- Selected count reflects selected downloadable items, not deduplicated story count.
- If subtitle-version and dubbed-version are separate selectable items, both count independently.

## Site-Specific Interaction Clues
- `hulu.com` implies stronger subscription, location, and live-content messaging constraints.
- `hulu.jp` implies stronger localization concerns around subtitle/dub naming and store/rental surfaces.

## Current PM Implication
- Future interaction specs should define what happens when:
  - the same title has multiple site variants
  - extras coexist with main content
  - login or entitlement changes mid-flow
