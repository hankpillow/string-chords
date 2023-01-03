import { html, Component } from "htm/preact/standalone";
import { NoteSettings, NotesNames } from "../notes";

export default class Chord extends Component {
    render({ notes, strings }: { notes: Record<string, NoteSettings>; strings: number }) {
        const pressedNotes = Object.keys(notes)
            .sort()
            .reduce((pressed: Record<string, NoteSettings | null>, position: string) => {
                const note = notes[position];
                if (note) {
                    pressed[position] = note;
                }
                return pressed;
            }, {});
        return html` <div id="chords">
            <strong>Chord</strong>
            <div>
                ${Array.from(new Array(strings)).map((_, position) => {
                    const note = pressedNotes[position.toString()];
                    const notPressed = note ? "" : "not pressed";
                    const pos = `string ${position + 1}`;
                    const fret = note ? `fret ${note.fret}` : "";
                    const name = note ? ` ${note.name} (${NotesNames[note.name]})` : "";
                    const title = `${pos} ${fret} ${name} ${notPressed}`.trim().replace(/\s+/g, " ");
                    return html`<span title="${title}">${note?.name || "-"}</span>`;
                })}
            </div>
        </div>`;
    }
}
