# 扩展知识库总索引

## 作用
本文件用于统一维护 StreamFab 浏览器扩展的插件清单、阶段状态和目录入口。

## 产品线概览
- 产品线名称：StreamFab 浏览器扩展
- 命名规则：`streamfab_<service>_downloader_for_browser`
- 当前插件总数：`13`

## 目录结构
```text
.product_knowledge/Extension/
├── README.md                                      ## 产品线入口说明
├── index.md                                       ## 当前索引文件
├── DAILY_CHANGELOG.md                             ## 每日变更记录（脚本生成）
├── _common/                                       ## 通用基线、模板、脚本、skill 全部收敛在此
│   ├── FRAMEWORK.md                               ## 框架定稿，结构与写作规则唯一权威
│   ├── READING_MAP.md                             ## AI 阅读路线 + 检测模式归属表
│   ├── plugin_rules.md                            ## 跨插件规则总览
│   ├── backlog.md                                 ## 需求池快照（飞书为权威）
│   ├── references/                                ## 通用规则文档（含 baselines/）
│   ├── prototype/                                 ## 通用原型 Demo
│   ├── templates/                                 ## 新插件模板
│   ├── scripts/                                   ## 自动化脚本
│   └── skills/                                    ## 插件 init / workflow skill
├── streamfab_video_downloader_for_browser/        ## Video Downloader 插件目录
├── streamfab_amazon_downloader_for_browser/       ## Amazon 插件目录
├── streamfab_netflix_downloader_for_browser/      ## Netflix 插件目录
├── streamfab_disney_plus_downloader_for_browser/  ## Disney Plus 插件目录
├── streamfab_hulu_downloader_for_browser/         ## Hulu 插件目录
├── streamfab_tver_downloader_for_browser/         ## TVer 插件目录
├── streamfab_fanza_downloader_for_browser/        ## FANZA 插件目录
├── streamfab_u_next_downloader_for_browser/       ## U-NEXT 插件目录
├── streamfab_onlyfans_downloader_for_browser/     ## OnlyFans 插件目录
├── streamfab_fandango_at_home_downloader_for_browser/ ## Fandango at Home 插件目录
├── streamfab_myfans_downloader_for_browser/       ## myfans 插件目录
├── streamfab_mpd_downloader_for_browser/          ## DRM MPD 插件目录
└── streamfab_m3u8_downloader_for_browser/         ## M3U8 插件目录
```

## 当前阶段
- 已上线：Video、Amazon、Netflix、Disney Plus、M3U8、OnlyFans
- 集成中：U-NEXT、FANZA、myfans
- 待研发：Hulu、TVer、Fandango at Home、DRM MPD

## 插件清单
| 插件 | 阶段 | 目录 |
| --- | --- | --- |
| `streamfab_video_downloader_for_browser` | 已上线 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_video_downloader_for_browser` |
| `streamfab_amazon_downloader_for_browser` | 已上线 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_amazon_downloader_for_browser` |
| `streamfab_netflix_downloader_for_browser` | 已上线 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_netflix_downloader_for_browser` |
| `streamfab_disney_plus_downloader_for_browser` | 已上线 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_disney_plus_downloader_for_browser` |
| `streamfab_onlyfans_downloader_for_browser` | 已上线 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_onlyfans_downloader_for_browser` |
| `streamfab_u_next_downloader_for_browser` | 集成中 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_u_next_downloader_for_browser` |
| `streamfab_hulu_downloader_for_browser` | 待研发 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_hulu_downloader_for_browser` |
| `streamfab_tver_downloader_for_browser` | 待研发 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_tver_downloader_for_browser` |
| `streamfab_fanza_downloader_for_browser` | 集成中 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_fanza_downloader_for_browser` |
| `streamfab_fandango_at_home_downloader_for_browser` | 待研发 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_fandango_at_home_downloader_for_browser` |
| `streamfab_myfans_downloader_for_browser` | 集成中 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_myfans_downloader_for_browser` |
| `streamfab_mpd_downloader_for_browser` | 待研发 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_mpd_downloader_for_browser` |
| `streamfab_m3u8_downloader_for_browser` | 已上线 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_m3u8_downloader_for_browser` |

## 阅读入口
- 框架与目录结构（唯一权威）：`_common/FRAMEWORK.md`
- AI 阅读路线 + 检测模式归属表：`_common/READING_MAP.md`
- 产品线入口：`README.md`
- 单插件入口：各插件目录下的 `README.md`，差异索引看 `diff_summary.md`
- 需求入口：各插件目录下的 `requirements/`
- 通用视觉规范：`_common/references/visual_guidelines.md`
- 通用 UX 规范：`_common/references/ux_patterns.md`
- 通用结构尺寸参考：`_common/references/layout_specs.md`
- 检测模式基线：`_common/references/baselines/netflix_mode.md` / `ytdlp_mode.md`
