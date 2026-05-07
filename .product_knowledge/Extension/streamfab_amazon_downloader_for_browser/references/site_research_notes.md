# Prime Video 站点技术调研

## 基本信息

- 站点：`https://www.primevideo.com/` / `https://www.amazon.com/video`
- 调研日期：`2026-04-17`
- 调研目的：支持 StreamFab Amazon Downloader 插件开发，了解站点流媒体技术架构、内容类型、DRM 方案、编解码格式、订阅体系等

---

## 1. 内容类型与权益路径

| 内容类型 | 权益路径 | 说明 |
|----------|----------|------|
| Prime 订阅内容 | Prime 会员包含 | 最主要内容来源，含影视剧、亚马逊自制 Originals |
| Rental（租借） | 单次付费 | 30 天内开始观看，48 小时内看完 |
| Buy（购买） | 单次付费 | 永久访问，不受时间限制 |
| Prime Video Channels | 单独订阅频道包 | 如 Paramount+、Showtime，按频道分别订阅 |
| Free with Ads | 无需订阅 | 部分内容附广告免费观看 |
| Live TV / Sports | Prime 或频道订阅 | 直播内容，边界仍需验证 |

权益状态不可简单用一个布尔值表达，同一内容在不同用户账户下呈现不同权益状态。

---

## 2. 流媒体协议

- **主协议：MPEG-DASH（MPD）**
  - 分片格式：fMP4（Fragmented MP4），标准分片时长约 2 秒
  - 自适应码率（ABR）：多 Representation 可选，客户端根据带宽动态切换
  - MPD 文件通过 API 动态生成，含 DRM 初始化信息（pssh）
- **HLS（M3U8）**：仅部分 Safari/iOS 路径使用，非主流交付协议
- **Live 内容**：使用 MPEG-DASH Live Profile，MPD `type="dynamic"`

---

## 3. DRM 方案

Amazon Prime Video 采用 **多 DRM 并行** 策略，依设备/平台选择对应方案：

| DRM 方案 | 适用平台 | 最高安全级别 |
|----------|----------|--------------|
| Widevine | Chrome / Firefox / Android | L3（浏览器），L1（Android 认证设备） |
| PlayReady | Windows / Edge / Xbox | SL3000（支持 4K HDR） |
| FairPlay | Safari / macOS / iOS / tvOS | 最高级别（HLS+FPS） |

**浏览器场景关键限制：**
- Widevine L3 是浏览器可获得的最高级别
- L3 意味着内容密钥在软件层解密，无硬件 TEE 保护
- 实际最高输出分辨率受 L3 限制，通常为 **1080p**（4K 需 L1/SL3000）

内容封装格式：**CMAF**（Common Media Application Format），兼容 Widevine 和 PlayReady 双 DRM 初始化数据。

---

## 4. 视频规格

| 规格项 | 浏览器（Chrome/Firefox） | 专用 App（Fire TV / Windows App） |
|--------|--------------------------|-----------------------------------|
| 最高分辨率 | **1080p** | **4K UHD（2160p）** |
| HDR | 不支持 | HDR10 / HDR10+ / Dolby Vision |
| 主要编解码器 | H.264（AVC） | H.264 / H.265（HEVC）/ AV1 |
| 帧率 | 最高 60fps | 最高 60fps |

**编解码说明：**
- H.264 是覆盖最广的基线编码，浏览器必然支持
- H.265 和 AV1 主要在专用客户端和高端设备上使用，4K HDR 内容通常以 HEVC 编码
- 浏览器不支持 AV1 硬解时，Amazon 会降级提供 H.264 流

---

## 5. 音频规格

| 音轨格式 | 声道数 | 适用范围 |
|----------|--------|----------|
| AAC 2.0 | 立体声 | 所有平台基线 |
| AC-3（Dolby Digital） | 5.1 | 大多数内容 |
| EAC-3（Dolby Digital Plus） | 5.1 / 7.1 | 支持 DD+ 的平台 |
| EAC-3 JOC（Dolby Atmos） | 7.1.4（空间音频） | 仅专用 App + 兼容硬件 |

**浏览器限制：**
- 浏览器通常最高支持 EAC-3 5.1，Dolby Atmos 不在浏览器中提供
- 多音轨（audio descriptions / 配音语言）在 MPD 中以独立 AdaptationSet 提供

---

## 6. 字幕格式

| 格式 | 说明 |
|------|------|
| SRT | 常见外挂字幕格式 |
| TTML（Timed Text Markup Language） | Amazon 主要内部字幕格式 |
| IMSC1 | W3C 标准，基于 TTML |
| Lambda Cap | 仅日本区使用的闭合字幕格式 |

- 美国区内容强制要求提供英语 CC（Closed Captions）
- 多语言字幕在 MPD 中以独立 AdaptationSet 提供，`lang` 属性标注语言代码
- Amazon Originals 通常提供比第三方内容更完整的多语言字幕集

---

## 7. CDN 架构

- **主 CDN：Akamai**
  - 全球覆盖，Amazon 深度合作方
  - 视频分片通过 Akamai 边缘节点交付
- **备用 CDN：Amazon CloudFront**
  - AWS 自有 CDN，在部分地区作为主力或备用
- CDN URL 通常含时效性签名参数（Token），请求 URL 不可长期复用

---

## 8. 订阅方案与定价

### 美区（USD）

| 方案 | 月费 | 说明 |
|------|------|------|
| Prime Video（单独） | $8.99/mo | 仅 Prime Video，含广告 |
| Prime Video（无广告附加） | +$2.99/mo | 在单独订阅基础上去广告 |
| Amazon Prime（完整） | $14.99/mo 或 $139/yr | 包含 Prime Video + 物流等全部权益 |
| Prime Video Channels | $4.99–$14.99/mo | 按频道单独订阅，如 Paramount+ $9.99/mo |

### 其他地区参考

| 地区 | 货币 | 备注 |
|------|------|------|
| 英国 | GBP | 独立定价，低于美区 |
| 日本 | JPY | 日本市场有专属内容与字幕格式 |
| 中国大陆 | 不可用 | 官方未开放 |

---

## 9. 地区差异

| 差异项 | 说明 |
|--------|------|
| 内容库 | 各区独立，IP 区分；US、UK、JP 内容差异显著 |
| 分辨率上限 | 部分地区因版权协议限制，最高只提供 1080p |
| 字幕语言 | 各区不同，日本区有专属字幕格式 |
| 定价货币 | 各区独立定价，不共用账户 |
| 自制内容 | Amazon Originals 全区同步；第三方授权内容各区独立 |
| 频道包（Channels） | 并非所有地区均有，以美区最完整 |

---

## 10. 插件开发关键约束

| 约束 | 说明 |
|------|------|
| 分辨率上限 | 浏览器 Widevine L3 限制，最高 **1080p** |
| DRM 解密 | 需通过 Widevine CDM；密钥获取依赖合法授权会话 |
| MPD URL | 动态生成，含时效签名，不可缓存复用 |
| 多音轨 | MPD 含多个 AdaptationSet，需解析 `lang` 属性选择 |
| 字幕获取 | TTML/IMSC 格式，需独立下载并转换为 SRT 等通用格式 |
| 登录依赖 | 必须登录 Amazon 账户；Prime 订阅状态由账户决定 |
| 租借/购买内容 | 与 Prime 内容共享相同技术栈，权益验证逻辑在 API 层 |
| Live 内容 | DASH Live Profile，边界行为与 VOD 不同，需独立验证 |

---

## 11. 参考资料

- Amazon Prime Video Help Center: `https://www.amazon.com/gp/video/help`
- Widevine DRM: `https://www.widevine.com/`
- MPEG-DASH 规范: `https://dashif.org/`
- CMAF 规范: ISO/IEC 23000-19
- 内部验证：实际抓包数据以开发阶段为准，本文档仅记录公开信息与行业通识
