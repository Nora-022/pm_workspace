@echo off
chcp 65001 >nul
echo ========================================================
echo   News Bot 自动任务安装向导 (Windows Task Scheduler)
echo ========================================================
echo.

:: 1. 定义任务名称和路径
set TASK_NAME=AlexNewsBot
set RUN_FILE="%~dp0run_bot.bat"

echo [1/3] 正在检测脚本路径...
echo 目标文件: %RUN_FILE%
echo.

echo [2/3] 正在创建计划任务...
echo 设定: 每天早上 09:00 自动运行
echo.

:: 使用 schtasks 创建任务
:: /tn : Task Name
:: /tr : Task Run (运行什么)
:: /sc : Schedule (daily)
:: /st : Start Time (09:00)
:: /f  : Force (如果存在则覆盖)
schtasks /create /tn "%TASK_NAME%" /tr %RUN_FILE% /sc daily /st 09:00 /f

if %errorlevel% equ 0 (
    echo.
    echo ✅ 成功！任务 "%TASK_NAME%" 已创建。
    echo 📅 明天早上 9 点，你的飞书应该会收到消息。
    echo.
    echo 💡 想测试一下？请在下面输入 Y 并回车，立即运行一次。
    set /p run_now="是否立即运行测试? (Y/N): "
) else (
    echo.
    echo ❌ 创建失败。请尝试【右键 -> 以管理员身份运行】此脚本。
)

if /i "%run_now%"=="Y" (
    schtasks /run /tn "%TASK_NAME%"
    echo 🚀 已触发任务，请检查飞书。
)

pause
