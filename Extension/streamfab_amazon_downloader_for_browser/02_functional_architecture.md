# 02 Functional Architecture

## Baseline Modules
1. site detection
2. entitlement and account-state awareness
3. metadata extraction
4. download configuration
5. task creation and queue handling
6. dashboard / license info integration
7. settings integration

## Amazon-specific Focus Areas

### 1. Site Detection
- Start with Prime Video page-family detection on `primevideo.com`.
- Keep separate handling buckets for:
  - homepage / browse pages
  - title detail pages
  - episodic pages
  - player pages
  - live / sports event pages

### 1.1 Page-family Signals Seen In Public Sources
- movie detail pages can expose:
  - title
  - synopsis
  - rating / runtime / year
  - watch CTA
  - rent / buy CTA
  - audio languages
  - subtitles
- episodic detail pages can expose:
  - season switcher
  - episode list
  - per-episode CTA
  - more purchase options

### 2. Entitlement Layer
- Treat these as distinct gating states:
  - not signed in
  - signed in but not Prime-entitled
  - Prime-entitled
  - free-trial prompt shown
  - rental / purchase required
  - add-on channel entitlement required
  - ad-supported Prime state
  - region-restricted or unavailable

### 3. Metadata Extraction
- Expected minimum fields:
  - title
  - season / episode when present
  - content type
  - artwork
  - entitlement state
  - CTA text such as `Watch with Prime`, `Join Prime`, `Rent`, `Buy`, or `Watch for free`
  - resolution / audio clues if surfaced
  - subtitle and audio-language lists when surfaced on detail pages
  - metadata bundle for media-server export: cast, season, cover, studio when available

### 4. Download Configuration
- Initial working assumption:
  - quality selector is guaranteed
  - codec selector may exist because the product page claims `H.264 / H.265`
  - audio/subtitle selectors are likely supported because the product page claims language pre-selection, subtitle remux, and SRT export
  - actual browser-plugin control surface is still pending confirmation

### 5. Queue / Task Flow
- Reuse Netflix-style single-site queue framing until Amazon-specific evidence proves otherwise.
- Retry and failed-state wording must mention entitlement / account / region causes where relevant.
- Episodic pages likely need batch submission because the product page explicitly claims season / episode batch download and scheduled new-episode download.

### 6. Output and Post-processing
- Supported output should be documented as:
  - MP4
  - MKV
  - optional audio-only export clue: `MP3`
- Subtitle outputs should be documented as:
  - remux into video
  - export as SRT
- Metadata saving should be treated as part of the task result payload, not just a marketing line.
