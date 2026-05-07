# 用户流程

## 主流程（Happy Path）

1. 用户在任意网页触发插件
2. **插件页面结构判断**：是否为视频页
   - 否 → 直接显示不支持，流程终止
3. **CoApp 分析**（最长 20 秒）
   - 插件上报 tab / url / response_data
   - CoApp 返回分析进度（LoadingDialog 接口）
4. **分析结果**：
   - 支持下载 → Detected 展示视频卡片
   - 不支持 / 超时 → 插件弹窗内引导 StreamFab 客户端
   - 分析失败 → Toast 提示（见错误处理）
5. 用户选择配置（Resolution / Language / Subtitles）
6. 发起下载 → CoApp 执行下载、解密、remux
7. 插件展示下载进度与结果

## 下载任务调度

- 串行执行（并发 1）
- FIFO
- Retry 回队头，按当前余量重新判断

## 登录中断流程

| 当前状态 | 处理 |
|---|---|
| Detected 有视频 | 不允许启动新任务 |
| Detected 为空 | 提示登录 |
| Downloading | 允许继续 |
| Failed | 禁止重试 |
| Downloaded | 保留展示 |
