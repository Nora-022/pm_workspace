# Prime Video Site Research Notes

## Sources
- `https://www.primevideo.com/`
- Fetched on `2026-04-07`

## Overview
- Prime Video should be treated as one target site.
- Inside this single site, public pages expose multiple content and entitlement types such as subscription viewing, rentals, channels, sports, and live TV.
- The homepage is usable as a public taxonomy source, but not as proof of logged-in playback behavior.

## Visible Product Clues
- Top-level tabs include `Home`, `Movies`, `TV shows`, `Sports`, `Live TV`, and `Channels`.
- Sign-in is prominent and required for normal account usage.
- Prime join messaging is visible on the public homepage.
- Rental messaging is visible.
- Channel subscriptions are visible as a separate surface.
- The site supports many locales, implying language and regional variation.

## Sample Movie-detail Findings
- Public title pages can expose:
  - `Watch with Prime`
  - `Rent`
  - `Buy`
  - `More purchase options`
- Detail blocks can expose:
  - `Audio languages`
  - `Subtitles`
  - `Studio`
  - `Cast`
  - `Content advisory`
- Rental copy can explicitly state:
  - `Rentals include 30 days to start watching this video and 48 hours to finish once started.`

## Sample Episodic-detail Findings
- Public episodic pages can expose:
  - season switcher
  - episode list
  - per-episode CTA
  - `Watch with Prime`, `Watch for free`, `Join Prime`, or `More purchase options`
- This is enough to justify a working assumption that Amazon needs an episode-tree model rather than movie-only handling.

## Accessibility / Audio Findings From Help
- Prime Video help explicitly documents:
  - `Download Prime Video Titles`
  - `Rent and Buy Prime Video Titles`
  - alternative audio tracks / audio descriptions
  - subtitles / captions
- Help text confirms many titles can include:
  - multiple audio tracks
  - subtitles
  - audio descriptions
  - device-dependent feature variation

## Plugin-relevant Implications
- Entitlement handling should not be modeled as a single boolean.
- Detection and messaging should distinguish Prime-included titles from rental or channel-gated titles within the same Prime Video site.
- Region and locale differences are likely meaningful for both metadata and entitlement states.
- Live TV should remain out of scope until playback behavior is validated.
- Sports and live-event surfaces should also remain out of scope until separately validated.
- Detail-page metadata is rich enough to support a more structured detection model than homepage-card scraping.

## Pending Research
- detail-page structure for movies
- episodic title page structure
- player-page detection opportunity
- subtitle, dubbing, and audio-track cues
- region-specific differences between logged-out and logged-in views
