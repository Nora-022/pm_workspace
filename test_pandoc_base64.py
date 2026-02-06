import fitz
import subprocess
import os

def test_pdf_html_pandoc(pdf_path):
    doc = fitz.open(pdf_path)
    # Get HTML from first page with images (e.g., page 0 or 1)
    html_content = ""
    for page in doc[:2]:
        html_content += page.get_text("html")
    
    tmp_html = "test_output.html"
    with open(tmp_html, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    # Run pandoc
    cmd = [
        "pandoc",
        tmp_html,
        "-t", "gfm",
        "-o", "test_output.md",
        "--extract-media=images"
    ]
    
    try:
        subprocess.run(cmd, check=True)
        print("Pandoc conversion finished.")
        
        # Check if images folder exists and has content
        if os.path.exists("images") and os.listdir("images"):
            print(f"Images extracted: {os.listdir('images')}")
        else:
            print("No images extracted.")
            
        # Check markdown content
        with open("test_output.md", "r", encoding="utf-8") as f:
            print(f.read()[:500])
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_pdf_html_pandoc(r"c:\Pm_Workspace\【SF 插件】Common 逻辑规范 (4).pdf")
