# 知识库工作规范

## 开始任务前
接到知识库相关任务时，先读取 `MAINTENANCE.md`（本目录根）了解当前工作流、文件分工和模块状态，再开始操作。

## 文件类型分工
| 内容类型 | 存放位置 |
|---|---|
| 已确认的产品规则 | 对应产品的 `01–07` 核心文件 |
| 未确认信息 | `references/open_questions.md`，确认后再迁入核心文件 |
| 站点技术调研 | `references/site_research_notes.md` |
| 需求池 | `requirements/backlog.md`（快照，飞书多维表格为权威） |

## 核心约束
- `01–07` 核心文件只写已确认信息，不写推测或待验证内容
- 需求状态、站点支持列表以飞书为准，本地文件是快照
- 站点调研基于公开资料，需实测验证的内容须标注"需实测确认"
- 跨插件通用规则沉淀到 `shared_references/`，不在各插件中重复维护

## 自动化说明
每天 21:00 脚本自动将两个知识库分别推送至各自的 GitLab 仓库：

| 知识库 | GitLab 仓库 |
|---|---|
| RecordFab | `http://10.10.2.124/product-knowledge/recordfab.git` |
| Extension | `http://10.10.2.124/product-knowledge/streamfab-extensions.git` |

脚本：`C:\Users\fab\yuki-studio-repo\gitlab_daily_push.ps1`
注意：脚本必须保存为 UTF-8 BOM，否则 PowerShell 5.1 解析中文失败。
