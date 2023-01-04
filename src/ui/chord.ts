import { html, Component } from "htm/preact/standalone";
import { NoteSettings, NotesNames } from "../notes";
import { getChord, Chords } from "../chords";

export default class Chord extends Component {
    render({ notes, strings }: { notes: Record<string, NoteSettings>; strings: number }) {
        const pressedNotes =
            Object.keys(notes)
                .sort()
                .reduce((pressed: Record<string, NoteSettings | null>, position: string) => {
                    const note = notes[position];
                    if (note) {
                        pressed[position] = note;
                    }
                    return pressed;
                }, {}) || [];
        let targetChord: string;
        if (Object.keys(pressedNotes).length >= 3) {
            targetChord = getChord(...Object.values(pressedNotes));
        }
        return html`
            <details id="chords">
                <summary>Chords</summary>
                <ul>
                    ${Object.keys(Chords).map((name: string) => {
                        let chordValues = [];
                        const range: SetIterator = Chords[name].values();
                        let chord = range.next();
                        while (!chord.done) {
                            chordValues.push(chord.value);
                            chord = range.next();
                        }
                        return html`<li aria-selected=${name === targetChord}>
                            <strong>${name}</strong>
                            <span>(${chordValues.join("-")})</span>
                        </li>`;
                    })}
                </ul>
            </details>
        `;
    }
}
