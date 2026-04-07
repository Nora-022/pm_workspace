# 07 Technical Constraints

## Confirmed Constraints
- This plugin should be treated as a DRM-streaming-site plugin, not a generic open-site extractor.
- Prime Video has multiple entitlement models on the same site surface.

## High-risk Areas
- player-page routing and dynamic DOM changes
- entitlement-driven UI differences across Prime, rental, and channels
- region-sensitive availability
- audio/subtitle option discovery before actual task creation
- sports / live event pages with time-based state changes
- ad-supported entitlement text differences

## Do Not Assume
- do not assume browse-card metadata is sufficient for final task creation
- do not assume player URLs are stable across regions
- do not assume live content is supported
- do not assume all detail pages expose the same metadata fields
- do not assume support help pages map 1:1 to extension controls

## Validation Needs
- logged-in DOM captures
- task-failure taxonomy
- account interruption behavior
- subtitle / multi-audio option exposure
- rental / purchase task creation behavior
- sports / live unsupported-state behavior
