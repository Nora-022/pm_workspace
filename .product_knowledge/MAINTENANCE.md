# 产品知识库维护手册

本文档是知识库的元层级参考，记录整体架构、维护工作流、可用工具与各模块的优化历史。
适合在开启新会话前、处理陌生任务时、或想起"这个我改过没"时查阅。

---

## 1. 知识库全景

### 覆盖范围

| 知识库 | 路径 | GitLab 仓库 |
|---|---|---|
| RecordFab | `.product_knowledge/RecordFab/` | `product-knowledge/recordfab.git` |
| Extension | `.product_knowledge/Extension/` | `product-knowledge/streamfab-extensions.git` |

GitLab 地址：`http://10.10.2.124`

### 文件类型分工

| 文件类型 | 放在哪里 | 说明 |
|---|---|---|
| 产品定义、规则、边界 | `00–07` 核心文件 | 只写已确认信息 |
| 未确认问题 | `references/open_questions.md` | 确认后迁入核心文件 |
| 站点技术调研 | `references/site_research_notes.md` | 每个插件独立维护 |
| 需求池 | `requirements/backlog.md` | 以飞书多维表格为权威来源，本文件为快照 |
| 站点支持列表 | `RecordFab/references/site_support_list.md` | 以飞书多维表格为权威，本文件记录机制 |
| 来源与外部证据 | `references/sources.md` | 记录资料出处 |
| 每日变更记录 | `DAILY_CHANGELOG.md`（各库根目录） | 脚本自动生成 |

### 数据权威来源原则

- **需求池**：飞书多维表格 → 本地 `backlog.md` 是快照，以飞书为准
- **站点支持列表**：飞书多维表格 → 本地文件记录机制与字段说明，不维护具体数据
- **产品规则与技术规格**：官网 / PDF 内部文件 → 写入 `01–07` 核心文件
- **站点技术调研**：公开资料 + 行业通识 → 写入 `references/site_research_notes.md`

---

## 2. 自动化基础设施

### GitLab 每日同步脚本

| 项目 | 内容 |
|---|---|
| 脚本路径 | `C:\Users\fab\yuki-studio-repo\gitlab_daily_push.ps1` |
| 触发时间 | 每天 21:00（Windows 任务计划程序，任务名：`GitLab Daily Push`） |
| 日志路径 | `C:\Users\fab\yuki-studio-repo\gitlab_push.log` |
| 工作逻辑 | 检测实质性变动 → 生成 changelog 条目 → 更新 README 最近更新节 → `git add -A` → `git commit` → `git push` |
| 无变动时 | 跳过整个库，不产生空 commit |

**排除文件**：`DAILY_CHANGELOG.md` 和 `README.md` 本身不计入变动检测（避免自循环）

**已知修复历史**：
- 2026-04-20：脚本文件缺少 UTF-8 BOM，PowerShell 5.1 用 GBK 读取导致中文字符解析失败 → 添加 BOM 修复

**排查脚本问题**：
```powershell
# 验证语法
[System.Management.Automation.Language.Parser]::ParseFile('脚本路径', [ref]$null, [ref]$null)

# 查看任务最近执行状态
Get-ScheduledTaskInfo -TaskName "GitLab Daily Push"
# LastTaskResult = 0 表示成功；非 0 表示失败，需手动运行脚本查看输出
```

---

## 3. 工作流清单

### 自动触发

| 工作流 | 触发条件 | 执行方式 |
|---|---|---|
| 知识库同步 GitLab | 每天 21:00 | 任务计划程序自动运行脚本 |

### 周期性人工任务

| 频率 | 工作流 | 操作 |
|---|---|---|
| 每周一上午 | 站点支持列表审核 | 打开飞书多维表格，将成功率 ≥ 90% 的「待确认」站点改为「展示」 |
| 按需（有更新时） | 需求池同步 | 从飞书多维表格读取最新数据，更新 `requirements/backlog.md`，修改文件头的同步日期 |

### 事件触发任务

| 触发事件 | 工作流 | 推荐工具 / Skill |
|---|---|---|
| 确认了某条产品规则 | 更新对应的 `01–07` 核心文件，关闭 `open_questions.md` 中对应条目 | 直接编辑文件 |
| 开始做新插件 | 先由项目内 `knowledge-manager` 判断命名、边界与上下文，再交接 Extension 专项 skill 初始化 `00–07` 文件结构 | `/knowledge-manager` |
| 新插件上线前 | 对目标站点做技术调研，写入 `references/site_research_notes.md` | Claude 搜索调研 + 写文件 |
| 需求进入评审 | 在飞书记录需求，同步快照到 `requirements/backlog.md` | `/lark-base` |
| 需求评审通过，开始设计 | 撰写 PRD | `/prd-writer` |
| PRD 完成后自查 | 检查逻辑漏洞，确认是否达到交付标准 | `/prd-auditor` |
| 产品功能上线 | 更新 `backlog.md` 状态，回写核心文件（如有变更） | 直接编辑文件 |
| 读取飞书多维表格数据 | 查询表格内容或批量读取记录 | `/lark-base` |
| 查看飞书 Wiki 内容 | 读取飞书知识库页面 | `/lark-wiki` |

---

## 4. Skills 速查表

以下为当前会话中可调用的高频 Skill，调用方式：`/skill名称`

| Skill | 一句话说明 | 典型触发场景 |
|---|---|---|
| `knowledge-manager` | 项目知识库入口与路由层，确保 AI 在设计需求前先了解产品背景，并按 RecordFab / Extension 边界分流 | 开始新任务前加载产品上下文、维护知识库、路由到专项 skill |
| `prd-writer` | 撰写可直接交付研发/测试/设计的需求文档 | 需求范围明确，进入文档输出阶段 |
| `prd-auditor` | 评审 PRD，查找逻辑漏洞，判断是否达到交付标准 | PRD 完成后自查或互审 |
| `lark-base` | 操作飞书多维表格：读取记录、更新状态、新增字段 | 同步需求池、查询站点支持列表 |
| `lark-wiki` | 操作飞书知识库：读取 Wiki 页面、管理节点 | 从飞书 Wiki 读取内容到本地知识库 |
| `lark-doc` | 创建和编辑飞书文档 | 将本地文档同步发布到飞书 |
| `lark-im` | 飞书消息收发 | 发送通知、查询消息记录 |
| `lark-task` | 飞书任务管理 | 创建待办、跟踪任务状态 |
| `bdd-feature-writer` | 将需求转换为 BDD 特性文档 | 需求文档交付研发前的规格化 |

Extension 内部专项 skill 不在本表展开维护，完整清单以 `.product_knowledge/Extension/skills/README.md` 为准；`knowledge-manager` 只负责在入口处识别是否需要转交这些专项 skill。

---

## 5. 外部数据源索引

| 数据类型 | 权威来源 | 链接 / 路径 |
|---|---|---|
| RecordFab 需求池 | 飞书多维表格 | `https://i6a1sqw3p2.feishu.cn/base/U9kFbpa5saJTN7sBLXicntqSntb` |
| Extension 需求池 | 飞书多维表格 | `https://i6a1sqw3p2.feishu.cn/base/VFZVb3aXfanWimsyb1EcY65On6c` |
| RecordFab 站点支持列表 | 飞书多维表格 | `https://i6a1sqw3p2.feishu.cn/wiki/LRjwwwIHZi7OyCkXCUocTBCAn0c` |
| RecordFab 官网 | 官方公开页 | `https://recordfab.dvdfab.cn/` |
| DVDFab 法务页 | 官方公开页 | `https://www.dvdfab.cn/legal-disclaimer.htm` |
| GitLab 知识库 | 内网 Git 服务 | `http://10.10.2.124` |

---

## 6. 各模块优化记录

记录已完成的优化，避免重复操作或被遗忘。每条格式：**模块 → 优化内容 → 当前状态**

### 自动化基础设施

| 模块 | 优化内容 | 当前状态 | 时间 |
|---|---|---|---|
| `gitlab_daily_push.ps1` | 新增 changelog 自动生成、README 最近更新节自动刷新、无变动跳过逻辑 | ✅ 生产中 | 2026-04-17 |
| `gitlab_daily_push.ps1` | 修复 UTF-8 BOM 缺失导致 PowerShell 5.1 解析中文字符失败的问题 | ✅ 已修复 | 2026-04-20 |

### RecordFab 知识库

| 模块 | 优化内容 | 当前状态 | 时间 |
|---|---|---|---|
| `README.md` | 重写：删除编号标题和冗余节，合并阅读路径为角色导航表 | ✅ 完成 | 2026-04-20 |
| `01–07` 核心文件 | 闭合全部 P0–P3 open questions，补充产品定位文案、平台说明、登录规则、输出目录、文件命名、速度限制等 | ✅ 完成 | 2026-04-17 |
| `constraints/compliance.md` | 新增法务合规口径，基于 DVDFab 官网法律页，规范宣传边界 | ✅ 完成 | 2026-04-17 |
| `references/site_support_list.md` | 新增站点支持列表维护说明：字段说明、更新机制、客户端展示规则 | ✅ 完成 | 2026-04-17 |
| `requirements/backlog.md` | 新增需求池快照，对接飞书多维表格 | ✅ 完成，需定期同步 | 2026-04-17 |
| `DAILY_CHANGELOG.md` | 脚本自动创建并维护 | ✅ 自动生成 | 2026-04-20 |

### Extension 知识库

| 模块 | 优化内容 | 当前状态 | 时间 |
|---|---|---|---|
| `README.md` | 重写：补充 11 个插件总览表、单插件目录结构展示、按需导航表 | ✅ 完成 | 2026-04-20 |
| `requirements/backlog.md` | 新增需求池快照，对接飞书多维表格 | ✅ 完成，需定期同步 | 2026-04-17 |
| Amazon `references/site_research_notes.md` | 新增站点技术调研：MPEG-DASH、Widevine L3、1080p 上限、CDN、订阅方案 | ✅ 完成 | 2026-04-17 |
| Netflix `references/site_research_notes.md` | 新增站点技术调研：720p 浏览器上限、Open Connect CDN、Per-Title Encoding、AV1 | ✅ 完成 | 2026-04-17 |
| Disney Plus `references/site_research_notes.md` | 新增站点技术调研：HLS+CMAF、浏览器下载封锁、Basic 计划限制 | ✅ 完成 | 2026-04-20 |
| Video `references/site_research_notes.md` | 新增 yt-dlp 技术调研：1800+ Extractor、DRM 边界、格式选择、反检测机制 | ✅ 完成 | 2026-04-20 |
| `DAILY_CHANGELOG.md` | 脚本自动创建并维护 | ✅ 自动生成 | 2026-04-20 |

### 待优化 / 尚未完成

| 模块 | 待做内容 | 优先级 |
|---|---|---|
| Hulu / TVer / FANZA / U-NEXT 等插件 | 补充各插件 `references/site_research_notes.md` 站点调研 | 中 |
| RecordFab `references/open_questions.md` | 已全部闭合，可归档或删除 | 低 |

---

## 7. 维护边界速查

**什么情况下更新 `01–07` 核心文件**
- 收到产品或研发的正式确认
- 功能已上线，与文档描述不符
- 官网/官方文档有明确表述

**什么情况下不直接更新核心文件**
- 信息尚未确认 → 先记入 `references/open_questions.md`
- 来自用户反馈或竞品观察，尚未转化为正式规则 → 先记入 `requirements/backlog.md`

**需求池同步规则**
- 飞书多维表格是权威来源，本地 `backlog.md` 是快照
- 同步时修改文件头的"同步日期"，保留原有说明结构

**站点调研的边界**
- 站点调研基于公开资料和行业通识，不承诺实测验证
- 需要实测验证的内容在文档中标注"需实测确认"
