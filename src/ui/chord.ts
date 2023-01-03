import { html, Component } from "htm/preact/standalone";
import { NoteSettings } from "../notes";

export default class Chord extends Component {
    render({ notes }: { notes: Record<string, NoteSettings> }) {
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
            Chord:
            <summary>
                ${Object.keys(pressedNotes).map((position) => {
                    const note = pressedNotes[position] as NoteSettings;
                    const ariaLabel = `string ${position} fret ${note.fret} on ${note.name}`;
                    return html`<span aria-label=${ariaLabel}>${note.name}</span>`;
                })}
            </summary>
        </div>`;
    }
}
