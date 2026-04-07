# [StreamFab Browser Plugin] - [Amazon] - UI Requirement Draft

## Global Variables
| Variable | Current Value |
|---|---|
| `SiteName` | `Amazon` |
| `BannerContentZH` | `Amazon 视频一键下载，轻松离线观看。` |
| `BannerContentEN` | `Amazon Videos in Up to 1080p. One Click.` |
| `ThirdStoreProductImageCaption` | `Download Prime Video titles in up to 1080p` |
| `VideoDownloadConfigurationParametersScreenshot` | `Amazon quality and entitlement state dialog` |

- Prototype link:
- Requirement source:
- Related docs: `requirements/plugin_requirement.md`, `references/client_product_page_notes.md`, `references/site_research_notes.md`
- Init note: this file was created from `common_templates/plugin_ui_requirement_template.md` and backfilled during `streamfab-plugin-init` create mode.

## 1. Current UI Baseline
- License Info banner should use Amazon-specific product-page-backed messaging.
- Base layout remains aligned with the current browser-plugin design system.
- Store screenshots and installer resources need Amazon / Prime Video content replacement.
- UI should distinguish standard VOD pages from other content / entitlement types such as rent / buy / channel / sports / live within the same Prime Video site.

## 2. Current Confirmed Content-tree Scenarios
- `movie`
- `series -> season -> episode`
- `movie -> rent / buy option`
- `rental / channel / sports / live` treated as pending-scope scenarios

## 3. Banner Baseline Copy
- EN Title: `Amazon Videos in Up to 1080p. One Click.`
- EN Subtitle: `Save Prime Video titles for offline viewing with EAC3 5.1 or AAC 2.0 audio.`
- ZH Candidate: `Amazon 视频一键下载，轻松离线观看。`

## 4. Store-material Direction
- Replace browser background screenshots with Prime Video pages.
- Use Amazon / Prime Video title art instead of baseline plugin imagery.
- Third screenshot should describe quality-first configuration; do not imply extra audio/subtitle controls until confirmed.
- Prefer one movie-detail screenshot and one episodic-detail screenshot over homepage-only material.
- Do not use sports / live imagery until those flows are confirmed in scope.

## 5. Installer-resource Direction
- Keep the existing installer structure.
- Replace product name, logo, and resource pack references with Amazon-specific assets.
- Screenshot and export specs still need design confirmation.

## 6. Pending UI Inputs
- final logo asset
- product-page-to-dashboard jump target confirmation
- actual dialog screenshot
- channel / rental warning-state designs if those states are kept visible
- live / sports unsupported-state design if those states are surfaced
