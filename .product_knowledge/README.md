# PM Workspace

本目录是当前产品知识库工作区的总入口，覆盖 `RecordFab` 与 `Extension` 两个产品方向。

## 文件结构
```text
.product_knowledge/
├── README.md                     ## 工作区总入口，说明整体结构、阅读入口与维护边界
├── MAINTENANCE.md                ## 维护手册，记录工作流、Skills 速查、外部数据源与模块优化历史
├── planning/                     ## 季度规划与 OKR，年度规划背景 + 各季度计划与复盘
├── RecordFab/                    ## RecordFab 产品知识库目录，沉淀产品文档、规则与需求资料
└── Extension/                    ## StreamFab 浏览器插件知识库目录，沉淀通用规则、共享资料与各插件文档
```

## 阅读入口
- 查看当前季度规划：从 [`planning/2026_S2_plan.md`](planning/2026_S2_plan.md) 开始。
- 查看年度战略背景：[`planning/2026_annual_plan.md`](planning/2026_annual_plan.md)
- 查看 S1 复盘：[`planning/2026_S1_retrospective.md`](planning/2026_S1_retrospective.md)
- 查看 `RecordFab`：从 [`RecordFab/README.md`](RecordFab/README.md) 开始。
- 查看浏览器插件产品线：从 [`Extension/README.md`](Extension/README.md) 和 [`Extension/index.md`](Extension/index.md) 开始。
- 了解维护工作流、Skills 速查、模块优化历史：从 [`MAINTENANCE.md`](MAINTENANCE.md) 开始。

## 维护原则
- 根目录只维护产品方向级别的总览信息。
- 具体产品事实、规则和需求放入对应子目录。
- 文件结构展示统一采用“树状结构 + 行尾概述”的写法。
