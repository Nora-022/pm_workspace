# constraints/platform_diffs.md

## Windows
- 支持 Windows 10/11（推荐 64 位）。
- 依赖 CoApp 本地安装与后台运行。

## macOS
- 当前不支持（显示 `MacOS unavailable`）。

## 浏览器渠道差异
- 官网侧载版：支持 YouTube 下载，手动更新。
- Chrome 商店版：不支持 YouTube 下载，商店自动更新。
- Edge 商店版：支持 YouTube 下载，商店自动更新。

## 性能边界
- 最大并发：5。
- 超过并发：进入 Pending 队列。
- 已下载历史：仅保留最近 20 条 UI 记录。
