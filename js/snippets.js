// Code snippets library
const codeSnippets = {
    javascript: [
        {
            name: 'Arrow Function',
            code: 'const myFunction = () => {\n  // function body\n};'
        },
        {
            name: 'Fetch API',
            code: 'fetch("/api/data")\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error(error));'
        },
        {
            name: 'Event Listener',
            code: 'document.addEventListener("DOMContentLoaded", () => {\n  console.log("Document loaded");\n});'
        },
        {
            name: 'Promise',
            code: 'const promise = new Promise((resolve, reject) => {\n  if (true) resolve("Success");\n  else reject("Error");\n});'
        },
        {
            name: 'Async/Await',
            code: 'async function fetchData() {\n  try {\n    const response = await fetch("/api/data");\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error(error);\n  }\n}'
        }
    ],
    html: [
        {
            name: 'HTML Template',
            code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Page Title</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>'
        },
        {
            name: 'Form',
            code: '<form action="/submit" method="POST">\n  <label for="name">Name:</label>\n  <input type="text" id="name" name="name" required>\n  <button type="submit">Submit</button>\n</form>'
        },
        {
            name: 'Responsive Meta Tags',
            code: '<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<meta name="description" content="Page description">'
        }
    ],
    css: [
        {
            name: 'Flexbox Container',
            code: '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}'
        },
        {
            name: 'Grid Layout',
            code: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}'
        },
        {
            name: 'Media Query',
            code: '@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}'
        },
        {
            name: 'Animation',
            code: '@keyframes slideIn {\n  from { transform: translateX(-100%); }\n  to { transform: translateX(0); }\n}\n.animated { animation: slideIn 0.3s ease; }'
        }
    ],
    python: [
        {
            name: 'Function Definition',
            code: 'def greet(name):\n    return f"Hello, {name}!"'
        },
        {
            name: 'List Comprehension',
            code: 'squares = [x**2 for x in range(10)]'
        },
        {
            name: 'Try Except',
            code: 'try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("Cannot divide by zero")'
        }
    ]
};

function openSnippetLibrary() {
    const fileExt = currentFile ? currentFile.split('.').pop().toLowerCase() : 'javascript';
    const snippets = codeSnippets[fileExt] || codeSnippets.javascript;
    
    let html = `<h3>Code Snippets (${fileExt})</h3>`;
    snippets.forEach((snippet, index) => {
        html += `<div style="padding: 8px; border-bottom: 1px solid #ddd; cursor: pointer;" 
            onclick="insertSnippet('${snippet.code.replace(/'/g, "\\'")}'); this.closest('dialog').close();">
            <strong>${snippet.name}</strong>
            <pre style="font-size: 11px; margin-top: 4px; background: #f0f0f0; padding: 4px; border-radius: 3px;">${escapeHtml(snippet.code)}</pre>
        </div>`;
    });
    
    const dialog = document.createElement('dialog');
    dialog.innerHTML = html + '<button onclick="this.close()">Close</button>';
    dialog.style.cssText = 'width: 500px; max-width: 90vw; max-height: 80vh; overflow-y: auto;';
    document.body.appendChild(dialog);
    dialog.showModal();
}

function insertSnippet(code) {
    if (!window.monacoEditor) return;
    
    const position = window.monacoEditor.getPosition();
    const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
    
    window.monacoEditor.executeEdits('insert-snippet', [
        { range: range, text: code }
    ]);
    
    showNotification('Snippet inserted');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
