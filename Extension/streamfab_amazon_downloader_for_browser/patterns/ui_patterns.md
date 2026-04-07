# Amazon UI Patterns

## Pattern 1: Detected Title Card
- Usage:
  - show a downloadable Prime Video title detected from the current page
- Key elements:
  - checkbox
  - poster / thumbnail
  - title and metadata
  - entitlement cue
  - entry action for download configuration
- Design focus:
  - keep title identity and entitlement state visible together
  - do not hide whether the title is Prime-included or rent / buy gated

## Pattern 2: Episodic Selection Tree
- Usage:
  - show `season -> episode` hierarchy when Amazon exposes episodic metadata
- Key elements:
  - season switch or grouped tree
  - episode rows
  - per-item selection state
  - batch selection affordance
- Design focus:
  - preserve hierarchy
  - avoid flattening when hierarchy carries content meaning

## Pattern 3: Entitlement-state Message Block
- Usage:
  - explain why a title is not currently downloadable
- Common states:
  - sign-in required
  - Prime required
  - rental / purchase required
  - channel entitlement required
  - unsupported sports / live page
- Design focus:
  - tell the user why the action is blocked
  - keep the next step explicit where a next step exists

## Pattern 4: Download Configuration Panel
- Usage:
  - configure a task before creation
- Expected configuration areas:
  - video quality
  - codec
  - audio language
  - subtitle language / subtitle action
- Design focus:
  - only expose controls that the extension actually supports
  - keep product-page-backed capabilities visible, but do not invent extra controls

## Pattern 5: Unsupported Content-state Card
- Usage:
  - sports / live or otherwise unvalidated page types
- Design focus:
  - show explicit unsupported or pending-support messaging
  - do not create a false-positive detected state
