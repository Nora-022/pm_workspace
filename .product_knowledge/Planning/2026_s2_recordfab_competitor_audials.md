# Audials 竞品调研（2025–2026）

## 背景

Audials 是德国 Audials AG 出品的流媒体录制套件，长期是 Windows 平台录制类产品的代表性竞品。本文记录其 2025 至 2026 年的产品迭代变化，并与 RecordFab 做技术层面对比。

---

## 一、2025 → 2026 最大变化：产品线重组

| | Audials 2025 | Audials 2026 |
|---|---|---|
| 产品结构 | 多产品并行：One / Movie / Music / Radio / Vision | **全部合并**为单一 Audials One，仅 Standard / Premium 两档 |
| 购买逻辑 | 按需购买对应产品 | 统一买 One，按功能深度选档位 |

Audials Movie、Music、Radio 从 2026 起停止单独销售。

---

## 二、定价

| 档位 | 买断价 | 年订阅 |
|---|---|---|
| Standard | $44.90 | $34.90/年 |
| Premium | $69.90 | $59.90/年 |

Standard 覆盖全部录制功能；Premium 额外加 AI 增强（视频超分、音频修复、人声分离）。

---

## 三、录制技术机制（基于技术团队逆向调研结论）

Audials **不是**普通屏幕录制，而是 GPU 层 + 音频驱动层 Hook：

1. 检测 Chrome 进程，若无 `--no-sandbox` 参数则强制重启
2. 定位 Chrome 子进程：GPU 进程（`--gpu-process`）和音频服务进程
3. 向两个进程注入 DLL：`VideoCapturerHook64.dll`（GPU）、`AudioCapturerHk64.dll`（音频）
4. 执行 Hook：GPU 进程 hook D3D API（`d3d11.dll`）；音频进程 hook WASAPI（`MMDevApi.dll`）
5. 创建命名管道传输裸 YUV/音频数据，两个 FFmpeg 进程读取管道并编码输出

**实际录制输出（从日志还原）**：输入为 raw video 1920×1080 yuv420p，输出为 libvpx 编码 webm，约 2Mbps。

官方声明"不绕过 DRM"具有误导性——它不解密流，但捕获的是 Widevine 解密后的渲染帧，实质上可以录制 DRM 内容。

---

## 四、2026 录制能力更新

- 视频录制支持 1080p，GPU 编码，自动识别帧率，录制速度最高 **4x**
- 音乐录制最高 96 kHz studio quality，速度 5x
- 广告检测算法改进
- 批量录制（Batch）：Netflix / Amazon / Disney+ 多集排队，但批量偶发掉集（用户主要投诉点）

**更新节奏**：主程序约 1–2 个月一个版本；Streaming Service 插件（站点兼容层）约 2 周更新一次。

---

## 五、2026 新增 AI 能力（Premium 专属）

| 功能 | 说明 |
|---|---|
| 云端视频超分 | 多 AI 模型，支持升至 4K，SDR→HDR |
| 帧插值 / 慢动作 | 消除卡顿，生成平滑慢动作 |
| AI 音频修复 | 对 MP3/AAC 等有损格式做质量增强 |
| AI 人声分离 | 分离人声/伴奏/鼓/贝斯 |
| AI Credits | 云端加速处理消耗积分，Premium 用户每月有免费额度 |

---

## 六、产品弱点（用户反馈）

- **黑屏问题持续**：D3D hook 依赖 GPU/驱动环境，Windows 更新后频繁出现录制黑屏，2021 年至今未根治
- **批量录制掉集**：Batch 功能稳定性差，高频投诉
- **UI 复杂度高**：15+ AI 模块让新用户迷失，Trustpilot 评分 3.9/5
- **完全锁死 Windows**：无 Mac、无移动端、无云端

---

## 七、与 RecordFab 技术对比

| 维度 | Audials | RecordFab |
|---|---|---|
| 录制原理 | D3D hook 捕获 GPU 解码后 YUV 帧，FFmpeg 重编码 | 网络层拦截 HLS/DASH 分片，Remux 封装 |
| 是否需要实时播放 | 是 | 是 |
| 输出质量 | 有损（YUV → 重编码，2Mbps libvpx） | 无损（原始分片直接封装） |
| DRM 内容 | 可录（D3D 层捕获解密后帧） | 不可走此路径（分片为密文） |
| 录制速度 | 最高 4x（非 DRM），DRM 内容仍需 1x | 最高 5x（GPU 硬件编码并行） |
| 系统侵入性 | 高：强制 Chrome --no-sandbox + DLL 注入 | 低：使用自有 CEF，不影响用户 Chrome |
| 稳定性依赖 | Chrome 进程结构、GPU 驱动、D3D 版本 | CEF 版本，相对隔离 |
