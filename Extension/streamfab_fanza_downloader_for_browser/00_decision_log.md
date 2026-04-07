# 00 决策记录（Decision Log）

> 仅记录“已经定版”的产品决策，避免后续反复讨论。

## 已定决策
1. 命名规范
- `streamfab_<service>_downloader_for_browser`

2. 产品边界
- Fanza 插件仅支持 Fanza
- 与 ytdlp 同级独立产品

3. 检测模型
- Fanza 无预分析
- Fanza 无跨 Origin
- 检测列表上限 50

4. 检测与下载关系
- 存在 Downloading 任务时，不触发新检测
- 页面需长期展示提示 icon 解释该规则

5. 下载模型
- 支持批量发起
- 串行执行（并发 1）
- Retry 回队头

6. 账号中断
- 中途退出 Fanza：进行中任务继续，Pending 不启动，Failed 禁重试，保留 Downloaded

7. 权益与限制
- Trial 3 次
- Premium 每日上限 100
- 最近两个月缓存 key 视频：Trial 受限，返回 Error 330

8. 配置项边界
- 下载区域只看 5 个 meta 字段：Resolution/VideoCodec/AudioCodec/Language/Subtitles
- Dashboard Settings 为通用策略项（非 meta）
