import { VFS } from './files.js';
import { SNIPPETS } from './modes.js';
import { EditorComponent } from './editor.js';
import { PreviewComponent } from './preview.js';
import { ThemeManager } from './themes.js';
import { MockApi } from './mockApi.js';

const { useState, useEffect } = React;
const e = React.createElement;

function App() {
  const [files, setFiles] = useState(() => VFS.loadWorkspace());
  const [activeFile, setActiveFile] = useState("index.html");
  const [outputConsole, setOutputConsole] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [showSnippets, setShowSnippets] = useState(true);

  useEffect(() => {
    VFS.saveWorkspace(files);
    if (window.lucide) window.lucide.createIcons();
  }, [files, activeFile, showSnippets]);

  useEffect(() => {
    MockApi.init();
    ThemeManager.applyTheme("dark");

    async function initPyodide() {
      if (window.loadPyodide) {
        try {
          const py = await window.loadPyodide();
          setPyodide(py);
        } catch (e) {
          console.warn("Pyodide warning:", e);
        }
      }
    }
    initPyodide();
  }, []);

  const createFile = () => {
    const name = prompt("Enter file/folder name (e.g. main.js, script.py, src/):");
    if (!name) return;
    const updated = VFS.createItem(files, name);
    setFiles(updated);
    if (!name.endsWith("/")) setActiveFile(name.replace("/", ""));
  };

  const deleteItem = (key, evt) => {
    evt.stopPropagation();
    if (!confirm(`Delete ${key}?`)) return;
    const updated = VFS.deleteItem(files, key);
    setFiles(updated);
    if (activeFile === key) {
      const remaining = Object.keys(updated);
      setActiveFile(remaining.length > 0 ? remaining[0] : "");
    }
  };

  const handleContentChange = (val) => {
    setFiles(prev => ({
      ...prev,
      [activeFile]: { ...prev[activeFile], content: val }
    }));
  };

  const runPython = async () => {
    if (!pyodide) {
      setOutputConsole("Pyodide Wasm engine loading...");
      return;
    }
    setOutputConsole("Executing...\n");
    try {
      pyodide.setStdout({ batched: (str) => setOutputConsole(prev => prev + str + "\n") });
      await pyodide.runPythonAsync(files[activeFile].content);
    } catch (err) {
      setOutputConsole(prev => prev + "\nError: " + err.message);
    }
  };

  const insertSnippet = (code) => {
    if (!activeFile) return;
    handleContentChange((files[activeFile].content || "") + "\n\n" + code);
  };

  const currentFile = files[activeFile];

  return e("div", { className: "ide-container" },
    // Header
    e("header", { className: "ide-header" },
      e("div", { className: "ide-title" }, "Browser IDE & Snippet Playground"),
      e("div", { className: "header-actions" },
        currentFile && currentFile.language === "python" && e("button", { className: "btn", onClick: runPython }, "Run Python"),
        e("button", { className: "btn btn-secondary", onClick: () => setShowSnippets(!showSnippets) }, "Snippets")
      )
    ),
    // Body
    e("div", { className: "ide-body" },
      // Sidebar Explorer
      e("aside", { className: "sidebar" },
        e("div", { className: "sidebar-toolbar" },
          e("span", { className: "sidebar-title" }, "Explorer"),
          e("button", { className: "icon-btn", onClick: createFile }, "+ New")
        ),
        e("div", { className: "file-tree" },
          Object.keys(files).map(key =>
            e("div", {
              key: key,
              className: `tree-item ${activeFile === key ? "active" : ""}`,
              onClick: () => files[key].type === "file" && setActiveFile(key)
            },
              e("span", { className: "tree-label" }, key),
              e("button", { className: "icon-btn", onClick: (evt) => deleteItem(key, evt) }, "×")
            )
          )
        )
      ),
      // Editor & Sandbox Workspace
      e("main", { className: "workspace" },
        e("div", { className: "tabs-bar" },
          Object.keys(files).filter(k => files[k].type === "file").map(key =>
            e("div", {
              key: key,
              className: `tab ${activeFile === key ? "active" : ""}`,
              onClick: () => setActiveFile(key)
            }, key)
          )
        ),
        e("div", { className: "editor-area" },
          e(EditorComponent, { file: currentFile, onContentChange: handleContentChange }),
          e(PreviewComponent, { file: currentFile, consoleOutput: outputConsole })
        )
      ),
      // Snippets Panel
      showSnippets && e("aside", { className: "snippets-panel" },
        e("h4", { style: { marginBottom: 12, fontSize: 13 } }, "Language Library"),
        Object.keys(SNIPPETS).map(lang =>
          e("div", { key: lang, style: { marginBottom: 16 } },
            e("h5", { style: { fontSize: 11, color: "#888", textTransform: "uppercase" } }, lang),
            SNIPPETS[lang].map((snip, i) =>
              e("div", { key: i, className: "snippet-card" },
                e("div", { className: "snippet-title" }, snip.title),
                e("div", { className: "snippet-desc" }, snip.description),
                e("button", { className: "btn btn-secondary", style: { width: "100%", fontSize: 11 }, onClick: () => insertSnippet(snip.code) }, "Insert")
              )
            )
          )
        )
      )
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(App));
