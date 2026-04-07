# 00 Decision Log

## v0.1 - 2026-04-07

### Decision 1
- Topic: plugin naming
- Decision: use `streamfab_amazon_downloader_for_browser`
- Reason: follows the standard StreamFab plugin naming rule and the user explicitly confirmed `service name = amazon`

### Decision 2
- Topic: display name
- Decision: initialize with `Amazon`
- Reason: the user confirmed the service name only; current plugin scope is documented more precisely as `Prime Video`

### Decision 3
- Topic: template baseline
- Decision: initialize from `streamfab_netflix_downloader_for_browser`
- Reason: Netflix is the closest existing single-site subscription-streaming baseline in this workspace

### Decision 4
- Topic: init mode
- Decision: run in `create mode`
- Reason: the Amazon plugin directory did not exist in the Extension workspace

### Decision 5
- Topic: research scope
- Decision: use the provided client product page and default target-site research on `primevideo.com`
- Reason: the user supplied the product page URL but did not provide additional target URLs; Prime Video is the safest direct target-site assumption for first-pass init

### Decision 6
- Topic: fact confidence
- Decision: write only product-page-backed capability claims as confirmed facts and mark all player/detail-page assumptions as pending
- Reason: this keeps the init usable without overstating unverified site behavior

### Decision 7
- Topic: site model
- Decision: keep Amazon archived as one `Prime Video` target site
- Reason: the complexity comes from different content and entitlement types inside the same site, not from multiple supported sites

### Decision 8
- Topic: archive purpose
- Decision: keep the knowledge base optimized for personal recall and later reuse
- Reason: this workspace is primarily a self-maintained knowledge archive, not a development handoff package
