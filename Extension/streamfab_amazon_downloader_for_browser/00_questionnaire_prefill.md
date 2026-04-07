# 00 Questionnaire Prefill

## Basic Identity
- Plugin name: `StreamFab Amazon Downloader for Browser`
- Service slug: `amazon`
- Display name: `Amazon`
- Working site label: `Prime Video`
- Baseline template: `streamfab_netflix_downloader_for_browser`

## Product Page Inputs
- Product page: `https://streamfab.dvdfab.cn/amazon-downloader.htm`
- Highest promoted resolution: `1080p`
- Promoted audio: `EAC3 5.1 / AAC 2.0`
- Price clue: `USD 54.99`
- Promoted output format: `MP4 / MKV`
- Promoted codec choices: `H.264 / H.265`
- Promoted subtitle handling: `remux` or `SRT export`
- Promoted extra capabilities:
  - scheduled new-episode download
  - metadata saving
  - rental / purchased movie download claim
- Candidate capability line: `Download Prime Video titles for offline viewing in up to 1080p`

## Target Site Inputs
- `https://www.primevideo.com/`

## Current Confirmed Product Questions
- Homepage / public taxonomy includes `Movies`, `TV shows`, `Sports`, `Live TV`, and `Channels`
- Sign-in is required before normal Prime usage
- Non-subscription behaviors such as rental and channel subscription are visible on the homepage
- Detail pages expose `Audio languages` and `Subtitles` sections
- Episodic detail pages expose season switching and episode lists

## Still Need Confirmation
- exact detail-page and playback-page detection entry points
- supported content scope: Prime-included only vs rental / purchase vs add-on channels / live / sports
- actual download dialog options for video, audio, and subtitles
- trial and daily-quota behavior in the browser plugin

## Archive Reminder
- Use this file as a fast prefill snapshot, not as the final source of truth.
- Stable facts should be rechecked in:
  - `references/client_product_page_notes.md`
  - `references/site_research_notes.md`
  - `references/feature_coverage_notes.md`
