# 实战指南：如何识别网站的 DRM 类型并选择策略？

作为开发者，当你拿到一个新的流媒体网站（比如 "AbcMovie.com"）时，你不能瞎猜。你需要像医生看病一样，通过**抓包诊断**来确定它用了什么加密，然后对症下药。

---

## 🔍 第一步：抓包诊断 (Diagnosis)
打开 Chrome 开发者工具 (F12) -> Network 面板，过滤关键词。

### 1. 过滤关键词：`m3u8` 或 `mpd`
这是视频的“地图文件”。
*   **情况 A：** 只有 `.mp4` / `.flv` 直链。
    *   **结论：** **无加密** (Level 0)。
    *   **策略：** 直接下载 URL。
*   **情况 B：** 看到 `.m3u8`，点开 Response 内容。
    *   如果里面有 `#EXT-X-KEY:METHOD=AES-128,URI="key.php"`。
    *   **结论：** **HLS AES-128** (Level 1)。
    *   **策略：** 普通下载器，只需带上 Cookie 请求那个 URI 拿到 Key 即可。
*   **情况 C：** 看到 `.mpd` (DASH 协议) 或 m3u8 里有 `KEYFORMAT="urn:uuid:edef8ba9-..."`。
    *   **结论：** **DRM 加密** (Level 2+)。
    *   **下一步：** 需要进一步判断是哪家 DRM。

### 2. 过滤关键词：`license` 或 `widevine`
如果在 Network 里看到了向 `widevine.com`、`license.adobe.com` 或类似 `.../license` 接口的 POST 请求，且 Payload 是一堆乱码（二进制数据）。
*   **结论：** **确认使用了 DRM。**

---

## 🧬 第二步：辨别 DRM 门派 (Identification)
通过 MPD 文件里的 `SystemID` (一串 UUID) 来识别：

| SystemID (UUID) | DRM 类型 | 常见网站 | 难度等级 |
| :--- | :--- | :--- | :--- |
| `edef8ba9-79d6-4ace-a3c8-27dcd51d21ed` | **Widevine** | Netflix, Amazon, HBO, Disney+ | ⭐⭐⭐ |
| `9a04f079-9840-4286-ab92-e65be0885f95` | **PlayReady** | Microsoft, Peacock (部分) | ⭐⭐⭐ |
| `94ce86fb-07ff-4f43-adb8-93d2fa968ca2` | **FairPlay** | Apple TV+, iTunes | ⭐⭐⭐⭐ |
| `F239E769-EFA3-4850-9C16-A903C6932EFB` | **Adobe PrimeTime** | 也就是 Flash 时代的遗物，现已少见 | ⭐⭐ |

**最常见的情况：** 你会看到 `edef8ba9...` (Widevine)。

---

## 🛠️ 第三步：制定攻坚策略 (Execution)

一旦确认是 **Widevine** (绝大多数情况)，你的决策树如下：

### 分支 1：能否“伪装 L3”？ (StreamFab 核心逻辑)
1.  **尝试：** 使用你的 **Android L3 CDM** 构造一个 License Request 发给服务器。
2.  **观察：** 服务器返回 200 OK 还是 403 Forbidden？
    *   **200 OK:** 恭喜！该网站允许 L3 设备访问。
        *   **结果：** 可以下载，最高 1080p。
    *   **403 / Error:** 服务器配置了 `L1 Required` (强制 L1)。
        *   **例子：** Netflix 的 4K 视频流，或者某些体育直播的高码率频道。
        *   **策略：** 没戏了。只能**降级**去申请 720p 的流，或者切换到**录屏模式**。

### 分支 2：是否有“网页版入口”？ (针对 Apple FairPlay)
如果你发现是 FairPlay (Apple TV+)：
1.  **思考：** 我没法搞定苹果的 DRM。
2.  **尝试：** 这个网站有没有 Chrome 网页版？
3.  **行动：** 用 Chrome User-Agent 访问它的网页版。
    *   通常网站为了兼容 PC 用户，会在网页版里**切换回 Widevine**。
    *   **结果：** 回到 Widevine 的流程，继续用 L3 伪装法搞定。

---

## 📊 总结：开发者自查表

当你拿到一个 URL 时，按这个顺序查：

1.  **看后缀：** mp4? -> 直接下。
2.  **看 m3u8：** 有 `#EXT-X-KEY` 且没 uuid? -> **Level 1 (AES-128)** -> 下 Key 解密。
3.  **看 UUID：** 是 `edef8ba9`? -> **Level 2 (Widevine)**。
    *   **试探：** 用 L3 CDM 发包。
    *   **成功？** -> 下载。
    *   **失败？** -> 放弃高画质，找低画质流。
4.  **看 UUID：** 是 `94ce86fb` (FairPlay)? -> **Level 4**。
    *   **策略：** 找网页版入口，逼它切 Widevine。
