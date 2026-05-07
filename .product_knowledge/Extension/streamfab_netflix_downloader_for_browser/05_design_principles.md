# 05 设计原则与规范（Design Principles）

## 引用关系

- 通用视觉规范统一引用 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 通用交互结构与页面职责统一引用 `shared_references/streamfab_extension_common_ux_patterns.md`
- 通用页面骨架与结构尺寸参考统一引用 `shared_references/streamfab_extension_common_layout_specs.md`
- 本文件只记录 Netflix 自己的差异化设计原则

## Netflix 插件设计原则

### 1. 前置条件优先

- Netflix 的可用性依赖站点、登录和播放状态。
- 在这些前置条件不满足时，优先让用户明确看到原因，而不是进入半可用流程。

### 2. 单站点心智必须稳定

- Netflix 插件是单站点插件，信息架构不应混入多站点产品心智。
- Banner、产品名、链接和文案都应始终围绕 Netflix 本身。

### 3. 并行分析不打断下载

- 下载中的任务不再阻断新视频检测。
- 若界面保留说明性提示，应强调“节省等待时间”，而不是强调旧的稳定性限制。

### 4. 配置字段以完整结果为准

- Netflix 文档资料里存在截图区域不同导致的字段差异。
- 后续设计和研发对齐时，应以字段更完整的版本作为正式口径，不按较少字段版本收缩。
- 不把这种差异解释为预分析。

### 5. Season 层级优先保真

- Netflix 的 playlist 重点是 Season 结构，不应压平成普通列表。
- 进入 Downloads 后再按任务视角拆成 Season 维度任务。

### 6. 错误限制尽量轻量表达

- `Error 330` 继续保留，但不再额外新增旧版“最近两个月限制下载”阻断弹窗。
- Trial 限制应尽量通过已有错误体系和权益提示表达，而不是叠加多个重复打断。
