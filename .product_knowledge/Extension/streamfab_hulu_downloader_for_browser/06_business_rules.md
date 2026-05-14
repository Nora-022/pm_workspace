# 06 Business Rules

## Current Confirmed From Product Page
- Trial period: `30 days`
- Trial quota: `3 Hulu videos`
- Daily quota: `up to 100 Hulu videos per day`
- Price points observed on product page:
  - `USD 59.99`
  - `USD 109.99`

## Trial and Quota
- Trial users may download `3 Hulu videos` total (matches product-page promise).
- Paid users have a daily cap of `100 Hulu videos` (matches product-page promise).
- Trial dialog reuses Netflix's existing trial copy; no Hulu-specific wording.
- Each grouped variant (subtitle version, dubbed version, bonus, extras, trailers) counts against the quota independently when selected.

## Content Availability Constraints
- Use is limited to lawful personal viewing.
- Some titles may be undownloadable or quality-capped due to copyright / DRM status.
- Available resolution / codec / audio depends on Hulu's source content and the user's subscription entitlement.
- Region differences in Hulu's content library affect which resources can be parsed.

## Still Pending
- exact metadata schema differences between `.com` and `.jp`, and whether they share one plugin entitlement model
- client-enforced behavior on login interruption mid-download (resume vs cancel vs prompt)
