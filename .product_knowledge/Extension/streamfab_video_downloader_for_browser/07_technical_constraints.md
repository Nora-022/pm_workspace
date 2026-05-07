# 07 技术限制与约束（Technical Constraints）

> 版本：1.0
> 最后更新：2026-03-03
> 来源：基于《StreamFab 浏览器插件》需求文档

## 系统要求

### 操作系统
- 支持：Windows 10/11（推荐 64 位）。
- 不支持：macOS（CoApp 尚未适配，按钮显示 `MacOS unavailable`）、Linux、Android、iOS。

### 浏览器兼容性
- Google Chrome：最新稳定版。
- Microsoft Edge：最新稳定版。
- 其他 Chromium 浏览器：理论支持 Manifest V3 + Native Messaging，但不做官方保证。

### 核心组件与网络
- 必须安装并运行 StreamFab Video CoApp（Native Host）。
- 插件通过 Native Messaging 与 CoApp 通信。
- 需要可用网络用于：License 校验、视频分析、视频下载。

## 技术实现限制

### DRM 内容限制
- 无法下载受 DRM 保护的视频（Widevine / PlayReady / FairPlay）。
- 检测到 DRM 时显示 `Protected Video Content`。
- 引导用户使用 StreamFab 桌面客户端处理该类网站（如 Netflix / Hulu / Disney+）。

### 受限浏览器页面
- 插件无法在以下页面注入或运行：
  - `chrome://*`
  - `edge://*`
  - `about:blank`
  - Chrome Web Store / Edge Add-ons 页面
- 在受限页面登录或检测会失效；登录时弹 `Login Notice`，引导去官网页面登录。

### 运行依赖限制
- 未安装 CoApp 时，插件无法下载视频。
- 原因：扩展沙盒限制文件系统访问及高质量流合并处理能力（FFmpeg 等）。

## 平台差异

### 渠道差异矩阵
- 独立网站包（离线/侧载）：
  - YouTube 下载：支持（完整功能）
  - 更新：手动下载安装
- Chrome Web Store 版：
  - YouTube 下载：不支持（政策限制）
  - 更新：商店自动更新
- Microsoft Edge Addons 版：
  - YouTube 下载：支持（完整功能）
  - 更新：商店自动更新

### Chrome 商店版说明
- 在 YouTube 页面显示 `Video on YouTube` 限制提示。
- 引导用户使用 Edge 或官网版本。

## 性能与稳定性边界

### 并发/队列上限
- 最大同时下载数：5。
- 超过 5 的任务自动进入 `Pending` 队列，不报错。

### 历史记录上限
- Downloaded 页最多保留最近 20 条记录。
- 超出后移除旧记录（磁盘文件保留）。

### 超时与重试策略
- 网络错误：支持手动 `Retry`。
- 授权故障：网络类失败可重试；硬限制（如设备上限）直接失败提示。

## 合规与安全
- 遵循浏览器商店政策与平台版权规则。
- DRM 受保护内容不做绕过。
- Chrome 商店版遵守 YouTube 相关政策限制。
