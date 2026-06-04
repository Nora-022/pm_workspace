# Design Mapping

## 03_page_structure.md

- Runtime UI 固定为 Header、Tab Bar、Content Area、Footer：对应 `PluginShell`、`PluginHeader`、`PluginTabs`、`PluginFooter`。
- Detected 和 Downloads 是 Runtime 内部 tab：对应 `DetectedPanel`、`DownloadsPanel`。
- Dashboard 是独立页面，不作为 popup 折叠区：对应 `DashboardPages`，hash 入口为 `#setting` 和 `#license`。
- Detected 展开区只承载当前下载配置：对应 `DetectedCard` 的 Resolution、Language、Subtitles、Select Episodes。
- 同一时间只允许一个资源展开：由 `expandedId` 单值状态控制。

## 12_ui_ux_visual_layout_specs.md

- 侧边栏宽度统一为 `480px`：对应 `--sf-sidebar-width: 480px`。
- 品牌橙、辅助蓝、文本、边框、分割线、浅灰、圆角：对应 `src/styles/tokens.css`。
- Tab 高度、checkbox、select、按钮尺寸：由 token 和 `global.css` 落地。
- Select Episodes 仅在 playlist / multi content 出现：由 `DetectedResource.isPlaylist` 控制。
- File size / bitrate 等可变标签仅在 mock 数据存在时展示，不主动编造缺失值。
