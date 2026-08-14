const { useState, useEffect } = React;

const INITIAL_FILES = {
  "index.html": {
    name: "index.html",
    type: "file",
    language: "html",
    content: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; text-align: center; padding-top: 50px; background: #222; color: #fff; }\n    button { padding: 10px 20px; font-size: 16px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>GitHub Pages IDE</h1>\n  <p>Modify code or delete files to test JS isolations!</p>\n  <button onclick="alert('JS Execution Works!')">Click Me</button>\n</body>\n</html>`
  },
  "main.py": {
    name: "main.py",
    type: "file",
    language: "python",
    content: `# Pyodide Python Engine\nitems = ["Python", "JavaScript", "React", "C++", "Bash"]\n\nprint("Languages available in workspace:")\nfor idx, lang in enumerate(items, 1):\n    print(f"{idx}. {lang}")`
  },
  "script.js": {
    name: "script.js",
    type: "file",
    language: "javascript",
    content: `// Pure JavaScript Entry Point\nconsole.log("Isolated JS Test Runner");`
  }
};

function App() {
  const [files, setFiles] = useState(() => {
    const saved = localStorage.getItem("gh_ide_vfs");
    return saved ? JSON.parse(saved) : INITIAL_FILES;
  });

  const [activeFile, setActiveFile] = useState("index.html");
  const [outputConsole, setOutputConsole] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [isRunningPy, setIsRunningPy] = useState(false);
  const [showSnippets, setShowSnippets] = useState(true);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("gh_ide_vfs", JSON.stringify(files));
  }, [files]);

  // Load Wasm Python engine
  useEffect(() => {
    async function initPyodide() {
      if (window.loadPyodide) {
        try {
          const py = await window.loadPyodide();
          setPyodide(py);
        } catch (e) {
          console.warn("Pyodide engine load warning", e);
        }
      }
    }
    initPyodide();
  }, []);

  // Update icons on state shifts
  useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  }, [files, activeFile, showSnippets]);

  // Create file or folder
  const createFile = () => {
    const fileName = prompt("Enter file/folder name (e.g., app.js, main.py, src/):");
    if (!fileName) return;

    if (fileName.endsWith("/")) {
      const folderName = fileName.slice(0, -1);
      setFiles(prev => ({
        ...prev,
        [folderName]: { name: folderName, type: "folder" }
      }));
    } else {
      const ext = fileName.split('.').pop();
      let lang = "javascript";
      if (ext === "py") lang = "python";
      if (ext === "jsx") lang = "react";
      if (ext === "html") lang = "html";
      if (ext === "sh") lang = "bash";
      if (ext === "cpp") lang = "cpp";

      setFiles(prev => ({
        ...prev,
        [fileName]: { name: fileName, type: "file", language: lang, content: `// ${fileName}` }
      }));
      setActiveFile(fileName);
    }
  };

  // Delete target file or folder
  const deleteTarget = (targetName, e) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete ${targetName}?`)) return;

    setFiles(prev => {
      const updated = { ...prev };
      delete updated[targetName];
      return updated;
    });

    if (activeFile === targetName) {
      const remaining = Object.keys(files).filter(f => f !== targetName);
      setActiveFile(remaining.length > 0 ? remaining[0] : "");
    }
  };

  const handleContentChange = (newContent) => {
    setFiles(prev => ({
      ...prev,
      [activeFile]: { ...prev[activeFile], content: newContent }
    }));
  };

  const runPythonCode = async () => {
    if (!pyodide) {
      setOutputConsole("Pyodide engine is initializing... please wait.");
      return;
    }
    setIsRunningPy(true);
    setOutputConsole("Executing Python...\n");

    try {
      pyodide.setStdout({
        batched: (str) => setOutputConsole(prev => prev + str + "\n")
      });
      await pyodide.runPythonAsync(files[activeFile].content);
    } catch (err) {
      setOutputConsole(prev => prev + "\nError: " + err.message);
    } finally {
      setIsRunningPy(false);
    }
  };

  const insertSnippet = (snippetCode) => {
    if (!activeFile) return;
    handleContentChange(files[activeFile].content + "\n\n" + snippetCode);
  };

  const currentFile = files[activeFile];
  const snippets = window.LANGUAGE_SNIPPETS || {};

  return (
    <div className="ide-container">
      <header className="ide-header">
        <div className="ide-title">GitHub Pages Web IDE</div>
        <div className="header-actions">
          {currentFile && currentFile.language === "python" && (
            <button className="btn" onClick={runPythonCode} disabled={isRunningPy}>
              <i data-lucide="play" style={{ width: 14 }}></i> Run Python
            </button>
          )}
          <button className="btn btn-secondary" onClick={() => setShowSnippets(!showSnippets)}>
            <i data-lucide="code" style={{ width: 14 }}></i> Snippets
          </button>
        </div>
      </header>

      <div className="ide-body">
        {/* Sidebar File Explorer */}
        <aside className="sidebar">
          <div className="sidebar-toolbar">
            <span className="sidebar-title">Explorer</span>
            <div className="toolbar-buttons">
              <button className="icon-btn" title="New File or Folder" onClick={createFile}>
                <i data-lucide="file-plus" style={{ width: 16 }}></i>
              </button>
            </div>
          </div>
          <div className="file-tree">
            {Object.keys(files).map(key => {
              const item = files[key];
              return (
                <div
                  key={key}
                  className={`tree-item ${activeFile === key ? "active" : ""}`}
                  onClick={() => item.type === "file" && setActiveFile(key)}
                >
                  <span className="tree-label">
                    <i data-lucide={item.type === "folder" ? "folder" : "file-code"} style={{ width: 14 }}></i>
                    {item.name}
                  </span>
                  <button className="icon-btn" title="Delete" onClick={(e) => deleteTarget(key, e)}>
                    <i data-lucide="trash-2" style={{ width: 12 }}></i>
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Central Code Workspace */}
        <main className="workspace">
          <div className="tabs-bar">
            {Object.keys(files).filter(k => files[k].type === "file").map(key => (
              <div
                key={key}
                className={`tab ${activeFile === key ? "active" : ""}`}
                onClick={() => setActiveFile(key)}
              >
                {key}
              </div>
            ))}
          </div>

          <div className="editor-area">
            {currentFile ? (
              <textarea
                className="code-editor"
                value={currentFile.content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Write code here..."
              />
            ) : (
              <div style={{ padding: 20 }}>Workspace is empty. Create a file to start editing.</div>
            )}

            {/* Live Preview for Web Files */}
            {currentFile && (currentFile.language === "html" || currentFile.language === "react") && (
              <div className="preview-panel">
                <div className="preview-header">HTML / JS Live Sandbox</div>
                <iframe
                  className="preview-iframe"
                  srcDoc={currentFile.content}
                  title="preview"
                  sandbox="allow-scripts"
                />
              </div>
            )}

            {/* Python Console Output */}
            {currentFile && currentFile.language === "python" && (
              <div className="preview-panel">
                <div className="preview-header">Python Execution Console</div>
                <div className="output-console">{outputConsole || "Click 'Run Python' to execute code."}</div>
              </div>
            )}
          </div>
        </main>

        {/* Right Snippets Explorer */}
        {showSnippets && (
          <aside className="snippets-panel">
            <h4 style={{ marginBottom: 12, fontSize: 13 }}>Language Library</h4>
            {Object.keys(snippets).map(lang => (
              <div key={lang} style={{ marginBottom: 16 }}>
                <h5 style={{ fontSize: 12, color: '#e1e1e1', textTransform: 'uppercase', marginBottom: 6 }}>{lang}</h5>
                {snippets[lang].map((snip, idx) => (
                  <div key={idx} className="snippet-card">
                    <div className="snippet-title">{snip.title}</div>
                    <div className="snippet-desc">{snip.description}</div>
                    <button className="btn btn-secondary" style={{ width: '100%', fontSize: 11 }} onClick={() => insertSnippet(snip.code)}>
                      Insert Snippet
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
