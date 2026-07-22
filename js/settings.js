// Settings panel
let editorSettings = {
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'off',
    minimap: false,
    autoFormat: false,
    theme: 'vs-dark'
};

function loadSettings() {
    const saved = localStorage.getItem('editor-settings');
    if (saved) {
        editorSettings = JSON.parse(saved);
    }
}

function saveSettings() {
    localStorage.setItem('editor-settings', JSON.stringify(editorSettings));
    applyEditorSettings();
}

function applyEditorSettings() {
    if (window.monacoEditor) {
        window.monacoEditor.updateOptions({
            fontSize: editorSettings.fontSize,
            tabSize: editorSettings.tabSize,
            wordWrap: editorSettings.wordWrap,
            minimap: { enabled: editorSettings.minimap }
        });
        monaco.editor.setTheme(editorSettings.theme);
    }
}

function openSettingsModal() {
    const dialog = document.createElement('dialog');
    dialog.innerHTML = `
        <h3>Editor Settings</h3>
        <form style="display: flex; flex-direction: column; gap: 12px;">
            <div>
                <label>Font Size: <span id="fontSize-value">${editorSettings.fontSize}</span>px</label>
                <input type="range" min="10" max="24" value="${editorSettings.fontSize}" 
                    oninput="document.getElementById('fontSize-value').textContent = this.value; editorSettings.fontSize = this.value;">
            </div>
            <div>
                <label>Tab Size:</label>
                <select onchange="editorSettings.tabSize = parseInt(this.value);">
                    <option value="2" ${editorSettings.tabSize === 2 ? 'selected' : ''}>2 spaces</option>
                    <option value="4" ${editorSettings.tabSize === 4 ? 'selected' : ''}>4 spaces</option>
                    <option value="8" ${editorSettings.tabSize === 8 ? 'selected' : ''}>8 spaces</option>
                </select>
            </div>
            <div>
                <label>Word Wrap:</label>
                <select onchange="editorSettings.wordWrap = this.value;">
                    <option value="off" ${editorSettings.wordWrap === 'off' ? 'selected' : ''}>Off</option>
                    <option value="on" ${editorSettings.wordWrap === 'on' ? 'selected' : ''}>On</option>
                    <option value="wordWrapColumn" ${editorSettings.wordWrap === 'wordWrapColumn' ? 'selected' : ''}>Bounded</option>
                </select>
            </div>
            <div>
                <label>
                    <input type="checkbox" ${editorSettings.minimap ? 'checked' : ''} 
                        onchange="editorSettings.minimap = this.checked;">
                    Show Minimap
                </label>
            </div>
            <div>
                <label>
                    <input type="checkbox" ${editorSettings.autoFormat ? 'checked' : ''} 
                        onchange="editorSettings.autoFormat = this.checked;">
                    Auto-format on Save
                </label>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 12px;">
                <button type="button" onclick="saveSettings(); this.closest('dialog').close();">Save</button>
                <button type="button" onclick="this.closest('dialog').close();">Cancel</button>
            </div>
        </form>
    `;
    dialog.style.cssText = 'width: 400px; max-width: 90vw;';
    document.body.appendChild(dialog);
    dialog.showModal();
}
