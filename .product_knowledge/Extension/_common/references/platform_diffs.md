# 平台差异基线（Platform Diffs）

> 跨插件共用的 Win / Mac 差异、Chrome / Edge / 官网渠道差异、CoApp 链接生成规则
> 站点专属平台限制写入插件 `diff_summary.md`
> 关联：[tech_limits.md](tech_limits.md)

---

## 一、Win / Mac 差异

| 维度 | Windows | macOS |
| --- | --- | --- |
| 系统门槛 | 10 / 11 | 11.0+ |
| CoApp 适配 | 完整 | 功能可用，UI 大面对齐 Win |
| 安装包 | `.exe` | `.dmg` / `.pkg` |
| Native Messaging | 标准 | 标准 |

> Mac 不做 macOS 原生精修，只保证功能能用 + 大面 UI 对齐 Win 版。

---

## 二、CoApp 链接生成规则

CoApp 安装包链接通过飞书 `StreamFab for Browser` 表格（Sheet `7JaGqO`）按产品名定位：

```
按产品名定位 4 行一组：
  Coapp-win
  Coapp-macos
  null
  Downloader for Browser
```

列映射：

| 列 | 含义 |
| --- | --- |
| B | pid |
| C | option_id |
| F | 主站 client_id |
| I | 品牌站 client_id |

详细规则见 [../READING_MAP.md § 外部数据源](../READING_MAP.md#外部数据源权威在飞书本地只存快照或按需查)。

---

## 三、渠道差异矩阵

| 渠道 | YouTube 下载（ytdlp） | 安装方式 | 更新方式 |
| --- | --- | --- | --- |
| 官网独立包 | ✅ 完整功能 | 离线 / 侧载 | 手动下载安装 |
| Chrome Web Store | ❌（政策限制） | 商店一键 | 自动更新 |
| Edge Add-ons | ✅ 完整功能 | 商店一键 | 自动更新 |

**Chrome 商店版例外**：

- 在 YouTube 页面显示 `Video on YouTube` 限制提示
- 引导用户使用 Edge 或官网版本
- 非 YouTube 下载按正常规则执行

**netflix_mode 各插件**：三渠道功能一致（无 YouTube 政策约束）。

---

## 四、受限页面

插件无法在以下页面注入或运行：

- `chrome://*`
- `edge://*`
- `about:blank`
- Chrome Web Store / Edge Add-ons 页面

在受限页面登录或检测会失效；登录时弹 `Login Notice`，引导去官网页面登录。

---

## 五、地区差异（适用站点举例）

| 站点 | 地区 |
| --- | --- |
| U-NEXT / FANZA / TVer | 日本 |
| Hulu | 美国（`hulu.com`） + 日本（`hulu.jp`） |
| Fandango at Home | 美国 |
| 其余（Netflix / Disney+ / Amazon 等） | 全球 |

各站点地区性套餐与限制写入插件 `diff_summary.md`。
