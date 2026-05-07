# 05 设计原则与规范（Design Principles）

## 引用关系
- 通用视觉规范统一引用 `shared_references/streamfab_extension_common_visual_guidelines.md`
- 通用交互结构与页面职责统一引用 `shared_references/streamfab_extension_common_ux_patterns.md`
- 通用页面骨架与结构尺寸参考统一引用 `shared_references/streamfab_extension_common_layout_specs.md`
- 本文件只记录 M3U8 插件自己的差异化设计原则

## M3U8 插件设计原则

### 1. 多站点心智，不绑定特定服务

- M3U8 插件面向任意网站的 M3U8 流，产品文案、Banner 和引导不应绑定或暗示某一特定平台。
- 与 Netflix / Disney 类单站点插件最本质的区别：前置条件是"当前页面有 M3U8 视频"，而不是"你在 X 平台"。

### 2. 分析等待态必须有明确进度反馈

- M3U8 分析耗时较长，用户必须能感知到系统正在处理，而不是无响应。
- 检测中 / 分析中 / 分析结果三个状态需要有视觉上的区分，不能合并成一个模糊的"加载中"。

### 3. 不支持的视频要轻量告知，不强阻断

- 分析失败或不支持下载，走 toast 提示，不新增额外阻断弹窗。
- 区分"已有视频时的失败"与"完全无视频时的失败"，前者用 toast，后者用全局提示。

### 4. 配置字段以分析结果为准，不预设

- M3U8 的配置项（Resolution / Language / Subtitles）由 CoApp 分析结果驱动。
- 空列表或无效字段对应控件应隐藏，而不是灰显占位。
