# 00 概览

## 产品定位
- 产品名称（展示名）：DRM MPD
- 安装器 / 技术包名：StreamFab DRM MPD Downloader for Browser
- CoApp 名：StreamFab DRM MPD Coapp
- app id：streamfab_for_browser_drm_mpd
- 产品类型：
- 支持范围：

## 核心规则
- 检测策略：自动分析当前 URL，识别为 MPD + DRM 后点亮下载按钮，无独立分析弹窗
- 下载策略：串行（并发 1）、FIFO 队列、Retry 回队头按当前余量重新判断
- 账号中断处理：Detected/Detected 为空 → 提示登录；Downloading 继续；Failed 禁重试；Downloaded 保留
- 权益规则：Trial 3 个 / Premium 单日 100、单周 700（每流媒体服务独立）

## 已确认边界
- 目标协议：基于 MPD（MPEG-DASH manifest）的流媒体站点
- 分辨率上限：1080p
- 输出：MP4 / MKV，音频 EAC3/AC3 5.1 或 AAC 2.0，字幕 SRT 或嵌入
- 多站点策略：界面与商店素材不展示具体站点，做模糊 / 占位处理

## 关联文档
- `01_product_brief.md`
- `02_functional_architecture.md`
- `04_interaction_details.md`
- `06_business_rules.md`
