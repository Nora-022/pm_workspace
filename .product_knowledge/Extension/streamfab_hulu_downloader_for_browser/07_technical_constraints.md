# 07 Technical Constraints

## Confirmed
- Product page promise:
  - up to `1080p/4K`
  - `MP4`
  - `EAC3 5.1 audio track`
- Current dialog research:
  - right panel exposes video quality only
  - resolution and bitrate alone cannot identify season, version, or extras
- Site research clues:
  - `hulu.com` has location-sensitive/live-TV/service-bundle constraints
  - `hulu.jp` includes subtitle/dub discovery cues and TVOD/store-related surfaces

## Pending
- exact metadata schema differences between `.com` and `.jp`
- client-enforced limits around queueing, retries, and account-state interruption
