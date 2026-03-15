export const modes = {

MONOLITHIC:"monolithic",
MODULAR:"modular",
FULLSTACK:"fullstack"

}

let currentMode=modes.MONOLITHIC

export function setMode(mode){

currentMode=mode

document.body.dataset.mode=mode

}

export function getMode(){

return currentMode

}
