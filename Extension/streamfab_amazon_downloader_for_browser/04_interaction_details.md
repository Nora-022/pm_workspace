# 04 Interaction Details

## Primary User Flow
1. user installs the Amazon browser plugin and CoApp
2. user opens Prime Video and signs in
3. plugin detects a supported title page or playback page
4. user opens the download dialog
5. user confirms download settings
6. task is sent to dashboard / queue

## Archive Interpretation
- This file is mainly for remembering where interaction uncertainty still exists.
- The stable part is the broad flow.
- The unstable part is the exact page where detection becomes available and what entitlement states are shown before task creation.

## Gating States To Handle
- not logged in
- logged in but membership missing
- free-trial upsell shown
- title requires rental / purchase
- title belongs to add-on channel
- title is ad-supported Prime content
- region or device restriction

## Draft Interaction Rules
- If a title is visible but not entitled, detection can still surface the title but download action should explain the gating reason.
- If account state changes mid-session, detection state should refresh instead of silently keeping stale downloadable items.
- If multiple episode items are present, dialog structure should preserve the title hierarchy instead of flattening it without labels.
- If the detail page exposes both `Watch with Prime` and `Rent / Buy`, the plugin should preserve the stronger entitlement clue instead of collapsing them into a single generic state.
- If a live / sports event page is detected, the plugin should not silently fail; it should show an explicit unsupported or pending-support state.

## Pending Validation
- exact CTA placement for detected downloadable state
- state wording for rental-only titles
- failure and retry behavior after entitlement changes
- whether subtitle / audio selections are pre-selected by UI language in the browser plugin

## What To Remember Later
- Amazon complexity is mostly about entitlement-state visibility before download.
- Episodic hierarchy matters more here than in a movie-only service.
- Live / sports should be remembered as a content-type edge case, not as a separate site.
