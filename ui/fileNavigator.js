import { project } from "../core/projectManager.js";

const nav = document.getElementById("navigator");

const files = ["html", "css", "js", "backend"];

files.forEach(file => {
    const btn = document.createElement("button");
    btn.innerText = file;

    btn.onclick = () => {
        project.active = file;
        editor.setValue(project.files[file]);

        switch (file) {
            case "html":
                monaco.editor.setModelLanguage(editor.getModel(), "html");
                break;
            case "css":
                monaco.editor.setModelLanguage(editor.getModel(), "css");
                break;
            case "js":
                monaco.editor.setModelLanguage(editor.getModel(), "javascript");
                break;
            // Optional: Handle backend if needed
            case "backend":
                // Add backend handling logic here if necessary
                break;
            default:
                console.warn(`Unsupported file type: ${file}`);
                break;
        }
    };

    nav.appendChild(btn);
});
