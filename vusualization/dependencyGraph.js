import {project} from "../core/projectManager.js"

export function analyze(){

const deps={

htmlUsesJS:project.files.html.includes("<script"),
htmlUsesCSS:project.files.css.length>0

}

console.log("Dependencies",deps)

}

setInterval(analyze,2000)
