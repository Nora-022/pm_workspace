# 04 交互细节（Interaction Details）

## 主路径

1. 用户安装 Amazon 插件和 CoApp
2. 用户打开 Amazon / Prime Video 并登录
3. 插件检测当前页面内容
4. 插件把检测结果交给 CoApp 分析
5. CoApp 返回分析结果或失败结果
6. 用户在插件内选择下载配置
7. 用户创建任务并进入 `Downloads`

## 分析链路交互

### 1. 检测中

- 表示网页检测到视频并向 CoApp 发起分析请求。

### 2. 分析中

- 表示 CoApp 已开始分析。
- 分析进度来自 CoApp 接口，不由插件假模拟。

### 3. 分析成功

- 在 `Detected` 中新增可操作视频卡片。

### 4. 分析失败

分两类处理：

- 当前弹窗内已有其他检测结果：
  - 触发 toast
  - toast 展示 `3s`
  - 支持手动关闭
- 当前弹窗为空：
  - 不额外弹 toast
  - 继续走“未检测到”页面逻辑

## 分析失败反馈

文案：

- EN:
  - `Analysis Failed. Please retry or contact us for help.`
- ZH:
  - `分析失败，请重试或联系我们获得帮助。`

行为：

- 提供 `Contact us` 链接
- 不应该把分析失败伪装成“站点没有视频”

## 配置项交互

### Mode

#### Full Download

- 展示所有正常下载配置项。

#### Audio Only

- 保留：
  - `Audio Codec`
  - `Language`
- 其他配置项置灰。

#### Subtitle Only

- 保留：
  - `Subtitle`
  - `Subtitle Action`
- 其他配置项置灰。

## Codec 切换

- 首次切换 codec 需要 loading 状态。
- 切换后，`Resolution` 与 `Language` 选项联动刷新。
- 如果切换期间用户已跳转到新视频，应回到最新分析视频的 codec 结果，而不是停留在旧分析结果上。

## Bitrate 交互

- 默认 `CVBR`
- `CBR` 是否展示取决于当前 codec 是否存在可用流
- 无可用 CBR 流时，隐藏 CBR 选项，不展示无效值

## Language 交互

### Description Audio

- 开启后，Language 可选项需要包含该语言的 `Audio Description`

### Dialogue Boost

- 开启后，Language 可选项需要包含该语言的 `Dialogue Boost` 音轨及强度

### 同时开启时

- 如果同时开启 `Description Audio` 和 `Dialogue Boost`
- 默认选中 3 个音轨：
  - 主音轨
  - 描述音轨
  - 对话增强音轨

## Subtitle 交互

- Subtitle 字段只表示字幕语言列表
- Subtitle Action 表示字幕处理方式
- 两者是一个逻辑组，不应混成单个普通下拉框

## Playlist 交互

### 树结构默认展开规则

- 默认只展开第一组树结构
- 其余组默认收起

### Movie / Playlist 内容结构

Movie：

- 若无花絮 / 预告片：
  - 按单视频处理
  - 不展示 `Select Episodes`
- 若有花絮 / 预告片：
  - `Main Movie`
  - `Bonus / Extras`
  - `Trailers`

TV Show：

- `Season`
- `Episode`
- `Bonus / Extras`
- `Trailers`

### Playlist 首集分析限制

- 只分析第一集
- 后续剧集可能有不同 codec / bitrate 可用性

因此：

- 不用阻断弹窗强拦用户
- 使用常驻提示说明兼容性

## H265 + CBR 提示

当当前 episode 没有 `H265 + CBR` 可用时：

- 插件不弹阻断 modal
- 在 `Bitrate Adaption` 右侧展示常驻提示

文案：

- EN:
  - `If CBR isn't available for this episode, we'll still try other episodes in CBR.`
- ZH:
  - `如果本集没有 CBR 格式，我们仍会尝试下载其他集的 CBR 格式。`

## Resolution fallback

当 `Codec + Bitrate` 不可用时：

- Resolution 使用固定可选项
- 选中项取决于 setting 预设

## 下载列表交互

当 `Mode = Audio Only / Subtitle Only`：

- 待下载、下载成功：
  - 不展示分辨率信息
  - 仅展示模式名
- 排队中、下载中：
  - 不展示分辨率

## Setting 交互

Amazon 特有交互重点：

- `Pre-Select Dialogue Boost Audio`
  - 默认关闭
  - 开启后，模式和强度字段才可用
- `Dialogue boost audio only`
- `Normal and dialogue boost audio`
- `Dialogue Boost: High / Medium / Low`

## 阻断与不支持状态

Amazon 需要明确处理这些状态：

- 未登录
- 无 Prime 权益
- 租赁 / 购买内容
- Channel 权益不足
- 区域限制
- Sports / Live 不支持

规则：

- 明确解释阻断原因
- 不静默失败
