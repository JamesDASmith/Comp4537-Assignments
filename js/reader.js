// chatGPT was used to help edit this file and bugfix

import { loadNotes } from "./storage.js";
import { MESSAGES } from "../lang/messages/en/user.js";

const notesContainer =  document.getElementById("notes");
const loadTimeLabel =   document.getElementById("loadTime");

let lastRenderedIds = [];

document.getElementById("home-button").textContent =    MESSAGES.HOME;
document.getElementById("page-name").textContent =      MESSAGES.READER;

function render() {
    const notes = loadNotes();
    const currentIds = notes.map(n => n.id);

    if (JSON.stringify(currentIds) === JSON.stringify(lastRenderedIds)) {

        loadTimeLabel.textContent = `${MESSAGES.LOADED_AT} ${new Date().toLocaleTimeString()}`;
        return;
    }

    notesContainer.innerHTML =  "";
    lastRenderedIds =           currentIds;

    if (notes.length === 0) {
        notesContainer.textContent = MESSAGES.NO_NOTES;
        return;
    }

    notes.forEach(n => {
        const container = document.createElement("div");
        container.classList.add("note-container");

        const textarea =    document.createElement("textarea");
        textarea.value =    n.text;
        textarea.disabled = true; 
        container.appendChild(textarea);

        notesContainer.appendChild(container);
    });

    loadTimeLabel.textContent = `${MESSAGES.LOADED_AT} ${new Date().toLocaleTimeString()}`;
}

render();

setInterval(render, 2000);
