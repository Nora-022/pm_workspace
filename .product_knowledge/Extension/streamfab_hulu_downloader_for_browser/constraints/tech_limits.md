# Tech Limits

> Distilled from `07_technical_constraints.md` and the client breakdown's `Notes / Constraints`. Do not introduce new facts here.

## Output Format
- containers: `MP4`, `MKV`
- video codec selectable: `H.264`, `H.265`
- resolution: up to `1080p/4K` (product-page promise)
- audio: `EAC3 5.1` (product-page promise)

## Source Dependence
- DRM / copyright status of the source determines downloadability and quality cap
- Available quality / codec / audio also depends on the user's subscription tier

## Region
- region-agnostic: any region the user is entitled to
- region differences in Hulu's content library affect parseable resource scope

## Quota
- trial: `3 videos` total
- paid: `100 videos / day`
- daily / weekly caps documented in client breakdown to prevent abuse and ban risk
- each grouped variant (subtitle, dubbed, bonus, extras, trailers) consumes quota independently

## Pending
- exact metadata schema differences between `.com` and `.jp`
- timeout / retry limits for queueing and account-state interruption mid-download
