# [StreamFab 浏览器插件] - [Amazon] - 需求归档

## 全局变量
| 变量 | 当前值 |
|---|---|
| `SiteName` | `Amazon` |
| `BannerContentZH` | `Amazon 视频一键下载，轻松离线观看。` |
| `BannerContentEN` | `Amazon Videos in Up to 1080p. One Click.` |

- 原型链接：
- 需求来源：
- 初始化说明：本文档基于 `_common/templates/plugin_requirement_template.md` 创建，并在 `streamfab-plugin-init` create mode 中完成首轮回填。

## 文档更新记录
| 版本 | 日期 | 修改人 | 说明 |
|---|---|---|---|
| v0.1 | 2026-04-07 | Codex | 基于 Amazon 产品页和 Prime Video 公开站点调研初始化 |
| v0.2 | 2026-04-15 | Codex | 清理草稿口径，整理为知识库归档版本 |

## 1. 当前已确认信息

### 1.1 产品身份
- 插件产品名：`StreamFab Amazon Downloader for Browser`
- CoApp 安装程序名：`StreamFab Amazon Coapp`
- `app_id`：`streamfab_for_browser`

### 1.2 产品页提取
- 最高分辨率：`1080p`
- 音频信息：`EAC3 5.1 / AAC 2.0`
- 商业方案：`30-Day Free Trial（免费；每服务 3 个视频） / 1 Month License $54.99 / 1-Year License $79.99 / Lifetime License $99.99`
- 输出线索：`MP4 / MKV`
- 编码线索：`H.264 / H.265`
- 字幕线索：`remux` / `SRT export`
- 流程线索：支持定时下载新剧集
- Metadata 线索：支持保存 title、cast、season、cover 等信息
- 范围线索：产品页提到 rentals 和 purchased movies

### 1.3 Prime Video 当前站点线索
- 公开首页可见 `Movies`、`TV shows`、`Sports`、`Live TV`、`Channels`
- 登录入口和 Prime join 较明显
- 站内存在 rental 与 channel subscription 路径
- 公开详情页可见 `Audio languages`、`Subtitles`、`Watch with Prime`、`Join Prime`、`Rent`、`Buy`、`More purchase options`
- 公开剧集页可见分季与分集结构

## 2. 需求归档结论
- Prime Video 应按一个目标站点理解，但站内需要区分多种内容与权益类型。
- 当前插件知识库围绕电影、剧集、Prime 权益、rent / buy、channel、sports / live 等站内结构组织。
- Amazon 插件沿用浏览器插件公共框架：
  - Popup / Sidebar
  - `Detected / Downloads`

## 3. 全局变更摘要

| 模块 | 变更点 |
|---|---|
| 产品名 | StreamFab Amazon Downloader for Browser |
| 安装器 | UI 替换、产品名替换、logo 替换 |
| 流媒体服务名 | Amazon / Prime Video |
| 跳转链接 | 产品页、What's New、订阅 / 升级链接 |
| 业务规则 | 区分 Prime / rental / channel 等不同权益 |

## 4. 模块级归档
| 一级模块 | 二级模块 | 归档说明 |
|---|---|---|
| 登录与授权 | / | 区分未登录、无 Prime、rental-only、channel-gated 等状态 |
| 用户权益 | / | 权益不能按一个统一状态处理 |
| 视频分析 | / | 标题类型、CTA、字幕 / 音频元数据、权益类型都属于分析范围 |
| 下载配置 | 视频树 | 按 movie 与 episodic 两类结构归档，站内其它内容类型单独记录 |
| 视频检测 | / | 以详情页、播放页、标题卡片等页面结构归档 |
| 视频下载 | / | 失败态需要体现权益、地区、内容类型等原因 |
| Dashboard | / | 替换 banner 文案和产品名 |
| Setting | / | 产品页已体现 codec、字幕、音频语言能力 |

## 5. 跳转链接归档

| 按钮 | 链接 |
|---|---|
| What's New - 主站 | `https://streamfab.dvdfab.cn/streamfab-for-browser-new.htm?pid=amazon-downloader` |
| What's New - 独立站 | `https://streamfab.com/streamfab-for-browser-new.htm?pid=amazon-downloader` |
| 付费 / upgrade - 主站 | `open pid 归入渠道配置` |
| 付费 / upgrade - 独立站 | `open pid 归入渠道配置` |

## 6. 上报
| 上报方 | 索引 | Elk Space | 事件类型 |
|---|---|---|---|
| Plugin | 渠道接入 | 渠道接入 | detect, task_create, task_fail, entitlement_block |
| CoApp | 渠道接入 | 渠道接入 | task_start, task_finish, task_fail |
