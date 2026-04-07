# 00 Decision Log

## v0.1 - 2026-03-27

### Decision 1
- Topic: plugin naming
- Decision: use `streamfab_hulu_downloader_for_browser`
- Reason: follows the standard product-line naming rule

### Decision 2
- Topic: display name
- Decision: use `Hulu`
- Reason: matches the user-provided product name for this init

### Decision 3
- Topic: template baseline
- Decision: initialize from `streamfab_netflix_downloader_for_browser`
- Reason: closest current single-site StreamFab plugin baseline

### Decision 4
- Topic: init path
- Decision: run in `repair mode`
- Reason: the Hulu directory already existed and needed to be repaired to match the init skill requirements

### Decision 5
- Topic: required research sources
- Decision: use both the client product page and target-site URLs before finalizing init docs
- Reason: the init skill explicitly requires product-page extraction and target-site research when URLs are provided

### Decision 6
- Topic: current Hulu content-tree baseline
- Decision: record both season structure and version structure as confirmed findings
- Reason: these structures have already been observed in client dialog behavior
