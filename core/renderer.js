import { project } from "./projectManager.js";

const preview = document.getElementById("preview");

export function render() {
    const doc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                ${project.files.css}
            </style>
        </head>
        <body>
            ${project.files.html}
            <script>
                ${project.files.js}
            </script>
        </body>
        </html>
    `;

    preview.srcdoc = doc;
}

setInterval(render, 500);
