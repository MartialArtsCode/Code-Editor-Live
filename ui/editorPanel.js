import {project,updateFile} from "../core/projectManager.js"

const editor=document.getElementById("editor")

editor.addEventListener("input",()=>{

updateFile(project.activeFile,editor.value)

})
const editor = document.getElementById("editor");

editor.addEventListener("keydown", function(e) {

    if (e.key === "Tab") {
        e.preventDefault();

        const start = this.selectionStart;
        const end = this.selectionEnd;

        this.value =
            this.value.substring(0, start) +
            "    " +
            this.value.substring(end);

        this.selectionStart = this.selectionEnd = start + 4;
    }

});

editor.addEventListener("keydown", function(e) {

    if (e.key === "Tab") {

        e.preventDefault();

        const start = this.selectionStart;
        const end = this.selectionEnd;

        if (e.shiftKey) {

            if (this.value.substring(start-4,start) === "    ") {

                this.value =
                    this.value.substring(0,start-4) +
                    this.value.substring(end);

                this.selectionStart = this.selectionEnd = start-4;
            }

        } else {

            this.value =
                this.value.substring(0,start) +
                "    " +
                this.value.substring(end);

            this.selectionStart = this.selectionEnd = start+4;
        }
    }

});
