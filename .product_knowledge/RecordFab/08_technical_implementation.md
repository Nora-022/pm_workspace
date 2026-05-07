# 08 技术实现方案（Technical Implementation）

本文件只记录已确认的技术事实，来源为内部接口文档与技术调研文档。未确认或待修复问题见 `09_technical_open_issues.md`。

## 信息源

| 编号 | 文档标题 | 飞书链接 |
|---|---|---|
| S1 | RecordFab 录制模式 接口文档 | https://i6a1sqw3p2.feishu.cn/wiki/A1F4wDxyxivlLnk006KcMfKAnJf |
| S2 | RecordFab 5倍速调研 | https://i6a1sqw3p2.feishu.cn/wiki/QuZjw8al0iQwT0kJCWdcFnqanf4 |
| S3 | RecordFab CPU编码和硬件编码对比 | https://i6a1sqw3p2.feishu.cn/wiki/VlN6wVDIOiAOpvksHCDc8cfInEh |
| S4 | RecordFab 判断结束技术文档 | https://i6a1sqw3p2.feishu.cn/wiki/VrpKdLD39owYGAxzMn6cdUaEnHf |

---

## 核心架构

RecordFab 使用 CEF（Chromium Embedded Framework）作为内嵌浏览器，录制引擎核心接口为 `IRecorder`，通过 `RegisterBrowser(QCefWebView* page)` 与 CEF 实例绑定。`[S1]`

整体数据流：

```
用户在 CEF 内打开视频页面
        ↓
IRecorder.StartAnalyzeMeta()  ← CEF render process 检测 HLS/DASH 流，提取 title / playbackUrl / TotalTime
        ↓
用户触发录制，IRecorder.StartRecord()
        ↓
IRecorder 拦截 TS/fMP4 分片数据（网络层拦截，非屏幕捕获，非重编码）
        ↓
IRecorder.Remux  ← 分片重新封装为 MP4，无质量损失
        ↓
写入本地文件，GetFileFullPath() 返回路径
```

## IRecorder 接口定义 `[S1]`

```cpp
// 录制状态
enum ERecordStatus {
    ERecord_None, ERecord_Prepare, ERecord_Recording,
    ERecord_Remux, ERecord_Successed, ERecord_Failed,
    ERecord_Abort_Successed, ERecord_Abort_Canceled
};

// Meta 检测状态
enum ERecordMetaStatus {
    ERecordMeta_DetectingVideo,
    ERecordMeta_VideoDetected_Support,
    ERecordMeta_VideoDetected_Unsupport,
};

struct RecordConfig {
    std::string outPath;
    std::string playbackUrl;
    double rate;              // 录制倍速
    EVideoResolution eResolution;
};

struct RecordMetaItem {
    std::string title;
    std::string playbackUrl;
    int TotalTime;            // 视频总时长，部分站点无法获取
};

class IRecorder {
    virtual void RegisterBrowser(QCefWebView* page) = 0;
    virtual void StartAnalyzeMeta() = 0;
    virtual void AbortAnalyzeMeta() = 0;
    virtual void SetRecordConfig(const RecordConfig& config) = 0;
    virtual void StartRecord() = 0;
    virtual void AbortRecord(bool bAsSuccess = false) = 0;
    virtual ERecordStatus GetStatus() = 0;
    virtual double GetRate() = 0;
    virtual int64_t GetCurrentTime() = 0;
    virtual int64_t GetTotalTime() = 0;
    virtual int GetRemuxProgress() = 0;   // 0–100
    virtual std::string GetFileFullPath() = 0;
    virtual ErrorCode GetErrorCode() = 0;
};

IRecorder* CreateRecorder(std::string strUrl);
```

## 录制方式：流拦截 + Remux `[S1]`

- 在 CEF 网络层直接拦截 HLS/DASH 的 TS 分片（每片 2–10s），收集后 Remux 封装为 MP4
- **不是屏幕录制，不是重编码**，输出无质量损失，CPU 占用远低于重编码方案
- 视频必须在 CEF 内实际播放，录制依赖播放产生的实时数据流
- DRM 加密内容（Widevine 等）无法通过此路径处理，分片本身是密文

## 并行录制限制 `[S1]`

同一个网站只能打开一个 tab 页（架构约束），IRecorder 以 CEF 实例为单位绑定，**不支持对同一站点并发录制**。

## 倍速录制与硬件编码 `[S2][S3]`

5x 速率录制与 GPU 硬件加速均已上线（截至 2026-04）。

| 录制模式 | CPU 占用 | GPU 占用 | 卡顿 |
|---|---|---|---|
| 5x 纯播放（不录制） | ~50% | ~10% | 无 |
| **5x + 硬件编码录制** | ~50% | ~35% | **无** |
| 5x + CPU 软件编码录制 | ~80% | ~10% | 严重 |

测试环境：U-NEXT，1080p 输出，RTX 4060 Ti `[S3]`

根因：CPU 软件编码为非异步流程，阻塞播放线程；GPU 硬件编码可并行执行，不干扰播放。`[S2]`

竞品参考：CleverGet（Qt6 + CEF 137）已支持软硬件编码结合的 5x 录制，无卡顿。`[S2]`

## 录制结束检测 `[S4]`

IRecorder 通过以下三种方式组合判断录制结束：

**方法一：URL 变更检测**  
部分站点切集时改变页面 URL，检测到变化即触发结束。

**方法二：时长吻合检测**  
`currentTime == totalTime` 时判断结束。  
限制：仅在 `totalTime > 200s` 时触发（200s 为已知最长广告时长，防止广告结束被误判）。

**方法三：无数据超时**  
一段时间内无新分片数据，认为流已结束。

## Meta 分析 `[S1]`

`StartAnalyzeMeta()` 在 CEF render process 中嗅探视频流，提取：

| 字段 | 用途 |
|---|---|
| `title` | 输出文件命名 |
| `playbackUrl` | 流地址，用于后续拦截 |
| `TotalTime` | 录制结束检测方法二的依据 |

Meta 分析是录制入口的前置条件，未通过检测（`VideoDetected_Unsupport`）的内容不显示录制按钮。
