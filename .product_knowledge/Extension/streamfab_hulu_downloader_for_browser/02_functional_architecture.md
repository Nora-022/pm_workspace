# 02 Functional Architecture

## Core Modules

### 1. Detection and Metadata Intake
- Trigger page analysis on Hulu content pages.
- Read metadata needed to identify:
  - title / series
  - season or equivalent grouping
  - version grouping such as subtitle-version / dubbed-version
  - extras such as clip / trailer when present
- Analysis runs in three stages exposed as progress to the user:
  - season analysis
  - metadata analysis
  - audio & subtitle analysis

### 2. Content Tree Builder
- Build the left-side selection tree from Hulu metadata.
- Support these confirmed structures:
  - `Series -> Season -> Episode`
  - `Title -> Version`
  - `Series -> Season -> Version -> Episode`
  - `Title/Series -> Extras`

### 3. Version Resolver
- Treat subtitle-version and dubbed-version as content-level choices.
- Do not treat them as right-panel audio/subtitle settings.

### 4. Quality Configuration
- Right panel exposes video quality only.
- Current confirmed quality dimension is based on resolution / bitrate selection.
- Product-page-backed capability line can mention `up to 1080p/4K`.

### 5. Queue Submission
- Convert selected content items into downloadable tasks.
- Preserve the selected content version and tree identity in the final task payload.

### 6. Movie / TV Show Display Logic
- Movie:
  - without bonus / extras / trailer: render as a single video; do not show a "select episode" tray
  - with bonus / extras / trailer: split into `Main Movie` / `Bonus` / `Extras` / `Trailers` groups
- TV Show:
  - default analysis target: current episode's MPD / M3U8 audio + video info
  - episode naming:
    - if season + episode metadata is available at meta-analysis time: render as `SXXEXX - XXXX`
    - if episode metadata is only available at download time: render as `XXXXXX`, matching the site's display
  - `Bonus` / `Extras` and `Trailers` are rendered as separate groups under the show, with each group counting against download quota independently

## Current Confirmed Hulu-Specific Rules
- Content identity must come from metadata grouping, not from resolution/bitrate profiles.
- Resolution/bitrate alone cannot distinguish season, episode, subtitle-version, dubbed-version, or extras.
- `.com` and `.jp` should be treated as platform variants until schema parity is confirmed.
