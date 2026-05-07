# Technical Limits — StreamFab U-NEXT Downloader for Browser

## 能力边界

| 参数 | 值 |
|---|---|
| 支持站点 | video.unext.jp（U-NEXT）、H-NEXT |
| 最高分辨率 | 4K / 1080P |
| 视频编码 | H.264、H.265 |
| 音频 | EAC3 5.1、AAC 2.0 |
| 输出格式 | MP4、MKV |
| 字幕 | 外部 SRT 或内嵌 |

## 核心依赖

1. 已安装 CoApp（StreamFab U-Next Coapp）
2. 账号授权成功
3. 账号有可下载次数
4. 可用次数在有效期内

## 限制

- 仅支持 U-NEXT 和 H-NEXT 站点
- 不在未登录 / 未播放情况下放行下载

> 详见 `07_technical_constraints.md`
