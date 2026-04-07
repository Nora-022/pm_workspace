# Amazon User Flows

## Flow 1: Prime-included movie download
1. user opens a Prime Video movie detail page
2. plugin identifies title metadata and entitlement CTA
3. user opens the download dialog
4. user confirms quality / codec / language options that are available
5. task is created and queued

## Flow 2: episodic batch download
1. user opens a TV-series detail page
2. plugin builds `season -> episode` tree
3. user selects one or more episodes or a full season
4. user confirms shared download settings
5. tasks are created in batch and passed to queue handling

## Flow 3: rental / purchase gated title
1. plugin detects a title page that exposes `Rent`, `Buy`, or `More purchase options`
2. plugin checks whether a valid entitled playback path exists
3. if not entitled, plugin surfaces a clear gated state instead of pretending the title is downloadable
4. if entitled behavior is confirmed later, the flow can be upgraded without changing the page-family model

## Flow 4: unsupported live / sports page
1. user opens a `Sports` or `Live TV` event page
2. plugin recognizes a time-based or live-event surface
3. plugin shows explicit unsupported or pending-support messaging
4. user is not allowed to create a broken download task
