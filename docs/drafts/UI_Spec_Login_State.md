# UI 交互规范：未登录状态下的任务列表 (Downloading vs Queueing)

## 1. 核心策略
**分而治之 (Divide and Conquer):**
*   **Downloading 区 (正在跑):** 保持原样，让它跑完。
*   **Queueing 区 (排队中):** **清空列表，强占位提示。**

---

## 2. 界面状态定义 (UI States)

### 场景：用户中途退出 Netflix 账号

#### A. Downloading 区域 (左侧/上方)
*   **状态:** ✅ 保持显示当前正在下载的任务。
*   **样式:** 
    *   进度条继续走动。
    *   (可选) 在任务卡片角落加一个小黄点/警告标 `⚠️`，Hover 提示："账号已退出，无法自动开始下一个任务"。

#### B. Queueing / Waiting 区域 (右侧/下方)
*   **状态:** 🚫 **隐藏所有待下载任务卡片** (不要让用户看到它们，以免产生误解)。
*   **样式 (Empty State Placeholder):**
    *   显示一个全尺寸的占位图 (Illustration)。
    *   **图标:** 🔒 (锁) 或 👤 (用户头像)。
    *   **主标题:** "Login Required / 需要登录"
    *   **副标题:** "Please log in to Netflix to view and start pending downloads." (请登录 Netflix 以查看和启动排队任务)
    *   **按钮 (CTA):** [Log In to Netflix] -> 点击跳转内置浏览器。

---

## 3. 恢复逻辑 (Recovery)
当用户重新登录成功后：
1.  **Queueing 区域:** 立即移除占位图，**重新渲染**之前的排队任务列表。
2.  **任务状态:** 自动检查队首任务，尝试启动下载 (Request License)。

## 4. 优势分析
这种设计极其**聪明**：
1.  **防误触:** 用户看不见待下载任务，就没法点“开始”，从根源上杜绝了 403 报错。
2.  **强引导:** 巨大的占位图逼迫用户去登录，解决了问题的根本。
3.  **情绪管理:** 比起看到一排红色的 "Failed"，看到一个冷静的 "Please Login" 提示，用户的挫败感要低得多。
