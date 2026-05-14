# 业务规则速查（context/business_rules）

## 权益配额

| 用户 | 配额 |
|---|---|
| Trial | 3 个视频 |
| Premium | 单日 100 / 单周 700（按每流媒体服务独立计算）|

## 配额扣减

- 发起任务 → 预扣减
- 成功 → 确认扣减
- 失败 → 不扣减
- Retry → 视当前剩余额度重新判断

## 试用弹窗

文案与触发条件与 Netflix 完全一致，仅产品名替换为 `StreamFab DRM MPD Downloader for Browser`。

## License Info Banner（DRM MPD 专属）

- EN：DRM MPD Videos, Downloaded Simply. Save DRM-protected MPD streams for offline viewing in up to 1080p with clear AAC audio.
- ZH：DRM MPD 视频，轻松下载。将受 DRM 保护的 MPD 流媒体保存下来，以最高 1080p 分辨率和清晰的 AAC 音频进行离线观看。
