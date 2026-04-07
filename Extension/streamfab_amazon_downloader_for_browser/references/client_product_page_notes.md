# Amazon Client Product Page Notes

## Source
- `https://streamfab.dvdfab.cn/amazon-downloader.htm`
- Fetched on `2026-04-07`

## Extracted Facts
- Highest resolution:
  - `1080p`
- Audio information:
  - `EAC3 5.1 / AAC 2.0`
- Price:
  - `USD 54.99`
- Output formats:
  - `MP4`
  - `MKV`
- Optional codecs:
  - `H.264`
  - `H.265`
- Subtitle handling:
  - `remux into video`
  - `export as SRT`
- Scheduling:
  - `Save new episodes at scheduled time`
- Metadata:
  - save title, cast, season, cover, and other media-server-friendly metadata
- Scope claims:
  - regular series
  - behind-the-scenes footage
  - films
  - rentals
  - purchased movies
- Other capability clues:
  - `MP3` audio-file export is mentioned
  - language pre-selection for audio and subtitles is mentioned
  - ad removal is mentioned for downloaded output

## Candidate Slogans
- `Amazon Videos in Up to 1080p. One Click.`
- `Save Prime Video titles for offline viewing in up to 1080p with EAC3 5.1 or AAC 2.0 audio.`

## Design / PM Implications
- Amazon plugin marketing can safely use `up to 1080p` as a confirmed capability line.
- Audio messaging can safely reference `EAC3 5.1 / AAC 2.0` because it is explicitly surfaced on the product page.
- Pricing is captured as a current product-page clue and should be rechecked before external publishing if commercial copy is needed.
- Requirements can safely include scheduled episode download, subtitle remux / SRT export, metadata saving, and codec choice as product-page-backed capabilities.
- Rental / purchased movie support is claimed on the product page, but still needs extension-level flow validation before turning into a final business-rule assumption.
