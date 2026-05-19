# 07 技术约束

## 当前约束
- 插件目录命名遵循 `streamfab_<service>_downloader_for_browser`
- 主入口文件统一为 `00_overview.md`
- 初始化流程需同时维护本地知识库与飞书文档
- 模板变量替换应使用 `Fandango at Home` 与 `fandango_at_home` 的对应关系

---

## 技术约束（2026-05-19 分发）

事实来源：`references/site_research_notes.md`、客户端方案拆解（飞书）。

### 播放协议与加密

- 主协议：**MPEG-DASH**（PC 浏览器走 `.mpd` manifest，CMAF / fMP4 分片）
- 加密方案：**CENC**（Common Encryption），多 DRM 并存
- DRM 系统：
  - **Widevine**（UUID `edef8ba9-79d6-4ace-a3c8-27dcd51d21ed`）：Chrome / Chromium / Android
  - **PlayReady**（UUID `9a04f079-9840-4286-ab92-e65be0885f95`）：Edge / Windows / Roku / Xbox
  - FairPlay 走 HLS 路径，浏览器插件场景一般不命中
- 字幕：WebVTT / TTML，DASH 内嵌或 sidecar
- 音频：常见 EAC3 5.1（Dolby Digital Plus）和 AAC 2.0；4K 内容可能伴随 Dolby Atmos 元数据

### DRM Robustness 分层

| 清晰度 | Widevine | PlayReady |
|---|---|---|
| SD / HD | L3（软件级）即可 | SL2000（软件级）即可 |
| 4K UHD / HDR / Dolby Vision | **L1（硬件级）** | **SL3000（硬件级）** |

影响：

- 内置浏览器若仅命中 Widevine L3，4K HDR / DV 通常会被平台降级到 HD
- 实际可下载最高清晰度以 CoApp 分析结果为准，不在任何环境下都成立
- Microsoft Edge for Windows 10+ 走 SL3000，旧系统降级到 SL2000

### CoApp 依赖

- 视频实际分析进度依赖 CoApp 接口，插件侧无法独立模拟真实分析阶段
- Setting 配置项 Video Codec / Audio Codec 的实际可用集合由 CoApp 分析结果驱动
- 下载分片进度、速度、剩余时间、文件大小均由 CoApp 实时上报

### 平台支持

- Windows：当前发布优先级
- macOS：声明支持，发布范围以版本计划为准
- Linux：不在支持范围

### 站点结构识别

- 入口 URL 模式：`https://athome.fandango.com/content/browse/details/<slug>/<id>`
- 兼容旧域：`vudu.com`（已重定向到新域）
- 详情页 DOM 与入口可能随权益状态变化（Rent / Buy / Free-with-Ads / 未登录）

### 不应默认假设

- 不默认所有视频都支持 4K HDR / Dolby Vision
- 不默认所有详情页字段在 playlist 下首集即可代表全集
- 不默认非 US IP 能拿到 manifest 或 license challenge
- 不默认 AVOD 免费内容全部命中下载边界

### 需实测确认项

以下内容站点未公开统一口径，归到实测环节：

- 同账号并发设备数与设备授权 / 解绑规则
- AVOD 免费内容下载边界
- 4K HDR / DV 在内置浏览器环境下的实际命中率
- Free with Ads 内容广告插入位置和"Remove Ads"能力的精确适用范围
