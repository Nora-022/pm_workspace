# Netflix 站点技术调研

## 基本信息

- 站点：`https://www.netflix.com/`
- 调研日期：`2026-04-17`
- 调研目的：支持 StreamFab Netflix Downloader 插件开发，了解站点流媒体技术架构、内容类型、DRM 方案、编解码格式、订阅体系等

---

## 1. 内容类型与权益路径

| 内容类型 | 权益路径 | 说明 |
|----------|----------|------|
| Netflix Originals | 订阅包含 | Netflix 自制内容，全区同步上线 |
| 第三方授权内容 | 订阅包含 | 各区授权独立，内容库差异显著 |
| 电影 / 剧集 | 订阅包含 | 主要内容类型 |
| 纪录片 / 综艺 | 订阅包含 | 含大量自制内容 |
| 直播内容 | 订阅包含（部分） | 体育赛事、特别活动，逐步扩展中 |

Netflix 无 Rental / Buy 单次购买路径，所有内容通过订阅访问（直播和特殊事件除外）。

---

## 2. 流媒体协议

- **主协议：MPEG-DASH（MPD）**
  - Netflix 是 MPEG-DASH 标准的核心参与制定方之一
  - MPD 为 XML 格式，定义所有可用 Representation（码率/分辨率变体）、分片时间轴、字幕轨道
  - 分片格式：**CMAF**（Common Media Application Format），基于 ISO BMFF（fMP4）
  - 标准分片时长：约 2–6 秒，CMAF Chunk 粒度更小，用于低延迟场景
- **HLS（M3U8）**：仅 Safari / Apple 平台使用，非主流交付协议
- **Live 内容**：DASH Live Profile，MPD `type="dynamic"`，低延迟约 3–5 秒
- **Per-Title Encoding**：Netflix 针对每个视频独立分析，定制 ABR 码率梯，相比固定码率梯节省 20–30% 带宽

---

## 3. DRM 方案

Netflix 采用 **多 DRM 并行** 策略，依平台选择：

| DRM 方案 | 适用平台 | 最高安全级别 |
|----------|----------|--------------|
| Widevine | Chrome / Firefox / Android | L3（浏览器），L1（认证 Android 设备） |
| PlayReady | Windows Edge / Xbox | SL3000（支持 4K） |
| FairPlay | Safari / macOS / iOS / tvOS | 最高级别（需 T2 芯片，macOS 11.0+） |

**浏览器 Widevine 级别与分辨率关系（关键）：**

| 浏览器 | DRM | 安全级别 | 最高分辨率 |
|--------|-----|----------|-----------|
| Chrome | Widevine | **L3（软件）** | **720p** |
| Firefox | Widevine | **L3（软件）** | **720p** |
| Microsoft Edge | PlayReady | 硬件级（SL3000） | **4K** |
| Safari（现代 Mac） | FairPlay | T2 芯片硬件级 | **4K** |

- **Netflix 主动将 Widevine L3 限制在 720p**，因 L3 为纯软件解密，存在内存提取风险
- CMAF 封装同时携带 Widevine 和 PlayReady 两套 DRM 初始化数据（PSSH）

---

## 4. 视频规格

| 规格项 | Chrome / Firefox | Edge（PlayReady） | Safari（T2+） | Netflix App |
|--------|-----------------|-------------------|--------------|-------------|
| 最高分辨率 | **720p** | **4K** | **4K** | **4K** |
| HDR | 不支持 | HDR10 / Dolby Vision | HDR10 / Dolby Vision | HDR10 / HDR10+ / Dolby Vision |
| 主要编解码器 | H.264 | H.264 / H.265 / AV1 | H.264 / H.265 / AV1 | H.264 / H.265 / AV1 |

**编解码说明：**
- **H.264（AVC）**：最广兼容的基线编码，所有平台必然支持
- **H.265（HEVC）**：4K 内容主要编码，带宽效率显著高于 H.264
- **AV1**：免版税编解码器，压缩率比 HEVC 高约 20–40%；截至 2025 年已占 Netflix 流量约 30%；HDR10+ 内容优先使用 AV1
- **Dolby Vision**：动态 HDR，PlayReady / FairPlay 平台支持；H.265 编码
- **HDR10+**：2025 年 3 月起用于 AV1 流，主要面向不支持 Dolby Vision 的 Samsung 设备

**帧率：**
- 24fps（23.97fps）：电影及大多数剧集
- 30fps：标准电视节目
- 60fps：体育、部分特别内容
- 支持原生帧率播放（Native Frame Rate Playback），设备端自动匹配刷新率

**带宽需求：**
- HD（720p+）：≥ 3 Mbps
- Full HD（1080p+）：≥ 5 Mbps
- 4K：≥ 15 Mbps

---

## 5. 音频规格

| 音轨格式 | 声道数 | 适用范围 |
|----------|--------|----------|
| AAC | 2.0 立体声 | 所有平台基线 |
| AC-3（Dolby Digital） | 5.1 | 大多数内容 |
| EAC-3（Dolby Digital Plus） | 5.1 / 7.1 | 支持 DD+ 的平台 |
| EAC-3 JOC（Dolby Atmos） | 7.1.4 空间音频 | 仅 Premium 计划 + 兼容设备 |
| Opus | 2.0 / 多声道 | 新兴支持，部分内容 |

**Dolby Atmos 要求：**
- 仅 Premium 计划
- 需兼容 Atmos 的电视 / 音响设备
- 播放质量设置为"高"
- 需要 EAC-3 passthrough 支持

**浏览器限制：**
- 浏览器对 EAC-3 支持不稳定，Dolby Atmos 在桌面浏览器中通常无法正常播放
- 推荐使用 Netflix 官方 App 获取环绕声 / Atmos 体验

---

## 6. 字幕格式

| 格式 | 说明 |
|------|------|
| TTML1（DFXP） | Netflix **主要交付格式**，XML 结构，用于除日语外所有语言 |
| IMSC1.1 | 日语字幕专用格式 |
| WebVTT | 部分场景使用（`@codecs=wvtt`） |

- Netflix 2015 年因 TTML 标准推广贡献获艾美奖技术工程奖
- SRT / SCC 格式 Netflix **不接受**（合作方交付同理，除非特殊安排）
- 字幕在 MPD 中以独立 AdaptationSet 描述，`@contentType=text`，`@codecs=stpp`（TTML）或 `wvtt`（WebVTT）
- 美国区内容强制要求提供英语 CC（Closed Captions）
- Netflix Originals 通常提供最完整的多语言字幕集

---

## 7. CDN 架构

- **Netflix Open Connect（自建 CDN）**
  - Netflix 专有 CDN，已完全替代第三方 CDN（原使用 Akamai / Level3 / Limelight）
  - 全球超过 **17,000 台服务器**，覆盖 **158 个国家**
  - 以 **Open Connect Appliances（OCAs）** 形式部署，免费提供给 ISP 合作伙伴
  - Web 服务器：**NGINX**
  - 2011–2012 年起逐步迁移，动机：第三方 CDN 无法满足 Netflix 的规模扩张速度，且需要更精细的控制权
- CDN URL 含时效性签名参数，不可长期复用

---

## 8. 订阅方案与定价

### 美区（USD，2026 年 3 月调价后）

| 方案 | 月费 | 分辨率上限 | 广告 | 同时在线设备 |
|------|------|-----------|------|------------|
| Standard with Ads | $8.99/mo | 720p HD | 有 | 2 |
| Standard | $19.99/mo | 720p HD | 无 | 2 |
| Premium | $26.99/mo | 4K UHD + HDR | 无 | 4 |

**额外成员（非同住用户）：**
- 含广告版：+$6.99/mo
- 无广告版：+$9.99/mo

**4K 可用性：仅 Premium 计划**

### 其他地区参考

| 地区 | 定价水平 | 备注 |
|------|----------|------|
| 英国 | 低于美区 | GBP 定价 |
| 泰国 | 约 $3/mo（Standard） | 低收入市场策略定价 |
| 巴基斯坦 | 约 $1.6/mo（Standard） | 低收入市场策略定价 |
| 中国大陆 | 不可用 | 官方未开放 |

---

## 9. 地区差异

| 差异项 | 说明 |
|--------|------|
| 内容库规模 | 欧洲最大（8,000–9,500+ 标题），亚洲 / 拉美较小 |
| Netflix Originals | 全区同步，不受地区限制 |
| 第三方授权内容 | 各区独立授权，差异显著 |
| 分辨率上限 | 部分地区因版权协议限制，即使 Premium 计划也仅提供 1080p |
| 字幕语言 | 各区不同；日本区使用专属 IMSC1.1 格式 |
| 定价 | 全球差价高达 91%，依地区经济水平动态定价 |
| VPN 检测 | Netflix 主动检测并封锁 VPN，以执行地区许可协议 |
| 旅行访问 | 离开本国后无法访问本国内容库；每 30 天需连接本国 Wi-Fi 保持访问权 |

---

## 10. 插件开发关键约束

| 约束 | 说明 |
|------|------|
| **分辨率上限（Chrome/Firefox）** | Widevine L3 限制，**最高 720p**，无法绕过 |
| **分辨率上限（Edge）** | PlayReady 硬件级，**最高 4K**，需对应 Premium 计划 |
| DRM 解密 | 全部内容加密；密钥由 Netflix 许可服务器管理，EME/CDM 沙箱内无法提取 |
| MPD URL 时效性 | 含签名参数，不可缓存或长期复用 |
| 多音轨 | MPD 含多个 AdaptationSet，需解析 `lang` 属性选择目标音轨 |
| 字幕获取 | TTML/IMSC 格式，需独立下载并转换为 SRT 等通用格式 |
| 登录依赖 | **必须登录**，Netflix 无匿名访问；认证 Token 绑定账户、设备、IP |
| 计划限制 | Standard with Ads / Standard：720p；Premium：4K（需配合 Edge/Safari） |
| Live 内容 | DASH Live Profile，行为与 VOD 不同，需独立验证 |

---

## 11. 参考资料

- Netflix Help Center（分辨率/音频/字幕）：`https://help.netflix.com/`
- Netflix Technology Blog（Per-Title Encoding / AV1 / Native Frame Rate）：`https://netflixtechblog.com/`
- Netflix Open Connect：`https://openconnect.netflix.com/`
- Netflix Partner Help（字幕交付规范）：`https://partnerhelp.netflixstudios.com/`
- Widevine 安全级别说明：`https://www.widevine.com/`
- MPEG-DASH 规范：`https://dashif.org/`
- CMAF 规范：ISO/IEC 23000-19
- 内部验证：实际抓包数据以开发阶段为准，本文档仅记录公开信息与行业通识
