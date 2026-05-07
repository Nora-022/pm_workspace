# M3U8 插件知识库

## 主入口
- `00_overview.md`

## 核心文件
1. `01_product_brief.md`
2. `02_functional_architecture.md`
3. `03_page_structure.md`
4. `04_interaction_details.md`
5. `05_design_principles.md`
6. `06_business_rules.md`
7. `07_technical_constraints.md`
8. `08_technical_implementation.md`
9. `09_technical_open_issues.md`

## 关键模式
- `patterns/settings_configuration_matrix.md`
- `patterns/user_flows.md`

## 需求文档
- `requirements/plugin_requirement.md`
- `requirements/plugin_ui_requirement.md`

## 版本记录
- `CHANGELOG.md`
- `version_history.md`

## 文件结构
```text
streamfab_m3u8_downloader_for_browser/
├── 00_overview.md                 ## 目录总览，说明当前阶段、核心目标与阅读入口
├── 01_product_brief.md            ## 产品简介，概览产品范围、核心信息与阅读入口
├── 02_functional_architecture.md  ## 功能架构，说明模块划分、主链路与关键能力结构
├── 03_page_structure.md           ## 页面结构，记录站点页面、插件页面与主要接入点
├── 04_interaction_details.md      ## 交互细节，沉淀主流程、状态变化与关键交互规则
├── 05_design_principles.md        ## 设计原则，记录界面表达、文案与插件专属设计要求
├── 06_business_rules.md           ## 商业规则，记录套餐、试用、授权、限制与权益口径
├── 07_technical_constraints.md    ## 技术约束，记录格式、平台能力、系统要求与技术边界
├── 08_technical_implementation.md ## 技术实现，记录接口流、URL 判断、分析与下载链路
├── 09_technical_open_issues.md    ## 技术遗留问题，记录当前已知的状态机缺口与待补接口
├── CHANGELOG.md                   ## 本插件知识库更新记录
├── version_history.md             ## 版本发布历史
├── context/                       ## 摘要层，提供适合快速浏览的压缩版信息
├── patterns/                      ## 模式层，沉淀可复用的流程、UI 与错误处理模式
├── constraints/                   ## 约束层，补充平台、合规与技术限制说明
├── references/                    ## 参考层，归档产品页、研究资料、来源与外部证据
└── requirements/                  ## 需求层，维护正式需求文档与 UI 需求说明
```
