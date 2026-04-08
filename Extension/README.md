# StreamFab 浏览器扩展产品知识库

## 1. 知识库简介
本目录是 StreamFab 浏览器扩展产品线的统一知识库入口，用于沉淀各插件的产品定义、阶段状态、业务规则、技术边界和原始资料入口，便于产品、运营、设计、研发、测试及其他内部人员统一查阅。

## 2. 产品线概览
| 项目 | 说明 |
|---|---|
| 产品线名称 | `StreamFab 浏览器扩展` |
| 产品线内容 | 面向不同流媒体站点的浏览器插件产品集合 |
| 插件类型 | 多站点插件 + 单站点垂直插件 |
| 当前插件数 | `9` |
| 当前阶段 | 已上线：Video、Amazon、Netflix、Disney Plus；产品准备中：Hulu、TVer、FANZA、U-NEXT、OnlyFans |
| 主索引 | [`index.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/index.md) |

## 3. 工程目录结构
```text
.product_knowledge/Extension/
├─ README.md
├─ index.md
├─ common_plugin_rules.md
├─ common_templates/
├─ shared_references/
├─ skills/
├─ streamfab_video_downloader_for_browser/
├─ streamfab_amazon_downloader_for_browser/
├─ streamfab_netflix_downloader_for_browser/
├─ streamfab_disney_plus_downloader_for_browser/
├─ streamfab_hulu_downloader_for_browser/
├─ streamfab_tver_downloader_for_browser/
├─ streamfab_fanza_downloader_for_browser/
├─ streamfab_u_next_downloader_for_browser/
└─ streamfab_onlyfans_downloader_for_browser/
```

## 4. 根目录内容说明
| 文件 / 目录 | 作用 |
|---|---|
| [`README.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/README.md) | 当前入口说明文档 |
| [`index.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/index.md) | 产品线主索引，集中记录插件清单、阶段进度、问题定位和阅读顺序 |
| [`common_plugin_rules.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/common_plugin_rules.md) | 跨插件共性规则 |
| [`common_templates/`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/common_templates) | 共享模板 |
| [`shared_references/`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/shared_references) | 共享术语、共享清单等参考资料 |
| [`skills/`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/skills) | 新插件初始化相关技能文件 |
| `streamfab_<service>_downloader_for_browser/` | 各插件独立知识库目录 |

## 5. 单插件目录通常包含什么
| 内容 | 作用 |
|---|---|
| `00_planning_context.md` | 插件背景、边界、与其他插件的关键差异 |
| `00_decision_log.md` | 已定决策记录 |
| `01_product_brief.md` - `07_technical_constraints.md` | 插件正式结论层 |
| `context/` | 快速摘要层 |
| `patterns/` | 方法与模式层 |
| `constraints/` | 硬限制与差异补充层 |
| `references/` | 插件私有参考资料 |
| `requirements/` | 原始资料与中间整理稿归档层 |

## 6. 推荐阅读路径
### 想快速了解整条产品线
1. [`README.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/README.md)
2. [`index.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/index.md)
3. [`common_plugin_rules.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/common_plugin_rules.md)

### 想了解某一个具体插件
1. `00_planning_context.md`
2. `00_decision_log.md`
3. `01_product_brief.md`
4. `06_business_rules.md`
5. `07_technical_constraints.md`

### 运营或其他非产品角色优先阅读
1. 根目录 [`index.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/index.md)
2. 对应插件的 `01_product_brief.md`
3. 对应插件的 `06_business_rules.md`
4. 对应插件的 `07_technical_constraints.md`

## 7. 资料放置规则
| 类型 | 放置位置 |
|---|---|
| 插件正式知识结论 | 插件目录主文件，例如 `01-07` |
| 插件专属背景资料 | 插件自己的 `references/` |
| 插件原始历史资料 | 插件自己的 `requirements/raw/` |
| 从原始资料提炼出的整理稿 | 插件自己的 `requirements/derived/` |
| 共享模板 | `common_templates/` |
| 共享术语和共享清单 | `shared_references/` |
| 跨插件共性规则 | [`common_plugin_rules.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/common_plugin_rules.md) |

## 8. 使用边界
- 根目录只保留入口、索引和共性规则，不重复承载插件正文。
- 插件结论写到插件目录，不写回共享层。
- 原始资料和正式结论分开存放。
- 内容优先中文，便于内部不同角色统一阅读。

## 9. 当前工程更新记录
| 日期 | 更新内容 |
|---|---|
| 2026-04-08 | 收敛根目录索引结构，删除冗余索引文件，仅保留 `README.md`、`index.md`、`common_plugin_rules.md` |
| 2026-04-08 | 将原先分散的插件清单、阶段进度、问题定位和阅读顺序合并进 [`index.md`](C:/Users/fab/yuki-studio-repo/pm-workspace/.product_knowledge/Extension/index.md) |
| 2026-04-08 | 清理与根索引重复的共享参考文件，保留共享术语表和新插件启动检查清单 |
| 2026-04-08 | 将根目录与共享参考层说明统一改为中文 |
| 2026-04-08 | 重写当前 README，使其更适合作为产品、运营及其他内部人员的知识库入口 |
