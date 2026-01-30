# DRM 加密视频下载全流程详解 (The Ultimate Guide)

本文档将以 **Netflix / Amazon Prime** 为例，系统拆解一个 StreamFab 类的下载器是如何一步步把“在线加密视频”变成“本地无锁 MP4”的。

---

## 🗺️ 宏观流程图 (The Big Picture)

整个过程可以分为三个独立的阶段：
1.  **🕵️ 侦查阶段 (Sniffing & Analysis):** 搞清楚视频在哪里，有哪些格式。
2.  **🔑 授权阶段 (Licensing):** 拿到解密用的钥匙。**（最核心、最难的一步）**
3.  **📦 搬运阶段 (Download & Decrypt):** 搬运数据，并用钥匙开锁。

---

## 🟢 阶段一：侦查 (Sniffing)

**目标：** 获取视频的“菜单” (Manifest)。

1.  **环境模拟 (CEF Browser):**
    *   下载器会在后台启动一个 CEF (Chrome 内核) 浏览器，打开视频播放页。
    *   *目的：* 让 Netflix 以为这是一个真实的用户在看视频，从而下发数据。

2.  **流量拦截 (Network Hook):**
    *   下载器监听浏览器的所有网络请求，专门寻找 `.mpd` (DASH) 或 `.m3u8` (HLS) 后缀的文件。
    *   **Manifest 文件里有什么？**
        *   视频流地址列表 (Video Streams): 1080p, 720p, 480p...
        *   音频流地址列表 (Audio Streams): English 5.1, Japanese Stereo...
        *   **PSSH (Protection Header):** **非常重要！** 这是一个告诉 CDM “该去哪里拿钥匙”的信标数据。

3.  **Meta 弹窗:**
    *   下载器解析 Manifest，把可选的清晰度、音轨展示给用户。
    *   *注意：此时还没有进行任何破解，只是读取了公开的元数据。*

---

## 🟡 阶段二：授权 (Licensing)

**目标：** 拿到解密钥匙 (Content Key)。**这是成败的关键。**

1.  **构造 CDM 会话 (CDM Session):**
    *   下载器调用内置的 CDM 模块（通常是提取自真实设备的 Widevine L3 CDM），根据刚才拿到的 **PSSH** 初始化一个会话。

2.  **生成 Challenge (挑战书):**
    *   CDM 会生成一段加密的二进制数据 (License Request Challenge)。
    *   *含义：* “我是合法的播放设备，这是我的硬件指纹，我想申请 PSSH 里指定的那个视频的钥匙。”

3.  **发送请求 (License Request):**
    *   下载器将 Challenge 发送给 Netflix 的 License Server。
    *   **关键鉴权点：** 请求头必须携带当前浏览器的 **Auth Cookie / Token**。
    *   *服务端逻辑：* 验证 Cookie -> 验证账号会员状态 -> 验证 Challenge 合法性 -> **通过！**

4.  **接收并提取 Key (License Response):**
    *   服务端返回加密的 License Message。
    *   下载器喂给 CDM 模块，CDM 解密后吐出明文的 **Content Key (AES Key)**。
    *   *现在，你的内存里有了一串 16 字节的钥匙，比如 `0x1234abcd...`。*

---

## 🔴 阶段三：搬运与解密 (Download & Decrypt)

**目标：** 把加密的碎片变成完整的视频。

1.  **并发下载 (Concurrent Downloading):**
    *   根据 Manifest 里的地址，下载器开启多线程，疯狂拉取 `.m4s` 分片文件。
    *   *这些文件是加密的，直接用播放器打开全是花屏。*

2.  **实时解密 (On-the-fly Decryption):**
    *   每下载完一个分片（比如 `seg-1.m4s`），下载器立刻调用 AES-128-CTR 算法。
    *   **输入：** 加密分片 + **Content Key (阶段二拿到的)**。
    *   **输出：** 明文分片。

3.  **封装 (Muxing):**
    *   所有分片解密完成后，使用 FFmpeg 库将它们拼起来。
    *   把视频流、音频流、字幕流打包进一个 `.mp4` 或 `.mkv` 容器。

---

## 💡 总结与问答

### Q1: 为什么要模拟浏览器？
为了骗过服务端的“环境检测”。如果是纯 Python 脚本去请求，服务端一看没有浏览器指纹，直接拒绝服务。

### Q2: 钥匙是一次性的吗？
是的。通常一个视频对应一把钥匙（或者一组钥匙，视频/音频各一把）。一旦拿到，直到下载结束都有效。

### Q3: 为什么退出登录后不能下载？
因为**阶段二 (Licensing)** 必须要有 Cookie。
*   如果你在阶段一（Meta 分析）后退出了，阶段二就会拿不到钥匙，下载直接报错。
*   如果你在阶段三（下载中）退出了，因为钥匙已经在阶段二拿到了，所以通常**能继续下载成功**。
