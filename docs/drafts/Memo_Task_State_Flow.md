# StreamFab 任务状态流转分析 (Task State Transition)

你提供的状态链条：
`Analyze` -> `Download Audio` -> `Download Video` -> `Processing` -> `Remux`

这个流程大致正确，但有两个关键点需要**修正**和**补全**，才能准确反映 DRM 视频下载的真实技术路径。

## 1. 状态修正建议 (Refinement)

### ❌ 问题 1: Audio 和 Video 通常是并发的
StreamFab 为了效率，通常不会傻傻地先下完音频再下视频。
*   **修正:** `Downloading` (Audio/Video 并行)。
*   **UI 表现:** 进度条是整体进度的加权平均。

### ❌ 问题 2: Decrypt (解密) 去哪了？
解密是 DRM 下载的核心。虽然它通常是在下载过程中实时发生的 (On-the-fly)，但在某些高负载场景下，可能会有一个短暂的后处理状态。
*   **修正:** 包含在 `Downloading` 内部，或者在 `Processing` 阶段。

## 2. 建议的标准状态流 (Standard Workflow)

| 状态 (State) | 内部动作 (Internal Actions) | 关键依赖 |
| :--- | :--- | :--- |
| **1. Analyzing**<br>(分析中) | 解析 Manifest，获取分辨率/音轨列表。 | 网络访问 (无 DRM) |
| **2. Queued**<br>(排队中) | 等待用户点击下载，或等待线程池空闲。 | **需要登录态 (Login)** |
| **3. Starting**<br>(启动中) | **🔥 关键时刻：** 请求 DRM License。 | **需要登录态 (Login)** |
| **4. Downloading**<br>(下载中) | 并发拉取 Video/Audio 分片 + **实时解密**。 | 宽带 + License (已获取) |
| **5. Processing**<br>(处理中) | 校验文件完整性，处理字幕转换 (SRT/Remux)。 | CPU / 磁盘 IO |
| **6. Remuxing**<br>(混流中) | 调用 FFmpeg 将音轨、视轨、字幕封装成 MP4/MKV。 | CPU / 磁盘 IO |
| **7. Completed**<br>(完成) | 移动文件到输出目录，清理临时文件。 | - |

## 3. 为什么你的流程里有 `Processing`？
在 StreamFab 里，`Processing` 通常指的是：
1.  **广告去除 (Ad Removing):** 比如 Amazon Prime 的片头广告。
2.  **字幕渲染:** 把图形字幕 (VobSub) 转成文本字幕 (SRT)。
3.  **音频转码:** 把 EAC3 转成 AAC (为了兼容性)。

所以，你的流程可以优化为：
`Analyzing` -> `Downloading` (含音视频) -> `Processing` (转码/去广告) -> `Remuxing` (封装) -> `Success`
