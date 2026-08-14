// js/files.js

export const VFS = {
  STORAGE_KEY: "gh_ide_vfs_v2",

  getInitialFiles() {
    return {
      "index.html": {
        name: "index.html",
        type: "file",
        language: "html",
        content: `<!DOCTYPE html>\n<html>\n<head>\n  <style>body { font-family: sans-serif; background: #222; color: #fff; text-align: center; padding-top: 50px; }</style>\n</head>\n<body>\n  <h1>Modular Web IDE</h1>\n  <p>Edit or delete files on the left to customize!</p>\n</body>\n</html>`
      },
      "main.py": {
        name: "main.py",
        type: "file",
        language: "python",
        content: `# Pyodide Python Engine\nitems = ["Python", "JavaScript", "React", "C++", "Bash"]\nprint("Available languages:")\nfor idx, lang in enumerate(items, 1):\n    print(f"{idx}. {lang}")`
      },
      "script.js": {
        name: "script.js",
        type: "file",
        language: "javascript",
        content: `// Clean JS Entry Point\nconsole.log("Script loaded successfully.");`
      }
    };
  },

  loadWorkspace() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : this.getInitialFiles();
  },

  saveWorkspace(files) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files));
  },

  createItem(files, pathName, initialContent = null) {
    if (!pathName) return files;
    const isFolder = pathName.endsWith("/");
    const cleanName = isFolder ? pathName.slice(0, -1) : pathName;
    const ext = cleanName.split('.').pop().toLowerCase();

    let lang = "javascript";
    if (ext === "py") lang = "python";
    if (ext === "jsx" || ext === "tsx") lang = "react";
    if (ext === "html" || ext === "htm") lang = "html";
    if (ext === "sh" || ext === "bash") lang = "bash";
    if (ext === "cpp" || ext === "c") lang = "cpp";
    if (ext === "json") lang = "json";
    if (ext === "css") lang = "css";

    const defaultBody = isFolder ? "" : (initialContent ?? `// ${cleanName}`);

    return {
      ...files,
      [cleanName]: {
        name: cleanName,
        type: isFolder ? "folder" : "file",
        language: lang,
        content: defaultBody
      }
    };
  },

  deleteItem(files, targetName) {
    const updated = { ...files };
    delete updated[targetName];
    return updated;
  }
};
