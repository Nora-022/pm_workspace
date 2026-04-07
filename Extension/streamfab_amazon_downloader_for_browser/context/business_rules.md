# Amazon Business Rules Context

## Confirmed or Product-page-backed
- Product page shows current price clue: `USD 54.99`.
- Capability copy can safely mention:
  - `1080p`
  - `EAC3 5.1 / AAC 2.0`
  - `MP4 / MKV`
  - `H.264 / H.265`
  - subtitle remux / SRT
  - metadata saving
  - scheduled new-episode download
- Product page explicitly mentions rentals and purchased movies.

## Working Rule Frame
- Sign-in is mandatory for meaningful use.
- Entitlement should be treated by type, not as a single boolean:
  - Prime-included
  - rental / purchase
  - channel entitlement
  - possible ad-supported variants
- Unsupported or unverified content types should fail with explicit messaging, not silent no-op behavior.

## Still Pending
- trial count
- premium daily quota
- exact rental / purchase support boundary in the browser plugin
- exact channels / sports / live handling

## Archive Note
- For this knowledge base, the value is remembering where business-rule confidence comes from.
- Reuse product-page-backed claims first.
- Treat all plugin-runtime rule guesses as pending until real behavior is captured.
