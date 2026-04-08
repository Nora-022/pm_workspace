# 扩展共性规则

## 规则 1：检测模式
- ytdlp 类插件：预分析 + 多 Origin + 检测与下载可并行
- Netflix 类插件：直出分析 + 单 Origin + 下载中暂停新检测

## 规则 2：文档落位
- 插件差异写到插件自己的 `04_interaction_details.md` 和 `06_business_rules.md`
- 插件共性规则写到本文件
- 原始资料写到各插件的 `requirements/`

## 规则 3：阅读顺序
- 先看 `index.md`
- 再看本文件
- 再进入具体插件目录
