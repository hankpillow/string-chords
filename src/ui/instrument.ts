import { html, Component } from "htm/preact/standalone.mjs";
import { Scale, NoteSettings, getNoteFromFret, isMajor, isMinor, Note } from "../notes";
import ArmString from "./arm-string";

export interface InstrumentSettings {
    name: string;
    frets: number;
    scale: Scale;
    strings: NoteSettings[];
    armBullets: number[];
}

const getAllNotes = (strings: NoteSettings[], frets: number, scale: Scale) => {
    return strings.map((noteSetting: NoteSettings) => {
        let fret = 0;
        const stringNotes = [];
        while (fret <= frets) {
            stringNotes.push(getNoteFromFret(noteSetting.name, fret, scale));
            fret += 1;
        }
        return stringNotes;
    });
};

export default class Instrument extends Component {
    state = {};
    updateStrings(position: number) {
        return (note: NoteSettings) => {
            const state = { ...this.state, [position]: note };
            this.setState(state);
            const { onChange } = this.props;
            if (typeof onChange === "function") {
                onChange(state);
            }
        };
    }
    render({ view, settings }: { view: Record<string, boolean>; settings: InstrumentSettings }) {
        const notesGrid = getAllNotes(settings.strings, settings.frets, settings.scale);
        return html` <div
            id="instrument"
            data-view=${Object.keys(view)
                .filter((name) => view[name])
                .join(",")}
        >
            <div class="arm">
                ${notesGrid.map(
                    (notes: NoteSettings[], position: number) =>
                        html`<${ArmString}
                            onChange=${this.updateStrings(position).bind(this)}
                            notes=${notes}
                            position=${position}
                        /> `
                )}
            </div>
        </div>`;
    }
}
