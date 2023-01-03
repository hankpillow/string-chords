import { render, html, Component } from "htm/preact/standalone";
import Display from "./ui/display";
import Chord from "./ui/chord";
import BanjoSetting from "./settings/banjo";
import Instrument, { InstrumentSettings } from "./ui/instrument";

class App extends Component {
    state = {
        view: {
            note: true,
            major: true,
            minor: true,
            fret: true,
        },
        pressed: {},
    };
    checkStrings(pressed: Record<number, NoteSettings>) {
        this.setState({ pressed });
        console.log(pressed);
    }
    render({ instrument }: { instrument: InstrumentSettings }) {
        return html`
            <main>
                <header>
                    <h1 aria-describedby="instrument-name">🎵String Chords</h1>
                    <small id="instrument-name">${instrument.name}</small>
                </header>
                <aside>
                    <${Display}
                        items=${this.state.view}
                        onUpdate=${(items: Record<string, boolean>) => {
                            this.setState({ view: items });
                        }}
                    />
                    <${Chord}
                        notes=${this.state.pressed}
                        strings=${instrument.strings.length}
                    />
                </aside>
                <${Instrument}
                    view=${this.state.view}
                    settings=${instrument}
                    onChange=${this.checkStrings.bind(this)}
                />
            </main>
        `;
    }
}

render(html`<${App} instrument=${BanjoSetting} />`, document.body);
