# 06 Business Rules

## Confirmed Or Product-page-backed
- Price clue from product page: `USD 54.99`
- Capability messaging can safely reference `up to 1080p`
- Capability messaging can safely reference `EAC3 5.1 / AAC 2.0`
- Capability messaging can safely reference `MP4 / MKV`
- Capability messaging can safely reference scheduled download, subtitle remux / SRT, metadata saving, and H.264 / H.265 options
- Product-page claims include rentals and purchased movies

## Draft Rule Areas
- Account sign-in is mandatory for meaningful detection and download.
- Prime membership entitlement should be evaluated separately from rental / purchase entitlement.
- Add-on channel access should be treated as a distinct rule branch.
- Free-trial, ad-supported, and Prime-included states may need separate UX wording.

## Still Need Confirmation
- trial count and trial guardrails
- premium daily quota
- whether rental and purchased titles are fully supported in the browser plugin or only in the desktop flow
- whether channel titles share the same download rules as Prime-included titles
- whether sports / live pages are unsupported or separately handled
