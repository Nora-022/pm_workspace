# [StreamFab Browser Plugin] - [Amazon] - Requirement Draft

## Global Variables
| Variable | Current Value |
|---|---|
| `SiteName` | `Amazon` |
| `BannerContentZH` | `Amazon 视频一键下载，轻松离线观看。` |
| `BannerContentEN` | `Amazon Videos in Up to 1080p. One Click.` |

- Prototype link:
- Requirement source:
- Init note: this file was created from `common_templates/plugin_requirement_template.md` and backfilled during `streamfab-plugin-init` create mode.

## Document Change Log
| Version | Date | Editor | Notes |
|---|---|---|---|
| v0.1 | 2026-04-07 | Codex | initialized from Amazon product page and Prime Video public-site research |

## 1. Current Confirmed Information

### 1.1 Product Identity
- Plugin product name: `StreamFab Amazon Downloader for Browser`
- CoApp installer name: `StreamFab Amazon Coapp`
- `app_id`: `streamfab_for_browser`

### 1.2 Product Page Extraction
- Highest resolution: `1080p`
- Audio information: `EAC3 5.1 / AAC 2.0`
- Price clue: `USD 54.99`
- Output clue: `MP4 / MKV`
- Codec clue: `H.264 / H.265`
- Subtitle clue: `remux` / `SRT export`
- Workflow clue: scheduled auto-download of new episodes
- Metadata clue: save title, cast, season, cover, and other metadata
- Scope clue: product page claims support for rentals and purchased movies

### 1.3 Prime Video Current Site Clues
- public homepage exposes `Movies`, `TV shows`, `Sports`, `Live TV`, and `Channels`
- sign-in and Prime join actions are prominent
- rental flow and channel-subscription surfaces exist
- public detail pages expose `Audio languages`, `Subtitles`, `Watch with Prime`, `Join Prime`, `Rent`, `Buy`, and `More purchase options`
- public episodic pages expose season switcher and episode list

## 2. Target-site Research Impact
- Prime Video should be modeled as one supported target site with multiple content and entitlement types inside it.
- Initial plugin scope should prioritize standard on-demand Prime titles.
- `Live TV`, `Sports`, rentals, purchases, and channels must be documented as separate branches until confirmed.

## 3. Global Change Summary

| Module | Change Point |
|---|---|
| Product name | StreamFab Amazon Downloader for Browser |
| Installer | UI replacement, product naming, logo replacement |
| Streaming service name | Amazon / Prime Video |
| Jump links | product page, What's New, subscription / upgrade links |
| Business rules | add entitlement distinctions for Prime / rental / channel |

## 4. Module-level Draft Differences

| Primary Module | Secondary Module | Draft Difference |
|---|---|---|
| Login & authorization | / | must distinguish signed-out, no-Prime, rental-only, and channel-gated states |
| User entitlement | / | entitlement cannot be modeled as a single state; Prime, free-trial, rent, buy, channel, and ad-supported states may differ |
| Video analysis | / | title type, CTA text, subtitle/audio metadata, and entitlement type should be extracted together |
| Download configuration | video tree | assume movie and episodic trees; live/channel/sports tree pending |
| Video detection | / | detection entry may exist on detail page or playback page; pending validation |
| Video download | / | failure states should mention entitlement / region causes where relevant; live/sports should not create false-positive tasks |
| Dashboard | / | banner copy and product name replacement required |
| Setting | / | product page supports codec, subtitle, and audio-language logic; actual extension controls remain pending confirmation |

## 5. Jump-link Draft

| Button | Link |
|---|---|
| What's New - main site | `https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=amazon-downloader` |
| What's New - standalone site | `https://streamfab.com/streamfab-for-browser-new.htm?pid=amazon-downloader` |
| Pay / upgrade - main site | `pending_open_pid` |
| Pay / upgrade - standalone site | `pending_open_pid` |

Note: final `open` PID mapping is still pending confirmation.

## 6. Current Open Items
- client id and option id mapping
- exact settings matrix
- subtitle and audio-selection behavior
- rental / purchase support boundary in the browser plugin
- channels, sports, and live-TV scope
- unsupported-state design for live or non-VOD pages

## 7. Reporting
| Reporter | Index | Elk Space | Event Types |
|---|---|---|---|
| Plugin | pending | pending | detect, task_create, task_fail, entitlement_block |
| CoApp | pending | pending | task_start, task_finish, task_fail |
