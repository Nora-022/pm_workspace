# Disney 与 Netflix 逻辑差异清单

## 产品定位
- Disney：`StreamFab Disney Plus Downloader for Browser`
- Netflix：`StreamFab Netflix Downloader for Browser`
- 二者同级独立，均为单站点 DRM 插件。

## 站点边界
- Disney：仅支持 Disney Plus
- Netflix：仅支持 Netflix

## 权益与配额
- Disney：Trial 3，Premium 每日 100
- Netflix：Trial 3，Premium 每日 100

## 特殊限制规则
- Disney：无 Error 330 特殊限制
- Netflix：存在 Error 330（最近两个月缓存 key 视频对 Trial 受限）

## 检测模型（共同点）
- 无预分析
- 无跨 Origin
- Downloading 存在时暂停新检测
- Detected 列表上限 50

## 下载调度（共同点）
- 支持批量发起
- 串行执行（并发 1）
- FIFO
- Retry 回队头

## 顶部用户授权信息模块
- 共同点：
  - 试用/订阅都展示 Dashboard 跳转 icon
- 结构（两者当前一致）：
  - 试用：邮箱 + 剩余下载次数 + Trial + Buy Now + Dashboard icon
  - 订阅：邮箱 + 当日下载次数 + 订阅方案（LeftTime/Annual/Fab365）+ Dashboard icon

## 剧集弹窗（共同点）
- Season 层级
- 默认 S1E1
- Episode 仅显示时长，不显示文件大小

## 交互前置条件（共同点）
- 站点正确
- 已登录对应站点账号
- 已播放视频

## 卖点差异
- Disney：`Experience up to 4K resolution with Dolby Atmos. Full control in your hands.`
- Netflix：`1080p & multi-track audio`
- 共同点：High speed batch processing / Lossless audio quality
