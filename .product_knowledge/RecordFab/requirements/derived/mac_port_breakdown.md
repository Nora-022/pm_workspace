# RecordFab Mac 版本拆解

## 文档说明

- 用途：在 Windows 现有正式版本基础上，列出移植到 macOS 需要处理的差异点。
- 范围：功能 1:1 对齐 Windows，不做功能裁剪。
- 适配粒度：保证功能能用 + 大面 UI 看起来正常即可，不追求 macOS 原生体验精修。

## 产品标识

| 项 | 值 |
|---|---|
| PID | 1878 |
| Option ID | 1235 |

---

## 一、UI 差异

| # | 差异点 | Mac 处理 |
|---|---|---|
| 1.1 | 标题栏现状是窗口控制按钮（最小化/最大化/关闭）和业务按钮（Buy Now、通知、汉堡菜单）都挤在右上角 | Mac 上拆到两边：窗口控制按钮移到**左**上角，使用 macOS 系统原生三个圆形按钮（红/黄/绿），不要自绘；业务按钮（Buy Now、通知、汉堡菜单）保持在**右**上角不变 |
| 1.2 | Settings / 通用确认弹窗的按钮位序 | OK 在右、Cancel 在左 |
| 1.3 | 桌面图标 | 样式不变，按 macOS 桌面图标规范出图，输出 `.icns` 格式 |
| 1.4 | 安装程序 UI | DMG 自定义背景图（除 Applications 外可定制），参考 StreamFab Mac |

---

## 二、其余改动说明

### 2.1 顶部菜单栏（待定）

macOS 应用必备，Win 没有。最少必须包含：

- **RecordFab**：About / Preferences (⌘,) / Hide / Quit RecordFab (⌘Q)
- **Help**：跳转官方 FAQ

其他菜单按需补充，不强求齐全。

### 2.2 My Files："打开文件夹" icon 行为

- 调用 macOS Finder 并定位文件（NSWorkspace API 或 `open -R`），不再走 Win 资源管理器。


### 2.3 输出目录默认路径

- Win 当前默认：`%AppData%\DVDFab\RecordFab\`
- Mac 默认建议：`~/Movies/RecordFab/`（用户在 Finder 里能直接找到；备选 `~/Library/Application Support/DVDFab/RecordFab/` 但 Library 默认隐藏，不推荐）。

### 2.4 系统要求

- macOS 版本下限：建议 macOS 12+，待研发确认。
- 芯片：Intel + Apple Silicon 都支持，建议出 Universal Binary。
- 内存 / 磁盘 / 网络：沿用 Win 口径（4GB+ / 40GB / 持续联网）。

### 2.5 包格式与签名

- 主分发包：DMG（含自定义背景，见 1.4）。
- 必须做：Apple Developer ID 签名 + 公证（Notarization），否则用户首次打开被 Gatekeeper 拦截。