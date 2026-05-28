# 05 设计原则与规范（Design Principles）

## 引用关系

- 通用视觉规范统一引用 `_common/references/visual_guidelines.md`
- 通用交互结构与页面职责统一引用 `_common/references/ux_patterns.md`
- 通用页面骨架与结构尺寸参考统一引用 `_common/references/layout_specs.md`
- 本文件只记录 DRM MPD 自己的差异化设计原则

## 设计原则

### 多站点展示策略

DRM MPD 支持多个流媒体站点，应用商店素材与界面**不展示具体站点**，统一做模糊 / 占位处理：

- 站点 logo 占位 → 用 DRM MPD 插件 logo 代替
- 浏览器背景截图 → 模糊处理
- 视频封面图 → 使用默认封面图（含插件 logo 底纹）

### Logo 颜色

插件 logo 不取任何具体流媒体服务的品牌色，使用区别于其他插件的独立色，与 ytdlp 插件 logo 设计规范保持视觉一致。

### 应用商店素材规格

| 素材 | 尺寸 |
|---|---|
| 插件 Logo | 128 × 128 px |
| Small promo tile | 440 × 280 px |
| 默认封面图 | 含插件 logo 底纹 |

### Global Screenshots 副标题（第三张）

`Experience the highest quality 1080p/2160p video. Full control in your hands.`

下载配置示例固定为：
- Resolution: `1280x720 - 2338 kbps`
- Language: `English AAC`
- Subtitles: `English`
