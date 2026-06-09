# 02 功能架构（Functional Architecture）

## 架构总览

产品线采用 **浏览器扩展 + CoApp 本地服务** 两层架构：

| 层级 | 职责 |
| --- | --- |
| Browser Extension | 页面识别、内容注入、Popup / Dashboard、配置采集、任务触发、状态展示 |
| CoApp Native Host | 视频分析、下载、转封装、DRM 站点支持范围内的处理、文件系统能力 |
| Account / License 服务 | 登录态、订阅状态、配额、设备授权 |

## 两类检测模式

| 模式 | 核心特征 | 适用 |
| --- | --- | --- |
| `netflix_mode` | 无 ytdlp 式预分析、单 Origin、URL 变化后后台询问 CoApp 并刷新结果、下载与分析可并行 | Netflix 类 VIP 服务插件；M3U8 / MPD 为变体 |
| `ytdlp_mode` | 预分析、多 Origin 探测、检测与下载可并行 | Video 通用下载器 |

检测模式归属表见 [READING_MAP.md](READING_MAP.md#检测模式归属表唯一权威)。

## 核心模块

| 模块 | 输入 | 处理 | 输出 | 异常 |
| --- | --- | --- | --- | --- |
| 站点识别 | 当前 tab URL、页面状态 | 判断目标站点 / 非目标站点 / 受限页面 | 前置引导或进入检测 | 非目标站点、受限页面 |
| 视频检测 | 页面上下文、播放状态、Origin 信息 | 按 `netflix_mode` 或 `ytdlp_mode` 分析；非 `ytdlp_mode` 下 URL 变化后后台刷新，不强制进入可见 loading | Detected 视频列表 | 未登录、未播放、未检测到视频、分析失败 |
| 下载配置 | 视频分析结果、用户设置 | 展示资源绑定配置项 | 下载任务参数 | 字段缺失时隐藏可变 tag，不显示占位 |
| 权益校验 | 账号、订阅、配额、设备授权 | 阻断式校验 + 配额预占 | 允许创建任务或阻断弹窗 | Trial 耗尽、订阅过期、设备上限 |
| 下载队列 | 任务参数、CoApp 状态 | Pending / Downloading / Completed 状态机 | Downloads 列表和通知 | CoApp 不可用、网络失败、磁盘或授权失败 |
| Dashboard | 用户、订阅、全局设置 | License Info + Setting | 全局状态和持久化配置 | 保存失败、订阅状态异常 |

## 模式基线

- [10_detection_modes.md](10_detection_modes.md)：netflix_mode / ytdlp_mode 检测、下载、登录中断、配额扣减、M3U8 / MPD 变体、Always Free 和渠道差异。

## 插件差异落位

通用架构不写单插件特例。插件差异写入：

- `streamfab_<service>_downloader_for_browser/plugin_differences.md`
- `streamfab_<service>_downloader_for_browser/requirements/plugin_requirement.md`
