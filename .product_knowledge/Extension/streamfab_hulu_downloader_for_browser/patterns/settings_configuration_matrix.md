# Settings Configuration Matrix

> Distilled from `requirements/plugin_requirement.md` and the client breakdown's Setting view. Do not introduce new facts here.

## Download Dialog (right panel)

| Field | Values |
|---|---|
| `Resolution (Bitrate)` | dynamic; populated by CoApp analysis (e.g. `1920 × 1080 (Bitrate 4000 kbps)`) |

No independent audio / subtitle controls in the right panel — those dimensions live on the content tree.

## Setting → Extension (in order)

| # | Field | Values | Sub-option |
|---|---|---|---|
| 1 | Language | `Same as UI Language` + 27 client languages | — |
| 2 | Video Format | `MP4` / `MKV (FFmpeg)` / `MKV (MKVToolNix)` | — |
| 3 | Video Resolution | `Full HD - 1080p` / `HD - 720p` | — |
| 4 | Pre-select Audio Language | `Same as UI Language` + 27 client languages | `Pre-select Description Audio if available` (off by default) |
| 5 | Audio Channel | `Stereo (AAC)` / `Multi-Channel 5.1 (EAC3 / AC3)` | `Pre-select both 5.1 and 2.0 audios` (off by default) |
| 6 | Pre-select Subtitle Language | `None` / `Same as UI Language` + 27 client languages | `Always download the forced subtitle` (on by default) |
| 7 | Subtitle Action | `Remux Into File` / `Extract to SRT File` / `Extract Original Format` | — |

## Hulu-Specific Additions (appended after #7)

| # | Field | Values |
|---|---|---|
| 8 | Video Codec | `H264` / `H265` |
| — | Region | (selector value not enumerated in current breakdown) |

## Diff vs Netflix Reference Plugin
- `Video Codec` selector — added for Hulu, absent in baseline Netflix flow
- `Region` selector — added for Hulu, absent in baseline Netflix flow
- All other Setting → Extension items are shared 1:1 with the Netflix plugin
