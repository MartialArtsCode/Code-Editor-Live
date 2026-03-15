export const modes = {
    MONOLITHIC: "monolithic",
    MODULAR: "modular",
    FULLSTACK: "fullstack"
};

let currentMode = modes.MONOLITHIC;

const selector = document.getElementById("modeSelector");

selector.addEventListener("change", e => {
    currentMode = e.target.value;
    document.body.dataset.mode = currentMode;
});

export function getMode() {
    return currentMode;
}
