# 03 Page Structure

## Observed Public Entry Points
- `Home`
- `Movies`
- `TV shows`
- `Sports`
- `Live TV`
- `Channels`
- search
- account / sign-in

## Page-family Memory Notes
- `browse page`
  - useful for remembering site taxonomy
  - not enough on its own to prove downloadable state
- `movie detail page`
  - most useful public page for CTA and metadata observation
- `episodic detail page`
  - most useful public page for season / episode hierarchy observation
- `playback page`
  - still unverified, but likely the most important runtime page for actual detection logic
- `sports / live page`
  - useful as an archive reminder that Prime Video includes non-standard VOD page types

## Candidate Detection Entry Points

### Browse Surfaces
- carousel cards on home and browse pages
- title cards inside category views

### Title Detail Surfaces
- movie detail page
- TV series detail page
- season / episode list area
- detail metadata area with `Audio languages` / `Subtitles` / `Studio` / `Cast`

### Playback Surfaces
- player launch entry from detail page
- playback page where the active downloadable asset is most likely to become stable

### Commerce / Entitlement Surfaces
- `Watch with Prime`
- `Join Prime`
- `Watch for free`
- `Rent`
- `Buy`
- `More purchase options`

## Working Tree Shapes
- `movie`
- `series -> season -> episode`
- `series -> season -> episode -> entitlement variant`
- `movie -> rent / buy option`
- `channel / sports / live` treated as out-of-scope until confirmed

## Pending Verification
- whether Amazon exposes download-worthy metadata before playback starts
- whether episode selection sits on the detail page, overlay, or routed page
- whether the browser plugin should detect only the current title or also adjacent titles from rail cards
- whether live / sports pages should be hidden, blocked, or marked unsupported in detection

## Archive Conclusion
- For knowledge-base purposes, the most important page split to remember is:
  - browse
  - detail
  - episodic detail
  - playback
  - non-standard live / sports
