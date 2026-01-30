# 📘 DRM 视频加密与解密保存技术白皮书 (The DRM Architecture Whitepaper)

> **文档版本:** 1.0
> **最后更新:** 2026-01-29
> **适用场景:** 知识归档 / 技术复盘

---

## 1. 🛡️ 防御篇：视频加密机制 (The Shield)

### 1.1 核心目的
流媒体平台（Netflix, Disney+, Canal+ 等）为了保护版权内容不被盗版分发，建立了一套基于 **DRM (Digital Rights Management)** 的防御体系。

### 1.2 加密方案 (DRM Schemes)
为了覆盖所有用户设备，平台通常采用 **Multi-DRM** 策略，即对同一个视频文件，同时支持多种加密系统的“钥匙孔”。

| 方案名称 | 厂商 | 典型场景 | 安全分级 (Security Levels) |
| :--- | :--- | :--- | :--- |
| **Widevine** | Google | Chrome, Android, Firefox | **L1 (硬件级):** 4K/1080p<br>**L3 (软件级):** 720p/540p |
| **PlayReady** | Microsoft | Edge, Windows, Xbox | **SL3000 (硬件级):** 4K/1080p<br>**SL2000 (软件级):** 720p |
| **FairPlay** | Apple | Safari, iOS, tvOS | 硬件级绑定 |

### 1.3 核心原理
*   **AES-128 Encryption:** 视频内容本身使用 AES-128 对称加密算法进行加密。没有钥匙，视频就是一堆乱码。
*   **PSSH (Protection System Specific Header):** 视频文件头部的“元数据盒子”，里面装着 Key ID 和各个 DRM 系统所需的特定信息。

---

## 2. 🕵️‍♂️ 侦察篇：客户端环境模拟 (The Client Simulation)

以 **StreamFab** 为代表的下载工具，首先要在本地伪装成一个合法的“播放器”。

### 2.1 环境构建 (CEF Integration)
*   **CEF (Chromium Embedded Framework):** 工具内嵌了一个完整的浏览器内核。
*   **作用:**
    1.  **账号登录:** 让用户在内嵌浏览器中登录，获取合法的 **Auth Token / Cookie**（这是向服务器证明“我买了会员”的唯一凭证）。
    2.  **环境仿真:** 模拟真实浏览器的 User-Agent 和指纹，降低被反爬虫系统识别的风险。

### 2.2 情报获取 (Manifest Sniffing)
*   **动作:** 当 CEF 开始加载视频播放页时，工具会在后台拦截网络请求。
*   **目标:** 捕获 **MPD (DASH Manifest)** 或 **M3U8 (HLS Playlist)** 文件。
*   **解析:** 
    *   **Video Tracks:** 解析所有可用的分辨率 (1080p, 720p) 和编码 (H.264, H.265)。
    *   **Audio Tracks:** 解析所有音轨 (English, Atmos) 和字幕。
    *   **PSSH:** 提取加密头信息，用于后续申请钥匙。

---

## 3. ☁️ 突击篇：云端密钥交换 (The Key Exchange)

这是整个流程中最核心的“偷天换日”环节。本地客户端搞不定的 L1 认证，交给云端服务器完成。

### 3.1 策略路由 (Strategy Routing)
*   **输入:** 用户选择了 `1080p` 画质。
*   **逻辑:** 客户端判断 `1080p` 需要 `Widevine L1` 级别的 CDM。
*   **调度:** 将请求发送给云端持有 L1 证书的服务器（伪装成一台 Pixel 3 手机或 4K 电视）。

### 3.2 伪装请求 (License Request)
云端服务器向 Netflix License Server 发起请求。Payload 包含：
1.  **Device Certificate:** 真实的 L1 设备证书（包含 Device ID, System ID）。
2.  **PSSH Data:** 从 Manifest 提取的“购物清单”（我要申请 Key ID `xyz`）。
3.  **Auth Token:** 用户的会员凭证。
4.  **Challenge:** 一个加密的挑战包，证明自己是正版 CDM。

### 3.3 密钥解密 (Key Decryption)
1.  **Netflix 验证:** 验证设备证书合法、用户有权观看。
2.  **发放 License:** Netflix 返回一个 License Response。
    *   *注意：此时里面的 Content Key 是被 **CDM 的公钥** 加密过的。*
3.  **云端解密:** 云端服务器使用 **CDM 的私钥** 解开 License，拿到原始的 **明文 Content Key** (通常是 16 字节的 Hex 字符串)。

---

## 4. 📦 搬运篇：下载与解密 (Download & Decrypt)

为了节省带宽和提高速度，**“下载大文件”** 的工作由用户本地电脑完成，云端只负责传递 **“微小的钥匙”**。

### 4.1 密钥回传 (Key Delivery)
*   云端将明文 Content Key 通过加密通道回传给本地 StreamFab 客户端。
*   *(可选优化: 将 Key 存入云端缓存数据库，供下一个用户复用)*

### 4.2 分片下载 (Segment Download)
*   **CDN 直连:** StreamFab 根据 Manifest 里的 URL，直接从 Netflix 的 CDN 下载 `.m4f` (视频) 和 `.m4a` (音频) 分片。
*   **特性:** 此时下载的文件依然是加密的。

### 4.3 本地解密 (Local Decryption)
*   StreamFab 使用从云端拿到的 Content Key，对下载的每一个分片进行 AES-128 解密。
*   **产物:** 此时得到了裸流 (Raw Stream)，如 `.h264` 视频流和 `.ac3` 音频流。

---

## 5. 🎬 组装篇：成品输出 (Muxing)

### 5.1 封装 (Remuxing)
*   **工具:** 调用内嵌的 **FFmpeg**。
*   **动作:** 将解密后的 视频流 + 音频流 + 字幕流 打包放入同一个容器。
*   **Result:** 生成最终的 `.mp4` 或 `.mkv` 文件。

### 5.2 元数据写入 (Metadata)
*   写入电影标题、封面图、演员表等信息。

---

## 🏆 流程全景图 (The Architecture Map)

```mermaid
graph TD
    subgraph Client_PC [用户本地电脑 (StreamFab)]
        CEF[1. CEF 内嵌浏览器]
        Parser[2. Manifest 解析器]
        Downloader[5. 分片下载器]
        Decrypter[6. 解密引擎]
        FFmpeg[7. 混流合成]
    end
    
    subgraph Cloud_Server [StreamFab 云端服务]
        Router[3. 策略路由]
        L1_CDM[4. L1 CDM 矩阵]
        KeyDB[(Key 缓存数据库)]
    end
    
    subgraph Netflix_System [Netflix 官方系统]
        Web[Web 页面]
        License[License Server]
        CDN[CDN 内容分发]
    end
    
    %% 流程连线
    CEF -->|登录并获取 Auth| Web
    CEF -->|拦截 MPD| Parser
    Parser -->|提取 PSSH & KeyID| Router
    
    Router -->|查询缓存| KeyDB
    KeyDB -.->|Hit: 直接返回 Key| Decrypter
    
    Router -->|Miss: 调度 L1 请求| L1_CDM
    L1_CDM -->|发送 License Request| License
    License -->|返回加密 Key| L1_CDM
    L1_CDM -->|私钥解密出明文 Key| Decrypter
    L1_CDM -.->|写入缓存| KeyDB
    
    Parser -->|解析分片 URL| Downloader
    Downloader -->|下载加密分片| CDN
    CDN -->|加密数据| Decrypter
    
    Decrypter -->|原始流 + Key| FFmpeg
    FFmpeg -->|最终成品| File[(MP4 文件)]

---

## 6. 🏴‍☠️ 溯源篇：云端的 CDM 从何而来？ (The Supply Chain)

> **"云端服务器里的那些 L1 证书，是凭空变出来的吗？"**

**不是。它们源自真实的物理设备。** 这是一个基于“硬件漏洞挖掘”的供应链。

### 6.1 本质 (What is it?)
你在云端部署的不是一个通用的软件，而是 **“特定设备的数字灵魂”**。
它包含两个核心文件：
1.  **client_id.bin:** 设备的身份证（型号、序列号、支持的 DRM 等级）。
2.  **private_key.pem:** 设备的私钥（绝对核心，用于解密 License）。

### 6.2 来源 (The Origin)
*   **L3 CDM (低清):**
    *   **来源:** Android 手机、Chrome 浏览器。
    *   **难度:** 低。通过 Root 手机或逆向浏览器代码即可提取。
    *   **现状:** 泛滥，几乎无成本。

*   **L1 CDM (高清/4K):**
    *   **来源:** **真实的、通过 Google 认证的硬件设备**（如特定的 Android 手机、智能电视盒子）。
    *   **提取方式:** 必须利用 **TEE (Trusted Execution Environment) 硬件漏洞**。
    *   **过程:** 黑客/研究员购买物理设备 -> 寻找芯片漏洞 -> 攻破 TEE 隔离区 -> 将出厂预置的 Private Key 提取出来 (Dump) -> 上传到云端服务器。

### 6.3 消耗与维护 (Revocation & Maintenance)
*   **封号机制:** 如果 Netflix 发现这台 "Pixel 3" 每天申请了 10 万次 License，就会将其标记为异常。
*   **吊销 (Revocation):** Google 会通过 CRL (证书吊销列表) 废除该设备的证书。
*   **补货:** 一旦被封，这组 CDM 就废了。服务商必须寻找新的硬件漏洞，提取新的设备证书来替换。这就是为什么有时候 StreamFab 会暂时失效（等待新 Key 补货）。

```
