# 安全事件响应报告：VirusTotal 误报分析 (RecordFab)

| 属性 | 内容 |
| :--- | :--- |
| **事件 ID** | INC-20260115-001 |
| **报告日期** | 2026-01-15 |
| **严重等级** | 🟢 低 (Low Risk) |
| **涉及产品** | RecordFab (Win Client) |
| **反馈来源** | 市场部 |
| **当前状态** | 待处理 (Open) |

## 1. 事件背景 (Context)
市场部同事反馈，关注到 VirusTotal 平台对 RecordFab 下载链接的检测结果出现异常。此前未对该指标进行持续监控，目前需要建立档案并制定应对策略。

## 2. 问题事实 (Facts)
基于提供的截图信息，分析如下：
- **检测对象 (URL):** `https://dvdfab.cn/mlink/download.php?g=RecordFab`
- **检测时间:** 2026-01-15
- **检测结果:** **1/97** (仅 1 家厂商标记为 Malicious)
- **报警厂商:** **CRDF** (一家法国的安全威胁情报机构)
- **其他厂商状态:** 
    - 主流厂商（BitDefender, Avast, Google, Microsoft 等）均显示 **Clean (安全)**。
    - 状态码: 200 (正常访问)。
    - 内容类型: `binary/octet-stream` (二进制流/可执行文件)。

## 3. 原因分析 (Analysis)
**初步结论：极大概率为误报 (False Positive)。**

1.  **孤立报警:** 仅有 1 家非一线厂商报警，这通常是启发式扫描（Heuristic Analysis）过于敏感的表现，而非特征码匹配。
2.  **触发机制推测:**
    - **重定向链接:** URL 结构 `download.php?g=...` 属于动态重定向，某些安全引擎会将其视为潜在的钓鱼或恶意分发行为。
    - **新文件/低信誉:** 如果该版本的安装包刚发布不久，尚未积累足够的“用户信誉分”，容易被小众引擎标记。
    - **行为特征:** 安装包内的某些行为（如通过驱动层截获视频流）可能触碰了 CRDF 的敏感规则。

## 4. 应对策略 (Action Plan)

### Phase 1: 紧急响应 (立即执行)
- [ ] **人工申诉 (False Positive Submission):** 
    - 访问 CRDF 官网或通过 VirusTotal 的反馈通道，提交误报申诉。
    - 话术："This is a legitimate software installer for RecordFab. It is digitally signed and clean according to 96 other vendors. Please review and whitelist."
- [ ] **市场部同步:** 
    - 告知市场同事：目前仅为单点误报，不影响 Google/Microsoft 浏览器的安全评级，无需恐慌。
    - 承诺 3 个工作日内尝试消除该报警。

### Phase 2: 技术加固 (本周内)
- [ ] **检查数字签名:** 确认 EXE 文件的数字证书是否过期，是否使用了 EV 证书（增强型证书可大幅减少误报）。
- [ ] **URL 静态化 (可选):** 如果重定向链接持续被报毒，考虑提供直接的 `.exe` 结尾链接供检测。

### Phase 3: 流程优化 (长期)
- [ ] **发版前自测:** 在 CI/CD 流程中加入 VirusTotal API 扫描，发版前确保 0 报毒。

## 5. 附件
- 原始截图: (已归档)
