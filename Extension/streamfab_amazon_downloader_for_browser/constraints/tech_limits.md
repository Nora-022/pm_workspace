# Amazon Tech Limits

## Confirmed Limits
- Current confirmed public capability ceiling is `1080p`.
- Confirmed output container clues are `MP4` and `MKV`.
- Confirmed codec clues are `H.264` and `H.265`.

## High-risk Technical Areas
- dynamic Prime Video player routing
- entitlement-based CTA differences on detail pages
- subtitle / audio list extraction before task creation
- region / locale dependent wording

## Engineering Cautions
- Do not assume browse-card metadata is enough for final task creation.
- Do not assume one CTA string is stable across locales.
- Do not assume live and sports pages behave like VOD detail pages.
