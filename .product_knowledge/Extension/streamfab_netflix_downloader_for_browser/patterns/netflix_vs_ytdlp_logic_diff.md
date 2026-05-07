# Netflix 与 ytdlp 逻辑差异清单

## 产品与命名
- 同级独立产品。
- 命名规则统一：`streamfab_<service>_downloader_for_browser`。

## 站点与能力边界
- Netflix 插件：仅支持 Netflix 站点。
- ytdlp 插件：多站点能力。
- Netflix 插件支持 Netflix 站点 DRM 下载（产品定义范围内）。

## 检测流程差异（关键）
- Netflix：无预分析；meta 完成后一次性展示。
- ytdlp：有预分析；先展示卡片占位，再补齐完整配置。

## Origin 模型差异（关键）
- Netflix：无跨 Origin 概念；Detected 单站点累计展示（上限 50）。
- ytdlp：存在跨 Origin 逻辑；跨站点时重新检测与列表切换。

## 检测-下载关系
- Netflix：截至 2026-04-14，已支持下载任务与新视频分析并行。
- ytdlp：通常允许检测与下载并行。
- 结论：该项不再构成 Netflix 与 ytdlp 的核心差异。

## 顶部用户授权信息模块差异（关键）
- ytdlp：
  - 试用：头像/邮箱/Trial 标识/剩余试用次数/购买按钮/Dashboard 按钮
  - 订阅：头像/邮箱/订阅类型（LeftTime/Annual/Expired/Fab365）/Dashboard 按钮
- Netflix：
  - 重点展示邮箱与“剩余下载次数”（试用剩余/订阅日剩余额度）

## 剧集弹窗差异（关键）
- Netflix：新增 Season 层级（Season -> Episode）。
- Netflix：默认选中第一季第一集（S1E1）。
- Netflix：剧集项仅展示时长，不展示文件大小。
- ytdlp：无上述 Season 强化结构（按既有多站点结构展示）。

## 前置条件差异
- Netflix：站点 + 登录 + 播放视频（才能拿到 meta）。
- ytdlp：不要求“先播放”这一前置动作。

## 权益与配额差异
- Netflix：Trial 3 次；Premium 每日上限 100。
- ytdlp：Trial 5 次；Premium 无每日上限。

## 订阅权益文案差异
- Netflix 弹窗/Dashboard 统一强调：
  - Access to all features
  - High speed batch processing
  - Lossless video quality
  - Professional technical support
  - Lossless audio quality
  - Free updates within period of validity

## 特殊限制差异
- Netflix：最近两个月缓存 key 视频对 Trial 受限，CoApp 返回 `Error code 330`。
- ytdlp：无该规则。

## 下载调度差异
- Netflix：可批量发起，但串行处理（并发 1）。
- ytdlp：并发能力更高（历史规则为并发上限 5）。

## 登录中断策略（Netflix）
- 停止检测并清空 Detected。
- Downloading 继续。
- Pending 禁止启动。
- Failed 禁止重试，点击 Retry 引导回 Detected 登录。
- 保留 Downloaded 历史展示。

## 配置项差异
- Netflix 视频下载区域：5 项 meta 驱动（Resolution / Video Codec / Audio Codec / Language / Subtitles）。
- Dashboard 通用策略项：含 Video Format/VideoCodec/H264 Profile/AudioCodec/AudioChannel/Subtitle Action 等。
- Netflix 移除 `Audio Quality`。

## 渠道差异
- 两者渠道都包含：Chrome / Edge / 官网版本。
- Netflix：渠道功能一致。
- ytdlp：渠道功能存在差异。

## 文档说明
- 需求文档中个别历史文案与当前确认口径可能不一致（如 Trial 次数）。
- 以当前已确认口径为准：Netflix Trial 3，ytdlp Trial 5。


