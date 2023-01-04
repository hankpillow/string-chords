import { html, Component } from "htm/preact/standalone.mjs";
import { NoteSettings, isMajor, isMinor } from "../notes";

export default class ArmString extends Component {
    constructor() {
        super();
        this.setState({ current: null });
    }
    togglePressed(note: NoteSettings) {
        return (event: Event) => {
            if (this.state.current) {
                this.state.current.removeAttribute("aria-pressed");
            }
            const current = event.currentTarget as HTMLButtonElement;
            if (current === this.state.current) {
                this.setState({ current: null });
                if (typeof this.props.onChange === "function") {
                    this.props.onChange(null);
                }
                return;
            }
            current.setAttribute("aria-pressed", "true");
            this.setState({ current });
            if (typeof this.props.onChange === "function") {
                this.props.onChange(note);
            }
        };
    }
    render({ position, notes }: { notes: NoteSettings[]; position: number }) {
        return html`<div
            class="string"
            data-position=${position}
        >
            ${notes.map((note: NoteSettings) => {
                const fret = `${note.fret === 0 ? "open" : note.fret}`;
                return html`
                    <button
                        class="note"
                        data-fret=${fret}
                        data-position="${position}"
                        data-minor="${isMinor(note.name)}"
                        data-major="${isMajor(note.name)}"
                        data-note="${note.name}"
                        aria-pressed="false"
                        onClick=${this.togglePressed(note).bind(this)}
                    >
                        <span>${note.name}</span>
                    </button>
                `;
            })}
        </div>`;
    }
}
