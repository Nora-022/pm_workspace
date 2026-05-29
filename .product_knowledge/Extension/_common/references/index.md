# _common/references 通用规则索引

> 本目录存放跨插件复用的通用规则与设计基线。
> 框架与目录权威定义见 [../FRAMEWORK.md](../FRAMEWORK.md)；阅读路线见 [../READING_MAP.md](../READING_MAP.md)。

---

## 检测模式基线（baselines/）

按 [../READING_MAP.md 检测模式归属表](../READING_MAP.md#检测模式归属表唯一权威) 选一份：

| 文件 | 范围 |
| --- | --- |
| [`baselines/netflix_mode.md`](baselines/netflix_mode.md) | 12 个插件的检测 / 下载 / 调度基线（含 M3U8 / MPD 变体） |
| [`baselines/ytdlp_mode.md`](baselines/ytdlp_mode.md) | Video 插件预分析 / 多 Origin / 并发 5 / Always Free 路径 |

---

## 通用规则文档

| 文件 | 范围 | 不写什么 |
| --- | --- | --- |
| [`user_flows.md`](user_flows.md) | 主流程 + 异常分支 + 状态反馈 + 多语言 | 站点专属流程 |
| [`error_handling.md`](error_handling.md) | 错误大类、UI 表现、可重试性、Login Notice | 站点专属错误码 |
| [`business_rules.md`](business_rules.md) | 商业方案 / 权益口径 / 配额扣减 / 授权 / 订阅状态 | 单插件特殊套餐价格 |
| [`settings_matrix.md`](settings_matrix.md) | Setting 通用 7 项默认顺序与含义 | 单插件特殊配置项 |
| [`tech_limits.md`](tech_limits.md) | 系统 / 浏览器 / CoApp / DRM 边界 / 并发上限 | 单插件分辨率 / 编码 |
| [`platform_diffs.md`](platform_diffs.md) | Win / Mac 差异、三渠道差异、CoApp 链接生成规则 | 站点专属平台限制 |

---

## 视觉与设计

| 文件 | 范围 |
| --- | --- |
| [`visual_guidelines.md`](visual_guidelines.md) | 颜色、字体、圆角、边框、阴影、间距、通用组件状态 |
| [`ux_patterns.md`](ux_patterns.md) | 主框架结构、页面职责、列表展开、Dashboard、通知与阻断逻辑 |
| [`layout_specs.md`](layout_specs.md) | 页面骨架、布局比例、容器尺寸、关键控件尺寸 |

---

## 术语与启动

| 文件 | 范围 |
| --- | --- |
| [`glossary.md`](glossary.md) | 产品线术语表 |
| [`new_plugin_kickoff_checklist.md`](new_plugin_kickoff_checklist.md) | 新插件启动清单 |

---

## 历史调研（非现行规则，仅供参考）

| 文件 | 范围 |
| --- | --- |
| [`vdh_v10_coapp_research_and_streamfab_options.md`](vdh_v10_coapp_research_and_streamfab_options.md) | VDH v10 CoApp 调研与 StreamFab 选项分析 |
| [`vdh_v10_competitor_strategy_research.md`](vdh_v10_competitor_strategy_research.md) | VDH v10 竞品策略调研 |

---

## 写作规则（强约束）

- 通用规则只写在本目录；插件差异只写在插件 `diff_summary.md` + `requirements/`
- 内容能写成"对所有插件都成立的句子" → 通用规则；写"X 插件相比基线不同" → 差异
- 跨文档引用用相对路径 markdown link；不复制粘贴
- 不写"待确认 / 后续优化"等开放性兜底句
