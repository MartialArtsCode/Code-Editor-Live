# GitHub Pages Web IDE & Snippet Playground

A browser-based IDE engineered for **GitHub Pages**.

## Features
- **Virtual File System (VFS):** Create folders (`folder/`), create files, and delete non-essential files to focus on specific code tests.
- **Persistent State:** Uses browser `localStorage` to save file edits across reloads.
- **Multi-Language Support:**
  - **JavaScript / HTML / React:** Live execution using dynamic sandbox previews.
  - **Python:** Client-side execution powered by **Pyodide (WebAssembly CPython)**.
  - **Bash & C++:** Reference starter templates and snippet libraries with built-in explanations.
- **Snippet Library:** Side-panel with production-ready snippets that insert directly into the active editor.
