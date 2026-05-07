# Disney Plus 站点技术调研

## 基本信息

- 站点：`https://www.disneyplus.com/`
- 调研日期：`2026-04-17`
- 调研目的：支持 StreamFab Disney Plus Downloader 插件开发，了解站点流媒体技术架构、内容类型、DRM 方案、编解码格式、订阅体系等

---

## 1. 内容类型与权益路径

| 内容品牌 | 说明 |
|----------|------|
| Disney | 迪士尼经典与现代动画电影 |
| Pixar | 皮克斯动画电影与剧集 |
| Marvel Studios | MCU 电影 + 独家剧集（如 Daredevil: Born Again） |
| Star Wars | 全系列电影 + 独家剧集（如 The Mandalorian） |
| National Geographic | 纪录片、自然内容 |
| 20th Century Studios | 收购的电影库（X-Men、阿凡达等） |
| Searchlight / Touchstone / Hollywood Pictures | 额外电影库 |
| 直播内容 | 体育赛事（ESPN+ 整合，美区）、特别活动 |

所有内容通过**订阅**访问，无独立 Rental / Buy 购买路径（不同于 Amazon Prime Video）。

---

## 2. 流媒体协议

- **主协议：HLS（M3U8）**
  - Disney Plus 主要采用 HLS 作为交付协议
  - 苹果生态（Safari / iOS）天然兼容，且与 FairPlay DRM 配合
- **CMAF（Common Media Application Format）封装**
  - 现代 Disney Plus 采用 CMAF 编码，同一加密分片可同时服务 HLS 和 DASH
  - 分片格式：ISO BMFF（fMP4），分片时长等参数需实测确认
- **MPEG-DASH（MPD）**：通过 CMAF 双协议支持，非苹果设备可能使用 DASH 路径
- **Live 内容**：动态 Manifest，行为与 VOD 不同，需独立验证
- **ABR**：自适应码率，客户端根据带宽动态切换 Representation；具体码率梯设计未公开

---

## 3. DRM 方案

Disney Plus 采用 **多 DRM 并行** 策略：

| DRM 方案 | 适用平台 | 最高安全级别 |
|----------|----------|--------------|
| Widevine | Chrome / Firefox / Android | L3（浏览器），L1（认证 Android 设备） |
| PlayReady | Windows Edge / Xbox | SL3000（硬件级，支持 4K） |
| FairPlay | Safari / macOS / iOS / tvOS | SL3000（T2 芯片，支持 4K） |

**浏览器 Widevine 级别与分辨率关系（关键）：**

| 浏览器 | DRM | 安全级别 | 最高分辨率 |
|--------|-----|----------|-----------|
| Chrome | Widevine | **L3（软件）** | **720p** |
| Firefox | Widevine | **L3（软件）** | **720p** |
| Microsoft Edge | PlayReady | 硬件级（SL3000） | 理论 4K，需认证 |
| Safari（现代 Mac） | FairPlay | T2 芯片硬件级 | 理论 4K，需认证 |

- 4K 内容要求 **HDCP 2.2** 兼容显示器
- CMAF 封装同时携带 Widevine 和 PlayReady 两套 DRM 初始化数据

---

## 4. 视频规格

| 规格项 | Chrome / Firefox | Edge / Safari | 官方 App |
|--------|-----------------|---------------|---------|
| 最高分辨率 | **720p** | 理论 4K（需认证） | **4K UHD** |
| HDR | 不支持 | HDR10 / Dolby Vision（认证设备） | HDR10 / Dolby Vision |
| 主要编解码器 | H.264 | H.264 / H.265 / AV1 | H.264 / H.265 / AV1 |

**编解码说明：**
- **H.264（AVC）**：最广兼容的基线编码
- **H.265（HEVC）**：4K 内容主要编码
- **AV1**：新内容逐步支持，压缩效率更高，需 GPU 硬解支持

**帧率：**
- 24fps：电影内容
- 30fps：标准电视节目
- 60fps：部分体育 / 特别内容（具体以片源为准）

---

## 5. 音频规格

| 音轨格式 | 声道数 | 适用范围 |
|----------|--------|----------|
| AAC | 2.0 立体声 | 所有平台基线 |
| AC-3（Dolby Digital） | 5.1 | 大多数内容 |
| EAC-3（Dolby Digital Plus） | 最高 15 声道，6.144 Mbit/s | 支持 DD+ 的平台 |
| EAC-3 JOC（Dolby Atmos） | 7.1.2+ 空间音频 | Premium 计划 + 兼容设备 |

**Dolby Atmos 要求：**
- 仅 **Premium（Ad-Free）计划**，Basic 计划明确禁止 Atmos
- 需兼容 Atmos 的设备 / 音响系统
- IMAX Enhanced Sound 同样仅限 Premium 计划

**浏览器限制：**
- 浏览器通常最高支持 AC-3 5.1，Atmos 无法在浏览器中获得
- 官方 App 才能获得完整环绕声体验

---

## 6. 字幕格式

| 格式 | 说明 |
|------|------|
| TTML / IMSC | OTT 平台级主要格式，支持复杂样式 |
| WebVTT | HLS 工作流标准，分片字幕随 Manifest 同步 |
| SRT | 简单外挂格式，部分场景使用 |

- HLS 工作流中，WebVTT 字幕以分片形式随 M3U8 Playlist 交付
- TTML/IMSC 用于严格合规和复杂排版需求
- 字幕语言列表在 Manifest 中描述，需实测确认具体格式

---

## 7. CDN 架构

Disney Plus 采用 **多 CDN 策略**，6+ 家提供商并行：

| CDN 提供商 | 角色 |
|-----------|------|
| **Akamai** | 主要 CDN，核心合作方 |
| Lumen（CenturyLink） | 重要合作方，与 Disney 共同制定 CDN 元数据标准 |
| Limelight（Edgio） | 备用 CDN |
| Edgecast | 备用 CDN |
| Amazon CloudFront | AWS 云基础设施配套，Disney 优先使用 AWS |
| Fastly | 备用 CDN |

- **云基础设施：AWS**（Disney Plus 首选云平台）
- 多 CDN 策略用于全球冗余和负载均衡，具体路由逻辑需网络分析确认

---

## 8. 订阅方案与定价

### 美区（USD，2026 年）

| 方案 | 月费 | 分辨率上限 | 广告 | Dolby Atmos / IMAX |
|------|------|-----------|------|-------------------|
| Basic（With Ads） | $11.99/mo | 720p HD | 有 | **不支持** |
| Premium（Ad-Free） | $18.99/mo | 4K UHD（App） | 无 | **支持** |

**套餐（Bundle）：**
- Disney+ + Hulu（含广告）：$12.99/mo
- Disney+ + Hulu（无广告）：$19.99/mo

**注意：** 无论何种订阅计划，**浏览器用户均被限制在 720p**，4K 必须通过官方 App 访问。

### 其他地区参考

| 地区 | 定价水平 | 备注 |
|------|----------|------|
| 英国 | ~$10.78/mo | GBP 定价 |
| 加拿大 | 独立分级定价 | Standard with Ads / Standard / Premium |
| 澳大利亚 / 新西兰 | 2026 年 3 月起新增含广告套餐 | |
| 阿根廷 | ~$0.14/mo | 全球最低 |
| 土耳其 | ~$4.34/mo | 低收入市场策略定价 |
| 中国大陆 | 不可用 | 官方未开放 |

---

## 9. 地区差异

| 差异项 | 说明 |
|--------|------|
| **Star 品牌变更** | 2025 年 10 月起，国际版 Star 综合娱乐层更名为 **Hulu**；**日本例外**，保留 Star 品牌 |
| 内容库 | 各区授权独立；Disney Originals 全区同步，第三方内容差异显著 |
| ESPN+ 整合 | 仅美区 Bundle；国际市场 ESPN 内容单独处理 |
| 定价 | 全球差异显著，最高与最低相差数十倍 |
| 含广告套餐 | 逐步向更多地区推广（澳大利亚 / 新西兰 2026 年 3 月上线） |

---

## 10. 插件开发关键约束

| 约束 | 说明 |
|------|------|
| **分辨率上限（Chrome/Firefox）** | Widevine L3 限制，**最高 720p**，无法绕过 |
| **分辨率上限（Edge/Safari）** | 理论支持 4K，但需设备认证 + Premium 计划 |
| DRM 解密 | 全部内容加密；密钥由 Disney 许可服务器管理，浏览器 EME/CDM 沙箱内无法提取 |
| 官方下载封锁 | Disney Plus **明确阻止浏览器端下载**；离线下载仅限官方 iOS / Android App，且为 AES 加密容器，只有官方 App 可解密播放 |
| Manifest URL 时效性 | 含签名参数，不可缓存或长期复用 |
| 多音轨 | Manifest 含多个音轨描述，需解析语言标签选择目标音轨 |
| 字幕获取 | WebVTT / TTML 格式，需独立请求并转换为通用格式 |
| 登录依赖 | **必须登录**，无匿名访问；认证 Token 绑定账户和会话 |
| Basic 计划限制 | 含广告计划额外限制：无 Atmos、无 IMAX Enhanced、无下载 |
| Live 内容 | 动态 Manifest，行为与 VOD 不同，需独立验证 |

---

## 11. 参考资料

- Disney Plus Help Center（视频质量/音频/字幕）：`https://help.disneyplus.com/`
- Disney Plus 订阅计划：`https://www.disneyplus.com/`
- Inside Disney+ Streaming Technology（Akamai / ABR）：Streaming Media 技术报告
- Widevine 安全级别：`https://www.widevine.com/`
- MPEG-DASH / CMAF 规范：`https://dashif.org/` / ISO/IEC 23000-19
- 内部验证：实际抓包数据以开发阶段为准，本文档仅记录公开信息与行业通识
