# 录制产品竞品横向分析

> 飞书原文：https://www.feishu.cn/docx/WzHHd5pJYobGmCxUFWXcySLJnEf
> 单篇调研：2026_s2_recordfab_competitor_playon.md / 2026_s2_recordfab_competitor_audials.md / 2026_s2_recordfab_competitor_cleverget.md

---

## 背景

本次调研覆盖三个录制类竞品，重点梳理 2026 年以来的产品发展方向，为 RecordFab S2 规划提供参考依据。

调研范围：PlayOn、Audials、CleverGet Recorder。三个产品分别代表不同的技术路线与商业策略：PlayOn 是服务端云录制的落地案例；Audials 是 Windows 平台录制套件的代表；CleverGet Recorder 是下载主业孵化录制副线的典型样本。

---

## 竞品横向对比

| 维度 | PlayOn | Audials | CleverGet Recorder |
|---|---|---|---|
| 录制技术路径 | WebView 内嵌播放，屏幕层捕获（Windows PC） | D3D hook 捕获 GPU 解码后 YUV 帧，FFmpeg 重编码 | CEF 内播放，GPU 层帧捕获 |
| 2026 更新重点 | 无实质新功能，以平台兼容 bugfix 为主 | 产品线合并为 Audials One；Premium 加入 AI 超分、人声分离等增值能力 | 无更新，v1.0.0.0 至今无公开记录 |
| DRM 支持 | 支持（屏幕层捕获） | 支持（捕获 Widevine 解密后帧） | 支持（CEF 层捕获） |
| 主要弱点 | 最高 720p 天花板；开发者明显放弃维护；用户投诉多 | 黑屏问题未根治；批量录制掉集；完全锁死 Windows | 无定时启动；无系列追更；广告过滤停在 beta |
| 战略方向信号 | 重心已转向云端产品，Home 版本实质上被放弃 | 核心录制趋于成熟，向 AI 后期处理延伸 | Recorder 定位为获客工具，非核心产品投入 |

---

## 趋势观察

### 纯录制功能趋于商品化，差异化向后期处理延伸

Audials 2026 的重点不是录制本身，而是录制完成后的 AI 增值：视频超分（SDR→HDR，最高 4K）、人声分离、帧插值。这些能力被封装在付费 Premium 档位，说明 Audials 判断核心录制已难以形成差异，下一个付费理由在后期处理。CleverGet 和 PlayOn Home 则完全停止了功能迭代，进一步印证这一判断。

### 无人值守录制是行业公认需求，但至今无人做好

三家产品均不支持可靠的定时启动 + 自动录制。PlayOn Cloud 的云端方案在需求方向上是对的，但账号风控、网络抖动、平台反制让服务端执行非常脆弱，Trustpilot 1.4/5 是结果。本地方案这个位置目前是空的。

### 批量 / 系列录制是高频痛点，执行质量差

Audials 的 Batch 功能支持多集排队，但掉集是最集中的用户投诉。CleverGet Recorder 完全不支持系列追更。说明"连续录多集"是真实需求，但行业内没有一家做到稳定交付。

### 产品整合是商业化趋势

Audials 2026 把 Movie / Music / Radio / Vision 全部合并为 Audials One，用档位取代多产品线。用户不想管理多个工具，一体化产品降低选择成本，这在定价上也更容易做梯度。

### 执行质量决定用户留存

CleverGet Recorder 停止迭代、PlayOn Home 被开发者放弃，口碑差的核心都不是功能缺失，而是稳定性和用户信任的崩塌。功能列表容易复制，稳定交付才是实际壁垒。
