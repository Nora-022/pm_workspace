# TVer Site Research Notes

## Research Status
- Research completed on 2026-03-27.
- This version is based primarily on official TVer help pages and the public website.
- Facts below are split into confirmed facts, product signals, and open questions.

## Target Site
- Site: `TVer`
- Primary URL: `https://tver.jp/`
- Research scope in this round:
  - viewing model
  - login requirement
  - geo restriction
  - page / player capability signals
  - download-related boundary statements

## Executive Summary
- TVer is a Japan-only, free ad-supported streaming service for browser, app, and TV-app viewing.
- Browser viewing on PC is officially supported; mobile web is not guaranteed and the app is the recommended environment there.
- Normal viewing does not require TVer ID login, but some convenience features and parts of realtime viewing do require login.
- TVer explicitly states that download / save / copy functionality is not provided and unauthorized downloading is prohibited.
- The site exposes user-facing controls for quality selection, subtitles, and playback speed, but those capabilities vary by program and environment.
- From a plugin-design perspective, TVer should be treated as a playback-gated, Japan-region-limited service with at least some feature variance by content and environment.

## Confirmed Facts

### 1. Service Positioning And Pricing
- TVer states that all distributed videos can be watched for free.
- TVer states that there is no monthly fee or registration fee.
- Working implication:
  - this is not a paid-subscription-first service like Netflix or Hulu
  - entitlement design is likely driven more by region, program availability window, and feature gating than by paid tiers

### 2. Device And Environment Model
- TVer officially supports playback on smartphones/tablets, TV apps, and PC web browsers.
- For smartphones and tablets, TVer says the app is the recommended environment and browser viewing is not guaranteed.
- For PC, official help says users can access TVer in a web browser and click a title to start viewing.
- Recommended PC browser environments include Edge, Chrome, Firefox on Windows 11; Safari, Chrome, Firefox on macOS 12+.
- HDMI monitor output and car-navigation style viewing are listed as out of recommended environment.

### 3. Login Requirement
- TVer states that registration or login is not required for standard viewing.
- TVer also states that some functions, such as realtime "chase playback", do require TVer ID login.
- TVer ID also enables favorites, resume sync across devices, and expanded convenience features.
- Working implication:
  - normal VOD-style playback may be accessible without login
  - plugin logic must not assume login is always required
  - plugin logic also must not assume login is irrelevant, because some scenarios do depend on it

### 4. Region Restriction
- TVer states that video viewing is limited to Japan.
- TVer also states that using a VPN is outside its support scope and operation is not guaranteed.
- Working implication:
  - geo restriction is a first-class product boundary
  - overseas and VPN scenarios should be treated as unstable or unsupported in plugin planning

### 5. Availability Window
- TVer help says catch-up programs are generally available from after broadcast ends until just before the next broadcast, with exceptions.
- The end time is shown per program; when more than one week remains, the UI may show a coarse "more than one week" style message before switching to an exact end date/time later.
- Working implication:
  - program availability is strongly time-window-based
  - plugin-side messaging may need to handle "expiring soon" or "no longer available" situations cleanly

### 6. Download / Save Boundary
- TVer explicitly says there is no function to download, save, or copy videos.
- TVer also states that unauthorized downloading, including recording and capture of distributed content, is prohibited.
- Working implication:
  - the site publicly positions itself as non-downloadable
  - any plugin planning should assume anti-download positioning and likely stronger content-protection sensitivity

## Player Capability Signals

### 1. Quality Selector
- TVer help says playback quality can be changed on PC, mobile, and TV app.
- The visible quality options are `auto`, `high`, `medium`, and `low`.
- This is a strong signal that the player exposes multiple rendition levels to the user.

### 2. Subtitles
- TVer help says subtitles are supported only for some environments and programs.
- It also says non-Japanese subtitle display is not supported.
- Programs marked with `[字]` are subtitle-capable.
- On PC, subtitle on/off is controlled from a `[CC]` control in the player.
- Working implication:
  - subtitle capability exists, but it is not globally guaranteed
  - subtitle extraction assumptions must stay conditional, not universal

### 3. Playback Speed
- TVer help says playback speed control is available on PC, mobile, and supported TV devices.
- It also says some programs do not support it.
- Working implication:
  - the player has richer interaction controls than a bare-minimum free-video site
  - content-level feature variance is likely part of the runtime behavior

### 4. Realtime Viewing
- Help-center navigation shows dedicated realtime-viewing topics.
- Realtime subtitle support is only available for some programs.
- Some realtime-related capabilities, such as chase playback, require login.
- Working implication:
  - TVer is not only a static VOD catch-up catalog
  - realtime / live-like flows may need to be separated from standard episode playback in plugin planning

## Site Structure Signals

### Confirmed Or Strongly Indicated Page Types
- Home page
- Search / discovery page
- Program pages
- Playback player pages or in-page playback states
- My page / personal state pages
- Realtime viewing pages

### Evidence Behind These Signals
- Help documentation references:
  - home content such as "continue watching"
  - a `さがす` page with filters such as subtitle availability
  - my-page style personalized areas
  - dedicated realtime-viewing help topics
  - direct playback interactions on PC

### Current Structural Judgment
- The site likely mixes browse pages, program-detail pages, and player states rather than relying on one single page type.
- Search / filter entry points appear important because subtitle-capable content can be discovered from search filters.
- User-state-aware surfaces such as favorites, continue watching, and my-page exist and may change the DOM or available actions when logged in.

## Account, Membership, And Rights Model

### Confirmed
- No paid registration is required for general viewing.
- No TVer ID is required for standard viewing.
- TVer ID unlocks convenience and some realtime-related features.

### Inference
- TVer currently looks closer to an ad-supported free catch-up model than a subscription-entitlement model.
- The primary content-access boundaries likely come from:
  - region
  - program availability period
  - feature-by-feature player support
  - possibly broadcaster / program-level rights windows

## Capability And Boundary Signals Relevant To Plugin Design

### Likely Helpful Signals
- Multiple quality levels appear to exist.
- Subtitle support exists for some titles.
- PC browser playback is officially supported.
- Playback controls are rich enough to expose quality, subtitles, and speed in the UI.

### Likely Risk Signals
- Japan-only viewing boundary
- VPN unsupported
- explicit no-download positioning
- likely ad-supported playback flow
- varying support by program and environment
- realtime and catch-up flows may behave differently

## Impact On Plugin Design

### 1. Detection Strategy
- Do not assume one stable page type is enough.
- The plugin likely needs to distinguish at least:
  - browse / discovery surfaces
  - program-detail surfaces
  - actual playback surfaces
  - realtime-related surfaces

### 2. Login Handling
- Default assumption should be "login not required for basic playback".
- But detection / extraction flows must remain compatible with logged-in states because TVer ID changes feature access and user-state surfaces.

### 3. Region Handling
- Geo restriction must be treated as a core failure mode.
- Product copy and troubleshooting notes should explicitly mention Japan-only access.

### 4. Configuration Surface
- The visible player supports quality switching.
- Subtitle and speed controls exist but are content-dependent.
- It is still not safe to claim audio-track selection, subtitle extraction, or stable quality mapping for download until technical verification is done.

### 5. Compliance / Messaging Sensitivity
- Because TVer publicly states that download / save / copy is not provided and unauthorized downloading is prohibited, any plugin planning should expect higher sensitivity around wording, feature claims, and failure handling.

## Open Questions
- What are the stable URL patterns for program pages, episode pages, and playback pages?
- Does playback occur on the same detail page or in a dedicated player route?
- Are ads mandatory before stream access, and do they affect manifest acquisition timing?
- Is the actual stream packaging HLS, DASH, or mixed by program type?
- Are subtitles exposed as separate tracks in network requests, and are they consistently available when `[字]` is shown?
- Does realtime content use a materially different playback stack from catch-up content?
- Are there broadcaster-specific differences that require per-network handling?
- Are there age-gated or device-gated content branches not visible from the generic help center?

## Suggested Next Verification Tasks
- Capture real desktop page samples for:
  - home
  - search results
  - program detail
  - episode detail
  - active playback
  - realtime playback
- Inspect network behavior before and after playback starts.
- Verify whether ads, geo checks, or login checks gate manifest access.
- Verify whether subtitle and quality options map to extractable media tracks.

## Sources
- TVer official site: `https://tver.jp/`
- TVer viewing method help: `https://help.tver.jp/hc/ja/articles/20080570934937-TVer%E3%81%AE%E8%A6%96%E8%81%B4%E6%96%B9%E6%B3%95%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84`
- TVer free viewing help: `https://help.tver.jp/hc/ja/articles/211000198-TVer%E3%81%AF%E7%84%A1%E6%96%99%E3%81%A7%E8%A6%96%E8%81%B4%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B`
- TVer login requirement help: `https://help.tver.jp/hc/ja/articles/5105631015961-TVer%E3%81%AFTVer-ID%E3%81%AE%E7%99%BB%E9%8C%B2%E3%82%84%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%82%92%E3%81%97%E3%81%AA%E3%81%84%E3%81%A8%E8%A6%96%E8%81%B4%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%9B%E3%82%93%E3%81%8B`
- TVer overseas restriction help: `https://help.tver.jp/hc/ja/articles/5106803908633-%E6%B5%B7%E5%A4%96%E3%81%A7%E3%82%82%E5%8B%95%E7%94%BB%E3%82%92%E8%A6%96%E8%81%B4%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B`
- TVer availability-window help: `https://help.tver.jp/hc/ja/articles/5106957474201-%E9%85%8D%E4%BF%A1%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E7%95%AA%E7%B5%84%E3%81%AF-%E3%81%84%E3%81%A4%E3%81%BE%E3%81%A7%E8%A6%96%E8%81%B4%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B`
- TVer no-download help: `https://help.tver.jp/hc/ja/articles/5106719268761-%E5%8B%95%E7%94%BB%E3%81%AE%E3%83%80%E3%82%A6%E3%83%B3%E3%83%AD%E3%83%BC%E3%83%89-%E4%BF%9D%E5%AD%98-%E3%82%B3%E3%83%94%E3%83%BC%E3%81%AA%E3%81%A9%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B`
- TVer quality-setting help: `https://help.tver.jp/hc/ja/articles/5106518148377-%E7%94%BB%E8%B3%AA%E3%81%AE%E5%A4%89%E6%9B%B4%E6%96%B9%E6%B3%95%E3%82%92%E6%95%99%E3%81%88%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84`
- TVer subtitle help: `https://help.tver.jp/hc/ja/articles/5106171674009-%E5%85%A8%E3%81%A6%E3%81%AE%E7%95%AA%E7%B5%84%E3%81%A7%E5%AD%97%E5%B9%95%E3%82%92%E3%81%A4%E3%81%91%E3%81%A6%E8%A6%96%E8%81%B4%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B`
- TVer subtitle-setting help: `https://help.tver.jp/hc/ja/articles/5106379095577-%E5%AD%97%E5%B9%95%E5%AF%BE%E5%BF%9C%E7%95%AA%E7%B5%84%E3%81%A7%E5%AD%97%E5%B9%95%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8C%E3%81%B0%E3%81%84%E3%81%84%E3%81%A7%E3%81%99%E3%81%8B`
- TVer playback-speed help: `https://help.tver.jp/hc/ja/articles/5106664840857-%E5%80%8D%E9%80%9F%E5%86%8D%E7%94%9F%E3%81%AF%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B`
