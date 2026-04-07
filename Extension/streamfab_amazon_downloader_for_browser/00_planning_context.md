# 00 Planning Context

## Product Positioning
- Product: `StreamFab Amazon Downloader for Browser`
- Product-line relation: single-site StreamFab browser plugin
- Current working scope: `Prime Video`

## Inputs Used For This Init
- Client product page:
  - `https://streamfab.dvdfab.cn/amazon-downloader.htm`
- Target site:
  - `https://www.primevideo.com/`
- Baseline template:
  - `streamfab_netflix_downloader_for_browser`

## Confirmed Facts
- The client product page promotes Amazon downloading up to `1080p`.
- The client product page promotes audio as `EAC3 5.1 / AAC 2.0`.
- The client product page shows a price clue of `USD 54.99`.
- The client product page explicitly promotes `MP4/MKV` output, `H.264/H.265`, scheduled auto-download, subtitle remux / SRT export, and metadata saving.
- The client product page explicitly claims support for regular series, behind-the-scenes footage, films, rentals, and purchased movies.
- Prime Video public pages expose top-level entry points for `Home`, `Movies`, `TV shows`, `Sports`, `Live TV`, and `Channels`.
- Prime Video clearly requires sign-in / Prime entitlement for a meaningful playback journey.
- Prime Video detail pages expose structured metadata such as `season`, `episode`, `IMDb`, `X-Ray`, ratings, audio languages, subtitles, studio, and entitlement CTA text.
- Prime Video support pages confirm official concepts for `Download Prime Video Titles`, `Rent and Buy Prime Video Titles`, subtitles, and alternative audio / audio descriptions.

## Conservative Inferences
- Prime Video should continue to be treated as one supported target site.
- Within this one site, the plugin should distinguish content / entitlement types such as `movie`, `series/season/episode`, `Prime-included`, `rent/buy`, and `channel/live/sports`.
- Detection and download logic will likely be closer to Netflix than to the generic ytdlp plugin because Prime Video is a DRM-first subscription service.
- Region, subscription, rental, purchase, ads, and channel entitlements should be treated as separate gating dimensions.

## Known Gaps
- Logged-in detail-page structure has not been captured in this init.
- Player-page DOM and download-trigger opportunity points are still unverified.
- Subtitle and audio-track configuration behavior inside the browser plugin is not yet confirmed by the actual extension UI.
- Whether channel titles, sports, and live-TV events are in scope is still pending.
- Whether rental / purchased titles follow the same task-creation flow as Prime-included titles is still pending.

## Immediate Follow-up
1. Capture at least one logged-in movie page, one episodic title page, and one playback page.
2. Confirm whether dialog tree shape is `season -> episode`, flat-episode, or mixed.
3. Confirm actual configuration items exposed by the Amazon plugin download dialog.
4. Confirm business rules for trial, premium daily quota, rental / purchase handling, and entitlement error handling.
