import os

# ================= 配置区 =================
# 1. 目标文件夹路径 (请改为你的实际路径)
# 注意：在 Windows 里，路径里的反斜杠 \ 要写成双斜杠 \\ 或者用 r""
target_folder = r"c:\Pm_Workspace\learning_playground\renaming_task"

# 2. 安全开关：True = 只打印不执行 (预览模式)；False = 真干
dry_run = True  

# ================= 脚本逻辑 =================

def batch_rename():
    print(f"📂 正在扫描文件夹: {target_folder}")
    print("-" * 50)

    # 获取文件夹里所有文件的名字
    # os.listdir() 就像你在文件夹里点开查看一样
    files = os.listdir(target_folder)

    count = 0
    for filename in files:
        # --- 在这里定义你的改名规则 ---
        # 例子：把文件名里的 "空格" 换成 "下划线"
        if " " in filename:
            new_filename = filename.replace(" ", "_")
            
            # 拼接完整路径：文件夹路径 + 文件名
            old_path = os.path.join(target_folder, filename)
            new_path = os.path.join(target_folder, new_filename)

            if dry_run:
                print(f"[预览] {filename}  -->  {new_filename}")
            else:
                # 真正的改名动作
                os.rename(old_path, new_path)
                print(f"[完成] {filename}  -->  {new_filename}")
            
            count += 1

    print("-" * 50)
    if dry_run:
        print(f"⚠️  这是预览模式，没有文件被修改。")
        print(f"💡 想要真改，请把代码里的 dry_run = True 改为 False")
    else:
        print(f"✅ 大功告成！一共修改了 {count} 个文件。")

if __name__ == "__main__":
    batch_rename()
