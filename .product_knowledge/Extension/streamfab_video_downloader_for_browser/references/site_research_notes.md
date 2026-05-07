# yt-dlp 技术调研

## 基本信息

- 项目地址：`https://github.com/yt-dlp/yt-dlp`
- 调研日期：`2026-04-20`
- 调研目的：了解 yt-dlp 的技术架构、能力边界与局限，作为 StreamFab Video Downloader 插件设计参考

---

## 1. 项目背景

- **yt-dlp** 是 youtube-dl 的社区 Fork，2021 年 1 月创建
- **Fork 原因**：youtube-dl 开发停滞，社区先创建了 youtube-dlc，后演化为 yt-dlp，以实现更快的迭代节奏和 YouTube 兼容性更新
- **当前状态**：截至 2026 年 4 月，仍在活跃维护（最近版本 2026.04.10），Python 最低要求已升至 3.10
- **生态地位**：已取代 youtube-dl 进入 Ubuntu 22.04+、Debian 12.0+ 官方软件仓库

---

## 2. 支持站点范围

- **支持 1,800+ 个网站**，涵盖 YouTube、Vimeo、社交媒体、教育平台、区域流媒体服务、直播平台等
- **Extractor 机制**：每个站点对应一个 Extractor 类，继承自 `InfoExtractor` 基类
  - `_VALID_URL`：正则匹配 URL，判断是否由该 Extractor 处理
  - `_real_extract()`：下载页面内容，解析视频信息，返回标准化 `info_dict`
- **维护方式**：社区驱动，站点更新时由贡献者修复对应 Extractor；可通过 `yt-dlp --list-extractors` 查看完整列表

---

## 3. 核心技术架构

### 网络层

yt-dlp 采用 Director-Handler 插件化网络架构，支持多种 HTTP 后端：

| 后端 | 说明 |
|------|------|
| UrllibRH | Python 标准库 urllib |
| RequestsRH | requests 库，支持连接池 |
| CurlCFFIRH | curl_cffi，用于 TLS 指纹模拟（反爬对抗） |
| WebsocketsRH | WebSocket 支持（ws:// / wss://） |

### 流提取流程

1. Extractor 下载视频页面 HTML / JSON
2. 解析元数据和格式信息
3. 提取 Manifest URL（HLS 调用 `_extract_m3u8_formats()`，DASH 调用 `_extract_mpd_formats()`）
4. 返回包含所有格式选项的 `info_dict`

### 协议支持

| 协议 | 支持情况 |
|------|----------|
| HTTP(S) 直链 | 完整支持 |
| HLS（M3U8） | 支持（点播内容）；直播 HLS 不支持 |
| MPEG-DASH（MPD） | 完整支持 |
| RTMP | 支持（需 rtmpdump） |
| WebSocket | 支持 |

### 外部依赖

- **ffmpeg**：合并视频 + 音频流、容器转换、字幕嵌入等，必须独立安装
- **Deno / Node.js**：YouTube 现要求通过 JS Runtime 解决 PO Token（Proof of Origin）挑战；yt-dlp 不再内置 JS 执行引擎，改为外部委托

---

## 4. DRM 处理能力

**yt-dlp 官方不支持 DRM 解密。**

| DRM 方案 | yt-dlp 支持情况 |
|----------|----------------|
| Widevine | 无官方支持；`--allow-unplayable` 可下载加密分片，但需借助 Pywidevine 等外部工具解密，且属于非文档化功能 |
| PlayReady | 无支持 |
| FairPlay | 无支持 |

**根本原因**：yt-dlp 工作在 HTTP 层，无法访问浏览器 EME/CDM 沙箱内的解密密钥。解密密钥由 DRM 许可服务器管理，合法访问需授权 CDM 模块（仅存在于官方浏览器和认证设备中）。

**实际影响**：Netflix、Disney Plus、Amazon Prime Video 等 DRM 加密内容，yt-dlp 无法直接下载可播放的视频文件。

---

## 5. 格式选择

通过 `-f FORMAT` 指定，支持丰富的表达式：

```bash
# 常用示例
-f best                          # 最佳单一格式
-f bestvideo+bestaudio           # 最佳视频+音频分别下载，ffmpeg 合并
-f "bestvideo[height<=1080]+bestaudio/best"  # 限制分辨率
-f "bv*[ext=mp4]+ba[ext=m4a]"   # 指定容器格式
```

- `+` 合并操作符：分别下载视频流和音频流，**必须有 ffmpeg** 才能合并
- 支持按分辨率、码率、编解码器、帧率等多维度排序筛选

---

## 6. 后处理（Post-Processing）

ffmpeg 作为外部工具承接所有后处理操作：

| 操作 | 标志 |
|------|------|
| 合并视频+音频流 | 自动（下载后触发） |
| 容器重封装 | `--remux-video TARGET`（如 mov→mp4） |
| 格式转换 | `--recode-video FORMAT` |
| 嵌入字幕 | `--embed-subs` |
| 嵌入封面 | `--embed-thumbnail` |
| 嵌入元数据 | `--embed-metadata` |
| 提取音频 | `--extract-audio --audio-format mp3` |
| 按章节分割 | `--split-chapters` |

---

## 7. 认证机制

| 方式 | 说明 |
|------|------|
| 浏览器 Cookie | `--cookies-from-browser BROWSER[/PROFILE]`，支持 Chrome / Firefox / Edge / Safari 等 |
| Cookie 文件 | `--cookies COOKIEFILE`（Netscape 格式） |
| 用户名/密码 | `--username USER -p PASS`（部分站点支持，YouTube 已不可用） |
| .netrc 文件 | `--netrc`，使用 `~/.netrc` 或自定义路径 |
| OAuth | **已废弃**，Google 2023 年关闭 OAuth 支持，当前不可用 |

**最可靠的登录方案**：导出浏览器 Cookie，配合 `--cookies-from-browser` 使用。

---

## 8. 浏览器扩展集成现状

现有的浏览器扩展均以 **包装 yt-dlp** 为主，分为三种架构：

| 架构模型 | 说明 |
|----------|------|
| 命令构建器 | 扩展提供 UI，生成 yt-dlp 命令字符串，用户手动执行 |
| 本地服务器 | 扩展与本地 HTTP 服务（用户自行运行 yt-dlp server）通信，由服务端执行下载 |
| Native Messaging | 扩展通过 Native Messaging 与本地 Python 进程通信 |

**结论**：目前没有成熟的纯浏览器内视频下载扩展可以媲美 yt-dlp 的能力。主流方案都是"浏览器扩展 + 本地 yt-dlp"的组合架构。

---

## 9. 反检测与限速

| 措施 | 标志 |
|------|------|
| 请求间隔 | `--sleep-interval SECONDS` / `--max-sleep-interval SECONDS` |
| 请求限速 | `--limit-rate RATE` |
| 元数据请求间隔 | `--sleep-requests SECONDS` |

**YouTube 的对抗升级（2025–2026）：**
- 引入 **PO Token**（Proof of Origin）机制，每次视频请求需附带 Token
- 需要外部 JS Runtime（Deno / Node.js）求解 Token 挑战
- 持续检测异常下载模式（下载速率远超正常播放速率时触发）

**限速效果评估**：间隔睡眠可降低被检测概率约 70%，但无法完全规避；被检测后需更换 IP 或刷新 Cookie。这是一场持续的"猫鼠游戏"。

---

## 10. 能力边界（无法做到的事）

| 限制 | 说明 |
|------|------|
| **DRM 加密内容** | 无法解密 Widevine / PlayReady / FairPlay 保护的内容 |
| **直播 HLS** | 不支持实时直播流下载，仅支持已录制的点播内容 |
| **直播断点续传** | 直播下载中断后，续传通常失败 |
| **超 120 小时直播** | YouTube 在 120 小时后删除旧分片，`--live-from-start` 最多回溯 120 小时 |
| **任意定位直播流** | 无法跳转到直播流的任意时间点 |

---

## 11. 浏览器扩展 vs. yt-dlp CLI 能力对比

| 维度 | 浏览器扩展 | yt-dlp CLI |
|------|-----------|-----------|
| DRM 绕过 | 不支持 | 不支持（相同限制） |
| 格式控制 | 有限（通常仅最优格式） | 完整：分辨率、编解码器、码率、合并 |
| 视频+音频合并 | 通常不支持 | 完整支持（ffmpeg） |
| 批量下载 | 不适合 | 原生支持（播放列表、频道、归档） |
| 元数据处理 | 基础 | 完整：章节、字幕嵌入、封面嵌入 |
| 后处理 | 极有限 | 完整 ffmpeg 套件 |
| 认证 | 自动使用浏览器 Cookie | 浏览器 Cookie、netrc、用户名/密码 |
| 实时媒体检测 | **优势**：边浏览边检测 | 需要手动输入 URL |
| 扩展性 | 受限于浏览器 API | 插件系统（自定义 Extractor / 后处理器） |
| 用户门槛 | 低（安装即用） | 高（命令行） |
| 限速控制 | 难以实现 | 内置完整限速机制 |

**浏览器扩展的核心优势**：实时检测当前页面的可下载媒体，用户无需手动复制 URL。

**yt-dlp 的核心优势**：1,800+ 站点 Extractor、完整格式控制、ffmpeg 后处理、批量归档能力。

---

## 12. 对 Video Downloader 插件的参考意义

1. **不要重复造轮子**：yt-dlp 的 1,800+ Extractor 是不可能在浏览器扩展中复制的维护成本。推荐"浏览器扩展负责 UI 和媒体检测，后端委托 yt-dlp"的混合架构。

2. **明确 DRM 边界**：yt-dlp 和浏览器扩展面临相同的 DRM 限制，需在产品中清晰说明哪些内容不可下载。

3. **格式选择 UI**：参考 yt-dlp 的 `-f` 格式选择逻辑设计分辨率 / 音质 / 容器选择 UI。

4. **认证方案**：复用浏览器 Cookie 是最可靠的登录方案，避免让用户手动输入账密。

5. **限速策略**：内置请求间隔配置，设置合理默认值（3–5 秒），并向用户说明检测风险是概率性的。

---

## 参考资料

- GitHub 仓库：`https://github.com/yt-dlp/yt-dlp`
- Wiki / PO Token 指南：`https://github.com/yt-dlp/yt-dlp/wiki/PO-Token-Guide`
- DeepWiki 架构文档：`https://deepwiki.com/yt-dlp/yt-dlp/`
- YouTube-dl Wikipedia：`https://en.wikipedia.org/wiki/Youtube-dl`
