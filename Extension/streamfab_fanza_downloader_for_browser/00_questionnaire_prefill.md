# Fanza 知识库问卷（预填版，待你纠正）

说明：
- `已约定`：来自你已确认规则
- `ytdlp兜底`：未明确时暂用 ytdlp 口径
- 你只需改错/补空，我再批量回写 01-07

## Phase 1 产品基础信息
1. 产品名称（已约定）
- StreamFab Fanza Downloader for Browser

2. 一句话定位（已约定）
- 面向 Disney?/Fanza? 用户的专用浏览器下载插件，仅支持 Fanza 站点视频下载。

3. 核心用户（ytdlp兜底，待确认）
- 有离线观看需求的流媒体用户
- 已订阅或有试用意愿的 Fanza 用户

4. 核心功能清单（已约定）
- 仅支持 Fanza 站点
- 支持 Fanza DRM 下载（产品定义范围内）
- 批量发起任务 + 串行下载（并发1）
- 下载配置基于 meta 返回（5项）
- CoApp 协同下载执行与状态回传

5. 绝对不做红线（已约定+待确认）
- 不支持 Fanza 以外站点
- 不在未登录/未播放情况下放行有效下载
- （待确认）不支持 macOS（当前提示不支持）

6. 对外卖点（已约定）
- 1080p & multi-track audio
- High speed batch processing
- Lossless audio quality

## Phase 2 功能架构
1. 模块划分（已约定）
- Fanza 检测与 meta 获取
- 下载任务处理（插件+CoApp）
- 权益与授权控制

2. 检测流程差异（已约定）
- 无预分析
- 无跨 Origin
- Downloading 存在时暂停新检测
- Detected 列表上限 50

3. 下载流程（已约定）
- 批量发起
- 串行处理（并发1）
- FIFO
- Retry 回队头

## Phase 3 页面结构
1. 页面清单（已约定）
- 主页（Popup/Sidebar）
- Detected
- Downloads
- Dashboard
- CoApp 引导页
- 剧集选择弹窗

2. 剧集弹窗差异（已约定）
- Season 层级
- 默认 S1E1
- Episode 仅显示时长，不显示文件大小

3. 提示icon（已约定）
- 位置：* Videos Found 右侧
- 文案：
  - EN: Video detection runs only when no downloading tasks exist to ensure stability.
  - ZH: 视频检测仅在没有下载中任务时运行，以确保系统稳定性。

## Phase 4 交互细节
1. 前置条件（已约定）
- Fanza 站点
- 已登录 Fanza
- 已播放视频拿 meta

2. 登录中断策略（已约定）
- 停止检测并清空 Detected
- Downloading 继续
- Pending 不启动
- Failed 禁重试并引导登录
- 保留 Downloaded 历史

3. Error 330（已约定）
- CoApp 判断最近两个月缓存 key 视频，返回 330
- 仅对 Trial 受限
- 文案固定，走多语言包

## Phase 5 设计原则
（ytdlp兜底+Fanza已约定）
- 前置条件优先
- 单站点心智清晰
- 串行下载可预期
- 局部错误可恢复

## Phase 6 业务规则
1. 权益（已约定）
- Trial 3 次
- Premium 每日 100

2. 与 ytdlp 差异（已约定）
- ytdlp: Trial 3, Premium 无日上限

3. 订阅权益文案（已约定）
- Access to all features
- High speed batch processing
- Lossless video quality
- Professional technical support
- Lossless audio quality
- Free updates within period of validity

## Phase 7 技术限制
1. 渠道（已约定）
- Chrome / Edge / 官网版本
- Fanza 三渠道功能一致

2. 系统支持（已约定+待确认）
- Windows 10/11
- macOS 当前不支持

3. 设置结构（已约定）
- Extension + CoApp
- 路径：VIP Services -> Preferred Settings / Preferred Settings-Fanza

## Settings 全量（已约定）
- Language
- Video Format: MP4 / MKV(FFmpeg) / MKV(MKVToolNix)
- Video Codec: H264 / H265-HDR10 / H265-Dolby Vision / VP9 / AV1
- H264 Profile: High / Main
- Video Resolution: 1080p / 720p
- Audio Codec: Atmos / EAC3 / AAC
- Pre-select Audio Language（默认 Same as UI Language）
- Pre-select Description Audio if available（默认不选）
- Audio Channel: Stereo(AAC) / Multi-Channel 5.1(EAC3/AC3)
- Pre-select both 5.1 and 2.0 audios（默认不选）
- Pre-select Subtitle Language（默认 Same as UI Language）
- Always download the forced subtitle（默认选中）
- Subtitle Action: Remux Into File / Extract to SRT File / Extract Original Format

## 你只要回复这三类
1. 删掉哪些行
2. 改成什么
3. 哪些保持不变

