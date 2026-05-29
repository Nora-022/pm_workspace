# 用户主流程基线（User Flows）

> 跨插件共用的主流程与异常分支。站点专属流程写入插件 `requirements/plugin_requirement.md`。
> 关联：[baselines/netflix_mode.md](baselines/netflix_mode.md)、[baselines/ytdlp_mode.md](baselines/ytdlp_mode.md)、[error_handling.md](error_handling.md)、[business_rules.md](business_rules.md)

---

## 一、整体心智图

```
打开插件（Popup / Sidebar 或仅 Popup）
    ↓
[前置条件检查]   ※ netflix_mode：站点 + 登录 + 播放；ytdlp_mode：登录 + CoApp 可用
    ↓
[检测流程]      ※ 见对应 baselines
    ↓
Detected 列表（视频卡片 + 下载前配置）
    ↓
用户点击 Download / Select Episodes
    ↓
[权益校验]     ※ 阻断式
    ↓
[任务创建]     ※ 同步 + 配额预占
    ↓
[环境检查]     ※ 非阻断（CoApp 连接 / 磁盘空间）
    ↓
Downloads 队列（Pending → Downloading → Completed）
```

---

## 二、主流程：单视频下载

```
1. 用户在目标站点 + 已登录 + 已播放（netflix_mode）/ 已装 CoApp（ytdlp_mode）
2. 打开插件
3. 视频出现在 Detected 列表
4. 用户选择 Codec / Resolution / Audio / Subtitle（可用配置项随插件不同）
5. 点击 Download
6. 阻断校验通过 → 任务进入 Downloads 顶部，状态 Pending
7. 槽位可用 + 环境检查通过 → Downloading（进度条 / 速度 / 剩余时间）
8. 文件写入成功 → Completed，归入 Downloaded 分组，浏览器系统通知 "Download complete"
```

---

## 三、主流程：Playlist / 剧集批量下载

```
1. Detected 视频卡片显示剧集 Icon
2. 用户点击 Select Episodes，打开二级选集弹窗
3. 弹窗结构：Season → Episode 层级（即使只有一季也保留）
4. 默认选中：Season 1 / Episode 1
5. Episode 项只展示时长，不展示文件大小
6. 用户勾选目标 Episode，统一配置下载参数
7. 点击 Download，批量创建任务
8. Playlist 任务按 Season 维度进入 Downloads（每个 Season 一个任务卡片）
```

剧集组任务卡片头部信息：`Total / Finish / Failed`，支持展开 / 折叠。

---

## 四、主流程：CoApp 引导与更新

```
1. 检测 / 下载触发 CoApp 通信
2. CoApp 不可用：
   a. 未安装 → 引导安装页（区分 Win / Mac）
   b. 已卸载 → 引导重新安装
   c. 有更新 → 提示用户更新
3. 安装 / 更新完成后回到 Detected
```

---

## 五、异常分支

| 异常 | 分支处理 |
| --- | --- |
| 非目标站点 | Detected 区显示前置引导态 |
| 未登录 | 引导登录；Login Notice 在受限页面（chrome://* 等）引导去官网登录 |
| 未播放（netflix_mode） | Detected 引导用户播放视频 |
| 未安装 CoApp | 引导安装 |
| CoApp 有更新 | 提示更新 |
| 站点不支持 DRM（ytdlp_mode） | `Protected Video Content`，引导桌面客户端 |
| 站点不支持非 DRM（ytdlp_mode） | `未检测到视频，请确保视频播放或刷新页面，部分网站可能不支持` |
| YouTube 限制（Chrome 商店版） | `Video on YouTube`，引导 Edge / 官网 |
| Trial 次数耗尽 | `Free Trial Completed` 阻断弹窗 |
| 订阅过期 | `Subscription Expired` 阻断弹窗 |
| 订阅当日额度满 | `You've reached today's download limit (100).` 阻断弹窗 |
| 授权上限 | `Authorization Limit Reached`，引导 Member Center 解绑 |
| 网络授权失败 | 允许手动重试 |
| 登录中断 | 见 [business_rules.md § 五](business_rules.md#五登录中断后的业务规则) |

---

## 六、状态反馈规范

| 状态 | 展示 |
| --- | --- |
| 加载中 | `Detecting videos...` 动画 |
| 新增内容加载中 | 在现有结果基础上继续补充，不打断浏览 |
| 成功 | 任务状态实时变更并给出进度 |
| 失败 | 任务卡片展示错误码与可恢复动作（`Retry`） |
| 空状态 | `No videos detected` + `Force Refresh` |

---

## 七、多语言

- 基准文案：English (US)
- 展示语言：按用户设置语言显示（支持 28 种语言）
- 回退策略：当前语言包缺失时自动回退 English (US)
