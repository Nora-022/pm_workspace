# 02 功能架构详解（Functional Architecture）

> 基线插件：Netflix。除以下变更点外，所有逻辑参照 Netflix。

## 功能模块总览

| 模块 | 与 Netflix 的关系 |
|---|---|
| 登录 & 授权 | 一致 |
| 用户权益 | 一致 |
| 视频分析 | 结构一致，下载配置项参数集不同 |
| 视频检测 | 结构一致，下载配置项参数集不同 |
| 视频下载 | 结构一致，下载配置项参数集不同 |
| Dashboard | Banner 文案 + 产品名差异 |
| Dashboard / Setting | 复用通用配置，无插件专属配置项 |

## 模块规格

### 模块：检测与分析

- 用户在受 DRM 保护的 MPD 站点页面播放视频时，插件**自动分析当前 URL**（无独立分析弹窗）
- DRM MPD 标识默认不展示；分析完成且识别到该站点为 MPD + DRM 加密后，**点亮 DRM MPD 下载按钮**

### 模块：下载任务处理

- 串行处理（并发 1）
- 队列 FIFO
- Retry 回队头，按当前余量重新判断

### 模块：下载配置字段

由 CoApp 分析结果动态生成，不固定枚举：

| 配置项 | 格式 | 示例 |
|---|---|---|
| Resolution | `width x height - {bitrate} kbps` | `1280x720 - 2338 kbps` |
| Language | `{语言} {音频编码}` | `English AAC` |
| Subtitles | `None` 或 meta 返回值 | `None` / `English` |

### 模块：Dashboard 与 Setting

- Setting 结构沿用通用：分为 Extension 和 CoApp 两栏
- 配置项无插件专属变更，按顺序复用：Language / Video Format / Video Resolution / Pre-select Audio Language / Audio Channel / Pre-select Subtitle Language / Subtitle Action
- Dashboard Banner 文案为 DRM MPD 专属，参见 `06_business_rules.md`

### 模块：权益与授权控制

- Trial：3 个视频
- Premium：单日 100 / 单周 700（按每流媒体服务独立计算）
- 试用弹窗内容与 Netflix 一致
- 配额预扣减：发起任务时预扣，成功确认扣减，失败不扣减；Retry 视当前剩余额度重新判断
