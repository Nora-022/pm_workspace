# User Flows

> 从 `02_functional_architecture.md`、`03_page_structure.md`、`04_interaction_details.md` 提炼。不在此引入新事实。

## 主流程

1. 用户在内置浏览器打开 Fandango at Home 详情页（URL 模式 `athome.fandango.com/content/browse/details/<slug>/<id>`）
2. 插件触发 CoApp 视频分析
3. Meta 分析结果弹窗渲染：
   - Movie 类：主视频 + Extra（如有），Extra 分两级结构
   - TV 类：Season > Episode 两级层级
4. 下载配置项：
   - Resolution（动态枚举，格式 `{宽}x{高} - {码率} kbps - {文件大小}`）
   - Audio Codec（`EAC3` / `AAC`，音轨筛选器）
   - Language（受 Audio Codec 联动）
   - Subtitle（`None` / `{语言} CC`）
5. 用户选择内容项与配置后，任务进入 Downloading 视图
6. Downloading 视图展示标签（分辨率 / 视频 codec / 音频 codec）和信息（速度 / 进度 / 剩余时间 / 分片进度）

## Movie 分支

- 不含 Extra：主视频单条，下载配置项一次完成
- 含 Extra：主视频 + Extra 两级结构，按 meta 分析返回结果展示

## TV 分支

- 主视频 Season > Episode 两级层级
- playlist 仅分析第一集 meta；后续剧集可能存在 / 不存在的分辨率以 `1920x1080 if available` 形式标注
- 用户选择 `if available` 分辨率：后续集若不存在该分辨率，提示用户该选择可能落空，仍尝试下载

## Audio Codec ↔ Language 联动

- 用户切换 Audio Codec：Language 下拉项重新加载为当前 codec 下可用的语言列表
- 用户切换 Language：已选 Audio Codec 不被覆盖
- UI 上 Language 必须在 Audio Codec 之后渲染

## 错误分支

5 类错误独立处理，不与"分析失败"合并：

- 未登录 / 登录态失效 → 跳转登录页
- 地理限制（非 US IP）→ 提示用户切换 US 网络环境
- 版权 / 内容拒绝 → 标记为不可下载
- 租期过期 / 观看窗口关闭 → 提示用户续租或购买
- 硬件 DRM 不足 → 降级到 HD 或提示用户使用支持硬件 DRM 的环境

## 跳转分支

- 产品页 / What's New / 付费 / Upgrade 均使用 Fandango at Home 独立链接
- 主站、独立站、品牌站各自独立 client id，跳转目标按渠道区分
