<!-- version: 1.0.0 | updated: 2026-06-01 | status: draft | coapp-min: 7.0.0 -->

# Hulu 插件协议

## AI Quick Start

| 项目 | 内容 |
|------|------|
| **平台** | Hulu（`hulu.com` US / `hulu.jp` JP） |
| **NativeHost ID** | `com.dvdfab.streamfab.hulu.coapp` |
| **pluginType** | `"hulu"` |
| **内容类型** | `"movie"` / `"show"` |
| **类型定义** | [`types/hulu.d.ts`](types/hulu.d.ts) |
| **通用协议** | [`../../common/`](../../common/) |
| **元信息** | [`meta.json`](meta.json) |
| **来源** | 真实抓包（`hulu.com` / `hulu.jp` analyze_result） |

## 平台信息

| 平台 | 域名 | URL 格式 |
|------|------|---------|
| Hulu US | `www.hulu.com` / `hulu.com` | `https://www.hulu.com/series/<uuid>` / `https://www.hulu.com/movie/<uuid>` / `https://www.hulu.com/watch/<id>` |
| Hulu JP | `www.hulu.jp` / `hulu.jp` | `https://www.hulu.jp/<slug>`（movie / show） |

**特点**：
- 双区域：美国 Hulu（`hulu.com`）与日本 Hulu（`hulu.jp`），两区域 analyze_result 结构一致。
- 支持 movie + show 双内容类型。
- 视频默认 H264，最大分辨率 1080p；US movie（`hulu.com`）额外支持 H265（支持 HDR，`listMediaType` 随标题而变，本样本为 SDR），其余场景仅 H264；无码率自适应（CVBR/CBR）、无 analyze_codec 切换流程。
- 音频默认 AAC；US movie 额外支持 EAC3（`lstSupportAudioCodec: ["EAC3", "AAC"]`），其余场景仅 AAC。
- 无 videoType（caption/dub）区分。
- 支持 audio / subtitle 轨道选择。
- `download` 尚无真实抓包（draft），当前仅从 analyze_result 推导 codec 收窄。

---

## 与通用协议的差异总览

| 接口 / 字段 | 通用 | hulu | 差异类型 |
|---|---|---|---|
| `analyze_codec` / `analyze_codec_result` | 标准支持 | **不支持** | `[REMOVED]` |
| `data.mediaConfig.video.defaultCodec` | 任意 codec | 始终 `"H264"` | `[ENUM-]` |
| `data.mediaConfig.video.listCodecInfo` | 任意 | `[H264]` 或 `[H264, H265]`（US movie；H265 支持 HDR，本样本 SDR） | `[ENUM-]` |
| `data.mediaConfig.audio.defaultCodec` | 任意 codec | 始终 `"AAC"` | `[ENUM-]` |
| `data.mediaConfig.audio.lstSupportAudioCodec` | 任意 | `["AAC"]` 或 `["EAC3","AAC"]`（US movie） | `[ENUM-]` |
| `data.mediaConfig.video.listBitrateAdaptionInfo` | 可有 CVBR/CBR | 固定 `[]` | `[ENUM-]` |
| `data.mediaConfig.video.supportMaxResolution` | 任意 | 固定 `"EVideoResolution_1080p"` | `[ENUM-]` |
| `data.mediaConfig.videoType` | 可有 caption/dub | `lstSupportVideoType: []` | `[ENUM-]` |
| `data.meta.strType` | movie/show/... | `"movie"` / `"show"` | `[ENUM-]` |

---

## 消息交互流程

```
扩展 (Extension)                    CoApp
      │                                │
      │──── tab_actived ──────────────►│
      │──── url_change ───────────────►│
      │──── response_data ────────────►│
      │                                │
      │◄─── analyze_status ────────────│
      │◄─── analyze_result ────────────│
      │                                │
      │  [用户在 Config Panel 选择参数]
      │                                │
      │──── download ─────────────────►│
      │◄─── download_response ─────────│
      │◄─── download_status_change ────│
      │◄─── download_progress_info ────│
      │◄─── download_result ───────────│
```

---

## 文档导航

### 协议文档（`protocols/`）

| 文件 | 消息方向 | 说明 |
|---|---|---|
| [`analyze_result.md`](protocols/analyze_result.md) | CoApp → 扩展 | 与通用的差异 |
| [`download.md`](protocols/download.md) | 扩展 → CoApp | 与通用的差异（draft，待抓包） |

其余 messageType 完全继承 [`common/protocols/`](../../common/protocols/)。

### 类型定义（`types/`）

| 文件 | 说明 |
|------|------|
| [`hulu.d.ts`](types/hulu.d.ts) | Hulu 特化类型，import 自 [`common/types/`](../../common/types/) |

### 样本数据

详见 [`examples/README.md`](examples/README.md)。

---

## 常见注意事项 / 陷阱

| 问题 | 说明 |
|---|---|
| `result` 拼写 | `"successed"`（非 `"succeeded"`），CoApp 原始协议如此 |
| 双区域同构 | `hulu.com` 与 `hulu.jp` 的 analyze_result 结构一致，按域名路由即可 |
| 区域差异 | US movie 的 codec 矩阵最丰富：视频 `H264 + H265`（H265 支持 HDR，样本为 SDR）、音频 `EAC3 + AAC`；JP 两类型与 US show 仅 `H264` + `AAC` |
| codec 类型 | `VideoCodec = 'H264' \| 'H265'`、`AudioCodec = 'EAC3' \| 'AAC'`；但 `defaultCodec` 始终 H264 / AAC，无 analyze_codec 切换 |
| download 待补 | `download` 协议为 draft，尚无真实抓包；独有字段（如登录态/加速）需抓包确认 |
