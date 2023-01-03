import { html, Component } from "htm/preact/standalone.mjs";
import { Scales, NoteSettings, getNoteFromFret, isMajor, isMinor, Note } from "../notes";

export interface InstrumentSettings {
    name: string;
    frets: number;
    scale: Scales;
    strings: NoteSettings[];
    keyPress?: Function;
    armBullets: number[];
}

const getAllNotes = (strings: NoteSettings[], frets: number, scale: Scales) => {
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
    constructor({ settings, view }: { settings: InstrumentSettings; view: Record<string, boolean> }) {
        super();

        const stringsMap: Record<string, undefined | string | HTMLButtonElement> = settings.strings.reduce(
            (pressedMap: Record<string, undefined>, _, index): Record<string, undefined> => {
                pressedMap[(index + 1).toString()] = undefined;
                return pressedMap;
            },
            {}
        );

        this.setState({
            view,
            settings,
            notesGrid: getAllNotes(settings.strings, settings.frets, settings.scale),
            buttonPressed: { ...stringsMap },
            notesPressed: { ...stringsMap },
        });
    }

    toogleNote({
        position,
        fret,
        note,
        button,
    }: {
        position: number;
        fret: number;
        note: keyof Note;
        button: HTMLButtonElement;
    }) {
        const { buttonPressed, notesPressed } = this.state;
        const lastButton = buttonPressed[position];
        if (lastButton) {
            button.setAttribute("aria-pressed", "false");
        }
        if (button === lastButton) {
            buttonPressed[position] = undefined;
            notesPressed[position] = undefined;
        } else {
            buttonPressed[position] = button;
            notesPressed[position] = button.getAttribute("data-note");
            button.setAttribute("aria-pressed", "true");
        }
        this.setState({ buttonPressed, notesPressed });
    }
    toggleReset(event: Event) {
        const radio = event.target as HTMLInputElement;
        if (radio.getAttribute("aria-checked") === "true") {
            radio.checked = false;
            radio.setAttribute("aria-checked", "false");
            return;
        }
        radio.setAttribute("aria-checked", "true");
    }
    // toggleString = ({ position, fret, note }) => (event: Event) => {
    //   const pos = position.toString();
    //   const button = event.currentTarget as HTMLButtonElement;
    //   const lastButton = buttonPressed[pos] as HTMLButtonElement;

    //   if (lastButton) {
    //     lastButton.setAttribute("aria-pressed", "false");
    //   }

    //   if (button === lastButton) {
    //     buttonPressed[pos] = undefined;
    //     notesPressed[pos] = undefined
    //   }
    //   else {
    //     buttonPressed[pos] = button;
    //     notesPressed[pos] = button.getAttribute("data-note");
    //     button.setAttribute("aria-pressed", "true");
    //   }

    //   if (settings.keyPress) {
    //     settings.keyPress(notesPressed)
    //   }
    // }

    render() {
        const { notesGrid, view } = this.state;
        return html` <div
            id="instrument"
            data-view=${Object.keys(view)
                .filter((name) => view[name])
                .join(",")}
        >
            <div class="arm">
                ${notesGrid.map(
                    (notes: NoteSettings[], position: number) =>
                        html`<div
                            class="string"
                            data-position=${position + 1}
                        >
                            ${notes.map((note: NoteSettings) => {
                                const id = `${position}-${note.fret}`;
                                return html`
                                    <button
                                        class="note"
                                        data-fret="${note.fret}"
                                        data-position="${position + 1}"
                                        data-minor="${isMinor(note.name)}"
                                        data-major="${isMajor(note.name)}"
                                        data-note="${note.name}"
                                        aria-pressed="false"
                                        onClick=${this.toggleReset.bind(this)}
                                    >
                                        <span for=${id}>${note.name}</span>
                                    </button>
                                `;
                            })}
                        </div>`
                )}
            </div>
        </div>`;
    }
}
