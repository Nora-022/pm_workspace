# User Flows

> Distilled from `02_functional_architecture.md`, `03_page_structure.md`, `04_interaction_details.md`. Do not introduce new facts here.

## Main Flow

1. User opens a Hulu content page in the in-plugin browser
2. Plugin triggers page analysis via CoApp
3. Analysis dialog surfaces CoApp progress in three named stages:
   - season analysis
   - metadata analysis
   - audio & subtitle analysis
4. Meta analysis result dialog renders:
   - left: content tree (title / season / version / episode / extras grouping)
   - right: video quality selection (`Resolution (Bitrate)`)
5. User selects items via checkboxes
6. Selected items become tasks in the Downloading view, showing labels (`Resolution`, `video codec`, `audio codec`) and progress (`speed`, `progress`, `segment`)

## Movie Branch
- without bonus / extras / trailer: render as a single video; no "select episode" tray
- with bonus / extras / trailer: split into `Main Movie` / `Bonus` / `Extras` / `Trailers` groups

## TV Show Branch
- default analysis target: current episode's MPD / M3U8 audio + video info
- episode naming:
  - season + episode metadata available at meta-analysis: `SXXEXX - XXXX`
  - episode metadata only available at download: `XXXXXX`, matching the site's display
- `Bonus` / `Extras` / `Trailers` rendered as separate groups, each counting against quota independently

## Multi-Version Branch
- subtitle version and dubbed version are content-tree dimensions, not right-panel switches
- selecting subtitle and dubbed versions of the same title creates two independent tasks, each counted

## Branches Not Yet Detailed
- analysis failure handling: trigger conditions, displayed copy, retry behavior — not specified in current breakdown
- login interruption mid-download: resume vs cancel vs prompt — not specified in current breakdown
- unsupported site / unsupported page: handling not specified in current breakdown
