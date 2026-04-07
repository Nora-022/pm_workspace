# Amazon Content-Type and Entitlement Diffs

## Single-site Content Differences
- Prime Video remains one supported site.
- Inside this site, public pages expose multiple content / entitlement types:
  - Prime-included VOD
  - rent / buy
  - channels
  - sports
  - live TV
- These should not be collapsed into one generic content state.

## Detail-page Differences
- Movie pages can show:
  - `Watch with Prime`
  - `Rent`
  - `Buy`
  - audio / subtitle metadata
- Episodic pages can additionally show:
  - season switcher
  - episode list
  - per-episode CTA

## Region / Locale Differences
- Homepage locale list is broad, implying:
  - wording differences
  - possible metadata differences
  - possible entitlement differences
- The plugin should not hardcode one locale-specific CTA string as the only detection rule.
