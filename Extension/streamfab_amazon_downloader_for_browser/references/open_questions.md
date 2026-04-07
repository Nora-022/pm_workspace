# Amazon Open Questions

## P0
- Does the browser plugin currently support Prime-included titles only, or also rental / purchased titles as claimed on the product page?
- Are `Sports`, `Live TV`, and `Channels` explicitly unsupported, or just not yet validated?
- What are the actual task-creation prerequisites: detail page only, playback page only, or both?

## P1
- Which settings are really exposed in the Amazon browser-plugin dialog:
  - resolution
  - codec
  - audio language
  - subtitle language
  - subtitle action
- Does the dialog preserve season / episode hierarchy or flatten the episode list?
- How are ad-supported Prime titles labeled in detection and task failure states?

## P2
- Are media-server metadata fields saved by the extension itself or by CoApp post-processing?
- Does region switching change available subtitle / audio lists before playback starts?
- Is there any dedicated UX for audio description or Dialogue Boost tracks?
