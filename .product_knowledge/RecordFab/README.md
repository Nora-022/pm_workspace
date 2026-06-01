# RecordFab 产品知识库

RecordFab 是帮助用户录制并保存流媒体视频的 Windows 客户端，是 StreamFab 的补充产品。本知识库集中沉淀产品定义、交互规则、商业规则与技术边界，供跨团队协作使用。

## 产品概览

| 项目 | 说明 |
|---|---|
| 产品类型 | 流媒体录制客户端 |
| 当前平台 | Windows（11 / 10 / 8.1 / 8 / 7） |
| 产品角色 | StreamFab 的补充方案，适合下载不可用时的内容保存场景 |
| 官方地址 | [recordfab.dvdfab.cn](https://recordfab.dvdfab.cn/) |

## 目录结构

```text
RecordFab/
├── 00_product_context.md         ## 产品背景，说明产品角色、核心场景与长期定位
├── 01_product_brief.md           ## 产品简介，概览定位、用户群与核心价值
├── 02_functional_architecture.md ## 功能架构，说明模块划分与主链路结构
├── 03_page_structure.md          ## 页面结构，说明主要页面与页面职责
├── 04_interaction_details.md     ## 交互细节，记录关键流程、状态与交互规则
├── 05_design_principles.md       ## 设计原则，记录界面表达与体验标准
├── 06_business_rules.md          ## 商业规则，记录套餐、授权与付费口径
├── 07_technical_constraints.md   ## 技术约束，记录平台限制与实现边界
├── 08_technical_implementation.md ## 技术实现，记录录制引擎架构、接口与已确认事实
├── 09_technical_open_issues.md   ## 技术遗留问题，记录待修复与待验证的技术问题
├── context/                      ## 压缩摘要，供快速浏览
├── patterns/                     ## 可复用的流程与交互模式
├── constraints/                  ## 平台、合规与技术限制补充
├── references/                   ## 研究资料、来源与外部证据
└── requirements/                 ## 需求文档与输入材料
```

## 按角色快速导航

| 角色 | 建议阅读 |
|---|---|
| 运营 / 商务 / 支持 | `00` → `01` → `06` |
| 设计 / 产品协作 | `00` → `01` → `03` → `04` → `05` → `07` |
| 需求评审 / 开发 | `02` → `04` → `07` → `08` → `09` → `requirements/` |
| 版本追溯 | `DAILY_CHANGELOG.md` → `requirements/` → `references/` |

## 维护规范

- `01–07` 核心文件只写已确认信息，未确认内容先放 `references/open_questions.md`
- 版本变更优先记入 changelog，再决定是否回写核心文件
- 本知识库记录当前正式版本及历史演进，不用于未来规划
- 工作流、Skills 速查、同步脚本说明见 [`../MAINTENANCE.md`](../MAINTENANCE.md)

## 最近更新

| 日期 | 更新内容 |
|---|---|
| 2026-04-20 | 新增 7 项，修改 9 项 |

> 完整更新记录见 [DAILY_CHANGELOG.md](DAILY_CHANGELOG.md)

## 当前知识库更新记录

| 日期 | 更新内容 |
|---|---|
| 2026-06-01 | 修改 1 项 |

> 完整更新记录见 [DAILY_CHANGELOG.md](DAILY_CHANGELOG.md)
