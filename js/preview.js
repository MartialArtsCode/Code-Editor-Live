const e = React.createElement;

export function PreviewComponent({ file, consoleOutput }) {
  if (!file) return null;

  if (file.language === "html" || file.language === "react") {
    return e("div", { className: "preview-panel" },
      e("div", { className: "preview-header" }, "Live Web Sandbox"),
      e("iframe", {
        className: "preview-iframe",
        srcDoc: file.content,
        title: "Sandbox Preview",
        sandbox: "allow-scripts"
      })
    );
  }

  if (file.language === "python") {
    return e("div", { className: "preview-panel" },
      e("div", { className: "preview-header" }, "Python Standard Output"),
      e("div", { className: "output-console" }, consoleOutput || "Click 'Run Python' to execute script.")
    );
  }

  return null;
}
