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

## Analysis Progress Display
- The analysis dialog surfaces CoApp's progress in three named stages, in order:
  1. season analysis
  2. metadata analysis
  3. audio & subtitle analysis
- Plugin renders whatever stage label CoApp returns; it does not synthesize its own progress copy.

## TV Show Episode Naming
- When season + episode metadata is available at meta-analysis time:
  - render as `SXXEXX - XXXX` (e.g. `S01E03 - Episode Title`)
- When episode metadata is only available at download time:
  - render as `XXXXXX`, matching the site's display verbatim
- `Bonus` / `Extras` and `Trailers` are always shown as separate groups under the show; they do not inherit the season/episode naming rules.

## Movie Layout Rules
- Movie without bonus / extras / trailer: render as a single video; do not show a "select episode" tray.
- Movie with bonus / extras / trailer: split into `Main Movie` / `Bonus` / `Extras` / `Trailers` groups.

## Current PM Implication
- Future interaction specs should define what happens when:
  - the same title has multiple site variants
  - extras coexist with main content
  - login or entitlement changes mid-flow
