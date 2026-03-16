let currentTheme = 'dark';

function initTheme() {
  const saved = localStorage.getItem('ide-theme') || 'dark';
  currentTheme = saved;
  applyTheme();
}

function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('ide-theme', currentTheme);
  applyTheme();
}

function applyTheme() {
  document.body.classList.toggle('light', currentTheme === 'light');
  if (window.monacoEditor) {
    monaco.editor.setTheme(currentTheme === 'dark' ? 'vs-dark' : 'vs');
  }
}
