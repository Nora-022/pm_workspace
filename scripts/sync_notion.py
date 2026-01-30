import os
import json
import requests
import sys

# Try to read .env file manually if it exists (simple parser)
env_path = os.path.join(os.getcwd(), '.env')
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                os.environ[key.strip()] = value.strip()

NOTION_TOKEN = os.environ.get("NOTION_INTEGRATION_TOKEN")
PAGE_ID = os.environ.get("NOTION_PAGE_ID")

if not NOTION_TOKEN or not PAGE_ID:
    print("❌ Error: Environment variables NOTION_INTEGRATION_TOKEN or NOTION_PAGE_ID are missing.")
    print("Please create a .env file in the root directory with these variables, or set them in your terminal.")
    sys.exit(1)

headers = {
    "Authorization": "Bearer " + NOTION_TOKEN,
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28"
}

# Read the file
file_path = r"c:\Pm_Workspace\knowledge_base\daily_logs\2026-01-20_Learning_Log.md"
try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
except FileNotFoundError:
    print(f"❌ Error: File not found at {file_path}")
    sys.exit(1)

# Create the page
url = "https://api.notion.com/v1/pages"
payload = {
    "parent": {"page_id": PAGE_ID},
    "properties": {
        "title": {
            "title": [
                {
                    "text": {
                        "content": "2026-01-20 Git 学习笔记"
                    }
                }
            ]
        }
    },
    "children": [
        {
            "object": "block",
            "type": "code",
            "code": {
                "rich_text": [{ "type": "text", "text": { "content": content } }],
                "language": "markdown"
            }
        }
    ]
}

print("🚀 Sending request to Notion...")
response = requests.post(url, headers=headers, json=payload)

if response.status_code == 200:
    print("✅ Success! Page created in Notion.")
    print("URL:", response.json().get("url"))
else:
    print(f"❌ Failed with status {response.status_code}")
    print(response.text)
