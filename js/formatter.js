// Code formatting support
async function formatCode() {
    if (!window.monacoEditor || !currentFile) return;
    
    try {
        window.monacoEditor.trigger('', 'editor.action.formatDocument');
        showNotification('Code formatted');
    } catch (error) {
        console.error('Formatting error:', error);
        showNotification('Formatting failed');
    }
}

function minifyCode() {
    if (!currentFile) return;
    
    const ext = currentFile.split('.').pop().toLowerCase();
    let minified = files[currentFile];
    
    try {
        if (ext === 'js') {
            // Basic JS minification
            minified = minified
                .replace(/\/\/.*$/gm, '') // Remove single-line comments
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
                .replace(/\s+/g, ' ') // Remove extra whitespace
                .replace(/\s*([{}();,])\s*/g, '$1'); // Remove spaces around operators
        } else if (ext === 'css') {
            // Basic CSS minification
            minified = minified
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
                .replace(/\s+/g, ' ') // Remove extra whitespace
                .replace(/\s*([{}:;,])\s*/g, '$1'); // Remove spaces around operators
        } else if (ext === 'html') {
            // Basic HTML minification
            minified = minified
                .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
                .replace(/>\s+</g, '><') // Remove spaces between tags
                .replace(/\s+/g, ' '); // Remove extra whitespace
        }
        
        files[currentFile] = minified;
        updateFileContent();
        showNotification('Code minified');
    } catch (error) {
        console.error('Minification error:', error);
        showNotification('Minification failed');
    }
}

function beautifyCode() {
    if (!window.monacoEditor || !currentFile) return;
    
    try {
        window.monacoEditor.trigger('', 'editor.action.formatDocument');
        showNotification('Code beautified');
    } catch (error) {
        console.error('Beautification error:', error);
        showNotification('Beautification failed');
    }
}

function toggleLineNumbers() {
    if (!window.monacoEditor) return;
    
    const current = window.monacoEditor.getOption(monaco.editor.EditorOption.lineNumbers);
    const newValue = current === 'on' ? 'off' : 'on';
    window.monacoEditor.updateOptions({ lineNumbers: newValue });
}

function toggleWordWrap() {
    if (!window.monacoEditor) return;
    
    const current = window.monacoEditor.getOption(monaco.editor.EditorOption.wordWrap);
    const newValue = current === 'off' ? 'on' : 'off';
    window.monacoEditor.updateOptions({ wordWrap: newValue });
}
