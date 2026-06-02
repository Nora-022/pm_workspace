# 04 交互细节（Interaction Details）

## 主流程

1. 用户打开目标站点页面。
2. 插件完成前置条件检查：站点、登录、播放状态、CoApp 可用性。
3. 进入检测 / 分析流程，生成 Detected 列表。
4. 用户展开视频卡片，选择下载参数。
5. 点击 Download 或 Select Episodes。
6. 完成权益校验与配额预占。
7. 任务进入 Downloads 队列。
8. CoApp 执行下载，完成后展示结果通知。

详细流程见 [11_user_flows_and_error_handling.md](11_user_flows_and_error_handling.md)。

## 状态反馈

| 状态 | 反馈 |
| --- | --- |
| 检测中 | `Detecting videos...` 动画 |
| 分析中 | 独立分析状态，不伪装成检测成功或失败 |
| 空状态 | `No videos detected` + `Force Refresh` |
| 下载中 | 进度条、速度、剩余时间、任务状态 |
| 成功 | 任务进入 Completed / Downloaded，并展示系统通知 |
| 失败 | 任务卡片展示错误码与可恢复动作 |

## 错误处理

- 普通结果反馈使用 Notification 或 toast。
- 权限、订阅、Trial、设备授权等必须停下来决策的场景使用 Blocking Modal。
- CoApp 缺失、更新、安装失败进入 CoApp Install Flow。
- ytdlp_mode 遇到 DRM 受保护内容显示 `Protected Video Content` 并引导桌面客户端。

详细规则见 [11_user_flows_and_error_handling.md](11_user_flows_and_error_handling.md)。

## 设置交互

- Dashboard Setting 默认实时保存，不使用统一 `Save / Cancel`。
- 设置项要标明立即生效或下次下载生效。
- 保存成功给轻量反馈，如 `Saved` / `Applied`。
- 保存失败必须明确提示并允许重试。

## 登录中断

登录中断后：

- Detected 停止检测并清空。
- Downloading 继续。
- Pending 不启动。
- Failed 禁止重试并引导登录。
- Downloaded 保留。

## 插件差异落位

站点专属流程、特殊配置项、Banner 文案、任务状态展示差异写入插件 `plugin_differences.md` 和 `requirements/plugin_requirement.md`。
