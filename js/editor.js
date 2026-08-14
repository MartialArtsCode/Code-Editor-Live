const e = React.createElement;

export function EditorComponent({ file, onContentChange }) {
  if (!file || file.type !== "file") {
    return e("div", { style: { padding: 20, color: "#888" } }, "Select a file to edit.");
  }

  return e("textarea", {
    className: "code-editor",
    value: file.content || "",
    onChange: (evt) => onContentChange(evt.target.value),
    placeholder: "Write code here..."
  });
}
