export class Note {
    constructor(id, text = ""){
        this.id = id;
        this.text = text;

        this.container = document.createElement("div");
        this.textArea = document.createElement("textarea");
        this.removeButton = document.createElement("button");

        this.textArea.value = this.text;
        this.removeButton.innerText = "Remove";

        this.container.appendChild(this.textArea);
        this.container.appendChild(this.removeButton);
    }

    attach(parent, onRemove) {
        parent.appendChild(this.container);
        this.textArea.addEventListener("input", () => {
            this.text = this.textArea.value;
        });

        this.removeButton.addEventListener("click", () => {
            onRemove(this.id);
            this.container.remove();
        });
    }

    toJSON() {
        return {
            id: this.id,
            text: this.text
        };
    }
}