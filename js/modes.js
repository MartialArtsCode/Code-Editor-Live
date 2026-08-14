export const LANGUAGE_MODES = {
  javascript: { name: "JavaScript", ext: ".js" },
  python: { name: "Python", ext: ".py" },
  react: { name: "React (JSX)", ext: ".jsx" },
  html: { name: "HTML5", ext: ".html" },
  bash: { name: "Bash", ext: ".sh" },
  cpp: { name: "C++", ext: ".cpp" }
};

export const SNIPPETS = {
  javascript: [
    {
      title: "Fetch API (Async/Await)",
      description: "Asynchronous HTTP request handling with error protection.",
      code: `async function loadData(url) {\n  try {\n    const res = await fetch(url);\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error("Fetch Error:", err);\n  }\n}`
    }
  ],
  python: [
    {
      title: "List Comprehension",
      description: "Concise array filtering and transformation.",
      code: `data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nevens_squared = [x**2 for x in data if x % 2 == 0]\nprint("Evens Squared:", evens_squared)`
    }
  ],
  bash: [
    {
      title: "Directory Guard & Loop",
      description: "Validates input directory before file iteration.",
      code: `#!/bin/bash\nTARGET="\${1:-.}"\nif [ ! -d "$TARGET" ]; then\n  echo "Directory missing!"\n  exit 1\nfi\nfor file in "$TARGET"/*; do\n  echo "Found: $(basename "$file")"\ndone`
    }
  ],
  cpp: [
    {
      title: "Smart Pointer Vector",
      description: "Modern C++ dynamic memory management.",
      code: `#include <iostream>\n#include <vector>\n#include <memory>\n\nstruct Item { std::string name; };\n\nint main() {\n    std::vector<std::unique_ptr<Item>> items;\n    items.push_back(std::make_unique<Item>(Item{"Engine"}));\n    std::cout << items[0]->name << std::endl;\n    return 0;\n}`
    }
  ]
};
