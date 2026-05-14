# Error Handling

> Distilled from `06_business_rules.md`, `07_technical_constraints.md`, and the client breakdown's `Notes / Constraints` block. Do not introduce new facts here.

## Confirmed Error / Constraint Scenarios

### DRM / Copyright Refusal
- Trigger: Hulu source title is DRM-protected or copyright-restricted in a way the plugin cannot resolve
- Effect: title is undownloadable, or downloadable only at a capped quality
- Display copy / retry behavior: not specified in current breakdown

### Subscription / Entitlement Cap
- Trigger: user's Hulu subscription does not entitle them to the requested resolution / codec / audio
- Effect: available quality narrowed to what the account is entitled to
- Display copy / retry behavior: not specified in current breakdown

### Region Library Difference
- Trigger: a resource present in one region's library is absent or different in another
- Effect: parseable resource scope is reduced; cross-region content may not appear
- Display copy / retry behavior: not specified in current breakdown

### Quota Limit Reached
- Trigger: trial user reaches `3 videos`; paid user reaches `100 videos / day`
- Effect: further download attempts blocked
- Display copy / retry behavior: trial dialog reuses Netflix's copy; paid daily-cap dialog not specified in current breakdown

## Scenarios Not Yet Detailed
- analysis failure (`season` / `metadata` / `audio & subtitle` stage error)
- login interruption mid-download
- network or CoApp local-execution failure
- DRM provisioning failure
