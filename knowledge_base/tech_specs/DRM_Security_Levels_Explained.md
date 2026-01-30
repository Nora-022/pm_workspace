# DRM 安全分级技术规范 (Security Level Specification)

本文档旨在从技术角度明确 Widevine 与 PlayReady 的安全分级标准及其对视频流质量的影响。

## 1. Google Widevine DRM

Widevine 是 Google 提供的跨平台 DRM 解决方案，通过 **Protobuf** 协议进行许可证交互。

| 安全等级 (Security Level) | 实现机制 (Implementation) | 密钥处理 (Key Handling) | 视频路径 (Video Path) | 典型画质上限 |
| :--- | :--- | :--- | :--- | :--- |
| **L1** (Level 1) | **Hardware TEE** | 密钥解密与内容解密均在 **TEE (Trusted Execution Environment)** 硬件隔离区内完成。 | **Secure Video Path (SVP)**<br>解密后的视频帧直接送入受保护的显存，CPU/OS 无法访问明文帧。 | **4K (UHD) / 1080p** |
| **L3** (Level 3) | **Software Obfuscation** | 密钥解密与内容解密在 **OS 用户态 (User Space)** 通过软件完成。代码经过混淆保护。 | **Clear Video Path**<br>解密后的视频帧短暂暴露在系统内存中，存在被 Hook 或 Dump 的风险。 | **720p (HD) / 540p (SD)**<br>*注：Netflix/Canal+ 对 L3 设备通常限制在 720p 以下。* |

## 2. Microsoft PlayReady DRM

PlayReady 是 Microsoft 提供的 DRM 解决方案，深度集成于 Windows OS，通过 **SOAP/XML** 协议交互。

| 安全等级 (Security Level) | 实现机制 (Implementation) | 密钥处理 (Key Handling) | 视频路径 (Video Path) | 典型画质上限 |
| :--- | :--- | :--- | :--- | :--- |
| **SL3000** | **Hardware TEE** | 类似于 Widevine L1。依赖 CPU/GPU 的硬件安全模块。 | **Secure Video Path (SVP)**<br>全链路硬件保护。 | **4K (UHD)** |
| **SL2000** | **Software Hardened** | 类似于 Widevine L3，但利用了 Windows 内核 (Kernel) 的部分特性进行加固。 | **Clear Video Path**<br>虽然也是软件解密，但由于 Microsoft 对 Windows 内核的掌控，其防破解能力被片方认为略高于 L3。 | **1080p (FHD)**<br>*注：这是 PC 端获取 1080p 的关键。* |

## 3. 技术决策矩阵 (Decision Matrix)

针对 **RecordFab (PC 端)** 的架构选型依据：

| 浏览器内核 | DRM 客户端 | 支持的安全等级 | 平台信任度 | Canal+ 响应策略 |
| :--- | :--- | :--- | :--- | :--- |
| **Chrome (CEF)** | Widevine CDM | **L3** (纯软件) | 低 (Low Trust) | **Limit to 720p** |
| **Edge (WebView2)** | PlayReady CDM | **SL2000** (软件加固) | 中 (Medium Trust) | **Allow 1080p** |

### 结论
*   **L1** 与 **SL3000** 均属于**硬件级安全**，在通用 PC 软件中无法模拟。
*   **L3** 与 **SL2000** 均属于**软件级安全**。
*   **核心差异：** 在 Windows 平台上，流媒体厂商 (如 Netflix/Canal+) 的策略配置通常允许 **PlayReady SL2000** 播放 1080p，而限制 **Widevine L3** 仅播放 720p。这是由商业信任链决定的，而非纯粹的技术算力差异。
