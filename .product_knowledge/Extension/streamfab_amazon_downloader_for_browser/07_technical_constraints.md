# 07 技术约束（Technical Constraints）

## 核心技术约束

- Amazon 插件属于 DRM 流媒体站点插件，不是通用开放站点提取器。
- Amazon 的复杂度不只来自资源提取，还来自页面识别、权益识别、内容结构识别和 CoApp 分析链路。

## CoApp 依赖

- Amazon 的实际分析进度依赖 CoApp 接口。
- 插件侧无法独立模拟真实分析阶段。
- 若 CoApp 没有返回进度，只能退回到较弱的状态表达。

## 首集分析限制

- Playlist 只分析第一集。
- 第一集的 codec / bitrate / resolution 结果不必然适用于后续剧集。

影响：

- `H265 + CBR` 可能在首集不可用，但后续可用。
- Resolution 需要 fallback 方案。

## 动态选项依赖

Amazon 下载配置中存在多组动态依赖：

- `Mode -> 字段可用范围`
- `Video Codec -> Resolution / Language`
- `Audio Codec -> Language`
- `Codec + Bitrate -> Resolution 可选项`
- `Dialogue Boost / Description Audio -> Language 候选集`

这意味着：

- 插件不能把这些字段做成静态固定配置。
- 必须接受分析结果和设置项共同驱动的动态渲染。

## 页面与内容结构风险

- Movie、TV Show、Extras、Trailers 结构可能并存。
- Sports / Live 是站内特殊内容，不应误判为普通 VOD。
- 页面 DOM 与入口会随权益状态、地区和内容类型变化。

## 不应默认假设

- 不默认所有详情页字段一致。
- 不默认所有视频都支持 `H265 / CBR / 1080p / EAC3 5.1`。
- 不默认 browse 卡片信息足以直接创建最终任务。
- 不默认 Sports / Live 已支持。

## 待持续验证项

- 登录后 DOM 结构稳定性
- entitlement 变化后的状态刷新
- 分析失败分类
- 各地区页面差异
- Subtitle / Multi-audio 暴露方式
- Rental / Purchase 内容的任务创建表现
