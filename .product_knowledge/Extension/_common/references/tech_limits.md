# 技术约束基线（Technical Constraints）

> 跨插件共用的系统要求、浏览器兼容性、CoApp 依赖、DRM 边界、并发上限
> 单插件特殊技术约束（如分辨率上限、特定编码）写入插件 `diff_summary.md` + `requirements/`
> 关联：[platform_diffs.md](platform_diffs.md)、[baselines/netflix_mode.md](baselines/netflix_mode.md)、[baselines/ytdlp_mode.md](baselines/ytdlp_mode.md)

---

## 一、系统与平台要求

| 项 | 支持范围 |
| --- | --- |
| Windows | 10 / 11（推荐 64 位） |
| macOS | 11.0+（功能可用，UI 大面对齐 Win 版） |
| 不支持 | Linux / Android / iOS |

---

## 二、浏览器兼容性

| 浏览器 | 状态 |
| --- | --- |
| Google Chrome | 最新稳定版 |
| Microsoft Edge | 最新稳定版 |
| 其他 Chromium | 理论支持 Manifest V3 + Native Messaging，不做官方保证 |

---

## 三、CoApp 依赖

- 必须安装并运行 StreamFab CoApp（Native Host）
- 插件通过 Native Messaging 与 CoApp 通信
- 未安装 CoApp 时插件无法下载视频（扩展沙盒限制文件系统访问与高质量流合并能力 FFmpeg）

CoApp 区分：

- `StreamFab Video Coapp` —— ytdlp_mode 通用
- `StreamFab <SiteName> Coapp` —— netflix_mode 各站点专用（如 `StreamFab Netflix Coapp`）

---

## 四、DRM 边界

| 模式 | DRM 下载 |
| --- | --- |
| netflix_mode | ✅（站点支持范围内，由 CoApp 实现） |
| ytdlp_mode（Video） | ❌（统一显示 `Protected Video Content`，引导桌面客户端） |

DRM 实现层：Widevine / PlayReady / FairPlay 由各站点 CoApp 处理，插件层不参与 key 处理。

---

## 五、网络要求

需要可用网络用于：

- License 校验
- 视频分析
- 视频下载

---

## 六、并发与队列上限

| 维度 | netflix_mode | ytdlp_mode |
| --- | --- | --- |
| 最大并发下载 | `1` | `5` |
| 超并发处理 | — | 自动 Pending，不报错 |
| Detected 上限 | `50`（单 Origin） | 受面板高度约束（多 Origin 隔离） |
| Downloaded 历史 | 不限 | `20`（超出移除旧记录，磁盘文件保留） |

---

## 七、超时与重试

- 网络错误：支持手动 `Retry`
- 授权故障：网络类失败可重试；硬限制（设备上限等）直接失败提示
- CoApp 分析超时（M3U8 变体）：`20` 秒；超时引导客户端

---

## 八、视频能力上限

| 维度 | 上限 |
| --- | --- |
| ytdlp_mode 视频画质 | 最高 8K HDR |
| ytdlp_mode 音频 | 320 kbps |
| netflix_mode 视频画质 | 由各站点 / 各 codec 决定，写入插件 `diff_summary.md` |

---

## 九、批量下载

| 模式 | 批量支持 |
| --- | --- |
| netflix_mode | 支持，串行执行 |
| ytdlp_mode | 支持，并发 5；Trial 用户受配额限制 |

---

## 十、合规与安全

- 遵循浏览器商店政策与平台版权规则
- DRM 受保护内容由 CoApp 处理，不做绕过
- Chrome 商店版遵守 YouTube 相关政策限制（见 [platform_diffs.md](platform_diffs.md)）
