# TVer — 差异总览

> 本插件与基线（`_common/`）的所有差异点。AI 检索用入口。
> 检测模式：**netflix_mode**
> 关联：[`_common/READING_MAP.md`](../_common/READING_MAP.md)、[`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)

---

## 当前已确认差异

| 维度 | 差异内容（一句话） | 详见 |
| --- | --- | --- |
| 站点 | 单站点 `https://tver.jp/` | requirements/site_research_notes.md |
| 地区 | 日本（日本免费追剧平台，AVOD 模式） | requirements/site_research_notes.md |
| 内容类型 | 日本电视台联合点播，含日剧 / 综艺 / 纪录片 / 动画 | requirements/site_research_notes.md |
| 跳转链接 slug | `tver-downloader` | requirements/plugin_requirement.md § 跳转链接 |

## 待客户端方案拆解定稿后回填

价格 / 权益 / 视频编码 / 音频 / 输出格式 / Playlist 结构 / 商店素材等字段在客户端方案定稿后填入 `requirements/plugin_requirement.md`，不在本文件预占。

---

## 关键事实

- 站点：`tver.jp`
- 地区：日本
- 内容形态：AVOD（广告支持的免费视频点播），各电视台联合内容
- 上线状态：**待研发**
- 调研材料：`requirements/devtools_fetch_dump.js`（DevTools 抓包脚本）

---

> 除上述差异外，其余逻辑和 UI 全部遵循基线。参见：
> - [`_common/FRAMEWORK.md`](../_common/FRAMEWORK.md)
> - [`_common/READING_MAP.md`](../_common/READING_MAP.md)
> - [`_common/references/baselines/netflix_mode.md`](../_common/references/baselines/netflix_mode.md)
