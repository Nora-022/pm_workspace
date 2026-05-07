# 05 设计原则与规范（Design Principles）

## 设计原则

1. **前置条件优先**：Fanza 站点 + 登录 + 播放是获取 meta 的必要前置，UI 须清晰引导每一步
2. **单站点心智清晰**：所有检测与下载限定在 Fanza 一个站点，不出现跨站点交互
3. **检测与下载并行作为默认能力**：下载中不阻断新检测，提示文案不得沿用"下载中暂停检测"的旧逻辑
4. **串行下载可预期**：并发 1，队列 FIFO，用户能明确知道每个任务的等待顺序
5. **账号中断安全优先**：中断时 Downloading 继续、Pending 不启动、Failed 引导而非自动重试

## 顶部用户授权信息模块规范

- 试用态：邮箱 / Trial 标识 / 剩余次数 / Buy Now 按钮 / Dashboard icon
- 订阅态：邮箱 / 订阅类型（LeftTime / Annual / Fab365）/ 当日剩余次数 / Dashboard icon
- 与 ytdlp 差异：Fanza 不展示头像，重点展示剩余下载次数

## Dashboard — License Info 订阅权益文案

订阅权益说明（弹窗 / Dashboard 统一文案）：
- Access to all features
- High speed batch processing
- Lossless video quality
- Professional technical support
- Lossless audio quality
- Free updates within period of validity

License Info 产品名：`StreamFab FANZA Downloader for Browser`

### Banner 文案（定稿）

| 语言 | 文案 |
|---|---|
| EN | FANZA Videos, Downloaded Simply. / Enjoy FANZA offline in up to 4K with clean AAC audio. |
| ZH | FANZA视频，轻松下载。/ 离线畅享FANZA，最高支持4K画质，搭配纯净AAC音频。|

## 应用商店截图规范

| 序号 | 标题 |
|---|---|
| 第一张 | StreamFab Fanza Downloader |
| 第二张 | See All Videos, Instantly |
| 第三张 | Your Video, Your Rules |
| 第四张 | Full Series, One Click |
| 第五张 | Total Control, Total Clarity |

- 产品名统一：`StreamFab Fanza Downloader for Browser`
- 浏览器背景：Fanza 官网截图（fanza.dmm.com）
- 第三张图副标题（定稿）：`Experience the highest quality 4K video and AAC Audio. Full control in your hands`
- 第三张图下载配置截图：需替换为 Video: 4K (2160p60) 的实际配置项截图
