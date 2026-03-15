export function analyzeJS(code){

const functions=[...code.matchAll(/function\s+([a-zA-Z0-9_]+)/g)]

console.log("Functions:",functions.map(f=>f[1]))

}
