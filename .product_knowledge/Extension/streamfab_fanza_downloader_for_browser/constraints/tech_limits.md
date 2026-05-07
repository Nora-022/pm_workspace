# constraints/tech_limits.md

主文件：`../07_technical_constraints.md`

## 支持范围

- 支持 Fanza 站点 DRM 视频下载（Widevine 加密，产品核心能力）
- 仅支持 Fanza 一个站点，不支持跨站点

## 当前不能做

- 在非 Fanza 站点触发检测或下载
- 未安装 CoApp 时执行下载
- 在 `chrome://*`、`edge://*`、`about:blank`、商店页注入或检测
- macOS 上运行（显示 `MacOS unavailable`）
- 未登录 Fanza 账号时获取 meta
- 未播放视频时获取 meta（前置条件：站点 + 登录 + 播放）

## 能力边界

- Detected 列表上限：50
- 并发执行：串行（并发 1）
- 批量发起，逐条执行
- Retry 回队头

## 下载配置边界

- 下载区域仅 5 个 meta 项（Resolution / Video Codec / Audio Codec / Language / Subtitles）
- 选项由 CoApp 分析结果动态生成，不固定枚举

## 特殊限制

- 最近两个月缓存 key 视频：Trial 用户受限，CoApp 返回 Error 330
