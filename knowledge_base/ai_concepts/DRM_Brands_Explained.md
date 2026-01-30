# 🔐 DRM 品牌与 CDM 的关系：一把钥匙开一把锁

别被这些英文缩写绕晕了。我们用最通俗的 **“锁和钥匙”** 的比喻来拆解它们。

---

## 1. 核心概念：三个层级

要理解 Widevine 和 PlayReady，我们得先把它们放在正确的位置上：

| 层级 | 概念 | 比喻 | 例子 |
| :--- | :--- | :--- | :--- |
| **L1: 协议标准** | **DRM System** | **锁的品牌** (不同品牌的锁芯结构完全不同) | Widevine (Google牌), PlayReady (微软牌) |
| **L2: 软件模块** | **CDM** | **钥匙/开锁匠** (专门用来开某种品牌锁的工具) | Widevine CDM, PlayReady CDM |
| **L3: 硬件设备** | **Device** | **房子** (安装了某种锁的载体) | Android 手机, Windows 电脑 |

---

## 2. Widevine 和 PlayReady 是什么？

它们是 **互不兼容的两种加密技术标准**（也就是两家对立的安保公司）。

### 🟢 Widevine (Google 阵营)
*   **谁家的？** Google。
*   **谁在用？** 所有的 **Android 手机**、**Chrome 浏览器**、Chromecast 电视棒。
*   **特点：** 只要是安卓设备，出厂时里面就强制内置了 Widevine 的“锁芯”。
*   **地位：** 移动端的霸主。

### 🔵 PlayReady (Microsoft 阵营)
*   **谁家的？** Microsoft。
*   **谁在用？** 所有的 **Windows 电脑**、**Edge 浏览器**、Xbox 游戏机。
*   **特点：** 只要是 Windows 系统，里面就内置了 PlayReady 的底层支持。
*   **地位：** PC 和机顶盒领域的霸主。

> **关键点：** Netflix 服务器里存放的视频文件，通常会准备两份拷贝（或者两种加密头）：一份是用 Widevine 锁住的（给安卓看），一份是用 PlayReady 锁住的（给 Windows 看）。

---

## 3. 它们在 CDM 中充当什么角色？

你问：“它们在 CDM 中充当什么角色？”
其实 **CDM 就是它们的“肉身”**。

**CDM (Content Decryption Module)** 是一个通用的黑盒子名字。
具体到某个阵营，它就有了具体的姓氏：

*   **Widevine CDM:** 这是一个专门懂 Google 加密算法的 `.so` 或 `.dll` 文件。它**只能**解开 Widevine 的锁。如果你给它一个 PlayReady 的锁头，它会直接报错：“看不懂，不认识”。
*   **PlayReady CDM:** 这是一个专门懂微软加密算法的模块。它**只能**解开 PlayReady 的锁。

### 举个例子：StreamFab 的工作流

1.  **用户:** “我要下 Netflix。”
2.  **StreamFab (云端):** “好的，我先看看 Netflix 给我发的是什么锁。”
    *   **情况 A:** Netflix 发来了一个 **Widevine PSSH** (Google 锁头)。
    *   **StreamFab:** “哦，是 Google 的锁。**启动 Widevine CDM 模块！**” (派出懂 Google 技术的翻译官)。
    *   **结果:** 解密成功。

    *   **情况 B:** Netflix 发来了一个 **PlayReady Header** (微软锁头)。
    *   **StreamFab:** “哦，是微软的锁。**启动 PlayReady CDM 模块！**” (派出懂微软技术的翻译官)。
    *   **结果:** 解密成功。

---

## 4. 总结

*   **Widevine / PlayReady** = **两门不同的外语** (英语 / 法语)。
*   **CDM** = **翻译官**。
*   **Widevine CDM** = **只懂英语的翻译官**。
*   **PlayReady CDM** = **只懂法语的翻译官**。

StreamFab 的云端厉害在：它养了一个**翻译团队**，既有懂英语的，又有懂法语的。碰到什么语言的文件，就派什么翻译官上场。
