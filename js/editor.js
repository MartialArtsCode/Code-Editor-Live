// Update file content and trigger necessary actions
function updateFileContent(value) {
    if (currentFile) {
        files[currentFile] = value || (window.monacoEditor ? window.monacoEditor.getValue() : '');
        debounceSave();
        onFileChangeForVersioning();
        updatePreview();
        updateGraph();
    }
}
