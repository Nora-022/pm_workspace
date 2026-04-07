# Common Plugin Rules (Cross-Product)

适用产品线：StreamFab Browser Extensions

## 1) 检测展示模式分类
- 模式 A（预分析）：先占位展示卡片，再补齐完整配置（如 ytdlp）。
- 模式 B（直出分析）：meta 完成后一次性展示（如 Netflix）。

## 2) Origin 模型分类
- 多 Origin 插件：支持跨站点检测与切换（如 ytdlp）。
- 单 Origin 插件：无跨 Origin 概念（如 Netflix）。

## 3) 检测与下载并行策略
- 并行型：下载过程中允许新检测。
- 互斥型：存在 Downloading 任务时暂停新检测（如 Netflix）。

## 4) 文档落位规范
- 插件专属差异：写入各插件 `04_interaction_details.md` 与 `patterns/*_logic_diff.md`。
- 产品线共性规则：写入本文件并在 `product_line_index.md` 引用。
