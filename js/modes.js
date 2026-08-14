export const LANGUAGE_MODES = {
  javascript: { name: "JavaScript", ext: ".js" },
  python: { name: "Python", ext: ".py" },
  react: { name: "React (JSX)", ext: ".jsx" },
  html: { name: "HTML5", ext: ".html" },
  bash: { name: "Bash Script", ext: ".sh" },
  cpp: { name: "C++ Source", ext: ".cpp" },
  json: { name: "JSON Config", ext: ".json" },
  css: { name: "CSS Styles", ext: ".css" }
};

export const SKELETONS = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app"></div>
  <script src="script.js"></script>
</body>
</html>`,

  javascript: `// ES6 Standard Module Template
export function main() {
  console.log("Initialization complete.");
}

if (typeof window !== "undefined") {
  main();
}`,

  react: `export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="card">
      <h2>Counter Component</h2>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}`,

  python: `#!/usr/bin/env python3

def main():
    print("Execution started...")

if __name__ == "__main__":
    main()`,

  bash: `#!/bin/bash
set -euo pipefail

echo "Executing shell script..."`,

  cpp: `#include <iostream>

int main() {
    std::cout << "Standard C++ Execution" << std::endl;
    return 0;
}`,

  json: `{
  "name": "workspace",
  "version": "1.0.0",
  "private": true
}`,

  css: `:root {
  --primary-color: #007acc;
  --bg-color: #1e1e1e;
  --text-color: #ffffff;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`
};

export const SNIPPETS = {
  javascript: [
    {
      title: "Fetch API (Async/Await)",
      description: "Perform asynchronous HTTP requests with robust try/catch error handling.",
      code: `async function fetchData(url) {\n  try {\n    const response = await fetch(url);\n    if (!response.ok) throw new Error(\`HTTP error! Status: \${response.status}\`);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Fetch operation failed:", error);\n  }\n}`
    },
    {
      title: "Local Storage State Sync",
      description: "Safely read and write serialized JSON state to the browser's persistent localStorage.",
      code: `const StorageUtil = {\n  save(key, value) {\n    try {\n      localStorage.setItem(key, JSON.stringify(value));\n    } catch (e) {\n      console.error("Error saving to localStorage", e);\n    }\n  },\n  load(key, fallback = null) {\n    try {\n      const item = localStorage.getItem(key);\n      return item ? JSON.parse(item) : fallback;\n    } catch (e) {\n      console.error("Error reading from localStorage", e);\n      return fallback;\n    }\n  }\n};`
    },
    {
      title: "Custom Event Bus",
      description: "A lightweight pub/sub event emitter pattern for decoupled module messaging.",
      code: `class EventBus {\n  constructor() {\n    this.events = {};\n  }\n  on(event, listener) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(listener);\n  }\n  emit(event, data) {\n    if (this.events[event]) {\n      this.events[event].forEach(listener => listener(data));\n    }\n  }\n}`
    },
    {
      title: "Debounce Function",
      description: "Delays execution until user input stops to prevent rapid redundant calls (e.g., search bars).",
      code: `function debounce(func, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => { func.apply(this, args); }, delay);\n  };\n}`
    }
  ],

  react: [
    {
      title: "useState + useEffect Fetching",
      description: "Standard lifecycle pattern to fetch external data when a component mounts.",
      code: `function DataFetcher({ endpoint }) {\n  const [data, setData] = React.useState(null);\n  const [loading, setLoading] = React.useState(true);\n\n  React.useEffect(() => {\n    let isMounted = true;\n    fetch(endpoint)\n      .then(res => res.json())\n      .then(result => {\n        if (isMounted) {\n          setData(result);\n          setLoading(false);\n        }\n      });\n    return () => { isMounted = false; };\n  }, [endpoint]);\n\n  if (loading) return <div>Loading...</div>;\n  return <pre>{JSON.stringify(data, null, 2)}</pre>;\n}`
    },
    {
      title: "Controlled Form Input Hook",
      description: "Reusable custom React hook for binding multi-field forms to state seamlessly.",
      code: `function useForm(initialValues) {\n  const [values, setValues] = React.useState(initialValues);\n  const handleChange = (e) => {\n    const { name, value } = e.target;\n    setValues(prev => ({ ...prev, [name]: value }));\n  };\n  return [values, handleChange, () => setValues(initialValues)];\n}`
    },
    {
      title: "useMemo Expensive Calculation",
      description: "Caches complex derived calculations to prevent performance hits during component re-renders.",
      code: `const memoizedValue = React.useMemo(() => {\n  return computeExpensiveValue(data);\n}, [data]);`
    }
  ],

  python: [
    {
      title: "File Context Manager (Read/Write)",
      description: "Safely opens and handles system files using standard Python context managers.",
      code: `def process_file(file_path):\n    try:\n        with open(file_path, "r", encoding="utf-8") as f:\n            data = f.read()\n        print("File loaded successfully.")\n        return data\n    except FileNotFoundError:\n        print(f"Error: {file_path} not found.")\n        return None`
    },
    {
      title: "List Comprehension & Filtering",
      description: "Inline list transformations with conditional element filtering.",
      code: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nsquared_evens = [x**2 for x in numbers if x % 2 == 0]\nprint("Squared Evens:", squared_evens)`
    },
    {
      title: "JSON Data Parser",
      description: "Serializes and deserializes structured Python dictionaries to JSON strings.",
      code: `import json\n\npayload = {"status": 200, "items": ["apple", "banana"]}\njson_string = json.dumps(payload, indent=2)\nparsed_dict = json.loads(json_string)`
    },
    {
      title: "Decorator with Arguments",
      description: "A wrapper function to log execution time or metrics across python routines.",
      code: `import time\n\ndef time_it(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f"{func.__name__} executed in {end - start:.4f}s")\n        return result\n    return wrapper`
    }
  ],

  html: [
    {
      title: "Responsive Flexbox Wrapper",
      description: "A simple responsive container with flexible cross-alignment.",
      code: `<div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; align-items: center;">\n  <div style="flex: 1; min-width: 250px; padding: 16px; border: 1px solid #ccc;">Item 1</div>\n  <div style="flex: 1; min-width: 250px; padding: 16px; border: 1px solid #ccc;">Item 2</div>\n</div>`
    },
    {
      title: "Accessible Accessible Form",
      description: "Semantic form skeleton with accessible labels and submit structure.",
      code: `<form onsubmit="event.preventDefault(); console.log('Submitted');">\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" required>\n  \n  <label for="email">Email:</label>\n  <input type="email" id="email" name="email" required>\n  \n  <button type="submit">Submit</button>\n</form>`
    }
  ],

  css: [
    {
      title: "CSS Grid Responsive Auto-Fit",
      description: "A modern grid layout that automatically wraps items without needing media queries.",
      code: `.grid-container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}`
    },
    {
      title: "Centered Element (Absolute + Transform)",
      description: "Perfectly centers an absolute element inside its relative container.",
      code: `.centered {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}`
    },
    {
      title: "Custom Scrollbar",
      description: "Custom styling rules for webkit-based browser scrollbars.",
      code: `::-webkit-scrollbar {\n  width: 8px;\n}\n::-webkit-scrollbar-track {\n  background: #1e1e1e;\n}\n::-webkit-scrollbar-thumb {\n  background: #333;\n  border-radius: 4px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #555;\n}`
    }
  ],

  bash: [
    {
      title: "Directory Guard & Argument Check",
      description: "Validates input arguments and confirms local directory existence before continuing.",
      code: `#!/bin/bash\nTARGET_DIR="\${1:-}"\nif [ -z "$TARGET_DIR" ] || [ ! -d "$TARGET_DIR" ]; then\n  echo "Error: Valid directory target required."\n  exit 1\nfi\n\nfor file in "$TARGET_DIR"/*; do\n  echo "Processing: $(basename "$file")"\ndone`
    },
    {
      title: "System Resource Audit",
      description: "Quick status audit of memory and disk usage metrics.",
      code: `#!/bin/bash\necho "=== Memory Statistics ==="\nfree -h\necho "\n=== Storage Usage ==="\ndf -h /`
    }
  ],

  cpp: [
    {
      title: "Vector Iteration & Smart Pointers",
      description: "Modern C++ memory safety using standard vectors and unique pointers.",
      code: `#include <iostream>\n#include <vector>\n#include <memory>\n\nstruct Node {\n    std::string name;\n};\n\nint main() {\n    std::vector<std::unique_ptr<Node>> nodes;\n    nodes.push_back(std::make_unique<Node>(Node{"Core"}));\n\n    for (const auto& node : nodes) {\n        std::cout << "Node ID: " << node->name << std::endl;\n    }\n    return 0;\n}`
    }
  ],

  json: [
    {
      title: "Package / Workspace Config",
      description: "Standard JSON configuration object structure.",
      code: `{\n  "name": "browser-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "index.html"\n  },\n  "dependencies": {}\n}`
    }
  ]
};
