import argparse
import subprocess
import shutil
import os
import sys

# Try importing fitz (PyMuPDF) for PDF support
try:
    import fitz
    PDF_SUPPORT = True
except ImportError:
    PDF_SUPPORT = False

def get_pandoc_path():
    """Finds pandoc executable."""
    if shutil.which("pandoc"):
        return "pandoc"
    
    # Common default paths on Windows
    common_paths = [
        r"C:\Program Files\Pandoc\pandoc.exe",
        r"C:\Users\fab\AppData\Local\Pandoc\pandoc.exe",
        os.path.expanduser(r"~\AppData\Local\Pandoc\pandoc.exe")
    ]
    
    for path in common_paths:
        if os.path.exists(path):
            return path
            
    return None

def convert_pdf(input_file, output_dir, output_filename):
    """
    Converts PDF to Markdown by manually iterating over PyMuPDF blocks.
    This ensures clean Markdown output without HTML tags or layout artifacts.
    """
    if not PDF_SUPPORT:
        print("Error: 'pymupdf' (fitz) is not installed. Cannot convert PDF.")
        print("Please install it: pip install pymupdf")
        sys.exit(1)

    print("Analyzing PDF layout and extracting content...")
    
    try:
        doc = fitz.open(input_file)
        md_content = []
        image_dir = os.path.join(output_dir, "images")
        if not os.path.exists(image_dir):
            os.makedirs(image_dir)
            
        base_filename = os.path.splitext(os.path.basename(input_file))[0]
        
        # Calculate most common font size to distinguish body text from headers
        # We sample a few pages
        font_sizes = {}
        for page in doc[:min(5, len(doc))]:
            blocks = page.get_text("dict")["blocks"]
            for b in blocks:
                if b["type"] == 0: # text
                    for line in b["lines"]:
                        for span in line["spans"]:
                            size = round(span["size"], 1)
                            font_sizes[size] = font_sizes.get(size, 0) + len(span["text"])
        
        # Determine body text size (most frequent)
        body_size = max(font_sizes, key=font_sizes.get) if font_sizes else 12
        print(f"Detected body font size: {body_size}")
        
        img_count = 0
        
        for page_num, page in enumerate(doc):
            blocks = page.get_text("dict")["blocks"]
            # Sort blocks vertically then horizontally
            # blocks are usually already sorted, but good to be safe
            # blocks.sort(key=lambda b: (b["bbox"][1], b["bbox"][0]))
            
            for b in blocks:
                if b["type"] == 1: # Image
                    ext = b["ext"]
                    image_filename = f"{base_filename}_p{page_num}_{img_count}.{ext}"
                    image_path = os.path.join(image_dir, image_filename)
                    with open(image_path, "wb") as fimg:
                        fimg.write(b["image"])
                    
                    # Relative path for Markdown
                    rel_path = f"images/{image_filename}"
                    md_content.append(f"\n![]({rel_path})\n")
                    img_count += 1
                    
                elif b["type"] == 0: # Text
                    block_text = ""
                    # Check for headers based on font size of the first span
                    is_header = False
                    header_level = 0
                    
                    # Simple heuristic: get the size of the first significant span
                    first_span_size = 0
                    for line in b["lines"]:
                        for span in line["spans"]:
                            if span["text"].strip():
                                first_span_size = span["size"]
                                break
                        if first_span_size: break
                    
                    if first_span_size > body_size * 1.5:
                        header_level = 1
                    elif first_span_size > body_size * 1.2:
                        header_level = 2
                    elif first_span_size > body_size * 1.1:
                        header_level = 3
                        
                    prefix = "#" * header_level + " " if header_level > 0 else ""
                    
                    lines_text = []
                    for line in b["lines"]:
                        line_content = "".join([span["text"] for span in line["spans"]])
                        lines_text.append(line_content)
                    
                    # Join lines in the block
                    # If it's a header, join with space, otherwise maybe newline?
                    # Usually blocks are paragraphs.
                    text_content = " ".join(lines_text) if header_level > 0 else "\n".join(lines_text)
                    
                    md_content.append(f"{prefix}{text_content}\n")

        # Write final Markdown
        output_path = os.path.join(output_dir, output_filename)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write("\n".join(md_content))
            
        print(f"Successfully converted PDF to {output_path}")
        
    except Exception as e:
        print(f"Error converting PDF: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


def convert_to_md(input_file, output_file=None, output_format="gfm"):
    """
    Converts a file to Markdown using Pandoc (or pymupdf4llm for PDF).
    """
    if not os.path.exists(input_file):
        print(f"Error: Input file '{input_file}' not found.")
        sys.exit(1)

    # Determine output directory and filename
    if output_file is None:
        base_name = os.path.splitext(os.path.basename(input_file))[0]
        # Create a directory with the same name as the file
        output_dir = os.path.join(os.path.dirname(os.path.abspath(input_file)), base_name)
        output_filename = f"{base_name}.md"
    else:
        # If output file is provided, use its parent dir as the output directory
        output_dir = os.path.dirname(os.path.abspath(output_file))
        if not output_dir: # Handle case where output_file is just a filename
            output_dir = os.getcwd()
        output_filename = os.path.basename(output_file)
        base_name = os.path.splitext(output_filename)[0]

    # Create the output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created output directory: {output_dir}")

    # Check file extension
    ext = os.path.splitext(input_file)[1].lower()
    
    if ext == '.pdf':
        convert_pdf(input_file, output_dir, output_filename)
        return

    # For other formats, use Pandoc
    pandoc_exe = get_pandoc_path()
    if not pandoc_exe:
        print("Error: 'pandoc' is not found in your system PATH or common locations.")
        print("Please install Pandoc from https://pandoc.org/installing.html")
        sys.exit(1)

    # Get absolute path for input file because we will change cwd
    abs_input_file = os.path.abspath(input_file)
    
    # Construct command
    # We run pandoc inside the output directory so that --extract-media creates
    # a relative 'images' folder and the markdown links are relative 'images/...'
    cmd = [
        pandoc_exe,
        abs_input_file,
        "-t", output_format,
        "-o", output_filename,
        "--extract-media=images"
    ]

    print(f"Converting '{input_file}' to '{os.path.join(output_dir, output_filename)}' using Pandoc...")
    print(f"Images will be extracted to '{os.path.join(output_dir, 'images')}'")
    
    try:
        # Run pandoc with cwd set to output_dir
        subprocess.run(cmd, check=True, capture_output=True, text=True, cwd=output_dir)
        print(f"Successfully converted.")
    except subprocess.CalledProcessError as e:
        print(f"Error during conversion:")
        print(e.stderr)
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert documents to Markdown using Pandoc (or pymupdf4llm for PDF).")
    parser.add_argument("input_file", help="Path to the file to convert (docx, html, latex, pdf, etc.)")
    parser.add_argument("-o", "--output", help="Path to the output Markdown file")
    parser.add_argument("--format", default="gfm", help="Target Pandoc markdown format (default: gfm) - Ignored for PDF")

    args = parser.parse_args()
    convert_to_md(args.input_file, args.output, args.format)
