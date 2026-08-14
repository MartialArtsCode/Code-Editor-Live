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
  <title>Document</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <h1>Hello World</h1>
  </div>
  <script src="script.js"></script>
</body>
</html>`,

  javascript: `// ES6 Standard Module Template
export function main() {
  console.log("Initialization complete.");
}

// Auto-run if main script
if (typeof window !== "undefined") {
  main();
}`,

  react: `// React Component Skeleton
export default function Component({ title = "Hello World" }) {
  const [count, setCount] = React.useState(0);

  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}`,

  python: `#!/usr/bin/env python3
"""
Module Description: Entry point script template.
"""

def main():
    print("Execution started...")
    # Add logic here

if __name__ == "__main__":
    main()`,

  bash: `#!/bin/bash
# Shell Script Template

set -euo pipefail

echo "==> Starting script execution..."

# Check prerequisites or arguments
if [ "$#" -eq 0 ]; then
    echo "Usage: $0 [argument]"
    exit 1
fi

echo "Processing $1..."`,

  cpp: `#include <iostream>
#include <vector>
#include <string>

int main(int argc, char* argv[]) {
    std::cout << "Standard C++ Application" << std::endl;
    return 0;
}`,

  json: `{
  "name": "project-config",
  "version": "1.0.0",
  "private": true,
  "settings": {
    "theme": "dark",
    "debug": true
  }
}`,

  css: `/* Global Styles Reset & Variables */
:root {
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
  // Existing snippets remain here...
};
