# 07 Technical Constraints

## Confirmed
- Product-page promise:
  - resolution: up to `1080p/4K`
  - container format: `MP4`
  - audio track: `EAC3 5.1`
- Confirmed by client breakdown:
  - output formats: `MP4`, `MKV`
  - video codec selectable: `H.264`, `H.265`
  - region-agnostic download: any region the user has access to
  - metadata preserved: `title`, `season`, `episode`, `cast`, `poster` (for downstream Plex / Kodi / PlayerFab use)
- Current dialog research:
  - right panel exposes video quality only
  - resolution and bitrate alone cannot identify season, version, or extras
- Site research clues:
  - `hulu.com` has location-sensitive / live-TV / service-bundle constraints
  - `hulu.jp` includes subtitle / dub discovery cues and TVOD / store-related surfaces

## Platform Support
- Windows: priority for current release
- macOS: declared support, not delivered in this release

## Limits Documented in Client Breakdown
- DRM / copyright status may make some titles undownloadable or quality-capped
- Available quality / codec / audio depends on Hulu's source content and the user's subscription
- Daily / weekly quota caps exist to prevent abuse and ban risk
- Region differences in Hulu's content library affect parseable resource scope

## Pending
- exact metadata schema differences between `.com` and `.jp`
- client-enforced limits around queueing, retries, and account-state interruption mid-download
