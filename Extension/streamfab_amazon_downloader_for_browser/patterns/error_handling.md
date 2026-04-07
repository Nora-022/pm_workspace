# Amazon Error Handling

## Pattern 1: entitlement block
- Scenarios:
  - not signed in
  - Prime membership missing
  - rental / purchase required
  - add-on channel entitlement required
- UX rule:
  - explain the entitlement state explicitly
  - do not collapse all failures into a generic `not supported`

## Pattern 2: region or availability block
- Scenarios:
  - title unavailable in current region
  - playback blocked by market or account rules
- UX rule:
  - show region / availability wording when evidence exists
  - avoid offering retry without a meaningful user action

## Pattern 3: live / sports unsupported
- Scenario:
  - page is part of `Sports` / `Live TV` rather than standard VOD
- UX rule:
  - show unsupported or pending-support state before task creation

## Pattern 4: environment failure
- Scenarios:
  - CoApp unavailable
  - disk issue
  - task handoff failure
- UX rule:
  - create local task-level failure state
  - keep entitlement and environment problems clearly separated
