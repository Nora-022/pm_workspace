# Tech Limits

> 从 `07_technical_constraints.md`、`references/site_research_notes.md` 提炼。不在此引入新事实。

## 输出格式

- 容器：`MP4` / `MKV`
- 视频编码可选：`H264` / `H265 - SDR` / `HDR10` / `Dolby Vision`
- 视频清晰度：up to `4K`（产品页承诺，实际上限以 CoApp 分析结果为准）
- 音频编码可选：`EAC3` / `AAC`
- 音频能力：`EAC3 5.1` / `AAC 2.0`
- 字幕：`SRT` 或封装进视频；多语言；一个视频可同时下载多种语言字幕

## 播放协议与加密

- 主协议：MPEG-DASH（`.mpd` manifest，CMAF / fMP4 分片）
- 加密：CENC（Common Encryption），Widevine + PlayReady 双 DRM
- Widevine UUID：`edef8ba9-79d6-4ace-a3c8-27dcd51d21ed`（Chrome / Chromium / Android）
- PlayReady UUID：`9a04f079-9840-4286-ab92-e65be0885f95`（Edge / Windows / Roku / Xbox）
- FairPlay 走 HLS 路径，浏览器插件场景一般不命中

## DRM Robustness 分层

| 清晰度 | Widevine | PlayReady |
|---|---|---|
| SD / HD | L3（软件级） | SL2000（软件级） |
| 4K UHD / HDR / Dolby Vision | **L1（硬件级）** | **SL3000（硬件级）** |

影响：

- 内置浏览器若仅命中 Widevine L3，4K HDR / DV 通常会被平台降级到 HD
- Microsoft Edge for Windows 10+ 走 SL3000，旧系统降级到 SL2000

## 来源依赖

- DRM / 版权状态决定可下载性与质量上限
- 实际可用清晰度 / 编码 / 音轨取决于 Fandango at Home 源内容和用户账户权限

## 地区

- 服务地区严格限定为美国
- 非 US IP 无法拿到 manifest 或 license challenge
- 产品页 "region-agnostic" 仅指用户账户视野内的内容，不指可在非美区直接拉取

## CoApp 依赖

- 视频实际分析进度依赖 CoApp 接口
- Setting 配置项 Video Codec / Audio Codec 实际可用集合由 CoApp 分析结果驱动
- 下载分片进度、速度、剩余时间、文件大小均由 CoApp 实时上报

## TV 类首集分析限制

- playlist 仅分析第一集 meta，结果不必然适用于后续剧集
- 后续剧集若不存在第一集已列出的分辨率，使用 `if available` 标注

## 不应默认假设

- 不默认所有视频都支持 4K HDR / Dolby Vision
- 不默认所有详情页字段在 playlist 下首集即可代表全集
- 不默认非 US IP 能拿到 manifest 或 license challenge
- 不默认 AVOD 免费内容全部命中下载边界

## 需实测确认项

- 同账号并发设备数与设备授权 / 解绑规则
- AVOD 免费内容下载边界
- 4K HDR / DV 在内置浏览器环境下的实际命中率
- Free with Ads 内容广告插入位置和 "Remove Ads" 能力的精确适用范围
- 下载中途登录中断的具体处理（resume / cancel / prompt）
