# FANZA 平台调研文档

更新时间：2026-03-10

## 一页结论

FANZA 本质上不是单一视频网站，而是以成人内容为核心的综合数字内容与交易平台。

核心特征：
1. 它是 DMM.R18 在 2018-08-01 更名后的品牌，由株式会社デジタルコマース运营，账号、积分、部分平台能力与 DMM 体系强绑定。
2. 它的产品不只有视频，还包含单片视频、月额视频、VR、TV 订阅内容、游戏、电子书、同人、电商、直播聊天、在线抽奖、抓娃娃、资讯导购等。
3. 从产品结构看，它更像成人内容超级入口 + 内容电商 + 会员订阅 + 促销运营平台，而不是纯内容社区。

## 1. 平台定位

官方脉络显示，FANZA 是原 DMM.R18 的品牌升级版。2018-03-01 成人业务承接到デジタルコマース，2018-08-01 正式改名为 FANZA；系统运维与用户 DMM 账号、购买记录、积分等仍与 DMM 体系连续。

可以将其定位为：
- 成人向数字内容综合平台
- 内容分发 + 交易 + 订阅 + 活动运营平台
- DMM 生态中的成人内容商业入口

## 2. 内容范围

从官方帮助中心当前分类看，FANZA 覆盖内容/服务包括：
- 動画
- 月額動画
- VR動画
- FANZA TV
- FANZA GAMES
- DMM GAMES STORE
- アダルトPCゲーム
- GAME 遊び放題
- FANZAブックス
- 同人
- FANZA通販
- FANZA 宅配レンタル（月额DVD/CD）
- FANZA 宅配レンタル（单品DVD/CD）
- ライブチャット
- 出会い
- マーケットプレイス
- FANZAオークション
- FANZAオンラインくじ
- FANZAキャッチ
- ロイヤルキャッチ
- FANZAキャラチャット
- 無料動画
- FANZAみんおす
- ニュース
- アフィリエイト

可抽象成 5 层：
1. 主内容层：视频、VR、书籍、同人、游戏
2. 消费方式层：单次购买、月额订阅、会员包、租赁、实物购买
3. 互动延展层：直播聊天、角色聊天、资讯导购、评论收藏、优惠提醒
4. 周边商业层：在线抽奖、抓娃娃、周边商城
5. 增长层：活动、Affiliate、收藏提醒、降价提醒

## 3. 视频产品结构

### 3.1 FANZA 動画
按单作品购买，支持：
- 仅下载
- 仅串流
- 下载 + 串流组合

并存在明确权限字段：
- 视听期限
- 下载期限
- 串流期限

### 3.2 月額動画
频道式月订阅内容。
- 订阅期间可用
- 自动续费
- 部分作品支持 4K

### 3.3 VR動画
独立产品线，不只是普通视频的一个标签。
- 普通版最高到 4K / 30fps
- HQ/UHQ 可到 4.5K / 60fps
- 另有 8K VR

### 3.4 FANZA TV
与 DMM Premium 绑定的视频配信服务。
- 截至 2026 年 1 月，官方帮助显示约 2,300 部目标成人作品可看
- 更像会员包内精选库，而非全量 FANZA 视频总库

## 4. 视频类型：从产品角度理解

从产品交付形态看，可分为：
1. Transactional VOD：单片购买
2. Subscription VOD：月额频道
3. Bundled Membership VOD：FANZA TV / DMM Premium 权益包内内容
4. High-resolution Video：HD / 4K 单片
5. Immersive Video：VR / 8K VR
6. Free Sample / Trial Content：免费样片、体验内容

## 5. 产品结构：用户消费链路

典型链路：
1. 登录 DMM 账号
2. 浏览作品、频道、专题
3. 收藏商品或收藏出演者
4. 加入购物车或订阅
5. 支付
6. 进入购买済み列表或订阅内容
7. 选择串流或下载
8. 在播放器或设备中消费
9. 接收降价、促销、活动通知
10. 再次购买或参与活动

关键特点：
- 购物车重要，不是点开即看
- 购买済み一覧是核心资产页
- お気に入り商品 / お気に入り出演者 是重要留存与转化功能
- 平台高度依赖促销运营

## 6. FANZA 的平台型特征

1. 强 SKU 逻辑：大量以作品 SKU 为中心
2. 强促销逻辑：大促、限时价、低价活动频繁
3. 强账号资产逻辑：账号、积分、购买履历、收藏、订阅状态长期积累
4. 强设备与权限逻辑：下载、串流、有效期、播放器、设备兼容并存
5. 强生态联动：视频之外，游戏、书籍、同人、实体商品、抽奖等互相导流

## 7. 面向插件设计最值得关注的点

如果目标是 StreamFab Fanza Downloader for Browser，优先关注：
1. 视频消费入口：作品页、频道页、播放器页谁是主入口
2. 登录依赖：下载是否强依赖登录态
3. 播放形态：单片、月额、TV、VR 是否走不同链路
4. 清晰度与格式：普通视频、4K、VR、8K VR 的交付差异
5. 权限期限：视听、下载、串流期限对下载工具设计影响极大
6. 购买済み / 收藏 / 活动页：用户实际发起下载需求的主要场景

## 8. 当前可以明确的业务现实

- FANZA 品牌自 2018-08-01 起使用
- FANZA TV 与 DMM Premium 绑定，不是完全独立会员体系
- 月額動画、動画、VR動画 是三条明显不同的视频产品线
- 同人通販官方公告已在 2024-09-30 结束，说明平台服务结构会调整
- 支付方式与卡组织可用性曾发生变化，说明成人内容平台会受支付侧约束

## 9. 建议的一句话理解

FANZA = 日本成人内容领域的 DMM 生态内综合内容交易平台，以视频为核心，但本质上是多内容形态 + 多消费模式 + 强账号资产 + 强促销运营的平台。

从产品设计角度可以理解为：
成人内容版的 Amazon + Prime Video + App Store + Campaign Engine 的混合体。

## 10. 本文档的使用边界

这份文档适合用于：
- 平台认知
- 产品结构理解
- 插件立项前背景阅读

这份文档不适合直接用于：
- 技术抓流方案结论
- 精确商业规模判断
- DRM / 分发协议实现细节判断

## 参考来源

- FANZA Help Center: https://support.dmm.co.jp/
- FANZA TV 官方帮助: https://support.dmm.co.jp/fanza-tv/article/47682
- 月額動画 4K 官方帮助: https://support.dmm.co.jp/monthly/article/48419
- 月額動画有效期官方帮助: https://support.dmm.co.jp/monthly/article/36304
- 视频期限官方帮助: https://support.dmm.co.jp/digital/article/14311
- 下载 + 串流官方帮助: https://support.dmm.co.jp/digital/article/14312
- 视频播放测试官方帮助: https://support.dmm.co.jp/digital/article/48644
- VR 画质官方帮助: https://support.dmm.co.jp/vr/article/45277
- 8K VR 体验官方帮助: https://support.dmm.co.jp/vr/article/47810
- FANZAみんおす 官方帮助: https://support.dmm.co.jp/osusume/article/49179
- DMM / FANZA 更名 PR: https://prtimes.jp/main/html/rd/p/000003114.000002581.html
- FANZA 名称含义与品牌说明: https://www.value-press.com/pressrelease/213354
- FANZA 7周年官方稿: https://www.value-press.com/s/pressrelease/370138
- 同人通販结束公告: https://support.dmm.co.jp/announcements/45