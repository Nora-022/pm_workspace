# 🤖 飞书资讯推送机器人 (Feishu News Bot)

这个小项目展示了如何用 Python 搭建一个自动化的资讯管道：
**抓取 (Input)** -> **处理 (Process)** -> **推送 (Output)**

## 📂 文件结构
*   `daily_news_bot.py`: 核心脚本。

## 🚀 如何运行

### 第一步：获取飞书 Webhook (这是机器人的“电话号码”)
你需要一个飞书群（或者拉个 3 人小群再踢掉别人，只留你自己）。

1.  打开飞书电脑端。
2.  进入一个群聊。
3.  点击右上角 `...` (设置) -> **群机器人** (Bots)。
4.  点击 **添加机器人** (Add Bot)。
5.  选择 **自定义机器人** (Custom Bot)。
6.  名字随便起，比如 "行业情报员"。
7.  **重要：** 复制生成的 `Webhook URL` (以 `https://open.feishu.cn/...` 开头)。
    *   *安全设置选“自定义关键词”，填入 "资讯" 或者 "行业" (如果脚本里没发这个词，可能会被飞书拦截，建议先不设安全校验，或者选IP白名单填本地IP，最简单是选关键词然后确保脚本标题里有这个词)*。
    *   **脚本里的关键词：** 我的脚本标题里写了 `"🔥 行业资讯速递"`，所以如果飞书让你设关键词，请填 **"资讯"**。

### 第二步：配置脚本
1.  用 VS Code 打开 `daily_news_bot.py`。
2.  找到第 9 行：
    ```python
    FEISHU_WEBHOOK_URL = "你的_WEBHOOK_地址_填在这里"
    ```
3.  把你的 URL 填进去。

### 第三步：运行
在终端输入：
```bash
python c:\Pm_Workspace\learning_playground\news_bot\daily_news_bot.py
```

## 🧠 代码原理解析
*   **Input**: 我们使用了 `urllib` (Python 自带库) 去访问 Hacker News 的公开 API。
*   **Process**: 我们把抓到的 JSON 数据解析，提取 Title 和 URL。
*   **Output**: 我们把数据包装成飞书能看懂的 **"卡片消息" (Interactive Card)** 格式，通过 `POST` 请求发给 Webhook。

## 🔮 进阶思考
现在的源是 Hacker News。
如果你想抓“特定的行业资讯” (比如 某某官网)，你需要：
1.  找到那个网站的 RSS Feed (最简单)。
2.  或者使用 `BeautifulSoup` 库去爬取网页 HTML (进阶)。
