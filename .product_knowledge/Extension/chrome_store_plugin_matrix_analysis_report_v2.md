# StreamFab 浏览器插件 - Chrome 浏览器数据分析报告

## 0. 概述

### 0.1 报告范围

本报告基于 8 个 Chrome 商店插件的最近 30 天后台数据（U-NEXT、OnlyFans 为部分窗口），覆盖流量、安装、活跃、口碑、渠道结构、OS 分布、地域与语言 7 个维度。

### 0.2 关键结论

1. **矩阵规模过度集中于单点**：合计 1,856 次安装、2,343 WAU，但 Ytdlp 一款占 WAU 60.6%、Top 3（Ytdlp + Netflix + TVer）合计 85.4%；其余 5 款 WAU 均在 200 以下，矩阵抗单点波动能力弱。
2. **Ytdlp 是矩阵中唯一具备公开评分压力的样本**：评分 3.0（2 条评价含 1 条自然 1 星），自然差评指向"试用+付费+需装额外软件"的预期错位；同时承担最大用户规模与最高口碑风险，是本周期最高优先级。
3. **其余 7 款均缺评分资产**：6 款 0 评价、TVer 5.0 但仅 2 条样本；矩阵整体未建立公开口碑护城河，相较公开样本中 49.8% 扩展具备评分、有评分扩展均值 4.56 的水平偏弱。
4. **进店流量管道单一**：所有插件进店流量高度依赖商店原生入口（ext_sidebar + ext_app_menu 在 OnlyFans、Ytdlp 合计 ≥91%）；所有 8 个插件 Campaign 报表均空白，外部营销动作无可量化复盘。
5. **商店分发机制与产品依赖之间存在客观不匹配**：所有插件依赖 Windows CoApp，但 Chrome 商店无法在装机前限制系统；非 Windows 装机普遍 15–28%（Disney+ ChromeOS 17%、OnlyFans 非 Windows 28%、U-NEXT 首日 ChromeOS 10%），活跃侧几乎归零。该限制作为数据解释背景，不单独归因为卸载或差评直接原因。
6. **地域结构稳定但日区呈现两种相反方向**：美区底盘 + 日德长尾在矩阵中重复出现；日本市场在 5 款插件显著（Netflix/Amazon/TVer 高黏，Ytdlp 高进高出——安装 20% 卸载 24%），U-NEXT 100% 美区为地区错位（目标市场是日本但 0 触达）。
7. **多语言能力在公域端未被承接**：Chrome 商店 Listing 单语言（英文）是平台/工作流约束，插件 UI 已多语言（用户切浏览器语言即可生效），但插件已有的多语言能力在商店端的文案、截图、关键词均无展示，公域漏斗对小语种受众的承接缺失。
8. **数据闭环三项缺失**：评分资产、Campaign 归因、安装后事件数据均不完整；矩阵 OS 分布数据仅 Disney+/OnlyFans/U-NEXT 完整，Amazon、Netflix、TVer 缺安装侧 OS，无法量化误装规模。这三项不补齐，后续获客与留存问题难以进一步归因。

### 0.3 本周期可直接执行的动作

| 优先级 | 动作 | 落地形式 |
| --- | --- | --- |
| P0 | 在插件内添加评分引导 | 8 款插件统一接入；触发时机选用户首次成功下载之后；卡片 / 弹窗内嵌跳转到 `chrome://webstore/detail/<id>/reviews` 的入口；Ytdlp 最优先（评分 3.0 已到搜索权重红线，先做大评分样本基数） |
| P1 | 8 款插件英文描述加多语言能力声明 | 简短描述或完整描述结尾显式列出支持语言（如 "Multi-language UI: 日本語 / Deutsch / Español / Português"），零成本让搜索引擎与用户识别 |
| P1 | 外部入口全面禁裸链 | 盘清桌面端、官网、Newsletter、论坛、帮助页 5 个固定入口，按 §11.3 的 utm 规范替换；建立 Campaign 参数登记表（插件 / 入口 / 投放时间 / 链接负责人 / 目标页面） |
| P2 | OnlyFans / M3U8 首次嗅探链路检查 | OnlyFans 卸载/安装 61.0%、M3U8 WAU 沉淀偏低，先排查插件内首次嗅探是否存在失败或卡顿，再考虑放大导流 |

不在本周期推进：粗放扩量、对 ChromeOS / Mac 流量做新增产品适配、多语言 Listing（受平台 / 工作流约束）。

---

## 1. 数据范围与口径

### 1.1 样本

| 样本组 | 插件 | 统计周期 | 比较方式 |
| --- | --- | --- | --- |
| 同周期成熟插件 | Netflix、Amazon、Disney Plus、M3U8、Ytdlp、TVer | 2026/04/26 – 2026/05/26 | 可横向比较 |
| 新品早期样本 | OnlyFans | 2026/05/18 上架，约 8 天 | 仅观察早期信号 |
| 首日样本 | U-NEXT | 2026/05/26 上架，<24h | 仅做首日观察 |

### 1.2 指标口径

| 指标 | 含义 | 在本报告中的作用 |
| --- | --- | --- |
| Impressions | 商店曝光量 | 观察商店内被展示规模 |
| PV | 详情页访问量 | 观察进入详情页规模 |
| CTR | PV / Impressions | 仅对数据完整的插件计算 |
| Installs | 安装量 | 本期获客 |
| Uninstalls | 卸载量 | 本期卸载压力 |
| WAU | 后台 Users 报表周用户字段 | 观察本期用户规模，不等同真实使用活跃 |
| Ratings | 商店公开评分 | 观察公开口碑资产与差评风险 |

### 1.3 口径边界

- `WAU / 本期安装` 不是新增用户留存率。
- `本期卸载 / 本期安装` 不是新增安装卸载率，本期卸载可能来自历史用户。
- `Ratings = 0.0` 应理解为评分资产缺失或样本不足，不等同用户给出 0 分。
- WAU 字段来自 Chrome Web Store Users 报表，Google 官方说明 Users 不等同真实活跃行为监控。
- 仅 Ytdlp 与 OnlyFans 提供完整曝光数据，CTR 仅对这两款计算。
- Amazon、Disney Plus、Netflix、U-NEXT 因 PV 数据缺失或 Installs > PV，不计算 PV → Install 转化率。

---

## 2. 外部基准

引入第三方公开样本作为相对位置参照，不等同 Google 官方均值。

| 对比项 | 公开基准 | 本矩阵情况 | 参考判断 |
| --- | --- | --- | --- |
| 用户规模分布 | Exstats Q1 2026：Chrome 扩展用户中位数 18，70.4% ≤100 | Ytdlp 1,420；Netflix、TVer、Amazon、Disney Plus 均 >100；M3U8、OnlyFans、U-NEXT ≤100 | Ytdlp 明显高于长尾区间，4 款已越过低使用量区间 |
| 1K+ 档位 | Exstats：1K–10K 约 6.3%、10K+ 约 2.6% | 仅 Ytdlp >1K | Ytdlp 为矩阵中唯一进入 1K+ 档位 |
| 评分覆盖 | Exstats：约 49.8% 扩展有评分，有评分平均 4.56 | 6 款无有效评分；TVer 5.0 但仅 2 条；Ytdlp 3.0 | 评分资产整体偏弱，Ytdlp 低于有评分样本均值 |
| CTR、PV 转化、卸载率 | 无 Google 官方公开均值 | 仅内部横向 | 不下"高于/低于全商店平均"结论 |

---

## 3. 矩阵总体

| 指标 | 数值 | 说明 |
| --- | --- | --- |
| 合计安装 | 1,856 | 含 U-NEXT 首日 |
| 合计 WAU | 2,343 | 8 款合计 |
| Ytdlp 安装占比 | 32.2% | 598 / 1,856 |
| Ytdlp WAU 占比 | 60.6% | 1,420 / 2,343 |
| Top 3 WAU 占比 | 85.4% | Ytdlp + Netflix + TVer = 2,002 |

Ytdlp 在矩阵中同时承担最大安装规模与最大活跃来源；Amazon、Netflix、M3U8、Disney Plus 安装规模在 237–282 区间；TVer WAU（245）显著高于本期安装（122），存量用户规模来自历史沉淀。

---

## 4. 核心指标横向对比

| 插件 | 本期安装 | 本期卸载 | 卸载/安装 | WAU | 评分状态 | 观察 |
| --- | --- | --- | --- | --- | --- | --- |
| Ytdlp | 598 | 356 | 59.5% | 1,420 | 3.0（2 条） | 安装与 WAU 均矩阵最高，但卸载/安装也偏高；评分为矩阵最低 |
| Amazon | 282 | 132 | 46.8% | 110 | 无 | 卸载/安装中高位；WAU 低于本期安装，本期 WAU 较前期上升明显 |
| Netflix | 265 | 125 | 47.2% | 337 | 无 | 卸载/安装中高位；WAU 高于本期安装 |
| M3U8 | 260 | 缺数据 | 无法计算 | 57 | 无 | 安装不弱，但 WAU 偏低 |
| Disney Plus | 237 | 110 | 46.4% | 158 | 无 | 卸载/安装中高位 |
| TVer | 122 | 31 | 25.4% | 245 | 5.0（2 条） | 卸载/安装最低；WAU 远高于本期安装 |
| OnlyFans | 82 | 50 | 61.0% | 15 | 无 | 新品早期，卸载/安装偏高 |
| U-NEXT | 10 | 0 | 0.0% | 1 | 无 | 首日样本 |

M3U8 缺卸载数据不参与卸载压力比较；U-NEXT 为首日样本不参与成熟插件比较。

---

## 5. 流量与转化

### 5.1 CTR

| 插件 | CTR | 计算依据 |
| --- | --- | --- |
| Ytdlp | 17.6% | 937 / 5,320 |
| OnlyFans | 10.0% | 138 / 1,380 |

Ytdlp 关键词命中精准度明显高于 OnlyFans 新品。其他插件缺完整 Impressions 数据，不计算 CTR。

### 5.2 PV → 安装

| 插件 | PV → 安装 | 计算依据 |
| --- | --- | --- |
| TVer | 73.1% | 122 / 167 |
| M3U8 | 71.6% | 260 / 363 |
| Ytdlp | 63.8% | 598 / 937 |
| OnlyFans | 59.4% | 82 / 138 |

Amazon、Disney Plus、Netflix、U-NEXT 不计算。Amazon（282 安装 / 175 PV）与 U-NEXT（10 安装 / 8 PV）出现安装高于 PV，可能原因包括搜索结果页直装、数据同步延迟、裸链访问或内部测试安装，须通过原始访问路径与安装日志核实。

---

## 6. 进店渠道结构

后台流量来源（基于 Chromium 源码底层定义）：

| 来源 | 含义 |
| --- | --- |
| `ext_sidebar` | 用户通过 chrome://extensions 扩展程序管理页左侧"获取更多扩展程序"入口进入商店 |
| `ext_app_menu` | 用户通过浏览器右上角三点菜单的扩展程序子菜单进入商店 |
| `add-to-chrome` | 商店搜索/分类页直接安装路径 |
| Campaign | 外部带参链接 |

| 插件 | ext_sidebar | ext_app_menu | 其他/Campaign | 观察 |
| --- | --- | --- | --- | --- |
| Amazon | ~82% | — | Campaign 空白 | 高度依赖商店内生检索 |
| Disney Plus | ~85% | — | Campaign 空白 | 高度依赖商店内生检索 |
| Netflix | ~82% | — | Campaign 空白 | 高度依赖商店内生检索 |
| OnlyFans | 69% | 22% | Campaign 空白 | sidebar + app_menu 合计 91% |
| Ytdlp | 77% | 19% | Campaign 空白 | sidebar + app_menu 合计 96% |
| M3U8 | — | — | 100% add-to-chrome | 完全公域自然流量 |
| Amazon、Netflix、Disney+ 多数插件 | — | — | Campaign 全空白 | 私域导流无可归因 |

矩阵共性：进店流量高度依赖重度插件玩家的浏览器原生管理路径（ext_sidebar + ext_app_menu 合计普遍 ≥90%）；Campaign 渠道在所有插件均为空白，外部营销无法量化。

---

## 7. OS 分布

| 插件 | 安装侧 OS | 活跃侧 OS | 自动净化幅度 |
| --- | --- | --- | --- |
| Disney Plus | Windows 70% / ChromeOS 17% / Mac 8% | Windows 83% / Mac 15% / ChromeOS ≈0 | ChromeOS 17% 安装在活跃侧蒸发 |
| OnlyFans | Windows 71% / Mac 16% / ChromeOS 12% | Windows 84% / Mac 11% / ChromeOS ≈0 | 非 Windows 28% 装机大幅净化 |
| Netflix | — | Windows 84% / Mac 11% / ChromeOS ≈0 | 活跃侧 Windows 占比高 |
| M3U8 | — | Windows 83% | 活跃侧 Windows 主导 |
| TVer | — | — | 数据中提到 Windows 端 87% 卸载占比 |
| U-NEXT | ChromeOS 10% | Windows 100% / ChromeOS ≈0 | 首日 ChromeOS 安装在活跃侧归零 |
| Ytdlp | — | Mac 13%（Chrome Sync 同步污染） | 非真实 Mac 用户，为同账号 Sync 自动激活 |
| Amazon | — | — | 原数据未细分 |

矩阵共性：所有插件依赖 Windows CoApp，但 Chrome 商店安装入口无法在装机前限制系统；安装侧非 Windows 占比普遍 15–28%，活跃侧几乎归零。这是商店分发机制与产品依赖之间的客观不匹配，本报告作为数据解释背景，不直接归因为卸载或差评原因。

---

## 8. 地域与语言分布

### 8.1 各插件地域结构（占比）

| 插件 | 安装侧 Top | 活跃侧 Top | 系统语言 Top |
| --- | --- | --- | --- |
| Amazon | DE 14% / UK 9% | US 65% / JP 10% | JP 22% |
| Disney Plus | — | US 24% / DE 10% / BR 8% | EN-US 38% / DE 11% / ES+PT 16% |
| Netflix | — | US 20% / JP 11% / DE 9% | 日语 12% |
| M3U8 | — | US 30% / JP 21% / 其他长尾 42% | — |
| TVer | US 45% | JP 47% | — |
| OnlyFans | US 52% / MX 9% | — | EN-US 56% |
| Ytdlp | JP 20% | — | — |
| U-NEXT | US 100% | US 100% | EN-US 100% |

### 8.2 关键地域特征

**日本市场**：在 4 款插件呈现显著占比但呈现两种相反方向：

- TVer：活跃侧 JP 47%，安装侧 US 45%，证实"海外+跨区追剧"的精准客群；
- Netflix、Amazon：JP 在活跃或系统语言侧占 10–22%，地区+语言错位，证明日本订户的高黏性；
- Ytdlp：JP 安装 20%，但卸载 24%（全球第一），日区对"安装额外软件 + 后台静默"敏感度高，是高进高出市场，与 Netflix/Amazon 的高黏性截然相反。

**德国与拉美**：

- Disney Plus 活跃侧 DE 10%、BR 8%，语言侧 DE 11%、ES+PT 16%；
- Netflix 活跃侧 DE 9%；
- Amazon 安装侧 DE 14%、UK 9%。
这些地域均与流媒体平台原生市场版图重合，但当前 Listing 仅英文版本，覆盖效率不足。

**北美**：

- U-NEXT 100% 美区是地区错位（U-NEXT 是日本本土平台），表明上线首日流量来自内部测试或海外科技用户，未触达目标日本本土市场；
- OnlyFans US 52% + EN-US 56% 与平台北美付费基础高度吻合，结构健康；
- TVer 安装侧 US 45% 与活跃侧 JP 47% 反差，证明跨区代理观看是主要场景。

### 8.3 本地化现状与缺口

事实背景：

- Chrome 商店 Listing 当前仅填一种主语言（英文），是平台/工作流层面的约束；
- 插件本体已实现多语言 UI，用户切换浏览器系统语言即可生效。

真正的缺口在公域漏斗端：

- 商店搜索算法对本地语言关键词的承接受限：JP/DE/ES/PT 用户使用本地语言搜索时，纯英文 Listing 难以进入候选；
- 即便用户进入英文详情页，"插件已多语言"这一能力在 Listing 文案与截图中完全不可见，错过可作为差异化卖点的展示位；
- 多语言能力沉淀在装机后的 UI 层，但公域获客阶段无任何对应曝光。

可操作方向（均在单语言 Listing 约束内可做）：

| 方向 | 落地动作 |
| --- | --- |
| Listing 文案显化语言能力 | 在英文简短描述/完整描述中显式列出支持语言（如 "Multi-language UI: 日本語 / Deutsch / Español / Português"），让搜索引擎与用户在英文页面即可识别 |
| 截图素材本地化 | 截图集中加入本地语言 UI 截图（每语言至少 1 张），作为多语言能力的视觉证明 |
| 关键词长尾截留 | 在英文描述中嵌入有限的本地语言关键词（假名+罗马字混排、德/西/葡常用词），从英文 Listing 截留本地搜索长尾 |
| 私域端补齐 | 桌面端、官网、Newsletter 针对本地市场做带 utm 参数的导流链接，从私域端补齐 Listing 单语言无法解决的本地覆盖 |

各插件本地化承接优先级（按已观察到的本地受众规模排序）：

| 优先级 | 承接重点语言 | 涉及插件与依据 |
| --- | --- | --- |
| P0 | 日语 | TVer（活跃 JP 47%）、Amazon（活跃 JP 10%、日语系统 22%）、Netflix（活跃 JP 11%、日语系统 12%）、Ytdlp（JP 安装 20% 卸载 24%）、U-NEXT（目标市场即日本但目前 0 触达） |
| P1 | 德语 | Amazon（安装 DE 14%）、Disney Plus（活跃 DE 10%、语言 11%）、Netflix（活跃 DE 9%） |
| P2 | 西/葡 | Disney Plus（活跃 BR 8%、语言 ES+PT 16%）、OnlyFans（MX 9%） |

具体改造建议在 Campaign 归因建成、可量化本地化 ROI 之后再批量推进，避免错误归因。

---

## 9. 活跃与流失风险

| 风险或现象 | 相关插件 | 数据表现 | 处理方向 |
| --- | --- | --- | --- |
| 核心资产口碑风险 | Ytdlp | 卸载/安装 59.5%、评分 3.0、自然差评原文显示"试用+付费+需装额外软件"预期错位 | 矩阵中最高优先级；处理首次使用链路、CoApp 连接提示、付费边界说明与差评反馈 |
| 新品早期流失 | OnlyFans | 卸载/安装 61.0%、WAU 15 | 已有安装信号但安装后规模未沉淀，先把首次嗅探与首次下载链路做顺，再放大导流 |
| 安装后沉淀不足 | M3U8 | 安装 260、WAU 57、缺卸载数据 | 商店端不弱但沉淀偏低；补齐插件内激活数据，定位安装后断点 |
| 存量资产维护 | TVer | 安装 122、卸载 31、WAU 245 | WAU 远高于本期安装，存量可维护；重点是稳定性、评分样本与核心场景维护 |
| 高进高出地区 | Ytdlp | JP 安装 20% / 卸载 24% | 在英文 Listing 中显化"日本語 UI 已支持"与 CoApp 依赖说明，验证下一周期 JP 卸载占比能否下行 |

---

## 10. 产品组合分层

| 分层 | 判定依据 | 插件 | 当前观察 | 管理重点 |
| --- | --- | --- | --- | --- |
| 核心活跃资产 | WAU 与安装均最高 | Ytdlp | WAU 占整体 60.6% | 评分修复、预期管理、首次使用链路 |
| 成熟平台型 | 安装稳定、平台关键词基础 | Netflix、Amazon、Disney Plus | 安装 237–282 | 本地化、渠道归因、CoApp 依赖说明 |
| 高转化待优化 | PV 转化高、安装后规模待提升 | M3U8、TVer | M3U8 WAU 偏低；TVer 存量明显 | 激活漏斗、下载成功率、场景关键词 |
| 新品观察 | 样本周期较短 | OnlyFans、U-NEXT | OnlyFans 早期信号；U-NEXT 首日 | Campaign 归因、早期口碑、目标市场校准 |

---

## 11. 主要经营约束

### 11.1 公开口碑资产不足

8 款中 6 款无有效评分；TVer 5.0 但仅 2 条；Ytdlp 3.0 是矩阵中唯一具备公开评分压力的样本，且自然差评内容已明确指向"试用+付费+需装额外软件"的预期错位。优先级：Ytdlp > 新品早期保护 > 存量插件初始评分注入。

### 11.2 商店分发与产品依赖之间的客观不匹配

矩阵中多数插件依赖 Windows CoApp，但 Chrome 商店安装入口无法在装机前限制系统。Disney Plus 安装侧 ChromeOS 占 17%、OnlyFans 非 Windows 装机合计 28%、U-NEXT 首日 ChromeOS 占 10%。本报告作为数据解释背景，不单独归因为卸载、差评或活跃偏低的直接原因。

### 11.3 Campaign 归因缺失

所有 8 个插件后台 Campaign 报表均为空白。在官网、论坛、Newsletter、桌面端、产品内引导统一加追踪参数前，无法判断外部导流真实贡献，也无法复盘投放与运营动作。

参数命名规范：

| 参数 | 用途 | 示例 |
| --- | --- | --- |
| `utm_source` | 来源平台 | `official_site`、`forum`、`newsletter`、`desktop_app` |
| `utm_medium` | 入口类型 | `store_link`、`banner`、`popup`、`email` |
| `utm_campaign` | 活动或投放批次 | `plugin_launch`、`may_promo`、`seo_update` |
| `utm_content` | 页面位置或组件 | `hero_button`、`download_card`、`footer_link` |
| `utm_term` | 产品、区域或关键词 | `netflix_us`、`tver_jp`、`disney_de` |

落地：先建立 Campaign 参数登记表，记录插件、入口、投放时间、链接负责人、目标页面；官网、论坛、Newsletter、桌面端弹窗、产品内引导不得使用裸链；每次新增入口先登记参数再发布；复盘按 `utm_source + utm_campaign + utm_content` 看 PV、安装、卸载。

---

## 12. 结论

矩阵已形成一定安装与用户规模基础。Ytdlp 已脱离长尾区间，4 款成熟插件越过低使用量区间。但评分资产、Campaign 归因、安装后事件数据仍不完整；地域结构呈现稳定的"美区底盘 + 日德长尾"，本地化覆盖严重不足。

本周期运营优先级：

1. Ytdlp 评分修复与首次使用链路重做（核心资产保护）。
2. Campaign 参数规范与登记表落地（数据基础设施）。
3. OnlyFans、M3U8 安装后激活链路（新品与高转化样本的沉淀）。
4. 英文 Listing 中显化多语言 UI 能力 + 截图素材补本地语言截图（JP 在 5 个插件均贡献显著占比，是本地化承接 P0；不依赖多语言 Listing，仅在现有英文 Listing 内完成）。
5. 矩阵 OS 分布数据补齐（Amazon、Netflix、TVer 缺安装侧 OS，无法量化误装规模）。

不在本周期推进：粗放扩量、对 ChromeOS/Mac 流量做新增产品适配。

---

## 附录 A：原始数据快照

| 插件 | Installs | Uninstalls | PV | Impressions | WAU | Ratings |
| --- | --- | --- | --- | --- | --- | --- |
| Ytdlp | 598 | 356 | 937 | 5,320 | 1,420 | 3.0（2 条，含 1 条自然 1 星） |
| Netflix | 265 | 125 | — | — | 337 | 0.0 |
| TVer | 122 | 31 | 167 | — | 245 | 5.0（2 条） |
| Disney Plus | 237 | 110 | — | — | 158 | 0.0 |
| Amazon | 282 | 132 | 175 | — | 110 | 0.0 |
| M3U8 | 260 | 缺数据 | 363 | — | 57 | 0.0 |
| OnlyFans | 82 | 50 | 138 | 1,380 | 15 | 0.0 |
| U-NEXT | 10 | 0 | 8 | — | 1 | 0.0 |

## 附录 B：计算公式

- 卸载/安装压力 = 本期 Uninstalls / 本期 Installs（非新增留存率）。
- CTR = PV / Impressions（仅对 Impressions 完整插件计算）。
- PV → 安装 = Installs / PV（仅对 Installs ≤ PV 的插件计算）。
- WAU / 本期安装 = WAU / Installs（非新增留存率，观察存量相对本期新增的强弱）。

## 参考来源

- [Analyze your store listing metrics — Chrome for Developers](https://developer.chrome.com/docs/webstore/metrics)
- [Chrome vs Firefox vs Edge: Browser Extension Market in Q1 2026 — Exstats](https://exstats.com/blog/state-of-browser-extensions-q1-2026)