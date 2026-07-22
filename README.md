# Browser IDE – Enhanced (v2.0)

## 🎉 New Features Added (v2.0)

### Editor Enhancements
- ⌨️ **Keyboard Shortcuts** - Ctrl+S (Save), Ctrl+N (New), Ctrl+F (Find), Ctrl+/ (Comment), etc.
- 🎨 **Code Formatting** - Format and beautify code with one click
- 📦 **Code Minification** - Compress JS, CSS, and HTML files
- ✨ **Code Snippets** - Library of common code snippets for multiple languages
- 🔍 **Find & Replace** - Built-in search functionality (via Monaco)
- 📋 **Settings Panel** - Customize font size, tab width, word wrap, minimap, and more

### Project Management
- 📥 **File Import** - Import individual files into the project
- 📦 **ZIP Import** - Import entire ZIP files with folder structure
- 📋 **Project Templates** - Quick start with React, Vue, Express, or Node CLI templates
- 💾 **File History** - Auto-save file versions with ability to restore previous versions
- 🔄 **Auto-versioning** - Keep up to 10 versions of each file

### Developer Tools
- 🖥️ **Console Panel** - View console.log, console.error, and console.warn output
- 🌐 **Mock API Manager** - Create and manage API routes with responses
- 📊 **Dependency Graph** - Visualize file dependencies with Cytoscape.js
- 📤 **Export ZIP** - Export entire project as a ZIP file

### User Experience
- 🌙 **Dark/Light Theme** - Toggle between themes with persistent storage
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🔔 **Notifications** - Toast notifications for actions
- ⚡ **Debounced Auto-save** - Save files automatically while editing

## 🚀 Quick Start

1. Clone or download the repository
2. Open `index.html` in a browser  
   → Best with a local server:  
      - VS Code Live Server  
      - `npx serve`  
      - `python -m http.server`

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+S / Cmd+S | Save all files |
| Ctrl+N / Cmd+N | New file |
| Ctrl+E / Cmd+E | Export to ZIP |
| Ctrl+F / Cmd+F | Find in file |
| Ctrl+H / Cmd+Shift+H | Find and Replace |
| Ctrl+/ / Cmd+/ | Toggle comment |
| Shift+Alt+F | Format code |
| Ctrl+` / Cmd+` | Toggle console |

## 🛠️ Technologies

- **Monaco Editor** - Full-featured code editor with syntax highlighting
- **Cytoscape.js** - Dependency graph visualization
- **JSZip** - File compression and import
- **LocalStorage** - Persistent file and settings storage
- **Pure JavaScript** - No build tools required

## 📁 Project Structure

```
├── index.html          # Main HTML file
├── js/
│   ├── main.js         # Entry point
│   ├── files.js        # File management
│   ├── editor.js       # Monaco editor setup
│   ├── preview.js      # Live preview
│   ├── themes.js       # Theme management
│   ├── modes.js        # Project templates
│   ├── export.js       # ZIP export
│   ├── mockApi.js      # Mock API routes
│   ├── graph.js        # Dependency graph
│   ├── shortcuts.js    # Keyboard shortcuts (NEW)
│   ├── console.js      # Console output (NEW)
│   ├── versioning.js   # File versioning (NEW)
│   ├── import.js       # File import (NEW)
│   ├── templates.js    # Project templates (NEW)
│   ├── formatter.js    # Code formatting (NEW)
│   ├── snippets.js     # Code snippets (NEW)
│   └── settings.js     # Editor settings (NEW)
└── css/
    ├── style.css       # Main styles
    └── features.css    # Feature styles (NEW)
```

## 🎯 Features in Detail

### Monolithic Mode
Single HTML, CSS, and JS file setup for simple projects.

### Modular Mode
Folder-based structure for larger projects with module imports.

### Fullstack Mode
Complete setup with mock API support for frontend-backend testing.

## 💾 Storage

- Files are saved to **LocalStorage** automatically (debounced)
- Editor settings persist across sessions
- Mock API routes are saved
- File version history is maintained (up to 10 versions per file)

## 🔄 File Versioning

- Automatic version saving on file changes
- Access version history by right-clicking files
- Restore previous versions with one click
- Maximum 10 versions per file stored locally

## 🧩 Code Snippets

Built-in snippets for:
- **JavaScript** - Arrow functions, Fetch, Promises, Async/Await
- **HTML** - Templates, Forms, Meta tags
- **CSS** - Flexbox, Grid, Animations
- **Python** - Functions, Comprehensions, Error handling

## 📦 Project Templates

- **React App** - React setup with components
- **Vue App** - Vue 3 setup
- **Express API** - Node.js/Express server
- **Node CLI** - Command-line application

## 🔧 Settings

Customize:
- Font size (10-24px)
- Tab size (2, 4, or 8 spaces)
- Word wrap (off, on, or bounded)
- Minimap visibility
- Auto-format on save

## 🐛 Troubleshooting

**Files not showing?**
- Clear browser cache or use Incognito mode
- Check browser console for errors

**Editor not loading?**
- Ensure CDN links are accessible
- Try using `python -m http.server` instead of file:// protocol

**Preview not working?**
- Make sure HTML file is selected
- Check browser console for JS errors

**Console not showing?**
- Press Ctrl+` (backtick) or Cmd+` to toggle console panel
- Check that console.log calls are in your code

## 📝 License

MIT

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

**Happy Coding!** 🚀
