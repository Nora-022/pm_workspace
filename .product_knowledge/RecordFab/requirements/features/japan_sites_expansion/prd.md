# 拓展支持日本网站 — 调研与结论

**状态**：推进中 · 等待测试修复
**负责人**：
**创建日期**：2026-04-16
**最后更新**：2026-04-16

---

## 背景与目标

RecordFab 计划拓展日本本土热门网站。基于 2026 年直播网站趋势清单（`Streaming site trends for 2026.xlsx`），判断 RecordFab 当前对日本重点直播网站的支持情况，明确哪些网站可以直接视为已支持，哪些仍需继续验证或推进支持。

涉及以下 15 个站点：YouTube Live、Twitch、TikTok LIVE、niconico、17LIVE、SHOWROOM、TwitCasting、MixChannel、Palmu、OPENREC.tv、Mirrativ、Fuwacchi、SPWN、Z-aN、Fanicon。

---

## 调研过程

### 数据来源与判断规则

对照数据来源：飞书多维表 `RecordFab-支持网站列表`。

判断规则：
1. 检查目标网站在多维表中是否有对应记录
2. `状态 = 展示` → 已进入当前支持名单
3. `成功率 > 90` → 达到质量要求
4. `更新时间较近` → 近期有效记录

同时满足以上四条，直接判定为「RecordFab 已支持」。

### 各站点支持情况

**可直接判定已支持（6 个）**

| 网站 | 域名 | 成功率 | 更新时间 |
|------|------|--------|----------|
| YouTube Live | www.youtube.com | 96.03 | 2026-04-14 |
| Twitch | www.twitch.tv | 100 | 2026-04-14 |
| niconico | live.nicovideo.jp | 100 | 2026-04-14 |
| SHOWROOM | www.showroom-live.com | 100 | 2026-03-17 |
| OPENREC.tv | www.openrec.tv | 100 | 2026-04-14 |
| Z-aN | www.zan-live.com | 100 | 2026-04-14 |

**有达标记录，建议补近期验证（2 个）**

| 网站 | 域名 | 成功率 | 更新时间 | 说明 |
|------|------|--------|----------|------|
| MixChannel | mixch.tv | 100 | 2025-07-14 | 记录较旧，建议补近期验证 |
| Fanicon | fanicon.net | 100 | 2025-02-07 | 记录时间较早 |

**有记录但不达标（4 个）**

| 网站 | 域名 | 成功率 | 更新时间 | 说明 |
|------|------|--------|----------|------|
| TikTok LIVE | www.tiktok.com | 0 | 2026-03-31 | 近期成功率不达标 |
| 17LIVE | 17.live | 0 | 2025-12-22 | 当前不达标 |
| TwitCasting | twitcasting.tv | 83.33 | 2026-04-07 | 接近阈值，建议继续观察 |
| SPWN | spwn.jp | 61.11 | 2026-04-14 | 主域不达标；子域 virtual.spwn.jp、crew.spwn.jp 有达标记录但时效弱 |

**暂未发现记录（3 个）**

| 网站 | 域名 | 说明 |
|------|------|------|
| Palmu | palmu.jp | 暂未查到记录 |
| Mirrativ | mirrativ.com | 暂未查到记录 |
| Fuwacchi | whowatch.tv | 暂未查到记录 |

### 特殊说明

- **niconico**：`live.nicovideo.jp` 已达标；关联的 `nicochannel.jp` / `www.nicovideo.jp` 成功率 84.62，不应混同。当前表述为「niconico 直播相关站点已支持」。
- **SPWN**：主域 `spwn.jp` 成功率 61.11 不达标。子域 `virtual.spwn.jp`（100%，2025-04）和 `crew.spwn.jp`（100%，2025-07）有达标记录但时效已弱。建议列为待确认。

---

## 结论与决策

**已支持（6 个）**：YouTube Live、Twitch、niconico、SHOWROOM、OPENREC.tv、Z-aN，可直接对外声明支持。

**待推进（9 个）**：需针对不同情况分别处理，见第六节待办清单。

---

## 待办

### 待支持网站清单

| 网站 | 域名 | 多维表是否有记录 | 最近更新时间 | 成功率 | 备注 | 账号 | 测试情况 |
|------|------|-----------------|-------------|--------|------|------|----------|
| TikTok LIVE | www.tiktok.com | 有 | 2026-03-31 | 0 | 已有记录，但近期成功率不达标 | | |
| 17LIVE | 17.live | 有 | 2025-12-22 | 0 | 已有记录，但当前不达标 | | |
| TwitCasting | twitcasting.tv | 有 | 2026-04-07 | 83.33 | 已有记录，接近阈值，建议继续观察 | | |
| SPWN | spwn.jp | 有 | 2026-04-14 | 61.11 | 主域不达标；子域有达标记录 | | |
| MixChannel | mixch.tv | 有 | 2025-07-14 | 100 | 记录较旧，建议补近期验证 | | |
| Fanicon | fanicon.net | 有 | 2025-02-07 | 100 | 记录时间较早，建议补近期验证 | | |
| Palmu | palmu.jp | 无 | / | / | 建议补站点调研与样本验证 | | |
| Mirrativ | mirrativ.com | 无 | / | / | 建议补站点调研与样本验证 | | |
| Fuwacchi | whowatch.tv | 无 | / | / | 建议补站点调研与样本验证 | | |

### 后续动作建议

- 对 MixChannel、Fanicon 追加近期验证，确认是否可稳定视为当前支持
- 对 TikTok LIVE、17LIVE、TwitCasting、SPWN 继续观察后续成功率变化
- 对 Palmu、Mirrativ、Fuwacchi 补充站点调研与实际样本验证
