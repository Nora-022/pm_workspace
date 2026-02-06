---
name: pandoc-converter
description: Converts various document formats (Word .docx, HTML, LaTeX, PDF, EPUB, etc.) into clean Markdown using the local Pandoc tool. Use this skill when the user wants to transform an existing document file into Markdown format for editing, documentation, or LLM context ingestion. Requires 'pandoc' to be installed on the user's machine.
---

# Pandoc to Markdown Converter

This skill provides a wrapper to convert documents into Markdown. It uses **Pandoc** for most formats (docx, html, etc.) and **PyMuPDF4LLM** for PDF files.

## Prerequisites

1.  **Pandoc**: Must be installed and available in your system's PATH (or default locations).
    -   **Windows**: `winget install pandoc` or download from [pandoc.org](https://pandoc.org/installing.html)
    -   **macOS**: `brew install pandoc`
    -   **Linux**: `sudo apt install pandoc`

2.  **PyMuPDF4LLM**: Required for PDF conversion.
    -   `pip install pymupdf4llm`

## Usage

### 1. Basic Conversion
To convert a file (e.g., `MyDoc.docx` or `MyDoc.pdf`), the skill will automatically detect the format.
It creates a folder named `MyDoc`, and places `MyDoc.md` and an `images/` folder inside it.

```python
python scripts/convert_to_md.py "path/to/MyDoc.docx"
# OR for PDF
python scripts/convert_to_md.py "path/to/MyDoc.pdf"
```

**Output Structure:**
```
path/to/MyDoc/
  ├── MyDoc.md
  └── images/
      ├── image1.png
      └── ...
```

### 2. Specify Output File
You can still specify an output file, but the script will ensure it creates the necessary folder structure relative to that output path.

```python
python scripts/convert_to_md.py "input.html" -o "output_folder/CustomName.md"
```

### 3. Supported Formats

-   **PDF** (`.pdf`) - via PyMuPDF4LLM
-   **Microsoft Word** (`.docx`) - via Pandoc
-   **HTML** (`.html`) - via Pandoc
-   **LaTeX** (`.tex`) - via Pandoc
-   **EPUB** (`.epub`) - via Pandoc
-   And many others supported by Pandoc.

### 4. Advanced Usage (Direct CLI)

If you need advanced Pandoc features (like custom templates, citation processing, or specific extensions), you can run the `pandoc` command directly if the script's wrapper is too limiting:

```bash
pandoc input.docx -f docx -t gfm --extract-media=./media -o output.md
```

## Troubleshooting

-   **"Error: 'pandoc' is not found"**: This means Pandoc is not installed or not in your PATH. Please install it and restart your terminal/IDE.
-   **Encoding Issues**: Pandoc assumes UTF-8 input. If your source file is in a different encoding, you may need to convert it first.
