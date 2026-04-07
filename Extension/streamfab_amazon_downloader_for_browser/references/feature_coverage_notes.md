# Amazon Feature Coverage Notes

## Purpose
- This file is for personal archive and quick recall.
- It separates `confirmed from product page`, `observed from public Prime Video pages`, and `still unverified in real plugin behavior`.

## 1. Product-page-backed capability claims

### Confirmed from StreamFab Amazon product page
- resolution:
  - up to `1080p`
- audio:
  - `EAC3 5.1`
  - `AAC 2.0`
- output:
  - `MP4`
  - `MKV`
- codec:
  - `H.264`
  - `H.265`
- subtitles:
  - remux into video
  - export as SRT
- metadata:
  - title
  - cast
  - season
  - cover
  - related media-server fields
- workflow:
  - scheduled new-episode download
- scope wording:
  - regular series
  - behind-the-scenes footage
  - films
  - rentals
  - purchased movies

## 2. Public Prime Video site clues

### Confirmed from public pages
- Prime Video is one supported site target.
- Visible top navigation includes:
  - `Movies`
  - `TV shows`
  - `Sports`
  - `Live TV`
  - `Channels`
- Public detail pages can expose:
  - `Watch with Prime`
  - `Join Prime`
  - `Rent`
  - `Buy`
  - `More purchase options`
  - `Audio languages`
  - `Subtitles`
  - `Studio`
  - `Cast`
- Public episodic pages can expose:
  - season switcher
  - episode list
  - per-episode CTA

## 3. Archive conclusions worth keeping

### Stable conclusions
- Amazon should be archived as a `single-site Prime Video plugin`, not as a multi-site plugin.
- The main complexity is not site count; it is the coexistence of multiple content types and entitlement paths inside one site.
- The most important distinction to remember is:
  - `site = one`
  - `content / entitlement types = multiple`

### Useful shorthand
- Prime-included
- rent / buy
- channels
- sports / live
- episodic hierarchy
- metadata-rich detail pages

## 4. Still unverified in actual plugin behavior
- exact detection entry point
- exact dialog tree structure
- actual codec / subtitle / audio controls shown in extension UI
- true support boundary for rental / purchased titles
- handling for channels / sports / live pages
- trial and quota behavior
