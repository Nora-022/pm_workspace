# patterns/user_flows.md

## 主检测下载流程

- 入口：用户打开 Fanza 站点并播放视频
- 步骤 1：插件自动检测 meta（无预分析，meta 完成后一次性展示）
- 步骤 2：Detected 列表展示视频卡片（上限 50）
- 步骤 3：用户选择视频（单个或批量），选择 Resolution / Video Codec / Audio Codec / Language / Subtitles
- 步骤 4：点击下载确认按钮
  - 分支 A（Trial 用户）：触发试用弹窗，确认后扣减 Trial 次数，进入下载队列
  - 分支 B（Premium 用户）：预占每日配额，进入下载队列
- 步骤 5：串行执行（并发 1），下载进度由 CoApp 回传
- 退出条件：任务进入 Downloaded 状态
- 异常分支：Error 330 / 登录中断 / CoApp 断连（见 error_handling.md）

## 剧集批量下载流程

- 入口：视频检测结果为剧集（含 Season 结构）
- 步骤 1：用户点击剧集下载按钮，弹出 Season/Episode 选择弹窗
- 步骤 2：默认选中 S1E1；用户可切换 Season、勾选 Episode
- 步骤 3：Episode 展示时长，不展示文件大小
- 步骤 4：用户确认，批量发起下载任务（每集一个独立任务）
- 步骤 5：串行执行，FIFO

## 登录中断处理流程

- 触发：用户在插件使用过程中退出 Fanza 登录
- 停止检测并清空 Detected
- Downloading 任务继续
- Pending 任务不启动
- Failed 任务：禁止点击 Retry，点击后引导用户回 Detected 页完成登录
- Downloaded 历史保留展示

## Trial 限额耗尽流程

- 触发：Trial 用户点击下载确认按钮
- 弹出试用弹窗，展示剩余次数
- 次数为 0 时，仅展示购买引导，无法继续下载
- 购买链接跳转：https://streamfab.dvdfab.cn/streamfab-for-browser.htm?open=658

## Error 330 流程

- 触发：Trial 用户尝试下载最近两个月缓存 key 视频
- CoApp 返回 Error 330
- 插件展示错误文案（多语言包），不扣减 Trial 次数
- 用户无法重试该视频（Trial 受限）
