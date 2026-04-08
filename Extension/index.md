# 扩展知识库总索引

## 作用
这是 StreamFab 浏览器扩展产品线的主索引文件。它把“插件清单、阶段进度、问题定位、阅读顺序”集中到一个入口，避免索引信息分散在多个 md 文件中。

## 产品线概览
- 产品线名称：StreamFab 浏览器扩展
- 命名规则：`streamfab_<service>_downloader_for_browser`
- 当前插件总数：9

## 当前阶段
- 已上线：Video、Amazon、Netflix、Disney Plus
- 产品准备中：Hulu、TVer、FANZA、U-NEXT、OnlyFans

## 插件清单
| 插件 | 阶段 | 定位 | 目录 | 需求入口 |
| --- | --- | --- | --- | --- |
| streamfab_video_downloader_for_browser | 已上线 | 多站点视频下载插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_video_downloader_for_browser` | `requirements/index.md` |
| streamfab_amazon_downloader_for_browser | 已上线 | Amazon / Prime Video 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_amazon_downloader_for_browser` | `requirements/index.md` |
| streamfab_netflix_downloader_for_browser | 已上线 | Netflix 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_netflix_downloader_for_browser` | `requirements/index.md` |
| streamfab_disney_plus_downloader_for_browser | 已上线 | Disney Plus 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_disney_plus_downloader_for_browser` | `requirements/index.md` |
| streamfab_hulu_downloader_for_browser | 产品准备中 | Hulu 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_hulu_downloader_for_browser` | `requirements/index.md` |
| streamfab_tver_downloader_for_browser | 产品准备中 | TVer 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_tver_downloader_for_browser` | `requirements/index.md` |
| streamfab_fanza_downloader_for_browser | 产品准备中 | FANZA 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_fanza_downloader_for_browser` | `requirements/index.md` |
| streamfab_u_next_downloader_for_browser | 产品准备中 | U-NEXT 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_u_next_downloader_for_browser` | `requirements/index.md` |
| streamfab_onlyfans_downloader_for_browser | 产品准备中 | OnlyFans 单站点插件 | `C:\Users\fab\yuki-studio-repo\pm-workspace\.product_knowledge\Extension\streamfab_onlyfans_downloader_for_browser` | `requirements/index.md` |

## 进度概览
| 插件 | 业务阶段 | 知识库状态 | 备注 |
| --- | --- | --- | --- |
| Video | 已上线 | 已有目录 | 当前主维护插件 |
| Amazon | 已上线 | 已有目录 | 已接入知识库 |
| Netflix | 已上线 | 已有目录 | 已接入知识库 |
| Disney Plus | 已上线 | 已有目录 | 已接入知识库 |
| Hulu | 产品准备中 | 已有目录 | 等待后续补齐 |
| TVer | 产品准备中 | 已有目录 | 等待后续补齐 |
| FANZA | 产品准备中 | 已有目录 | 等待后续补齐 |
| U-NEXT | 产品准备中 | 已有目录 | 等待后续补齐 |
| OnlyFans | 产品准备中 | 已有目录 | 等待后续补齐 |

## 问题定位
- 看整体进度：本文件 `进度概览`
- 看插件目录和状态：本文件 `插件清单`
- 看跨插件共性规则：`common_plugin_rules.md`
- 看单插件入口：各插件目录下的 `00_planning_context.md` 和 `requirements/index.md`

## 使用顺序
1. 先看本文件的产品线概览和进度概览
2. 再看 `common_plugin_rules.md`
3. 再进入具体插件目录
4. 进入插件后先看 `00_planning_context.md`
5. 再看 `requirements/index.md`
