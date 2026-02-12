# 零成本自动化：免费定时任务平台大盘点 (The Free Tier Guide)

> **Owner:** Alex Chen
> **Status:** Guide
> **Last Updated:** 2026-02-11

想要脚本 24 小时在线，又不想花钱买服务器？
这是所有独立开发者和自动化爱好者的终极追求。以下是目前市面上最稳健的**“白嫖”**方案。

## 🏆 综合冠军：GitHub Actions

如果不涉及敏感数据（或能接受代码托管在 GitHub），这是**最完美**的方案。

*   **原理:** 你写一个 `.yml` 配置文件，GitHub 给你一台免费的虚拟机（Linux/Windows/Mac），按时启动，跑完销毁。
*   **额度:**
    *   **公共仓库 (Public Repo):** **完全免费，无限制**。
    *   **私有仓库 (Private Repo):** 每月 2,000 分钟（约 33 小时）。对于每天跑几分钟的脚本，根本用不完。
*   **优点:**
    *   不需要信用卡。
    *   不需要配置服务器环境（Python, Node 都是现成的）。
    *   生态极好，很多功能直接 copy 别人的配置就行。
*   **缺点:**
    *   IP 地址不固定（容易被某些反爬虫严格的网站屏蔽）。
    *   最长运行时间限制（通常 6 小时内必须跑完）。
    *   **⚠️ 致命缺点:** 准时性差。GitHub 的定时任务 (Cron) 是“尽力而为”，在高峰期（比如整点）可能延迟 10~30 分钟甚至更久。

### 📝 怎么配置？(Example)
在你的仓库里创建 `.github/workflows/daily.yml`:
```yaml
name: Daily News Bot
on:
  schedule:
    - cron: '0 1 * * *' # 每天 UTC 时间 01:00 运行 (北京时间 09:00)

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: pip install requests
      - name: Run script
        env:
          FEISHU_WEBHOOK: ${{ secrets.FEISHU_WEBHOOK }} # 敏感信息放在 Secrets 里
        run: python daily_news_bot.py
```

---

## 🥈 边缘计算新贵：Cloudflare Workers

如果你擅长 **JavaScript / TypeScript** (现在也支持 Python，但处于 Beta 且有冷启动限制)，这是性能最强的选择。

*   **原理:** 代码运行在 Cloudflare 全球 200+ 个数据中心边缘。
*   **额度 (Free Tier):**
    *   **请求数:** 每天 **10 万次** (100,000 requests/day)。就算你每分钟跑一次，一天也才 1440 次，根本用不完。
    *   **CPU 时间:** **10 毫秒 (10ms)** / 请求。
        *   *注意:* 这是纯计算时间，等待网络请求（比如等待 API 响应）的时间不完全算在内。但如果你要处理图片、解压大文件，这 10ms 瞬间就没了。
    *   **并发数:** 没什么硬性限制，但免费版通常会有冷启动。
*   **触发器:** 自带 Cron Triggers，配置非常简单。
*   **优点:**
    *   速度极快。
    *   非常适合做 API 中转、简单的通知机器人。
*   **缺点:**
    *   **运行时间限制严格:** CPU 工作时间通常只有 10ms~50ms (适合快进快出，不适合做复杂的视频处理或重型爬虫)。
    *   环境特殊 (V8 Isolate)，不是标准的 Node.js 环境，有些库不能用。

---

## 🥉 传统云大厂：Google Cloud Functions / AWS Lambda

*   **原理:** Serverless (无服务器) 架构。
*   **额度:**
    *   AWS: 每月 100 万次请求免费 (Free Tier 通常只有前 12 个月，或有其他限制)。
    *   GCP: 每月 200 万次调用免费。
*   **优点:** 真正的企业级环境，IP 相对干净。
*   **缺点:**
    *   **必须绑定信用卡** (最大的门槛)。
    *   配置面板极其复杂，新手容易迷路。
    *   如果不小心写了死循环，可能导致扣费 (虽然有预算报警)。

---

## ⚡️ 速度与准时性大比拼 (Latency Wars)

你如果对时间极其敏感（比如抢票、整点秒杀），**GitHub Actions 是绝对不行的**。

| 平台 | 准时性 (Punctuality) | 延迟原因 | 适用场景 |
| :--- | :--- | :--- | :--- |
| **GitHub Actions** | **差** (延迟 5~60 分钟) | 全世界的白嫖党都在排队，资源池共享。 | 日报、备份、只要今天跑了就行的任务。 |
| **Cloudflare Workers** | **极好** (秒级) | 分布式边缘节点，无需排队。 | API 监控、整点提醒、简单的状态检查。 |
| **Supabase Edge** | **极好** (秒级) | Deno 运行时启动极快。 | 配合数据库的定时清理、数据统计。 |
| **VPS (自建)** | **完美** (毫秒级) | 你自己的电脑，没人跟你抢。 | **抢票、高频交易**。 |

### 💡 怎么解决 GitHub Actions 的延迟？
1.  **避开高峰期:** 不要设在 `00:00` 或 `08:00` 这种整点。设在 `08:17` 这种奇葩时间，排队的人少，准时率会高很多。
2.  **外部触发 (Webhook):** 不要用 GitHub 自带的 Cron。
    *   搭建一个 **UptimeRobot** (免费监控服务)。
    *   让 UptimeRobot 每 5 分钟 ping 一次你的接口。
    *   用这个 Ping 来触发 GitHub Actions (通过 `repository_dispatch` 事件)。
    *   *评价: 有点折腾，不如直接换 Cloudflare。*

---

## 🏅 数据库即调度器：Supabase (pg_cron)

你刚才的 **SQL Job** 给我上了一课。你是对的，我之前的描述“只存数据”太狭隘了。
Supabase 不仅能存数据，还能通过 **PostgreSQL 扩展 (pg_cron + pg_net)** 直接变身为一个**高精度的定时任务调度器**。

*   **核心玩法:** `pg_cron` (定时器) + `pg_net` (发请求)。
*   **原理:**
    *   你不需要外部的 GitHub Actions 来唤醒它。
    *   数据库自己就有个“闹钟”，时间一到，它就通过 SQL 发送一个 HTTP 请求（比如调用 Edge Function 或你的 Python 服务）。
*   **优势:**
    *   **原子性:** 任务调度和数据在一起。
    *   **准时:** 比 GitHub Actions 准时得多。
    *   **全栈闭环:** 定时触发 -> Edge Function 执行 -> 写入 Database，全在 Supabase 内部完成。

### 📝 你的 SQL Job 范例 (The "User Taught Me" Pattern)
这是最高级的玩法：直接在 SQL 控制台部署定时任务。

```sql
-- 开启扩展 (如果你还没开)
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- 每天早上 09:30 (UTC 01:30) 触发 Edge Function
select cron.schedule(
  'morning-checkin',
  '30 1 * * *',
  $$
  select net.http_post(
      url:='https://your-project.supabase.co/functions/v1/notifier',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_KEY"}'::jsonb
  ) as request_id;
  $$
);
```

*   **修正后的定位:**
    *   **GitHub Actions:** 适合跑复杂的、依赖多的 Python/Shell 脚本。
    *   **Supabase (pg_cron):** 适合跑 **Webhooks**、**API 调用**、或者**轻量级的 Edge Functions** 触发。它是数据库原生的调度器。

---

## ⚠️ 避坑指南 (那些曾经免费的...)

*   **Heroku:** 曾经的神，**现在已经取消免费套餐**。不要再看 2022 年以前的教程了。
*   **Replit:** 可以在线写代码，但**Always On (保持在线)** 功能是收费的。如果只用免费版，窗口关了脚本就停了，不适合定时任务。
*   **Vercel / Netlify:** 主要用于托管前端网页。虽然有 Serverless Functions，但对执行时长限制很严（通常 10秒），且用于跑定时任务属于“滥用边缘”，容易被封号。

## 🎓 Alex 的建议

1.  **首选 GitHub Actions:** 只要你的脚本能在一个文件里跑完，选它准没错。最省心，最“正统”。
2.  **次选 Cloudflare Workers:** 如果你只是做一个简单的 API 转发（比如把 GitHub 的消息转到飞书）。
3.  **本地兜底:** 别忘了你那台 24 小时开机的 **NAS** 或者 **旧安卓手机** (装个 Termux)，它们也是完美的免费服务器。
