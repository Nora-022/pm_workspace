# Hulu Site Research Notes

## Sources
- `https://www.hulu.com/`
- `https://www.hulu.jp/`
- Fetched on `2026-03-27`

## Overview
- These two URLs represent related but operationally distinct Hulu properties.
- They should not be assumed to share identical product structure, entitlement rules, or UI vocabulary.

## A. hulu.com

### Positioning
- U.S.-oriented streaming service
- strongly markets bundles and live TV
- homepage copy emphasizes `Stream TV and Movies Live and Online`

### Visible product clues
- Bundle messaging is prominent
- Live TV plan messaging is prominent
- location data may be required for certain content
- content can be available through Hulu app and, in some cases, through Disney+

### Plugin-relevant implications
- region and location-sensitive restrictions are likely important
- login/subscription gating is central
- live TV and bundle messaging suggest the plugin should clearly scope what content types are supported

## B. hulu.jp

### Positioning
- Japan-localized Hulu service
- monthly-fee messaging is explicit
- free-trial messaging is explicit
- Hulu Store / rental-purchase surfaces are visible

### Visible product clues
- monthly price shown as `月額1,026円(税込)`
- free-trial messaging shown as `2週間無料`
- store/rental/purchase surfaces exist
- search/filter copy explicitly includes subtitle/dub cues such as `字・吹`
- help and policy text includes browser / OS support notices
- warning text includes anti-illegal-download language

### Plugin-relevant implications
- Japanese vocabulary such as subtitle/dub should be expected in metadata and UI
- the service appears to mix SVOD and TVOD/store concepts
- plugin design may need to distinguish subscription content from rental/purchase/store flows
- browser / OS support constraints may affect detection and playback behavior

## Current Cross-site Implication
- `hulu.com` and `hulu.jp` should be researched and modeled as separate platform variants under the Hulu name until proven otherwise.

## Still Need Confirmation
- whether the plugin scope covers both sites or only one
- differences in playback prerequisites
- differences in account-state and entitlement behavior
- differences in media metadata schema and downloadable asset types
