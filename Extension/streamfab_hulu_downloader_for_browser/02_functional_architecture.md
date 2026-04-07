# 02 Functional Architecture

## Core Modules

### 1. Detection and Metadata Intake
- Trigger page analysis on Hulu content pages.
- Read metadata needed to identify:
  - title / series
  - season or equivalent grouping
  - version grouping such as subtitle-version / dubbed-version
  - extras such as clip / trailer when present

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

## Current Confirmed Hulu-Specific Rules
- Content identity must come from metadata grouping, not from resolution/bitrate profiles.
- Resolution/bitrate alone cannot distinguish season, episode, subtitle-version, dubbed-version, or extras.
- `.com` and `.jp` should be treated as platform variants until schema parity is confirmed.
