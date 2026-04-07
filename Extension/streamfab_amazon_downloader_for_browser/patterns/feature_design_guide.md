# Amazon Feature Design Guide

## Scope
- Amazon browser-plugin detection flow
- Prime Video detail-page and episode-tree interaction
- entitlement-state messaging
- download configuration and task-creation flow

## Design Checklist

### 1. Keep The Site Model Correct
- Treat `Prime Video` as one supported site.
- Do not split the product into multiple sites just because the site contains:
  - Prime-included titles
  - rent / buy titles
  - channels
  - sports / live content

### 2. Separate Content Type From Entitlement Type
- Content type examples:
  - movie
  - episodic title
  - sports / live page
- Entitlement type examples:
  - Prime-included
  - rental / purchase required
  - channel entitlement required
- The design should not collapse these into one generic state.

### 3. Preserve Hierarchy When Amazon Exposes It
- If the site exposes `season -> episode`, the download dialog should preserve that hierarchy.
- If page metadata exposes multiple CTA states, keep the stronger entitlement clue visible.

### 4. Distinguish Business Blocking From Technical Failure
- Business blocking:
  - sign-in required
  - Prime missing
  - rent / buy required
  - channel entitlement missing
- Technical failure:
  - CoApp unavailable
  - task handoff failed
  - metadata extraction failed
- These should not share the same copy path or recovery action.

### 5. Do Not Over-design Unverified Flows
- Live / sports content should not get a full happy-path design before extension behavior is validated.
- Rental / purchased titles can be documented as claimed scope, but support wording must remain conservative until confirmed by real plugin behavior.

## Delivery Guidance
- Update `01-07` first for product conclusions.
- Then sync stable interaction patterns into:
  - `user_flows.md`
  - `ui_patterns.md`
  - `error_handling.md`
