# 00 Planning Context

## Basic Inputs
- `service_name`: `hulu`
- `display_name`: `Hulu`
- `template_plugin`: `streamfab_netflix_downloader_for_browser`
- `client_product_url`: `https://streamfab.com/hulu-downloader.htm`
- `target_site_urls`:
  - `https://www.hulu.com/`
  - `https://www.hulu.jp/`

## Init Mode
- Current mode: `repair mode`
- Reason: the plugin folder already existed and was repaired to align with the standard init flow.

## Product Positioning
- Product: `StreamFab Hulu Downloader for Browser`
- Product line relationship: independent single-site browser plugin
- Supported scope: Hulu-related streaming services

## Baseline Choice
- Chosen baseline: `streamfab_netflix_downloader_for_browser`
- Why:
  - closest existing StreamFab single-site subscription-video plugin
  - useful as structure baseline for PM files and requirement files
- Constraint:
  - only structure is inherited
  - Hulu-specific facts must come from Hulu product-page extraction and target-site research

## Current Confirmed Hulu Baseline
- StreamFab Hulu product page explicitly promotes `1080p/4K` downloads.
- StreamFab Hulu product page explicitly promotes `MP4` output and `EAC3 5.1 audio track`.
- Product-page FAQ states:
  - free trial lasts 30 days
  - users can download 3 Hulu videos during the trial
  - users can download up to 100 Hulu videos per day
- Hulu client dialog research confirms:
  - some titles use a pure season/episode tree
  - some titles expose subtitle-version / dubbed-version splits
  - current right panel exposes video quality only

## Target Site Research Baseline
- `hulu.com` and `hulu.jp` should be treated as related but distinct services.
- `hulu.com` strongly emphasizes subscription bundles, live TV, and U.S.-resident / location-based restrictions.
- `hulu.jp` presents a Japan-localized service with monthly pricing, free-trial messaging, TVOD/store surfaces, and explicit support for subtitle/dub search facets.

## Open Questions
- whether the plugin scope is meant to cover only one Hulu property or both `.com` and `.jp`
- queue / concurrency / retry behavior in the client
- stable metadata fields for season, version, extras, and site-specific differences
