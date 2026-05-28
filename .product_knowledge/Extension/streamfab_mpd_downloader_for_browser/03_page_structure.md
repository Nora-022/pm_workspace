# 03 页面结构与布局（Page Structure）

## 引用关系

- 通用视觉规范统一引用 `_common/references/visual_guidelines.md`
- 通用交互结构统一引用 `_common/references/ux_patterns.md`
- 通用结构尺寸统一引用 `_common/references/layout_specs.md`
- 本文档只记录 DRM MPD 相对 common 的页面结构差异

## 页面清单

与基线插件 Netflix 一致：Detected、Downloads、License Info、Setting。

## 主界面布局（全局）

无差异。

## 顶部固定区：用户授权信息模块

无差异。

## Detected 区域

- 进入受 DRM 保护的 MPD 站点视频页后自动分析（无独立分析弹窗）
- DRM MPD 标识默认隐藏；识别为 MPD + DRM 内容后显示并点亮下载按钮
- Meta 弹窗内容：视频标题 + 下载配置（Resolution / Language / Subtitle）

## Downloads 区域

| 状态 | 标签 | 附加信息 |
|---|---|---|
| 待下载 / 下载成功 | 分辨率 + 音频编码 + 文件大小 | — |
| 排队下载 / 下载中 / 下载失败 | 仅分辨率 | 下载中额外显示：速度、进度、分片进度 |

## Setting 配置项

无插件专属配置项。Extension 与 CoApp 两栏均沿用通用配置（按顺序）：

1. Language
2. Video Format
3. Video Resolution
4. Pre-select Audio Language
5. Audio Channel
6. Pre-select Subtitle Language
7. Subtitle Action

## Banner

License Info 顶部 Banner 文案为 DRM MPD 专属，详见 `06_business_rules.md`。Banner 配图采用通用配图（Figma `node-id=0-4336`）。
