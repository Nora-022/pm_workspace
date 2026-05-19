# 04 交互细节

## 当前阶段
- 当前仅完成插件知识库初始化
- 已建立本地文档入口与飞书文档承接机制

## 文档协作方式
- 对外事实写入正式知识文件
- 需求协作写入 `requirements/`
- 内部过程记录写入 `working_notes/`

## 维护原则
- 已确认内容进入公开知识库
- 需要确认的事项先在对话中确认，再决定是否落盘

---

## 交互事实（2026-05-19 分发）

事实来源：客户端方案拆解（飞书）、`requirements/plugin_requirement.md`、`references/site_research_notes.md`。

### Meta 分析下载配置项

| 配置项 | 选项格式 | 备注 |
|---|---|---|
| Resolution | `{宽}x{高} - {码率} kbps - {文件大小}` | TV 类后续剧集可能不存在的分辨率以 `1920x1080 if available` 标注 |
| Audio Codec | EAC3 / AAC | **非独立配置项**，是音轨筛选器；切换会联动影响 Language 选项；不同 codec 下可用语言不同 |
| Language | `{音频描述} {编码} {声道} - {码率} kbps`，例 `Deutsch EAC3 5.1 - 640 kbps` | 受当前 Audio Codec 选择联动 |
| Subtitle | `None` / `{语言} CC`，例 `English CC` | — |

### Audio Codec ↔ Language 联动规则

- Audio Codec 是音轨集合的筛选条件，不是独立可保存的下载参数
- 用户切换 Audio Codec 时，Language 下拉项需重新加载为当前 codec 下可用的语言列表
- 用户切换 Language 时，已选的 Audio Codec 不被覆盖
- 实现含义：UI 上必须在 Audio Codec 之后渲染 Language，且 Language 选项动态生成

### TV 类首集分析兼容提示

- playlist 仅分析第一集 meta，得到的分辨率集合可能不完整代表后续剧集
- 后续剧集若存在第一集没有的分辨率，按用户已选分辨率尝试下载
- 后续剧集若不存在第一集已列出的分辨率，使用 `if available` 标注告知用户该选择可能在部分集落空
- 该提示是非阻断式的，用户保留选择权

### 下载进度展示规则

| 字段 | 来源 | 备注 |
|---|---|---|
| 任务标签 | 分辨率 / 视频 codec / 音频 codec | 三类标签固定展示，不可关闭 |
| 速度 | CoApp 实时上报 | — |
| 进度 | CoApp 实时上报 | — |
| 剩余时间 | 插件按速度 + 总大小推算 | — |
| 分片进度 | CoApp 上报 | 不可获取文件大小时退化为 `0 / 0 Segments` |

### 错误归类规则

5 类错误必须独立处理，不与"分析失败"合并：

1. 未登录 / 登录态失效
2. 地理限制（非 US IP）
3. 版权 / 内容拒绝
4. 租期过期 / 观看窗口关闭
5. 硬件 DRM 不足（4K / HDR / DV 命中失败）

### 跳转规则

- 产品页 / What's New / 付费 / Upgrade 跳转均使用 Fandango at Home 独立链接，不复用其他插件链接
- 主站、独立站、品牌站各自有独立 client id（见 `requirements/plugin_requirement.md`）
