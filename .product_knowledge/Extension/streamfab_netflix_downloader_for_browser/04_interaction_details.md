# 04 交互细节（Interaction Details）

## 前置条件
- 必须在 Netflix 站点
- 必须已登录 Netflix
- 必须已播放 Netflix 视频

## 检测与下载关系
- 支持下载任务与新视频分析并行
- 如页面保留说明提示，文案需明确“下载进行中仍可继续分析新视频”
- EN 建议文案：`Analyze new videos while downloads are in progress to save time.`

## 列表与检测规则
- 无预分析，meta 完成后一次性展示
- 无跨 Origin，Detected 上限 50
- 同一视频的完整配置以最终分析结果为准，不再拆出“基础字段版”和“补全字段版”

## 下载调度
- 批量发起
- 串行执行（并发 1）
- FIFO
- Retry 回队头

补充：

- Playlist 下载任务按 `Season` 维度进入 Downloads
- 已在下载中的 playlist 不做额外覆盖标记
- 再次发起同类任务时，可跳转到 Downloads，但不覆盖现有任务

## 登录中断规则
- 停止检测并清空 Detected
- Downloading 继续
- Pending 不启动
- Failed 禁止重试并引导登录
- 保留 Downloaded 历史

## 下载配置交互

### Video Codec

支持：

- `H264 - High Profile`
- `H264 - Main Profile`
- `H265 - HDR10`
- `H265 - Dolby Vision`
- `VP9`
- `AV1`

规则：

- 切换 codec 时需重新向 CoApp 请求
- 切换过程中展示独立加载态
- 若切换过程中用户跳到新视频，旧视频本次切换应取消，并回退到最近稳定分析结果

### Resolution / Audio / Subtitle

- `Resolution`、`Audio Codec`、`Language`、`Subtitles` 由 metadata 返回决定
- `Language` 支持多选
- `Subtitles` 支持多选

### Playlist / Season

- 默认选中 `Season 1 / Episode 1`
- Episode 项只展示时长，不展示文件大小

## 错误与文案
- Error 330：由 CoApp 判定（最近两个月缓存 key，试用受限），固定文案，走多语言包
- 其余错误与文案：沿用 StreamFab 客户端信息

补充：

- 插件不再额外弹“最近两个月视频限制下载”的旧阻断弹窗
- `Error 330` 失败不扣次
