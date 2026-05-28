# 05 设计原则（Design Principles）

## 引用关系

- 通用视觉规范统一引用 `_common/references/visual_guidelines.md`
- 通用交互结构与页面职责统一引用 `_common/references/ux_patterns.md`
- 通用页面骨架与结构尺寸参考统一引用 `_common/references/layout_specs.md`
- 本文件只记录 Amazon 自己的差异化设计原则

## Amazon 插件设计原则

### 1. 保持 common 框架，不重做整体壳层

- Amazon 的差异不通过重做 popup / dashboard / modal 来表达。
- 差异主要通过字段、状态、配置关系和特定提示来表达。

### 2. 分析状态必须比 common 更清楚

- Amazon 分析链路更长，不能只停留在模糊的“检测中”。
- 需要清楚区分 `检测中`、`分析中`、`分析成功`、`分析失败`。

### 3. 复杂配置优先通过联动和置灰表达

- 当 Mode 切到 `Audio Only / Subtitle Only` 时，优先用置灰保留结构，而不是让界面跳得太碎。
- 让用户看到“有哪些能力当前不可用”，而不是突然缺字段。

### 4. Playlist 兼容性提示优先非阻断

- Playlist 只分析第一集是能力限制，不应频繁打断用户。
- `H265 + CBR` 这类兼容问题优先用常驻提示，不用阻断弹窗。

### 5. 音轨表达要准确，不要过度简化

- Language 不是简单语言名。
- 对 `Audio Description`、`Dialogue Boost`、Codec、Bitrate 的表达必须完整，避免误导。

### 6. Amazon 页面和素材表达只写确认能力

- Banner、商店图、卖点文案只写已确认能力：
  - `1080p`
  - `MP4 / MKV`
  - `AAC 2.0 / EAC3 5.1`
  - `H264 / H265`
- 不写 `4K`、`HDR`、`Sports / Live` 已支持等未确认口径。

## Amazon 特有素材要求

- Amazon / Prime Video 页面截图
- Amazon 内容封面
- Amazon 插件 logo
- Amazon CoApp logo
- Amazon 特有配置项截图

## Banner 文案

- EN:
  - `Pro-Quality Amazon Downloads, One Click.`
  - `Up to 1080p, MP4/MKV, AAC 2.0/EAC3 5.1 audio, where available.`
- ZH:
  - `专业品质亚马逊下载，一键搞定。`
  - `最高支持1080p分辨率，MP4/MKV格式，AAC 2.0/EAC3 5.1声道音频（如有提供）。`
