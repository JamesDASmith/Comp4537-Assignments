import { loadNotes } from "./storage.js";
import { MESSAGES } from "../lang/messages/user.js";

const notesContainer = document.getElementById("notes");
const loadTimeLabel = document.getElementById("loadTime");

function render() {
    notesContainer.innerHTML = "";

    const notes = loadNotes();
    if (notes.length === 0) {
        notesContainer.textContent = MESSAGES.NO_NOTES;
        return;
    }

    notes.forEach(n => {
        const p = document.createElement("p");
        p.textContent = n.text;
        notesContainer.appendChild(p);
    });

    loadTimeLabel.textContent = 
        `${MESSAGES.LOADED_AT} ${new Date().toLocaleTimeString()}`;
}

setInterval(render, 2000);
render();