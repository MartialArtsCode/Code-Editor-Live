window.LANGUAGE_SNIPPETS = {
  javascript: [
    {
      title: "Fetch API (Async/Await)",
      description: "Clean asynchronous HTTP requests with try/catch error handling.",
      code: `async function loadData(url) {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error("Fetch Error:", err);\n  }\n}`
    },
    {
      title: "LocalStorage Helper",
      description: "Safely read and write JSON data to browser local storage.",
      code: `const Storage = {\n  get: (k, def) => JSON.parse(localStorage.getItem(k)) || def,\n  set: (k, v) => localStorage.setItem(k, JSON.stringify(v))\n};`
    }
  ],
  react: [
    {
      title: "Custom Hook (LocalStorage)",
      description: "State persistence hook for React apps on static pages.",
      code: `function useLocalStorage(key, initial) {\n  const [val, setVal] = React.useState(() => {\n    const saved = localStorage.getItem(key);\n    return saved ? JSON.parse(saved) : initial;\n  });\n  React.useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(val));\n  }, [key, val]);\n  return [val, setVal];\n}`
    }
  ],
  python: [
    {
      title: "List Comprehension & Filtering",
      description: "Concise array transformation and conditional extraction.",
      code: `data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens_squared = [x**2 for x in data if x % 2 == 0]\nprint("Evens Squared:", evens_squared)`
    }
  ],
  bash: [
    {
      title: "Directory & Argument Check",
      description: "Validates path argument before listing files in loop.",
      code: `#!/bin/bash\nTARGET="\${1:-.}"\nif [ ! -d "$TARGET" ]; then\n  echo "Directory not found!"\n  exit 1\nfi\nfor file in "$TARGET"/*; do\n  echo "Found: $(basename "$file")"\ndone`
    }
  ],
  cpp: [
    {
      title: "Vector with Smart Pointers",
      description: "Modern C++ dynamic memory management without raw pointers.",
      code: `#include <iostream>\n#include <vector>\n#include <memory>\n\nstruct Node { std::string name; };\n\nint main() {\n    std::vector<std::unique_ptr<Node>> list;\n    list.push_back(std::make_unique<Node>(Node{"GitHub Pages"}));\n    std::cout << list[0]->name << std::endl;\n    return 0;\n}`
    }
  ]
};
