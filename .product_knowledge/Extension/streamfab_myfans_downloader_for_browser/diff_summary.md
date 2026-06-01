# myfans — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 检测模式：**netflix_mode**
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)
> 同类参考：[OnlyFans diff_summary](../streamfab_onlyfans_downloader_for_browser/diff_summary.md)（共享创作者订阅模型）

---

## 与 OnlyFans 共性（同属创作者订阅模型）

myfans 与 OnlyFans 共享下列模型特征，详细规格沿用 OnlyFans 实现：

- 按 creator 维度订阅，无平台统一会员
- UGC 单视频，无 Season / Episode 剧集结构
- 下载卡片极简（仅 Video 项，meta 驱动）
- 支持定时 / 自动下载新内容
- 内容类型可能包含 DRM（取决于 creator 设置）

---

## myfans 独有差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 价格与权益 | 页面价 $54.99；Trial 3 次 / Premium 每日 100 + **每周 700**（按单服务计算） | requirements/plugin_requirement.md § 价格与权益 |
| 视频画质 | 1080P 上限 / 360P 下限（取决于源内容 + 账号权限 + MyFans plan） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 音频 | AAC 2.0（无 EAC3 / Atmos） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 输出格式 | MP4 / MKV | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 区域 | **region-agnostic**：支持下载用户有权限观看的任意区域内容；地区市场以日本为主 | requirements/product_page_facts.md |
| 平台支持 | 仅 Windows（macOS 计划中未发布） | requirements/plugin_requirement.md § 平台支持 |
| Turbo Speed | **10X Turbo Speed**（产品页明确口径） | requirements/plugin_requirement.md § 视频下载 - 配置参数 |
| 特殊能力 | 自动下载新视频 / 内置浏览器探索 / metadata 保存 / 去广告导出 | requirements/plugin_requirement.md § 网站信息 |
| 个人内容入口 | 支持下载个人中心 `Saved` / `Purchased`（站点专属） | requirements/product_page_facts.md |
| 跳转链接 slug | `myfans` | requirements/plugin_requirement.md § 跳转链接 |
| Banner EN | Title `Creator Videos, Downloaded Simply.` / Subtitle `Enjoy MyFans offline in up to 1080p with clean AAC audio.` | requirements/plugin_requirement.md § Dashboard - Banner 文案 |

## UI 差异

| 维度 | 差异内容 | 详见 |
| --- | --- | --- |
| 下载卡片配置区 | 极简（仅 Video 项），同 OnlyFans 模式 | requirements/plugin_ui_requirement.md |
| Detected 入口 | 包含 `Saved` / `Purchased` 个人中心识别 | requirements/plugin_ui_requirement.md |
| macOS 入口 | 当前不可用，与 FANZA 相同处理 | requirements/plugin_ui_requirement.md |

---

## 关键事实

- 站点：`myfans.jp`（日本创作者订阅平台）
- 内容类型：UGC，按 creator 订阅
- 视频画质：up to 1080P
- 音频：AAC 2.0
- 输出：MP4 / MKV
- 上线状态：**集成中**

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线 + 参考 OnlyFans。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)
