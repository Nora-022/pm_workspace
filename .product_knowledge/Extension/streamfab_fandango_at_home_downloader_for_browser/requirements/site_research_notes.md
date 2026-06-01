# 站点调研记录 — Fandango at Home

## 文件定位

本文档沉淀 `athome.fandango.com`（前 Vudu）的站点客观事实，作为插件知识库站点调研层。所有信息来自公开资料和官方公告，需实测验证的内容会显式标注。

## 信息来源

- 官方支持站：`https://athomesupport.fandango.com/`
- 平台主域：`https://athome.fandango.com/`
- 原品牌支持页归档：`https://support.vudu.com/`
- 公开报道与公告：Variety、HD Report、Comcast SEC 10-K
- 抽取日期：2026-05-19

---

## 1. 平台定位

- 平台原名 **Vudu**，2004 年作为美国数字电影硬件 + 在线服务起家，2010 年硬件业务收缩转向纯软件分发，同年被沃尔玛（Walmart）收购。
- 2020 年 7 月 Fandango Media 从沃尔玛购入 Vudu。Fandango Media 是 NBCUniversal（Comcast 旗下）与 Warner Bros. Discovery 的合资公司，主营电影票务和娱乐内容业务。Comcast 在 SEC 10-K 中将其归入 `NBCUniversal Fandango Holdings, LLC`。
- 2024 年 2 月 16 日 Fandango 官宣，**2024 年 3 月 12 日** 起 Vudu 正式更名为 **Fandango at Home**；除品牌、Logo、配色外服务不变，原 Vudu 资料库一并迁入 Fandango at Home Library。
- 平台核心定位是 **transactional VOD（TVOD，按内容付费的租 / 买）+ AVOD（含广告的免费观看）混合形态**，定位为 "premium entertainment store"，是 NBCUniversal 在 Tubi、Xumo 之外的高价值内容分发入口。

## 2. 主要服务地区

- **仅美国可用**。Fandango at Home 官方支持页明确：服务和已购内容只在美国境内可用，包含线上播放、下载、离线观看全部场景。
- 平台通过 **geo-location** 检测 IP / 网络位置；非 US IP 访问会触发以下两类拒绝：
  - 站点级：`Sorry, Fandango is not available outside the United States`
  - 内容级：`Oops! This movie won't play on your display due to copyright restrictions`
- **界面语言：英文为主**。无多语言界面切换。
- 没有官方 EU / UK / CA / MX / JP 等独立站点；与全球版 Fandango（电影票务）品牌共享，但视频服务严格 US-only。
- 对插件需求的直接影响：
  - 用户必须在 US 网络环境下登录、检测和分析视频，非 US IP 通常拿不到 manifest 或 license challenge；产品页"region-agnostic（不限地区下载用户有权限观看的任意区域内容）"的表述仅指用户账户视野内的内容，不指可在非美区直接拉取。
  - 错误处理上需要将"未登录"与"地理限制"区分开：登录成功但播放被拒，通常归到地理限制 / 版权限制状态。

## 3. 内容类型与权益形态

- 内容类型：
  - **Movies**：主体内容，电影租赁（Rent）和购买（Buy）为主。
  - **TV Shows**：以剧集 Season / Episode 两级结构组织，可单集 / 整季购买。
  - **Free with Ads**：含广告免费观看的电影 / 剧集，部分内容也提供该层级。
- 资料库规模：官方对外口径为 **200,000+ titles**（含 rent / buy / free-with-ads）。
- 商业模式分层：
  - **TVOD**（主力）：单片 Rent / Buy，价格按片 / 按清晰度区分（SDx2K / HDX 4K UHD），租期一般 30 天激活、48 小时观看窗口。
  - **AVOD**：免费内容含广告，无需购买，需登录。
  - 无标准的 SVOD（订阅看全库）。
- 清晰度分层：站点商品页明确分 SD、HD、UHD / 4K；4K 内容通常带 HDR10 / Dolby Vision 标识。
- 对插件需求的直接影响：
  - Meta 分析下载配置项必须区分 Movie / TV 两种结构（与客户端方案拆解一致），TV 走 Season > Episode 两级。
  - 下载边界限定为账户已有权限的内容（已 Rent / Buy / Free-with-Ads），不下载非该账户可访问内容。

## 4. 账号与访问限制

- **账号体系**：使用 Fandango 账号（与电影票务 Fandango 共用一套 ID）。2024 年改名后官方支持账户间 link（Fandango ↔ Fandango at Home），但是同一邮箱即可登录。
- **登录方式**：邮箱 + 密码，部分页面支持 Apple ID / Google 单点登录。
- **年龄验证**：成人内容（NC-17 / Unrated）按账户设置弹窗确认。
- **支付门槛**：TVOD 购买需绑定支付方式；AVOD 免费内容仅需登录，不强制支付方式。
- **离线观看权限**：Fandango at Home 自家移动 App 支持 valid access period 内的离线缓存（这是产品页 `valid access period` 表述的来源）。租赁内容必须在 30 天激活 + 48 小时观看窗口内访问；购买内容只要账户有效即可。
- **设备限制**：单账户支持多设备登录；具体并发 / 授权设备数官方未公开统一上限。
- 对插件需求的直接影响：
  - 用户权益模块复用 Netflix 基线即可，但需区分 Rent（带过期）和 Buy（永久）两种权益态。
  - "valid access period" 必须在 Banner、Notes / Constraints、错误文案中保留，避免被改写成无限期下载的误导描述。

## 5. 播放协议与加密线索

- **主协议**：**MPEG-DASH**，PC 浏览器走 `.mpd` manifest，CMAF / fMP4 分片。
- **加密**：CENC（Common Encryption），多 DRM 并存：
  - **Widevine**（UUID `edef8ba9-79d6-4ace-a3c8-27dcd51d21ed`）—— 用于 Chrome / Chromium / Android / Chromecast。
  - **PlayReady**（UUID `9a04f079-9840-4286-ab92-e65be0885f95`）—— 用于 Edge / Windows 应用 / Roku / Xbox。
  - FairPlay 用于 Safari / iOS / tvOS（HLS 路径，浏览器插件场景一般不命中）。
- **DRM Robustness 分层**：
  - SD / HD 通常 Widevine L3 / PlayReady SL2000（软件级）即可放行。
  - **4K UHD / HDR / Dolby Vision 需要 Widevine L1 / PlayReady SL3000（硬件级）**。Microsoft Edge for Windows 10+ 走 SL3000，旧系统降级到 SL2000，对应只能拿到 HD。
- **字幕**：DASH 内嵌或 sidecar，常见 WebVTT / TTML。
- **音频**：常见 EAC3 5.1（Dolby Digital Plus）和 AAC 2.0；4K 内容可能伴随 Dolby Atmos 元数据。
- 对插件需求的直接影响：
  - 插件按 DASH / MPD 解析路径设计，Setting 配置项中 Video Codec（H264 / H265 - SDR / HDR10 / Dolby Vision）和 Audio Codec（EAC3 / AAC）与平台实际编码集合一致。
  - 4K HDR / DV 在内置浏览器环境下不一定能拿到硬件级 DRM 凭证（Chromium-based 内嵌浏览器多为 L3），实际可下载最高清晰度需以 CoApp 分析结果为准；不在需求中把 "up to 4K" 写成在任何环境下都成立的承诺。
  - playlist 仅返回第一集 meta 的现象（客户端拆解中已记录）与 DASH 在不同分辨率轨道上的可用性差异一致，TV 类需保留 `if available` 表述。

## 6. 对插件需求的直接影响（汇总）

| 影响维度 | 站点事实 | 需求处理 |
|---|---|---|
| 入口识别 | 域名为 `athome.fandango.com`；旧 `vudu.com` 仍可重定向到新站 | 检测域名以新域为主，旧域作为兼容 |
| 视频检测 | 详情页 URL 形如 `/content/browse/details/<slug>/<id>` | 检测器按该 URL 模式触发 Meta 分析 |
| Meta 分析 | Movie / TV 两类，TV 用 Season > Episode | 与客户端方案拆解一致；playlist 仅返回第一集 meta，分辨率用 `if available` 标注 |
| 清晰度 / 编码 | 最高 4K + HDR10 / Dolby Vision；编码 H264 / H265 | Setting 追加 Video Codec、Audio Codec；实际可下载最高清晰度以 CoApp 分析结果为准 |
| 音轨 | EAC3 5.1 / AAC 2.0；多语言 | Setting 沿用 common 中 Audio Channel；Meta 分析中 Audio Codec 联动 Language |
| 字幕 | WebVTT / TTML；多语言；CC | Subtitle 选项含 `None` / `{语言} CC` |
| 失败原因 | 未登录、地理限制、版权拒绝、租期过期、硬件 DRM 不足 | 错误归类区分这 5 类，不与"分析失败"合并 |
| 下载边界 | 仅账户已 Rent / Buy / Free-with-Ads 内容 | Notes / Constraints 中保留 `eligible`、`valid access period`、`personal offline viewing` |
| 合规风险 | TVOD 服务 + DRM 严格 | 文案统一为"个人合法观看 / 离线观看"，不写绕过 DRM |

## 7. 需实测确认的内容

以下内容站点未公开统一口径，归到实测环节，本调研不作结论：

- 同账号并发设备数与设备授权 / 解绑规则
- AVOD 免费内容是否全部命中下载边界
- 4K HDR / DV 在内置浏览器环境下的实际命中率
- Free with Ads 内容广告插入位置和"Remove Ads"能力的精确适用范围

## 8. 更新记录

- 2026-05-19：初版建立，含平台定位、地区、内容形态、账号、协议、DRM 与对插件需求的影响汇总
