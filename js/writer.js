import { Note }                 from "./note.js";
import { saveNotes, loadNotes } from "./storage.js";
import { MESSAGES }             from "../lang/messages/en/user.js";

const notesContainer =  document.getElementById("notes");
const saveTimeLabel =   document.getElementById("saveTime");
const addBtn =          document.getElementById("addNote");

let notes =         [];
let noteObjects =   [];

document.getElementById("home-button").textContent = MESSAGES.HOME;
document.getElementById("page-name").textContent = MESSAGES.WRITER;

function renderExistingNotes() {
    notes = loadNotes();
    notes.forEach(n => createNote(n.id, n.text));
}

function createNote(id = Date.now(), text = "") {
    const note = new Note(id, text);
    note.attach(notesContainer, removeNote);
    noteObjects.push(note);
}

function removeNote(id) {
    noteObjects = noteObjects.filter(n => n.id !== id);
    save();
}

function save() {
    saveNotes(noteObjects.map(n => n.toJSON()));
    saveTimeLabel.textContent = `${MESSAGES.SAVED_AT} ${new Date().toLocaleTimeString()}`;
}

addBtn.addEventListener("click", () => createNote());

setInterval(save, 2000);
renderExistingNotes();