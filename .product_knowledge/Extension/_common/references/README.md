# 通用规则文档（_common/references）

本目录存放跨插件复用的通用规则与共享参考资料。
框架与目录权威定义见 [`../FRAMEWORK.md`](../FRAMEWORK.md)，阅读路线见 [`../READING_MAP.md`](../READING_MAP.md)。

## 文件清单

| 文件 | 内容 |
| --- | --- |
| `visual_guidelines.md` | 视觉规范：颜色、字体、圆角、通用组件、dashboard / modal / CoApp 等视觉基线 |
| `ux_patterns.md` | UX 规范：主框架结构、页面职责、列表展开、Dashboard、通知与阻断逻辑 |
| `layout_specs.md` | 结构尺寸参考：页面骨架、布局比例、容器尺寸、关键控件尺寸 |
| `glossary.md` | 产品线术语表 |
| `new_plugin_kickoff_checklist.md` | 新插件启动检查清单 |
| `baselines/netflix_mode.md` | netflix_mode 检测 / 下载流程基线（含 M3U8 / MPD 变体小节） |
| `baselines/ytdlp_mode.md` | ytdlp_mode 预分析 / 多 Origin / 检测下载并行基线 |
| `vdh_v10_coapp_research_and_streamfab_options.md` | VDH v10 CoApp 调研与 StreamFab 选项分析 |
| `vdh_v10_competitor_strategy_research.md` | VDH v10 竞品策略调研 |

## 适合放入

- 跨插件共用的视觉 / UX / 布局规范
- 检测模式基线（baselines/）
- 共享术语表、新插件启动清单
- 跨插件通用调研、行业背景

## 不应放入

- 顶层导航与产品线进度（属于 `../README.md` / `../index.md` / `../FRAMEWORK.md`）
- 与 `../FRAMEWORK.md`、`../plugin_rules.md`、`../READING_MAP.md` 重复的内容
- 单插件差异（属于各插件 `diff_summary.md` 与 `requirements/`）
