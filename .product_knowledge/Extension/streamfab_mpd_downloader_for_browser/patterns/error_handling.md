# 错误处理（patterns/error_handling）

> 本插件无差异化错误场景，全部参照 Netflix 基线。本文档仅记录与 Netflix 的关系。

## 与 Netflix 的关系

错误场景的触发条件、展示形式、文案、可重试性均与 Netflix 一致，差异仅在产品名替换（StreamFab DRM MPD Downloader for Browser）。

完整错误矩阵参见 Netflix 基线插件 `patterns/error_handling.md`。

## DRM MPD 特有的边界情况

| 场景 | 处理 |
|---|---|
| 当前页面非 MPD / 非 DRM | 下载按钮不点亮，无错误提示（视为不支持场景） |
| Meta 分析返回字段缺失 | 提示分析失败，不进入 Meta 弹窗 |
| CoApp 未安装 / 未启动 | 沿用 Netflix 通用提示，产品名替换为 DRM MPD |
| 登录态丢失（Downloading 中） | 允许当前任务继续，不发起新任务 |
| 配额耗尽 | Trial 弹试用弹窗；Premium 提示当日 / 当周已达上限 |
