import fitz  # pymupdf
import sys

def debug_pdf(pdf_path, page_num):
    doc = fitz.open(pdf_path)
    if page_num >= len(doc):
        print(f"Page {page_num} out of range (max {len(doc)-1})")
        return

    page = doc[page_num]
    
    print(f"--- Text Extraction (Page {page_num}) ---")
    # Try html extraction
    html = page.get_text("html")
    print(html[:2000])
    
    # print("\n--- Block Extraction ---")
    blocks = page.get_text("blocks")
    for b in blocks[:5]: # Print first 5 blocks
        print(b)

if __name__ == "__main__":
    pdf_path = r"c:\Pm_Workspace\【SF 插件】Common 逻辑规范 (4).pdf"
    # Inspecting around page 8-10 based on the markdown output roughly
    debug_pdf(pdf_path, 8) 
