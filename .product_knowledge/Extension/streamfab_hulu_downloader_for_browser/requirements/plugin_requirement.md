# [StreamFab 浏览器插件] - [HULU] - 需求文档

## 全局变量
| 变量 | 当前值 |
|---|---|
| {SiteName} | HULU |
| {BannerContentZH} | Hulu 视频，一键下载，轻松离线观看。 |
| {BannerContentEN} | Hulu in Up to 4K. One Click. |

- 原型链接：
- 需求地址：
- 初始化说明：本文件基于 `common_templates/plugin_requirement_template.md` 创建，并按 `streamfab-plugin-init` repair 流程回填。

## 文档更新记录
| 版本 | 日期 | 修改人 | 修改说明 |
|---|---|---|---|
| v0.1 | 2026-03-27 | Codex | 依据 Hulu 产品页与目标站点调研结果修复初始化文档 |

## 1. 当前确认信息

### 1.1 产品信息
- 插件产品名：`StreamFab Hulu Downloader for Browser`
- CoApp 安装程序名：`StreamFab Hulu Coapp`
- `app_id`：`streamfab_for_browser`

### 1.2 客户端产品页提炼
- 最高分辨率：`1080p/4K`
- 音频信息：`EAC3 5.1 audio track`
- 输出格式线索：`MP4`
- 价格线索：
  - `USD 59.99`
  - `USD 109.99`
- 权益线索：
  - `30 days` trial
  - `3` free Hulu videos during trial
  - `100` Hulu videos per day

### 1.3 Hulu 当前已确认差异
- Hulu 内容树不只有一种结构。
- 已观察到纯 `season -> episode` 结构。
- 已观察到 `subtitle version / dubbed version` 的版本分叉结构。
- 当前下载配置区只暴露视频清晰度相关项。
- 当前未观察到独立音频配置项和字幕配置项。

## 2. 目标站点调研要点
- `hulu.com`
  - 强调订阅、Bundle、Live TV、Location data requirement
  - 面向美国站点，用户与地区限制明显
- `hulu.jp`
  - 本地化日文站点
  - 出现月费、两周免费、Hulu Store、字幕/吹替等线索

## 3. 待补充模块
- 登录&授权
- 用户权益映射到客户端的实际规则
- 视频分析字段
- 下载配置项完整矩阵
- 视频检测与下载状态规则
- Dashboard 链接与产品页映射
- Setting 差异化项
