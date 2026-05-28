# 05 设计原则（Design Principles）

## 引用关系

- 通用视觉规范统一引用 `_common/references/visual_guidelines.md`
- 通用交互结构与页面职责统一引用 `_common/references/ux_patterns.md`
- 通用页面骨架与结构尺寸参考统一引用 `_common/references/layout_specs.md`
- 本文件只记录 Disney Plus 自己的差异化设计原则

## Disney 插件设计原则

### 1. 前置条件优先

- Disney 的可用性强依赖站点、登录和播放状态。
- 在这些前置条件不满足时，优先做明确状态提示，而不是让用户进入半可用流程。

### 2. 检测与下载并行应视为默认能力

- Disney 不应再把“下载中暂停检测”当作默认产品前提。
- 后续设计以检测与下载可并行为基础，不再为旧互斥限制预留额外解释型文案。

### 3. 结果一次性呈现，避免假进度

- Disney 不走多阶段分析表达。
- 不应该为了“看起来有过程”而虚构分析进度。

### 4. Extras 结构优先保真

- Disney 的 extras 是真实内容层级，不应为了省空间直接并入主视频。
- 在弹窗中优先保留层级表达，进入下载列表后再按任务视角拆平。

### 5. 可变信息缺失时直接省略

- 像文件大小这类变量，拿不到时直接不展示。
- 不用占位假值，也不强行补一个误导性默认值。

### 6. 能力口径要谨慎

- Disney 文档里同时出现了 `1080p` 和 `4K & Dolby Atmos` 两套宣传口径。
- 在最终口径确认前，插件知识库中保留冲突说明，不擅自统一。

## Disney 特有素材要求

- Disney Plus 官网背景图
- Disney Plus 内容封面
- Disney Plus 插件 logo
- Disney Plus CoApp logo
- Disney Plus Extras 结构截图

## 待确认项

- Dashboard banner 最终文案口径
- 是否需要在插件内对“1080p 可能不可用”做明确提示
- Extras 层级是否需要在狭小空间中压缩
