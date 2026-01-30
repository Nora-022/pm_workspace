# StreamFab 技术逻辑深度解析：解密与下载流程

## 1. 你的理解修正 (Correction)

### ✅ 你说对的部分
1.  **CEF 环境:** 确实是利用 CEF (Chromium Embedded Framework) 模拟真实浏览器环境，骗过服务端的环境检测 (Widevine CDM)。
2.  **监听与 Copy:** 核心确实是 Hook 浏览器的 EME (Encrypted Media Extensions) 接口，拦截 `license_request`。
3.  **Meta 分析:** 在解析 MPD/M3U8 文件时，确实会拿到所有可用的清晰度、音轨、字幕列表供用户选择。

### ❌ 你理解偏差的部分（关键！）
> *"我再copy一份，发一份一样的解密请求，拿到秘钥... 每拉取一次分片都需要重新请求吗？"*

**这里存在两个误区：**
1.  **License 不是每片请求的：** License (Key) 通常是**Session 级别**的。拿到一次 Key，通常可以解密**整个视频**（或者很长一段时间的分片）。不需要每下载一个分片就去骚扰一次 License Server。
2.  **License Request 的时机：** 
    *   **Meta 分析阶段 (Analysis):** 此时主要请求的是 **Manifest (MPD/M3U8)**，这里面包含了视频结构信息（有哪些分辨率），但**不一定**立刻请求 License。有些下载器为了快，只在下载阶段才去拿 License。
    *   **下载阶段 (Download):** 这才是真正使用 License 解密数据的时刻。

---

## 2. 真实的 StreamFab 工作流 (The Real Workflow)

### Phase 1: 嗅探与分析 (Analysis)
1.  **用户打开页面:** CEF 加载 Netflix 播放页。
2.  **拦截 Manifest:** 插件 Hook 网络请求，拦截到 `.mpd` 或 `.m3u8` 文件。
    *   *此时我们知道了：哦，这个电影有 1080p, 720p, 还有 5.1 声道。*
3.  **构造 PSSH (Protection System Specific Header):** 从 Manifest 里提取出 DRM 初始化数据。
    *   *这一步还没拿到解密钥匙，只是拿到了“锁孔”的形状。*
4.  **弹窗:** 展示给用户选择（此时还没真正开始破解）。

### Phase 2: 获取许可 (License Acquisition) —— **最危险的一步**
1.  **用户点击下载:** 
2.  **构造 CDM Session:** StreamFab 在后台模拟一个 Widevine CDM 会话。
3.  **发送 License Request:** 
    *   **关键点：** 这个请求必须携带当前浏览器的 **Cookie / Auth Token**。
    *   **动作：** 向 Netflix License Server 发送请求（"给我钥匙"）。
    *   **结果：** 拿到 License (包含 Content Key)。
    *   *注意：如果此时用户 Logout，Cookie 失效，这一步直接 403 挂掉。*

### Phase 3: 下载与解密 (Download & Decrypt)
1.  **拉取分片:** 根据 Manifest 的地址，并发下载 `.m4s` 分片文件（加密的）。
    *   *这一步不需要 License Server 参与，只跟 CDN 打交道。*
2.  **本地解密:** 
    *   **下载下来的数据 + 刚才拿到的 License Key -> 解密算法 (AES-128-CTR) -> 明文视频数据。**
    *   *这个过程完全在本地内存中进行。*
3.  **合并 (Muxing):** 把解密后的视频轨、音频轨、字幕轨封装成一个 `.mkv` 或 `.mp4` 文件。

---

## 3. 结论：为什么 Logout 会导致下载失败？
回到你之前的疑惑：
> *"我理解是在用户meta分析之前就拿到了所有可用的音视频流，下载的时候直接根据用户选择拉取就行。"*

**不对。**
*   你拿到的是**“锁着的保险箱列表”**（音视频流地址）。
*   当你点击下载时，必须先去**“拿钥匙”**（License）。
*   **Logout 动作** 销毁了你的身份证明。
*   **结果：** 你能拉取到文件（保险箱），但你**永远拿不到钥匙**了。下载器发现没钥匙，自然就报错停止了。

**建议调整你的逻辑：**
必须明确 **“获取 Meta”** 和 **“获取 License”** 是两个分离的步骤。前者只需要 URL 访问权，后者需要严格的 DRM 认证权。
