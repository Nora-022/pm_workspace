# constraints/tech_limits.md

主文件：`../07_technical_constraints.md`

## 当前不能做
- 下载 DRM 受保护视频（Widevine / PlayReady / FairPlay）。
- 在 `chrome://*`、`edge://*`、`about:blank`、商店页执行注入与检测。
- 未安装 CoApp 时执行下载。

## 原因
- 法规与平台政策限制（DRM / 商店规则）。
- 浏览器扩展沙盒能力限制（文件系统与复杂媒体处理）。

## 替代方案
- DRM 场景引导至 StreamFab 桌面客户端。
- 登录受限页引导至官网后再登录。
- CoApp 缺失时提供安装引导页（Install CoApp / Learn More）。
